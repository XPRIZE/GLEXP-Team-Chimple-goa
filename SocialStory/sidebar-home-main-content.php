<?php
/**
 * The sidebar containing the home main content widget area
 *
 * If no active widgets in sidebar, let's hide it completely.
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */

if ( is_active_sidebar( 'home-main-content' ) ) { 
 
global $sc_theme_globals;
?>
	<?php dynamic_sidebar( 'home-main-content' ); ?>	
<?php } ?>