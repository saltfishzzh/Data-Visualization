var sine_wave = function (x, amplitude, period, shift, midline)
{
	return amplitude * Math.sin((2*Math.PI / period) * (x + shift)) + midline;
}

var range_limit = function (x, lower, upper)
{
	return Math.min(Math.max(x, lower), upper);
}

var convert_scale = function (a, a_min, a_max, b_min, b_max, flip)
{
	// convert a to percentage
	// p = (a - min) / (max - min)
	var p = (a - a_min) / (a_max - a_min);

	// convert percentage to b
	// b = p * (max - min) + min
	var b = p * (b_max - b_min) + b_min;

	if (flip == 1)
	{
		// flip b to other end of scale
		// 1. find the middle of scale:  (max - min) / 2 + low
		var middle = (b_max - b_min) / 2 + b_min;
		// 2. find the distance from middle to b:  b - middle
		var distance = b - middle;
		// 3. double the distance and subtract from b:  b - distance * 2
		var b = b - middle * 2;
	}

	return b;
}

var random_integer = function (min, max)
{
	var x = (Math.random() * (max - min) + min).toFixed(0);
	return x;
}