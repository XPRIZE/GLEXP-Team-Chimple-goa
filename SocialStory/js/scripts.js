(function ($) {

	"use strict";

	$(document).ready(function () {
		scripts.init();
	});

	//PRELOADER
	$(window).load(function () {
		scripts.load();
	});

	var scripts = {

		load: function () {
			$('.preloader').fadeOut("slow", function () {
				// Animation complete.
				if (typeof (window.home) !== 'undefined')
					window.home.load();

				if (typeof (window.chimpleStory) !== 'undefined')
					window.chimpleStory.load();
			});

			scripts.resizeFluidItems();
		},
		init: function () {

			//LIGHTBOX
			$("a[rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'light_square' });

			//CUSTOM FORM ELEMENTS
			$('select, input[type=radio],input[type=checkbox],input[type=file]').uniform();

			//MOBILE MENU
			$('.main-nav').slicknav({
				prependTo: '.head .wrap',
				label: ''
			});

			//SCROLL TO TOP BUTTON
			$('.scroll-to-top').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});

			//MY PROFILE TABS 
			$('.tab-content').hide().first().show();
			$('.tabs li:first').addClass("active");

			$('.tabs a').on('click', function (e) {
				e.preventDefault();
				$(this).closest('li').addClass("active").siblings().removeClass("active");
				$($(this).attr('href')).show().siblings('.tab-content').hide();
			});

			var hash = $.trim(window.location.hash);
			if (hash) $('.tab-nav a[href$="' + hash + '"]').trigger('click');

			//ALERTS
			$('.close').on('click', function (e) {
				e.preventDefault();
				$(this).closest('.alert').hide(400);
			});

			$('.recipe .favorite a:not(.disabled)').on('click', function (e) {
				e.preventDefault();

				var remove = $(this).hasClass('remove');

				var dataObj = {
					'action': 'recipe_mark_as_favorite',
					'userId': window.currentUserId,
					'recipeId': window.recipeId,
					'remove': (remove ? 1 : 0),
					'nonce': SCAjax.nonce
				}

				$.ajax({
					url: SCAjax.ajax_url,
					data: dataObj,
					dataType: 'json',
					success: function (result) {
						if (remove) {
							$('.recipe .favorite a').removeClass('remove');
							$('.recipe .favorite a').html(window.addToFavoritesText);
						} else {
							$('.recipe .favorite a').addClass('remove');
							$('.recipe .favorite a').html(window.removeFromFavoritesText);
						}
					},
					error: function (errorThrown) {
						console.log(errorThrown);
					}
				});
			});
		},
		resizeFluidItems: function () {
			scripts.resizeFluidItem(".one-half.recipe-item,.one-third.recipe-item,.one-fourth.recipe-item,.one-fifth.recipe-item");
			scripts.resizeFluidItem(".one-half.post-item,.one-third.post-item,.one-fourth.post-item,.one-fifth.post-item");
		},
		resizeFluidItem: function (filters) {

			var filterArray = filters.split(',');

			var arrayLength = filterArray.length;
			for (var i = 0; i < arrayLength; i++) {
				var filter = filterArray[i];
				var maxHeight = 0;
				$(filter + " .container").each(function () {
					if ($(this).height() > maxHeight) {
						maxHeight = $(this).height();
					}
				});
				$(filter + ":not(.fluid-item) .container").height(maxHeight);
			}
		}
	}
})(jQuery);