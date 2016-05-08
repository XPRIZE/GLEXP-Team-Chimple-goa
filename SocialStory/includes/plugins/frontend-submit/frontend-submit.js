(function($){

	"use strict";

	$(document).ready(function () {
		submit_recipe.init();
	});

	$(window).load(function(){

	});

	var validator = $('#fes-upload-form-recipe').validate({
		onkeyup: false,
		ignore: [],
		rules: {
			post_title: "required",
			recipe_preparation_time: "required",
			recipe_cooking_time: "required",
			recipe_serving: "required",
			recipe_difficulty: "required",
			recipe_meal_course: "required",
			post_content: "required",
			instruction_0: "required",
			ingredient_0_name: "required",
			ingredient_0_quantity: "required",
			ingredient_0_unit: "required",
			featured_image: "required",
			recipe_status: "required"					
		},
		invalidHandler: function(e, validator) {
		
			var errors = validator.numberOfInvalids();
			if (errors) {
				$("div.alert-danger").show();
			} else {
				$("div.alert-danger").hide();
			}
			
		},
		errorPlacement: function(error, element) {
			if (element[0].tagName == "SELECT") {
				element.parent().addClass('error');
			}
			else if (element[0].type === 'radio') {
				element.parent().parent().addClass('error');
			}
			return true;
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {    
				if (element.tagName == "SELECT") {
					$(element).parent().removeClass(errorClass).addClass(validClass);
				} else {
					$(element).removeClass(errorClass).addClass(validClass);
				}
			}
		},
		messages: {	
			post_title: "1",
			recipe_preparation_time: "2",
			recipe_cooking_time: "3",
			recipe_serving: "4",
			recipe_difficulty: "5",
			recipe_meal_course: "6",
			post_content: "7",
			instruction_0: "8",
			ingredient_0_name: "9",
			ingredient_0_quantity: "10",
			ingredient_0_unit: "11",
			featured_image: "12",
			recipe_status: "13"					
		}			
	});
	
	var submit_recipe = {
		
			generateImageFromCanvas: function () {
				
 			 var canvas = document.getElementById("gameCanvas");
				if(canvas != null) {
				    var dataURL = canvas.toDataURL("image/png");    				
					return dataURL;
				}
			},
		
			init : function () {
		
			$('#submit_recipe').on('click', function(e) {
				
				var content = tinyMCE.activeEditor.getContent({format : 'raw'}); // get the content
				$('#fes_post_content').val(content); // put it in the textarea
			
				if ($('#fes-upload-form-recipe').valid()) {
					$('.recipe_saving').show();
					var gameCanvasImage = document.getElementById("gameCanvasImage");
					gameCanvasImage.value = submit_recipe.generateImageFromCanvas();
					form.submit();
				}

				e.preventDefault();
				return false;				
			});
		
			$('.add_instruction').on('click', function(e) {
			
				e.preventDefault();
				
				var lastInstruction = $('.instructions .f-row.instruction:last');
				var lastInstructionClass = lastInstruction.attr('class');
				lastInstructionClass = lastInstructionClass.replace('f-row', '');
				lastInstructionClass = lastInstructionClass.replace('instruction', '');
				lastInstructionClass = lastInstructionClass.replace('instruction', '');
				lastInstructionClass = lastInstructionClass.replace('_', '');
				var lastInstructionIndex = parseInt(lastInstructionClass);
				var newInstructionIndex = lastInstructionIndex + 1;
				
				var instructionPlaceHolder = window.instructionText;

				var newInstructionRow = '<div class="f-row instruction instruction_' + newInstructionIndex + '">';
				newInstructionRow += '<div class="full">';
				newInstructionRow += '<input type="text" class="instruction_text" placeholder="' + instructionPlaceHolder + '" name="instruction_' + newInstructionIndex + '" id="instruction_' + newInstructionIndex + '">';
				newInstructionRow += '</div>'
				newInstructionRow += '<button class="remove remove_instruction">-</button></div>';
				$( '.instructions .f-row.instruction:last' ).after(newInstructionRow);
				
				submit_recipe.bindInstructionButtons();
			});
			
			$('.add_ingredient').on('click', function(e) {
			
				e.preventDefault();
				
				var lastIngredient = $('.ingredients .f-row.ingredient:last');
				var lastIngredientClass = lastIngredient.attr('class');
				lastIngredientClass = lastIngredientClass.replace('f-row', '');
				lastIngredientClass = lastIngredientClass.replace('ingredient', '');
				lastIngredientClass = lastIngredientClass.replace('ingredient', '');
				lastIngredientClass = lastIngredientClass.replace('_', '');
				var lastIngredientIndex = parseInt(lastIngredientClass);
				var newIngredientIndex = lastIngredientIndex + 1;
				
				var ingredientNamePlaceHolder = window.ingredientNameText;
				var ingredientQuantityPlaceHolder = window.ingredientQuantityText;

				var newIngredientRow = '<div class="f-row ingredient ingredient_' + newIngredientIndex + '">';
				newIngredientRow += '<div class="large">';
				newIngredientRow += '<input class="ingredient_name" type="text" placeholder="' + ingredientNamePlaceHolder + '" name="ingredient_' + newIngredientIndex + '_name" class="ingredient_name" id="ingredient_' + newIngredientIndex + '_name">';
				newIngredientRow += '</div>'
				newIngredientRow += '<div class="small">';
				newIngredientRow += '<input class="ingredient_quantity" type="text" placeholder="' + ingredientQuantityPlaceHolder + '" name="ingredient_' + newIngredientIndex + '_quantity" id="ingredient_' + newIngredientIndex + '_quantity">';
				newIngredientRow += '</div>'
				newIngredientRow += '<div class="third">';
				newIngredientRow += '<select class="ingredient_unit" id="ingredient_' + newIngredientIndex + '_unit" name="ingredient_' + newIngredientIndex + '_unit">';
				newIngredientRow += '</select>'
				newIngredientRow += '</div>'
				newIngredientRow += '<button class="remove remove_ingredient">-</button></div>';

				var $ingredient_unit_options = $("select.ingredient_unit:last > option").clone();
				
				$( '.ingredients .f-row.ingredient:last' ).after(newIngredientRow);

				$('select[name=ingredient_' + newIngredientIndex + '_unit]').append($ingredient_unit_options);
				
				$('select[name=ingredient_' + newIngredientIndex + '_unit]').uniform();
				
				submit_recipe.bindIngredientButtons();
				submit_recipe.configureSuggest('ingredient_' + newIngredientIndex + '_name', 'ingredient_search_request');
			});
			
			$('.add_nutritional_element').on('click', function(e) {
			
				e.preventDefault();
				
				var lastNutritionalElement = $('.nutritional_elements .f-row.nutritional_element:last');
				var lastNutritionalElementClass = lastNutritionalElement.attr('class');
				lastNutritionalElementClass = lastNutritionalElementClass.replace('f-row', '');
				lastNutritionalElementClass = lastNutritionalElementClass.replace('nutritional_element', '');
				lastNutritionalElementClass = lastNutritionalElementClass.replace('nutritional_element', '');
				lastNutritionalElementClass = lastNutritionalElementClass.replace('_', '');
				var lastNutritionalElementIndex = parseInt(lastNutritionalElementClass);
				var newNutritionalElementIndex = lastNutritionalElementIndex + 1;
				
				var nutritionalElementNamePlaceHolder = window.nutritionalElementNameText;
				var nutritionalElementQuantityPlaceHolder = window.nutritionalElementQuantityText;

				var newNutritionalElementRow = '<div class="f-row nutritional_element nutritional_element_' + newNutritionalElementIndex + '">';
				newNutritionalElementRow += '<div class="large">';
				newNutritionalElementRow += '<input class="nutritional_element_name" type="text" placeholder="' + nutritionalElementNamePlaceHolder + '" name="nutritional_element_' + newNutritionalElementIndex + '_name" class="nutritional_element_name" id="nutritional_element_' + newNutritionalElementIndex + '_name">';
				newNutritionalElementRow += '</div>'
				newNutritionalElementRow += '<div class="small">';
				newNutritionalElementRow += '<input class="nutritional_element_quantity" type="text" placeholder="' + nutritionalElementQuantityPlaceHolder + '" name="nutritional_element_' + newNutritionalElementIndex + '_quantity" id="nutritional_element_' + newNutritionalElementIndex + '_quantity">';
				newNutritionalElementRow += '</div>'
				newNutritionalElementRow += '<div class="third">';
				newNutritionalElementRow += '<select class="nutritional_unit" id="nutritional_' + newNutritionalElementIndex + '_unit" name="nutritional_' + newNutritionalElementIndex + '_unit">';
				newNutritionalElementRow += '</select>'
				newNutritionalElementRow += '</div>'
				newNutritionalElementRow += '<button class="remove remove_nutritional_element">-</button></div>';

				var $nutritional_unit_options = $("select.nutritional_unit:last > option").clone();
				
				$( '.nutritional_elements .f-row.nutritional_element:last' ).after(newNutritionalElementRow);

				$('select[name=nutritional_' + newNutritionalElementIndex + '_unit]').append($nutritional_unit_options);
				
				$('select[name=nutritional_' + newNutritionalElementIndex + '_unit]').uniform();
				
				submit_recipe.bindNutritionalElementButtons();
				submit_recipe.configureSuggest('nutritional_element_' + newNutritionalElementIndex + '_name', 'nutritional_element_search_request');
			});
			
			submit_recipe.bindInstructionButtons();
			submit_recipe.bindIngredientButtons();
			submit_recipe.configureSuggest('ingredient_0_name', 'ingredient_search_request');
			
			if (window.enableNutritionalElements) {
				submit_recipe.bindNutritionalElementButtons();			
				submit_recipe.configureSuggest('nutritional_element_0_name', 'nutritional_element_search_request');
			}
			
		},
		bindInstructionButtons : function() {
			$('.remove_instruction').unbind('click');
			$('.remove_instruction').on('click', function(e) {
				e.preventDefault();
				if ($('.instruction').length > 1)
					$(this).closest( ".instruction" ).remove();
			});
		},
		bindIngredientButtons : function() {
			$('.remove_ingredient').unbind('click');
			$('.remove_ingredient').on('click', function(e) {
				e.preventDefault();
				if ($('.ingredient').length > 1)
					$(this).closest( ".ingredient" ).remove();
			});
		},
		bindNutritionalElementButtons : function() {
			$('.remove_nutritional_element').unbind('click');
			$('.remove_nutritional_element').on('click', function(e) {
				e.preventDefault();
				if ($('.nutritional_element').length > 1)
					$(this).closest( ".nutritional_element" ).remove();
			});
		},
		configureSuggest: function (element_name, ajax_method) {
			$('input[name=' + element_name + ']').suggest(SCAjax.ajax_url + '?action=' + ajax_method + '&nonce=' + SCAjax.nonce, {
				multiple     	: false,
				delimiter		: ';',
				multipleSep		: '',
				resultsClass 	: 'suggest-results',
				selectClass  	: 'suggest-over',
				matchClass   	: 'suggest-match'
			});
		},
	}

})(jQuery);