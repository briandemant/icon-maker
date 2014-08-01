"use strict";

var randMaker = require('./randomizer');

module.exports = function generate(seed,options) {
	var rand = randMaker(seed);
	options = options || {}
	var scale = options.scale || 5;
	var size = options.size || 11;
	
	var imageData = generateData(rand, size); 
	
	// random color MUST be after data generation else the data generated is dependand on wether color is provided
	var color = options.color || makeColor(rand);
	 
	return makeCanvas(imageData, scale, color);;
}

module.exports._exposed = {
	makeColor : makeColor,
	generateData : generateData,
	makeCanvas : makeCanvas
}

function makeColor(rand) {
	var hue = (rand() * 360 | 0);              //  0 - 360 degrees
	var saturation = ((rand() * 100 | 0) + 0); // 50 - 100%

	                                           // these colors "work" on white and black
	var light = ((rand() * 30 | 0) + 35);      // 30 - 70%
	return "hsl( " + hue + ", " + saturation + "%, " + light + "%)";
}

function generateData(rand, size) {
	size = size || 15;
	var midPoint = Math.ceil(size / 2);
	var data = [];
	var i, j;
	for (i = 0; i < size; i++) { 
		for (j = 0; j < midPoint; j++) {
			var onoff = rand() >= 0.5;
			data[i * size + j] = onoff;
			data[i * size + size - j - 1] = onoff; // mirror / reverse
		}
	}

	return data;
}
 

function makeCanvas(data, scale, color) {
	var canvas = document.createElement('canvas');
	var width = Math.sqrt(data.length);
	var i;

	canvas.width = canvas.height = width * scale;

	var ctx = canvas.getContext('2d');
	// transparent
	//	ctx.fillStyle = '#fff';
	//	ctx.fillRect(0, 0, canvas.width, canvas.height); 
	ctx.fillStyle = color;

	for (i = 0; i < data.length; i++) {
		var row = Math.floor(i / width);
		var col = i % width; 
		if (data[i]) {
			ctx.fillRect(col * scale, row * scale, scale, scale);
		}
	}

	return canvas;
}

 
 
