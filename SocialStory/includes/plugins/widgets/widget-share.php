<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Share

-----------------------------------------------------------------------------------*/


// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_share_widgets' );

// Register widget.
function socialchef_share_widgets() {
	register_widget( 'socialchef_Share_Widget' );
}

// Widget class.
class socialchef_Share_Widget extends WP_Widget {


/*-----------------------------------------------------------------------------------*/
/*	Widget Setup
/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_share_widget', 'description' => __('SocialChef: Share', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 300, 'height' => 350, 'id_base' => 'socialchef_share_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_share_widget', __('SocialChef: Share', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : '' );

		/* Before widget (defined by themes). */
		$before_widget = str_replace('class="widget', 'class="widget share', $before_widget);
		echo $before_widget;

		/* Display Widget */
		/* Display the widget title if one was input (before and after defined by themes). */
		global $post;
		$main_image = '';
		if ($post != null) {
			$sc_post = new sc_post($post);
			$main_image = $sc_post->get_main_image();
		}		
		?>
			<ul class="boxed">
				<li class="light"><a target="_blank" href="https://twitter.com/intent/tweet?text=<?php echo urlencode(SocialChef_Theme_Utils::get_current_page_url()); ?>" title="<?php _e('Twitter', 'socialchef'); ?>"><i class="ico i-twitter"></i> <span><?php _e('Share on Twitter', 'socialchef'); ?></span></a></li>
				<li class="medium"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?display=popup&amp;u=<?php echo urlencode(SocialChef_Theme_Utils::get_current_page_url()); ?>" title="<?php _e('Facebook', 'socialchef'); ?>"><i class="ico i-facebook"></i> <span><?php _e('Share on Facebook', 'socialchef'); ?></span></a></li>
				<li class="dark"><a target="_blank"  href="http://pinterest.com/pin/create/button/?url=<?php echo urlencode(SocialChef_Theme_Utils::get_current_page_url()); ?>&amp;media=<?php echo esc_url ( $main_image ); ?>&amp;description=" title="<?php _e('Pinterest', 'socialchef'); ?>"><i class="ico i-pinterest"></i> <span><?php _e('Pin on Pinterest', 'socialchef'); ?></span></a></li>
				<!--<li class="dark"><a href="#" title="Favourites"><i class="ico i-favourites"></i> <span>Add to Favourites</span></a></li>-->
			</ul>
		<?php

		/* After widget (defined by themes). */
		echo $after_widget;
	}


/*-----------------------------------------------------------------------------------*/
/*	Update Widget
/*-----------------------------------------------------------------------------------*/
	
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {

		/* Set up some default widget settings. */
		$defaults = array();
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>
	<?php
	}
}
?>