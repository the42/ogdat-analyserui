{{{define "index"}}}<!DOCTYPE html>
<html ng-app="ogdatanalysewebfrontend">
	<head>
		<meta charset="UTF-8"/>
		<title>A title</title>
		<!--link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet"/-->
		<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet"/>
		<link href="./static/css/ng-grid.min.css" rel="stylesheet"/>
		<link href="./static/css/custom-grid.css" rel="stylesheet"/>
		<link href="./static/css/ogdat-analyserui.css" rel="stylesheet"/>
	</head>
	<body>
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="span12">
					<div class="page-header">
						<h1>
							Example page header <small>Subtext for header</small>
						</h1>
					</div>
					<div>
						<label>Name:</label>
						<input type="text" ng-model="yourName" placeholder="Enter a name here"/>
						<hr/>
						<h1>Hello {{yourName}}!</h1>
					</div>			
				</div>
			</div>
			<div class="row-fluid">
				<div ng-view></div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small>
					</p>
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