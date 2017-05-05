jQuery(function($) {

    // the upload image button, saves the id and outputs a preview of the image
    var imageFrame;
    $('.meta_box_upload_image_button').on('click',function(e) {
		upload_image_button_bind(e);
    });
	
	function upload_image_button_bind(e) {
        e.preventDefault();

        var options, attachment;

        $self = $(e.target);
        $div = $self.closest('div.meta_box_image');

        // if the frame already exists, open it
        if ( imageFrame ) {
            imageFrame.open();
            return;
        }

        // set our settings
        imageFrame = wp.media({
            title: 'Choose Image',
            multiple: false,
            library: {
                type: 'image'
            },
            button: {
                text: 'Use This Image'
            }
        });

        // set up our select handler
        imageFrame.on( 'select', function() {
            selection = imageFrame.state().get('selection');

            if ( ! selection )
            return;

            // loop through the selected files
            selection.each( function( attachment ) {
                console.log(attachment);
                var src = attachment.attributes.sizes.full.url;
                var id = attachment.id;

                $div.find('.meta_box_preview_image').attr('src', src);
                $div.find('.meta_box_upload_image').val(id);
            } );
        });

        // open the frame
        imageFrame.open();	
	}

	function remove_file_upload_box_helper(e) {
        e.preventDefault();
        $button = $(e.target);
		var rows = $(this).closest('tbody').find('tr');	
        var defaultImage = $button.parent().siblings('.meta_box_default_image').text();
        $button.parent().siblings('.meta_box_upload_image').val('');
        $button.parent().siblings('.meta_box_preview_image').attr('src', defaultImage);	
		if (rows.length > 1)
			$button.parent().parent().parent().parent().remove();
	}

    // the file image button, saves the id and outputs the file name
    var fileFrame;
    $('.meta_box_upload_file_button').click(function(e) {
        e.preventDefault();

        var options, attachment;

        $self = $(e.target);
        $div = $self.closest('div.meta_box_file_stuff');

        // if the frame already exists, open it
        if ( fileFrame ) {
            fileFrame.open();
            return;
        }

        // set our settings
        fileFrame = wp.media({
            title: 'Choose File',
            multiple: false,
            library: {
                type: 'file'
            },
            button: {
                text: 'Use This File'
            }
        });

        // set up our select handler
        fileFrame.on( 'select', function() {
            selection = fileFrame.state().get('selection');

            if ( ! selection )
            return;

            // loop through the selected files
            selection.each( function( attachment ) {
                console.log(attachment);
                var src = attachment.attributes.url;
                var id = attachment.id;

                $div.find('.meta_box_filename').text(src);
                $div.find('.meta_box_upload_file').val(src);
                $div.find('.meta_box_file').addClass('checked');
            } );
        });

        // open the frame
        fileFrame.open();
    });

    // the remove image link, removes the image id from the hidden field and replaces the image preview
    $('.meta_box_clear_file_button').click(function(e) {
        $(this).parent().siblings('.meta_box_upload_file').val('');
        $(this).parent().siblings('.meta_box_filename').text('');
        $(this).parent().siblings('.meta_box_file').removeClass('checked');
        return false;
    });

    // function to create an array of input values
    function ids(inputs) {
        var a = [];
        for (var i = 0; i < inputs.length; i++) {
            a.push(inputs[i].val);
        }
        //$("span").text(a.join(" "));
    }

    // // repeatable fields
    $('a.meta_box_repeatable_add').on('click', function(e) {

        e.preventDefault();
        // clone
		var tbody = null;
		var tfoot = $(this).closest('tfoot');
		var thead = $(this).closest('thead');
		if (tfoot.length > 0)
			tbody = tfoot.prev('tbody');
		else if (thead.length > 0)
			tbody = thead.next('tbody');
			
		if (tbody.length > 0) {
			var row = tbody.find('tr:last');
			var clone = row.clone();

			clone.find('.meta_box_preview_image').attr('src','');
			clone.find('.meta_box_upload_image').val('');
			clone.find('select.chosen').removeAttr('style', '').removeAttr('id', '').removeClass('chzn-done').data('chosen', null).next().remove();
			clone.find('input.regular-text, textarea, select').val('');
			clone.find('input[type=checkbox], input[type=radio]').attr('checked', false);
			
			tbody.append(clone);

			// increment name and id
			clone.find('input, textarea, select')
				.attr('name', function(index, name) {
					return name.replace(/(\d+)/, function(fullMatch, n) {
						return Number(n) + 1;
					});
				});
			var arr = [];
			$('input.repeatable_id:text').each(function(){ arr.push($(this).val()); }); 
			clone.find('input.repeatable_id')
				.val(Number(Math.max.apply( Math, arr )) + 1);
			if (!!$.prototype.chosen) {
				clone.find('select.chosen')
					.chosen({allow_single_deselect: true});
			}
			
			$('.meta_box_upload_image_button').on('click',function(e) {
				upload_image_button_bind(e);
			});
		
			$('.meta_box_clear_image_button').on('click',function(e) {
				remove_file_upload_box_helper(e);
			});
			
			$('a.meta_box_repeatable_remove').on('click', function(e){
				e.preventDefault();
				$(this).closest('tr').remove();
			});
		}
    });
	
    // the remove image link, removes the image id from the hidden field and replaces the image preview
    $('.meta_box_clear_image_button').on('click',function(e) {
		remove_file_upload_box_helper(e);
    });	

    $('a.meta_box_repeatable_remove').on('click', function(e){
        e.preventDefault();
        $(this).closest('tr').remove();
    });

    $('.meta_box_repeatable tbody').sortable({
        opacity: 0.6,
        revert: true,
        cursor: 'move',
        handle: '.hndle'
    });

    // // post_drop_sort    
    $('.sort_list').sortable({
        connectWith: '.sort_list',
        opacity: 0.6,
        revert: true,
        cursor: 'move',
        cancel: '.post_drop_sort_area_name',
        items: 'li:not(.post_drop_sort_area_name)',
        update: function(event, ui) {
            var result = $(this).sortable('toArray');
            var thisID = $(this).attr('id');
            $('.store-' + thisID).val(result) 
        }
    });

    $('.sort_list').disableSelection();

    // turn select boxes into something magical
    if (!!$.prototype.chosen)
        $('.chosen').chosen({ allow_single_deselect: true });
});