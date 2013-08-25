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
				<button id="randomBreakpoint">Random Breakpoint<span>&gt;</span></button>
			</section>
			<section class="header-section">
				<form novalidate>
					<input type="url" name="url" value="<?php echo $url; ?>" />
					<button type="submit" title="Go">Go<span>&gt;</span></button>
				</form>
			</section>
			<div class="header-right">
				<section class="header-section">
					<h2 class="menu-head">Common devices</h2>
					<nav class="device-menu">
						<a href="#" data-width="320" data-height="480">iPhone 4</a>
						<a href="#" data-width="480" data-height="320">iPhone 4 rotated</a>
						<a href="#" data-width="320" data-height="568">iPhone 5</a>
						<a href="#" data-width="568" data-height="320">iPhone 5 rotated</a>
						<a href="#" data-width="768" data-height="960">iPad</a>
						<a href="#" data-width="960" data-height="768">Classic Desktop</a>
					</nav>
				</section>
				<section class="header-section">
					<h2 class="menu-head">Popular device sizes</h2>
					<nav class="device-menu" id="popular-device"></nav>
				</section>
				<section class="header-section">
					<h2 class="menu-head">Popular desktop sizes</h2>
					<nav class="device-menu" id="popular-desktop"></nav>
				</section>
				<section class="header-section">
					<h2 class="menu-head">Common cruxes</h2>
					<nav class="device-menu">
						<a href="#" data-width="479" data-height="319">479 x 319</a>
						<a href="#" data-width="767" data-height="959">767 x 959</a>
						<a href="#" data-width="959" data-height="767">959 x 767</a>
					</nav>
				</section>
			</div>
		</header>

		<div class="page-body">
			<iframe id="screen" class="screen" src="<?php echo $url; ?>"></iframe>

			<div class="help">
			<a href="#" id="help" class="icon">?</a>
			<section class="overlay is-hidden">
				<a href="#" class="close">x</a>
				<p>Tip: For testing at screen sizes larger than yours, try zooming out to around 50%.</p>
			</section>
		</div>
		</div>

		<footer class="footer">
			<p>Made by <a href="http://mstrutt.co.uk">Michael Strutt</a> 2013</p>
		</footer>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script src="/assets/scripts/site.js"></script>
	</body>
</html>