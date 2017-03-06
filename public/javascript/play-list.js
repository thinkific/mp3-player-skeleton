(function (w, m) {
    var playList = function (s) {
        var songs = s;
        var index = 0;

        function parseSongUrl(url) {
            var urlParts = url.split('/');
            var fileName = urlParts[urlParts.length - 1];
            fileName = fileName.split('.mp3')[0];
            fileName = fileName.split('+').slice(1).join(' ');
            return fileName;
        }

        return {
            getSongTitle: function() {
                return parseSongUrl(this.getCurrentSongUrl());
            },
            getCurrentSongUrl: function () {
                return songs[index].url;
            },
            getNextSongUrl: function () {
                if (index + 1 < songs.length) {
                    return songs[++index].url;
                } else {
                    index = 0;
                    return songs[index].url;
                }
            },
            getPreviousSongUrl: function () {
                if (index - 1 >= 0) {
                    return songs[--index].url;
                } else {
                    index = songs.length - 1;
                    return songs[index].url;
                }
            }
        }
    }

    w.PlayList = playList;
}(window, moment));
