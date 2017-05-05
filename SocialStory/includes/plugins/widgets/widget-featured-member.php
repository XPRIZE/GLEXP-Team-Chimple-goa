<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Featured Member Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_featured_member_widgets' );

// Register widget.
function socialchef_featured_member_widgets() {
	register_widget( 'socialchef_Featured_Member_Widget' );
}

// Widget class.
class socialchef_Featured_Member_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_featured_member_widget', 'description' => __('SocialChef: Featured Member', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 400, 'id_base' => 'socialchef_featured_member_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_featured_member_widget', __('SocialChef: Featured Member', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		
		global $sc_members_post_type, $sc_theme_globals;
		$featured_members_page_url = $sc_theme_globals->get_featured_members_page_url();
		
		extract( $args );

		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Display latest members', 'socialchef') );
		
		/* Display Widget */		

		$member_args = array(
			'orderby' => 'meta_value', 
			'meta_key' => 'featured_date',
			'order' => 'DESC',
			'meta_query' => array(
				'relation' => 'AND',
				0 => array(
					'key'     => 'is_featured',
					'value'   => '1',
					'compare' => '='
				)
			),
			'number' => 1, 
			'offset' => 0
		);
		$user_query = new WP_User_Query( $member_args );	
		?>
		<div class="featured one-third">
			<header class="s-title">
				<?php echo $before_title . $title . $after_title; ?>
			</header><?php		
			if ( ! empty( $user_query->results )) { 
				foreach ( $user_query->results as $user ) { ?>
				<article class="entry"><?php
					$member = $user;
					$member_id = $user->ID;
					$current_user = wp_get_current_user();	
					$user_info = get_userdata($current_user->ID);
					$profile_link = '';
					$user_nicename = '';
					$avatar_html = '';
					$block_quote = '';
					if (defined('BP_VERSION')) {
						$profile_link = bp_core_get_user_domain( $member_id );
						$user_nicename = bp_core_get_user_displayname( $member_id );
						$avatar_html =  bp_core_fetch_avatar ( array( 'item_id' => $member_id, 'type' => 'full' ) );
						$update = get_user_meta( $member_id, 'bp_latest_update' );
						if (isset($update[0]) && isset($update[0]['content']))
							$block_quote = $update[0]['content'];
					} else {
						$profile_link = get_author_posts_url($current_user->ID);
						$user_nicename = $user_info->user_nicename;
						$avatar_html = get_avatar( $current_user->user_email, 270 );
					}
					?>
					<figure>
						<a href="<?php echo esc_url( $profile_link  );?>" title="<?php echo esc_attr( $user_nicename ); ?>"><?php echo $avatar_html; ?></a>						
						<figcaption><a href="<?php echo esc_url ( $profile_link ); ?>"><i class="ico i-view"></i> <span><?php _e('View member', 'socialchef'); ?></span></a></figcaption>
					</figure>
					<div class="container">
						<h2><a href="<?php echo esc_url ( $profile_link ); ?>"><?php echo $user_nicename; ?></a></h2>
						<?php if (!empty($block_quote)) { ?>
							<blockquote><?php echo $block_quote; ?></blockquote>
						<?php } ?>
						<div class="actions">
							<div>
								<a href="<?php echo esc_url ( $profile_link ); ?>" class="button"><?php _e('Stories by this user', 'socialchef'); ?></a>
								<div class="more"><a href="<?php echo esc_url ($featured_members_page_url ); ?>"><?php _e('See past featured members', 'socialchef'); ?></a></div>
							</div>
						</div>
					</div>
					
					
				</article><?php
				}
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

		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {

		/* Set up some default widget settings. */
		$defaults = array(
			'title' => __('Featured member', 'socialchef'),
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr( $instance['title'] ); ?>" />
		</p>
		
	<?php
	}	

}