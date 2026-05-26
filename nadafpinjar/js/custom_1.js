// Toggle-profile
jQuery(document).ready(function () {
    jQuery(".profile").click(function () {
        jQuery(".profile-dropdown").toggle();
    });
});
// Prevent right click
jQuery(document).ready(function () {
	document.addEventListener('contextmenu', function(e) {
	  if (e.target.closest('.classes__item__pic, .detail-img')) {
		e.preventDefault();
	  }
	}, { passive: false });
});
jQuery(document).ready(function($) {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: true,
	navText: [
		  "<i class='fas fa-angle-left'></i>",
		  "<i class='fas fa-angle-right'></i>"
		  ],
    autoplay: false,
    dots: false,
    loop: true,
	//autoHeight:true,
	animateOut: 'fadeOut',
    responsiveRefreshRate : 200,
    }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: false,
    nav: false,
	navText: [
		  "<i class='fas fa-angle-left'></i>",
		  "<i class='fas fa-angle-right'></i>"
		  ],
    smartSpeed: 200,
    slideSpeed : 500,
	margin : 16,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    //end block
    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
  
  $('#sync1 .owl-prev').attr('role','button').attr('title','Previous');
  $('#sync1 .owl-next').attr('role','button').attr('title','Next');

  $('#sync1 .owl-item').attr('aria-selected','false');
  $('#sync1 .owl-item.active').attr('aria-selected','true');
});

/*  ---------------------------------------------------
    Template Name: Zogin
    Description:  Phozogy Yoga HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });
	$('.hero__slider .owl-prev').attr('role','button').attr('title','Previous');
	$('.hero__slider .owl-next').attr('role','button').attr('title','Next');

	$('.hero__slider .owl-item').attr('aria-selected','false');
	$('.hero__slider .owl-item.active').attr('aria-selected','true');
    /*--------------------------
    Testimonial Slider
    ----------------------------*/
    var testimonialSlider = $(".testimonial__slider");
    testimonialSlider.owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*-----------------------------
        Team Slider
    -------------------------------*/
    $(".team__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 2,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    /*--------------------------
        Select
    ----------------------------*/
    //$(".class-select").niceSelect();
    //$("select").niceSelect();

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*------------------
		Pricing
    --------------------*/
    $(".pricing__item").mouseover(function () {
        $(".pricing__item").removeClass('active');
        $(this).addClass('active');
    });

    /*------------------
		Barfiller
	--------------------*/
    $('#bar1').barfiller({
        barColor: "#5768AD",
    });

    $('#bar2').barfiller({
        barColor: "#5768AD",
    });

    $('#bar3').barfiller({
        barColor: "#5768AD",
    });

    $('#bar4').barfiller({
        barColor: "#5768AD",
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.choose-counter').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
	
AOS.init();

$(document).ready(function(){
	$(".b-mobile-click").click(function(){
		if($(this).hasClass("b-show")) {
			$(this).addClass("b-hide");
			$(this).removeClass("b-show");
		}
		else if($(".b-mobile-click").hasClass("b-hide")) {
			$(this).addClass("b-show");
			$(this).removeClass("b-hide");
		}
		else {
			$(this).addClass("b-show");
			$(this).removeClass("b-hide");
		}
	});

	$(".b-mobile-click2").click(function(){
		if($(this).hasClass("b-show2")) {
			$(this).addClass("b-hide2");
			$(this).removeClass("b-show2");
		}
		else if($(".b-mobile-click2").hasClass("b-hide2")) {
			$(this).addClass("b-show2");
			$(this).removeClass("b-hide2");
		}
		else {
			$(this).addClass("b-show2");
			$(this).removeClass("b-hide2");
		}
	});
	$('iframe.wonderplugin-pdf-iframe').attr('title','How to use Templates?');
	$('.asp-try.asp_compact > a').attr('title','ASP Try');
});
})(jQuery);