angular.module('cbMainModule', function () {})
.controller('cbMainController', function ( 
  $scope,
  $timeout, 
  $window, 
  $mdToast,
  $mdSidenav,
  cbMasterFactory ) {
  
  var availableStops = [];
  var notificationsOK = false;
  $scope.availableStops = [
    {location: "INPS", selected: false}, 
    {location: "RBS", selected: false}, 
    {location: "Caroline Trust", selected: false}, 
    {location: "Mortgage People", selected: false}, 
    {location: "Agricultural Place", selected: false}];

  $scope.mytimeout = 0;



  $scope.handleLocationClick = function( e ){
    
    if( !( $( e.target ).hasClass( "md-thumb" ) || $( e.target ).hasClass( "md-bar" ) ) ){
       this.stop.selected = !this.stop.selected;
    }

     
  
    


    /*if( this.stop.selected ){
      cbMasterFactory.emit( 'subscribe', stop);
      showToaster();
      $timeout( function(){
       $mdSidenav('right').toggle();
        $scope.counter = 8;
        var onTimeout = function(){
            $scope.counter--;
            if( $scope.counter > 0 ){
              mytimeout = $timeout(onTimeout,1000);
            }else{
              stop();
            }
        }
        var mytimeout = $timeout(onTimeout,1000);

        var stop = function(){
            $timeout.cancel(mytimeout);
        } 
      }, 2000 );       
    }*/
  };

  var showToaster = function(){
    $scope.noScroll = true;
    var toast = $mdToast.simple()
          .content('Keep screen open for the coffee alert!')
          .hideDelay( 5000 )
          .highlightAction(false)
          .position('bottom left right');
    $mdToast.show(toast).then(function() {
      console.log( "Done" );
       $scope.noScroll = false;
    });
    $timeout( function(){
      $scope.noScroll = false;
    }, 6000 );
  };


  cbMasterFactory.on('arrived', function(notice){
    console.log(notice);
    if ( checkNotifications() ) {
      var notification = new Notification(notice.heading, 
      {body: notice.body, icon:notice.icon});
    }

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    if( navigator.vibrate ){
      navigator.vibrate([500, 500, 500]);
    }
    


    $( "#body" ).removeClass( "withPicture withoutPicture" ).addClass( "withPicture" );
    var html = "<h1>" + notice.heading + "</h1><p><b><em>" + notice.body + "</em></b>";
    if ( notice.socketAction == 'close' ) {
      html += "<p>This page is now inactive. </p><p>Please close the window.</p>";
      cbMasterFactory.emit('feedback')
      cbMasterFactory.disconnect();
    }
    $('#main').html(html);
  }); 

  cbMasterFactory.on('availableStops', function(stops){
    $scope.availableStops = stops;
  });

 
    
})
.directive('cbMain', function() {
    return {
      restrict: 'E',
      templateUrl: 'screens/cbmain.html'
    };
});


