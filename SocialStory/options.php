<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 */
 
function optionsframework_option_name() {

	// This gets the theme name from the stylesheet
	$themename = get_option( 'stylesheet' );
	$themename = preg_replace("/\W/", "_", strtolower($themename) );

	$socialchef_settings = get_option( 'optionsframework' );
	$socialchef_settings['id'] = $themename;
	update_option( 'optionsframework', $socialchef_settings );
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 * If you are making your theme translatable, you should replace 'socialchef'
 * with the actual text domain for your theme.  Read more:
 * http://codex.wordpress.org/Function_Reference/load_theme_textdomain
 */
 
function optionsframework_options() {

	$color_scheme_array = array(
		'theme-default' => __('Default', 'socialchef'),
		'theme-black' => __('Black', 'socialchef'),
		'theme-blue' => __('Blue', 'socialchef'),
		'theme-brown' => __('Brown', 'socialchef'),
		'theme-green' => __('Green', 'socialchef'),
		'theme-grey' => __('Grey', 'socialchef'),
		'theme-orange' => __('Orange', 'socialchef'),
		'theme-pink' => __('Pink', 'socialchef'),
		'theme-purple' => __('Purple', 'socialchef'),
		'theme-red' => __('Red', 'socialchef'),
		'theme-teal' => __('Teal', 'socialchef'),
		'theme-yellow' => __('Yellow', 'socialchef'),
	);

	$pages = get_pages(); 
	$pages_array = array();
	$pages_array[0] = __('Select page', 'socialchef');
	foreach ( $pages as $page ) {
		$pages_array[$page->ID] = $page->post_title;
	}
	
	$options = array();

	$options[] = array(
		'name' => __('General Settings', 'socialchef'),
		'type' => 'heading');
		
	$options[] = array(
		'name' => __('Website logo', 'socialchef'),
		'desc' => __('Upload your website logo to go in place of default theme logo.', 'socialchef'),
		'id' => 'website_logo_upload',
		'type' => 'upload');
		
	$options[] = array(
		'name' => __('Select color scheme', 'socialchef'),
		'desc' => __('Select website color scheme.', 'socialchef'),
		'id' => 'color_scheme_select',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $color_scheme_array);
		
	$options[] = array(
		'name' => __('Enable RTL', 'socialchef'),
		'desc' => __('Enable right-to-left support', 'socialchef'),
		'id' => 'enable_rtl',
		'std' => '0',
		'type' => 'checkbox');
		
	$options[] = array(
		'name' => __('Footer copyright notice', 'socialchef'),
		'desc' => __('Copyright notice in footer.', 'socialchef'),
		'id' => 'copyright_footer',
		'std' => '&copy; socialchef.com 2013. All rights reserved.',
		'type' => 'text');

	$options[] = array(
		'name' => __('Footer call to action', 'socialchef'),
		'desc' => __('Footer call to action text. If left blank, call to action will not be shown.', 'socialchef'),
		'id' => 'footer_call_to_action',
		'std' => __('Already convinced? Join us by registering right now.', 'socialchef'),
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Footer call to action button', 'socialchef'),
		'desc' => __('Footer call to action button text. If call to action (above) text is left blank, call to action button will not be shown.', 'socialchef'),
		'id' => 'footer_call_to_action_button',
		'std' => __('Join Us', 'socialchef'),
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Footer call to action link', 'socialchef'),
		'desc' => __('Footer call to action link url.', 'socialchef'),
		'id' => 'footer_call_to_action_url_id',
		'std' => '/',
		'type' => 'text');		
		
	$options[] = array(
		'name' => __('WP Settings', 'socialchef'),
		'type' => 'heading');

	$options[] = array(
		'name' => __('Override wp-login.php', 'socialchef'),
		'desc' => __('Override wp-login.php and use custom login, register, forgot password pages', 'socialchef'),
		'id' => 'override_wp_login',
		'std' => '0',
		'type' => 'checkbox');
		
	if (!defined('BP_VERSION')) { 
		$options[] = array(
			'name' => __('Users specify password', 'socialchef'),
			'desc' => __('Let users specify their password when registering', 'socialchef'),
			'id' => 'let_users_set_pass',
			'std' => '0',
			'type' => 'checkbox');
	}
		
	$options[] = array(
		'name' => __('Page Settings', 'socialchef'),
		'type' => 'heading');
	
	$options[] = array(
		'name' => __('Search stories page url', 'socialchef'),
		'desc' => __('Page that displays custom story search form and results.', 'socialchef'),
		'id' => 'search_form_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
	
	$options[] = array(
		'name' => __('Redirect to after login', 'socialchef'),
		'desc' => __('Page to redirect to after login if "Override wp-login.php" is checked above', 'socialchef'),
		'id' => 'redirect_to_after_login_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Redirect to after logout', 'socialchef'),
		'desc' => __('Page to redirect to after logout if "Override wp-login.php" is checked above', 'socialchef'),
		'id' => 'redirect_to_after_logout_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);

	$options[] = array(
		'name' => __('Login page url', 'socialchef'),
		'desc' => __('Login page url if "Override wp-login.php" is checked above', 'socialchef'),
		'id' => 'login_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Register page url', 'socialchef'),
		'desc' => __('Register page url if "Override wp-login.php" is checked above', 'socialchef'),
		'id' => 'register_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Reset password page url', 'socialchef'),
		'desc' => __('Reset password page url if "Override wp-login.php" is checked above', 'socialchef'),
		'id' => 'reset_password_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Contact us page url', 'socialchef'),
		'desc' => __('Contact us page url', 'socialchef'),
		'id' => 'contact_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Show "socialchef in numbers" section on home page?', 'socialchef'),
		'desc' => __('If checked the "socialchef in numbers" section will be shown on home page?', 'socialchef'),
		'id' => 'show_social_chef_in_numbers_on_homepage',
		'std' => '1',
		'type' => 'checkbox');
		
	$options[] = array(
		'name' => __('Featured stories page url', 'socialchef'),
		'desc' => __('Featured stories page url used in featured story widget', 'socialchef'),
		'id' => 'featured_recipes_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Featured members page url', 'socialchef'),
		'desc' => __('Featured members page url used in featured member widget', 'socialchef'),
		'id' => 'featured_members_page_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Submit stories page url', 'socialchef'),
		'desc' => __('Submit stories page url', 'socialchef'),
		'id' => 'submit_recipes_url_id',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $pages_array);
		
	$options[] = array(
		'name' => __('Home Page', 'socialchef'),
		'type' => 'heading');
		
	$options[] = array(
		'name' => __('Intro image', 'socialchef'),
		'desc' => __('If you want to change the intro image background shown on top of the home page, upload your replacement here.', 'socialchef'),
		'id' => 'home_intro_background',
		'type' => 'upload');

	$options[] = array(
		'name' => __('Frontend submissions', 'socialchef'),
		'type' => 'heading');		
		
	$options[] = array(
		'name' => __('Publish frontend submitted content immediately?', 'socialchef'),
		'desc' => __('When users submit content via frontend, do you wish to publish it immediately or do you leave it for admin to review first?', 'socialchef'),
		'id' => 'publish_frontend_submissions_immediately',
		'std' => '0',
		'type' => 'checkbox');
		
	$options[] = array(
		'name' => __('Stories', 'socialchef'),
		'type' => 'heading');
		
	$options[] = array(
		'name' => __('Single story permalink slug', 'socialchef'),
		'desc' => __('The permalink slug used for single stories (by default it is set to "story". <br /><strong>Note:</strong> Please make sure you flush your rewrite rules after changing this setting. You can do so by navigating to <a href="/wp-admin/options-permalink.php">Settings->Permalinks</a> and clicking "Save Changes".', 'socialchef'),
		'id' => 'recipes_permalink_slug',
		'std' => 'recipe',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Story archive posts per page', 'socialchef'),
		'desc' => __('Number of stories to display on stories archive pages', 'socialchef'),
		'id' => 'recipes_archive_posts_per_page',
		'std' => '12',
		'type' => 'text');
	
	
	$options[] = array(
		'name' => __('Single meal course permalink slug', 'socialchef'),
		'desc' => __('The permalink slug used for single meal course (by default it is set to "meal-course". <br /><strong>Note:</strong> Please make sure you flush your rewrite rules after changing this setting. You can do so by navigating to <a href="/wp-admin/options-permalink.php">Settings->Permalinks</a> and clicking "Save Changes".', 'socialchef'),
		'id' => 'meal_course_permalink_slug',
		'std' => 'meal-course',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Single story category permalink slug', 'socialchef'),
		'desc' => __('The permalink slug used for single recipe category (by default it is set to "story-category". <br /><strong>Note:</strong> Please make sure you flush your rewrite rules after changing this setting. You can do so by navigating to <a href="/wp-admin/options-permalink.php">Settings->Permalinks</a> and clicking "Save Changes".', 'socialchef'),
		'id' => 'recipe_category_permalink_slug',
		'std' => 'recipe-category',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Single difficulty permalink slug', 'socialchef'),
		'desc' => __('The permalink slug used for single difficulty (by default it is set to "meal-course". <br /><strong>Note:</strong> Please make sure you flush your rewrite rules after changing this setting. You can do so by navigating to <a href="/wp-admin/options-permalink.php">Settings->Permalinks</a> and clicking "Save Changes".', 'socialchef'),
		'id' => 'difficulty_permalink_slug',
		'std' => 'difficulty',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Single ingredient permalink slug', 'socialchef'),
		'desc' => __('The permalink slug used for single ingredient (by default it is set to "meal-course". <br /><strong>Note:</strong> Please make sure you flush your rewrite rules after changing this setting. You can do so by navigating to <a href="/wp-admin/options-permalink.php">Settings->Permalinks</a> and clicking "Save Changes".', 'socialchef'),
		'id' => 'ingredient_permalink_slug',
		'std' => 'ingredient',
		'type' => 'text');
		
	$options[] = array(
		'name' => __('Enable nutritional element info', 'socialchef'),
		'desc' => __('Enable use of nutritional element info across the theme', 'socialchef'),
		'id' => 'enable_nutritional_elements',
		'std' => '1',
		'type' => 'checkbox');
		
	$options[] = array(
		'name' => __('Single nutritional element permalink slug', 'socialchef'),
		'desc' => __('The permalink slug used for single nutritional element (by default it is set to "meal-course". <br /><strong>Note:</strong> Please make sure you flush your rewrite rules after changing this setting. You can do so by navigating to <a href="/wp-admin/options-permalink.php">Settings->Permalinks</a> and clicking "Save Changes".', 'socialchef'),
		'id' => 'nutritional_element_permalink_slug',
		'std' => 'nutritional-element',
		'type' => 'text');
		
	if (SocialChef_Theme_Utils::is_woocommerce_active()) {
	
		$options[] = array(
			'name' => __('WooCommerce', 'socialchef'),
			'type' => 'heading');
			
		$page_sidebars = array(
			'' => __('No sidebar', 'socialchef'),
			'left' => __('Left sidebar', 'socialchef'),
			'right' => __('Right sidebar', 'socialchef'),
			'both' => __('Left and right sidebars', 'socialchef'),

		);
	
		$options[] = array(
			'name' => __('WooCommerce pages sidebar position', 'socialchef'),
			'desc' => __('Select the position (if any) of sidebars to appear on all WooCommerce-specific pages of your website.', 'socialchef'),
			'id' => 'woocommerce_pages_sidebar_position',
			'std' => 'three',
			'type' => 'select',
			'class' => 'mini', //mini, tiny, small
			'options' => $page_sidebars);
	}
		
	return $options;
}