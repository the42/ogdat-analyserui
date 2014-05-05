{{{define "index"}}}<!DOCTYPE html>
<html ng-app="ogdatanalysewebfrontend">
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Open Government Data Österreich - Metadatenqualitätsportal</title>
		<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet"/>
		<link href="./static/css/ng-grid.min.css" rel="stylesheet"/>
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
					<p>
						Sinnvoller <strong>Text </strong>. hier <em>Sinnvoller</em> Text <small>hier</small>
					</p>
				</div>
			</div>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular-sanitize.js">
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular-route.js">
		</script>		
		<script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.9.0.js">
		</script>
		<script src="//raw.github.com/angular-ui/ng-grid/master/ng-grid-2.0.11.min.js">
		</script>
		<script src="//raw.github.com/ajoslin/angular-promise-tracker/master/promise-tracker.js">
		</script>
		<script src="./static/js/ogdatwatcher.js">
		</script>
	</body>
</html>{{{end}}}