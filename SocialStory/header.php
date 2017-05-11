<?php ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<?php 
	global $current_user;
	if (!isset($current_user)) {
		$current_user = wp_get_current_user();
	}
	
	$account_uri = '';
	if (defined('BP_VERSION')) {
		$account_uri = bp_core_get_userlink($current_user->ID, false, true);
	} else {
		$account_uri = get_author_posts_url($current_user->ID);
	}
	
	$site_url = site_url();	
	global $bp, $sc_theme_globals;
	
	global $post, $sc_is_custom_home;
	$template_file = '';
	if ($post)
		$template_file = get_post_meta($post->ID,'_wp_page_template',true);
	if ($template_file && $template_file == 'sc_home.php')
		$sc_is_custom_home = true;
?>
    <meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	  <script src="<?php echo esc_url ( SocialChef_Theme_Utils::get_file_uri('/js/html5shiv.js') ); ?>"></script>
	  <script src="<?php echo esc_url ( SocialChef_Theme_Utils::get_file_uri('/js/respond.min.js') ); ?>"></script>
	<![endif]-->
	<title><?php wp_title(); ?></title>
	<link rel="shortcut icon" href="<?php echo esc_url ( SocialChef_Theme_Utils::get_file_uri('/images/favicon.ico') ); ?>" />	
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
	<script>
	window.currentUserId = <?php echo ($current_user->ID > 0 ? $current_user->ID : 0); ?>;
	window.siteUrl = '<?php echo esc_js( $site_url ); ?>';
	<?php if ( defined( 'ICL_LANGUAGE_CODE' ) ) { ?>
		window.currentLanguage = '<?php echo ICL_LANGUAGE_CODE; ?>';
	<?php } ?>
	</script>
    <?php 
	if (defined('BP_VERSION')) { 
		bp_head();
	}
    wp_head(); 
	?>
</head>
<body <?php body_class(); ?>>
	<!--preloader-->
	<div class="preloader">
		<div class="spinner"></div>
	</div>
	<!--//preloader-->	
	<?php do_action( 'bp_before_header' ); ?>
	<!--header-->
	<header class="head" role="banner">
		<!--wrap-->
		<div class="wrap clearfix">
			<a href="<?php echo esc_url ( home_url('/') ); ?>" title="<?php _e( 'Home', 'socialchef' ); ?>" class="logo"><img src="<?php echo esc_url ( $sc_theme_globals->get_theme_logo_src() ); ?>" alt="<?php _e('SocialChef.com', 'socialchef'); ?>" /></a>
			<!--primary navigation-->
			<?php  if ( has_nav_menu( 'primary-menu' ) ) {
				wp_nav_menu( array( 
					'theme_location' => 'primary-menu', 
					'container' => 'nav', 
					'container_class' => 'main-nav',
					'container_id' => 'nav',
					'menu_class' => '',
					'link_before'     => '<span>',
					'link_after'      => '</span>',
				) ); 
			} else { ?>
			<nav class="main-nav" role="navigation" id="nav">
				<ul id="menu-primary">
					<li class="<?php echo (is_home() ? 'current-menu-item' : 'menu-item'); ?>"><a href="<?php echo esc_url ( home_url() ); ?>"><span><?php _e('Home', "socialchef"); ?></span></a></li>
					<li class="menu-item"><a href="<?php echo esc_url ( admin_url('nav-menus.php') ); ?>"><span><?php _e('Configure', "socialchef"); ?></span></a></li>
				</ul>
			</nav>
			<?php } ?>
			<nav class="user-nav" role="navigation">
				<ul>
					<li class="light"><a href="<?php echo esc_url ($sc_theme_globals->get_search_form_page_url() ); ?>" title="<?php _e('Search for stories', 'socialchef'); ?>"><i class="ico i-search"></i> <span><?php _e('Search for stories', 'socialchef'); ?></span></a></li>
					<li class="medium"><a href="<?php echo is_user_logged_in() ? esc_url ( $account_uri ) : esc_url ( $sc_theme_globals->get_login_page_url() ); ?>" title="<?php _e('My account', 'socialchef'); ?>"><i class="ico i-account"></i> <span><?php _e('My account', 'socialchef'); ?></span></a></li>
					<li class="dark"><a href="<?php echo is_user_logged_in() ? esc_url ( $sc_theme_globals->get_submit_recipes_url() ) : esc_url ( $sc_theme_globals->get_login_page_url() ); ?>" title="<?php _e('Submit a story', 'socialchef'); ?>"><i class="ico i-submitrecipe"></i> <span><?php _e('Submit a story', 'socialchef'); ?></span></a></li>
				</ul>
			</nav>
		</div>
		<!--//wrap-->
	</header>
	<!--//header-->
	<?php do_action( 'bp_after_header'     ); ?>
	<?php do_action( 'bp_before_container' ); ?>
	<!--main-->
	<main class="main" role="main">
<?php
	if ( !$sc_is_custom_home ) {
?>
	<!--wrap-->
	<div class="wrap clearfix">
<?php	
	}