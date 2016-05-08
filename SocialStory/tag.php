<?php
/* Tag archive
 *
 * The template for displaying the list of blog posts per tag
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');
global $wp_query;
?>
	<div class="row">
		<header class="s-title">
			<h1 class="archive-title"><?php printf( __( 'Tag Archives: %s', 'socialchef' ), single_cat_title( '', false ) ); ?></h1>
		</header>
		
		<section class="content three-fourth">
		<?php if ( have_posts() ) : ?>
		<?php  while ( have_posts() ) : the_post(); ?>
		<!--blog post-->
		<article class="post">
			<div class="entry-meta entry-header">
				<div class="date">
					<span class="day"><?php echo get_the_date('d') ?></span> 
					<span class="my"><?php echo get_the_date('M') ?>, <?php echo get_the_date('Y') ?></span>
				</div>
				<div class="avatar">
					<a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta( 'ID' ))) ?>"><?php echo get_avatar( get_the_author_meta( 'ID' ), 32 ); ?><span><?php echo get_the_author() ?></span></a>
				</div>
			</div>
			<div class="container">
				<?php if ( has_post_thumbnail() ) { ?>
				<div class="entry-featured"><a href="#"><?php the_post_thumbnail('featured', array('title' => get_the_title())); ?></a></div>
				<?php } ?>
				<div class="entry-content">
					<h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
					<p><?php the_excerpt(); ?></p>
				</div>
				<div class="actions">
					<div>
						<div class="category"><i class="ico i-category"></i><?php the_category(' ') ?></div>
						<div class="comments"><i class="ico  i-comments"></i><a href="<?php comments_link(); ?>"><?php comments_number('0','1','%'); ?></a></div>
						<div class="leave_comment"><a href="<?php comments_link(); ?>"><?php _e('Leave a comment', 'socialchef'); ?></a></div>
						<div class="more"><a href="<?php the_permalink() ?>"><?php _e('Read more', 'socialchef'); ?></a></div>
					</div>
				</div>
			</div>
		</article>
		<!--//blog post-->
		<?php endwhile; ?>
		<div class="quicklinks">
			<a href="javascript:void(0)" class="button scroll-to-top"><?php _e('Back to top', 'socialchef'); ?></a>
		</div>
		<div class="pager">
			<?php SocialChef_Theme_Utils::display_pager($wp_query->max_num_pages); ?>
		</div>
		<?php endif; ?>
		</section>
		<?php get_sidebar('right'); ?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );