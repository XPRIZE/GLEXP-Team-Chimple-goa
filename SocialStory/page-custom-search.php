<?php
/* Template Name: Custom search page */
/*
 * The template for displaying a custom search page
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

if ( get_query_var('paged') ) {
    $paged = get_query_var('paged');
} else if ( get_query_var('page') ) {
    $paged = get_query_var('page');
} else {
    $paged = 1;
}
$posts_per_page = $sc_theme_globals->get_recipes_archive_posts_per_page();

$sort_by = 'title';
$sort_order = 'asc';

$difficulty_ids = array();
$request_diff = 0;
if (isset($_GET['diff'])) {
	$request_diff = wp_kses($_GET['diff'], '');
	if ($request_diff > 0)
		$difficulty_ids[] = $request_diff;
}

$meal_course_ids = array();
$request_mc = 0;
if (isset($_GET['mc'])) {
	$request_mc = wp_kses($_GET['mc'], '');
	if ($request_mc > 0)
		$meal_course_ids[] = $request_mc;
}

$category_ids = array();
$request_cat = 0;
if (isset($_GET['cat'])) {
	$request_cat = wp_kses($_GET['cat'], '');
	if ($request_cat > 0)
		$category_ids[] = $request_cat;
}

$search_args = array();

$request_serv = 0;
if (isset($_GET['serv'])) {
	$request_serv = intval($_GET['serv']);
	if ($request_serv > 0 && $request_serv <= 5)
		$search_args['serving'] = $request_serv;
}

$request_prep = 0;
if (isset($_GET['prep'])) {
	$request_prep = intval($_GET['prep']);
	if ($request_prep > 0 && $request_prep <= 180)
		$search_args['preparation_time'] = $request_prep;
}

$request_cook = 0;
if (isset($_GET['cook'])) {
	$request_cook = intval($_GET['cook']);
	if ($request_cook > 0 && $request_cook <= 180)
		$search_args['cooking_time'] = $request_cook;
}

$request_term = '';
if (isset($_GET['term'])) {
	$request_term = wp_kses($_GET['term'], '');
	if (!empty($request_term))
		$search_args['keyword'] = $request_term;
}

$ingredient_ids = array();
if (isset($_GET['ingredients'])) {
	$ingredient_array = (array)$_GET["ingredients"];
	if (count($ingredient_array)) {
		foreach ($ingredient_array as $ingredient_string) {
			$term = get_term_by('name', $ingredient_string, 'ingredient');
			if ($term) {
				$ingredient_ids[] = $term->term_id;
			}
		}
	}
}

$taxonomies = array( 
    'ingredient',
);

$args = array(
    'orderby'           => 'name', 
    'order'             => 'ASC',
    'hide_empty'        => true, 
    'exclude'           => array(), 
    'exclude_tree'      => array(), 
    'include'           => array(),
    'number'            => '', 
    'fields'            => 'all', 
    'slug'              => '', 
    'parent'            => '',
    'hierarchical'      => true, 
    'child_of'          => 0, 
    'get'               => '', 
    'name__like'        => '',
    'description__like' => '',
    'pad_counts'        => false, 
    'offset'            => '', 
    'search'            => '', 
    'cache_domain'      => 'core'
); 

$terms = get_terms($taxonomies, $args);

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
		<section class="content <?php echo esc_attr($section_class); ?>">
			<div class="recipefinder">
					<h3><?php _e('Please select your search parameters and press "Search for stories"', 'socialchef') ?></h3>
					<form id="custom-search-2" method="get" action="<?php echo SocialChef_Theme_Utils::get_current_page_url(); ?>">
						<div class="row">
							<div class="search one-fourth">
								<input type="search" name="term" id="search_term" value="<?php echo $request_term; ?>" placeholder="<?php _e('Story name', 'socialchef'); ?>">
							</div>
							<div class="one-fourth">
								<select name="cat" id="recipe_category">
									<option value="0"><?php echo __('Select category', 'socialchef'); ?></option>
									<?php 
									$args = array( 
										'taxonomy'=>'recipe_category', 
										'hide_empty'=>'0'
									);
									$recipe_categories = get_categories($args);

									if (count($recipe_categories) > 0) { 
										for ($i = 0; $i < count($recipe_categories); $i++) {
											if (isset($recipe_categories[$i])) {
												$recipe_category = $recipe_categories[$i];
												$term_id = $recipe_category->term_id;
												$term_name = $recipe_category->name;
									?>	
									<option <?php echo ($term_id == $request_cat ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( $term_id ); ?>"><?php echo $term_name; ?></option>
									<?php	}
										}
									} ?>
								</select>
							</div>
							<div class="one-fourth">
								<select name="mc" id="recipe_meal_course">
									<option value="0"><?php echo __('Select license', 'socialchef'); ?></option>
									<?php 
									$args = array( 
										'taxonomy'=>'recipe_meal_course', 
										'hide_empty'=>'0'
									);
									$recipe_meal_courses = get_categories($args);

									if (count($recipe_meal_courses) > 0) { 
										for ($i = 0; $i < count($recipe_meal_courses); $i++) {
											if (isset($recipe_meal_courses[$i])) {
												$recipe_meal_course = $recipe_meal_courses[$i];
												$term_id = $recipe_meal_course->term_id;
												$term_name = $recipe_meal_course->name;
									?>	
									<option <?php echo ($term_id == $request_mc ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( $term_id ); ?>"><?php echo $term_name; ?></option>
									<?php	}
										}
									} ?>
								</select>
							</div>
							<div class="one-fourth">
								<select name="diff" id="recipe_difficulty">
									<option value="0"><?php echo __('Select language', 'socialchef'); ?></option>
									<?php 
									$args = array( 
										'taxonomy'=>'recipe_difficulty', 
										'hide_empty'=>'0'
									);
									$recipe_difficulties = get_categories($args);

									if (count($recipe_difficulties) > 0) { 
										for ($i = 0; $i < count($recipe_difficulties); $i++) {
											if (isset($recipe_difficulties[$i])) {
												$recipe_difficulty = $recipe_difficulties[$i];
												$term_id = $recipe_difficulty->term_id;
												$term_name = $recipe_difficulty->name;
									?>	
									<option <?php echo ( $term_id == $request_diff ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( $term_id); ?>"><?php echo $term_name; ?></option>
									<?php	}
										}
									} ?>
								</select>
							</div>
						</div>
						<div class="row">					
							<div class="one-third">
								<select name="serv" id="recipe_serving">
									<option value="0"><?php echo __('Reading level', 'socialchef'); ?></option>
									<option <?php echo ($request_serv == 1 ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( 1 ); ?>"><?php  _e('First alphabets', 'socialchef')?></option>
									<option <?php echo ($request_serv == 2 ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( 2 ); ?>"><?php  _e('First words', 'socialchef')?></option>
									<option <?php echo ($request_serv == 3 ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( 3 ); ?>"><?php  _e('First sentences', 'socialchef')?></option>
									<option <?php echo ($request_serv == 4 ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( 4 ); ?>"><?php  _e('First paragraphs', 'socialchef')?></option>
									<option <?php echo ($request_serv == 5 ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr( 5 ); ?>"><?php  _e('Well versed reader', 'socialchef')?></option>
								</select>
							</div>
						</div>
						<div class="f-row">
							<input type="submit" value="<?php esc_attr_e('Search for stories', 'socialchef'); ?>">
						</div>
					</form>
			</div>				
			<?php 
			$recipe_results = $sc_recipes_post_type->list_recipes($paged, $posts_per_page, $sort_by, $sort_order, $meal_course_ids, $difficulty_ids, $category_ids, $search_args, $ingredient_ids); 
			if ( count($recipe_results) > 0 && $recipe_results['total'] > 0 ) { ?>
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
			<?php } else { ?>
			<div class="alert alert-warning">
				<p><?php _e('Unfortunately no results were found for your query. Please try searching for something else.', 'socialchef'); ?></p>
			</div>
			<?php } ?>
		</section><!--//three-fourth-->
		<?php
		if ($page_sidebar_positioning == 'both' || $page_sidebar_positioning == 'right')
			get_sidebar('right');
		?>
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );