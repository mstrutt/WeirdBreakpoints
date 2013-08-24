<!DOCTYPE HTML>
<html>
	<head>
		<?php
			include('assets/php/bootstrap.php');
			$url = (isset($_GET["url"])) ? urldecode($_GET["url"]) : "http://mstrutt.co.uk";
			if (strpos($url, "http://") === false) $url = "http://".$url;
		?>

		<title>Weird Breakpoints</title>

		<link href='http://fonts.googleapis.com/css?family=Enriqueta:400,700|Open+Sans:400italic,400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="/assets/styles/styles.css" />
	</head>
	<body>
		<header class="header">
			<section class="header-section">
				<nav class="device-menu">
					<h1>Common devices</h1>
					<a href="#" data-width="320" data-height="480">iPhone</a>
					<a href="#" data-width="768" data-height="960">iPad</a>
					<a href="#" data-width="960" data-height="768">Classic Desktop</a>
				</nav>
				<nav class="device-menu" id="popular-device">
					<h1>Popular device sizes</h1>
				</nav>
				<nav class="device-menu" id="popular-desktop">
					<h1>Popular desktop sizes</h1>
				</nav>
			</section>
			<section class="header-section">
				<form novalidate>
					<input type="url" name="url" value="<?php echo $url; ?>" />
					<button type="submit">Go</button>
				</form>
			</section>
			<section class="header-section">
				<button id="randomBreakpoint">Random Breakpoint</button>
			</section>
		</header>

		<iframe id="screen" class="screen" src="<?php echo $url; ?>"></iframe>

		<footer class="footer">
			<p>Made by <a href="http://mstrutt.co.uk">Michael Strutt</a> 2013</p>
		</footer>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script src="/assets/scripts/site.js"></script>
	</body>
</html>