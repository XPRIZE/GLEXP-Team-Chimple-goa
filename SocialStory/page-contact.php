<?php
/* Template Name: Contact Page */
/*
 * The template for displaying a page with a contact form
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress'); 
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');
global $sc_theme_globals, $post;
$form_submitted = false;

if(isset($_POST['contact_form_submit'])) {
	
	$form_submitted = true;	
	
	$success_message = __('Thank you for contacting us. We will get back to you as quick as we can!', 'socialchef');
	
	if ( empty($_POST) || !wp_verify_nonce($_POST['contact_form_nonce'],'contact_form') )
	{
	   exit; // failed to verify nonce so exit.
	} else {
		// process form data since nonce was verified	   
		$contact_form_message = wp_kses($_POST['contact_form_message'], '');
		$contact_form_email = wp_kses($_POST['contact_form_email'], '');
		$contact_form_surname = wp_kses($_POST['contact_form_surname'], '');
		$contact_form_name = wp_kses($_POST['contact_form_name'], '');
		$contact_form_phone = wp_kses($_POST['contact_form_phone'], '');
		$admin_email = get_option('admin_email');
			
		if (!empty($contact_form_name) &&
			!empty($contact_form_email) &&
			!empty($contact_form_message)) {
			
			$subject = sprintf(__('%s - Contact Form Submission From %s', 'socialchef'), get_bloginfo( 'name' ), $contact_form_name);
			$message = sprintf(__("Name: %s " . PHP_EOL . "Surname: %s " . PHP_EOL . "Email: %s " . PHP_EOL . "Phone: %s" . PHP_EOL . "Message: %s", 'socialchef'), $contact_form_name, $contact_form_surname, $contact_form_email, $contact_form_phone, $contact_form_message);
			
			$headers   = array();
			$headers[] = "MIME-Version: 1.0";
			$headers[] = "Content-type: text/plain; charset=utf-8";
			$headers[] = "From: " . $contact_form_name . " <" . $contact_form_email . ">";
			$headers[] = "Reply-To: " . $contact_form_name . " <" . $contact_form_email . ">";
			$headers[] = "X-Mailer: PHP/" . phpversion();
			
			wp_mail( $admin_email, $subject, $message, implode( "\r\n", $headers ), '-f ' . $admin_email ); 
			
		} else {
			$contact_error_message = sprintf(__('To submit contact form, please enable JavaScript. <a href="%s">Go back</a> to form', 'socialchef'), esc_url( $sc_theme_globals->get_contact_page_url()) );
		}
	}
}

?>
	<!--row-->
	<div class="row">
	<!--content-->
		<section class="content center full-width">
			
			<?php  while ( have_posts() ) : the_post(); ?>
			<?php if (!empty($post->post_content)) { ?>
			<article id="page-<?php the_ID(); ?>">
				<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'socialchef' ) ); ?>
				<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
			</article>
			<?php } ?>
			<?php endwhile; ?>			
			<section class="content center full-width">
				<div class="modal container">
					<form action="<?php echo SocialChef_Theme_Utils::get_current_page_url(); ?>" id="contact-form" method="post">
						<h3><?php the_title(); ?></h3>
						<?php if ($form_submitted) { ?>
						<?php 	if (!empty($contact_error_message)) { ?>
									<div class="alert alert-danger">
										<?php echo $contact_error_message; ?>
									</div>
						<?php 	} else { ?>
									<div class="alert alert-success">
										<?php echo $success_message; ?>
									</div>						
						<?php 	} // !empty($contact_error_message) ?>					
						<?php } else { ?>
						<div class="f-row">
							<input name="contact_form_name" id="contact_form_name" type="text" placeholder="<?php esc_attr_e('Your name', 'socialchef'); ?>" required="required" />
						</div>
						<div class="f-row">
							<input name="contact_form_surname" id="contact_form_surname" type="text" placeholder="<?php esc_attr_e('Your surname', 'socialchef'); ?>" />
						</div>
						<div class="f-row">
							<input name="contact_form_email" id="contact_form_email" type="email" placeholder="<?php esc_attr_e('Your email', 'socialchef'); ?>" required="required" />
						</div>
						<div class="f-row">
							<input id="contact_form_phone" name="contact_form_phone" type="text" placeholder="<?php esc_attr_e('Your phone number', 'socialchef'); ?>" />
						</div>
						<div class="f-row">
							<textarea id="contact_form_message" name="contact_form_message" placeholder="<?php esc_attr_e('Your message', 'socialchef'); ?>" required="required"></textarea>
						</div>
						<?php wp_nonce_field('contact_form','contact_form_nonce'); ?>
						<div class="f-row bwrap">
							<input type="submit" value="<?php esc_attr_e('Send message', 'socialchef'); ?>" id="contact_form_submit" name="contact_form_submit" />
						</div>
						<?php } // form_submitted ?>					
					</form>
				</div>
			</section>
		</section>	
	</div><!--//row-->
<?php 	
get_footer( 'buddypress' );