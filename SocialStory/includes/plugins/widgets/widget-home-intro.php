<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Home Intro Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_home_intro_widgets' );

// Register widget.
function socialchef_home_intro_widgets() {
	register_widget( 'socialchef_Home_Intro_Widget' );
}

// Widget class.
class socialchef_Home_Intro_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_home_intro_widget', 'description' => __('SocialChef: Home Intro', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 600, 'id_base' => 'socialchef_home_intro_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_home_intro_widget', __('SocialChef: Home Intro', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {

		global $sc_theme_globals;
		$login_page_url = $sc_theme_globals->get_login_page_url();
		$register_page_url = $sc_theme_globals->get_register_page_url();
		
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Welcome to Chimple', 'bookyourtravel') );
		
		$home_intro_teaser = isset($instance['home_intro_teaser']) ? $instance['home_intro_teaser'] : __('<p>Chimple is the ultimate story community, where stories come to life. By joining us you will join a robust story telling community and where you will get to share your stories with hundreds of other like-minded members.</p><p>You will also get a chance to win awesome prizes, make new friends and share delicious stories.</p>', 'socialchef');
		$home_intro_teaser_logged_in = isset($instance['home_intro_teaser_logged_in']) ? $instance['home_intro_teaser_logged_in'] : __('<p>Chimple is the ultimate story community, where stories come to life. </p><p>Thank you for logging in. Please browse the website using the options in the menu above or the features listed below!</p>', 'socialchef');
		$home_intro_button_text = isset($instance['home_intro_button_text']) ? $instance['home_intro_button_text'] : __('Join our community', 'socialchef');
		$home_intro_button_link = isset($instance['home_intro_button_link']) ? $instance['home_intro_button_link'] : $register_page_url;
		$home_intro_below_button_text = isset($instance['home_intro_below_button_text']) ? $instance['home_intro_below_button_text'] : sprintf(__("<p>Already a member? Click <a href='%s'>here</a> to login.</p>", 'socialchef'), esc_url ($login_page_url));

		/* Before widget (defined by themes). */
		if (is_home() || is_front_page()) {
			$before_widget = str_replace('class="socialchef_home_intro_widget', 'class="socialchef_home_intro_widget three-fourth text', $before_widget);
		}
		
		echo $before_widget;		
		/* Display Widget */
		?>
			<?php 
			echo '<h1>' . $title . '</h1>'; 
			if ( !is_user_logged_in() ) {
				echo $home_intro_teaser;
				if (!empty($home_intro_button_text)) {
					echo '<a href="' . esc_url ( $home_intro_button_link ) . '" class="button white more medium">' . $home_intro_button_text . '</a>';
				}
				if (!empty($home_intro_below_button_text)) {
					echo $home_intro_below_button_text;
				}
			} else {
				echo $home_intro_teaser_logged_in;
			}
			?>
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
			
		$instance['home_intro_teaser'] = wp_kses( $new_instance['home_intro_teaser'], $allowed );
		$instance['home_intro_button_text'] = strip_tags( $new_instance['home_intro_button_text']);
		$instance['home_intro_button_link'] = strip_tags( $new_instance['home_intro_button_link']);
		$instance['home_intro_below_button_text'] = wp_kses( $new_instance['home_intro_below_button_text'], $allowed );

		$instance['home_intro_teaser_logged_in'] = wp_kses( $new_instance['home_intro_teaser_logged_in'], $allowed );
		
		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {
			
		$pages = get_pages(); 
		$pages_array = array();
		$pages_array[''] = __('Select page', 'socialchef');
		foreach ( $pages as $page ) {
			$url = get_permalink($page->ID);
			$pages_array[$url] = $page->post_title;
		}

		global $sc_theme_globals;
		$register_page_url = $sc_theme_globals->get_register_page_url();
		$login_page_url = $sc_theme_globals->get_login_page_url();
		
		/* Set up some default widget settings. */
		$defaults = array(
			'title' => __('Welcome to SocialChef!', 'socialchef'),
			'home_intro_teaser' => __('<p>SChimple is the ultimate story community, where stories come to life. By joining us you will join a robust story telling community and where you will get to share your stories with hundreds of other like-minded members.</p><p>You will also get a chance to win awesome prizes, make new friends and share delicious stories.</p>', 'socialchef'),
			'home_intro_teaser_logged_in' => __('<p>Chimple is the ultimate story community, where stories come to life.</p><p>You will also get a chance to win awesome prizes, make new friends and share delicious stories. </p><p>Thank you for logging in. Please browse the website using the options in the menu above or the features listed below!</p>', 'socialchef'),
			'home_intro_button_text' => __('Join our community', 'socialchef'),
			'home_intro_button_link' => $register_page_url,
			'home_intro_below_button_text' => sprintf(__("<p>Already a member? Click <a href='%s'>here</a> to login.</p>", 'socialchef'), esc_url ($login_page_url))
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'home_intro_teaser' ) ); ?>"><?php _e('Home Intro teaser:', 'socialchef') ?></label>
			<textarea rows="7" cols="40" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'home_intro_teaser' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'home_intro_teaser' ) ); ?>"><?php echo esc_attr( $instance['home_intro_teaser'] ); ?></textarea>
		</p>
		
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'home_intro_teaser_logged_in' ) ); ?>"><?php _e('Home Intro teaser (when logged in):', 'socialchef') ?></label>
			<textarea rows="7" cols="40" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'home_intro_teaser_logged_in' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'home_intro_teaser_logged_in' ) ); ?>"><?php echo esc_attr( $instance['home_intro_teaser_logged_in'] ); ?></textarea>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'home_intro_button_text' ) ); ?>"><?php _e('Home Intro button text:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'home_intro_button_text' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'home_intro_button_text' ) ); ?>" value="<?php echo esc_attr( $instance['home_intro_button_text'] ); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'home_intro_button_link' ) ); ?>"><?php _e('Home Intro button link:', 'socialchef') ?></label>
			<select id=<?php echo esc_attr( $this->get_field_id( 'home_intro_button_link' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'home_intro_button_link' ) ); ?>">
				<?php foreach ($pages_array as $url => $title) {
					if (isset($instance['home_intro_button_link']) && $url == $instance['home_intro_button_link'])
						echo "<option selected='selected' value='" . esc_url( $url ) . "'>$title</option>";
					else
						echo "<option value='" . esc_url( $url ) . "'>$title</option>";
				} ?>
			</select>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'home_intro_below_button_text' ) ); ?>"><?php _e('Home Intro below button text:', 'socialchef') ?></label>
			<textarea rows="7" cols="40" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'home_intro_below_button_text' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'home_intro_below_button_text' ) ); ?>"><?php echo esc_attr( $instance['home_intro_below_button_text'] ); ?></textarea>
		</p>
		
	<?php
	}	

}