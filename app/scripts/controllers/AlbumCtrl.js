(function(){
     function AlbumCtrl(){
            this.albumData=angular.copy(albumPicasso);
       //tried adding properties to the albumCtrl's $scope object to then access via {{}} in the template.
/*          this.songTitle= albumData.songs.title;
            this.songlength= albumData.songs.duration;
            this.albumArt= albumData.albumArtUrl;
            this.albumName= albumData.title;
            this.albumArtist= albumData.artist;
            this.albumReleaseInfo= albumData.year + albumData.label;*/
      }
  
      angular
            .module('blocJams')
            .controller('AlbumCtrl', AlbumCtrl);
})();
 

/* Attempt, but couldn't get the correct amount of rows.
(function(){
      function AlbumCtrl(){
            this.albumData= [];
            for(var i = 0; i < 12; i++){    // tried:  albumData.songs.length; albumData.length; album.songs.length
              this.albumData.push(angular.copy(albumPicasso));
            }    
      }
      
      angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
          
 */  