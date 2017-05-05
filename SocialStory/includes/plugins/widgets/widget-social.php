<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Social Address

-----------------------------------------------------------------------------------*/


// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'sc_social_widgets' );

// Register widget.
function sc_social_widgets() {
	register_widget( 'sc_Social_Widget' );
}

// Widget class.
class sc_social_widget extends WP_Widget {


/*-----------------------------------------------------------------------------------*/
/*	Widget Setup
/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'sc_social_widget', 'description' => __('SocialChef: Social Widget', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 550, 'id_base' => 'sc_social_widget' );

		/* Create the widget. */
		parent::__construct( 'sc_social_widget', __('SocialChef: Social Widget', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', $instance['title'] );
		$facebook_id = $instance['facebook_id'];
		$twitter_id = $instance['twitter_id'];
		$youtube_profile = $instance['youtube_profile'];
		$rss_feed = $instance['rss_feed'];	
		$linked_in_profile = $instance['linked_in_profile'];	
		$gplus_profile = $instance['gplus_profile'];	
		$vimeo_profile = $instance['vimeo_profile'];
		$pinterest_profile = $instance['pinterest_profile'];

		/* Before widget (defined by themes). */
		echo $before_widget;

		/* Display Widget */
		/* Display the widget title if one was input (before and after defined by themes). */
		?>
			<article class="one-fourth">
<?php 		if ( $title )
				echo $before_title . $title . $after_title;
?>
				<ul class="social"> <?php
					if (!empty($facebook_id))
						echo '<li class="facebook"><a href="http://www.facebook.com/' . urlencode($facebook_id) . '" title="facebook">facebook</a></li>';
					if (!empty($twitter_id))
						echo '<li class="twitter"><a href="http://twitter.com/' . urlencode($twitter_id) . '" title="twitter">twitter</a></li>';
					if (!empty($rss_feed))
						echo '<li class="rss"><a href="' . esc_url($rss_feed) . '" title="rss">rss</a></li>';
					if (!empty($linked_in_profile))
						echo '<li class="linkedin"><a href="' . esc_url($linked_in_profile) . '" title="linkedin">linkedin</a></li>';
					if (!empty($gplus_profile))
						echo '<li class="gplus"><a href="' . esc_url($gplus_profile) . '" title="gplus">googleplus</a></li>';
					if (!empty($youtube_profile))
						echo '<li class="youtube"><a href="' . esc_url($youtube_profile) . '" title="youtube">youtube</a></li>';
					if (!empty($vimeo_profile))
						echo '<li class="vimeo"><a href="' . esc_url($vimeo_profile) . '" title="vimeo">vimeo</a></li>';
					if (!empty($pinterest_profile))
						echo '<li class="pinterest"><a href="' . esc_url($pinterest_profile) . '" title="pinterest">pinterest</a></li>';
					?>
				</ul>
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
		$instance['facebook_id'] = strip_tags( $new_instance['facebook_id'] );
		$instance['twitter_id'] = strip_tags( $new_instance['twitter_id'] );
		$instance['youtube_profile'] = strip_tags( $new_instance['youtube_profile'] );
		$instance['rss_feed'] = strip_tags( $new_instance['rss_feed'] );
		$instance['linked_in_profile'] = strip_tags( $new_instance['linked_in_profile'] );
		$instance['gplus_profile'] = strip_tags( $new_instance['gplus_profile'] );
		$instance['vimeo_profile'] = strip_tags( $new_instance['vimeo_profile'] );
		$instance['pinterest_profile'] = strip_tags( $new_instance['pinterest_profile'] );
		
		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {

		/* Set up some default widget settings. */
		$defaults = array(
		'title' => '',
		'facebook_id' => '',
		'twitter_id' => '',
		'youtube_profile' => '',
		'rss_feed' => '',
		'linked_in_profile' => '',
		'gplus_profile' => '',
		'vimeo_profile' => '',
		'pinterest_profile' => ''
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>
		
		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr ($instance['title']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'facebook_id' ) ); ?>"><?php _e('Facebook ID:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'facebook_id' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'facebook_id' ) ); ?>" value="<?php echo esc_attr ($instance['facebook_id']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'twitter_id' ) ); ?>"><?php _e('Twitter ID:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'twitter_id' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'twitter_id' ) ); ?>" value="<?php echo esc_attr ($instance['twitter_id']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'youtube_profile' ) ); ?>"><?php _e('Youtube url:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'youtube_profile' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'youtube_profile' ) ); ?>" value="<?php echo esc_attr ($instance['youtube_profile']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'rss_feed' ) ); ?>"><?php _e('Rss feed:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'rss_feed' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'rss_feed' ) ); ?>" value="<?php echo esc_attr ($instance['rss_feed']); ?>" />
		</p>		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'linked_in_profile' ) ); ?>"><?php _e('LinkedIn url:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'linked_in_profile' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'linked_in_profile') ); ?>" value="<?php echo esc_attr ($instance['linked_in_profile']); ?>" />
		</p>		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'gplus_profile' ) ); ?>"><?php _e('GPlus url:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'gplus_profile' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'gplus_profile' ) ); ?>" value="<?php echo esc_attr ($instance['gplus_profile']); ?>" />
		</p>		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'vimeo_profile' ) ); ?>"><?php _e('Vimeo profile:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'vimeo_profile' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'vimeo_profile' ) ); ?>" value="<?php echo esc_attr ($instance['vimeo_profile']); ?>" />
		</p>		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'pinterest_profile' ) ); ?>"><?php _e('Pinterest url:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'pinterest_profile' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'pinterest_profile' ) ); ?>" value="<?php echo esc_attr ($instance['pinterest_profile']); ?>" />
		</p>		
		
	<?php
	}
}
?>