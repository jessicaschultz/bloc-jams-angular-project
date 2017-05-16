(function(){
  function SongPlayer($rootScope, Fixtures){
    var SongPlayer = {};
    /*
    *@desc current album information
    *@type {object} album fixture
    */
    var currentAlbum = Fixtures.getAlbum();
    /**
    *@desc Buzz object audio file
    *@type {object}
    */
    var currentBuzzObject = null;
    /**
    *@function setSong
    *@desc Stops currently playing song and loads new audio file as currentBuzzObject
    *@param {object} songs
    */
    var setSong = function(songs){
      if(currentBuzzObject){
        stopSong(songs);
      }
      
      currentBuzzObject = new buzz.sound(songs.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentBuzzObject.bind('timeupdate', function(){
        $rootScope.$apply(function(){
            SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });
      
      currentBuzzObject.bind('volumechange', function(){
        $rootScope.$apply(function(){
            SongPlayer.currentVolume = currentBuzzObject.getVolume();
        });
      });
      
      SongPlayer.currentSong = songs;
    };
    /**
    *@function playSong
    *@desc plays current buzz object and sets playing property of songs object to true.
    *@param {object} songs.
    */
    var playSong = function(songs){
      currentBuzzObject.play();
      songs.playing = true;
    };
    /*
    *@function stop
    *@desc stops current song playing
    */
    var stopSong = function(songs){
      currentBuzzObject.stop();
      songs.playing = null;
    };
    /**
    *@function song index
    *@desc gets the index of a song
    *@param {object} songs
    *@returns currently playing song index from currentAlbum
    **/
    var getSongIndex = function(songs){
      return currentAlbum.songs.indexOf(songs);
    };
    /**
    *@desc current buzz object audio file playing
    *@type {object} songs audio file
    **/
    SongPlayer.currentSong = null;
    /*
    *@desc current playback time (in seconds) of currently playing song
    *@type {number}
    */
    SongPlayer.currentTime = null;
    /*@desc current vol of currently playing song
    *@type {number}
    */
    SongPlayer.currentVolume = 80;
    /**
    *@function play
    *@desc Play current or new song
    *@param {object} songs
    */
    SongPlayer.play = function(songs){
      songs = songs || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== songs){
          setSong(songs);
          currentBuzzObject.play();
          playSong(songs);
      } else if(SongPlayer.currentSong === songs){
          if(currentBuzzObject.isPaused()){
            currentBuzzObject.play();
          }
      }
    };
    /*
    *@function pause
    *@desc Pause current song
    *@param {object} songs
    */
    SongPlayer.pause = function(songs){
      songs = songs || SongPlayer.currentSong;
      currentBuzzObject.pause();
      songs.playing = false;
    };
    /*
    *@function next
    *@desc go to next song (get's current song index++).
    */
    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
      
      if(currentSongIndex >= currentAlbum.songs.length){
        stopSong(songs);
      }else {
        var songs = currentAlbum.songs[currentSongIndex];
        setSong(songs);
        playSong(songs);
      }
    };
    /*
    *@function setCurrentTime
    *@desc set current time (seconds) of currently playing song
    *@param {number} time
    */
    SongPlayer.setCurrentTime = function(time){
      if(currentBuzzObject){
        currentBuzzObject.setTime(time);
      }
    };
    
    /*
    *@function setVolume
    *@desc set current volume of currently playing song
    *@param {number} volume
    */
    SongPlayer.setCurrentVolume = function(volume){
      if(currentBuzzObject){
        currentBuzzObject.setVolume(volume);
      }
    };
    
    /*
    *@function previous
    *@desc go to previous song (get's current song index--).
    */
    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if(currentSongIndex < 0){
        stopSong(songs);
      }else {
        var songs = currentAlbum.songs[currentSongIndex];
        setSong(songs);
        playSong(songs);
      }
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope','Fixtures',SongPlayer]);
})();


/*TypeError: Cannot read property 'audioUrl' of undefined
    at Object.SongPlayer.SongPlayer.play. 
    -tried 'song' (what Bloc uses) vs. 'songs' since Fixtures.js has 'songs' property
    --ERROR FIXED: use songs in place of song on all files!*/