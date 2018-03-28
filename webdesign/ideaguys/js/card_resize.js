$(function(){
  var episodeCards = $(".episode-card");
  var episodeContainer = $(".episodes");

  $(episodeCards).each(function(){

  });

  if($(episodeContainer).hasClass("list")){
    convertToList();
  }

  $(".make-grid").on("click", function(){
    $(this).addClass("current");
    $(".make-list").removeClass("current");
    convertToGrid();
  });

  $(".make-list").on("click", function(){
    $(this).addClass("current");
    $(".make-grid").removeClass("current");
    convertToList();
  });

  function convertToList(){
    $(episodeCards).each(function(){
      var parent = $(this).parent();
      parent.className = "";
      $(parent).addClass("col-12");
      $(parent).removeClass("col-lg-4 col-md-6");
      $(episodeContainer).removeClass("grid");
      $(episodeContainer).addClass("list");
    });
  }
  function convertToGrid(){
    $(episodeCards).each(function(){
      var parent = $(this).parent();
      $(parent).addClass("col-lg-4 col-md-6");
      $(parent).removeClass("col-12");
      $(episodeContainer).removeClass("list");
      $(episodeContainer).addClass("grid");
    });
  }
});
