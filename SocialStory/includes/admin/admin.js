(function($){

	"use strict";

	$(document).ready(function () {
		sc_admin.init();
	});
	
	var sc_admin = {

		init: function () {		
			$('.datepicker').datepicker();
			
			if (typeof($('.form-table input.is_featured')) !== 'undefined') {
				sc_admin.showHideFeaturedDate();
				$('.form-table input.is_featured').change(function() {
					sc_admin.showHideFeaturedDate();
				});
			}
		},
		showHideFeaturedDate : function () {
			if ($('.form-table input.is_featured').prop('checked')) {
				$('.form-table .featured_date').show();
			} else {
				$('.form-table .featured_date').hide();
			}
		}
		
	}	

})(jQuery);