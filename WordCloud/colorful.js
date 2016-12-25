/* requires mathematics.js for:
	convert_scale()
	sine_wave()
	range_limit()
*/

var colorIndex = [];

var hue_to_rgb = function (hue)
{
	hue = Math.round(hue);

	if (colorIndex[hue] instanceof Array)
	{
		return colorIndex[hue];
	}

	var rgb = [];
	rgb[0] = (range_limit(sine_wave(hue, 67, 360, 30, 67), 0, 100) * 255 / 100).toFixed(0);
	rgb[1] = (range_limit(sine_wave(hue, 61, 360, 320, 39), 0, 100) * 255 / 100).toFixed(0);
	rgb[2] = (range_limit(sine_wave(hue, 70, 360, 180, 0), 0, 100) * 255 / 100).toFixed(0);

	colorIndex[hue] = [rgb, rgbString(rgb)];

	return colorIndex[hue];
}

var rgbString = function (rgb)
{
	return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
}

var number_to_rgb = function ()
{
	return hue_to_rgb(convert_scale.apply(null, arguments));
}
