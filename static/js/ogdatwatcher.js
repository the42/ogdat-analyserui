angular.module('ogdatanalysewebfrontend', ['ui.bootstrap', 'ngGrid', 'ajoslin.promise-tracker']);
function CollapseDemoCtrl($scope) {
	$scope.isCollapsed = false;
}

function GridControll($scope, $http, promiseTracker) {
	// TODO: set the hostname dynamically
	$scope.ninjaFinder = promiseTracker('ninjas');
	var get = $http.get('http://localhost:5100/v1/taxonomy/entities/').success(function(data) {
		$scope.myData = data;
	});
	$scope.gridOptions = { data: 'myData' };
	$scope.ninjaFinder.addPromise(get);
}