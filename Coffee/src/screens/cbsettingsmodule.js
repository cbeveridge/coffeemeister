angular.module('cbSettingsModule', function ( ) {})
.controller('cbSettingsController', function ( $scope ) {
  $scope.warningTime = 30;
})
.directive('cbSettings', function() {
    return {
      restrict: 'E',
      templateUrl: 'screens/cbsettings.html'
    };
});