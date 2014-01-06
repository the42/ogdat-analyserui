{{{define "index"}}}<!DOCTYPE html>
<html ng-app="ogdatanalysewebfrontend">
	<head>
		<meta charset="UTF-8"/>
		<title>Open Government Data Österreich - Metadatenqualitätsportal</title>
		<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet"/>
		<link href="./static/css/ng-grid.min.css" rel="stylesheet"/>
		<!--link href="//raw.github.com/angular-ui/ng-grid/master/ng-grid.min.css" rel="stylesheet"/-->
		<link href="./static/css/custom-grid.css" rel="stylesheet"/>
		<link href="./static/css/ogdat-analyserui.css" rel="stylesheet"/>
	</head>
	<body>
		<div class="container">
			<div class="row clearfix">
				<div class="col-md-12 column">
					<div class="page-header">
						<h1>
							Open Government Data Österreich <small>Statistik, Konsistenzchecks und Entwicklung</small>
						</h1>
					</div>
				</div>
			</div>
			<div ng-view></div>
			<div class="row clearfix">
				<div class="col-md-12 column">
					<p></p>
					<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small>
					</p>
				</div>
			</div>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-sanitize.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-route.js">
		</script>
		<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.9.0.js">
		</script>
		<script src="//raw.github.com/angular-ui/ng-grid/master/ng-grid-2.0.7.min.js">
		</script>
		<script src="//raw.github.com/ajoslin/angular-promise-tracker/master/promise-tracker.js">
		</script>
		<script src="./static/js/ogdatwatcher.js">
		</script>
	</body>
</html>{{{end}}}