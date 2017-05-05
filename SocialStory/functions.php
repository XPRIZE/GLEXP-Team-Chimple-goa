<?php
/**
 * Social Chef functions and definitions.
 *
 * Sets up the theme and provides some helper functions, which are used
 * in the theme as custom template tags. Others are attached to action and
 * filter hooks in WordPress to change core functionality.
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are instead attached
 * to a filter or action hook.
 *
 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since Social Chef 1.0
 */
 
 /* 
 * Loads the Options Panel
 *
 * If you're loading from a child theme use stylesheet_directory
 * instead of template_directory
 */

global $wpdb, $sc_installed_version, $sc_multi_language_count;
 
$sc_multi_language_count = 1;
global $sitepress;
if ($sitepress) {
	$active_languages = $sitepress->get_active_languages();
	$sitepress_settings = $sitepress->get_settings();
	$hidden_languages = array();
	if (isset($sitepress_settings['hidden_languages'])) 
		$hidden_languages = $sitepress_settings['hidden_languages'];
	$sc_multi_language_count = count($active_languages) + count($hidden_languages);
}

if ( ! defined( 'SOCIALCHEF_VERSION' ) )
	define( 'SOCIALCHEF_VERSION', '1.21' );
	
if ( ! defined( 'SOCIALCHEF_RECIPE_INGREDIENTS_TABLE' ) )
    define( 'SOCIALCHEF_RECIPE_INGREDIENTS_TABLE', $wpdb->prefix . 'sc_recipe_ingredients' );

if ( ! defined( 'SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE' ) )
	define( 'SOCIALCHEF_RECIPE_NUTRITIONAL_ELEMENTS_TABLE', $wpdb->prefix . 'sc_recipe_nutritional_elements' );
	
if ( !defined( 'BP_AVATAR_THUMB_WIDTH' ) )	
	define ( 'BP_AVATAR_THUMB_WIDTH', 90 );
if ( !defined( 'BP_AVATAR_THUMB_HEIGHT' ) )
	define ( 'BP_AVATAR_THUMB_HEIGHT', 90 );
if ( !defined( 'BP_AVATAR_FULL_WIDTH' ) )
	define ( 'BP_AVATAR_FULL_WIDTH', 270 );
if ( !defined( 'BP_AVATAR_FULL_HEIGHT' ) )
	define ( 'BP_AVATAR_FULL_HEIGHT', 270 );
	
if ( !defined( 'SOCIALCHEF_FAVORITE_RECIPES' ) )	
	define ( 'SOCIALCHEF_FAVORITE_RECIPES', '_socialchef_favorite_recipes' );
	
require_once dirname( __FILE__ ) . '/includes/theme_utils.php';

$sc_installed_version = get_option('socialchef_version', 0);

if ($sc_installed_version == 0)
	add_option("socialchef_version", SOCIALCHEF_VERSION);
else
	 update_option("socialchef_version", SOCIALCHEF_VERSION);

require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_of_default_fields.php');

if ( !function_exists( 'optionsframework_init' ) ) {
	define( 'OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri() . '/includes/framework/' );
	require_once dirname( __FILE__ ) . '/includes/framework/options-framework.php';
}

require_once dirname( __FILE__ ) . '/includes/theme_globals.php';

// /*-----------------------------------------------------------------------------------*/
// /*	Load Options Framework custom fields
// /*-----------------------------------------------------------------------------------*/
require_once dirname( __FILE__ ) . '/includes/theme_of_custom.php';

// /*-----------------------------------------------------------------------------------*/
// /*	Load Actions & Filters
// /*-----------------------------------------------------------------------------------*/
require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_filters.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_actions.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_woocommerce.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/frontend-submit/frontend-submit.php');

// /*-----------------------------------------------------------------------------------*/
// /*	Load Object Classes
// /*-----------------------------------------------------------------------------------*/
require_once SocialChef_Theme_Utils::get_file_path('/includes/post_types/abstracts/socialchef-entity.php');

// /*-----------------------------------------------------------------------------------*/
// /*	Load Widgets, Shortcodes, Metaboxes & Plugins
// /*-----------------------------------------------------------------------------------*/
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/metaboxes/meta_box.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/class-tgm-plugin-activation.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-contact.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-social.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-about.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-search.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-home-intro.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-recipe-categories.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-post-list.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-recipe-list.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-featured-recipe.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-featured-member.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget-share.php');

if (defined('BP_VERSION')) {
	require_once SocialChef_Theme_Utils::get_file_path('/includes/plugins/widgets/widget_buddypress-members.php');
}

show_admin_bar(false);

add_action( 'tgmpa_register', 'socialchef_register_required_plugins' );
/**
 * Register the required plugins for this theme.
 *
 *
 * The variable passed to tgmpa_register_plugins() should be an array of plugin
 * arrays.
 *
 * This function is hooked into tgmpa_init, which is fired within the
 * TGM_Plugin_Activation class constructor.
 */
function socialchef_register_required_plugins() {

    /**
     * Array of plugin arrays. Required keys are name and slug.
     * If the source is NOT from the .org repo, then source is also required.
     */
    $plugins = array(
        array(
            'name'      => 'BuddyPress',
            'slug'      => 'buddypress',
            'required'  => false,
        ),
        array(
            'name'      => 'BBPress',
            'slug'      => 'bbpress',
            'required'  => false,
        )
	);

    /**
     * Array of configuration settings. Amend each line as needed.
     * If you want the default strings to be available under your own theme domain,
     * leave the strings uncommented.
     * Some of the strings are added into a sprintf, so see the comments at the
     * end of each line for what each argument will be.
     */
    $config = array(
        'id'           => 'tgmpa',                 // Unique ID for hashing notices for multiple instances of TGMPA.
        'default_path' => '',                      // Default absolute path to pre-packaged plugins.
        'menu'         => 'tgmpa-install-plugins', // Menu slug.
        'has_notices'  => true,                    // Show admin notices or not.
        'dismissable'  => false,                    // If false, a user cannot dismiss the nag message.
        'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
        'is_automatic' => false,                   // Automatically activate plugins after installation or not.
        'message'      => '',                      // Message to output right before the plugins table.
        'strings'      => array(
            'page_title'                      => __( 'Install Required Plugins', 'socialchef' ),
            'menu_title'                      => __( 'Install Plugins', 'socialchef' ),
            'installing'                      => __( 'Installing Plugin: %s', 'socialchef' ), // %s = plugin name.
            'oops'                            => __( 'Something went wrong with the plugin API.', 'socialchef' ),
            'notice_can_install_required'     => _n_noop( 'This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_can_install_recommended'  => _n_noop( 'This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_can_activate_required'    => _n_noop( 'The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_can_activate_recommended' => _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_ask_to_update'            => _n_noop( 'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'socialchef' ), // %1$s = plugin name(s).
            'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'socialchef' ), // %1$s = plugin name(s).
            'install_link'                    => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'socialchef' ),
            'activate_link'                   => _n_noop( 'Begin activating plugin', 'Begin activating plugins', 'socialchef' ),
            'return'                          => __( 'Return to Required Plugins Installer', 'socialchef' ),
            'plugin_activated'                => __( 'Plugin activated successfully.', 'socialchef' ),
            'complete'                        => __( 'All plugins installed and activated successfully. %s', 'socialchef' ), // %s = dashboard link.
            'nag_type'                        => 'updated' // Determines admin notice type - can only be 'updated', 'update-nag' or 'error'.
        )
    );

    tgmpa( $plugins, $config );

}

// function chimple_scripts() {
//     wp_register_script('chimple_load', SocialChef_Theme_Utils::get_file_uri('/js/chimple.js'), array('jquery'), 1.1, true);
//     wp_enqueue_script('chimple_load');
// }

// add_action( 'wp_enqueue_scripts', 'chimple_scripts' );

  
// /*-----------------------------------------------------------------------------------*/
// /*	Load Utilities & Ajax & Custom Post Types & metaboxes
// /*-----------------------------------------------------------------------------------*/
require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_ajax.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_post_types.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/theme_meta_boxes.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/post_types/recipe.class.php');
require_once SocialChef_Theme_Utils::get_file_path('/includes/post_types/post.class.php');