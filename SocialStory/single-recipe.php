<?php 
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');

if ( have_posts() ) while ( have_posts() ) : 

	the_post(); 
	global $post, $sc_recipes_post_type, $sc_nutritional_element_results;
	global $sc_theme_globals;
	global $current_user;

?>
<script>
	window.recipeId = <?php echo $post->ID; ?>;
	window.addToFavoritesText = '<i class="ico eldorado_heart"></i><span><?php _e('Add to favorites', 'socialchef') ?></span>';
	window.removeFromFavoritesText = '<i class="ico eldorado_heart"></i><span><?php _e('Remove from favorites', 'socialchef') ?></span>';
</script>
<?php
	
	$recipe_obj = new sc_recipe($post);
	$recipe_id = $recipe_obj->get_id();
	// $recipe_instructions = $recipe_obj->get_instructions();
	// $recipe_preparation_time = $recipe_obj->get_preparation_time();
	// $recipe_cooking_time = $recipe_obj->get_cooking_time();
	$recipe_serving = $recipe_obj->get_serving();
	$recipe_difficulty = $recipe_obj->get_difficulty();
	$recipe_meal_course = $recipe_obj->get_meal_course();
	
	// Generate microformat time values for Schema.org compatibility
	// $mf_recipe_cooking_time = SocialChef_Theme_Utils::time_to_iso8601_duration(strtotime($recipe_cooking_time . " minutes", 0));
	// $mf_recipe_preparation_time = SocialChef_Theme_Utils::time_to_iso8601_duration(strtotime($recipe_preparation_time . " minutes", 0));
		
	// $ingredient_results = $sc_recipes_post_type->list_recipe_ingredients($post->ID);
	
	// if ($sc_theme_globals->enable_nutritional_elements())
	// 	$sc_nutritional_element_results = $sc_recipes_post_type->list_recipe_nutritional_elements($post->ID);
		
	$author_nice_name = get_the_author_meta('user_nicename', $post->post_author);
	
	$author_uri = '';
	if (defined('BP_VERSION')) {
		$author_uri = bp_core_get_userlink($post->post_author, false, true);
	} else {
		$author_uri = get_author_posts_url($post->post_author);
	}
?>
	<!--row-->
	<div class="row">	
		<div itemscope itemtype="http://schema.org/Recipe" <?php post_class( ); ?>>
			<header class="s-title">
				<h1 itemprop="name" class="entry-title"><?php the_title(); ?></h1>
			</header>		
			<!--content-->
			<section class="content three-fourth">
				<!--recipe-->
				<article id="recipe-<?php the_ID(); ?>" class="recipe">
					<div class="row">
						<!--one-third-->
						<div class="one-third entry-header">
							<dl class="basic">
<!-- 								<?php if ($recipe_preparation_time) { ?>
								<dt><?php _e('Preparation time', 'socialchef'); ?></dt>
								<dd itemprop="prepTime" content="<?php echo $mf_recipe_preparation_time; ?>"><?php echo $recipe_preparation_time; ?> <?php _e('mins', 'socialchef'); ?></dd>
								<?php } ?> -->
<!-- 								<?php if ($recipe_cooking_time) { ?>
								<dt><?php _e('Cooking time', 'socialchef'); ?></dt>
								<dd itemprop="cookTime" content="<?php echo $mf_recipe_cooking_time; ?>"><?php echo $recipe_cooking_time; ?> <?php _e('mins', 'socialchef'); ?></dd>
								<?php } ?> -->
								<?php if ($recipe_difficulty) { 
									$difficulty_link = get_term_link( $recipe_difficulty->term_id, 'recipe_difficulty' );
								?>
								<dt><?php _e('Language', 'socialchef'); ?></dt>
								<dd><a href="<?php echo esc_url( $difficulty_link ); ?>"><?php echo $recipe_difficulty->name; ?></a></dd>
								<?php } ?>
								<?php if ($recipe_serving) { ?>
								<dt><?php _e('Reading level', 'socialchef'); ?></dt>
								<dd><?php switch ($recipe_serving) {
									case 1:
										_e('First alphabets', 'socialchef');
										break;
									case 2:
										_e('First words', 'socialchef');
										break;
									case 3:
										_e('First sentences', 'socialchef');
										break;
									case 4:
										_e('First paragraphs', 'socialchef');
										break;
									case 5:
										_e('Well versed reader', 'socialchef');
										break;

									} ?></dd>
								<?php } ?>
							</dl>
							
							<dl class="user">
								<?php if ($recipe_meal_course) { ?>
								<dt><?php _e('License', 'socialchef'); ?></dt>
								<dd><a href="<?php echo esc_url( get_term_link( $recipe_meal_course->term_id, 'recipe_meal_course' ) ); ?>"><?php echo $recipe_meal_course->name; ?></a></dd>
								<?php } ?>
								<dt><?php _e('Posted by', 'socialchef'); ?></dt>
								<dd itemprop="author" class="vcard author post-author"><span class="fn"><a href="<?php echo esc_url( $author_uri ); ?>"><?php echo $author_nice_name; ?></a></span></dd>
								<dt><?php _e('Posted on', 'socialchef'); ?></dt>
								<dd  itemprop="datePublished" content="<?php echo get_the_date(); ?>"  class="post-date updated"><?php echo get_the_date(); ?></dd>
							</dl>
							
<!-- 							<?php
							if (count($ingredient_results) > 0) { ?>
							<dl class="ingredients">
								<?php 
								foreach ($ingredient_results as $ingredient_result) {
									$ingredient_unit = get_term_by('term_id', $ingredient_result->ingredient_unit_term_id, 'ingredient_unit');
									$term_id = $ingredient_result->ingredient_unit_term_id;
									$term_meta = get_option( "taxonomy_$term_id" );
									$unit_abbreviation = $term_meta['ingredient_unit_abbreviation'];
									$unit_name = empty($unit_abbreviation) ? $ingredient_unit->name : $unit_abbreviation;
									
									$ingredient = get_term_by('term_id', $ingredient_result->ingredient_term_id, 'ingredient');
									$ingredient_link = get_term_link( (int)$ingredient_result->ingredient_term_id, 'ingredient' );

									echo "<dt>" . SocialChef_Theme_Utils::convert_decimal_to_fraction($ingredient_result->amount) . " $unit_name</dt>";
									echo "<dd itemprop='ingredients'><a href='" . esc_url( $ingredient_link ) . "'>" . $ingredient->name . "</a></dd>";
								}
								?>
							</dl>
							<?php } ?>
 -->							<?php if (defined('BP_VERSION')) { ?>
							<?php if ( is_user_logged_in() ) { ?>
							<div class="favorite">
								<?php 
								if ( $sc_recipes_post_type->is_marked_as_favorite($current_user->ID, $post->ID)) {
									?>
									<a href="javascript:void(0);" class="remove"><i class="ico eldorado_heart"></i> <span><?php _e('Remove from favorites', 'socialchef'); ?></span></a>
									<?php
								} else { ?>
									<a href="javascript:void(0);"><i class="ico eldorado_heart"></i> <span><?php _e('Add to favorites', 'socialchef'); ?></span></a>
								<?php } ?>
							</div>
							<?php } else { ?>
							<div class="favorite">
								<a class="disabled" href="<?php echo esc_url ( $sc_theme_globals->get_login_page_url() ); ?>"><i class="ico eldorado_heart"></i> <span><?php _e('Add to favorites', 'socialchef'); ?></span></a>
							</div>
							<?php } ?>
							<?php } // defined('BP_VERSION')  ?>
<!-- 							<div class="print">
								<a class="" onclick="window.print();" href="#"><i class="ico eldorado_print"></i> <span><?php _e('Print story', 'socialchef'); ?></span></a>
							</div>							
 -->						</div><!--// one-third -->
						<!--two-third-->
						<div class="two-third">
							<?php 
							$main_image = $recipe_obj->get_main_image('content-image');
							if ( !empty( $main_image ) ) { ?>
							<div class="image"><img itemprop="image" src="<?php echo esc_url( $main_image ) ?>" alt="<?php the_title(); ?>" /></div>
							<div id="results" itemprop="description">
								<canvas id="gameCanvas" width="480" height="720"></canvas>
							</div>
							<?php } ?>
							<?php if (strlen($post->post_content) > 0) { ?>
							<div class="intro" itemprop="description">
								<?php the_content(); ?>
							</div>
							<?php } ?>
<!-- 							<?php if (count($recipe_instructions) > 0) { ?>
							<div class="instructions" itemprop="recipeInstructions">
								<ol>
								<?php
								$instructions_array = unserialize($recipe_instructions);
								for ( $i = 0; $i < count($instructions_array); $i++ ) { 
									$instruction = $instructions_array[$i]['instruction'];
									echo '<li>';
									echo $instruction;
									echo '</li>';
								}?>
								</ol>
							</div>
							<?php } ?>
 -->						</div>
						<!--//two-third-->
					</div><!--//row-->
				</article><!--//recipe-->
				<?php comments_template( '', true ); ?>		
				<!--//recipe entry-->
			</section>
			<!-- <?php get_sidebar('right-recipe'); ?> -->
		</div><!--//hentry-->
	</div><!--//row-->
<?php 
endwhile;
get_footer( 'buddypress' );