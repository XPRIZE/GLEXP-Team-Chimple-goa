<?php
/* Template Name: SocialChef Home page
 * The Front Page template file.
 *
 * This is the template of the page that can be selected to be shown as the front page.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
get_sidebar('under-header');
global $sc_theme_globals;
$home_intro_background_image = $sc_theme_globals->get_home_intro_background();
$show_social_chef_in_numbers_on_homepage = $sc_theme_globals->show_social_chef_in_numbers_on_homepage();
?>
		<?php get_sidebar( 'home-intro' ); ?>
		<div class="wrap clearfix">
			<!--row-->
			<div class="row">
				<?php 
				if ($show_social_chef_in_numbers_on_homepage)
					get_template_part('includes/parts/socialchef', 'in-numbers'); 
				?>				
				<section class="content three-fourth">
					<?php get_sidebar( 'home-featured-content' ); ?>
					<?php get_sidebar( 'home-main-content' ); ?>
					<?php wp_reset_postdata(); ?>
				</section>
				<?php get_sidebar( 'right' ); ?>
			</div>
			<!--//row-->
		</div>
		<!--//wrap-->
<?php
get_footer( 'buddypress' ); 
