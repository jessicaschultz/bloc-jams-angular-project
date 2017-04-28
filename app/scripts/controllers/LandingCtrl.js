(function() {
    function LandingCtrl() {
      this.heroTitle = "Turn The Music Up!";
    }
  
    angular
      .module('blocJams')
      .controller('LandingCtrl', LandingCtrl);
})();