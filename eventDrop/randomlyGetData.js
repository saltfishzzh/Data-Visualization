var data = [
	{ name: "http requests", dates: []},
	{ name: "SQL queries", dates: []},
	{ name: "cache invalidations", dates: []},
];

var endTime, startTime;

var getData = function () {
	endTime = new Date(2016,11,31);
	var day = 24 * 60 * 60 * 1000;
	startTime = endTime - 365 * day;
	// startTime = new Date(16, 1, 1);
	// console.log(startTime);
	var maxNum = 200;
	for (var i = 0; i < data.length; i++) {

		var max = Math.floor(Math.random() * maxNum);
		for (var j = 0; j < max; j++) {
			var time = Math.ceil(Math.random() * (endTime - startTime)) + startTime;
			// console.log(time);
			// console.log(new Date(time));
			data[i].dates.push(new Date(time));
			// debugger;
		}
	}
	console.log(data);
	return data
}