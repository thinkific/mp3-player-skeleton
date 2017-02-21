(function(w, m) {
    var player = function(element) {
        var self = this;
        this.wrapper = element;
        this.wrapper.append($("<audio>Your browser does not support the audio element.</audio>"));
        this.jQueryElement = this.wrapper.find("audio");
        this.audioElement = this.jQueryElement.get(0);
        this.songsTitle = this.wrapper.find(".song-title");
        this.playButton = this.wrapper.find(".play-button");
        this.playNext = this.wrapper.find(".play-next");
        this.playPrev = this.wrapper.find(".play-prev");
        this.progressBar = this.wrapper.find(".song__progress-indicator");
        this.endLabel = this.wrapper.find(".song__time-end");
        this.startLabel = this.wrapper.find(".song__time-start");
        this.isPlaying = false;
        this.duration = 0;

        this.audioElement.ontimeupdate = function() {
            self.updateProgress();
        };

        this.audioElement.ondurationchange = function() {
            self.duration = self.audioElement.duration;
            var formattedsongsLength = self.formatDuration(self.duration)
            self.endLabel.text(formattedsongsLength);
        };

        this.playButton.on("click", function(e) {
            e.preventDefault();

            if (self.isPlaying) {
                self.stop();
            } else {
                self.play();
            }
            self.isPlaying = !self.isPlaying;
        });

        self.stop();
    };

    player.prototype.initialize = function(songs) {
        var $tracks = this.audioElement,
            firstSong = songs[0];
        $.each(songs, function(key, song) {
          $tracks.append('<source src="' + song.url + '" type="audio/mp3" />');
        });
        this.jQueryElement.attr("src", firstSong.url);
        this.songsTitle.html(firstSong.title);
        this.audioElement.load();
    };

    player.prototype.percentComplete = function(currentPlayTimeInSeconds) {
        return ((currentPlayTimeInSeconds / this.duration) * 100) + '%';
    };

    player.prototype.updateProgress = function() {
        var currentTime = this.audioElement.currentTime;
        var currentTimeFormatted = this.formatDuration(currentTime);
        var percentComplete = this.percentComplete(currentTime);
        this.startLabel.text(currentTimeFormatted);
        this.progressBar.css("width", percentComplete);
    };

    player.prototype.play = function() {
        this.audioElement.play();
        $(this.playButton).removeClass('play-button').addClass('play-pause');
    };

    player.prototype.stop = function() {
        this.audioElement.pause();
        $(this.playButton).removeClass('play-pause').addClass('play-button');
    };

    player.prototype.formatDuration = function(seconds) {
        var total = m.duration(seconds, "seconds");
        return m.utc(total.asMilliseconds()).format("HH:mm:ss");
    };

    w.AudioPlayer = player;
})(window, moment);
