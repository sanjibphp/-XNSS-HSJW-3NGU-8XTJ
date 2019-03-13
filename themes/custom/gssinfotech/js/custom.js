/* Main Menu */

jQuery(document).ready(function($){
	if ($(window).width() > 768) {
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
	}
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
	jQuery('.india-open').trigger('click');
	jQuery('.custombreadcrumb').appendTo('.content_top');
	
	
	jQuery('.india-open').click(function(){
		jQuery('#block-views-block-career-openings-india-block-1').show();
		jQuery('#block-views-block-career-openings-india-block-2').hide();
		jQuery('.openings-tabs div').removeClass('openactive');
		jQuery(this).addClass('openactive');
	});
	jQuery('.usa-open').click(function(){
		jQuery('#block-views-block-career-openings-india-block-2').show();
		jQuery('#block-views-block-career-openings-india-block-1').hide();
		jQuery('.openings-tabs div').removeClass('openactive');
		jQuery(this).addClass('openactive');
	});
	
	
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
			
		}
	};
	
	/* Disable link in Main menu which is have no href val */
	Drupal.behaviors.disableNoValLink = {
		attach: function(context, settings) {
			$("#mega-menu-3 .stronglink a").each(function(e) {
				var aHref = $(this).attr('href');
				if(aHref == '' || !aHref){
					$(this).css({ 'pointer-events': 'none', 'color': '#fbeefb' });
				}
			});
		}
	};
	
		/* Mobile responsive menu */
	Drupal.behaviors.mobilemenu = {
		attach: function(context, settings) {
			if ($(window).width() < 768) {
				
				$('nav#mobile-menu-wrap ul:first').attr('id','mobile-menu-main');
				$('nav#mobile-menu-wrap ul:first').removeClass('mega-menu').addClass("mobile_menu");
				$('ul#mobile-menu-main li > ul').addClass('submenu');
				var auto_inc_id = 0; //initialise value of auto incremented id to 0
				$('ul#mobile-menu-main li.nolist > ul').each(function(i, e){
					$(this).attr('id', 'group0-'+auto_inc_id); 
					auto_inc_id++; 
					var get_ulid =  $(this).attr('id'); 
					if ($(e).has('ul')) { 
						$('#mobile-menu-main li.nolist ul[id='+get_ulid+'] li.nolink > ul').addClass(get_ulid); 
					}
					
					if($(e).has('ul')) {
						$('#mobile-menu-main li.nolist ul#'+get_ulid+' li.nolink > ul.'+get_ulid).children().clone().appendTo("#mobile-menu-main li.nolist ul#"+get_ulid);
					}
					$('#mobile-menu-main li.nolist ul#'+get_ulid+' li.nolink').remove();
				});
				$('#mobile-menu-wrap').mmenu({
						"extensions": [ "position-back", "position-right", "pagedim-black", "border-full", "fx-listitems-fade" ],
						//"counters": true,
				}); 
				
			}
		}	
	};
}(jQuery));


