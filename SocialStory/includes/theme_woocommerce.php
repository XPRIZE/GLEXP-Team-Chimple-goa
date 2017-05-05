<?php

class SocialChef_Theme_WooCommerce extends SocialChef_BaseSingleton {

	protected function __construct() {
	
        // our parent class might contain shared code in its constructor
        parent::__construct();
		
    }

    public function init() {
	
		if (SocialChef_Theme_Utils::is_woocommerce_active()) {
			add_action('init', array( $this, 'woocommerce_init'));
		}	
	}
		
	function woocommerce_init() {
		
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
		add_action( 'woocommerce_before_main_content', array($this, 'woocommerce_before_main_content'), 30 );
		add_action( 'woocommerce_after_main_content', array($this, 'woocommerce_after_main_content'), 30 );		
		
	}	
	
	function woocommerce_before_main_content() {
	
		global $sc_theme_globals;

		$page_sidebar_positioning = $sc_theme_globals->get_woocommerce_pages_sidebar_position();
		$page_sidebar_positioning = empty($page_sidebar_positioning) ? '' : $page_sidebar_positioning;

		$section_class = 'full-width';
		if ($page_sidebar_positioning == 'both')
			$section_class = 'one-half';
		else if ($page_sidebar_positioning == 'left' || $page_sidebar_positioning == 'right') 
			$section_class = 'three-fourth';
			
		?>
		<!--row-->
		<div class="row">
		<?php			
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'left') {
			get_sidebar('left');
		}
		?>		
		<section class="content <?php echo esc_attr($section_class); ?>">
		<?php
	}
	
	function woocommerce_after_main_content() {
	
		global $sc_theme_globals;

		$page_sidebar_positioning = $sc_theme_globals->get_woocommerce_pages_sidebar_position();
		$page_sidebar_positioning = empty($page_sidebar_positioning) ? '' : $page_sidebar_positioning;

		$section_class = 'full-width';
		if ($page_sidebar_positioning == 'both')
			$section_class = 'one-half';
		else if ($page_sidebar_positioning == 'left' || $page_sidebar_positioning == 'right') 
			$section_class = 'three-fourth';
			
		?>
		</section>
		<?php			
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right') {
			get_sidebar('right');	
		} ?>
		</div><!--row-->
		<?php
	}
}

// store the instance in a variable to be retrieved later and call init
$sc_theme_woocommerce = SocialChef_Theme_WooCommerce::get_instance();
$sc_theme_woocommerce->init();