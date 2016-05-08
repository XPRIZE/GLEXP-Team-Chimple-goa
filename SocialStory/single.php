<?php 
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');
?>
	
	<!--row-->
	<div class="row">
		<header class="s-title">
			<h1><?php the_title(); ?></h1>
		</header>
	
		<!--content-->
		<section class="content three-fourth">
			<article <?php post_class( ); ?>>
			<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>	
				<!--blog entry-->
				<div id="post-<?php the_ID(); ?>">
					<div class="entry-meta entry-header">
						<div class="date updated">
							<span class="day"><?php echo get_the_date('d') ?></span> 
							<span class="my"><?php echo get_the_date('M') ?>, <?php echo get_the_date('Y') ?></span>
						</div>
						<div class="avatar vcard author post-author">
							<a href="<?php echo esc_url( get_author_posts_url(get_the_author_meta( 'ID' )) ); ?>"><?php echo get_avatar( get_the_author_meta( 'ID' ), 32 ); ?><span class="fn"><?php echo get_the_author() ?></span></a>
						</div>
					</div>
					<div class="container">
						<?php if ( has_post_thumbnail() ) { ?>
						<div class="entry-featured"><a href="<?php the_permalink() ?>"><?php the_post_thumbnail('content-image', array('title' => get_the_title())); ?></a></div>
						<?php } ?>
						<div class="entry-content">
							<?php the_content(); ?>
							<div class="tags"><?php the_tags(); ?></div>
							<div class="categories"><?php _e('Categories', 'socialchef'); ?>: <?php the_category( ' ' ); ?></div>
						</div>
					</div>
				</div>
				<?php comments_template( '', true ); ?>		
				<!--//blog entry-->
				<?php endwhile; ?>
			</article>
		</section>
		
		<?php get_sidebar('right'); ?>
	</div>
<?php 
get_footer( 'buddypress' );