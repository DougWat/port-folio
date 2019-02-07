// Custom JS for using owl carousel
// If you wish to change these settings we recommend you read the documentation for owl carousel first
$(document).ready(function(){

  //Default settings for the testimonials carousel
  $(".rox-carousel-testi").owlCarousel({
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:1,
        },
        1000:{
            items:1,
        }
    },
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText:['<i class="fas fa-chevron-left"/>','<i class="fas fa-chevron-right"/>'],
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    smartSpeed:1200,
    slideTransition: 'cubic-bezier(.74,.03,.33,1.05)'
  });

  //Default settings for the team members carousel
  $(".rox-carousel-team").owlCarousel({
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        1000:{
            items:3,
        }
    },
    loop:true,
    margin:10,
    dots:false,
    nav:true,
    navText:['<i class="fas fa-chevron-left"/>','<i class="fas fa-chevron-right"/>'],
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    smartSpeed:1200,
    slideTransition: 'cubic-bezier(.74,.03,.33,1.05)'
  });
  $(".owl-carousel.rox-clients").owlCarousel({
    responsiveClass:true,
    responsive:{
        0:{
            items:3,
        },
        600:{
            items:5,
        },
        1000:{
            items:6,
        }
    },
    loop:true,
    margin:60,
    dots:false,
    nav:false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    smartSpeed:1200,
    slideTransition: 'cubic-bezier(.74,.03,.33,1.05)'
  });
});
