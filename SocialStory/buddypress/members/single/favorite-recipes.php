<div class="item-list-tabs no-ajax" id="subnav" role="navigation">
	<ul>
		<?php bp_get_options_nav(); ?>
	</ul>
</div><!-- .item-list-tabs -->
<?php do_action( 'bp_before_member_favorite_recipes_list' );

	global $sc_theme_globals, $sc_recipes_post_type;

	$user_id = bp_displayed_user_id();

	$favorite_ids = $sc_recipes_post_type->list_user_favorites($user_id);
	
	$recipe_results = $sc_recipes_post_type->list_recipes(0, -1, '', '', array(), array(), array(), array(), array(), false, null, false, $favorite_ids); 

	$count = 0;
	echo '<div class="entries row">';
	foreach ($recipe_results['results'] as $recipe_result) {
		global $post, $sc_recipe_class, $sc_include_edit_link;
		$post = $recipe_result;
		setup_postdata( $post ); 
		$sc_recipe_class = 'one-third';
		$sc_include_edit_link = false;
		get_template_part('includes/parts/recipe', 'item');
		$count++;
	}
	echo '</div><!--entries-->';

do_action( 'bp_after_member_recipes_list' );
