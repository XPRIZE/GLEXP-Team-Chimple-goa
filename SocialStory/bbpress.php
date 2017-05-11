<?php
/* BBPress default template  */
/*
 * The template for displaying a page with bbpress content
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');
?>
	<div class="row">
		<?php  while ( have_posts() ) : the_post(); ?>
		<header class="s-title">
			<h1><?php the_title(); ?></h1>
		</header>
		<!--full-width-->
		<section class="content full-width">
			<!--container-->
			<article id="page-<?php the_ID(); ?>">
				<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'socialchef' ) ); ?>
				<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
			</article><!--//container-->
		</section><!--//full-width-->
		<?php endwhile; ?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );