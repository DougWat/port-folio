$(function(){
    BindWidget(document.querySelector(".soundcloud-iframe"));

    function BindWidget(el){
      SC_Widget = SC.Widget(el);
      bind();
      console.log(SC_Widget);
    }

    var EpisodeCards = $(".episode-card");
    var activeEpisode;

    EpisodeCards.each(function(){
      $(this).find(".play-button").each(function(){
        $(this).on('click', function(){
          TogglePlayState(GetParentEpisodeCard(this));
        });
      });
      var seekbars = $(this).find(".seekbar progress");
      $(seekbars).on("click", function(e){
          var x = (e.pageX - this.offsetLeft) - (e.pageX - e.offsetX); // or e.offsetX (less support, though)
          console.log(this.offsetLeft);
          clickedValue = x * this.max / this.offsetWidth;
          SC_Widget.getDuration(function(length) {
            var final = (clickedValue / 1000) * length;
            SC_Widget.seekTo(final);
          });
      });
    });

    function GetParentEpisodeCard(el){
      return $(el).closest(".episode-card");
    }

    function TogglePlayState(el){
      if(!$(el).hasClass("playing") && !$(el).hasClass("paused")){
        SC_Widget.pause();
        SC_Widget.seekTo(0);
        $(el).toggleClass("playing");
        var link = $(el).data('sc-link');
        activeEpisode = el;
        $(el).find(".seekbar progress").val(0);
        LoadEpisode(link);
        $(el).closest(".episode-wrapper").siblings(".episode-wrapper").each(function(){
          TurnOff($(this).find(".episode-card"));
        })
      }else{
        $(el).toggleClass("playing");
        $(el).toggleClass("paused");
        SC_Widget.toggle();
      }
    }

    function TurnOff(el){
      $(el).removeClass("playing");
      $(el).removeClass("paused");
    }

    function LoadEpisode(link){
      SC_Widget.load(link);
      playBind(link);
    }
    function PlayEpisode(link){
      SC_Widget.play();
    }

    function playBind(link) {
      SC_Widget.bind(SC.Widget.Events.READY, function() {
        PlayEpisode(link);
        SC_Widget.getDuration(function(dur){
          activeEpisode.find(".time-total").text(msToHMS(dur));
        });
      });
    }

    function bind() {
      SC_Widget.bind(SC.Widget.Events.PLAY_PROGRESS, function() {
        SC_Widget.getDuration(function(length) {
          SC_Widget.getPosition(function(pos) {
            var maths = pos / length * 1000;
            activeEpisode.find(".seekbar progress").each(function(){
              $(this).val(maths);
            });
            activeEpisode.find(".time-current").text(msToHMS(pos));
          });
        });
      });
    }
});
