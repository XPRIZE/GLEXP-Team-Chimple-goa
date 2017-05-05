<?php

class SocialChef_Theme_Filters extends SocialChef_BaseSingleton {

	protected function __construct() {
        // our parent class might
        // contain shared code in its constructor
        parent::__construct();
    }

    public function init() {
	
        add_filter( 'bp_core_mysteryman_src', array($this, 'default_avatar_src' ) );
		add_filter( 'excerpt_length', array($this, 'excerpt_length' ) );
		add_filter( 'bp_get_group_avatar', array($this, 'get_group_avatar' ) );
		add_filter ('bp_blogs_record_post_post_types', array($this, 'activity_publish_custom_post_types'), 1, 1);
		add_filter('bp_blogs_activity_new_post_primary_link', array($this, 'fix_recipe_activity_permalink'), 1, 2);
		add_filter('bp_blogs_activity_new_post_action', array($this, 'record_recipe_activity_action'), 1, 3);
		add_filter('wp_title', array($this, 'wp_title'), 20, 2);

		add_filter ('bbp_no_breadcrumb', array( $this, 'bbp_no_breadcrumb') );
		add_filter ('bp_directory_groups_search_form', array( $this, 'bp_directory_groups_search_form') );
		add_filter ('bp_directory_members_search_form', array( $this, 'bp_directory_members_search_form') );
		add_filter ('bbp_breadcrumbs', array( $this, 'bbp_breadcrumbs') );
	}
	
	function bbp_breadcrumbs($crumbs) {
		$crumbs = str_replace('SocialChef home', __( 'Home', 'socialchef' ), $crumbs);
		return $crumbs;
	}
	
	function bp_directory_members_search_form($search_form_html) {
		$search_form_html = str_replace('action=""', '', $search_form_html);
		return $search_form_html;
	}
	
	function bp_directory_groups_search_form($search_form_html) {
		$search_form_html = str_replace('action=""', '', $search_form_html);
		return $search_form_html;
	}
	
	function bbp_no_breadcrumb ($param) {
		return true;
	}
	
	public function disable_bbp_no_breadcrumb_filter() {
		remove_filter ('bbp_no_breadcrumb', array( $this, 'bbp_no_breadcrumb') );
	}
	
	public function enable_bbp_no_breadcrumb_filter() {
		add_filter ('bbp_no_breadcrumb', array( $this, 'bbp_no_breadcrumb') );
	}
	
	function wp_title($title, $sep) {
		global $paged, $page;

		if ( is_feed() )
			return $title;

		// Add the site name.
		// $title = get_bloginfo( 'name' ) . ' ' . $title;
	
		// Add the site description for the home/front page.
		// $site_description = get_bloginfo( 'description', 'display' );
		
		// if ( $site_description && ( is_home() || is_front_page() ) )
			// $title = "$title $sep $site_description";

		// Add a page number if necessary.
		if ( $paged >= 2 || $page >= 2 )
			$title = "$title $sep " . sprintf( __( 'Page %s', 'twentytwelve' ), max( $paged, $page ) );
			
		return $title;
	}
		
	function record_recipe_activity_action( $activity_action, $post, $post_permalink ) {

		global $bp;
		if( $post->post_type == 'recipe' ) {
			if ( is_multisite() )
				$activity_action = sprintf( __( '%1$s submitted a new story, %2$s, on the site %3$s', 'socialchef' ), bp_core_get_userlink( (int) $post->post_author ), '' . $post->post_title . '', '' . get_blog_option( $blog_id, 'blogname' ) . '');
			else
				$activity_action = sprintf( __( '%1$s submitted a new story, %2$s', 'socialchef' ), bp_core_get_userlink( (int) $post->post_author ), '' . $post->post_title . '');
			$post_permalink = get_permalink($post->ID);
		}

		return $activity_action;
	}
	
	function fix_recipe_activity_permalink($post_permalink, $post_id) {
		$post_permalink = get_permalink($post_id);
		return $post_permalink;
	}

	
	function activity_publish_custom_post_types( $post_types ) {
		$post_types[] = 'recipe';
		return $post_types;
	}
		
	function default_avatar_src( $url )
	{
		return SocialChef_Theme_Utils::get_file_uri('/images/avatar.jpg');
	}
	
	function excerpt_length($length) {
		return 20;
	}
		
	function get_group_avatar($avatar) {
		global $bp, $groups_template;

		if( strpos($avatar,'group-avatars') ) {
			return $avatar;
		}
		else {
			$custom_avatar =  SocialChef_Theme_Utils::get_file_uri( '/images/avatar.jpg' );

			if($bp->current_action == "")
				return '<img class="avatar" alt="' . esc_attr( $groups_template->group->name ) . '" src="'. esc_url ( $custom_avatar ) .'" width="'.BP_AVATAR_THUMB_WIDTH.'" height="'.BP_AVATAR_THUMB_HEIGHT.'" />';
			else
				return '<img class="avatar" alt="' . esc_attr( $groups_template->group->name ) . '" src="'. esc_url ( $custom_avatar ) .'" width="'.BP_AVATAR_FULL_WIDTH.'" height="'.BP_AVATAR_FULL_HEIGHT.'" />';
		}
	}

}

// store the instance in a variable to be retrieved later and call init
global $sc_theme_filters;
$sc_theme_filters = SocialChef_Theme_Filters::get_instance();
$sc_theme_filters->init();