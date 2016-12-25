var year = 1800;
var now = new Array(nation.length);
var index = 0;
nation.forEach(function(d) {
	now[index] = new Object;
	now[index].region = d.region;
	now[index].name = d.name;
	index++;
})


var setYear = function(d) {
	year = d;
}

var setColor = function() {
	now.forEach(function(d) {
		flag = 1;
		now.forEach(function(dd) {
			if (dd.region == d.region && dd.color && flag) {
				d.color = dd.color;
				flag = 0;
			}
		});
		if (flag) {
			d.color = d.color = "#";
			for (var i = 0; i < 6; i++) d.color =d.color + '0123456789abcdef'[Math.floor(Math.random()*16)];
		}
	});
}

var findData = function(year, now) {
	var i = 0;
	nation.forEach(function(d) {
		d.income.forEach(function(p) {
			if (year == p[0]) {
				now[i].curIncome = p[1];
				console.log(p[1]);
			}
		});
		d.population.forEach(function(p) {
			if (year == p[0]) {
				now[i].curpopu = p[1];
			}
		});
		d.lifeExpectancy.forEach(function(p) {
			if (year == p[0]) {
				now[i].curlife = p[1];
			}
		});
		i++;
	});
}

var displayCircle = function (d) {
	if (!(d.x > 0 && d.y > 0)) return;
	var circle = d.Circle;
	var svg = document.getElementById("scatterplot");
	circle.setAttribute("cx", Math.sqrt(d.x * 20));
	circle.setAttribute("cy", d.y * 5 + 50);
	circle.setAttribute("r", Math.sqrt(d.curpopu/200000));
	circle.setAttribute("stroke", "black");
	circle.setAttribute("fill", d.color);
	svg.appendChild(circle);
}


function display(year, now) {
	now.forEach(function (d) {
		d.x = d.curIncome;
		d.y = d.curlife;
		d.r = d.curpopu;
		d.Circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		d.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		d.displayCircle = displayCircle;
		d.g.appendChild(d.Circle);
		d.displayCircle(d);
	});
}

function changeData(year, now) {
	now.forEach(function (d) {
		d.x = d.curIncome;
		d.y = d.curlife;
		d.r = d.curpopu;
		d.displayCircle = displayCircle;
		d.displayCircle(d);
	});
}

window.onload = function() {
	findData(year, now);
	display(year, now);
	setInterval(function () {
		findData(year, now);
//		display(year, now);
		changeData(year, now);
//		if (year == 2009) clearInterval(2);
	}, 2);
}

