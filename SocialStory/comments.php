<?php
global $post;
$post_id = $post;
 
// Do not delete these lines
if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
	die (_e('Please do not load this page directly. Thanks!', 'socialchef'));

if ( post_password_required() ) { ?>
	<p class="nocomments"><?php _e('This post is password protected. Enter the password to view comments.', 'socialchef') ?></p>
<?php
	return;
}
?>

<!--comments-->
<div class="comments" id="comments" itemprop="interactionCount" content="UserComments:<?php echo get_comments_number($post_id); ?>">
	<?php if ( have_comments() ) { ?>
	<h2><?php comments_number(__('No comments', 'socialchef'), __('One comment', 'socialchef'), __('% comments', 'socialchef') );?></h1>
	<ol class="comment-list">
	<?php wp_list_comments('type=comment&callback=socialchef_comment&end-callback=socialchef_comment_end&style=ol'); ?>
	</ol>
	<?php paginate_comments_links(); ?> 
	<?php } else { // this is displayed if there are no comments so far ?>
	<?php if ('open' == $post->comment_status) { ?>
	<p class="zerocomments"><?php _e('No comments yet, be the first to leave one!', 'socialchef') ?></p>	
	<!-- If comments are open, but there are no comments. -->	 
	<?php } else { // comments are closed ?>
	<!-- If comments are closed. -->
	<p class="nocomments"></p>	 
	<?php 	} ?>
	<?php } ?>
	<?php if ('open' == $post->comment_status) { ?>	
	<?php if ( get_option('comment_registration') && !$user_ID ) { ?>
	<p><?php echo sprintf(__('You must be <a href="%s/wp-login.php?redirect_to=%s">logged in</a> to post a comment.', 'socialchef'), esc_url( home_url()), esc_url(get_permalink())); ?></p>
	<?php } else { ?>
	
	<?php 
	
	$args = array();
	$args['logged_in_as'] = "<p>" . sprintf(__('Logged in as <a href="%s/wp-admin/profile.php">%s</a>.', 'socialchef'), esc_url( home_url()), $user_identity) . ' ' . sprintf(__('<a href="%s" title="Log out of this account">Log out &raquo;</a>', 'socialchef'), wp_logout_url(get_permalink())) . '</p>';

	ob_start();
	?>
		<p><?php _e('<strong>Note:</strong> Comments on the web site reflect the views of their respective authors, and not necessarily the views of this web portal. Members are requested to refrain from insults, swearing and vulgar expression. We reserve the right to delete any comment without notice or explanations.', 'socialchef') ?></p>
		<p><?php _e('Your email address will not be published. Required fields are signed with <span class="req">*</span>', 'socialchef') ?></p>
	<?php
	$args['comment_notes_before'] = ob_get_contents();
	ob_end_clean();

	ob_start();
	?>
		<div class="f-row">
			<textarea id="comment" name="comment" rows="10" cols="10"></textarea>
		</div>
	<?php
	$args['comment_field'] = ob_get_contents();
	ob_end_clean();
	
	$fields =  array();
	
	ob_start();
	?>
		<div class="third">
			<input type="text" id="author" name="author" placeholder="<?php esc_attr_e('Name', 'socialchef'); ?>" value="<?php echo esc_attr( $comment_author); ?>" />
			<?php if ($req) echo '<span class="req">*</span>'; ?>
		</div>
	<?php
	$fields['author'] = ob_get_contents();
	ob_end_clean();
	
	ob_start();
	?>
		<div class="third">
			<input type="email" id="email" name="email" placeholder="<?php esc_attr_e('Email', 'socialchef'); ?>" value="<?php echo esc_attr( $comment_author_email ); ?>" />
			<?php if ($req) echo '<span class="req">*</span>'; ?>
		</div>
	<?php
	$fields['email'] = ob_get_contents();
	ob_end_clean();
	
	ob_start();
	?>
		<div class="third last">
			<input type="text" id="url" name="url" placeholder="<?php esc_attr_e('Website', 'socialchef'); ?>" value="<?php echo esc_attr( $comment_author_url ); ?>" />
		</div>
	<?php
	$fields['url'] = ob_get_contents();
	ob_end_clean();
	
	$args['fields'] = $fields;
	
	comment_form($args); 
	?>	
	<!--//post comment form-->
	<?php 	} /* if (get_option('comment_registration')... */ ?>	
	<?php } /* if ('open'... */ ?>	
</div><!--comments-->
