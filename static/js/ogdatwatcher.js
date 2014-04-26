function MetadataDescriptionUrl (version, id) {

	var url;

	if (version.indexOf("2.0") > 0 || version.indexOf("2.1") > 0) {
		url = "http://htmlpreview.github.io/?https://github.com/the42/ogdat/blob/master/ogdatv21/ogdat_spec-2.1.html";
	} else if (version.indexOf("2.2") > 0) {
		url = "http://htmlpreview.github.io/?https://github.com/the42/ogdat/blob/master/ogdatv22/ogdat_spec-2.2.html";
	} else {
		// url = "";
	}

	if (url &&  id) {
		url += "#ID.desc." + id;
	}

	return url;	
}

var APIBASEURL = 'http://localhost:5100/v1/';
var DATAPORTAL_APIBASEURL = 'http://www.data.gv.at/katalog/api/2/';


// #######################################################################
// ## Angular definition						##
// #######################################################################
angular.module('ogdatanalysewebfrontend', ['ngSanitize', 'ngRoute', 'ui.bootstrap', 'ngGrid', 'ajoslin.promise-tracker'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: 'static/partials/main.html'}).
			when('/statistic', {templateUrl: 'static/partials/statistic.html'}).
			when('/check', {templateUrl: 'static/partials/check.html'}).
			when('/inconsistencies', {templateUrl: 'static/partials/inconsistencies.html'}).
			when('/dslist/:taxonomy', {templateUrl: 'static/partials/dslist.html'}).
			when('/dslist/:taxonomy/:subset', {templateUrl: 'static/partials/dslist.html'}).
			when('/checklist/:taxonomy/:subset', {templateUrl: 'static/partials/checklist.html', reloadOnSearch: false}).
			when('/dataset/:id', {templateUrl: 'static/partials/dataset.html'}).
			when('/an/an003', {templateUrl: 'static/partials/an003.html'}).
			otherwise({redirectTo: '/'});
		}])
	.directive('datasetdetails', function () {
		return {
			restrict: 'A',
			templateUrl: 'static/partials/datasetdetails.html',
			controller: ['$scope', function($scope) {
				$scope.JSONDATASETBASEURL = DATAPORTAL_APIBASEURL + 'rest/dataset/';
				$scope.MetadataDescriptionUrl = MetadataDescriptionUrl;
			}],
			scope: {
				mdelements: '='
			}
		};
	})
	.filter('ErrorSuccessLink', [function () {
		return function (checkrecords) {
			if (!angular.isUndefined(checkrecords) &&  checkrecords.length > 0) {
				var tempRecords = [];
				angular.forEach(checkrecords, function (record) {
					if (record.Fieldstatus & 0x1000) {
						tempRecords.push(record);
					}
				});
				return tempRecords;
			} else {
				return checkrecords;
			}
		};
	}])
	.filter('RecordsType', [function () {
		return function (checkrecords, intype) {
			if (!angular.isUndefined(checkrecords) &&  checkrecords.length > 0) {
				var tempRecords = [];
				angular.forEach(checkrecords, function (record) {
					if (record.Status === intype) {
						if (record.Status === 'info' && (record.Fieldstatus & 0x2000)) {
							// do not add link inforecords
						} else {
							tempRecords.push(record);
						}
					}
				});
				return tempRecords;
			} else {
				return checkrecords;
			}
		};
	}])
	.directive('checkdetails', function () {
		return {
			restrict: 'A',
			templateUrl: 'static/partials/checkdetails.html',
			controller: ['$http', '$scope', '$filter', function($http, $scope, $filter) {
				$scope.JSONDATASETBASEURL = DATAPORTAL_APIBASEURL + 'rest/dataset/';
				$scope.MetadataDescriptionUrl = MetadataDescriptionUrl;

				$scope.loadData = function(id) {
					var fullurl = APIBASEURL + 'check/' + id;
					$http.get(fullurl).success(function(data) {
						$scope.checkrecord = data;
					}).error(function(data, status, header) {
						alert('Cannot fetch ' + fullurl);
					});
				};
				$scope.csstableclassforitemstatus = function(item) {
					return {"info":"success", "warning":"warning", "error":"danger"}[item];
				};
				$scope.$watchCollection('checkrecord', function(newVal) {
					if(newVal) {
						$scope.linkRecords = $filter('ErrorSuccessLink')(newVal.CheckStatus);
						$scope.errorRecords = $filter('RecordsType')(newVal.CheckStatus, 'error');
						$scope.warningRecords = $filter('RecordsType')(newVal.CheckStatus, 'warning');
						$scope.infoRecords = $filter('RecordsType')(newVal.CheckStatus, 'info');
					}
				});
			}],
			scope: {
				datasetid: '@',
				publisher: '@',
				version: '@'
			},
			link: function(scope, iElement, iAttrs) {
				scope.$watch('datasetid', function(oldVal, newVal) {
					if(oldVal) {
						scope.loadData(iAttrs.datasetid);
					}
				});
			}
		};
	});

function TaxonomyControl($scope, $http, promiseTracker) {

	$scope.loadGrid = function(endpoint) {
		var basetaxonomyurl = APIBASEURL + 'taxonomy/';
		var fullurl = basetaxonomyurl + endpoint;

		var get = $http.get(fullurl).success(function(data) {
			// programmatically add a column 'href' which contains the link to the dataset list display page
			for (var i = 0; i < data.length; i++) {
				data[i].href = '#dslist/' + endpoint+ '/' + data[i].ID;
			}
			$scope[endpoint] = data;
		}).error(function(data, status, header) {
			$scope[endpoint] = null;
			$scope[endpoint+'alert'] = 'Error fetching data from ' + fullurl + ': ' + ', Status:' + status + ', Time: ' + Date.now();
		});
		$scope[endpoint] = promiseTracker();
		$scope[endpoint].addPromise(get);
	};

	var statistics = [
		{source:'entities', columnDefs: [{field:'ID', displayName:'Veröffentlichende Stelle'}, {field:'Numsets', displayName:'Anzahl'}]},
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

function TaxonomyCheckControl($scope, $http, promiseTracker) {
	
	$scope.loadGrid = function(endpoint) {
		var basetaxonomyurl = APIBASEURL + 'check/taxonomy/';
		var fullurl = basetaxonomyurl + endpoint;

		var get = $http.get(fullurl).success(function(data) {
			// programmatically add a column 'href' which contains the link to the dataset list display page
			for (var i = 0; i < data.length; i++) {
				data[i].href = '#checklist/' + endpoint+ '/' + data[i].ID;
			}
			$scope[endpoint] = data;
		}).error(function(data, status, header) {
			$scope[endpoint] = null;
			$scope[endpoint+'alert'] = 'Error fetching data from ' + fullurl + ': ' + ', Status:' + status + ', Time: ' + Date.now();
		});
		$scope[endpoint] = promiseTracker();
		$scope[endpoint].addPromise(get);
	};

	var statistics = [
		{source:'entities', columnDefs: [{field:'ID', displayName:'Veröffentlichende Stelle'}, {field:'Numsets', displayName:'Anzahl Check-Datensätze'}]}
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

function DataSetCheckListControl($scope, $http, $routeParams, $sanitize, $location, promiseTracker) {
	
	$scope.loadGrid = function(which, subset) {
		var basetaxonomyurl = APIBASEURL + 'datasets/taxonomy/'; // + {which}/{subset}
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
		$scope.datataxonomydetails = promiseTracker();
		$scope.datataxonomydetails.addPromise(get);
	};

	$scope.contextheading = "";
	$scope.datataxonomygridselection = [];

	$scope.taxonomy = $routeParams.taxonomy;
	$scope.subset = $routeParams.subset || "";  // Might also get called only with taxonomy set. In that case prevent subset to be 'undefined'
	$scope.datasetid = $routeParams.id || "";

	switch($scope.taxonomy) {
		case "entities":
			$scope.contextheading = "Veröffentlichende Stelle";
			break;
		case "versions":
			$scope.contextheading = "Metadatenversion";
			break;
		case "toponyms":
			$scope.contextheading = "Geographische Abdeckung";
			break;
		case "categories":
			$scope.contextheading = "Kategorie";
			break;
		default:
			$scope.contextheading = "";
			break;
	}

	// in the ng-grid, the element should be displayed as a link using the contents of the field 'href' as href
	var linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
		'  <a href="{{row.entity[\'href\']}}" target="_blank">{{row.getProperty(col.field)}}</a>' +
		'</div>';

	$scope.datataxonomydetailsgrid = {
		data: 'datataxonomydetails',
		showFooter: true,
		multiSelect: false,
		selectedItems: $scope.datataxonomygridselection,
		columnDefs: [
			{field:'goto', displayName:'', cellTemplate:linkCellTemplate, width:20},
			{field:'Description', displayName:'Beschreibung'}
		]
	};

	$scope.loadGrid($scope.taxonomy, $scope.subset);

	$scope.$on('ngGridEventData', function() {
		var idx = 0;
		if ($scope.datasetid.length) {
			for (var i = 0; i < $scope.datataxonomydetailsgrid.data.length; i++) {
				if ($scope.datataxonomydetails[i].CKANID === $scope.datasetid) {
					idx = i;
					break;
				}
			}
		}
		$scope.datataxonomydetailsgrid.selectRow(idx, true);
	});
	$scope.$watch('datataxonomygridselection[0].CKANID', function(oldVal, newVal) {
		if(oldVal) {
			$scope.datasetid = $scope.datataxonomydetailsgrid.selectedItems[0].CKANID;
			$location.search('id', $scope.datasetid);
		}
	});
}


function DataSetListControl($scope, $http, $routeParams, $sanitize, promiseTracker) {

	$scope.deselectallrows = function(grid, gridsetup)  {
		angular.forEach(grid, function(data, index){
			gridsetup.selectItem(index, false);
		});
	};

	$scope.loadGrid = function(which, subset) {
		var basetaxonomyurl = APIBASEURL + 'datasets/taxonomy/'; // + {which}/{subset}
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
		$scope.datataxonomydetails = promiseTracker();
		$scope.datataxonomydetails.addPromise(get);
	};

	$scope.contextheading = "";
	$scope.datataxonomygridselection = [];

	$scope.taxonomy = $routeParams.taxonomy;
	$scope.subset = $routeParams.subset || "";  // Might also get called only with taxonomy set. In that case prevent subset to be 'undefined'

	switch($scope.taxonomy) {
		case "entities":
			$scope.contextheading = "Veröffentlichende Stelle";
			break;
		case "versions":
			$scope.contextheading = "Metadatenversion";
			break;
		case "toponyms":
			$scope.contextheading = "Geographische Abdeckung";
			break;
		case "categories":
			$scope.contextheading = "Kategorie";
			break;
		default:
			$scope.contextheading = "";
			break;
	}

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

function DataSetLoadControl($scope, $http, $routeParams, $sanitize) {
	$scope.loadData = function(ids) {
		var basetaxonomyurl = APIBASEURL + 'dataset/';
		var fullurl;

		for(var i=0; i<ids.length; i++) {
			fullurl = basetaxonomyurl + ids[i];

			$http.get(fullurl).success(function(data) {
				$scope.mdelements.push(data);
			}).error(function(data, status, header) {
				alert('Cannot fetch ' + fullurl);
			});
		}
	};

	$scope.mdelements = [];
	$scope.loadData(JSON.parse($routeParams.id));
}
