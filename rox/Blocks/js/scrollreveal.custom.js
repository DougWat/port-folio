//Custom code for better scroll reveal integration
// You probably wont need to edit this code.
window.sr = ScrollReveal();

var srObj = {};


$(".sr").each(function(){
  var data = $(this).data()
  var set = data.srSet ? data.srSet : null;
  var setDelay = set ? 100 : 0;

  var origin = data.srOrigin ? data.srOrigin : 'bottom';
  var distance = data.srDistance ? data.srDistance : "20px";
  var duration = data.srDuration ? data.srDuration : 500;
  var opacity = data.srOpacity ? data.srOpacity : 0;
  var rotate = data.srRotate ? data.srRotate : {x:0,y:0,z:0};
  var scale = typeof data.srScale !== 'undefined'? data.srScale : .9;

  var name ="sr";

  if(set){
    name=name+"-set-"+set;
    $(this).addClass(name);
    $(this).removeClass('sr');
  }else{
    name=name+"-"+origin+"-"+distance+"-"+duration+"-"+opacity+"-"+rotate.x+rotate.y+rotate.z+"-"+scale;
    name=name.replace(/\./g, '');
    $(this).addClass(name);
    $(this).removeClass('sr');
  }

  var obj={
    origin: origin,
    distance: distance,
    duration: duration,
    opacity: opacity,
    rotate: rotate,
    scale: scale
  }

  srObj[name] = {obj:obj, delay:setDelay}

});

Object.keys(srObj).forEach(function(key, index){
  sr.reveal("."+key,srObj[key].obj,srObj[key].delay);
});
