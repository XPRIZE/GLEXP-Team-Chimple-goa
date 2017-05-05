<?php
/* Template Name: Recipe list */
/*
 * The template for displaying a page with recipes
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');

global $sc_theme_globals, $sc_recipes_post_type;
global $post;
$page_id = $post->ID;

if ( get_query_var('paged') ) {
    $paged = get_query_var('paged');
} else if ( get_query_var('page') ) {
    $paged = get_query_var('page');
} else {
    $paged = 1;
}
$posts_per_page = $sc_theme_globals->get_recipes_archive_posts_per_page();

$page_custom_fields = get_post_custom( $page_id);

$meal_courses = wp_get_post_terms($page_id, 'recipe_meal_course', array("fields" => "all"));
$meal_course_ids = array();
if (count($meal_courses) > 0) {
	$meal_course_ids[] = $meal_courses[0]->term_id;
}

$difficulties = wp_get_post_terms($page_id, 'recipe_difficulty', array("fields" => "all"));
$difficulty_ids = array();
if (count($difficulties) > 0) {
	$difficulty_ids[] = $difficulties[0]->term_id;
}

$sort_by = 'title';
if (isset($page_custom_fields['recipe_list_sort_by'])) {
	$sort_by = $page_custom_fields['recipe_list_sort_by'][0];
	$sort_by = empty($sort_by) ? 'title' : $sort_by;
}

$sort_descending = false;
if (isset($page_custom_fields['recipe_list_sort_descending'])) {
	$sort_descending = $page_custom_fields['recipe_list_sort_descending'][0] == '1' ? true : false;
}

$sort_order = $sort_descending ? 'DESC' : 'ASC';

$show_featured_only = false;
if (isset($page_custom_fields['recipe_list_show_featured'])) {
	$show_featured_only = $page_custom_fields['recipe_list_show_featured'][0] == '1' ? true : false;
}

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

?>
	<div class="row">
		<header class="s-title">
			<h1><?php the_title(); ?></h1>
		</header>
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'left')
			get_sidebar('left');
		?>
		<?php  while ( have_posts() ) : the_post(); ?>
		<?php if (!empty($post->post_content)) { ?>
		<article class="content <?php echo esc_attr($section_class); ?>" id="page-<?php the_ID(); ?>">
			<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'socialchef' ) ); ?>
			<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
		</article>
		<?php } ?>
		<?php endwhile; ?>	
		<!--three-fourth-->
		<?php 
		$recipe_results = $sc_recipes_post_type->list_recipes($paged, $posts_per_page, $sort_by, $sort_order, $meal_course_ids, $difficulty_ids, array(), array(), array(), $show_featured_only); 
		if ( count($recipe_results) > 0 && $recipe_results['total'] > 0 ) { ?>
		<section class="content <?php echo esc_attr($section_class); ?>">
			<div class="entries row">
			<?php
				$count = 0;
				foreach ($recipe_results['results'] as $recipe_result) {
					global $post, $sc_recipe_class;
					$post = $recipe_result;
					setup_postdata( $post ); 
					$sc_recipe_class = 'one-fourth';
					get_template_part('includes/parts/recipe', 'item');
					$count++;
				}
				if (((int)$recipe_results['results']) % 3 != 0)
					echo '</div><!--entries-->';
			?>
			<div class="quicklinks">
				<a href="javascript:void(0)" class="button scroll-to-top"><?php _e('Back to top', 'socialchef'); ?></a>
			</div>
			<div class="pager">
				<?php 
				$total_results = $recipe_results['total'];
				SocialChef_Theme_Utils::display_pager( ceil($total_results/$posts_per_page) ); 
				?>
			</div>
		</section><!--//three-fourth-->
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right')
			get_sidebar('right');
		?>
		<?php } ?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );