<?php
	global $sc_theme_globals, $wpdb;

	$comments_count = wp_count_comments();
	$approved_comments = $comments_count->approved;
	
	$total_members = 0;
	if (defined('BP_VERSION')) {
		$total_members = bp_core_get_total_member_count();
	} else {
		$result = count_users();
		$total_members = $result['total_users'];
	}
	
	$count_posts = wp_count_posts('post');
	$published_posts = $count_posts->publish;
	
	$count_posts = wp_count_posts('recipe');
	$published_recipes = $count_posts->publish;
	
	$total_attachments = $wpdb->get_var($wpdb->prepare("SELECT COUNT(ID) FROM {$wpdb->posts} WHERE post_type = %s", 'attachment'));
	
	$forum_stats = null;
	if (function_exists('bbp_get_statistics')) {
		$forum_stats = bbp_get_statistics();
	}
?>
				<!--content-->
				<section class="content full-width">
					<div class="icons dynamic-numbers">
						<header class="s-title">
							<h2 class="ribbon large"><?php echo sprintf(__('%s in numbers', 'socialchef'), get_bloginfo('name')); ?></h2>
						</header>
						
						<!--row-->
						<div class="row">
							<!--item-->
							<div class="one-sixth">
								<div class="container">
									<i class="ico i-members"></i>
									<span class="title dynamic-number" data-dnumber="<?php echo esc_attr( $total_members ); ?>">0</span>
									<span class="subtitle"><?php _e('members', 'socialchef'); ?></span>
								</div>
							</div>
							<!--//item-->
							
							<!--item-->
							<div class="one-sixth">
								<div class="container">
									<i class="ico i-recipes"></i>
									<span class="title dynamic-number" data-dnumber="<?php echo esc_attr( $published_recipes); ?>">0</span>
									<span class="subtitle"><?php _e('stories', 'socialchef'); ?></span>
								</div>
							</div>
							<!--//item-->
							
							<!--item-->
							<div class="one-sixth">
								<div class="container">
									<i class="ico i-photos"></i>
									<span class="title dynamic-number" data-dnumber="<?php echo esc_attr( $total_attachments ); ?>">0</span>
									<span class="subtitle"><?php _e('photos', 'socialchef'); ?></span>
								</div>
							</div>
							<!--//item-->
							
							<?php if (isset($forum_stats)) { ?>
							<!--item-->
							<div class="one-sixth">
								<div class="container">
									<i class="ico i-posts"></i>
									<span class="title dynamic-number" data-dnumber="<?php echo esc_attr( $forum_stats['topic_count'] ); ?>">0</span>
									<span class="subtitle"><?php _e('forum posts', 'socialchef'); ?></span>
								</div>
							</div>
							<!--//item-->
							<?php } ?>
							
							<!--item-->
							<div class="one-sixth">
								<div class="container">
									<i class="ico i-comment"></i>
									<span class="title dynamic-number" data-dnumber="<?php echo esc_attr( $approved_comments ); ?>">0</span>
									<span class="subtitle"><?php _e('comments', 'socialchef'); ?></span>
								</div>
							</div>
							<!--//item-->
							
							<!--item-->
							<div class="one-sixth">
								<div class="container">
									<i class="ico i-articles"></i>
									<span class="title dynamic-number" data-dnumber="<?php echo esc_attr( $published_posts ); ?>">0</span>
									<span class="subtitle"><?php _e('articles', 'socialchef'); ?></span>
								</div>
							</div>
							<!--//item-->
							<?php if ( !is_user_logged_in() ) { ?>
							<div class="cta">
								<a href="<?php echo esc_url ($sc_theme_globals->get_register_page_url() ); ?>" class="button big"><?php _e('Join us!', 'socialchef'); ?></a>
							</div>
							<?php } ?>
						</div>
						<!--//row-->
					</div>
				</section>
				<!--//content-->