var requireQueue = function(modules, callback) {
  function load(queue, results) {
    if (queue.length) {
      require([queue.shift()], function(result) {
        results.push(result);
        load(queue, results);
      });
    } else {
      callback.apply(null, results);
    }
  }

  load(modules, []);
};

requireQueue([
"jquery",//  This was commented out an loaded from the vnvision.html
  "scripts/lib/moment",
  "scripts/lib/angular",
  "scripts/lib/jquery_ui",
  "scripts/lib/angular_touch",
  "scripts/lib/angular_animate",
  "scripts/lib/angular_aria",
  "scripts/lib/angular_material",
  "cbmastermodule",
  "navigation/cbnavigationmodule",
  "screens/cbmainmodule",
  "screens/cbhelpmodule",
  "screens/cbaboutmodule",
  "screens/cbsettingsmodule",
  "bars/cbtopbarmodule",
  "bars/bottomsheetmodule"
], function(App) {
  $( document ).ready( function(){
  	angular.bootstrap($( ".vision-parent-module" ), [ 'cbMasterModule' ]);
  } );
});