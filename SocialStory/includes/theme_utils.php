<?php

class SocialChef_Theme_Utils {

	// code from https://saiyedfaishal.wordpress.com/2014/01/06/check-if-it-is-woocommerce-page/
	public static function is_a_woocommerce_page () {
		if(  function_exists ( "is_woocommerce" ) && is_woocommerce()){
				return true;
		}
		$woocommerce_keys   =   array ( "woocommerce_shop_page_id" ,
										"woocommerce_terms_page_id" ,
										"woocommerce_cart_page_id" ,
										"woocommerce_checkout_page_id" ,
										"woocommerce_pay_page_id" ,
										"woocommerce_thanks_page_id" ,
										"woocommerce_myaccount_page_id" ,
										"woocommerce_edit_address_page_id" ,
										"woocommerce_view_order_page_id" ,
										"woocommerce_change_password_page_id" ,
										"woocommerce_logout_page_id" ,
										"woocommerce_lost_password_page_id" ) ;
		foreach ( $woocommerce_keys as $wc_page_id ) {
				if ( get_the_ID () == get_option ( $wc_page_id , 0 ) ) {
						return true ;
				}
		}
		return false;
	}

	public static function is_woocommerce_active() {
		$active_plugins = apply_filters( 'active_plugins', get_option( 'active_plugins' ) );
		if (is_array ($active_plugins))
			return ( in_array( 'woocommerce/woocommerce.php', $active_plugins ) );
		return false;
	}

	// Code thanks to Joni http://stackoverflow.com/a/14357170
	public static function float_to_rat($n, $tolerance = 1.e-6) {
		$h1=1; $h2=0;
		$k1=0; $k2=1;
		if ($n > 0) {
			$b = 1/$n;
			do {
				$b = 1/$b;
				$a = floor($b);
				$aux = $h1; $h1 = $a*$h1+$h2; $h2 = $aux;
				$aux = $k1; $k1 = $a*$k1+$k2; $k2 = $aux;
				$b = $b-$a;
			} while (abs($n-$h1/$k1) > $n*$tolerance);

			return "$h1/$k1";
		}
		return $n;
	}
	
	// code thanks to Bryan http://stackoverflow.com/a/26684935
	public static function convert_decimal_to_fraction($decimal){

		$big_fraction = SocialChef_Theme_Utils::float_to_rat($decimal, 0.1);
		if ($big_fraction) {
			$num_array = explode('/', $big_fraction);
			if (count($num_array) > 1) {
				$numerator = $num_array[0];
				$denominator = $num_array[1];
				if ($denominator) {
					$whole_number = floor( $numerator / $denominator );
					$numerator = $numerator % $denominator;

					if($numerator == 0){
						return $whole_number;
					}else if ($whole_number == 0){
						return $numerator . '/' . $denominator;
					}else{
						return $whole_number . ' ' . $numerator . '/' . $denominator;
					}
				}
			}
		}
		return 0;
	}

	public static function get_image_src($post_id, $image_size = 'large') {
		$image_src = '';
		if ($post_id) {
			$image_src = wp_get_attachment_image_src( $post_id, $image_size );
			$image_src = $image_src[ 0 ];
		}
		return apply_filters( 'socialchef_image_src', $image_src );	
	}

	public static function get_file_path($relative_path_to_file) {
		if (is_child_theme()) {
			if (file_exists( get_stylesheet_directory() . $relative_path_to_file ) )
				return get_stylesheet_directory() . $relative_path_to_file;
			else
				return get_template_directory() . $relative_path_to_file;
		}
		return get_template_directory() . $relative_path_to_file;
	}

	public static function get_file_uri($relative_path_to_file) {
		if (is_child_theme()) {
			if (file_exists( get_stylesheet_directory() . $relative_path_to_file ) )
				return get_stylesheet_directory_uri() . $relative_path_to_file;
			else
				return get_template_directory_uri() . $relative_path_to_file;
		}
		return get_template_directory_uri() . $relative_path_to_file;
	}	

	public static function get_default_language_post_id($id, $post_type) {
		global $sitepress;
		if ($sitepress) {
			$default_language = $sitepress->get_default_language();
			if(function_exists('icl_object_id')) {
				return icl_object_id($id, $post_type, true, $default_language);
			} else {
				return $id;
			}
		}
		return $id;	
	}

	public static function breadcrumbs() {
	
		global $post;
	
		if (is_front_page()) {
			echo '<!--breadcrumbs--><nav role="navigation" class="breadcrumbs">';
			echo '<ul>';
			echo '<li>' . __('Home', 'socialchef') . '</li>';
			echo '</ul>';
			echo '</nav>';
		} elseif (is_home()) {
			echo '<!--breadcrumbs--><nav role="navigation" class="breadcrumbs">';
			echo '<ul>';
			echo '<li><a href="' . esc_url( home_url()). '" title="' . __('Home', 'socialchef') . '">' . __('Home', 'socialchef') . '</a></li>';
			echo "<li>";
			echo __('Blog', 'socialchef');
			echo "</li>";
			echo "</ul>";
			echo '</nav>';
		}
		else if (defined('BP_VERSION') && (bp_current_component() == 'members' || 
				 bp_current_component() == 'groups' || 
				 bp_current_component() == 'activity' ||
				 bp_current_component() == 'profile' ||
				 bp_current_component() == 'settings' ||
				 bp_current_component() == 'notifications' ||
				 bp_current_component() == 'friends' ||
				 bp_current_component() == 'messages' ||
				 bp_current_component() == 'forums' ||
				 bp_is_register_page())) {
					
			global $bp;
			
			$members_root = home_url() . '/' . $bp->members->root_slug; // slug for the Members page. The BuddyPress default is 'members'. 
			$activity_root = home_url() . '/' . $bp->activity->root_slug; // slug for the Activity page. The BuddyPress default is 'activity'.	
			//$forums_root = $bp->forums->root_slug; // slug for the Forums page. The BuddyPress default is 'forums'.
					
			echo '<!--breadcrumbs--><nav role="navigation" class="breadcrumbs">';
			echo '<ul>';
			echo '<li><a href="' . esc_url(home_url()) . '" title="' . __('Home', 'socialchef') . '">' . __('Home', 'socialchef') . '</a></li>';

			if( bp_is_directory() ) {
				if ( bp_current_component() == 'groups' ) {
					$groups_title = bp_get_directory_title('groups');
					$groups_root = home_url() . '/' . $bp->groups->root_slug; // slug for the Groups page. The BuddyPress default is 'groups'.	
					echo '<li><a href="' . esc_url( $groups_root ) . '">' . $groups_title . '</a></li>';
				} else {
					echo '<li>'; 
					echo get_the_title();
					echo '</li>';
				}
			} else if ( 
				$bp->displayed_user->userdata && 
					( 	
						bp_current_component() == 'profile' ||
						bp_current_component() == 'messages' || 
						bp_current_component() == 'activity' || 
						bp_current_component() == 'notifications' || 
						bp_current_component() == 'settings' ||
						bp_current_component() == 'friends' ||
						bp_current_component() == 'forums' ||
						bp_current_component() == 'my-recipes' ||
						bp_current_component() == 'groups'
					)
				) {
				$user_name = ucwords( $bp->displayed_user->fullname );
				// echo '<li><a href="' . esc_url( $members_root ) . '">' . get_the_title() . '</a></li>';
				echo '<li><a href="' . esc_url( $bp->displayed_user->domain ) . '" title="' . $user_name . '">' . $user_name . '</a></li>';
				echo '<li>' . ucwords( $bp->current_component ) . '</li>';
			} else if (bp_is_register_page()) { 
				echo '<li>' . __('Register an account', 'socialchef') . '</li>';
			} else if( bp_current_component() == 'groups' ) {
				$groups_root = home_url() . '/' . $bp->groups->root_slug; // slug for the Groups page. The BuddyPress default is 'groups'.	
				if (isset($bp->groups->current_group->name)) {
					echo '<li><a href="' . esc_url( $groups_root ) . '">';
					echo $bp->groups->current_group->name;
					echo '</a></li>';
				} else {
					echo '<li><a href="' . esc_url( $groups_root ) . '">';
					echo $bp->groups->name;
					echo '</a></li>';
				}
				if (bp_current_action() == 'create')
					echo '<li>' . __('Create', 'socialchef') . '</li>';
			}
			echo '</ul>';
			echo '</nav><!--//breadcrumbs-->';
					
		} else if (class_exists('bbPress') && is_bbpress()) {
			if (function_exists ('bbp_breadcrumb') ) {
				$bbpress_bc_args = array(

					// HTML
					'before'          => '<nav role="navigation" class="breadcrumbs"><ul>',
					'after'           => '</ul></nav>',

					// Separator
					'sep'             => ' ',
					'pad_sep'         => 0,
					'sep_before'      => '',
					'sep_after'       => '',

					// Crumbs
					'crumb_before'    => '<li>',
					'crumb_after'     => '</li>',
					// Current
					'current_before'  => '',
					'current_after'   => '',
				);
				global $sc_theme_filters;
				$sc_theme_filters->disable_bbp_no_breadcrumb_filter();
				bbp_breadcrumb($bbpress_bc_args);	
				$sc_theme_filters->enable_bbp_no_breadcrumb_filter();
			}
		
		} else {
			echo '<!--breadcrumbs--><nav role="navigation" class="breadcrumbs">';
			echo '<ul>';
			echo '<li><a href="' . esc_url( home_url() ) . '" title="' . __('Home', 'socialchef') . '">' . __('Home', 'socialchef') . '</a></li>';
			if (is_category()) {
				echo "<li>";
				the_category('</li><li>');
				echo "</li>";
			} elseif (is_page() || is_single()) {
				echo "<li>";
				echo the_title();
				echo "</li>";
			} elseif (is_404()) {
				echo "<li>" . __('Error 404 - Page not found', 'socialchef') . "</li>";
			} elseif (is_search()) {
				echo "<li>";
				echo __('Search results for: ', 'socialchef');
				echo '"<em>';
				echo get_search_query();
				echo '</em>"';
				echo "</li>";
			} else if (is_post_type_archive('recipe')) {
				echo "<li>";
				echo __('Recipes', 'socialchef');
				echo "</li>";
			}
			
			echo '</ul>';
			echo '</nav><!--//breadcrumbs-->';
		}
	}
		
	public static function display_pager($max_num_pages) {

		$pattern = '#(www\.|https?:\/\/){1}[a-zA-Z0-9]{2,254}\.[a-zA-Z0-9]{2,4}[a-zA-Z0-9.?&=_/]*#i';

		$big = 999999999; // need an unlikely integer
		$pager_links = paginate_links( array(
			'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
			'format' => '?paged=%#%',
			'current' => max( 1, get_query_var('paged') ),
			'total' => $max_num_pages,
			'prev_text'    => __('&lt;', 'socialchef'),
			'next_text'    => __('&gt;', 'socialchef'),
			'type'		   => 'array'
		) );
		$count_links = count($pager_links);
		if ($count_links > 0) {
			$first_link = $pager_links[0];
			$last_link = $first_link;
			//var_dump($pager_links);
			preg_match_all($pattern, $first_link, $matches, PREG_PATTERN_ORDER);
			if (count ($matches) > 0 && isset($matches[0][0]))
				echo '<span><a href="' . esc_url( $matches[0][0] ) . '">' . __('&laquo;', 'socialchef') . '</a></span>';
			for ($i=0; $i<$count_links; $i++) {
				$pager_link = $pager_links[$i];
				if (!SocialChef_Theme_Utils::string_contains($pager_link, 'current'))
					echo '<span>' . $pager_link . '</span>';
				else
					echo $pager_link;
				$last_link = $pager_link;
			}
			preg_match_all($pattern, $last_link, $matches, PREG_PATTERN_ORDER);
			if (count ($matches) > 0 && isset($matches[0][0]))
				echo '<span><a href="' . esc_url( $matches[0][0] ) . '">' . __('&raquo;', 'socialchef') . '</a></span>';
		}
	}
	
	public static function string_contains($haystack, $needle) {
		if (strpos($haystack, $needle) !== FALSE)
			return true;
		else
			return false;
	}
	
	public static function comment_end($comment, $args, $depth) {
	?>
		</li>
		<!--//single comment-->
	<?php
	}
	
	public static function comment($comment, $args, $depth) {
		$GLOBALS['comment'] = $comment; 
		$comment_class = comment_class('clearfix', null, null, false);
		$reply_link = get_comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth'])));
		$reply_link = str_replace('comment-reply-link', 'comment-reply-link reply', $reply_link);
		$reply_link = str_replace('comment-reply-login', 'comment-reply-login reply', $reply_link);

	   ?>							
		<!--single comment-->
		<li <?php echo $comment_class; ?> id="article-comment-<?php comment_ID() ?>">
			<div class="avatar">
				<?php echo get_avatar( $comment->comment_author_email, 90 ); ?>
				<div class="comment-meta commentmetadata"><?php edit_comment_link(__('(Edit)', 'socialchef'),'  ','') ?></div>
			</div>
			<?php if ($comment->comment_approved == '0') : ?>
			<em><?php _e('Your comment is awaiting moderation.', 'socialchef') ?></em>
			<?php endif; ?>
			<div class="comment-box">
				<div class="comment-author meta"> 
					<strong><?php echo get_comment_author_link(); ?></strong> <?php _e('said on', 'socialchef') ?> <?php comment_time('F j, Y'); ?> <?php echo $reply_link; ?>
				</div>
				<div class="comment-text">
					<?php echo get_comment_text(); ?>
				</div>
			</div> 
	<?php
	}
	
	public static function get_current_page_url() {
		$pageURL = 'http';
		if ( isset( $_SERVER["HTTPS"] ) && strtolower($_SERVER["HTTPS"]) == "on") {$pageURL .= "s";}
			$pageURL .= "://";
		if ( isset( $_SERVER["SERVER_PORT"] )  && $_SERVER["SERVER_PORT"] != "80") {
			$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
		} else {
			$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
		}
		return $pageURL;
	}
	
	public static function reset_password_notification( $user_login ){

		global $sc_theme_globals;
		$user = get_user_by('login', $user_login);
		
		if (!$user)
			$user = get_user_by('email', $user_login);
		
		if( !$user || !$user->user_resetpassword_key ) return false;

		$admin_email = get_option( 'admin_email' );
		
		$resetpassword_url = esc_url_raw ( add_query_arg( 
			array( 
				'action' => 'resetpassword',
				'login' => $user_login,
				'key' => $user->user_resetpassword_key
			), 
			$sc_theme_globals->get_reset_password_page_url()
		) );

		$subject = sprintf(__( '%s - Reset Password Request', 'socialchef' ), get_bloginfo( 'name' ));
		$body = __( 'To reset your password please go to the following url: ', 'socialchef' );
		$body .= "\r\n";
		$body .= $resetpassword_url;
		$body .= "\r\n";
		$body .= "\r\n";
		$body .= __( 'This link will remain valid for the next 24 hours.', 'socialchef' );
		$body .= __( 'In case you did not request a password reset, please ignore this email.', 'socialchef' );

		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=utf-8";
		$headers[] = "From: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
		$headers[] = "Reply-To: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
		$headers[] = "X-Mailer: PHP/".phpversion();
		
		return wp_mail( $user->user_email, $subject, $body, implode( "\r\n", $headers ), '-f ' . $admin_email ); 
	}	

	public static function reset_password( $user_login, $resetpassword_key ){
		
		$user = get_user_by('login', $user_login);
		if (!$user)
			$user = get_user_by('email', $user_login);

		if ( $user && $user->user_resetpassword_key && $user->user_resetpassword_key === $resetpassword_key ){
			// check reset password time
			if ( !$user->user_resetpassword_datetime || strtotime( $user->user_resetpassword_datetime ) < time() - ( 24 * 60 * 60 ) ) 
				return false;

			// reset password
			$userdata = array(
				'ID' => $user->ID,
				'user_pass' => wp_generate_password( 8, false )
			);

			wp_update_user( $userdata );
			delete_user_meta( $user->ID, 'user_resetpassword_key' );
			
			return $userdata['user_pass'];
		} else{
			return false;
		}
	}
	
	public static function new_password_notification( $user_login, $new_password ){

		$user = get_user_by('login', $user_login);
		if (!$user)
			$user = get_user_by('email', $user_login);
			
		if( !$user || !$new_password ) return false;

		$subject = get_bloginfo( 'name' ) . __( ' - New Password ', 'socialchef' );
		$body = __( 'Your password was successfully reset. ', 'socialchef' );
		$body .= "\r\n";
		$body .= "\r\n";
		$body .= __( 'Your new password is:', 'socialchef' );
		$body .= ' ' . $new_password;

		$admin_email = get_option( 'admin_email' );
		
		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=utf-8";
		$headers[] = "From: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
		$headers[] = "Reply-To: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
		$headers[] = "X-Mailer: PHP/".phpversion();
		
		return wp_mail( $user->user_email, $subject, $body, implode( "\r\n", $headers ), '-f ' . $admin_email ); 
	}
		
	public static function activation_notification( $user_id ){

		global $sc_theme_globals;
		$user = get_userdata( $user_id );
		
		if( !$user  ) return false;
		
		$user_activation_key = get_user_meta($user_id, 'user_activation_key', true);
		
		if (empty($user_activation_key))
			return false;
		
		$activation_url = esc_url_raw ( add_query_arg( 
			array( 
				'action' => 'activate',
				'user_id' => $user->ID,
				'activation_key' => $user_activation_key
			), 
			$sc_theme_globals->get_register_page_url()
		) );
		
		$subject = get_bloginfo( 'name' ) . __( ' - User Activation ', 'socialchef' );
		$body = __( 'To activate your user account, please click the activation link below: ', 'socialchef' );
		$body .= "\r\n";
		$body .= $activation_url;

		$admin_email = get_option( 'admin_email' );
		
		$headers   = array();
		$headers[] = "MIME-Version: 1.0";
		$headers[] = "Content-type: text/plain; charset=utf-8";
		$headers[] = "From: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
		$headers[] = "Reply-To: " . get_bloginfo( 'name' ) . " <" . $admin_email . ">";
		$headers[] = "X-Mailer: PHP/".phpversion();
		
		return wp_mail( $user->user_email, $subject, $body, $headers );
	}
	
	public static function activate_user( $user_id, $activation_key ){
		$user = get_userdata( $user_id );
		$user_activation_key = get_user_meta($user_id, 'user_activation_key', true);

		if ( $user && !empty($user_activation_key) && $user_activation_key === $activation_key ) {
			$userdata = array(
				'ID' => $user->ID,
				'role' => get_option('default_role')
			);

			wp_update_user( $userdata );
			delete_user_meta( $user_id, 'user_activation_key' );
			
			return true;
		} else{
			return false;
		}
	}
		
	// solution from http://stackoverflow.com/questions/13301142/php-how-to-convert-string-duration-to-iso-8601-duration-format-ie-30-minute
	public static function time_to_iso8601_duration($time) {
		$units = array(
			"Y" => 365*24*3600,
			"D" =>     24*3600,
			"H" =>        3600,
			"M" =>          60,
			"S" =>           1,
		);

		$str = "P";
		$istime = false;

		foreach ($units as $unitName => &$unit) {
			$quot  = intval($time / $unit);
			$time -= $quot * $unit;
			$unit  = $quot;
			if ($unit > 0) {
				if (!$istime && in_array($unitName, array("H", "M", "S"))) { // There may be a better way to do this
					$str .= "T";
					$istime = true;
				}
				$str .= strval($unit) . $unitName;
			}
		}

		return $str;
	}
}

//
// http://scotty-t.com/2012/07/09/wp-you-oop/
//
abstract class SocialChef_BaseSingleton {
    private static $instance = array();
    protected function __construct() {}
    public static function get_instance() {
        $c = get_called_class();
        if ( !isset( self::$instance[$c] ) ) {
            self::$instance[$c] = new $c();
            self::$instance[$c]->init();
        }

        return self::$instance[$c];
    }

    abstract public function init();
}

function socialchef_comment($comment, $args, $depth) {
	SocialChef_Theme_Utils::comment($comment, $args, $depth);
}

function socialchef_comment_end($comment, $args, $depth) {
	SocialChef_Theme_Utils::comment_end($comment, $args, $depth);
}