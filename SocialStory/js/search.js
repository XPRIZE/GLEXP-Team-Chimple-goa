(function($){

	"use strict";

	$(document).ready(function () {
		cs_search.init();
	});

	$(window).load(function(){

	});
	
	var cs_search = {
		
		load : function() {

		},
		init : function() {
			cs_search.configureSuggest('ingredient_name', 'ingredient_search_request');
			
			$('.add_search_ingredient').on('click', function(e) {
			
				var ingredientName = $('#ingredient_name').val();
				$('#ingredient_name').val('');
				
				if (ingredientName.length > 0) {
					var ingredientCount = $(".added-ingredients input.added-ingredient").length;
					var ingredientIndex = ingredientCount + 1;
					$(".added-ingredients").append("<div class='f-row'><input type='text' class='added-ingredient' name='ingredients[]' value='" + ingredientName + "' /><button id='added_ingredient_" + ingredientIndex + "' class='remove remove_search_ingredient'>-</button></div>");
					cs_search.bindNewIngredientButtons('added_ingredient_' + ingredientIndex);
				}
				
				e.preventDefault();
				
			});
			
			$('.add_random_search_ingredient').on('click', function(e) {
			
				var ingredientName = $(this).text();

				if (ingredientName.length > 0) {
					var ingredientCount = $(".added-ingredients input.added-ingredient").length;
					var ingredientIndex = ingredientCount + 1;
					$(".added-ingredients").append("<div class='f-row'><input type='text' class='added-ingredient' name='ingredients[]' value='" + ingredientName + "' /><button id='added_ingredient_" + ingredientIndex + "' class='remove remove_search_ingredient'>-</button></div>");
					cs_search.bindNewIngredientButtons('added_ingredient_' + ingredientIndex);
					$(this).remove();
				}
				
				e.preventDefault();
				
			});
			
		},
		bindNewIngredientButtons: function(buttonId) {
		
			$('#' + buttonId).on('click', function(e) {
				e.preventDefault();	
				$(this).parent().remove();			
			});

			
		},
		configureSuggest: function (element_name, ajax_method) {
			$('input#' + element_name + '').suggest(SCAjax.ajax_url + '?action=' + ajax_method + '&nonce=' + SCAjax.nonce, {
				multiple     	: false,
				delimiter		: ';',
				multipleSep		: '',
				resultsClass 	: 'suggest-results',
				selectClass  	: 'suggest-over',
				matchClass   	: 'suggest-match'
			});
		}
		
	}

})(jQuery);