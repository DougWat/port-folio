// Function for changing blocks between light and dark
// This code is only used for block previews, not for the templates or final site
function turnDownTheLights(){
  var isOn = $('.dark-switch').hasClass('on');

  if(isOn){
    $('.dark-switch').removeClass('on');
    $('section.rox').addClass('dark');
  }
  else{
    $('.dark-switch').addClass('on');
    $('section.rox').removeClass('dark');
  }
}
