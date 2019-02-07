// Navbar code
// Enables and disables the mobile version of the navbar, as well as the scroll transition
$(function(){
  // Gets the sticky data variable from the navbar section.
  var sticky = $("[class*='rox-navbar']").data("sticky");

  //If the sticky data variable doesn't exist, sticky is assumed to be false
  if(typeof sticky == "undefined" || sticky == false){
    sticky = false;
  }else{
    //If the variable does exist, the class of sticky is also added to the navbar
    $("[class*='rox-navbar']").addClass("sticky");
  }

  //Runs these two functions to determine the location of the page the user is on.
  //Sets navbar variables accordingly.
  Header_CheckWindowSize();
  Header_CheckScrollLocation();

  //Listener for clicking the mobile hamburger
  $("a.mobile").on("click", function(e){
    // Toggles the mobile dropdown
    $(this).siblings("ul").stop().slideToggle(500);
  });

  // Page resize listener
  $(window).resize(function(){
    Header_CheckWindowSize();
    Header_CheckScrollLocation();
  });

  // Page scroll listener
  $(window).scroll(function(e){
    Header_CheckScrollLocation();
  });

  //Checks if the user has scrolled away from the top of the page
  //Adds or removes the scrolling class accordingly.
  function Header_CheckScrollLocation(){
    if(sticky){
      var val = $(document).scrollTop().valueOf();
      if(val > 100){
        $("[class*='rox-navbar']").addClass("scrolling");
      }else{
        $("[class*='rox-navbar']").removeClass("scrolling");
      }
    }
  }

  //Checks if the window has been resized
  //Adds or removes the mobile class accordingly.
  function Header_CheckWindowSize(){
    if($(window).width() <= 1000){
      $("[class*='rox-navbar']").addClass("mobile");
      $("[class*='rox-navbar']").find("nav >ul").css("display","none");
    }else{
      $("[class*='rox-navbar']").removeClass("mobile");
      $("[class*='rox-navbar']").find("nav >ul").css("display","block");
    }
  }
});
