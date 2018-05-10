$(document).ready(function() {
    console.log('ok');
    $('.overlay-newsletter, .newsletter a').click(function(event) {
        event.preventDefault();
        $('.newsletter, .overlay-newsletter').hide();
    });
    var popup = setInterval(function() {
        $('.overlay-newsletter, .newsletter').addClass('show-popup');
        clearInterval(popup);
    }, 2500);

    $('.mega-mobile .mega-menu-item > ul').slideUp();
    $('.mega-mobile .mega-menu-item > h4').click(function() {

        $(this).next().slideToggle();
    });

    $(".dropdown-menu").click(function(event) {
        event.stopPropagation();
    });

    // setting owl-carousel library

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText: ['<img src="images/arrow-left.png" alt="" />', '<img src="images/arrow-right.png" alt="" />'],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 4
            },
            1200: {
                items: 6
            }
        }
    });

    // Gets the video src from the data-src on each button

    var $videoSrc;
    $('.video-btn').click(function() {
        $videoSrc = $(this).data("src");
    });

    // when the modal is opened autoplay it  
    $('#myModal').on('shown.bs.modal', function(e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src', $videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1");
    });

    // stop playing the youtube video when I close the modal
    $('#myModal').on('hide.bs.modal', function(e) {
        // a poor man's stop video
        $("#video").attr('src', $videoSrc);
    });

    // wow library init
    new WOW().init();
});