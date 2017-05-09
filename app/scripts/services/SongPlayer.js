(function(){
  function SongPlayer(){
    var SongPlayer = {};
    /**
    *@desc current buzz object audio file playing
    *@type {object} songs audio file
    **/
    var currentSong = null;
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
        currentBuzzObject.stop();
        currentSong.playing = null
      }
      
      currentBuzzObject = new buzz.sound(songs.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentSong = songs;
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
    
    SongPlayer.play = function(songs){
      if (currentSong !== songs){
          setSong(songs);
          currentBuzzObject.play();
          playSong(songs);
      } else if(currentSong === songs){
          if(currentBuzzObject.isPaused()){
            currentBuzzObject.play();
          }
      }
    };
    
    SongPlayer.pause = function(songs){
      currentBuzzObject.pause();
      songs.playing = false;
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();


/*TypeError: Cannot read property 'audioUrl' of undefined
    at Object.SongPlayer.SongPlayer.play. 
    -tried 'song' (what Bloc uses) vs. 'songs' since Fixtures.js has 'songs' property
    --ERROR FIXED: use songs in place of song on all files!*/