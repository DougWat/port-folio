// Page loader code
// You probably don't need to change anything here
// If you dont want to use the page loader, simply remove the loader script tag from the page in question
// and also delete the loader section.
if(!($('.no-js').length)){
  $('body').css("overflow","hidden");
}
$(window).on( "load", function() {
  if(!($('.no-js').length)){
    $('body').addClass('loaded');
    $('body').css("overflow","auto");
  }
});
