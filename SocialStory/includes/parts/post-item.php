<?php
	global $post, $sc_post_class;
	
	$post_id = $post->ID;
	$post_obj = new sc_post($post_id);
	$post_comments = get_comments_number( $post_id );
?>
<!--item-->
<div class="entry <?php echo esc_attr( $sc_post_class ); ?> post-item">
<?php 
$main_image = $post_obj->get_main_image('thumb-image');
if (!empty( $main_image ) ) { ?>
	<figure>
		<img src="<?php echo esc_url ( $main_image ); ?>" alt="<?php the_title(); ?>" />
		<figcaption><a href="<?php echo esc_url ( $post_obj->get_permalink() ); ?>"><i class="ico i-view"></i> <span><?php _e('View post', 'socialchef'); ?></span></a></figcaption>
	</figure>
<?php } ?>
	<div class="container">
		<h2><a href="<?php echo esc_url ( $post_obj->get_permalink() ); ?>"><?php the_title(); ?></a></h2> 
		<div class="actions">
			<div>
				<div class="date"><i class="ico i-date"></i><?php the_time('F j, Y'); ?></div>
				<div class="comments"><i class="ico i-comments"></i><a href="<?php echo esc_url ( $post_obj->get_permalink() ); ?>#comments"><?php echo $post_comments; ?></a></div>
			</div>
		</div>
		<div class="excerpt">
			<?php the_excerpt(); ?>
		</div>
	</div>
</div>
<!--item-->