<?php
/**
 * The sidebar containing the under the header widget area.
 *
 * If no active widgets in sidebar, let's hide it completely.
 *
 * @package WordPress
 * @subpackage SocialChef
 * @since SocialChef 1.0
 */
?>
<?php if ( is_active_sidebar( 'under-header' ) ) : ?>
	<div id="under-header-sidebar" class="under-header-sidebar sidebar widget-area" role="complementary">
		<ul>
		<?php dynamic_sidebar( 'under-header' ); ?>
		</ul>
	</div><!-- #secondary -->
<?php endif; ?>