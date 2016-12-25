var offSet = 0;
var zoom = 1;
var Scaler = function (data) {
	var r = {};
	r.Ruler = width - 20;
	var getTimeAxis = function () {
		var createTag = function(text, x, y) {
			// console.log(x);
			var t = createText(text, x, y, "middle");
			t.originx = x;
			return t;
		}
		var d = r.Ruler / 12;
		var a = [];
		// console.log("d" + d);
		a.push(createTag("2016", 0, up-20));
		a.push(createTag("Feb", Math.ceil( (2-1)*d), up-20));
		a.push(createTag("Mar", Math.ceil( (3-1)*d), up-20));
		a.push(createTag("Apr", Math.ceil( (4-1)*d), up-20));
		a.push(createTag("May", Math.ceil( (5-1)*d), up-20));
		a.push(createTag("June", Math.ceil( (6-1)*d), up-20));
		a.push(createTag("July", Math.ceil( (7-1)*d), up-20));
		a.push(createTag("Aug", Math.ceil( (8-1)*d), up-20));
		a.push(createTag("Sept", Math.ceil( (9-1)*d), up-20));
		a.push(createTag("Oct", Math.ceil( 9*d), up-20));
		a.push(createTag("Nov", Math.ceil( 10*d), up-20));
		a.push(createTag("Dec", Math.ceil( 11*d), up-20));
		a.push(createTag("2017", Math.ceil( 12*d), up-20));
		for (var i = 0; i < 13; i++) {
			a.push(createTag("|", Math.ceil(i*d), up));
		}
		return a;
	}
	var visibility = function (att, o) {
		att.rect.setAttribute("stroke-opacity", o);
		att.rect.setAttribute("fill-opacity", o)
		att.circle.setAttribute("opacity", o);
		att.t1.setAttribute("opacity", o);
		att.t2.setAttribute("opacity", o);
	}
	var attTransform = function (att, move ) {
		for (var obj in att) {
			att[obj].setAttribute("transform", "translate(" + move +",0)");
		}
	}
	var setMouseListener = function (c) {
		c.onmousemove = function () {
			// console.log(c);
			if (c.getAttribute("opacity")) {
				// console.log("here");
				var move = c.getAttribute("cx") - c.originx;
				attTransform(c.att, move);
				visibility(c.att, 1);
			}
		}
		c.onmouseout = function () {
			visibility(c.att, 0); 
		}
	}
	var getSeries = function (index, data) {
		// console.log(data);
		var createAttr = function (x, y, i, _data) {
			var r = createRect(x-70, y+10, 140, 40);
			// console.log(r);
			var c = createCircle(x, y + 5, 5, "#ccc", 1);
			var att = {};
			var t1 = createText("id: "+i, x-70, y+20, "start", "middle");
			var text = "day: 2016." + (_data.getMonth() + 1) + "." + (_data.getDate());
			var t2 = createText(text, x-70, y+40, "start", "middle");
			att.rect = r, att.circle = c, att.t1 = t1, att.t2 = t2;
			visibility(att, 0);
			// debugger;
			return att;
		}
		var a = [];
		var data = data[index].dates;
		// console.log(data.length);
		for (var i = 0; i < data.length; i++) {
			var x, y, color;
			console.log(new Date(startTime));
			x = (data[i] - startTime) / (endTime - startTime) * r.Ruler;
			if (index == 0) {y = cy1; color = "#1f77b4"; }
			else if (index == 1) {y = cy2; color = "#ff7f0e"; }
			else if (index == 2) {y = cy3; color = "#2ca02c"; }
			// console.log(color);
			var c = createCircle(x, y, 5, color);
			c.originx = x;
			// debugger;
			c.att =  createAttr(x, y, i, data[i]);
			setMouseListener(c);
			a.push(c);
		}
		// console.log(a);
		// debugger;
		return a;
	}
	var display = function () {
		var toCenter = left + width / 2 - r.Ruler / 2 * zoom + offSet * r.Ruler / 2;
		console.log(toCenter);
		console.log(r.Ruler + toCenter);
		for (var i = 0; i < series.length; i++) {
			for (var j = 0; j < series[i].length; j++) {
				// console.log("origin " + series[i][j].originx);
				var x = series[i][j].originx * zoom + toCenter;
				// console.log("x " + x);
				if (x >= left + 10 && x <= left + width - 10) {
					series[i][j].setAttribute("cx", x);
					series[i][j].setAttribute("opacity", 0.5);
					// console.log("hello");
				} else {
					series[i][j].setAttribute("opacity", 0);
				}
			}
		}
		console.log(timeAxis[0].originx * zoom + toCenter);
		console.log(timeAxis[12].originx * zoom + toCenter);
		for (var i = 0; i < timeAxis.length; i++) {
			var x = timeAxis[i].originx * zoom + toCenter;
			if (x >= left + 10 && x <= left + width - 10) {
				timeAxis[i].setAttribute("x", x);
				timeAxis[i].setAttribute("opacity", 1);
			} else {
				timeAxis[i].setAttribute("opacity", 0);
			}
		}
	}
	var cy1 = up + _y/2,
		cy2 = up + 1 * _y + _y/2,
		cy3 = up + 2 * _y + _y/2;
	var series = [getSeries(0, data), getSeries(1, data), getSeries(2, data)];
	var timeAxis = getTimeAxis();
	r.display = display;

	return r;
}
var setVision = function (p) {
	offSet = p;
	scaler.display();
}
var setZoom = function (p) {
	zoom = p;
	scaler.display();
}