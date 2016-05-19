(function ($) {

	"use strict";

	$(document).ready(function () {
		submit_recipe.init();
	});

	$(window).load(function () {

	});

	var validator = $('#fes-upload-form-recipe').validate({
		onkeyup: false,
		ignore: [],
		rules: {
			post_title: "required",
			// recipe_preparation_time: "required",
			// recipe_cooking_time: "required",
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
		invalidHandler: function (e, validator) {

			var errors = validator.numberOfInvalids();
			if (errors) {
				$("div.alert-danger").show();
			} else {
				$("div.alert-danger").hide();
			}

		},
		errorPlacement: function (error, element) {
			if (element[0].tagName == "SELECT") {
				element.parent().addClass('error');
			}
			else if (element[0].type === 'radio') {
				element.parent().parent().addClass('error');
			}
			return true;
		},
		unhighlight: function (element, errorClass, validClass) {
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
			// recipe_preparation_time: "2",
			// recipe_cooking_time: "3",
			recipe_serving: "4",
			recipe_difficulty: "5",
			recipe_meal_course: "6",
			post_content: "7",
			// instruction_0: "8",
			// ingredient_0_name: "9",
			// ingredient_0_quantity: "10",
			// ingredient_0_unit: "11",
			featured_image: "12",
			recipe_status: "13"
		}
	});

	var submit_recipe = {

		generateImageFromCanvas: function () {
			return chimple.story.titlePageDataURL;
			// var canvas = document.getElementById("gameCanvas");
			// if (canvas != null) {
			// 	var dataURL = canvas.toDataURL("image/png");
			// 	return dataURL;
			// }
		},

		readStoryJSONFromLocalStorage: function () {
			var base64endcoedStoryJSONStr = "";
			var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

			if (chimple.story) {
				// Code for localStorage/sessionStorage.
						chimple.story.titlePageDataURL = null;
						base64endcoedStoryJSONStr = Base64.encode(JSON.stringify(chimple.story));
						base64endcoedStoryJSONStr = 'data:application/json;base64,' + base64endcoedStoryJSONStr;
						chimple.story = null;
			} 
			return base64endcoedStoryJSONStr;
		},

		injectStoryAttributes: function () {
			//inject base64 byte array of Canvas Image
			var gameCanvasImage = document.getElementById("gameCanvasImage");
			gameCanvasImage.value = submit_recipe.generateImageFromCanvas();

			//inject JSON from localStorage from browser			
			var chimpleStoryJSON = document.getElementById("chimpleStoryJSON");
			chimpleStoryJSON.value =  submit_recipe.readStoryJSONFromLocalStorage();
		},

		init: function () {

			$('#submit_recipe').on('click', function (e) {
				var content = tinyMCE.activeEditor.getContent({ format: 'raw' }); // get the content
				$('#fes_post_content').val(content); // put it in the textarea

				if ($('#fes-upload-form-recipe').valid()) {
					$('.recipe_saving').show();
					submit_recipe.injectStoryAttributes();
					form.submit();
				}

				e.preventDefault();
				return false;
			});
		
		configureSuggest: function (element_name, ajax_method) {
			$('input[name=' + element_name + ']').suggest(SCAjax.ajax_url + '?action=' + ajax_method + '&nonce=' + SCAjax.nonce, {
				multiple: false,
				delimiter: ';',
				multipleSep: '',
				resultsClass: 'suggest-results',
				selectClass: 'suggest-over',
				matchClass: 'suggest-match'
			});
		},
	}

})(jQuery);