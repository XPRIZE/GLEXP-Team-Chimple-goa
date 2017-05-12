<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Search Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_search_widgets' );

// Register widget.
function socialchef_search_widgets() {
	register_widget( 'socialchef_Search_Widget' );
}

// Widget class.
class socialchef_Search_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		// wp_register_script( 'socialchef-search-widget', SocialChef_Theme_Utils::get_file_uri ('/js/search_widget.js'), array('jquery'), '1.0', true );	
		// wp_enqueue_script( 'socialchef-search-widget' );	
	
		// wp_register_script( 'socialchef-custom-suggest', SocialChef_Theme_Utils::get_file_uri ('/js/custom-suggest.js'), array('jquery'), '1.0', true );	
		// wp_enqueue_script( 'socialchef-custom-suggest' );
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_search_widget', 'description' => __('SocialChef: Search', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 600, 'id_base' => 'socialchef_search_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_search_widget', __('SocialChef: Search', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {

		global $sc_theme_globals;
		$custom_search_page_url = $sc_theme_globals->get_search_form_page_url();
		
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Refine search results', 'bookyourtravel') );
		
		$search_difficulty_placeholder = isset($instance['search_difficulty_placeholder']) ? $instance['search_difficulty_placeholder'] : __('Select difficulty', 'socialchef');
		$search_meal_course_placeholder = isset($instance['search_meal_course_placeholder']) ? $instance['search_meal_course_placeholder'] : __('Select meal course', 'socialchef');
		$search_category_placeholder = isset($instance['search_category_placeholder']) ? $instance['search_category_placeholder'] : __('Select category', 'socialchef');
		$search_term_placeholder = isset($instance['search_term_placeholder']) ? $instance['search_term_placeholder'] : __('Enter your search term', 'socialchef');
		$search_intro_text = isset($instance['search_intro_text']) ? $instance['search_intro_text'] : __('<p>All you need to do is enter an ingredient, a dish or a keyword.</p><p>You can also select a specific category from the dropdown.</p><p>There\'s sure to be something tempting for you to try.</p><p>Enjoy!</p>', 'socialchef');
		$submit_button_text = isset($instance['submit_button_text']) ? $instance['submit_button_text'] : __('Start cooking!', 'socialchef');

		/* Before widget (defined by themes). */
		if (is_home() || is_front_page()) {
			$before_widget = str_replace('class="socialchef_search_widget', 'class="socialchef_search_widget one-fourth', $before_widget);
		}
		echo $before_widget;
		
		/* Display Widget */
		?>
			<div class="container">
				<div class="textwrap">
					<?php echo $before_title . $title . $after_title; ?>
					<?php echo $search_intro_text; ?>
				</div>
				<form method="get" action="<?php echo esc_url( $custom_search_page_url ); ?>">
					<div class="f-row">
						<input type="text" name="term" placeholder="<?php echo esc_attr ($search_term_placeholder); ?>" />
					</div>
					<div class="f-row">
						<select name="cat">
							<option value="0"><?php echo $search_category_placeholder; ?></option>
							<?php 
							$args = array( 
								'taxonomy'=>'recipe_category', 
								'hide_empty'=>'1'
							);
							$recipe_categories = get_categories($args);

							if (count($recipe_categories) > 0) { 
								for ($i = 0; $i < count($recipe_categories); $i++) {
									if (isset($recipe_categories[$i])) {
										$recipe_category = $recipe_categories[$i];
										$term_id = $recipe_category->term_id;
										$term_name = $recipe_category->name;
							?>	
							<option value="<?php echo esc_attr( $term_id ); ?>"><?php echo $term_name; ?></option>
							<?php	}
								}
							} ?>
						</select>
					</div>
					<div class="f-row">
						<select name="mc">
							<option value="0"><?php echo $search_meal_course_placeholder; ?></option>
							<?php 
							$args = array( 
								'taxonomy'=>'recipe_meal_course', 
								'hide_empty'=>'1'
							);
							$meal_courses = get_categories($args);

							if (count($meal_courses) > 0) { 
								for ($i = 0; $i < count($meal_courses); $i++) {
									if (isset($meal_courses[$i])) {
										$meal_course = $meal_courses[$i];
										$term_id = $meal_course->term_id;
										$term_name = $meal_course->name;
							?>	
							<option value="<?php echo esc_attr( $term_id ); ?>"><?php echo $term_name; ?></option>
							<?php	}
								}
							} ?>
						</select>
					</div>
					<div class="f-row">
						<select name="diff">
							<option value="0"><?php echo $search_difficulty_placeholder; ?></option>
							<?php 
							$args = array( 
								'taxonomy'=>'recipe_difficulty', 
								'hide_empty'=>'1'
							);
							$difficulties = get_categories($args);

							if (count($difficulties) > 0) { 
								for ($i = 0; $i < count($difficulties); $i++) {
									if (isset($difficulties[$i])) {
										$difficulty = $difficulties[$i];
										$term_id = $difficulty->term_id;
										$term_name = $difficulty->name;
							?>	
							<option value="<?php echo esc_attr( $term_id ); ?>"><?php echo $term_name; ?></option>
							<?php	}
								}
							} ?>
						</select>
					</div>
					<div class="f-row bwrap">
						<input type="submit" value="<?php echo esc_attr ($submit_button_text); ?>" />
					</div>
				</form>
			</div>
		<?php
		echo $after_widget;
		/* After widget (defined by themes). */
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Update Widget
/*-----------------------------------------------------------------------------------*/
	
	function update( $new_instance, $old_instance ) {
	
		$instance = $old_instance;

		/* Strip tags to remove HTML (important for text inputs). */
		$instance['title'] = strip_tags( $new_instance['title'] );		

		$instance['search_difficulty_placeholder'] = strip_tags( $new_instance['search_difficulty_placeholder']);
		$instance['search_meal_course_placeholder'] = strip_tags( $new_instance['search_meal_course_placeholder']);
		$instance['search_category_placeholder'] = strip_tags( $new_instance['search_category_placeholder']);
		$instance['search_term_placeholder'] = strip_tags( $new_instance['search_term_placeholder']);

		$allowed = array(
				'a' => array(
					'href' => array(),
					'title' => array()
				),
				'br' => array(),
				'em' => array(),
				'strong' => array(),
				'p' => array(),
			);
		$instance['search_intro_text'] = wp_kses( $new_instance['search_intro_text'], $allowed);
		$instance['submit_button_text'] = strip_tags( $new_instance['submit_button_text']);

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {

		/* Set up some default widget settings. */
		$defaults = array(
			'title' => __('Refine search results', 'socialchef'),
			'search_difficulty_placeholder' => __('Select difficulty', 'socialchef'),
			'search_meal_course_placeholder' => __('Select meal course', 'socialchef'),
			'search_category_placeholder' => __('Select category', 'socialchef'),
			'search_term_placeholder' => __('Enter your search term', 'socialchef'),
			'search_intro_text' => __('<p>All you need to do is enter an ingredient, a dish or a keyword.</p><p>You can also select a specific category from the dropdown.</p><p>There\'s sure to be something tempting for you to try.</p><p>Enjoy!</p>', 'socialchef'),
			'submit_button_text' => __('Start cooking!', 'socialchef')
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr ($instance['title']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'search_difficulty_placeholder' ) ); ?>"><?php _e('Search difficulty placeholder:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'search_difficulty_placeholder' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'search_difficulty_placeholder' ) ); ?>" value="<?php echo esc_attr ($instance['search_difficulty_placeholder']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'search_meal_course_placeholder' ) ); ?>"><?php _e('Search meal course placeholder:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'search_meal_course_placeholder' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'search_meal_course_placeholder' ) ); ?>" value="<?php echo esc_attr ($instance['search_meal_course_placeholder']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'search_category_placeholder' ) ); ?>"><?php _e('Search category placeholder:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'search_category_placeholder' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'search_category_placeholder' ) ); ?>" value="<?php echo esc_attr ($instance['search_category_placeholder']); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'search_term_placeholder' ) ); ?>"><?php _e('Search term placeholder:', 'socialchef') ?></label>
			<input type="text" class="widefat" name="<?php echo esc_attr( $this->get_field_name( 'search_term_placeholder' ) ); ?>" value="<?php echo esc_attr ($instance['search_term_placeholder']); ?>" />
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'search_intro_text' ) ); ?>"><?php _e('Search intro text:', 'socialchef') ?></label>
			<textarea rows="8" columns="40" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'search_intro_text' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'search_intro_text' ) ); ?>"><?php echo esc_attr( $instance['search_intro_text'] ); ?></textarea>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'submit_button_text' ) ); ?>"><?php _e('Submit button', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'submit_button_text' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'submit_button_text' ) ); ?>" value="<?php echo esc_attr ($instance['submit_button_text']); ?>" />
		</p>		
		
	<?php
	}	

}