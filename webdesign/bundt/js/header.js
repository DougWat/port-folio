$(function(){
  var sticky = $(".header").data("sticky");

  if(typeof sticky == "undefined" || sticky == false){
    sticky = false;
  }else{
    $(".header").addClass("sticky");
  }

  Header_CheckWindowSize();
  Header_CheckScrollLocation();
  $("div a.mobile").on("click", function(e){
    $(this).siblings("ul").stop().slideToggle(500);
  });
  $("ul a.mobile").on("click", function(e){
    $(this).closest("ul").stop().slideToggle(500);
  });

  $(window).resize(function(){
    Header_CheckWindowSize();
    Header_CheckScrollLocation();
  });

  $(window).scroll(function(e){
    Header_CheckScrollLocation();
  });

  function Header_CheckScrollLocation(){
    if(sticky){
      var val = $(document).scrollTop().valueOf();
      if(val > 40){
        $(".header").addClass("scrolling");
      }else{
        $(".header").removeClass("scrolling");
      }
    }
  }

  function Header_CheckWindowSize(){
    console.log($(window).width());
    if($(window).width() <= 900){
      $(".header").addClass("mobile");
      console.log($(".header").children("ul"));
      $(".header").children("div").children("ul").css("display","none");
    }else{
      $(".header").removeClass("mobile");
      $(".header").children("div").children("ul").css("display","block");
    }
  }
});
