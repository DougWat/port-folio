"use strict";

function validateGroup(){
  var groupInput = document.getElementById("groupInput");
  groupCode = groupInput.value;
  if(groupInput.value.trim() === ""){
    alert("Looks like you didn't enter anything hombre")
    return;
  }

  firebase.database().ref("Groups_Sterile").child(groupInput.value.trim()).once("value", function(snapshot){
    if(snapshot.exists()){
      loadNextPage("dmorplayer.html")
    }else{
      alert("Hey looks like thats the wrong group");
      groupCode = "";
    }
  });
};

function loadNextPage(pagename){
  $.ajax({
    url:pagename,
    success: function(result){
      $("#main").html(result);
    }
  });
};
