<?php
class SocialChef_Theme_Ajax extends SocialChef_BaseSingleton {

	protected function __construct() {
        // our parent class might
        // contain shared code in its constructor
        parent::__construct();
    }
	
    public function init() {
		add_action( 'wp_ajax_recipe_mark_as_favorite', array($this, 'recipe_mark_as_favorite') );
	}
	
	function recipe_mark_as_favorite() {
	
		global $sc_recipes_post_type;
		
		if ( isset($_REQUEST) ) {
			$nonce = $_REQUEST['nonce'];
			
			if ( wp_verify_nonce( $nonce, 'sc-ajax-nonce' ) ) {
			
				$user_id = wp_kses($_REQUEST['userId'], '');	
				$recipe_id = wp_kses($_REQUEST['recipeId'], '');
				$remove = wp_kses($_REQUEST['remove'], '');
				
				if ($remove)
					echo $sc_recipes_post_type->unmark_as_favorite($user_id, $recipe_id);
				else
					echo $sc_recipes_post_type->mark_as_favorite($user_id, $recipe_id);
				
				die();
				
			}
		}
		
		// Always die in functions echoing ajax content
		echo 0;
		die();
	}
}

// store the instance in a variable to be retrieved later and call init
global $sc_theme_ajax;
$sc_theme_ajax = SocialChef_Theme_Ajax::get_instance();
$sc_theme_ajax->init();