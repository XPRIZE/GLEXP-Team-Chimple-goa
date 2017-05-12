<?php

class SocialChef_Theme_Actions extends SocialChef_BaseSingleton {

	protected function __construct() {
	
        // our parent class might contain shared code in its constructor
        parent::__construct();
		
    }

    public function init() {
	
		if ( ! isset( $content_width ) ) {
			$content_width = 870;
		}
	
        add_action( 'after_setup_theme', array($this, 'setup' ) );
		add_action( 'wp_enqueue_scripts', array($this, 'enqueue_scripts' ), 11 );
		add_action( 'admin_enqueue_scripts', array($this, 'admin_enqueue_scripts' ) );
		add_action( 'login_form_login', array($this, 'disable_wp_login' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'remove_wp_open_sans' ) );		
		add_action( 'wp_print_styles', array( $this, 'register_google_fonts' ) );
		add_action( 'register_form',  array( $this, 'add_password_register_fields'), 10, 1 );

		add_action( 'show_user_profile', array( $this, 'show_extra_profile_fields') );
		add_action( 'edit_user_profile', array( $this, 'show_extra_profile_fields') );
		add_action( 'personal_options_update', array( $this, 'save_extra_profile_fields') );
		add_action( 'edit_user_profile_update', array( $this, 'save_extra_profile_fields') );
		
		if (defined('BP_VERSION')) {
			add_action( 'bp_setup_nav', array($this, 'bp_setup_nav'), 2 );
			// add_action( 'bp_setup_admin_bar', array($this, 'bp_setup_nav'), 2 );
		}
		
		add_action( 'wp_ajax_ingredient_search_request', array($this, 'ingredient_search_request' ) );
		add_action( 'wp_ajax_nopriv_ingredient_search_request', array($this, 'ingredient_search_request') );

		add_action( 'wp_ajax_nutritional_element_search_request', array($this, 'nutritional_element_search_request' ) );
		add_action( 'wp_ajax_nopriv_nutritional_element_search_request', array($this, 'nutritional_element_search_request') );
		
		add_action( 'comment_form_top', array($this, 'comment_form_top'));
		add_action( 'comment_form', array($this, 'comment_form'), 20, 1);
		add_action( 'comment_form_after_fields', array($this, 'comment_form_after_fields') );
		add_action( 'comment_form_before_fields', array($this, 'comment_form_before_fields') );
		
		add_action( 'wp_head', array($this, 'javascript_detection'), 0);

    }
	
	function comment_form_before_fields() {
		echo '<div class="f-row">';
	}
	
	function comment_form_after_fields() {
		echo '</div>';
	}
	
	function comment_form_top() {
		echo '<div class="container">';
	}
	
	function comment_form($post_id) {
		echo '</div>';
	}
	
	function ingredient_search_request() {
		$nonce = $_REQUEST['nonce'];
		$term = wp_kses($_REQUEST['q'], '');
		
		if ( wp_verify_nonce( $nonce, 'sc-ajax-nonce' ) ) {
		
			$taxonomies = array( 
				'ingredient',
			);
			
			$args = array('name__like' => $term, 'hide_empty' => 0);
			$found_ingredients = get_terms( $taxonomies, $args );
			
			$output = '';
			if (! empty( $found_ingredients ) && ! is_wp_error( $found_ingredients ) ) {
				foreach ($found_ingredients as $ingredient) {
					$output .= $ingredient->name . ';';
				}
			}
			echo $output;
			
		}

		die;
	}
	
	function nutritional_element_search_request() {
		$nonce = $_REQUEST['nonce'];
		$term = wp_kses($_REQUEST['q'], '');
		
		if ( wp_verify_nonce( $nonce, 'sc-ajax-nonce' ) ) {
		
			$taxonomies = array( 
				'nutritional_element',
			);
			
			$args = array('name__like' => $term, 'hide_empty' => 0);
			$found_nutritional_elements = get_terms( $taxonomies, $args );
			
			$output = '';
			if (! empty( $found_nutritional_elements ) && ! is_wp_error( $found_nutritional_elements ) ) {
				foreach ($found_nutritional_elements as $nutritional_element) {
					$output .= $nutritional_element->name . ';';
				}
			}
			echo $output;
			
		}

		die;
	}
	
	function bp_setup_nav() {
		global $bp;
		
		$recipes_slug = 'recipes';
		$my_recipes_slug = 'recipes/my-recipes';
		$recipes_link = $bp->displayed_user->domain . $recipes_slug . '/';

		$count = 0;
		$class = '';
		if (isset($bp->displayed_user) && isset($bp->displayed_user->id) && $bp->displayed_user->id > 0) {
			global $sc_recipes_post_type;
			$user_recipe_results = $sc_recipes_post_type->list_recipes( 0, -1, '', '', array(), array(), array(), array(), array(), false, $bp->displayed_user->id);
			if ( count($user_recipe_results) > 0 && $user_recipe_results['total'] > 0 )
				$count = (int)$user_recipe_results['total'];
					
			$class    = ( 0 === $count ) ? 'no-count' : 'count';
		}
		
		bp_core_new_nav_item( array( 
			'name' => sprintf( __( 'Stories <span class="%s">%s</span>', 'socialchef' ), esc_attr( $class ), number_format_i18n( $count ) ),
			'slug' => $my_recipes_slug,
			'position' => 55,
			'screen_function'     => array( $this, 'bp_recipes_tab_screen'),
			'parent_url'          => $bp->displayed_user->domain,
			'default_subnav_slug' => 'my-recipes'
		) );
		
		bp_core_new_subnav_item( array(
    			'name' => __('My Stories', 'socialchef'),
    			'slug' => 'my-recipes',
    			'parent_slug' => $recipes_slug,
    			'parent_url' => $recipes_link,
    			'screen_function' => array( $this, 'bp_my_recipes_tab_screen'),
    			'position' => 20,
    			'user_has_access' => true
    	) );
		
		bp_core_new_subnav_item( array(
    			'name' => __('Favorite Stories', 'socialchef'),
    			'slug' => 'favorite-recipes',
    			'parent_slug' => $recipes_slug,
    			'parent_url' => $recipes_link,
    			'screen_function' => array( $this, 'bp_favorite_recipes_tab_screen'),
    			'position' => 30,
    			'user_has_access' => true
    	) );
		
	}
	
	function bp_recipes_tab_screen() {
		global $bp;
		do_action( 'bp_socialchef_recipes_screen' );
		bp_core_load_template( 'recipes' ) ;
	}
	
	function bp_my_recipes_tab_screen() {
		global $bp;
		do_action( 'bp_socialchef_my_recipes_screen' );
		bp_core_load_template( 'recipes/my' ) ;
	}
	
	function bp_favorite_recipes_tab_screen() {
		global $bp;
		do_action( 'bp_socialchef_favorite_recipes_screen' );
		bp_core_load_template( 'recipes/favorite' );
	}
	
	function setup() {

		/*
		 * SocialChef available for translation.
		 *
		 * Translations can be added to the /languages/ directory.
		 * If you're building a theme based on SocialChef, use a find and replace
		 * to change 'socialchef' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'socialchef', get_template_directory() . '/languages' );

		// This theme uses wp_nav_menu() in three locations.
		register_nav_menus( array(
			'primary-menu' => __( 'Primary Menu', 'socialchef' ),
			'footer-menu' => __( 'Footer Menu', 'socialchef' )
		) );	
		
		// This theme uses a custom image size for featured images, displayed on "standard" posts.
		add_theme_support( 'post-thumbnails' );
		
		// Add RSS feed links to <head> for posts and comments.
		add_theme_support( 'automatic-feed-links' );
		
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );
		
		// This theme is woocommerce compatible
		add_theme_support( 'woocommerce' );
		
		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
		) );
		
		// This theme uses its own gallery styles.
		add_filter( 'use_default_gallery_style', '__return_false' );
		
		set_post_thumbnail_size( 800, 600, true );
		add_image_size('content-image', 800, 600, true);
		add_image_size('thumb-image', 400, 300, true);
		
		//Left Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Left Sidebar', 'socialchef'),
			'id'=>'left',
			'description' => __('This Widget area is used for the left sidebar', 'socialchef'),
			'before_widget' => '<li class="widget widget-sidebar">',
			'after_widget' => '</li>',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Right Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Right Sidebar', 'socialchef'),
			'id'=>'right',
			'description' => __('This Widget area is used for the right sidebar', 'socialchef'),
			'before_widget' => '<li class="widget widget-sidebar">',
			'after_widget' => '</li>',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Under Header Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Under Header Sidebar', 'socialchef'),
			'id'=>'under-header',
			'description' => __('This Widget area is placed under the website header', 'socialchef'),
			'before_widget' => '<li class="widget widget-sidebar">',
			'after_widget' => '</li>',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Under Header Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Above Footer Sidebar', 'socialchef'),
			'id'=>'above-footer',
			'description' => __('This Widget area is placed above the website footer', 'socialchef'),
			'before_widget' => '<li class="widget widget-sidebar">',
			'after_widget' => '</li>',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Right Sidebar Widget area for Recipe
		register_sidebar(array(
			'name'=> __('Right Sidebar Story', 'socialchef'),
			'id'=>'right-recipe',
			'description' => __('This Widget area is used for the right sidebar of the single story screen', 'socialchef'),
			'before_widget' => '<li class="widget widget-sidebar">',
			'after_widget' => '</li>',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Footer Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Footer Sidebar', 'socialchef'),
			'id'=>'footer',
			'description' => __('This Widget area is used for the footer area', 'socialchef'),
			'before_widget' => '<li class="widget widget-sidebar">',
			'after_widget' => '</li>',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Header Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Header Sidebar', 'socialchef'),
			'id'=>'header',
			'description' => __('This Widget area is used for the header area (usually for purposes of displaying WPML language switcher widget)', 'socialchef'),
			'before_widget' => '',
			'after_widget' => '',
			'class'	=> 'lang-nav',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Header Sidebar Widget area
		register_sidebar(array(
			'name'=> __('Home Intro Sidebar', 'socialchef'),
			'id'=>'home-intro',
			'description' => __('This Widget area is used for the home intro area (usually for purposes of displaying hero unit and search widget)', 'socialchef'),
			'before_widget' => '<div id="%1$s" class="%2$s">',
			'after_widget' => '</div>',
			'class'	=> '',
			'before_title' => '<h5>',
			'after_title' => '</h5>',
		));
		
		// Home Featured Content Widget area
		register_sidebar(array(
			'name'=> __('Home Featured Content', 'socialchef'),
			'id'=>'home-featured-content',
			'description' => __('This Widget area is used for the home featured content area', 'socialchef'),
			'before_widget' => '',
			'after_widget' => '',
			'class'	=> '',
			'before_title' => '<h2 class="ribbon bright">',
			'after_title' => '</h2>',
		));
		
		// Home Main Content Widget area
		register_sidebar(array(
			'name'=> __('Home Main Content', 'socialchef'),
			'id'=>'home-main-content',
			'description' => __('This Widget area is used for the home main content area to display post and story lists as well as other widgets', 'socialchef'),
			'before_widget' => '',
			'after_widget' => '',
			'class'	=> '',
			'before_title' => '<h2 class="ribbon bright">',
			'after_title' => '</h2>',
		));
		
	}
	
	/**
	 * JavaScript Detection.
	 *
	 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
	 *
	 * @since Twenty Fifteen 1.1
	 */
	function javascript_detection() {
		echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
	}
	
	function enqueue_scripts() {
	
		global $wp_styles;

		/*
		 * Adds JavaScript to pages with the comment form to support
		 * sites with threaded comments (when in use).
		 */
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) )
			wp_enqueue_script( 'comment-reply' );

		/*
		 * Adds JavaScript for various theme features
		 */		 
		wp_enqueue_script('jquery');
		// wp_enqueue_script('jquery-ui-core');
		// wp_enqueue_script('jquery-effects-core');

		$page_object = get_queried_object();
		$page_id     = get_queried_object_id();
		
		wp_enqueue_script( 'socialchef-slicknav', SocialChef_Theme_Utils::get_file_uri('/js/jquery.slicknav.min.js'), array('jquery'), '1.0', true );
		wp_enqueue_script( 'socialchef-jquery.uniform', SocialChef_Theme_Utils::get_file_uri('/js/jquery.uniform.min.js'), array('jquery'), '1.0', true );
		wp_enqueue_script( 'socialchef-scripts', SocialChef_Theme_Utils::get_file_uri('/js/scripts.js'), array('jquery'), '1.0', true );
		if ( is_home() || is_front_page() ) {
			wp_enqueue_script( 'socialchef-home', SocialChef_Theme_Utils::get_file_uri('/js/home.js'), array('jquery'), '1.0', true );
		}		
		
		wp_register_script( 'socialchef-prettyphoto', SocialChef_Theme_Utils::get_file_uri('/js/jquery.prettyPhoto.js'), array('jquery'), '1.0', true );
		wp_enqueue_script( 'socialchef-prettyphoto');
		wp_enqueue_style('socialchef-style-pp',  SocialChef_Theme_Utils::get_file_uri('/css/prettyPhoto.css'), array(), '1.0', "screen");
		wp_enqueue_style('socialchef-icons',  SocialChef_Theme_Utils::get_file_uri('/css/icons.css'), array(), '1.0', "screen");
		
		wp_localize_script( 'socialchef-scripts', 'SCAjax', array( 
			   'ajax_url' => admin_url( 'admin-ajax.php' ),
			   'nonce'   => wp_create_nonce('sc-ajax-nonce') 
			) );

		/*
		 * Loads our main stylesheets.
		 */
		global $sc_theme_globals;
		if ($sc_theme_globals->enable_rtl()) {
			wp_enqueue_style( 'socialchef-style-main', SocialChef_Theme_Utils::get_file_uri ('/css/style-rtl.css'), array(), '1.0', "screen,projection,print");
		} else {
			wp_enqueue_style('socialchef-style-main',  SocialChef_Theme_Utils::get_file_uri('/css/style.css'), array(), '1.0', "screen,projection,print");
		}
		wp_enqueue_style( 'socialchef-style', get_stylesheet_uri() );		

		/*
		 * Load the color scheme sheet if set in options.
		 */	 
		$color_scheme_style_sheet = of_get_option('color_scheme_select', 'theme-default');
		if (!empty($color_scheme_style_sheet)) {
			wp_enqueue_style('socialchef-style-color',  SocialChef_Theme_Utils::get_file_uri('/css/' . $color_scheme_style_sheet . '.css'), array(), '1.0', "screen,projection,print");
		}
		
		global $post;
		if (isset($post)) {
			$template_file = get_post_meta($post->ID,'_wp_page_template',true);
			if ($template_file == 'page-user-submit-recipe.php') {
				wp_enqueue_script( 'socialchef-jquery-validate', SocialChef_Theme_Utils::get_file_uri('/js/jquery.validate.min.js'), array('jquery'), '1.0', true );
				wp_enqueue_script( 'socialchef-custom-suggest', SocialChef_Theme_Utils::get_file_uri('/js/custom-suggest.js'), array('jquery'), '1.0', true );
				wp_register_script( 'frontend-submit',  SocialChef_Theme_Utils::get_file_uri ('/includes/plugins/frontend-submit/frontend-submit.js'), array( 'jquery', 'socialchef-jquery-validate', 'socialchef-custom-suggest' ), '1.0', true );
				wp_enqueue_script( 'frontend-submit' );	
		
				wp_enqueue_script('game_js', SocialChef_Theme_Utils::get_file_uri('/js/game.min.js'), array('jquery'), 1.1, true);					

			} elseif ($template_file == 'page-custom-search.php') {
				wp_enqueue_script( 'socialchef-custom-suggest', SocialChef_Theme_Utils::get_file_uri('/js/custom-suggest.js'), array('jquery'), '1.0', true );
				wp_register_script( 'socialchef-search',  SocialChef_Theme_Utils::get_file_uri ('/js/search.js'), array( 'jquery', 'socialchef-custom-suggest' ), '1.0', true );
				wp_enqueue_script( 'socialchef-search' );	
			
			}
		}

		if($post->post_type  === 'recipe') {
			wp_enqueue_script('game_js', SocialChef_Theme_Utils::get_file_uri('/js/game.min.js'), array('jquery'), 1.1, true);					
		}
		
	}
	
    function remove_wp_open_sans() {
	
        wp_deregister_style( 'open-sans' );
        wp_register_style( 'open-sans', false );
		
    }
	
	function register_google_fonts() {
	
		wp_register_style('Raleway', 'http://fonts.googleapis.com/css?family=Raleway:400,300,500,600,700,800');
        wp_enqueue_style( 'Raleway');
		
	}
	
	function admin_enqueue_scripts() {
	
		wp_enqueue_script('jquery');
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-slider');
		wp_enqueue_script('jquery-ui-datepicker');
		wp_enqueue_script('jquery-ui-droppable');
		wp_enqueue_script('jquery-ui-draggable');
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_script('jquery-ui-selectable');
		wp_enqueue_script('jquery-ui-autocomplete');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-ui-dialog');
		wp_enqueue_script('jquery-ui-spinner');		
		wp_enqueue_script('jquery-effects-core');
		
		wp_register_script('socialchef-admin', SocialChef_Theme_Utils::get_file_uri('/includes/admin/admin.js'), false, '1.0.0');
		wp_enqueue_script('socialchef-admin');
		
		wp_register_script('socialchef-widgets', SocialChef_Theme_Utils::get_file_uri('/includes/admin/widgets.js'), false, '1.0.0');
		wp_enqueue_script('socialchef-widgets');
		
		wp_enqueue_style('socialchef-admin-css', SocialChef_Theme_Utils::get_file_uri('/css/admin-custom.css'), false);
		wp_enqueue_style('socialchef-admin-ui-css', SocialChef_Theme_Utils::get_file_uri('/css/jquery-ui.min.css'), false);
	}
		
	function show_extra_profile_fields( $user ) { 
		if (is_super_admin()) {
	?>
		<h3><?php _e('Extra profile information', 'socialchef'); ?></h3>
		<table class="form-table">
			<tr>
				<th><label for="is_featured"><?php _e('Is Featured', 'socialchef'); ?></label></th>
				<td>
					<input type="checkbox" name="is_featured" id="is_featured" value="1" <?php echo get_the_author_meta( 'is_featured', $user->ID ) == '1' ? 'checked="checked"' : ''; ?> class="checkbox is_featured" /><br />
					<span class="description"><?php _e('Is this member featured on our website?', 'socialchef'); ?></span>
				</td>
			</tr>
			<tr class="featured_date">
				<th><label for="featured_date"><?php _e('Featured from date', 'socialchef'); ?></label></th>
				<td>
					<input type="text" name="featured_date" id="featured_date" value="<?php echo esc_attr( get_the_author_meta( 'featured_date', $user->ID ) ); ?>" class="datepicker" /><br />
					<span class="description"><?php _e('From what date is this member featured', 'socialchef'); ?></span>
				</td>
			</tr>
		</table>
	<?php 
		}
	}
	
	function save_extra_profile_fields( $user_id ) {

		if ( !current_user_can( 'edit_user', $user_id ) )
			return false;

		update_user_meta( $user_id, 'is_featured', $_POST['is_featured'] );
		
		update_user_meta( $user_id, 'featured_date', $_POST['featured_date'] );
	}
		
	/**
	 * Disable WP login if option enabled in Theme settings
	 */
	function disable_wp_login(){
	
		global $sc_theme_globals;
		if ($sc_theme_globals->override_wp_login()) {
			$login_page_url = $sc_theme_globals->get_login_page_url();
			$redirect_to_after_logout_url = $sc_theme_globals->get_redirect_to_after_logout_url();
			if (!empty($login_page_url) && !empty($redirect_to_after_logout_url)) {
				if( isset( $_GET['loggedout'] ) ){
					wp_redirect( $sc_theme_globals->get_redirect_to_after_logout_url() );
					exit;
				} else{
					wp_redirect( $sc_theme_globals->get_login_page_url() );
					exit;
				}
			}
		}
	}

	function add_password_register_fields(){
		
		if (!defined('BP_VERSION')) {
			global $sc_theme_globals, $sc_signup_errors;
			$let_users_set_pass = $sc_theme_globals->let_users_set_pass();
				
			if ($let_users_set_pass) { ?>
			<div class="f-row">
				<input id="user_pass" class="input" type="password" placeholder="<?php esc_attr_e('Password', 'socialchef'); ?>" tabindex="30" size="25" value="" name="user_pass" />
				<?php if( isset( $sc_signup_errors['user_pass'] ) ){ ?>
				<div class="alert alert-danger"><?php echo $sc_signup_errors['user_pass']; ?></div>
				<?php } ?>
			</div>
			<div class="f-row">
				<input id="confirm_pass" class="input" type="password" tabindex="40" size="25" placeholder="<?php esc_attr_e('Repeat password', 'socialchef'); ?>" value="" name="confirm_pass" />
				<?php if( isset( $sc_signup_errors['confirm_pass'] ) ){ ?>
				<div class="alert alert-danger"><?php echo $sc_signup_errors['confirm_pass']; ?></div>
				<?php } ?>
			</div>
			<?php
			}		
		}
	}

}

// store the instance in a variable to be retrieved later and call init
$sc_theme_actions = SocialChef_Theme_Actions::get_instance();
$sc_theme_actions->init();