(function($) {

/* Display textfield if checkbox checked Testimonials form */
	Drupal.behaviors.customconditions = {
		attach: function(context, settings){
			$('#edit-field-is-client-testimonials-value').change(function(){	
			var isChecked = $(this).is(':checked');
			$('.form-item-field-company-name-0-value').toggle(isChecked);
			if ($('#edit-field-company-name-0-value').attr('required')) {
				$('#edit-field-company-name-0-value').removeAttr('required');
			}else {
				$('#edit-field-company-name-0-value').attr('required','required');
			}
		}).change();
		}
	}
}(jQuery));