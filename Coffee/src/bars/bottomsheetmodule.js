angular.module('cbBottomSheetModule', function () {})
.controller('cbBottomSheetController', function ( 
  $scope, 
  $rootScope,
  $mdBottomSheet, 
  cbNavigationFactory
   ) {
  $scope.handleHelpClick = function(){
    cbNavigationFactory.switchScreens( "HELP" );
    $mdBottomSheet.hide();
  };

  $scope.handleAboutClick = function(){
    cbNavigationFactory.switchScreens( "ABOUT" );
    $mdBottomSheet.hide();
  };

   $scope.handleSettingsClick = function(){
    cbNavigationFactory.switchScreens( "SETTINGS" );
    $mdBottomSheet.hide();
  };
});