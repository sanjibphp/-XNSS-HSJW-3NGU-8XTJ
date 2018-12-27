(function ($) {
    if (!document.defaultView || !document.defaultView.getComputedStyle) { // IE6-IE8
        var oldCurCSS = $.curCSS;
        $.curCSS = function (elem, name, force) {
            if (name === 'background-position') {
                name = 'backgroundPosition';
            }
            if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) {
                return oldCurCSS.apply(this, arguments);
            }
            var style = elem.style;
            if (!force && style && style[name]) {
                return style[name];
            }
            return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force);
        };
    }

    var oldAnim = $.fn.animate;
    $.fn.animate = function (prop) {
        if ('background-position' in prop) {
            prop.backgroundPosition = prop['background-position'];
            delete prop['background-position'];
        }
        if ('backgroundPosition' in prop) {
            prop.backgroundPosition = '(' + prop.backgroundPosition;
        }
        return oldAnim.apply(this, arguments);
    };

    function toArray(strg) {
        strg = strg.replace(/left|top/g, '0px');
        strg = strg.replace(/right|bottom/g, '100%');
        strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
        var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[3]];
    }

    $.fx.step.backgroundPosition = function (fx) {
        if (!fx.bgPosReady) {
            var start = $.curCSS(fx.elem, 'backgroundPosition');
            if (!start) {//FF2 no inline-style fallback
                start = '0px 0px';
            }

            start = toArray(start);
            fx.start = [start[0], start[2]];
            var end = toArray(fx.end);
            fx.end = [end[0], end[2]];

            fx.unit = [end[1], end[3]];
            fx.bgPosReady = true;
        }
        //return;
        var nowPosX = [];
        nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
        nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
        fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];

    };
})(jQuery);

//settings
var timeout =6; //timeout between animating  slides (in seconds)
var timebetweenslides = 1000; //timeout between removing a slide and showing next one (in miliseconds)
var isAnimating = false;
var thisSlide = '';
var currentSlide = 1;
var currentBGpos = 50;
var lteie8 = false;
/*if ($.browser.msie) {
    var vers = Number(parseInt($.browser.version, 10));
    if (vers < 9) var lteie8 = true;
}*/

function nextSlide() {
        if (isAnimating == false) {
            if (currentSlide == 3) {
                currentSlide = 1;
                removeSlide(3);
            } else {
                removeSlide(currentSlide);
                currentSlide++;
            }
            isAnimating = true;
        } 
}
function prevSlide() {
        if (isAnimating == false) {
            if (currentSlide == 1) {
                currentSlide = 3;
                removeSlideBackwards(1);
            } else {
                removeSlideBackwards(currentSlide);
                currentSlide--;
            }
            isAnimating = true;
        }
}
function setSelectedCandy(index) {
    $j("#slider-nav li a").removeClass("selected");
    $j("#slider-nav li:nth-child(" + index + ") a").addClass("selected");
    currentSlide = index;
    isAnimating = false;
}
function showSlide(index) {		
	var num = (index - currentSlide >= 1) ? (index - currentSlide) : (currentSlide - index);	
    if ( isAnimating == false && index != currentSlide ) {
		isAnimating = true;		
	    (index > currentSlide) ? removeSlide(currentSlide, num - 1) : removeSlideBackwards(currentSlide, num - 1);
    }
}

function insertSlide(index) {
	setSlide(index);
	
    $("#slider section." + thisSlide).fadeIn(200);
    var kimg = $("#slider section." + thisSlide + " img");
    var kh2 = $("#slider section." + thisSlide + " h2");
    var ktag = $("#slider section." + thisSlide + " .tag");
	var kcopy = $("#slider section." + thisSlide + " .copy");	
    var kbutton1 = $("#slider section." + thisSlide + " .button1");

    kh2.animate({ left: '55%', opacity: 1, marginLeft: '-480px' }, 1000, 'easeInOutExpo');
    ktag.delay(200).animate({ left: '55%', opacity: 1, marginLeft: '-480px' }, 600, 'easeInOutExpo');
	kcopy.delay(200).animate({ left: '55%', opacity: 1, marginLeft: '-480px' }, 800, 'easeInOutExpo');	

    kbutton1.delay(1400).fadeIn(1200);
    if (!lteie8) {
        kimg.delay(200).animate({ left: '49%', opacity: 1, marginLeft: '0' }, 900, 'easeInOutExpo', function () {setSelectedCandy(index)} );
    } else {
        kimg.css("display","block").delay(200).animate({ left: '49%', marginLeft: '0' }, 900, 'easeInOutExpo', function () {setSelectedCandy(index)}  );
    }
}
function removeSlide(index, num) {
	num = ( typeof num != 'undefined') ? num : 0;
	setSlide(index);
	
    var kimg = $("#slider section." + thisSlide + " img");
    var kh2 = $("#slider section." + thisSlide + " h2");
    var ktag = $("#slider section." + thisSlide + " .tag");
	var kcopy = $("#slider section." + thisSlide + " .copy");	
    var kbutton1 = $("#slider section." + thisSlide + " .button1");
    //var ksection = $("#slider section");
    var ksection = $("#slider, #slider .inner");
    if (timeout) clearTimeout(timeout);
    var timeout = setTimeout("resetSlide(" + Number(index + 1 + num) + ")", timebetweenslides);
    kh2.stop(true, true).animate({ left: '-1%', opacity: 0 }, 1200, 'easeInOutBack');
    ktag.stop(true, true).delay(300).animate({ left: '-1%', opacity: 0 }, 1000, 'easeInOutBack');
	kcopy.stop(true, true).delay(300).animate({ left: '-1%', opacity: 0 }, 1200, 'easeInOutBack');	
    kbutton1.stop(true, true).fadeOut();
    if (!lteie8) {
        kimg.stop(true, true).delay(400).animate({ left: '-1%', opacity: 0 }, 1200, 'easeInOutExpo');
    } else {
    kimg.stop(true, true).delay(400).animate({ left: '-100%' }, 1200, 'easeInOutExpo', function () { kimg.hide(); });
    }
    ksection.stop(true, true).delay(700).css("backgroundPosition", currentBGpos + "% 0").animate({ backgroundPosition: currentBGpos - 25 + '% 0' }, 900, 'swing');
    currentBGpos -= 25;
}
function removeSlideBackwards(index, num) {
	num = ( typeof num != 'undefined') ? num : 0;
	setSlide(index);
	
    var kimg = $("#slider section." + thisSlide + " img");
    var kh2 = $("#slider section." + thisSlide + " h2");
    var ktag = $("#slider section." + thisSlide + " .tag");	
	var kcopy = $("#slider section." + thisSlide + " .copy");	
    var kbutton1 = $("#slider section." + thisSlide + " .button1");
    //var ksection = $("#slider section");
    var ksection = $("#slider, #slider .inner");

    if (timeout) clearTimeout(timeout);
    var timeout = setTimeout("resetSlideBackwards(" + Number(index - 1 - num) + ")", timebetweenslides);

    kh2.stop(true, true).delay(400).animate({ left: '101%', opacity: 0 }, 800, 'easeInOutExpo');
    ktag.stop(true, true).delay(200).animate({ left: '101%', opacity: 0 }, 700, 'easeInOutExpo');	
	kcopy.stop(true, true).delay(200).animate({ left: '101%', opacity: 0 }, 600, 'easeInOutExpo');	
    kbutton1.stop(true, true).fadeOut();
    if (!lteie8) {
        kimg.stop(true, true).animate({ left: '101%', opacity: 0 }, 1200, 'easeInOutBack');
    } else {
        kimg.stop(true, true).animate({ left: '101%' }, 1200, 'easeInOutBack', function () { kimg.hide(); });
    }
    ksection.stop(true, true).delay(700).css("backgroundPosition", currentBGpos + "% 0").animate({ backgroundPosition: currentBGpos + 25 + '% 0' }, 900, 'swing');
    currentBGpos += 25;
}
function resetSlide(index) {
    if (index > 7) index = 1;
	setSlide(index);
    //$("#slider section").css("z-index", '1').hide();
    //$("#slider section." + thisSlide).css("z-index", '2').show();

    var kimg = $("#slider section." + thisSlide + " img");
    var kh2 = $("#slider section." + thisSlide + " h2");
    var ktag = $("#slider section." + thisSlide + " .tag");	
	var kcopy = $("#slider section." + thisSlide + " .copy");	
    var kbutton1 = $("#slider section." + thisSlide + " .button1");


    kh2.css({ "left": '100%', "margin-left": '0' });
    ktag.css({ "left": '100%', "margin-left": '0' });	
	kcopy.css({ "left": '100%', "margin-left": '0' });	
    kbutton1.css({ "display": 'none' });
    kimg.css({ "left": '100%', "margin-left": '0' });

    insertSlide(index);
}
function resetSlideBackwards(index) {
    if (index < 1) index = 7;
    setSlide(index);

    //$("#slider section").css("z-index", '1').hide();
    //$("#slider section." + thisSlide).css("z-index", '2').show();

    var kimg = $("#slider section." + thisSlide + " img");
    var kh2 = $("#slider section." + thisSlide + " h2");
    var ktag = $("#slider section." + thisSlide + " .tag");	
	var kcopy = $("#slider section." + thisSlide + " .copy");	
    var kbutton1 = $("#slider section." + thisSlide + " .button1");

    kh2.css({ "left": '-1%', "margin-left": -kh2.width() });
    ktag.css({ "left": '-1%', "margin-left": -ktag.width() });
	kcopy.css({ "left": '-1%', "margin-left": -kcopy.width() });	
    kbutton1.css({ "display": 'none' });
    kimg.css({ "left": '-80%', "margin-left": -kimg.width() });

    insertSlide(index);
}

function setSlide(index) {
    if (index == 1) { thisSlide = "one" }
    if (index == 2) { thisSlide = "two" }
    if (index == 3) { thisSlide = "three" }
	if (index == 4) { thisSlide = "four" }
	if (index == 5) { thisSlide = "five" }
	if (index == 6) { thisSlide = "six" }
	if (index == 7) { thisSlide = "seven" }
}

jQuery(document).ready(function ($) {

    //animate slider
    var autoAnimation = window.setInterval("nextSlide()", timeout * 2000);
    $(".header-content").hover(function () {
        window.clearInterval(autoAnimation);

        if (!lteie8) {
            $(".header-content .slider-prev").fadeIn();
            $(".header-content .slider-next").fadeIn();
        } else {
            $(".header-content .slider-prev").show();
            $(".header-content .slider-next").show();
        }
    }, function () {
        autoAnimation = window.setInterval("nextSlide()", timeout * 2000);
        if (!lteie8) {
            $(".header-content .slider-prev").stop(true, true).fadeOut();
            $(".header-content .slider-next").stop(true, true).fadeOut();
        } else {
            $(".header-content .slider-prev").hide();
            $(".header-content .slider-next").hide();
        }
    });

})