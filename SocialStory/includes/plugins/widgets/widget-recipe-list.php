<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Recipe List Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_recipe_lists_widgets' );

// Register widget.
function socialchef_recipe_lists_widgets() {
	register_widget( 'socialchef_Recipe_List_Widget' );
}

// Widget class.
class socialchef_Recipe_List_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_recipe_lists_widget', 'description' => __('Chimple: Story List', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 400, 'id_base' => 'socialchef_recipe_lists_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_recipe_lists_widget', __('Chimple: Story List', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		
		global $sc_recipes_post_type, $sc_theme_globals;
		
		$card_layout_classes = array(
			'full-width',
			'one-half',
			'one-third',
			'one-fourth',
			'one-fifth'
		);
		
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Display latest stories', 'socialchef') );
		
		$number_of_recipes = isset($instance['number_of_recipes']) ? (int)$instance['number_of_recipes'] : 5;
		$sort_by = isset($instance['sort_by']) ? (int)$instance['sort_by'] : 'title';
		$sort_descending = isset($instance['sort_by']) && $instance['sort_descending'] == '1';
		$order = $sort_descending ? 'DESC' : 'ASC';
		$recipe_category_ids = isset($instance['recipe_category_ids']) ? (array)$instance['recipe_category_ids'] : array();
		$recipe_difficulty_ids = isset($instance['recipe_difficulty_ids']) ? (array)$instance['recipe_difficulty_ids'] : array();
		$recipe_meal_course_ids = isset($instance['recipe_meal_course_ids']) ? (array)$instance['recipe_meal_course_ids'] : array();
		$recipes_per_row = isset($instance['recipes_per_row']) ? (int)$instance['recipes_per_row'] : 3;
		$show_featured_only = isset($instance['show_featured_only']) && $instance['show_featured_only'] == '1';
		$display_mode = isset($instance['display_mode']) ? $instance['display_mode'] : 'small';

		echo $before_widget;
		
		/* Display Widget */		
		$recipe_results = $sc_recipes_post_type->list_recipes( 1, $number_of_recipes, $sort_by, $order, $recipe_meal_course_ids, $recipe_difficulty_ids, $recipe_category_ids, array(), array(), $show_featured_only );
		?>
		<!--cwrap-->
		<div class="cwrap">
		<?php
		
		if ($display_mode == 'card') { ?>
			<header class="s-title">
			<?php echo $before_title . $title . $after_title; ?>
			</header> <?php			
		} else {
			echo $before_title . $title . $after_title; 		
		}
		
		if ($display_mode == 'small') {
			if (count($recipe_results) > 0 && $recipe_results['total'] > 0) { 
			?>
			<ul class="articles_latest recipes_latest">
			<?php
				$recipes = $recipe_results['results'];
				for ($i = 0; $i < count($recipes); $i++) {
					if (isset($recipes[$i])) {
						$recipe = $recipes[$i];
						$recipe_permalink = get_permalink($recipe->ID);
						$recipe_title = get_the_title($recipe->ID);
						$image_id = get_post_thumbnail_id( $recipe->ID );
						$image_src = '';
						if ($image_id > 0) {
							$image_src = SocialChef_Theme_Utils::get_image_src($image_id, 'thumbnail');
						}
?>
				<li>
					<a href="<?php echo esc_url ($recipe_permalink); ?>">
						<?php if (!empty($image_src)) { ?>
						<img src="<?php echo esc_url ($image_src); ?>" alt="<?php echo esc_attr ( $recipe_title ); ?>" />
						<?php } ?>
						<h6><?php echo $recipe_title; ?></h6>
					</a>
				</li>
<?php
					}
				}
			?>
			</ul>
			<?php
			}
		} else {
		
			if (count($recipe_results) > 0 && $recipe_results['total'] > 0) { ?>
				<!--entries-->
				<div class="entries row"><?php
				$recipes = $recipe_results['results'];
				for ($i = 0; $i < count($recipes); $i++) {
					if (isset($recipes[$i])) {
						$recipe = $recipes[$i];
						global $post, $sc_recipe_class;
						$post = $recipe;
						setup_postdata( $post ); 
						$sc_recipe_class = $card_layout_classes[$recipes_per_row - 1];
						get_template_part('includes/parts/recipe', 'item');
					}
				}?>
				<!--//entries-->
					<div class="quicklinks">
						<a href="<?php echo esc_url ($sc_theme_globals->get_recipe_list_page_url()); ?>" class="button"><?php _e('More stories', 'socialchef'); ?></a>
						<a href="javascript:void(0)" class="button scroll-to-top"><?php _e('Back to top', 'socialchef'); ?></a>
					</div>
				</div><?php
			}
		}
		
		?>
		</div>
		<!--//cwrap-->
		<?php
		
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
		$instance['number_of_recipes'] = strip_tags( $new_instance['number_of_recipes']);
		$instance['sort_by'] = strip_tags( $new_instance['sort_by']);
		$instance['sort_descending'] = strip_tags( $new_instance['sort_descending']);
		$instance['recipe_category_ids'] = $new_instance['recipe_category_ids'];
		$instance['recipe_difficulty_ids'] = $new_instance['recipe_difficulty_ids'];
		$instance['recipe_meal_course_ids'] = $new_instance['recipe_meal_course_ids'];
		$instance['display_mode'] = strip_tags( $new_instance['display_mode']);
		$instance['recipes_per_row'] = strip_tags( $new_instance['recipes_per_row']);
		$instance['show_featured_only'] = strip_tags( $new_instance['show_featured_only']);

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
			'title' => __('Latest stories', 'socialchef'),
			'number_of_recipes' => '5',
			'sort_by' => 'date',
			'sort_descending' => '1',
			'display_mode' => 'small',
			'recipe_category_ids' => array(),
			'recipe_difficulty_ids' => array(),
			'recipe_meal_course_ids' => array(),
			'recipes_per_row' => 3,
			'show_featured_only' => '0'
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr ( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr ($instance['title']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'number_of_recipes' ) ); ?>"><?php _e('How many stories do you want to display?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr ( $this->get_field_id( 'number_of_recipes' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'number_of_recipes' ) ); ?>">
				<?php for ($i=1;$i<13;$i++) { ?>
				<option <?php echo ($i == $instance['number_of_recipes'] ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr ( $i ); ?>"><?php echo $i; ?></option>
				<?php } ?>
			</select>
		</p>

		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'sort_by') ); ?>"><?php _e('What do you want to sort the posts by?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr ( $this->get_field_id( 'sort_by') ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'sort_by' ) ); ?>">
				<option <?php echo ('title' == $instance['sort_by'] ? 'selected="selected"' : ''); ?> value="title"><?php _e('Post Title', 'socialchef') ?></option>
				<option <?php echo ('ID' == $instance['sort_by'] ? 'selected="selected"' : ''); ?> value="ID"><?php _e('Post ID', 'socialchef') ?></option>
				<option <?php echo ('rand' == $instance['sort_by'] ? 'selected="selected"' : ''); ?> value="rand"><?php _e('Random', 'socialchef') ?></option>
				<option <?php echo ('date' == $instance['sort_by'] ? 'selected="selected"' : ''); ?> value="date"><?php _e('Publish Date', 'socialchef') ?></option>
				<option <?php echo ('comment_count' == $instance['sort_by'] ? 'selected="selected"' : ''); ?> value="comment_count"><?php _e('Comment Count', 'socialchef') ?></option>
			</select>
		</p>		

		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'sort_descending' ) ); ?>"><?php _e('Sort posts in descending order?', 'socialchef') ?></label>
			<input type="checkbox"  <?php echo ($instance['sort_descending'] == '1' ? 'checked="checked"' : ''); ?> class="checkbox" id="<?php echo esc_attr ( $this->get_field_id( 'sort_descending' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'sort_descending' ) ); ?>" value="1" />
		</p>
		
		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'display_mode') ); ?>"><?php _e('Display mode?', 'socialchef') ?></label>
			<select class="recipes_widget_display_mode" id="<?php echo esc_attr ( $this->get_field_id( 'display_mode' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'display_mode' ) ); ?>">
				<option <?php echo ('small' == $instance['display_mode'] ? 'selected="selected"' : ''); ?> value="small"><?php _e('Small (usually sidebar)', 'socialchef') ?></option>
				<option <?php echo ('card' == $instance['display_mode'] ? 'selected="selected"' : ''); ?> value="card"><?php _e('Card (usually in grid view)', 'socialchef') ?></option>
			</select>
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
				<input <?php echo ($checked ? 'checked="checked"' : ''); ?> type="checkbox" id="<?php echo esc_attr ( $this->get_field_name( 'recipe_category_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'recipe_category_ids' ) ); ?>[]" value="<?php echo esc_attr ($category->term_id); ?>">
				<label for="<?php echo esc_attr ( $this->get_field_name( 'recipe_category_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>"><?php echo $category->name; ?></label>
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
				<input <?php echo ($checked ? 'checked="checked"' : ''); ?> type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'recipe_difficulty_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>" name="<?php echo esc_attr( $this->get_field_name( 'recipe_difficulty_ids' ) ); ?>[]" value="<?php echo esc_attr ($category->term_id); ?>">
				<label for="<?php echo esc_attr( $this->get_field_name( 'recipe_difficulty_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>"><?php echo $category->name; ?></label>
				<br />
				<?php } ?>
			</div>
		</p>
		
		<p>
			<label><?php _e('Story license', 'socialchef') ?></label>
			<div>
				<?php for ($j=0;$j<count($recipe_meal_courses);$j++) { 
					$category = $recipe_meal_courses[$j];
					$checked = false;
					if (isset($instance['recipe_meal_course_ids'])) {
						if (in_array($category->term_id, $instance['recipe_meal_course_ids']))
							$checked = true;
					}
				?>
				<input <?php echo ($checked ? 'checked="checked"' : ''); ?> type="checkbox" id="<?php echo esc_attr ( $this->get_field_name( 'recipe_meal_course_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'recipe_meal_course_ids' ) ); ?>[]" value="<?php echo esc_attr ($category->term_id); ?>">
				<label for="<?php echo esc_attr ( $this->get_field_name( 'recipe_meal_course_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>"><?php echo $category->name; ?></label>
				<br />
				<?php } ?>
			</div>
		</p>
		
		<p>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'show_featured_only' ) ); ?>"><?php _e('Show only featured stories?', 'socialchef') ?></label>
			<input type="checkbox"  <?php echo ($instance['show_featured_only'] == '1' ? 'checked="checked"' : ''); ?> class="checkbox" id="<?php echo esc_attr ( $this->get_field_id( 'show_featured_only' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'show_featured_only' ) ); ?>" value="1" />
		</p>
		
		<p class="cards" <?php echo ($instance['display_mode'] != 'card' ? 'style="display:none"' : ''); ?>>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'recipes_per_row' ) ); ?>"><?php _e('How many posts do you want to display per row?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr ( $this->get_field_id( 'recipes_per_row' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'recipes_per_row' ) ); ?>">
				<?php for ($i=1;$i<6;$i++) { ?>
				<option <?php echo ($i == $instance['recipes_per_row'] ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr ( $i ); ?>"><?php echo $i; ?></option>
				<?php } ?>
			</select>
		</p>
		
	<?php
	}	

}