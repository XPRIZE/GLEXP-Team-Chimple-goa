<?php
	global $sc_is_custom_home;
	if ( !$sc_is_custom_home ) {
?>
	</div><!--//wrap-->
<?php	
	}
	global $bp, $sc_theme_globals;
?>		
	</main><!--//main-->
	<?php get_sidebar('above-footer'); ?>
	<?php do_action( 'bp_after_container' ); ?>
	
	<?php 
	$footer_call_to_action = $sc_theme_globals->get_footer_call_to_action();
	if (!empty($footer_call_to_action)) { ?>
	<!--call to action-->
	<section class="cta">
		<div class="wrap clearfix">
			<a href="<?php echo esc_url($sc_theme_globals->get_footer_call_to_action_url()); ?>" class="button big white right"><?php echo $sc_theme_globals->get_footer_call_to_action_button(); ?></a>
			<h2><?php echo $sc_theme_globals->get_footer_call_to_action(); ?></h2>
		</div>
	</section>
	<!--//call to action-->	
	<?php } ?>
	<?php do_action( 'bp_before_footer'   ); ?>
	<!--footer-->
	<footer class="foot" role="contentinfo">
		<div class="wrap clearfix">
			<div class="row">			
				<?php get_sidebar('footer'); ?>
				<div class="bottom">
					<p class="copy"><?php echo $sc_theme_globals->get_copyright_footer(); ?></p>					
					<!--footer navigation-->				
					<?php if ( has_nav_menu( 'footer-menu' ) ) {
						wp_nav_menu( array( 
							'theme_location' => 'footer-menu', 
							'container' => 'nav', 
							'container_class' => 'foot-nav',
						) ); 
					} else { ?>
					<nav class="foot-nav">
						<ul>
							<li class="menu-item"><a href="<?php echo esc_url( home_url( )); ?>"><?php _e('Home', "socialchef"); ?></a></li>
							<li class="menu-item"><a href="<?php echo esc_url( admin_url('nav-menus.php') ); ?>"><?php _e('Configure', "socialchef"); ?></a></li>
						</ul>
					</nav>
					<?php } ?>
				</div>
				<?php do_action( 'bp_footer' ); ?>			
			</div><!--//row-->
		</div><!--//wrap-->
	</footer>
	<!--//footer-->
	<?php do_action( 'bp_after_footer' ); ?>
	<?php wp_footer(); ?>
</body>
</html>