<div class="item-list-tabs no-ajax" id="subnav" role="navigation">
	<ul>
		<?php bp_get_options_nav(); ?>
	</ul>
</div><!-- .item-list-tabs -->
<?php do_action( 'bp_before_member_recipes_list' ); ?>
<?php 
global $sc_theme_globals, $sc_recipes_post_type;

if ( get_query_var('paged') ) {
    $paged = get_query_var('paged');
} else if ( get_query_var('page') ) {
    $paged = get_query_var('page');
} else {
    $paged = 1;
}
$posts_per_page = $sc_theme_globals->get_recipes_archive_posts_per_page();

$user_id = bp_displayed_user_id();

$recipe_results = $sc_recipes_post_type->list_recipes($paged, $posts_per_page, '', '', array(), array(), array(), array(), array(), false, $user_id, true); 

global $current_user;
if (!isset($current_user)) {
	$current_user = wp_get_current_user();
}

?>
<?php
	$count = 0;
	echo '<div class="entries row">';
	foreach ($recipe_results['results'] as $recipe_result) {
	
		global $post, $sc_recipe_class, $sc_include_edit_link;
		$post = $recipe_result;
		setup_postdata( $post ); 
		$sc_recipe_class = 'one-third';
		if ($current_user->ID == $user_id)
			$sc_include_edit_link = true;
		get_template_part('includes/parts/recipe', 'item');
		$count++;
	}
	echo '</div><!--entries-->';
?>
<div class="pager">
	<?php 
	$total_results = $recipe_results['total'];
	SocialChef_Theme_Utils::display_pager( ceil($total_results/$posts_per_page) ); 
	?>
</div>
<?php do_action( 'bp_after_member_recipes_list' ); ?>