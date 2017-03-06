$(function () {
  var audioPlayer = new AudioPlayer($(".player"));
  var fetchSongs = $.ajax({
    url: "/api/v1/music",
    dataType: "json"
  });
  fetchSongs.done(function(songs) {
    audioPlayer.initialize(songs);
  });
});
