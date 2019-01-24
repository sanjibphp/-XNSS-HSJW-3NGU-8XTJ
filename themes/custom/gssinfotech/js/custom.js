/* Main Menu */

jQuery(document).ready(function($){
	jQuery('#mega-menu-1').dcMegaMenu({
		rowItems: '6',
		speed: 'fast',
		effect: 'fade',
		/*event: 'click',*/
		fullWidth: true
	});
	jQuery('#mega-menu-3').dcMegaMenu({
		rowItems: '2',
		speed: 'fast',
		effect: 'fade'
	});
	jQuery('#slider-owl').owlCarousel({
    	margin: 10,
        nav: true,
        loop: true,
        items: 1 ,
		autoHeight:true,
		navText : ['<span class="arrow left"><div class="arrow-text">&nbsp;Pre</div></span>','<span class="arrow right"><div class="arrow-text">&nbsp;Next</div></span>'],
		responsiveClass:true,
    	responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:true
        },
        1000:{
            items:1,
            nav:true,
        }
    }
    });
		jQuery('#belowslider-owl').owlCarousel({
    	margin: 10,
        nav: true,
        loop: false,
        items: 1 ,
		autoHeight:true,
		navText : ['<span class="arrow left"><div class="arrow-text">&nbsp;Pre</div></span>','<span class="arrow right"><div class="arrow-text">&nbsp;Next</div></span>'],
		responsiveClass:true,
		navClass: [
            "owl-prev hidden",
            "owl-next"
        ],
		navText : ['<span class="arrow left"><div class="arrow-text"><</div></span>','<span class="arrow right"><div class="arrow-text">></div></span>'],
    	responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:1,
            nav:true
        },
        1000:{
            items:3,
            nav:true,
        }
    }
    });
	jQuery("#belowslider-owl").on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
        if (!event.namespace) return;
        var carousel = event.relatedTarget,
             element = event.target,
             current = carousel.current();
        $('.owl-next', element).toggleClass('hidden', current === carousel.maximum());
        $('.owl-prev', element).toggleClass('hidden', current === carousel.minimum());
    });
	jQuery('.sidemenufirst').appendTo('.region-left-sidebar');
});

(function ($) {
	Drupal.behaviors.methodologyOwlcarousel = {
		attach: function(context, settings) {
			$('#methodology-owl').owlCarousel({
				nav: true,
				loop: true,
				items: 1 ,
				navText : ['<span class="arrow left"><div class="arrow-text"><</div></span>','<span class="arrow right"><div class="arrow-text">></div></span>'],
				responsiveClass:true,
				responsive:{
				0:{
					items:1,
					nav:true
				},
				600:{
					items:1,
					nav:true
				},
				1000:{
					items:1,
					nav:true,
				}
			}
			});
			/*var myval = $("#owl-methodology .owl-item .item").attr('class').split(' ')[1];
			var id = myval.substr( myval.indexOf ( '-' ) + 1 );
			console.log(id);
			$("#owl-methodology .owl-item .views-field-field-color-code .field-content").css('visibility', 'hidden');
			$('#owl-methodology .owl-item.active .views-field-field-color-code .field-content').each(function() {
				var colorcode = $.trim($(this).text());
				$("#owl-methodology .owl-item.active").css("background-color", colorcode);
			});	 */
			//var colorcode = $.trim($('#owl-methodology .owl-item.active .views-field-field-color-code .field-content').text());
			//$("#owl-methodology .owl-item.active").css("background-color", colorcode);
		}
	};
}(jQuery));