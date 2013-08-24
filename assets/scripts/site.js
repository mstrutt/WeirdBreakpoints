var breakpoints = {
	init: function () {
		var self = this;

		self.scrollWidth = self.getScrollBarWidth(),
		self.screen.width(self.screen.width()+self.scrollWidth);

		setTimeout(function() {
			self.screen.addClass('loaded');
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
					var landscape = "<h2>Landscape</h2>";
						portrait = "<h2>Portrait</h2>";
				}

				$($.parseXML(data)).find('set').each(function(){
					dm = this.attributes.label.nodeValue;
					if (dm != "Other") {
						w = dm.substring(0, dm.indexOf('x'));
						h = dm.substring(dm.indexOf('x')+1, dm.length);
						portrait += '<a href="#" data-width="'+w+'" data-height="'+h+'">' + dm + '</a>';
						if (inclandscape)
							landscape += '<a href="#" data-width="'+h+'" data-height="'+w+'">' + h+'x'+w + '</a>';
						if (self.maxScreen < Math.max(w, h))
							self.maxScreen = Math.max(w, h);
					}
				});
				$('#'+id).append("<section>"+portrait+"</section>"+
					((inclandscape) ? "<section>"+landscape+"</section>" : ""));
			}
		});
	},
	newBreakpoint: function (w, h) {
		this.screen.width(w + this.scrollWidth)
			.height(h);
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
});