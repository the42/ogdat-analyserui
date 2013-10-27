angular.module('ogdatanalysewebfrontend', ['ui.bootstrap', 'ngGrid', 'ajoslin.promise-tracker']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: 'static/partials/main.html'}).
			when('/statistic', {templateUrl: 'static/partials/statistic.html', controller: TaxonomyControl}).
			when('/dslist/:taxonomy/:subset', {templateUrl: 'static/partials/dslist.html', controller: DataSetListControl}).
			otherwise({redirectTo: '/'});
}]);

var APIBASEURL = 'http://localhost:5100/v1/';
var DATAPORTAL_APIBASEURL = 'http://www.data.gv.at/katalog/api/2/';

function TaxonomyControl($scope, $http, promiseTracker) {
	
	$scope.loadGrid = function(endpoint) {
		var basetaxonomyurl = APIBASEURL + 'taxonomy/';
		var fullurl = basetaxonomyurl + endpoint;

		var get = $http.get(fullurl).success(function(data) {
			// programmatically add a column 'href' which contains the link to the dataset list display page
			for (var i = 0; i < data.length; i++) {
				data[i].href = '#dslist/' + endpoint+ '/' + data[i].ID
			}
			$scope[endpoint] = data;
		}).error(function(data, status, header) {
			$scope[endpoint] = null;
			$scope[endpoint+'alert'] = 'Error fetching data from ' + fullurl + ': ' + ', Status:' + status + ', Time: ' + Date.now();
		});
		$scope[endpoint] = promiseTracker(endpoint);
		$scope[endpoint].addPromise(get);
	};
		
	var statistics = [
		{source:'entities', columnDefs: [{field:'ID', displayName:'Einheit'}, {field:'Numsets', displayName:'Anzahl'}]},
		{source:'versions', columnDefs: [{field:'ID', displayName:'Metadatenversion'}, {field:'Numsets', displayName:'Anzahl'}]},
		{source:'toponyms', columnDefs: [{field:'ID', displayName:'Geographische Abdeckung'}, {field:'Numsets', displayName:'Anzahl'}]},
		{source:'categories', columnDefs: [{field:'ID', displayName:'Kategorie'}, {field:'Numsets', displayName:'Anzahl'}]}
	];
	
	// in the ng-grid, the element should be displayed as a link using the contents of the field 'href' as href
	var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
                       '  <a href="{{row.entity[\'href\']}}">{{row.getProperty(col.field)}}</a>' +
                       '</div>';

	statistics.map(function(item) {
		// The first and second item is a link to load the dataset list
		item.columnDefs[0].cellTemplate = item.columnDefs[1].cellTemplate = linkCellTemplate;
		
		// set up the grid options
		$scope[item.source+'grid'] = {
			data: item.source,
			showFooter: true,
			multiSelect: false,
			columnDefs: item.columnDefs
		};
		
		$scope.loadGrid(item.source);
	});
}

function DataSetListControl($scope, $http, $routeParams, promiseTracker) {

	$scope.taxonomy = $routeParams.taxonomy;
	$scope.subset = $routeParams.subset;
	$scope.datataxonomygridselection = [];

	$scope.loadGrid = function(which, subset) {
		var basetaxonomyurl = APIBASEURL + 'datasets/taxonomy/' // + {which}/{subset} 
		var fullurl = basetaxonomyurl + which + '/' + subset;

		var get = $http.get(fullurl).success(function(data) {
			// programmatically add a column 'href' which contains the link to the dataset list display page
			for (var i = 0; i < data.length; i++) {
				data[i].goto = '▶';
				data[i].href = DATAPORTAL_APIBASEURL + 'rest/dataset/' + data[i].CKANID;
			}
			$scope.datataxonomydetails = data;
		}).error(function(data, status, header) {
			$scope.datataxonomydetails = null;
			$scope.datataxonomydetailsalert = 'Error fetching data from ' + fullurl + ': ' + ', Status:' + status + ', Time: ' + Date.now();
		});
		$scope.datataxonomydetails = promiseTracker('datataxonomydetails');
		$scope.datataxonomydetails.addPromise(get);
	};

	// in the ng-grid, the element should be displayed as a link using the contents of the field 'href' as href
	var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
		'  <a href="{{row.entity[\'href\']}}" target="_blank">{{row.getProperty(col.field)}}</a>' +
		'</div>';

	$scope.datataxonomydetailsgrid = {
		data: 'datataxonomydetails',
		showFooter: true,
		multiSelect: true,
		selectedItems: $scope.datataxonomygridselection,
		columnDefs: [
			{field:'goto', displayName:'', cellTemplate:linkCellTemplate, width:20},
			{field:'Description', displayName:'Beschreibung'}
		]
	};

	$scope.loadGrid($scope.taxonomy, $scope.subset);
}