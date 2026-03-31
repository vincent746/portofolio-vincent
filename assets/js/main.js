document.addEventListener('keydown', function(event) {
    if (event.key === 'PrintScreen' || (event.ctrlKey && event.key === 's')) {
        event.preventDefault();
        alert('Screenshot tidak diizinkan!');
    }
});

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Custom scrollspy — replaces Bootstrap's broken data-bs-spy on this layout
    var nav_sections = ['#home', '#about', '#skill', '#portofolio', '#contact'];
    var nav_offset = 60;

    $(window).scroll(function () {
        var $win        = $(this);
        var scroll_top  = $win.scrollTop() + nav_offset;
        var win_bottom  = $win.scrollTop() + $win.height();
        var active_section = nav_sections[0];

        for (var i = nav_sections.length - 1; i >= 0; i--) {
            var $section    = $(nav_sections[i]);
            if (!$section.length) continue;

            var section_top = $section.offset().top;
            // Last section (#contact): activate the moment its top enters the viewport
            var threshold   = (i === nav_sections.length - 1) ? win_bottom : scroll_top;

            if (section_top <= threshold) {
                active_section = nav_sections[i];
                break;
            }
        }

        $('.navbar-nav .nav-link').removeClass('active');
        $('.navbar-nav .nav-link[href="' + active_section + '"]').addClass('active');
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 200, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 200, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    
})(jQuery);

