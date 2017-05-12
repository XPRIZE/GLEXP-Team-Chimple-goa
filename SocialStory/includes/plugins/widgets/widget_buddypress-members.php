<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef BuddyPress Members Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_buddypress_members_widgets' );

// Register widget.
function socialchef_buddypress_members_widgets() {
	register_widget( 'socialchef_BuddyPress_Members_Widget' );
}

/**
 * Members Widget.
 */
class socialchef_BuddyPress_Members_Widget extends WP_Widget {

	/**
	 * Constructor method.
	 */
	function __construct() {

	/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_buddypress_members_widget', 'description' => __('SocialChef: BuddyPress Members', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 400, 'id_base' => 'socialchef_buddypress_members_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_buddypress_members_widget', __('SocialChef: BuddyPress Members', 'socialchef'), $widget_ops, $control_ops );
		
		if ( is_active_widget( false, false, $this->id_base ) && !is_admin() && !is_network_admin() ) {
			wp_enqueue_script( 'bp-widget-members' );
		}
	}

	/**
	 * Display the Members widget.
	 *
	 * @see WP_Widget::widget() for description of parameters.
	 *
	 * @param array $args Widget arguments.
	 * @param array $instance Widget settings, as saved by the user.
	 */
	function widget( $args, $instance ) {

		extract( $args );

		if ( !$instance['member_default'] )
			$instance['member_default'] = 'active';

		$title = apply_filters( 'widget_title', $instance['title'] );

		echo $before_widget;

		$title = $instance['link_title'] ? '<a href="' . esc_url( trailingslashit( bp_get_root_domain() . '/' . bp_get_members_root_slug() )) . '">' . $title . '</a>' : $title;

		echo $before_title
		   . $title
		   . $after_title;

		$members_args = array(
			'user_id'         => 0,
			'type'            => $instance['member_default'],
			'per_page'        => $instance['max_members'],
			'max'             => $instance['max_members'],
			'populate_extras' => true,
			'search_terms'    => false,
		);

		?>

		<?php if ( bp_has_members( $members_args ) ) : ?>
			<div class="item-options" id="members-list-options">
				<a href="<?php bp_members_directory_permalink(); ?>" id="newest-members" <?php if ( $instance['member_default'] == 'newest' ) : ?>class="selected"<?php endif; ?>><?php _e( 'Newest', 'socialchef' ) ?></a>
				<a href="<?php bp_members_directory_permalink(); ?>" id="recently-active-members" <?php if ( $instance['member_default'] == 'active' ) : ?>class="selected"<?php endif; ?>><?php _e( 'Active', 'socialchef' ) ?></a>
				<?php if ( bp_is_active( 'friends' ) ) : ?>
				<a href="<?php bp_members_directory_permalink(); ?>" id="popular-members" <?php if ( $instance['member_default'] == 'popular' ) : ?>class="selected"<?php endif; ?>><?php _e( 'Popular', 'socialchef' ) ?></a>
				<?php endif; ?>
			</div>

			<ul id="members-list" class="item-list">
				<?php while ( bp_members() ) : bp_the_member(); ?>
					<li class="vcard">
						<div class="item-avatar">
							<a role="member" href="<?php bp_member_permalink() ?>" title="<?php bp_member_name() ?>"><?php bp_member_avatar() ?></a>
						</div>
					</li>

				<?php endwhile; ?>
			</ul>
			<?php wp_nonce_field( 'bp_core_widget_members', '_wpnonce-members' ); ?>
			<input type="hidden" name="members_widget_max" id="members_widget_max" value="<?php echo esc_attr( $instance['max_members'] ); ?>" />

		<?php else: ?>

			<div class="widget-error">
				<?php _e('No one has signed up yet!', 'socialchef') ?>
			</div>

		<?php endif; ?>

		<?php echo $after_widget; ?>
	<?php
	}

	/**
	 * Update the Members widget options.
	 *
	 * @param array $new_instance The new instance options.
	 * @param array $old_instance The old instance options.
	 * @return array $instance The parsed options to be saved.
	 */
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;

		$instance['title'] 	    = strip_tags( $new_instance['title'] );
		$instance['max_members']    = strip_tags( $new_instance['max_members'] );
		$instance['member_default'] = strip_tags( $new_instance['member_default'] );
		$instance['link_title']	    = (bool)$new_instance['link_title'];

		return $instance;
	}

	/**
	 * Output the Members widget options form.
	 *
	 * @param $instance Settings for this widget.
	 */
	function form( $instance ) {
		$defaults = array(
			'title' 	 => __( 'Members', 'socialchef' ),
			'max_members' 	 => 5,
			'member_default' => 'active',
			'link_title' 	 => false
		);
		$instance = wp_parse_args( (array) $instance, $defaults );

		$title 		= strip_tags( $instance['title'] );
		$max_members 	= strip_tags( $instance['max_members'] );
		$member_default = strip_tags( $instance['member_default'] );
		$link_title	= (bool)$instance['link_title'];
		?>

		<p><label for="bp-core-widget-title"><?php _e('Title:', 'socialchef'); ?> <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" style="width: 100%" /></label></p>

		<p><label for="<?php echo esc_attr( $this->get_field_name('link_title') ) ?>"><input type="checkbox" name="<?php echo esc_attr( $this->get_field_name('link_title') ) ?>" value="1" <?php checked( $link_title ) ?> /> <?php _e( 'Link widget title to Members directory', 'socialchef' ) ?></label></p>

		<p><label for="bp-core-widget-members-max"><?php _e('Max members to show:', 'socialchef'); ?> <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'max_members' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'max_members' ) ); ?>" type="text" value="<?php echo esc_attr( $max_members ); ?>" style="width: 30%" /></label></p>

		<p>
			<label for="bp-core-widget-groups-default"><?php _e('Default members to show:', 'socialchef'); ?>
			<select name="<?php echo esc_attr( $this->get_field_name( 'member_default' ) ) ?>">
				<option value="newest" <?php if ( $member_default == 'newest' ) : ?>selected="selected"<?php endif; ?>><?php _e( 'Newest', 'socialchef' ) ?></option>
				<option value="active" <?php if ( $member_default == 'active' ) : ?>selected="selected"<?php endif; ?>><?php _e( 'Active', 'socialchef' ) ?></option>
				<option value="popular"  <?php if ( $member_default == 'popular' ) : ?>selected="selected"<?php endif; ?>><?php _e( 'Popular', 'socialchef' ) ?></option>
			</select>
			</label>
		</p>

	<?php
	}
}