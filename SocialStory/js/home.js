(function($){

	"use strict";

	window.home = {
		
		load : function() {

			window.dynamicNumbersBound = false;
			home.bindDynamicNumbers();			
		},
		bindDynamicNumbers : function () {
			$('.dynamic-number').each(function() {				
				var startNumber = $(this).text();
				var endNumber = $(this).data('dnumber');
				var dynamicNumberControl = $(this);
				
				$({numberValue: startNumber}).animate({numberValue: endNumber}, {
					duration: 4000,
					easing: 'swing',
					step: function() { 
						$(dynamicNumberControl).text(Math.ceil(this.numberValue)); 
					}
				});
			});	
		},	
		hasClass : function (element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}
	}

})(jQuery);