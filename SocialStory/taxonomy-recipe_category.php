<?php
/* Category recipe archive
 *
 * The template for displaying a page with recipes categorized by recipe category
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */

get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');

global $sc_theme_globals, $sc_recipes_post_type;
?>
	<div class="row">
		<header class="s-title">
			<h1 class="archive-title"><?php printf( __( 'Category Archives: %s', 'socialchef' ), single_cat_title( '', false ) ); ?></h1>
		</header>
		<section class="content three-fourth">
		<?php  if ( have_posts() ) : ?>
		<?php 
			$colcount = 0;
			global $post, $sc_recipe_class, $wp_query;
			$found_posts = (int)$wp_query->found_posts;
			while ( have_posts() ) : the_post(); ?>
		<?php	if ($colcount > 0 && $colcount % 3 == 0)				
					echo '</div>';
				if ($colcount % 3 == 0)
					echo '<div class="entries row">';
				$sc_recipe_class = 'one-third';
				get_template_part('includes/parts/recipe', 'item');
				$colcount++;
			endwhile; 
			if ($found_posts % 3 != 0)
				echo '</div><!--entries-->'; ?>
			<div class="quicklinks">
				<a href="javascript:void(0)" class="button scroll-to-top"><?php _e('Back to top', 'socialchef'); ?></a>
			</div>
			<div class="pager">
				<?php SocialChef_Theme_Utils::display_pager($wp_query->max_num_pages); ?>
			</div>
		<?php endif; ?>
		</section><!--//three-fourth-->
		<?php get_sidebar('right'); ?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );