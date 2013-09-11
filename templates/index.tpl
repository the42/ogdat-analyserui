{{{define "index"}}}<!DOCTYPE html>
<html ng-app="ogdatanalysewebfrontend">
	<head>
		<meta charset="UTF-8"/>
		<title>A title</title>
		<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
		<link href="./static/css/ng-grid.min.css" rel="stylesheet"/>
		<link href="./static/css/custom-grid.css" rel="stylesheet"/>
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
			<!-- currently not working because of transition to bootstrap 3 
			 div collapse="isCollapsed"-->
		<div>
			<div class="well well-large">Some content</div>
			<div ng-controller="EntitiesControll">
				<div ng-show="spinner.active()">
				  <img src="/static/images/round_spinner.png" alt="spinner"/>
				</div>
				<div ng-show="!spinner.active()" ng-click="reloadGrid()">
				  <img src="/static/images/reload.png" alt="reload"/>
				</div>
				<div class="gridStyle" ng-grid="gridOptions"></div>
			</div>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.min.js"></script>
		<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.5.0.js"></script>
		<script src="./static/js/ng-grid-2.0.7.min.js"></script>
		<script src="https://raw.github.com/ajoslin/angular-promise-tracker/master/promise-tracker.js"></script>
		<script src="./static/js/ogdatwatcher.js"></script>
	</body>
</html>{{{end}}}