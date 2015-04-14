angular.module('cbAboutModule', function ( ) {})
.controller('cbAboutController', function ( $scope ) {

})
.directive('cbAbout', function() {
    return {
      restrict: 'E',
      templateUrl: 'screens/cbabout.html'
    };
});