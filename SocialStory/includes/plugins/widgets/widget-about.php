<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef About Widget

-----------------------------------------------------------------------------------*/


// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'sc_about_widgets' );

// Register widget.
function sc_about_widgets() {
	register_widget( 'sc_About_Widget' );
}

// Widget class.
class sc_about_widget extends WP_Widget {


/*-----------------------------------------------------------------------------------*/
/*	Widget Setup
/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'sc_about_widget', 'description' => __('SocialChef: About Widget', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 550, 'id_base' => 'sc_about_widget' );

		/* Create the widget. */
		parent::__construct( 'sc_about_widget', __('SocialChef: About Widget', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', $instance['title'] );
		$about_text = $instance['about_text'];

		/* Before widget (defined by themes). */
		echo $before_widget;

		/* Display Widget */
		?>
			<article class="about_widget clearfix one-half">
				<h5><?php echo $title; ?></h5>
				<p><?php echo $about_text; ?></p>
			</article>
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
		$instance['about_text'] = strip_tags( $new_instance['about_text']);

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {

		/* Set up some default widget settings. */
		$defaults = array(
		'title' => 'About SocialChef Community',
		'about_text' => 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.',
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'about_text' ) ); ?>"><?php _e('About text:', 'socialchef') ?></label>
			<textarea rows="5" cols="20" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'about_text' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'about_text' ) ); ?>"><?php echo esc_attr( $instance['about_text'] ); ?></textarea>
		</p>
		
	<?php
	}
}
?>