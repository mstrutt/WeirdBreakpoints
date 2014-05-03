var breakpoints = {
	init: function () {
		var self = this,
			screenWidth = self.screen.width();

		self.scrollWidth = self.getScrollBarWidth(),
		self.newBreakpoint(320, 480);

		setTimeout(function() {
			self.screen.addClass('is-loaded');
		}, 100);

		self.loadStats("/stats.php", 'popular-device', true);
		self.loadStats("/stats-desktop.php", 'popular-desktop');
	},
	scrollWidth: 0,
	maxScreen: 1280,
	screen: $('#screen'),
	getScrollBarWidth: function () {
		var inner = document.createElement('p');
			inner.style.width = "100%";
			inner.style.height = "200px";

		var outer = document.createElement('div');
			outer.style.position = "absolute";
			outer.style.top = "0px";
			outer.style.left = "0px";
			outer.style.visibility = "hidden";
			outer.style.width = "200px";
			outer.style.height = "150px";
			outer.style.overflow = "hidden";
			outer.appendChild (inner);

		document.body.appendChild (outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild (outer);

		return (w1 - w2);
	},
	loadStats: function (url, id, inclandscape) {
		var self = this;
		$.ajax({
			url: url,
			success: function(data) {
				var portrait = "",
					dm, w, h;
				if (inclandscape) {
					var landscape = "<h2>Rotated</h2>";
						portrait = "<h2>Natural</h2>";
				}

				$($.parseXML(data)).find('set').each(function(){
					dm = this.attributes.label.nodeValue;
					if (dm != "Other") {
						w = dm.substring(0, dm.indexOf('x'));
						h = dm.substring(dm.indexOf('x')+1, dm.length);
						portrait += '<a href="#" data-width="'+w+'" data-height="'+h+'">' + w+' x '+h + '</a>';
						if (inclandscape)
							landscape += '<a href="#" data-width="'+h+'" data-height="'+w+'">' + h+' x '+w + '</a>';
						if (self.maxScreen < Math.max(w, h))
							self.maxScreen = Math.max(w, h);
					}
				});
				$('#'+id).append("<section>"+portrait+"</section>"+
					((inclandscape) ? "<section>"+landscape+"</section>" : ""));
			}
		});
	},
	updateSizeInfo: function (w, h) {
		this.screen.data('width', w);
		this.screen.data('height', h);
		$('#current-size').html(w+'px * '+h+'px ('+(w/16)+'em * '+(h/16)+'em)');
	},
	newBreakpoint: function (w, h) {
		this.screen.width(w + this.scrollWidth)
			.height(h);
		this.updateSizeInfo(w, h);	
	},
	randomBreakpoint: function (l, u) {
		var lower = l || 320,
			upper = u || this.maxScreen,
			width = Math.round(Math.random() * (upper - lower)) + lower,
			upper = u || 1280;
			height = Math.round(Math.random() * (upper - lower)) + lower;

		this.newBreakpoint(width, height);
	}
}

$(function(){
	breakpoints.init();

	$('.device-menu').on('click', 'a', function(e) {
		e.preventDefault();

		var $this = $(this),
			height = parseInt($this.data('height')),
			width = parseInt($this.data('width'));

		breakpoints.newBreakpoint(width, height);
	});

	$('#randomBreakpoint').on('click', function(){
		breakpoints.randomBreakpoint();
	});

	$('body').on('click', '#help', function(e) {
		e.preventDefault();
		$('body').addClass('is-help');
		$(this).siblings('.overlay').removeClass('is-hidden');
	});

	$('body').on('click', '.close', function(e){
		e.preventDefault();
		$(this).parents('.overlay').addClass('is-hidden');
		$('body').removeClass('is-help');
	});

	var ticking = false;

	function requestResize (x, y) {
		if (!ticking) {
			window.requestAnimationFrame(function(){
				breakpoints.newBreakpoint(x, y)
				ticking = false;
			});
			ticking = true;
		}
	}

	$('body').on('mousedown', '#screen', function(e){
		var pageX = e.pageX,
			pageY = e.pageY;

		breakpoints.screen.addClass('instant-resize');

		$(window).on('mousemove', function(e){
			requestResize(
				parseInt(breakpoints.screen.data('width'), 10) + (e.pageX - pageX)*2,
				parseInt(breakpoints.screen.data('height'), 10) + e.pageY - pageY
			);
			pageX = e.pageX;
			pageY = e.pageY;
		});
	}).on('mouseup', function(){
		$(window).off('mousemove');
		breakpoints.screen.removeClass('instant-resize')
	});
});