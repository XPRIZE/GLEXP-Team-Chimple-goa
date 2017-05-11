<?php
/* Template Name: Login Page */
/*
 * The template for displaying a custom login page *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
 
global $sc_theme_globals, $post;
 
if ( is_user_logged_in() ) {
	wp_redirect( get_home_url() );
	exit;
}

$redirect_to_after_login_url = $sc_theme_globals->get_redirect_to_after_login_page_url();
if (!$redirect_to_after_login_url)
	$redirect_to_after_login_url = get_home_url();

$login = null;
// login
if( isset( $_POST['log'] ) && wp_verify_nonce( $_POST['login_form_nonce'], 'login_form' ) ){

	$is_ssl = is_ssl();

	$login = wp_signon(
		array(
			'user_login' => $_POST['log'],
			'user_password' => $_POST['pwd'],
			'remember' =>( ( isset( $_POST['rememberme'] ) && $_POST['rememberme'] ) ? true : false )
		),
		$is_ssl
	);
	
	if ( !is_wp_error( $login ) ) {

		wp_set_current_user( $login->ID, esc_attr($_POST['log']));
		wp_set_auth_cookie( $login->ID, true, $is_ssl );
		do_action( 'wp_login', esc_attr($_POST['log']) );
	
		wp_redirect( $redirect_to_after_login_url );
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
				<form action="<?php echo SocialChef_Theme_Utils::get_current_page_url(); ?>" id="login-form" method="post">
					<?php if( is_wp_error( $login ) ){ ?>
						<div class="alert alert-danger"><?php _e('Incorrect username or password. Please try again.', 'socialchef') ?></div>
					<?php } ?>
					<div class="f-row">
						<input type="text" name="log" id="log" placeholder="<?php esc_attr_e('Your username', 'socialchef'); ?>" />
					</div>
					<div class="f-row">
						<input type="password" name="pwd" id="pwd" placeholder="<?php esc_attr_e('Your password', 'socialchef'); ?>" />
					</div>
					
					<div class="f-row">
						<input type="checkbox" name="rememberme" id="rememberme" />
						<label for="rememberme"><?php _e('Remember me next time', 'socialchef'); ?></label>
					</div>
					<div class="f-row bwrap">
						<?php wp_nonce_field('login_form','login_form_nonce'); ?>
						<input type="hidden" name="redirect_to" value="<?php echo esc_url( $_SERVER['REQUEST_URI'] ); ?>" />
						<input type="submit" value="<?php esc_attr_e('Login', 'socialchef'); ?>" id="login" name="login" />
					</div>
					<p><?php echo sprintf(__("<a href='%s'>Forgotten password?</a>", 'socialchef'), esc_url( $sc_theme_globals->get_reset_password_page_url()) ); ?></p>
					<p><?php echo sprintf(__("Don't have an account yet? <a href='%s'>Sign up.</a>", 'socialchef'), esc_url( $sc_theme_globals->get_register_page_url()) ); ?></p>
				</form>
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