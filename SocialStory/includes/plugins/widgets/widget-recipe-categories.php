<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Home Intro Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_recipe_categories_widgets' );

// Register widget.
function socialchef_recipe_categories_widgets() {
	register_widget( 'socialchef_Recipe_Categories_Widget' );
}

// Widget class.
class socialchef_Recipe_Categories_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_recipe_categories_widget', 'description' => __('Chimple: Story Categories', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 400, 'id_base' => 'socialchef_recipe_categories_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_recipe_categories_widget', __('Chimple: Story Categories', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Story categories title', 'bookyourtravel') );
		
		$show_category_icons = isset($instance['show_category_icons']) && $instance['show_category_icons'] == '1';
		$category_count = isset($instance['category_count']) ? (int)$instance['category_count'] : 15;

		$cat_args = array( 
			'taxonomy'=>'recipe_category', 
			'hide_empty'=>'1',
			'number' => $category_count
		);
		$recipe_categories = get_categories($cat_args);
		
		extract( $args );
		
		echo $before_widget;
		
		/* Display Widget */
		echo $before_title . $title . $after_title; 

		if ($show_category_icons) {
			if (count($recipe_categories) > 0) { 
			?>
			<ul class="boxed">
			<?php
				$lightness_classes = array(
					'light',
					'medium',
					'dark'
				);
			
				for ($i = 0; $i < count($recipe_categories); $i++) {
					if (isset($recipe_categories[$i])) {
						$recipe_category = $recipe_categories[$i];
						$term_id = $recipe_category->term_id;
						$term_name = $recipe_category->name;
						$term_meta = get_option( "taxonomy_$term_id" );
						$term_css_class = $term_meta['recipe_category_css_class'];
						$link = get_term_link((int)$term_id, 'recipe_category');
						$link = is_wp_error( $link ) ? '#' : $link;
						
						if ($i > 0 && $i % 3 == 0)
							array_push($lightness_classes, array_shift($lightness_classes));
						echo '<li class="' . $lightness_classes[$i % 3] . '"><a href="' . esc_url ($link) . '" title="' . $term_name . '"><i class="ico ' . $term_css_class . '"></i> <span>' . $term_name . '</span></a></li>';
					}
				}
			?>
			</ul>
			<?php
			}
		} else {
			if (count($recipe_categories) > 0) { 
			?>
			<ul class="categories">
			<?php
				for ($i = 0; $i < count($recipe_categories); $i++) {
					if (isset($recipe_categories[$i])) {
						$recipe_category = $recipe_categories[$i];
						$term_id = $recipe_category->term_id;
						$term_name = $recipe_category->name;
						$link = get_term_link((int)$term_id, 'recipe_category');
						$link = is_wp_error( $link ) ? '#' : $link;
						
						echo '<li><a href="' . esc_url ($link) . '" title="' . $term_name . '">' . $term_name . '</a></li>';
					}
				}
			?>
			</ul>
			<?php
			}
		}
		
		/* After widget (defined by themes). */
		echo $after_widget;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Update Widget
/*-----------------------------------------------------------------------------------*/
	
	function update( $new_instance, $old_instance ) {
	
		$instance = $old_instance;

		/* Strip tags to remove HTML (important for text inputs). */
		$instance['title'] = strip_tags( $new_instance['title'] );		
		$instance['show_category_icons'] = strip_tags( $new_instance['show_category_icons']);
		$instance['category_count'] = strip_tags( $new_instance['category_count']);

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {
					
		/* Set up some default widget settings. */
		$defaults = array(
			'title' => __('Welcome to SocialChef!', 'socialchef'),
			'show_category_icons' => '0',
			'category_count' => 15
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr ( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr ($instance['title']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'show_category_icons' ) ); ?>"><?php _e('Show category boxes with icons?', 'socialchef') ?></label>
			<input type="checkbox"  <?php echo ( $instance['show_category_icons'] == '1' ? 'checked="checked"' : '' ); ?> class="checkbox" id="<?php echo esc_attr ( $this->get_field_id( 'show_category_icons' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'show_category_icons' ) ); ?>" value="1" />
		</p>
		
		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'category_count' ) ); ?>"><?php _e('How many categories do you want to display?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr ( $this->get_field_id( 'category_count' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'category_count' ) ); ?>">
				<?php for ($i=1;$i<61;$i++) { ?>
				<option <?php echo ($i == $instance['category_count'] ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr ( $i ); ?>"><?php echo $i; ?></option>
				<?php } ?>
			</select>
		</p>
		
	<?php
	}	

}