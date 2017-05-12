<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Featured Recipe Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_featured_recipe_widgets' );

// Register widget.
function socialchef_featured_recipe_widgets() {
	register_widget( 'socialchef_Featured_Recipe_Widget' );
}

// Widget class.
class socialchef_Featured_Recipe_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_featured_recipe_widget', 'description' => __('SocialChef: Featured Story', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 400, 'id_base' => 'socialchef_featured_recipe_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_featured_recipe_widget', __('SocialChef: Featured Story', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		
		global $sc_recipes_post_type, $sc_theme_globals;
		$featured_recipes_page_url = $sc_theme_globals->get_featured_recipes_page_url();
		
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Display featured story', 'socialchef') );
		
		$sort_by = isset($instance['sort_by']) ? (int)$instance['sort_by'] : 'title';
		$sort_descending = isset($instance['sort_by']) && $instance['sort_descending'] == '1';
		$order = $sort_descending ? 'DESC' : 'ASC';
		$recipe_category_ids = isset($instance['recipe_category_ids']) ? (array)$instance['recipe_category_ids'] : array();
		$recipe_difficulty_ids = isset($instance['recipe_difficulty_ids']) ? (array)$instance['recipe_difficulty_ids'] : array();
		$recipe_meal_course_ids = isset($instance['recipe_meal_course_ids']) ? (array)$instance['recipe_meal_course_ids'] : array();
		
		$recipe_results = $sc_recipes_post_type->list_recipes( 1, 1, $sort_by, $order, $recipe_meal_course_ids, $recipe_difficulty_ids, $recipe_category_ids, array(), array(), true );
		
		?>
		<div class="featured two-third">
			<header class="s-title">
				<?php echo $before_title . $title . $after_title; ?>
			</header><?php		
			if (count($recipe_results) > 0 && $recipe_results['total'] > 0) { ?>
				<article class="entry"><?php
					$recipes = $recipe_results['results'];
					$recipe = $recipes[0];
					$recipe_id = $recipe->ID;
					$recipe_obj = new sc_recipe($recipe);
					$recipe_difficulty = $recipe_obj->get_difficulty();
					$recipe_comments = get_comments_number( $recipe_id );
					
					$main_image = $recipe_obj->get_main_image('original');
					if (!empty( $main_image ) ) { ?>
						<figure>
							<img src="<?php echo esc_url( $recipe_obj->get_main_image() ); ?>" alt="<?php echo esc_attr( $recipe_obj->get_title() ); ?>" />
							<figcaption><a href="<?php echo esc_url ($recipe_obj->get_permalink()); ?>"><i class="ico i-view"></i> <span><?php _e('View story', 'socialchef'); ?></span></a></figcaption>
						</figure>
					<?php } ?>
					
					<div class="container">
						<h2><a href="<?php echo esc_url ($recipe_obj->get_permalink()); ?>"><?php echo $recipe_obj->get_title(); ?></a></h2>
						<p><?php echo $recipe_obj->get_excerpt(); ?></p>
						<div class="actions">
							<div>
								<a href="<?php echo esc_url ($recipe_obj->get_permalink()); ?>" class="button"><?php _e('See the full story', 'socialchef'); ?></a>
								<div class="more"><a href="<?php echo esc_url ($featured_recipes_page_url); ?>"><?php _e('See past featured stories', 'socialchef'); ?></a></div>
							</div>
						</div>
					</div>
				</article><?php
			} ?>
		</div><!--/featured-->
		<?php
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Update Widget
/*-----------------------------------------------------------------------------------*/
	
	function update( $new_instance, $old_instance ) {
	
		$instance = $old_instance;

		/* Strip tags to remove HTML (important for text inputs). */
		$instance['title'] = strip_tags( $new_instance['title'] );		
		$instance['sort_by'] = strip_tags( $new_instance['sort_by']);
		$instance['sort_descending'] = strip_tags( $new_instance['sort_descending']);
		$instance['recipe_category_ids'] = $new_instance['recipe_category_ids'];
		$instance['recipe_difficulty_ids'] = $new_instance['recipe_difficulty_ids'];
		$instance['recipe_meal_course_ids'] = $new_instance['recipe_meal_course_ids'];

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {
			
		$args = array(
			'hide_empty'               => 0,
			'taxonomy'                 => 'recipe_category',
		); 
		$recipe_categories = get_categories( $args ); 
		
		$cat_args = array( 
			'taxonomy'=>'recipe_difficulty', 
			'hide_empty'=>'1'
		);
		$recipe_difficulties = get_categories($cat_args);
		
		$cat_args = array( 
			'taxonomy'=>'recipe_meal_course', 
			'hide_empty'=>'1'
		);
		$recipe_meal_courses = get_categories($cat_args);
			
		/* Set up some default widget settings. */
		$defaults = array(
			'title' => __('Featured story', 'socialchef'),
			'sort_by' => 'date',
			'sort_descending' => '1',
			'recipe_category_ids' => array(),
			'recipe_difficulty_ids' => array(),
			'recipe_meal_course_ids' => array()
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>
		
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'sort_by' ) ); ?>"><?php _e('What do you want to sort the posts by?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr( $this->get_field_id( 'sort_by' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'sort_by' ) ); ?>">
				<option <?php echo 'title' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="title"><?php _e('Post Title', 'socialchef') ?></option>
				<option <?php echo 'ID' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="ID"><?php _e('Post ID', 'socialchef') ?></option>
				<option <?php echo 'rand' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="rand"><?php _e('Random', 'socialchef') ?></option>
				<option <?php echo 'date' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="date"><?php _e('Publish Date', 'socialchef') ?></option>
				<option <?php echo 'comment_count' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="comment_count"><?php _e('Comment Count', 'socialchef') ?></option>
			</select>
		</p>		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'sort_descending' ) ); ?>"><?php _e('Sort posts in descending order?', 'socialchef') ?></label>
			<input type="checkbox"  <?php echo ($instance['sort_descending'] == '1' ? 'checked="checked"' : ''); ?> class="checkbox" id="<?php echo esc_attr( $this->get_field_id( 'sort_descending' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'sort_descending' ) ); ?>" value="1" />
		</p>
		
		<p>
			<label><?php _e('Story categories', 'socialchef') ?></label>
			<div>
				<?php for ($j=0;$j<count($recipe_categories);$j++) { 
					$category = $recipe_categories[$j];
					$checked = false;
					if (isset($instance['recipe_category_ids'])) {
						if (in_array($category->term_id, $instance['recipe_category_ids']))
							$checked = true;
					}
				?>
				<input <?php echo ($checked ? 'checked="checked"' : ''); ?> type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'recipe_category_ids' ) ); ?>_<?php echo esc_attr( $category->term_id ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'recipe_category_ids' ) ); ?>[]" value="<?php echo esc_attr( $category->term_id ); ?>">
				<label for="<?php echo esc_attr( $this->get_field_name( 'recipe_category_ids' ) ); ?>_<?php echo esc_attr( $category->term_id ); ?>"><?php echo $category->name; ?></label>
				<br />
				<?php } ?>
			</div>
		</p>
		
		<p>
			<label><?php _e('Story languages', 'socialchef') ?></label>
			<div>
				<?php for ($j=0;$j<count($recipe_difficulties);$j++) { 
					$category = $recipe_difficulties[$j];
					$checked = false;
					if (isset($instance['recipe_difficulty_ids'])) {
						if (in_array($category->term_id, $instance['recipe_difficulty_ids']))
							$checked = true;
					}
				?>
				<input <?php echo ($checked ? 'checked="checked"' : ''); ?> type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'recipe_difficulty_ids' ) ); ?>_<?php echo esc_attr( $category->term_id ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'recipe_difficulty_ids' ) ); ?>[]" value="<?php echo esc_attr( $category->term_id ); ?>">
				<label for="<?php echo esc_attr( $this->get_field_name( 'recipe_difficulty_ids' ) ); ?>_<?php echo esc_attr( $category->term_id ); ?>"><?php echo $category->name; ?></label>
				<br />
				<?php } ?>
			</div>
		</p>
		
		<p>
			<label><?php _e('Story licenses', 'socialchef') ?></label>
			<div>
				<?php for ($j=0;$j<count($recipe_meal_courses);$j++) { 
					$category = $recipe_meal_courses[$j];
					$checked = false;
					if (isset($instance['recipe_meal_course_ids'])) {
						if (in_array($category->term_id, $instance['recipe_meal_course_ids']))
							$checked = true;
					}
				?>
				<input <?php echo ($checked ? 'checked="checked"' : ''); ?> type="checkbox" id="<?php echo esc_attr($this->get_field_name( 'recipe_meal_course_ids' ) ); ?>_<?php echo esc_attr($category->term_id); ?>" name="<?php echo esc_attr($this->get_field_name( 'recipe_meal_course_ids' ) ); ?>[]" value="<?php echo esc_attr($category->term_id); ?>">
				<label for="<?php echo esc_attr($this->get_field_name( 'recipe_meal_course_ids' ) ); ?>_<?php echo esc_attr($category->term_id); ?>"><?php echo $category->name; ?></label>
				<br />
				<?php } ?>
			</div>
		</p>
		
	<?php
	}	

}