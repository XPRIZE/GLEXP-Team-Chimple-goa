<?php
/**
 * The sidebar containing the left widget area.
 *
 * If no active widgets in sidebar, let's hide it completely.
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
?>
<?php if ( is_active_sidebar( 'left' ) ) : ?>
	<aside id="secondary-left" class="left-sidebar sidebar widget-area one-fourth" role="complementary">
		<ul>
		<?php dynamic_sidebar( 'left' ); ?>
		</ul>
	</aside><!-- #secondary -->
<?php endif; ?>