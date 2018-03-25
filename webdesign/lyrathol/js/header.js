$(function(){
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
    var val = $(document).scrollTop().valueOf();
    if(val > 40){
      $(".header").removeClass("dark");
    }else{
      if(!$(".header").hasClass("mobile")){
        $(".header").addClass("dark");
      }
    }
  }

  function Header_CheckWindowSize(){
    console.log($(window).width());
    if($(window).width() <= 900){
      $(".header").addClass("mobile");
      $(".header").removeClass("dark");
      console.log($(".header").children("ul"));
      $(".header").children("div").children("ul").css("display","none");
    }else{
      $(".header").removeClass("mobile");
      $(".header").addClass("dark");
      $(".header").children("div").children("ul").css("display","block");
    }
  }
});
