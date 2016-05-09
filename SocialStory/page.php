<?php
/* Template Name: Page With No Sidebar */
/*
 * The template for displaying a page with no sidebars
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');

global $post;

$page_id = $post->ID;
$page_custom_fields = get_post_custom( $page_id);

$page_sidebar_positioning = null;
if (isset($page_custom_fields['page_sidebar_positioning'])) {
	$page_sidebar_positioning = $page_custom_fields['page_sidebar_positioning'][0];
	$page_sidebar_positioning = empty($page_sidebar_positioning) ? '' : $page_sidebar_positioning;
}

if (SocialChef_Theme_Utils::is_a_woocommerce_page()) {
	global $sc_theme_globals;

	$page_sidebar_positioning = $sc_theme_globals->get_woocommerce_pages_sidebar_position();
	$page_sidebar_positioning = empty($page_sidebar_positioning) ? '' : $page_sidebar_positioning;
}

$section_class = 'full-width';
if ($page_sidebar_positioning == 'both')
	$section_class = 'one-half';
else if ($page_sidebar_positioning == 'left' || $page_sidebar_positioning == 'right') 
	$section_class = 'three-fourth';
?>
	<div class="row">
		<?php  while ( have_posts() ) : the_post(); ?>
		<header class="s-title">
			<h1><?php the_title(); ?></h1>
		</header>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'left')
			get_sidebar('left');
		?>
		<section class="content <?php echo esc_attr($section_class); ?>">
			<!--container-->
			<article class="container" id="page-<?php the_ID(); ?>">
				<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'socialchef' ) ); ?>
				<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
			</article><!--//container-->
		</section>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right')
			get_sidebar('right');
		?>
		<?php endwhile; ?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );