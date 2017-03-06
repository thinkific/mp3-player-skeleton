(function(w, m) {
  var player = function(element) {
    var self = this;
    this.wrapper = element;
    this.wrapper.append($("<audio>Your browser does not support the audio element.</audio>"));
    this.jQueryElement = this.wrapper.find("audio");
    this.audioElement = this.jQueryElement.get(0);
    this.previousTrackButton = this.wrapper.find(".player-controls a:first-child");
    this.controlButton = this.wrapper.find(".player-controls a:nth-child(2)");
    this.nextTrackButton = this.wrapper.find(".player-controls a:nth-child(3)");
    this.progressBar = this.wrapper.find(".song__progress-indicator");
    this.endLabel = this.wrapper.find(".song__time-end");
    this.startLabel = this.wrapper.find(".song__time-start");
    this.songTitle = this.wrapper.find(".song-title");
    this.isPlaying = false;
    this.duration = 0;

    this.audioElement.ontimeupdate = function() {
      self.updateProgress();
    };

    this.audioElement.ondurationchange = function() {
      self.duration = self.audioElement.duration;
      var formattedSongLength = self.formatDuration(self.duration)
      self.endLabel.text(formattedSongLength);
    };

    this.controlButton.on("click", function(e) {
      e.preventDefault();

      if (self.isPlaying) {
        $(this).removeClass().addClass("play-button");
        self.stop()
      } else {
        $(this).removeClass().addClass("play-pause");
        self.play()
      }

      self.isPlaying = !self.isPlaying;
    });

    this.nextSong = function() {
      self.progressBar.css("width", 0);
      self.jQueryElement.attr("src", self.playList.getNextSongUrl());
      self.songTitle.text(self.playList.getSongTitle());
      if (self.isPlaying) {
        self.play();
      }
    }

    this.previousSong = function() {
      self.progressBar.css("width", 0);
      self.jQueryElement.attr("src", self.playList.getNextSongUrl());
      if (self.isPlaying) {
        self.play();
      }
    }

    this.nextTrackButton.on("click", function(e) {
      e.preventDefault();
      self.nextSong();
    });

    this.previousTrackButton.on("click", function(e) {
      e.preventDefault();
      self.previousSong();
    });

    $(this.audioElement).on("ended", function(e) {
      e.preventDefault();
      self.nextSong();
    })
    self.stop();
  };

  player.prototype.initialize = function(songs) {
    this.previousTrackButton.addClass("previous_track-button");
    this.controlButton.addClass("play-button");
    this.nextTrackButton.addClass("next_track-button");
    this.playList = new PlayList(songs);
    this.jQueryElement.attr("src", this.playList.getCurrentSongUrl);
    this.songTitle.text(this.playList.getSongTitle());
    this.audioElement.load();
  };

  player.prototype.percentComplete = function(currentPlayTimeInSeconds) {
    return (currentPlayTimeInSeconds / this.audioElement.duration) * 100;
  };

  player.prototype.updateProgress = function() {
    var currentTime = this.audioElement.currentTime;
    var currentTimeFormatted = this.formatDuration(currentTime);
    var percentComplete = this.percentComplete(currentTime);
    this.startLabel.text(currentTimeFormatted);
    this.progressBar.css("width", percentComplete + "%");
  };

  player.prototype.play = function() {
    this.audioElement.play();
  };

  player.prototype.stop = function() {
    this.audioElement.pause();
  };

  player.prototype.formatDuration = function(seconds) {
    var total = m.duration(seconds, "seconds");
    return m.utc(total.asMilliseconds()).format("HH:mm:ss");
  };

  w.AudioPlayer = player;
})(window, moment);
