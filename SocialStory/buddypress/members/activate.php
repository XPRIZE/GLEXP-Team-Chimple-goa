<div id="buddypress" class="contact center">

	<?php do_action( 'bp_before_activation_page' ); ?>

	<div class="page" id="activate-page">

		<?php do_action( 'template_notices' ); ?>

		<?php do_action( 'bp_before_activate_content' ); ?>

		<?php if ( bp_account_was_activated() ) : ?>

			<?php if ( isset( $_GET['e'] ) ) : ?>
				<p><?php _e( 'Your account was activated successfully! Your account details have been sent to you in a separate email.', 'buddypress' ); ?></p>
			<?php else : ?>
				<p><?php printf( __( 'Your account was activated successfully! You can now <a href="%s">log in</a> with the username and password you provided when you signed up.', 'buddypress' ), wp_login_url( bp_get_root_domain() ) ); ?></p>
			<?php endif; ?>

		<?php else : ?>

			<p><?php _e( 'Please provide a valid activation key.', 'buddypress' ); ?></p>

			<form action="" method="get" class="" id="activation-form">
				<div class="modal container">
					<header class="s-title">
						<h1><?php the_title(); ?></h1>
					</header>

					<div class="f-row">
						<input type="text" name="key" id="key" value="" placeholder="<?php esc_attr_e( 'Activation Key:', 'buddypress' ); ?>" />
					</div>
					
					<div class="f-row bwrap">
						<input type="submit" name="submit" value="<?php esc_attr_e( 'Activate', 'buddypress' ); ?>" />
					</div>
				</div>
			</form>

		<?php endif; ?>

		<?php do_action( 'bp_after_activate_content' ); ?>
	</div><!-- .page -->

	<?php do_action( 'bp_after_activation_page' ); ?>

</div><!-- #buddypress -->