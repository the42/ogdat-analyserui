{{{define "index"}}}<!DOCTYPE html>
<html ng-app="ogdatanalysewebfrontend">
	<head>
		<meta charset="UTF-8"/>
		<title>A title</title>
		<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet"/>
		<link href="./static/css/ng-grid.min.css" rel="stylesheet"/>
		<link href="./static/css/custom-grid.css" rel="stylesheet"/>
		<link href="./static/css/ogdat-analyserui.css" rel="stylesheet"/>
	</head>
	<body>
		<div>
			<label>Name:</label>
			<input type="text" ng-model="yourName" placeholder="Enter a name here"/>
			<hr/>
			<h1>Hello {{yourName}}!</h1>
		</div>
		<div ng-controller="CollapseDemoCtrl">
			<button class="btn" ng-click="isCollapsed = !isCollapsed">Toggle collapse</button>
			<hr/>
			<div collapse="isCollapsed">
				<div class="well well-large">Some content</div>
				<div ng-controller="TaxonomyControll">
					<div ng-show="spinner.active()">
						<img src="/static/images/round_spinner.png" alt="spinner"/>
					</div>
					<div ng-show="!spinner.active()" ng-click="loadGrid('entities')">
						<img src="/static/images/reload.png" alt="reload" class="pointer"/>
					</div>
					<div ng-hide="entities">
						<alert type="error">{{entitiesalert}}</alert>
					</div>
					<div ng-show="entities" class="gridStyle" ng-grid="entitygrid">
					</div>
				</div>
			</div>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js">
		</script>
		<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.6.0.js">
		</script>
		<script src="//raw.github.com/angular-ui/ng-grid/master/ng-grid-2.0.7.min.js">
		</script>
		<script src="//raw.github.com/ajoslin/angular-promise-tracker/master/promise-tracker.js">
		</script>
		<script src="./static/js/ogdatwatcher.js">
		</script>
	</body>
</html>{{{end}}}