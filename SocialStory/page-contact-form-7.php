<?php
/* Template Name: Contact Form 7 Page */
/*
 * The template for displaying a contact form 7 form
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');
?>
	<!--row-->
	<div class="row">
	<!--content-->
		<section class="content center full-width">
			<?php  while ( have_posts() ) : the_post(); ?>
			<article class="content center full-width" id="page-<?php the_ID(); ?>">
				<div class="modal container">
					<h3><?php the_title(); ?></h3>
					<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'socialchef' ) ); ?>
					<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
				</div>
			</article>
			<?php endwhile; ?>	
		</section>
	</div>
<?php 	
get_footer( 'buddypress' ); 