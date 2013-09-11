angular.module('ogdatanalysewebfrontend', ['ui.bootstrap', 'ngGrid', 'ajoslin.promise-tracker']);

function CollapseDemoCtrl($scope) {
	$scope.isCollapsed = false;
}

function EntitiesControll($scope, $http, promiseTracker) {
	$scope.reloadGrid = function() {
		$scope.spinner = promiseTracker('spinner');
		var get = $http.get('http://localhost:5100/v1/taxonomy/entities/').success(function(data) {
			$scope.myData = data;
		});
		$scope.gridOptions = { data: 'myData' };
		$scope.spinner.addPromise(get);
		};

		$scope.reloadGrid();
}