(function() {
         
    // store the slider in a local variable
    var $window = $(window),
    flexslider;
    
    // tiny helper function to add breakpoints
    function getGridSize() {
    return (window.innerWidth < 280) ? 1 :
    (window.innerWidth < 600) ? 2 :
    (window.innerWidth < 800) ? 2 :
    (window.innerWidth < 900) ? 2 : 5;
    }
    
    $window.load(function() {
        if ($.fn.flexslider && $('#flexCarouse2').length) {
            $('#flexCarouse2').flexslider({
                animation: "slide",
                animationLoop: false,
                itemWidth: 380,
                itemMargin: 25,
                minItems: 1,
                maxItems: 1,
                move: 1,
                pausePlay: true,
                pauseText: 'Pause',
                playText: 'Play', 
                controlNav: false,
                start: function(slider){
                  $('body').removeClass('loading');
                  if (slider.pagingCount === 1) slider.addClass('flex-centered');
                }
            });
        }
    });
    
    }());    
    
    
$(window).load(function(){
    if ($.fn.flexslider) {
        if ($('#flexSlider').length) {
            $('#flexSlider').flexslider({
                animation: "slide",
                pausePlay: true,
                controlNav: true,
                start: function(slider){ $('body').removeClass('loading'); }
            });
        }
        if ($('#flexSlider1').length) {
            $('#flexSlider1').flexslider({
                animation: "slide",
                controlNav: false,
                start: function(slider){ $('body').removeClass('loading'); }
            });
        }
        if ($('#flexSlider2').length) {
            $('#flexSlider2').flexslider({
                animation: "slide",
                controlNav: false,
                start: function(slider){ $('body').removeClass('loading'); }
            });
        }    
        if ($('#contSlider1').length) {
            $('#contSlider1').flexslider({
                animation: "swing",
                controlNav: false,
                directionNav: false,
                direction: "vertical",
                easing:'linear',
                prevText: " ",
                nextText: " ", 
                minItems: 2,
                maxItems: 2,
                move: 2,
                itemMargin: 0,
                pausePlay: true,
                pauseOnHover: true,
                slideshowSpeed:1000,
                animationSpeed:10000,      
            });
        }
        if ($('#contSlider2').length) {
            $('#contSlider2').flexslider({
                animation: "slide",
                controlNav: false,
                start: function(slider){ $('body').removeClass('loading'); }
            });   
        }
        if ($('#flexCarousel').length) {
            $('#flexCarousel').flexslider({
                animation: "slide",
                animationLoop: false,
                itemWidth: 200,
                itemMargin: 5,
                minItems: 2,
                maxItems: 6,
                slideshow: 1,
                move: 1,
                pausePlay: true,
                pauseText: 'Pause',
                playText: 'Play', 
                controlNav: false,
                start: function(slider){
                    $('body').removeClass('loading');
                    if (slider.pagingCount === 1) slider.addClass('flex-centered');
                }
            });
        }
        if ($('#flexCarousel1').length) {
            $('#flexCarousel1').flexslider({
                animation: "slide",
                animationLoop: false,
                itemWidth: 168,
                itemMargin: 20,
                minItems:1,
                maxItems: 4,
                slideshow: 1,
                move: 1,
                controlNav: false,
                start: function(slider){
                    $('body').removeClass('loading');
                }
            });
        }
        if ($('#breaking_news').length) {
            $('#breaking_news').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: true,
                directionNav: false,
                direction: "horizontal",
                slideshowSpeed: 7000,
                animationSpeed: 600,
                initDelay: 1000,
                pausePlay: true,
                pauseText: '',
                playText: '',
                pauseOnHover: false
            });
        }
        if ($('#galleryCarousel').length) {
            $('#galleryCarousel').flexslider({
                animation: "fade",
                controlNav: "thumbnails",
                start: function(slider){
                    $('body').removeClass('loading');
                }
            });
        }
    }
});

$(document).ready(function(){
    if ($.fn.ma5gallery && $('figure img').length) {
        $('figure img').ma5gallery({
            preload:true
        });
    }
    
    if ($.fn.easyResponsiveTabs) {
        if ($('#socialTab').length) {
            $('#socialTab').easyResponsiveTabs({
                type: 'default',
                width: 'auto',
                fit: true,
                tabidentify: 'socialTab_1',
                activate: function(event) {
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        }
        if ($('#feedTab').length) {
            $('#feedTab').easyResponsiveTabs({
                type: 'default',
                width: 'auto',
                fit: true,
                tabidentify: 'feedTab_1',
                activate: function(event) {
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        }
    }
    
    $('.resp-tabs-list li a').click(function(event){
        event.preventDefault();								 
    });

});
    
    var a = 0;
    $(window).scroll(function() {
      if ($('#counter').length === 0) return;
      var oTop = $('#counter').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
        a = 1;
      }
    
    });

$(document).ready(function(){
    if ($.fn.ma5gallery && $('figure img').length) {
        $('figure img').ma5gallery({
            preload:true
        });
    }
});
    
$(document).ready(function() {
    if ($.fn.easyResponsiveTabs) {
        if ($('#parentHorizontalTab').length) {
            $('#parentHorizontalTab').easyResponsiveTabs({
                type: 'default',
                width: 'auto',
                fit: true,
                tabidentify: 'hor_1',
                activate: function(event) {
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        }

        if ($('#ChildVerticalTab_1').length) {
            $('#ChildVerticalTab_1').easyResponsiveTabs({
                type: 'vertical',
                width: 'auto',
                fit: true,
                tabidentify: 'ver_1',
                activetab_bg: '#fff',
                inactive_bg: '#fff',
                active_border_color: '#c1c1c1',
                active_content_border_color: '#5AB1D0'
            });
        }
    }


        var videoPlayButton,
        videoWrapper = document.getElementsByClassName('video-wrapper')[0],
        video = document.getElementsByTagName('video')[0],
        videoMethods = {
            renderVideoPlayButton: function() {
                    if (videoWrapper && video && videoWrapper.contains(video)) {
                    this.formatVideoPlayButton()
                    video.classList.add('has-media-controls-hidden')
                    videoPlayButton = document.getElementsByClassName('video-overlay-play-button')[0]
                    if (videoPlayButton) {
                        videoPlayButton.addEventListener('click', this.hideVideoPlayButton)
                    }
                    }
            },
            formatVideoPlayButton: function() {
                    if (videoWrapper) {
                    videoWrapper.insertAdjacentHTML('beforeend', '\
                    <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
                        <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                        <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                    </svg>\
                    ')
                    }
            },
            hideVideoPlayButton: function() {
                    if (video && videoPlayButton) {
                    video.play()
                    videoPlayButton.classList.add('is-hidden')
                    video.classList.remove('has-media-controls-hidden')
                    video.setAttribute('controls', 'controls')
                    }
            }
        }
        videoMethods.renderVideoPlayButton()
});

// ====Tab scrolling text====
function changeClass(){    
    var x = document.getElementsByClassName("text-slide"); 
    var y = document.getElementsByClassName("scroll-text");                           
    x[0].classList.toggle ("pause");
    y[0].classList.toggle("scroll-left");                            
}
function changeClass01(){    
    var x = document.getElementsByClassName("text-slide01"); 
    var z = document.getElementsByClassName("scroll-text01");                              
    x[0].classList.toggle ("pause");
    z[0].classList.toggle("scroll-left");                             
}
function changeClass1(){    
    var x = document.getElementsByClassName("text-slide1"); 
    var z = document.getElementsByClassName("scroll-text-1");                              
    x[0].classList.toggle ("pause");
    z[0].classList.toggle("scroll-left");                             
}

// ===== Scroll to Top ==== 
$(document).ready(function(){ 
    $(document).scroll(function() { 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 800); 
        return false; 
    }); 
 });
