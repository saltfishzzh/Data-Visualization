var left = 200,
	up = 100,
	width = 500,
	_y = 70;
var getSVG = function () {
	return document.getElementById("EventDrop");
}
var createCircle = function (x, y, r, color, opacity = 0.5) {
	var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
	var svg = getSVG();
	// console.log(document.getElementsByTagName("svg")[0]);
	c.setAttribute("cx", x);
	c.setAttribute("cy", y);
	c.setAttribute("r", r);
	c.setAttribute("fill", color);
	c.setAttribute("opacity", opacity);
	c.setAttribute("user-select", "none");
	svg.appendChild(c);
	return c;
}
var createRect = function (x, y, w, h) {
	var c = document.createElementNS("http://www.w3.org/2000/svg","rect");
	var svg = getSVG();
	// console.log(document.getElementsByTagName("svg")[0]);
	c.setAttribute("x", x);
	c.setAttribute("y", y);
	c.setAttribute("width", w);
	c.setAttribute("height", h);
	// console.log(c);
	c.setAttribute("fill", "white");
	c.setAttribute("stroke", "#ccc");
	c.setAttribute("class", "unselect");
	svg.appendChild(c);
	return c;
}
var createText = function (text, x, y, textAnchor, baseline) {
	var svg = getSVG();
	var t = document.createElementNS("http://www.w3.org/2000/svg","text");
	t.innerHTML = text;
	t.setAttribute("text-anchor", textAnchor);
	if (baseline)
		t.setAttribute("dominant-baseline", baseline);
	t.setAttribute("x", x);
	t.setAttribute("y", y);
	t.setAttribute("font-size", 20);
	t.setAttribute("class", "unselect");
	svg.appendChild(t);
	return t;
}
var createLine = function (x1, y1, x2, y2) {
	var l = document.createElementNS("http://www.w3.org/2000/svg","line");
	var svg = getSVG();
	l.setAttribute("x1", x1);
	l.setAttribute("y1", y1);
	l.setAttribute("x2", x2);
	l.setAttribute("y2", y2);
	l.setAttribute("stroke", "black");
	l.setAttribute("user-select", "none");
	svg.appendChild(l);
}
var displayChartFlame = function () {
	for (var i = 0; i <= data.length; i++) {
		createLine(left, up+i*_y, left+width, up+i*_y);
	}
	for (var i = 0; i < data.length; i++) {
		createText(data[i].name, left, up+i*_y+_y/2, "end", "middle");
	}
}
var data = getData();
console.log(data);
var scaler = Scaler(data);
window.onload = function () {
	displayChartFlame();
	scaler.display();

}