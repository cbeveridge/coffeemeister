angular.module('cbTopBarModule', function ( ) {})
.controller('cbTopBarController', function ( 
  $scope, 
  $mdBottomSheet,
  cbNavigationFactory ) {
  $scope.handleMenuButtonClick = function( $event ){
    showGridBottomSheet( $event );
  };

  $scope.handleBackButton = function(){
    cbNavigationFactory.switchScreens( "MAIN" );
  };

  var showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bars/bottomsheet.html',
      targetEvent: $event
    });
  };  
})
.directive('cbTopBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'bars/cbtopbar.html'
    };
});


