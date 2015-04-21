angular.module('cbMasterModule', [
        'ngMaterial',
        'cbMainModule',
        'cbTopBarModule',
        'cbBottomSheetModule',
        'cbNavigationModule',
        'cbHelpModule',
        'cbAboutModule',
        'cbSettingsModule'
        ],function () {
  }).config( [
    '$compileProvider',
    '$mdThemingProvider',
    function( $compileProvider, $mdThemingProvider )
    {   
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
        + '|chrome-extension:'
        +currentImgSrcSanitizationWhitelist.toString().slice(-1);
        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('indigo');
          }
])
.controller('cbMasterController', function ($timeout, $window) {

})
.factory('cbMasterFactory',  function( $rootScope ){
  var socket = io.connect("http://23.21.240.96:80");

  var factory = {};
  var connected = false;
  var onQueue = [];
  var emitQueue = [];


  factory.isConnected = function(){
    return connected;
  };

  factory.disconnect = function(){
    socket.disconnect();
  };

  factory.emit = function( id, data ){
    if( factory.isConnected() ){
      socket.emit(id, data);
    }else{
       emitQueue.push( { id: id, data: data } );
    }
  };

  factory.on = function( id, callback ){
    if( factory.isConnected() ){
      socket.on( id, function( args ){
        callback( args );
      });
    }else{
      onQueue.push( { id: id, callback: callback } );
    }
  }; 


  factory.on('connect', function(){
    connected = true;
    angular.forEach( onQueue, function( value, index ){
      factory.on( value.id, value.data );
    });
    angular.forEach( emitQueue, function( value, index ){
      factory.emit( value.id, value.callback );
    });

    onQueue = [];
    emitQueue = [];

    factory.on('disconnect', function(  ){
      connected = false;
    });
    factory.emit('getStops');
  });


  return factory;
})
.run(function( $window, $rootScope, cbNavigationFactory ){

  cbNavigationFactory.switchScreens( "MAIN" );





   function checkNotifications(){
    return;
    var notificationsOK = false;
   // if (!("Notification" in window)) {
       // alert("This browser does not support desktop notification");
     // }

      // Let's check if the user is okay to get some notification
     // else 

      if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        notificationsOK = true;
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          // If the user is okay, let's create a notification
          if (permission === "granted") {
            notificationsOK = true;
          }
        });
      }

      return notificationsOK;
  }

  //notificationsOK = checkNotifications();


})
.directive('cbCss', function( ) {
  var styleSheets = {};

    return {
      restrict: 'E',
      link: function(scope, element, attrs){
    if( styleSheets[ attrs.cbId ] == null ){
          styleSheets[ attrs.cbId ] = true;
          $( 'body' ).append( "<link id='" + attrs.cbId + "' href='" + attrs.cbCssFile + "' type='text/css' rel='stylesheet' />" );
        }
      }
    }
});


