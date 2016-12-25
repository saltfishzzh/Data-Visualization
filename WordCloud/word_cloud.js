/*
requires mathematics.js for:
	convert_scale()

requires colorful.js for:
	number_to_rgb()
*/

if (typeof $ == 'undefined') {var $ = function (id) {return document.getElementById(id);}}

function word_cloud()
{
	this.cloudId = 'word_cloud';
	this.n = 0;
	this.count_min = Infinity;
	this.count_max = -Infinity;
	this.words = [];

	// color control
	const CLOCK = 1;
	const COUNTER_CLOCK = 0;
	this.color_mode = CLOCK;
	this.hue_min = 0;
	this.hue_max = this.hue_min - 100;
	this.colors = [];
	this.colorsEnabled = true;

	// font control
	const HIGH_IS_BIG = 0;
	const HIGH_IS_SMALL = 1;
	this.font_mode = HIGH_IS_BIG;
	this.font_min = 10;
	this.font_max = 150;
	this.fontSizes = [];
	this.fontSizesEnabled = true;

	this.addWords = function (words)
	{
		var resetNeeded = false;

		for (var word in words)
		{
			if (typeof this.words[word] == 'undefined')
			{
				this.words[word] = words[word];
				this.n++;
			}
			else
			{
				this.words[word] += words[word];
			}
			
			var count = this.words[word];

			if (count < this.count_min)
			{
				this.count_min = count;
				resetNeeded = true;
			}

			if (count > this.count_max)
			{
				this.count_max = count;
				resetNeeded = true;
			}
		}

		if (resetNeeded === true) {this.reset();}
	}
	
	this.render = function ()
	{
		for (var word in this.words)
		{
			this.renderWord(word);
		}
	}

	this.renderWord = function (word)
	{
		var id = this.cloudId + '-' + word;
		var count = this.words[word];
		var innerHTML = word + '<sup>{' + count + '}</sup>';

		if ($(id) == null)
		{
			var html = document.createElement('span');
			html.id = id;
			html.setAttribute('class', this.cloudId);
			
			$(this.cloudId).insertBefore(html, $(this.cloudId).childNodes[random_integer(0, this.n-1)]);
		}

		$(id).innerHTML = innerHTML;

		if (this.colorsEnabled === true)
		{
			var color = this.getColor(count);
			$(id).style.color = color;
		}

		if (this.fontSizesEnabled === true)
		{
			var fontSize = this.getFontSize(count);
			$(id).style.fontSize = fontSize;
		}
	}

	this.reset = function ()
	{
		if (this.colorsEnabled === true)
		{
			this.resetColors();
		}
		
		if (this.fontSizesEnabled === true)
		{
			this.resetFontSizes();
		}
	}

/* colors */
	this.resetColors = function ()
	{
		this.colors = [];
		this.getColor(this.count_min);
		this.getColor(this.count_max);
	}

	this.getColor = function (count)
	{
		if (typeof this.colors[count] == 'undefined')
		{
			var color = number_to_rgb(
				count, this.count_min, this.count_max, this.hue_min, this.hue_max, this.color_mode
			)[1];

			this.colors[count] = color;
		}

		return this.colors[count];
	}
	
/* fontSizes */
	this.resetFontSizes = function ()
	{
		this.fontSizes = [];
		this.getFontSize(this.count_min);
		this.getFontSize(this.count_max);
	}
	
	this.getFontSize = function (count)
	{
		if (typeof this.fontSizes[count] == 'undefined')
		{
			var fontSize = convert_scale(
				count, this.count_min, this.count_max, this.font_min, this.font_max, this.font_mode
			).toFixed(0) + 'px';

			this.fontSizes[count] = fontSize;
		}

		return this.fontSizes[count];
	}
}
