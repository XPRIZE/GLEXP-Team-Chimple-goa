<?php
/**
 * The sidebar containing the home featured content area
 *
 * If no active widgets in sidebar, let's hide it completely.
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */

if ( is_active_sidebar( 'home-featured-content' ) ) { 
 
global $sc_theme_globals;
?>
	<!--cwrap-->
	<div class="cwrap">
		<!--entries-->
		<div class="entries row">
			<?php dynamic_sidebar( 'home-featured-content' ); ?>	
		</div>
		<!--//entries-->
	</div>
	<!--//cwrap-->
<?php } ?>