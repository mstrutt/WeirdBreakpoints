<!DOCTYPE HTML>
<html>
	<head>
		<?php
			include('assets/php/bootstrap.php');
			$url = (isset($_GET["url"])) ? urldecode($_GET["url"]) : "http://mstrutt.co.uk";
			if (strpos($url, "http://") === false) $url = "http://".$url;
		?>
		<meta charset="utf-8" />
		<link rel="dns-prefetch" href="//ajax.googleapis.com" />

		<title>Weird Breakpoints</title>

		<link href="http://fonts.googleapis.com/css?family=Enriqueta:400,700|Open+Sans:400italic,400,700" rel="stylesheet">
		<link href="/assets/styles/styles.css" rel="stylesheet" />
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
		</div>
		
		<div class="help">
			<a href="#" id="help" class="icon icon-help" title="Help">?</a>
			<section class="overlay is-hidden">
				<a href="#" class="icon close" title="Close">x</a>
				<h2>Randon Breakpoint</h2>
				<p>This is probably the best place to test truly weird breakpoints, it will scale to somewhere between mobile and large desktop. Click the button, give it a go.</p>
				<h2>Test any site you want</h2>
				<p>Simply type a URL in the box above and hit enter, you can even test <a href="/?url=localhost">localhost</a>.</p>
				<h2>Popular sizes</h2>
				<p>These are pulled in from the <a href="http://gs.statcounter.com">global stats at statcounter</a>, split by desktop and mobile</p>
				<p>I've also added in lists of common devices, and common cruxes, to allow easy testing of nice and nasty conditions</p>
				<p><em>Tip</em>: For testing at screen sizes larger than yours, try zooming out to around 50%.</p>
			</section>
		</div>

		<div class="size-info">
			<span id="current-size">320px X 480px</span>
		</div>

		<footer class="footer">
			<p>Made by <a href="http://mstrutt.co.uk">Michael Strutt</a> 2013</p>
		</footer>

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js" defer></script>
		<script defer>window.jQuery || document.write('<script src="/assets/scripts/lib/jquery.min.js"><\/script>')</script>
		<script src="/assets/scripts/site.js" defer></script>
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-32384890-2', 'weird-breakpoints.com');
			ga('send', 'pageview');
		</script>
	</body>
</html>