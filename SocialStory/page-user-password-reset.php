<?php
/* Template Name: Reset Password Page */
/*
 * The template for displaying a custom reset password page *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
 
if ( is_user_logged_in() ) {
	wp_redirect( get_home_url() );
	exit;
}

if( isset( $_POST['user_email'] ) && wp_verify_nonce( $_POST['resetpassword_form_nonce'], 'resetpassword_form' ) ){

	// user data array
	$resetpassword_userdata = array(
		'user_email' => wp_kses( $_POST['user_email'], '', '' )
	);

	// custom user meta array
	$resetpassword_usermeta = array(
		'user_resetpassword_key' => wp_generate_password( 20, false ),
		'user_resetpassword_datetime' => date('Y-m-d H:i:s', time() )
	);	

	// validation
	$errors = array();

	// validate email
	if ( !is_email( $resetpassword_userdata['user_email'] ) ) {
		$user = get_user_by('login', $resetpassword_userdata['user_email']);
		if (!$user)
			$errors['user_email'] = __( 'You must enter a valid and existing email address or username.', 'socialchef' );
	} else if ( !email_exists( $resetpassword_userdata['user_email'] ) ) {
		$errors['user_email'] = __( 'You must enter a valid and existing email address or username.', 'socialchef' );
	}
	
	if( empty( $errors ) ){

		$user = get_user_by( 'email', $resetpassword_userdata['user_email'] );
		if (!$user)
			$user = get_user_by( 'login', $resetpassword_userdata['user_email'] );

		// update custom user meta
		foreach ( $resetpassword_usermeta as $key => $value ) {
			update_user_meta( $user->ID, $key, $value );
		}

		SocialChef_Theme_Utils::reset_password_notification( $resetpassword_userdata['user_email'] );

		// refresh
		wp_redirect( esc_url_raw ( add_query_arg( array( 'action' => 'resetpasswordnotification' ), get_permalink() ) ) );
		exit;
	}
}
global $post;
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
		<?php  while ( have_posts() ) : the_post(); ?>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'left')
			get_sidebar('left');
		?>
		<section class="content center <?php echo esc_attr($section_class); ?>">
			<div class="modal container">
				<header class="s-title">
					<h1><?php the_title(); ?></h1>
				</header>
				<?php if ( isset( $_GET['action'] ) && $_GET['action'] == 'resetpasswordnotification' ) { ?>
				<div class="alert alert-success">
					<?php _e( 'Please confirm the request to reset your password by clicking the link sent to your email address.', 'socialchef' ) ?>
				</div>
				<?php
				} else if( isset( $_GET['action'] ) && $_GET['action'] == 'resetpassword' && isset( $_GET['login'] ) && isset( $_GET['key'] ) ){ 
					$user_login = wp_kses( $_GET['login'], '', '' );
					$resetpassword_key = wp_kses( $_GET['key'], '', '' );
					$new_password = SocialChef_Theme_Utils::reset_password( $user_login, $resetpassword_key );
					$new_password_sent = SocialChef_Theme_Utils::new_password_notification( $user_login, $new_password );
					if( $new_password && $new_password_sent ) { ?>
					<div class="alert alert-success">
						<?php _e( 'Your password was successfully reset. We have sent the new password to your email address.', 'socialchef' ) ?>
					</div>
					<?php
					} else {?>
					<div class="alert alert-danger">
						<?php _e( 'We encountered an error when attempting to reset your password. Please try again later.', 'socialchef' ) ?>
					</div>
					<?php
					}
				} else { ?>												
				<form action="<?php echo SocialChef_Theme_Utils::get_current_page_url(); ?>" id="login-form" method="post">
					<?php if( isset( $errors['user_email'] ) ){ ?>
						<div class="alert alert-danger"><?php echo $errors['user_email']; ?></div>
					<?php } ?> 
					<div class="f-row">
						<input type="text" name="user_email" id="user_email" value="" placeholder="<?php esc_attr_e('Username or email address', 'socialchef'); ?>" />
					</div>
					<div class="f-row bwrap">
						<?php wp_nonce_field('resetpassword_form','resetpassword_form_nonce'); ?>
						<input type="hidden" name="redirect_to" value="<?php echo esc_url( $_SERVER['REQUEST_URI'] ); ?>" />
						<input type="submit" value="<?php esc_attr_e('Reset password', 'socialchef'); ?>" id="resetpassword" name="resetpassword" />
					</div>
				</form>
				<?php } ?>
			</div>
		</section>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right')
			get_sidebar('right');
		?>
		<?php endwhile; ?>
	</div><!--//row-->
<?php
get_footer( 'buddypress' );