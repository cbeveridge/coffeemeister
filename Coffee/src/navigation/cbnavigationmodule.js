angular.module('cbNavigationModule', [],function () {})
.factory('cbNavigationFactory',  function( $rootScope, $timeout ){
	var factory = {};
	$rootScope.screens = {};
	$rootScope.screens[ "MAIN" ] = true;
	var screenHistory = new Array();
	factory.SCREEN_CURRENT = 0;
	factory.SCREEN_PREVIOUS = 1;
	

  	factory.switchScreens = function( to ){
  		angular.forEach( $rootScope.screens, function( value, index ){
			$rootScope.screens[ index ] = false;
		});
		$timeout( function(){
			$rootScope.screens[to] = true;

			// I'm only keeping current and previous at the moment
			var screenHistoryLength = screenHistory.unshift( to );
			if( screenHistoryLength > 2 ){
				screenHistory.pop();
			}
		}, 1, true );
	 }; 

	 factory.retrieveScreenFromHistory = function( screenHistoryIndex ){
	 	return screenHistory[ screenHistoryIndex ];
	 };
	return factory;
});