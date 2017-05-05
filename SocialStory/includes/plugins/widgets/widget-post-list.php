<?php

/*-----------------------------------------------------------------------------------

	Plugin Name: SocialChef Post List Widget

-----------------------------------------------------------------------------------*/

// Add function to widgets_init that'll load our widget.
add_action( 'widgets_init', 'socialchef_post_lists_widgets' );

// Register widget.
function socialchef_post_lists_widgets() {
	register_widget( 'socialchef_Post_List_Widget' );
}

// Widget class.
class socialchef_Post_List_Widget extends WP_Widget {

	/*-----------------------------------------------------------------------------------*/
	/*	Widget Setup
	/*-----------------------------------------------------------------------------------*/
	
	function __construct() {
	
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'socialchef_post_lists_widget', 'description' => __('SocialChef: Post List', 'socialchef') );

		/* Widget control settings. */
		$control_ops = array( 'width' => 260, 'height' => 400, 'id_base' => 'socialchef_post_lists_widget' );

		/* Create the widget. */
		parent::__construct( 'socialchef_post_lists_widget', __('SocialChef: Post List', 'socialchef'), $widget_ops, $control_ops );
	}


/*-----------------------------------------------------------------------------------*/
/*	Display Widget
/*-----------------------------------------------------------------------------------*/
	
	function widget( $args, $instance ) {
		
		global $sc_theme_globals;
		
		$card_layout_classes = array(
			'full-width',
			'one-half',
			'one-third',
			'one-fourth',
			'one-fifth'
		);
		
		extract( $args );
		
		/* Our variables from the widget settings. */
		$title = apply_filters('widget_title', isset($instance['title']) ? $instance['title'] : __('Display latest posts', 'socialchef') );
		
		$number_of_posts = isset($instance['number_of_posts']) ? (int)$instance['number_of_posts'] : 5;
		$sort_by = isset($instance['sort_by']) ? (int)$instance['sort_by'] : 'title';
		$sort_descending = isset($instance['sort_by']) && $instance['sort_descending'] == '1';
		$order = $sort_descending ? 'DESC' : 'ASC';
		$post_category_ids = isset($instance['post_category_ids']) ? (array)$instance['post_category_ids'] : array();
		$posts_per_row = isset($instance['posts_per_row']) ? (int)$instance['posts_per_row'] : 3;
		$show_featured_only = isset($instance['show_featured_only']) && $instance['show_featured_only'] == '1';
		$display_mode = isset($instance['display_mode']) ? $instance['display_mode'] : 'small';

		echo $before_widget;
		
		?>
		<!--cwrap-->
		<div class="cwrap">
		<?php
		
		/* Display Widget */
		
		$post_args = array(
			'post_type'         => 'post',
			'post_status'       => array('publish'),
			'posts_per_page'    => $number_of_posts,
			'paged' 			=> 1, 
			'orderby'           => $sort_by,
			'suppress_filters' 	=> false,
			'order'				=> $order,
			'meta_query'        => array('relation' => 'AND')
		);
		
		if (count($post_category_ids) > 0) {
			$numeric_category_ids = array();
			foreach ($post_category_ids as $post_category_id) {
				$numeric_category_ids[] = (int)$post_category_id;
			}
			$post_category_ids_str = implode(',', $numeric_category_ids);
			$post_args['category'] = $post_category_ids_str;
		}
		
		if ($display_mode == 'card') { ?>
			<header class="s-title">
			<?php echo $before_title . $title . $after_title; ?>
			</header> <?php			
		} else {
			echo $before_title . $title . $after_title; 		
		}
		
		$posts_array = get_posts( $post_args );
		if ($display_mode == 'small') {
			if (count($posts_array) > 0) { 
			?>
			<ul class="articles_latest">
			<?php
				for ($i = 0; $i < count($posts_array); $i++) {
					if (isset($posts_array[$i])) {
						$article = $posts_array[$i];
						$article_permalink = get_permalink($article->ID);
						$article_title = get_the_title($article->ID);
						$image_id = get_post_thumbnail_id( $article->ID );
						$image_src = '';
						if ($image_id > 0) {
							$image_src = SocialChef_Theme_Utils::get_image_src($image_id, 'thumbnail');
						}
?>
				<li>
					<a href="<?php echo esc_url ($article_permalink); ?>">
						<?php if (!empty($image_src)) { ?>
						<img src="<?php echo esc_url ($image_src); ?>" alt="<?php echo esc_attr ( $article_title ); ?>" />
						<?php } ?>
						<h6><?php echo $article_title; ?></h6>
					</a>
				</li>
<?php
					}
				}
			?>
			</ul>
			<?php
			}
		} else {
		
			if (count($posts_array)) { ?>
				<!--entries-->
				<div class="entries row"><?php
				for ($i = 0; $i < count($posts_array); $i++) {

					$post_result = $posts_array[$i];
					global $post, $sc_post_class;
					$post = $post_result;
					setup_postdata( $post ); 
					$sc_post_class = $card_layout_classes[$posts_per_row - 1];
					get_template_part('includes/parts/post', 'item');
					
				}?>
				<!--//entries-->
					<div class="quicklinks">
						<a href="<?php echo esc_url ($sc_theme_globals->get_blog_posts_root_url()); ?>" class="button"><?php _e('More posts', 'socialchef'); ?></a>
						<a href="javascript:void(0)" class="button scroll-to-top"><?php _e('Back to top', 'socialchef'); ?></a>
					</div>
				</div><?php
			}
		}
		
		?>
		</div>
		<!--//cwrap-->
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
		$instance['number_of_posts'] = strip_tags( $new_instance['number_of_posts']);
		$instance['sort_by'] = strip_tags( $new_instance['sort_by']);
		$instance['sort_descending'] = strip_tags( $new_instance['sort_descending']);
		$instance['post_category_ids'] = $new_instance['post_category_ids'];
		$instance['display_mode'] = strip_tags( $new_instance['display_mode']);
		$instance['posts_per_row'] = strip_tags( $new_instance['posts_per_row']);
		$instance['show_featured_only'] = strip_tags( $new_instance['show_featured_only']);
		
		return $instance;
	}
	

/*-----------------------------------------------------------------------------------*/
/*	Widget Settings
/*-----------------------------------------------------------------------------------*/
	 
	function form( $instance ) {
			
		$args = array(
			'type'                     => 'post',
			'orderby'                  => 'name',
			'order'                    => 'ASC',
			'hide_empty'               => 0,
			'taxonomy'                 => 'category',
		); 
		$categories = get_categories( $args ); 
			
		/* Set up some default widget settings. */
		$defaults = array(
			'title' => __('Latest posts', 'socialchef'),
			'number_of_posts' => '5',
			'sort_by' => 'date',
			'sort_descending' => '1',
			'display_mode' => 'small',
			'post_category_ids' => array(),
			'posts_per_row' => 3,
			'show_featured_only' => '0'
		);
		$instance = wp_parse_args( (array) $instance, $defaults ); ?>

		<!-- Widget Title: Text Input -->
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php _e('Title:', 'socialchef') ?></label>
			<input type="text" class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" value="<?php echo esc_attr ($instance['title']); ?>" />
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'number_of_posts' ) ); ?>"><?php _e('How many posts do you want to display?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr( $this->get_field_id( 'number_of_posts' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'number_of_posts' ) ); ?>">
				<?php for ($i=1;$i<13;$i++) { ?>
				<option <?php echo ($i == $instance['number_of_posts'] ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr ( $i ); ?>"><?php echo $i; ?></option>
				<?php } ?>
			</select>
		</p>

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'sort_by' ) ); ?>"><?php _e('What do you want to sort the posts by?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr( $this->get_field_id( 'sort_by' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'sort_by') ); ?>">
				<option <?php echo 'title' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="title"><?php _e('Post Title', 'socialchef') ?></option>
				<option <?php echo 'ID' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="ID"><?php _e('Post ID', 'socialchef') ?></option>
				<option <?php echo 'rand' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="rand"><?php _e('Random', 'socialchef') ?></option>
				<option <?php echo 'date' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="date"><?php _e('Publish Date', 'socialchef') ?></option>
				<option <?php echo 'comment_count' == $instance['sort_by'] ? 'selected="selected"' : ''; ?> value="comment_count"><?php _e('Comment Count', 'socialchef') ?></option>
			</select>
		</p>		

		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'sort_descending' ) ); ?>"><?php _e('Sort posts in descending order?', 'socialchef') ?></label>
			<input type="checkbox"  <?php echo ($instance['sort_descending'] == '1' ? 'checked="checked"' : ''); ?> class="checkbox" id="<?php echo esc_attr( $this->get_field_id( 'sort_descending' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'sort_descending') ); ?>" value="1" />
		</p>
		
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'display_mode' ) ); ?>"><?php _e('Display mode?', 'socialchef') ?></label>
			<select class="posts_widget_display_mode" id="<?php echo esc_attr( $this->get_field_id( 'display_mode' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'display_mode') ); ?>">
				<option <?php echo 'small' == $instance['display_mode'] ? 'selected="selected"' : ''; ?> value="small"><?php _e('Small (usually sidebar)', 'socialchef') ?></option>
				<option <?php echo 'card' == $instance['display_mode'] ? 'selected="selected"' : ''; ?> value="card"><?php _e('Card (usually in grid view)', 'socialchef') ?></option>
			</select>
		</p>
		
		<p>
			<label><?php _e('Post categories', 'socialchef') ?></label>
			<div>
				<?php for ($j=0;$j<count($categories);$j++) { 
					$category = $categories[$j];
					$checked = false;
					if (isset($instance['post_category_ids'])) {
						if (in_array($category->term_id, $instance['post_category_ids']))
							$checked = true;
					}
				?>
				<input <?php echo ( $checked ? 'checked="checked"' : '' ); ?> type="checkbox" id="<?php echo esc_attr( $this->get_field_name( 'post_category_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>" name="<?php echo esc_attr( $this->get_field_name( 'post_category_ids' ) ); ?>[]" value="<?php echo esc_attr ($category->term_id); ?>">
				<label for="<?php echo esc_attr( $this->get_field_name( 'post_category_ids' ) ); ?>_<?php echo esc_attr ($category->term_id); ?>"><?php echo $category->name; ?></label>
				<br />
				<?php } ?>
			</div>
		</p>
		
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'show_featured_only') ); ?>"><?php _e('Show only featured stories?', 'socialchef') ?></label>
			<input type="checkbox"  <?php echo ( $instance['show_featured_only'] == '1' ? 'checked="checked"' : '' ); ?> class="checkbox" id="<?php echo esc_attr ( $this->get_field_id( 'show_featured_only' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'show_featured_only' ) ); ?>" value="1" />
		</p>
		
		<p class="cards" <?php echo ( $instance['display_mode'] != 'card' ? 'style="display:none"' : '' ); ?>>
			<label for="<?php echo esc_attr ( $this->get_field_id( 'posts_per_row' ) ); ?>"><?php _e('How many posts do you want to display per row?', 'socialchef') ?></label>
			<select id="<?php echo esc_attr ( $this->get_field_id( 'posts_per_row' ) ); ?>" name="<?php echo esc_attr ( $this->get_field_name( 'posts_per_row' ) ); ?>">
				<?php for ($i=1;$i<6;$i++) { ?>
				<option <?php echo ($i == $instance['posts_per_row'] ? 'selected="selected"' : ''); ?> value="<?php echo esc_attr ( $i ); ?>"><?php echo $i; ?></option>
				<?php } ?>
			</select>
		</p>
		
	<?php
	}	

}