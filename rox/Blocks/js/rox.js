$(function(){
  // Blog favorite button code
  $("[class*='rox-blog-card'] .favorite").on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    $(e.target).closest("[class*='rox-blog-card']").addClass('favorited');
  });
  $(".rox-blog-card .favorited").on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    $(e.target).closest("[class*='rox-blog-card']").removeClass('favorited');
  });

  // Counter Code
  $('.counter').counterUp({time: 1000});
});
