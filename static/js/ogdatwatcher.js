angular.module('ogdatanalysewebfrontend', ['ui.bootstrap', 'ui.bootstrap.alert', 'ngGrid', 'ajoslin.promise-tracker']);

function CollapseDemoCtrl($scope) {
	$scope.isCollapsed = false;
}

function TaxonomyControll($scope, $http, promiseTracker) {
	
	$scope.loadGrid = function(endpoint) {
		var basetaxonomyurl = 'http://localhost:5100/v1/taxonomy/';
		var fullurl = basetaxonomyurl + endpoint;

		var get = $http.get(fullurl).success(function(data) {
			$scope[endpoint] = data;
		}).error(function(data, status, header) {
			$scope[endpoint] = null;
			$scope[endpoint+'alert'] = 'Error fetching data from ' + fullurl + ': ' + ', Status:' + status + ', Time: ' + Date.now();
		});
		$scope.spinner = promiseTracker('spinner');
		$scope.spinner.addPromise(get);
	};

	$scope.entitygrid = { data: 'entities'};
	$scope.loadGrid('entities')
}