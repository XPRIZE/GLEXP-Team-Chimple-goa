<?php
/**
 * The sidebar containing the under the header widget area.
 *
 * If no active widgets in sidebar, let's hide it completely.
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */

if ( is_active_sidebar( 'home-intro' ) ) { 
 
global $sc_theme_globals;
$home_intro_background_image = $sc_theme_globals->get_home_intro_background();

?>
	<!--intro-->
	<div class="intro" style="background-image:url(<?php echo esc_url ( $home_intro_background_image ); ?>);">
		<!--wrap-->
		<div class="wrap clearfix">
			<!--row-->
			<div class="row">
				<?php dynamic_sidebar( 'home-intro' ); ?>	
			</div>
		</div>
	</div>
<?php } ?>