(function($){

	"use strict";

	$(document).ready(function () {
		socialchef_widgets.init();
	});
	
	$(document).on('widget-updated', function(e, widget){
		socialchef_widgets.init();	
	});

	var socialchef_widgets = {
		
		init : function () {
			
			if (typeof ($('.posts_widget_display_mode')) !== 'undefined') {
			
				$('.posts_widget_display_mode').on('change', function(e) {
					var val = $(this).val();
					if (val == 'card')
						$('.cards').show();
					else
						$('.cards').hide();
				});
				
			}
			
			if (typeof ($('.recipes_widget_display_mode')) !== 'undefined') {
			
				$('.recipes_widget_display_mode').on('change', function(e) {
					var val = $(this).val();
					if (val == 'card')
						$('.cards').show();
					else
						$('.cards').hide();
				});
				
			}
			
		}
	}

})(jQuery);