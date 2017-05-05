<?php 
/*
 * Custom optionsframework scripts
 */
function of_sc_options_script(){	?>
	<style>
		#optionsframework .to-copy {display: none;}
	</style>
	<script type="text/javascript">
		jQuery(function($){
		
			bindSectionVisibility('enable_nutritional_elements');
			
			function bindSectionVisibility(checkboxId) {
				toggleSectionVisibility($("#" + checkboxId).is(':checked'), checkboxId);
				
				$("#" + checkboxId).change(function() {
					toggleSectionVisibility(this.checked, checkboxId);
				});
			}
			
			function toggleSectionVisibility(show, checkboxId) {
				if (show){
					$("#section-nutritional_element_permalink_slug").children().show();
				} else {
					$("#section-nutritional_element_permalink_slug").children().hide();
				}		
			}
			
		});
	</script>
<?php
}
add_action( 'optionsframework_custom_scripts', 'of_sc_options_script' );