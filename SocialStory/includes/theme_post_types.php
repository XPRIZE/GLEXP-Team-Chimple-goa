<?php

require_once dirname( __FILE__ ) . '/post_types/recipes_post_type.php';

class SocialChef_Theme_Post_Types extends SocialChef_BaseSingleton {

	protected function __construct() {
        // our parent class might
        // contain shared code in its constructor
        parent::__construct();
    }

    public function init() {
		add_action( 'init', array($this, 'initialize_post_types' ) );
    }
	
	function initialize_post_types() {
		do_action('socialchef_initialize_post_types');
	}
}

// store the instance in a variable to be retrieved later and call init
$sc_theme_post_types = SocialChef_Theme_Post_Types::get_instance();
$sc_theme_post_types->init();