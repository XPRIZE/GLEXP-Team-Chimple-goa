<?php
/**
/* Template Name: 404 page
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
get_header('buddypress');  
SocialChef_Theme_Utils::breadcrumbs();
get_sidebar('under-header');

global $sc_theme_globals;

?>
<!--row-->
			<div class="row">
				<!--content-->
				<section class="content three-fourth">
					<!--row-->
					<div class="row">
						<div class="one-third">
							<div class="error-container">
								<span class="error_type"><?php _e('404', 'socialchef') ?></span>
								<span class="error_text"><?php _e('Page not found', 'socialchef') ?></span>
							</div>
						</div>
						
						<div class="two-third">
							<div class="container">
								<p><?php _e('The page you have requested could not be found or was removed from our database.', 'socialchef') ?></p>
								<p><?php echo sprintf(__('If you believe that this is an error, please kindly <a href="%s">contact us</a>. Thank you!', 'socialchef'), esc_url($sc_theme_globals->get_contact_page_url())) ?></p>
								<p><?php echo sprintf(__('You can go <a href="%s">back home</a> or try using the search.', 'socialchef'), esc_url( home_url( )) ) ?></p>
							</div>
						</div>
					</div>
					<!--//row-->
				</section>
				<!--//content-->
				
				<!--sidebar-->
				<aside class="sidebar one-fourth">
					<div class="widget">
						<form role="search" method="get" id="searchform" class="searchform" action="<?php echo esc_url( home_url( ) ); ?>">
							<h5><?php _e('Search', 'socialchef') ?></h5>
							<div>
								<div class="f-row">
									<input name="s" type="search" placeholder="<?php esc_attr_e('Enter your search term', 'socialchef') ?>" />
								</div>
								<div class="bwrap">
									<input type="submit" value="<?php esc_attr_e('Search', 'socialchef') ?>" />
								</div>
							</div>
						</form>
					</div>
				</aside>
				<!--//sidebar-->
			</div>
			<!--//row-->
<?php 
get_footer( 'buddypress' );