$(window).on('load', function () {

    // PAGE LOADER

    $('.pre-load').stop().animate({opacity:0}, 500, function(){
        $('.pre-load').css({'display':'none'});
        $('body').css({'overflow-y':'auto'});
        animateBox();
    });

});


$(function() {

    // WINDOW HEIGHT

    windowHeight();
    $(window).resize(function (){
        windowHeight();
    });
    $(window).scroll(function (){
        animateBox();
    });


    // MENU COLLAPSE

    $('.mirror').click(function () {
        $(this).parent().find('.navbar-collapse').removeClass('show');
    });
    $('.nav-item:not(.dropdown) .nav-link').click(function () {
        $('.navbar-collapse').removeClass('show');
    });


    // SMOOTH SCROLL

    $('.smooth-a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - 96
        }, 600);
        return false;
    });


    // PARALLAX IMAGE
    var images = document.querySelectorAll('.parallax-img');
    new simpleParallax(images);


    // OWL

    if($('.owl-carousel').length) {
        $('.owl-carousel').owlCarousel({
            items:              1,
            loop:               true,
            margin:             10,
            nav:                true,
            dots:               false,
            autoplay:           true,
            autoplayTimeout:    4000,
            autoplayHoverPause: true,
            animateOut:         'fadeOut',
            animateIn:          'fadeIn',
        })
    }


    // VIDEO POPUP

    


});


function animateBox() {
    let scrollVar = $(this).scrollTop();

    $('.animate-box').each(function (){
        let boxVal = $(this).offset().top - $(window).height() + 80;

        if (scrollVar > boxVal){
            if($(this).hasClass('left-in')) {
                $(this).addClass('animated fadeInLeft');
            }else if($(this).hasClass('right-in')) {
                $(this).addClass('animated fadeInRight');
            }else {
                $(this).addClass('animated fadeInUp');
            }
        }
    });
}

function windowHeight() {
    $('.win-height').css({'height': ($(window).height() - 96)});
}