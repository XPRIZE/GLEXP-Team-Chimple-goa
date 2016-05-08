<?php
/* Template Name: Submit recipe */
/*
 * The template for submit recipe page *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
  
if ( !is_user_logged_in() ) {
	wp_redirect( get_home_url() );
	exit;
}
 
global $sc_theme_globals, $sc_signup_errors, $post, $sc_frontend_submit;
 
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

$section_class = 'full-width';
if ($page_sidebar_positioning == 'both')
	$section_class = 'one-half';
else if ($page_sidebar_positioning == 'left' || $page_sidebar_positioning == 'right') 
	$section_class = 'three-fourth';

$sc_frontend_submit->prepare_form('recipe');
?>
	<!--row-->
	<div class="row">
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'left')
			get_sidebar('left');
		?>
		<?php  while ( have_posts() ) : the_post(); ?>
		<?php if (!empty($post->post_content)) { ?>
		<article class=" <?php echo esc_attr($section_class); ?>" id="page-<?php the_ID(); ?>">
			<h1><?php the_title(); ?></h1>
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'socialchef' ) ); ?>
			<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
		</article>
		<?php } ?>
		<?php endwhile; ?>	
		<section class="content <?php echo esc_attr($section_class); ?>">
			<div class="submit_recipe container">
				<?php echo $sc_frontend_submit->upload_form('recipe'); ?>
			</div>
		</section>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right')
			get_sidebar('right');
		?>

	</div>	
	<!--//row-->
<?php 	
get_footer( 'buddypress' );