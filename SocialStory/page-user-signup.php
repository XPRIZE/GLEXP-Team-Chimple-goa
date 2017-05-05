<?php
/* Template Name: Custom Signup Page */
/*
 * The template for displaying a custom register page *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
  
if ( is_user_logged_in() ) {
	wp_redirect( get_home_url() );
	exit;
}

if (defined('BP_VERSION')) {
	$bp_pages = get_option('bp-pages');
	if (is_array($bp_pages)) {
		$current_page = get_queried_object_id();
        if(isset($bp_pages['register']) && ($bp_pages['register'] != $current_page)){
			$bp_register_page_url = get_permalink($bp_pages['register']);
			wp_redirect($bp_register_page_url);
        }
	}
}
 
global $sc_theme_globals, $sc_signup_errors, $post;

// register
if( isset( $_POST['user_login'] ) &&  isset( $_POST['user_email'] ) && isset($_POST['socialchef_register_form_nonce']) && wp_verify_nonce( $_POST['socialchef_register_form_nonce'], 'socialchef_register_form' ) ){

	// user data array
	$register_userdata = array(
		'user_login' => wp_kses( $_POST['user_login'], '' ),
		'user_email' => wp_kses( $_POST['user_email'], '' ),
		'first_name' => '',
		'last_name' => '',
		'user_url' => '',
		'description' => '',
		'email' => wp_kses( $_POST['user_email'], '' )
	);
	
	$sc_signup_errors = array();

	if (!defined('BP_VERSION') && $sc_theme_globals->let_users_set_pass()) {
		$register_userdata['user_pass'] = wp_kses( $_POST['user_pass'], '' );
		$register_userdata['confirm_pass'] = wp_kses( $_POST['confirm_pass'], '' );
	} else {
		$register_userdata['user_pass'] = wp_generate_password( 10, false );
		$register_userdata['confirm_pass'] = $register_userdata['user_pass'];
	}
	
	// custom user meta array
	$register_usermeta = array(
		'agree' =>( ( isset( $_POST['checkboxagree'] ) && !empty( $_POST['checkboxagree'] ) ) ? '1' : '0' ),
		'user_activation_key' => wp_generate_password( 20, false )
	);

	// validate username
	if ( trim( $register_userdata['user_login'] ) == '' ) {
		$sc_signup_errors['user_login'] = __( 'Username is required.', 'socialchef' );
	}
	else if ( strlen( $register_userdata['user_login'] ) < 6 ) {
		$sc_signup_errors['user_login'] = __( 'Sorry, username must be 6 characters or more.', 'socialchef' );
	}
	else if ( !validate_username( $register_userdata['user_login'] ) ) {
		$sc_signup_errors['user_login'] = __( 'Sorry, the username you provided is invalid.', 'socialchef' );
	}
	else if ( username_exists( $register_userdata['user_login'] ) ) {
		$sc_signup_errors['user_login'] = __( 'Sorry, that username already exists.', 'socialchef' );
	}

	if ($sc_theme_globals->let_users_set_pass()) {
		// validate password
		if ( trim( $register_userdata['user_pass'] ) == '' ) {
			$sc_signup_errors['user_pass'] = __( 'Password is required.', 'socialchef' );
		}
		else if ( strlen( $register_userdata['user_pass'] ) < 6 ) {
			$sc_signup_errors['user_pass'] = __( 'Sorry, password must be 6 characters or more.', 'socialchef' );
		}
		else if ( $register_userdata['user_pass'] !== $register_userdata['confirm_pass'] ) {
			$sc_signup_errors['confirm_pass'] = __( 'Password and repeat password fields must match.', 'socialchef' );
		}
	}
	
	// validate user_email
	if ( !is_email( $register_userdata['user_email'] ) ) {
		$sc_signup_errors['user_email'] = __( 'You must enter a valid email address.', 'socialchef' );
	}
	else if ( email_exists( $register_userdata['user_email'] ) ) {
		$sc_signup_errors['user_email'] = __( 'Sorry, that email address is already in use.', 'socialchef' );
	}

	// validate agree
	if( $register_usermeta['agree'] == '0' ){
		$sc_signup_errors['agree'] = __( 'You must agree to our terms &amp; conditions to sign up.', 'socialchef' );
	}

	if( empty( $sc_signup_errors ) ){
		
		// insert new user
		$new_user_id = wp_insert_user( $register_userdata );
		
		$new_user = get_userdata( $new_user_id );
		
		$user_obj = new WP_User($new_user_id);		

		// update custom user meta
		foreach ( $register_usermeta as $key => $value ) {
			update_user_meta( $new_user_id, $key, $value );
		}

		// send notification
		SocialChef_Theme_Utils::activation_notification( $new_user_id );

		// refresh
		wp_redirect( esc_url_raw ( add_query_arg( array( 'action' => 'registered' ), get_permalink() ) ) );
		exit;
	}
}
 
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');

global $post;

$page_id = $post->ID;
$page_custom_fields = get_post_custom( $page_id);

$page_sidebar_positioning = null;
if (isset($page_custom_fields['page_sidebar_positioning'])) {
	$page_sidebar_positioning = $page_custom_fields['page_sidebar_positioning'][0];
	$page_sidebar_positioning = empty($page_sidebar_positioning) ? '' : $page_sidebar_positioning;
}

$section_class = 'full-width';
if ($page_sidebar_positioning == 'both')
	$section_class = 'one-half';
else if ($page_sidebar_positioning == 'left' || $page_sidebar_positioning == 'right') 
	$section_class = 'three-fourth';
?>
	<!--row-->
	<div class="row">
	<!--content-->
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'left')
			get_sidebar('left');
		?>
		<?php  while ( have_posts() ) : the_post(); ?>
		<section class="content center <?php echo esc_attr($section_class); ?>">
			<div class="modal container">
				<header class="s-title">
					<h1><?php the_title(); ?></h1>
				</header>
				<?php
					if( isset( $_GET['action'] ) && $_GET['action'] == 'registered'){ ?>
					<div class="alert alert-success">
						<?php _e( 'Account was successfully created. Please click the activation link in the email we just sent you to complete the registration process.', 'socialchef' ) ?>
					</div>
				<?php
				} else if( isset( $_GET['action'] ) && $_GET['action'] == 'activate' && isset( $_GET['user_id'] ) && isset( $_GET['activation_key'] ) ){
					if( SocialChef_Theme_Utils::activate_user( wp_kses( $_GET['user_id'], '' ), wp_kses( $_GET['activation_key'], '' ) ) ) { ?>
						<div class="alert alert-success">
							<?php _e( 'User account successfully activated.', 'socialchef' ) ?>
						</div>
					<?php
					} else {	?>
					<div class="alert alert-danger">
						<?php _e( 'An error was encountered when attempting to activate your account.', 'socialchef' ) ?>
					</div>
					<?php
					}
				} else if( isset( $_GET['action'] ) && $_GET['action'] == 'sendactivation' && isset( $_GET['user_id'] ) ){
					if( SocialChef_Theme_Utils::activation_notification( wp_kses( $_GET['user_id'], '', '' ) ) ) { ?>
						<div class="alert alert-success">
							<?php _e( 'Activation link was successfully sent.', 'socialchef' ) ?>
						</div>
					<?php
					} else { ?>
						<div class="alert alert-danger">
							<?php _e( 'An error was encountered when attempting to send the activation link. Please try again later.', 'socialchef' ) ?>
						</div>
					<?php
					}
				} else { ?>				
				<form action="<?php echo SocialChef_Theme_Utils::get_current_page_url(); ?>" id="register-form" method="post">
					<?php if( isset($errors) && count( $errors ) > 0 ){ ?>
						<div class="alert alert-danger"><?php _e('Errors were encountered during signup form processing. Please try again.', 'socialchef') ?></div>
					<?php } ?>
					<div class="f-row">
						<input tabindex="1" type="text" id="user_login" name="user_login" placeholder="<?php esc_attr_e('Username', 'socialchef'); ?>" value="<?php echo isset($register_userdata['user_login']) ? $register_userdata['user_login'] : ''; ?>" />
						<?php if( isset( $sc_signup_errors['user_login'] ) ){ ?>
						<div class="alert alert-danger"><?php echo $sc_signup_errors['user_login']; ?></div>
						<?php } ?>
					</div>
					<div class="f-row">
						<input tabindex="2" type="email" id="user_email" name="user_email" placeholder="<?php esc_attr_e('Email', 'socialchef'); ?>" value="<?php echo isset($register_userdata['user_email']) ? $register_userdata['user_email'] : ''; ?>" />
						<?php if( isset( $sc_signup_errors['user_email'] ) ){ ?>
						<div class="alert alert-danger"><?php echo $sc_signup_errors['user_email']; ?></div>
						<?php } ?>
						<input type="hidden" name="email" id="email" value="" />
						<?php if (defined('BP_VERSION') || !$sc_theme_globals->let_users_set_pass()) { ?>
						<input type="hidden" name="password" id="password" value="" />
						<?php } ?>
					</div>						
					<?php do_action('register_form', true); ?>  				
					<div class="f-row">
						<input type="checkbox" name="checkboxagree" name="checkboxagree" />
						<label for="checkboxagree"><?php echo sprintf(__('I agree to the <a href="%s">terms &amp; conditions</a>.', 'socialchef'), esc_url( $sc_theme_globals->get_terms_page_url())); ?></label>
						<?php if( isset( $sc_signup_errors['agree'] ) ){ ?>
						<div class="alert alert-danger"><?php echo $sc_signup_errors['agree']; ?></div>
						<?php } ?>
					</div>
					<div class="f-row bwrap">
						<?php wp_nonce_field('socialchef_register_form','socialchef_register_form_nonce'); ?>
						<input type="hidden" name="redirect_to" value="<?php echo esc_url( $_SERVER['REQUEST_URI'] ); ?>" />
						<input type="submit" value="<?php esc_attr_e('Login', 'socialchef'); ?>" id="register" name="register" />
					</div>
					<p><?php echo sprintf(__("<a href='%s'>Forgotten your password?</a>", 'socialchef'), $sc_theme_globals->get_reset_password_page_url()); ?></p>
					<p><?php echo sprintf(__("Already a member? <a href='%s'>Login.</a>", 'socialchef'), $sc_theme_globals->get_login_page_url()); ?></p>
				</form>
				<?php } ?>
			</div>
		</section>	
		<?php endwhile; ?>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right')
			get_sidebar('right');
		?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );