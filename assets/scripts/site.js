function getScrollBarWidth () {
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
};

$(function(){
	var scrollWidth = getScrollBarWidth(),
		$screen = $('#screen');

	$screen.width($screen.width()+scrollWidth);

	setTimeout(function() {
		$screen.addClass('loaded');
	}, 100);

	$('.device-menu').on('click', 'a', function(e) {
		e.preventDefault();

		var $this = $(this),
			height = parseInt($this.data('height')),
			width = parseInt($this.data('width')) + scrollWidth;

		$screen.width(width)
			.height(height);
	});

	$.ajax({
		url: "/stats.php",
		success: function(data) {
			var output = "",
				dm;
			$($.parseXML(data)).find('set').each(function(){
				dm = this.attributes.label.nodeValue;
				if (dm != "Other")
					output += '<a href="#" data-width="'+dm.substring(0, dm.indexOf('x'))+'" data-height="'+dm.substring(dm.indexOf('x')+1, dm.length)+'">' + dm + '</a>';
			})
			$('#popular-sizes').append(output);
		}
	});
});