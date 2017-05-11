<?php

class SocialChef_Theme_Globals extends SocialChef_BaseSingleton {

	protected function __construct() {
        // our parent class might
        // contain shared code in its constructor
        parent::__construct();
    }

    public function init() {
	
    }
	
	public function enable_nutritional_elements() {
		$enable_nutritional_elements = of_get_option('enable_nutritional_elements', 1);
		return isset( $enable_nutritional_elements ) && $enable_nutritional_elements ? 1 : 0;
	}
	
	public function get_featured_members_page_url() {
		$featured_members_page_url_id =  of_get_option('featured_members_page_url_id', '');
		return get_permalink($featured_members_page_url_id);
	}
	
	public function publish_frontend_submissions_immediately() {
		return of_get_option('publish_frontend_submissions_immediately', false);
	}
	
	public function get_featured_recipes_page_url() {
		$featured_recipes_page_url_id =  of_get_option('featured_recipes_page_url_id', '');
		return get_permalink($featured_recipes_page_url_id);
	}
	
	public function get_recipes_permalink_slug() {
		return of_get_option('recipes_permalink_slug', 'recipes');
	}
	
	public function get_meal_course_permalink_slug() {
		return of_get_option('meal_course_permalink_slug', 'meal-course');
	}
	
	public function get_recipe_category_permalink_slug() {
		return of_get_option('recipe_category_permalink_slug', 'recipe-category');
	}
	
	public function get_difficulty_permalink_slug() {
		return of_get_option('difficulty_permalink_slug', 'difficulty');
	}
	
	public function get_ingredient_permalink_slug() {
		return of_get_option('ingredient_permalink_slug', 'ingredient');
	}
	
	public function enable_rtl() {
		return of_get_option('enable_rtl', false);
	}
	
	public function get_woocommerce_pages_sidebar_position() {
		return of_get_option('woocommerce_pages_sidebar_position', null);
	}
	
	public function get_nutritional_element_permalink_slug() {
		return of_get_option('nutritional_element_permalink_slug', 'nutritional-element');
	}
	
	public function get_recipes_archive_posts_per_page() {
		return of_get_option('recipes_archive_posts_per_page', '');
	}
	
	public function let_users_set_pass() {
		if (!defined('BP_VERSION')) { 
			return of_get_option('let_users_set_pass', '');
		} else {
			return false;
		}
	}
	
	public function get_terms_page_url() {
		$terms_page_url_id =  of_get_option('terms_page_url_id', '');
		return get_permalink($terms_page_url_id);
	}
	
	public function get_search_form_page_url() {
		$search_form_page_url_id =  of_get_option('search_form_page_url_id', '');
		return get_permalink($search_form_page_url_id);
	}
	
	public function get_submit_recipes_url() {
		$submit_recipes_url_id =  of_get_option('submit_recipes_url_id', '');
		return get_permalink($submit_recipes_url_id);
	}
	
	public function get_contact_page_url() {
		$contact_page_url_id =  of_get_option('contact_page_url_id', '');
		return get_permalink($contact_page_url_id);
	}
	
	public function get_home_intro_background() {
		$home_intro_background = of_get_option('home_intro_background', '');
		$home_intro_background = empty($home_intro_background) ? SocialChef_Theme_Utils::get_file_uri( '/images/intro-default.jpg' ) : $home_intro_background;
		return $home_intro_background;
	}
	
	public function get_copyright_footer() {
		return of_get_option('copyright_footer', '');
	}
	
	public function get_footer_call_to_action_url() {
		$footer_call_to_action_url_id = of_get_option('footer_call_to_action_url_id', '');
		return $footer_call_to_action_url_id;
	}
	
	public function get_footer_call_to_action() {
		return of_get_option('footer_call_to_action', '');
	}

	public function get_footer_call_to_action_button() {
		return of_get_option('footer_call_to_action_button', '');
	}
	
	public function override_wp_login() {
		return of_get_option('override_wp_login', 0);
	}

	public function get_theme_logo_src() {
		$logo_src = of_get_option( 'website_logo_upload', '' );
		$logo_src = empty($logo_src) ? SocialChef_Theme_Utils::get_file_uri( '/images/ico/logo.png' ) : $logo_src;
		return $logo_src;
	}
	
	public function get_login_page_url() {
		$login_page_url_id = of_get_option('login_page_url_id', '');
		return get_permalink($login_page_url_id);
	}

	public function get_redirect_to_after_logout_url() {
		$redirect_to_after_logout_id = of_get_option('redirect_to_after_logout_id', '');
		return get_permalink($redirect_to_after_logout_id);
	}
	
	public function show_social_chef_in_numbers_on_homepage() {
		return of_get_option('show_social_chef_in_numbers_on_homepage', 1);
	}
	
	public function get_redirect_to_after_login_page_url() {
		$redirect_to_after_login_id = of_get_option('redirect_to_after_login_id', '');
		return get_permalink($redirect_to_after_login_id);
	}
	
	public function get_recipe_list_page_id() {
		return of_get_option('featured_recipes_page_url_id', '');
	}
	
	public function get_recipe_list_page_url() {
		$recipe_list_page_url_id = of_get_option('featured_recipes_page_url_id', '');
		return get_permalink($recipe_list_page_url_id);
	}
	
	public function get_register_page_url() {
		$register_page_url_id = of_get_option('register_page_url_id', '');
		$register_page_url = get_permalink($register_page_url_id);		
		$override_wp_login = $this->override_wp_login();
		if (empty($register_page_url) || !$override_wp_login)
			$register_page_url = get_home_url() . '/wp-login.php?action=register';
		return $register_page_url;
	}
	
	public function get_reset_password_page_url() {
		$reset_password_page_url_id = of_get_option('reset_password_page_url_id', '');
		$reset_password_page_url = get_permalink($reset_password_page_url_id);
		$override_wp_login = $this->override_wp_login();
		if (empty($reset_password_page_url) || !$override_wp_login)
			$reset_password_page_url = get_home_url() . '/wp-login.php?action=lostpassword';
		return $reset_password_page_url;
	}
	
	public function get_blog_posts_root_url() {
		return get_permalink( get_option( 'page_for_posts' ) );
	}
}

global $sc_theme_globals;
// store the instance in a variable to be retrieved later and call init
$sc_theme_globals = SocialChef_Theme_Globals::get_instance();
$sc_theme_globals->init();