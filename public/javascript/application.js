$(function() {
  var audioPlayer = new AudioPlayer($(".player"));

  var fetchSong = $.ajax({
    url: "/api/v1/music",
    dataType: "json"
  });

  fetchSong.done(function(song) {
    audioPlayer.initialize(song);
  });
});
