<?php
	global $post, $sc_recipe_class, $sc_include_edit_link, $sc_theme_globals;
	
	$recipe_id = $post->ID;
	$recipe_obj = new sc_recipe($post);
	$recipe_difficulty = $recipe_obj->get_difficulty();
	$recipe_comments = get_comments_number( $recipe_id );
?>
<!--item-->
<div class="entry <?php echo $sc_recipe_class; ?> recipe-item">
	<?php if ($sc_include_edit_link) { ?>
	<a class="edit" href="<?php echo esc_url ( $sc_theme_globals->get_submit_recipes_url() ); ?>?mode=edit&fesid=<?php echo urlencode($recipe_id); ?>" title="<?php _e('Edit story', 'socialchef'); ?>"><?php _e('Edit story', 'socialchef'); ?></a>
	<?php } ?>
<?php 
$main_image = $recipe_obj->get_main_image('thumb-image');
if (!empty( $main_image ) ) { ?>
	<figure>
		<img src="<?php echo esc_url ( $main_image ); ?>" alt="<?php the_title(); ?>" />
		<figcaption><a href="<?php echo esc_url ( $recipe_obj->get_permalink() ); ?>"><i class="ico i-view"></i> <span><?php _e('View story', 'socialchef'); ?></span></a></figcaption>
	</figure>
<?php } ?>
	<div class="container">
		<h2>
			<a href="<?php echo esc_url ($recipe_obj->get_permalink() ); ?>"><?php the_title(); ?></a>
		</h2>
		<div class="actions">
			<div>
				<?php if ($recipe_difficulty) { ?>
				<div class="difficulty"><i class="ico i-<?php echo esc_attr($recipe_difficulty->slug); ?>"></i> <?php echo $recipe_difficulty->name; ?></div>
				<?php } ?>
				<!-- <div class="likes"><i class="ico i-likes"></i><a href="#">10</a></div>-->
				<div class="comments"><i class="ico i-comments"></i><a href="<?php echo esc_url ($recipe_obj->get_permalink() ); ?>#comments"><?php echo $recipe_comments; ?></a></div>
			</div>
		</div>
	</div>
</div>
<!--item-->