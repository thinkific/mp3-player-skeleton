$(function() {
    var audioPlayer = new AudioPlayer($(".player"));

    var fetchSong = $.ajax({
        url: "/api/v1/music",
        dataType: "json"
    });

    fetchSong.done(function(songs) {
        audioPlayer.initialize(songs);
    });
});
