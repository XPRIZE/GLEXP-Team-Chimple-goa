<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Company Contact

-----------------------------------------------------------------------------------*/


// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'sc_contact_widgets' );

// Register widget.
function sc_contact_widgets() {
	register_widget( 'sc_Contact_Widget' );
}

// Widget class.
class sc_contact_widget extends WP_Widget {


/*-----------------------------------------------------------------------------------*/
/*	Widget Setup
/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'sc_contact_widget', 'description' => __('SocialChef: Contact Widget', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 550, 'id_base' => 'sc_contact_widget' );

		/* Create the widget. */
		parent::__construct( 'sc_contact_widget', __('SocialChef: Contact Widget', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', $instance['title'] );
		$company_phone = $instance['company_phone'];
		$company_email = $instance['company_email'];	

		/* Before widget (defined by themes). */
		echo $before_widget;

		/* Display Widget */
		/* Display the widget title if one was input (before and after defined by themes). */
		?>
			<article class="sc_contact_widget one-fourth">
			<?php
				if ( $title )
					echo $before_title . $title . $after_title;
				else {
			?>
				<h5><?php _e('Need help?', 'socialchef'); ?></h5>
			<?php } ?>
				<p><?php _e('Contact us via phone or email', 'socialchef'); ?></p>
				<p><em>T:</em>  <?php echo $company_phone; ?><br /><em>E:</em>  <a href="mailto:<?php echo esc_url( $company_email ); ?>"><?php echo $company_email; ?></a></p>
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
		$instance['company_phone'] = strip_tags( $new_instance['company_phone'] );
		$instance['company_email'] = strip_tags( $new_instance['company_email'] );

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {

		/* Set up some default widget settings. */
		$defaults = array(
		'title' => '',
		'company_phone' => '1-555-555-5555',
		'company_email' => 'info@socialchef.com'
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'company_phone' ) ); ?>"><?php _e('Company phone:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'company_phone' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'company_phone' ) ); ?>" value="<?php echo esc_attr( $instance['company_phone'] ); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'company_email' ) ); ?>"><?php _e('Company email:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'company_email' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'company_email' ) ); ?>" value="<?php echo esc_attr( $instance['company_email'] ); ?>" />
		</p>		
		
	<?php
	}
}
?>