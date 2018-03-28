function msToHMS( ms ) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  seconds=Math.round(seconds);
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;

  var build = msToHMS_buildhelper(hours) + msToHMS_buildhelper(minutes) + msToHMS_buildhelper(seconds,true);

  return build;
}

function msToHMS_buildhelper(val, last){
  var build = "";

  if(val < 10){
    build = "0" + val;
  }else{
    build = val;
  }

  if(!last){
    return build + ":";
  }
  return build;
}
