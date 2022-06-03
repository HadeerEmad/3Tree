let lang;

$(window).on('load', function () {

    lang = localStorage['lang'];
    if (lang !== 'ar' && lang !== 'en') {
        lang = 'ar';
        localStorage['lang'] = 'ar';
    }

    readLangData(lang);

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


    // CHANGE LANGUAGE

    $('.change-lang').click(function(e) {
        e.preventDefault();
        if($(this).attr('id') == 'selectAR') {
            readLangData('ar');
            localStorage['lang'] = 'ar';
        }else {
            readLangData('en');
            localStorage['lang'] = 'en';
        }
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


function readLangData(newLang) {
    $.getJSON( "lang/"+ newLang +".json", function( data ) {
        $.each( data, function( key, val ) {
            $("[data-lang-text = "+ key +"]").html(val);
            $("[data-lang-form = "+ key +"]").attr('placeholder', val);
        });

        let sliderText = data.sliderText,
            servicesText = data.servicesText;

        for(let i = 0; i < sliderText.length; i++) {
            $("[data-lang-text = sliderText"+ (i+1) +"]").html(sliderText[i]);
        }
        for(let i = 0; i < servicesText.length; i++) {
            $("[data-lang-text = servicesText"+ (i+1) +"]").html(servicesText[i]);
        }
    });
    
    $('.dropdown-item').removeClass('active');
    if(newLang == 'ar') {
        $('#selectAR').addClass('active');
        $('.dropdown-toggle').html('AR');
        $('#mainCss').attr('href', 'css/bootstrap.rtl.min.css');
        $('#langCss').attr('href', 'css/style-ar.css');
    }else {
        $('#selectEN').addClass('active');
        $('.dropdown-toggle').html('EN');
        $('#mainCss').attr('href', 'css/bootstrap.min.css');
        $('#langCss').attr('href', 'css/style-en.css');
    }
}