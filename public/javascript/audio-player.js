(function(w, m) {
  var player = function(element) {

    var self = this;
    this.wrapper = element;
    this.wrapper.append($("<audio>Your browser does not support the audio element.</audio>"));
    this.jQueryElement = this.wrapper.find("audio");
    this.audioElement = this.jQueryElement.get(0);
    this.controlButton = this.wrapper.find(".player-controls a");
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
      var formattedSongLength = self.formatDuration(self.duration)
      self.endLabel.text(formattedSongLength);
    };

    this.controlButton.on("click", function(e) {
      e.preventDefault();
      //implement me
      if(self.isPlaying){
        self.stop();
      } else {
        self.play();
      }
    });

    self.stop();
  };

  player.prototype.initialize = function(song) {
    this.jQueryElement.attr("src", song[0].url);
    this.audioElement.load();
  };

  player.prototype.percentComplete = function(currentPlayTimeInSeconds) {
    //implement me
    return Math.floor((currentPlayTimeInSeconds/this.duration)*100);
  };

  player.prototype.updateProgress = function() {
    var currentTime = this.audioElement.currentTime;
    var currentTimeFormatted = this.formatDuration(currentTime);
    var percentComplete = this.percentComplete(currentTime);
    this.startLabel.text(currentTimeFormatted);
    this.progressBar.css("width", percentComplete);
  };

  player.prototype.play = function() {
    //implement me
    this.isPlaying = true;
    this.controlButton.removeClass("play-button");
    this.controlButton.addClass("play-pause");
    this.audioElement.play();
  };

  player.prototype.stop = function() {
    //implement me
    this.isPlaying = false;
    this.controlButton.addClass("play-button");
    this.controlButton.removeClass("play-pause");
    this.audioElement.pause();
  };

  player.prototype.formatDuration = function(seconds) {
    var total = m.duration(seconds, "seconds");
    return m.utc(total.asMilliseconds()).format("HH:mm:ss");
  };

  w.AudioPlayer = player;
})(window, moment);
