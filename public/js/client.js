/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var IconMaker = function() {
		if (!(this instanceof IconMaker)) { 
			return new IconMaker();
		} 
	}

	window.IconMaker = IconMaker;
	 
	IconMaker.make = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var randMaker = __webpack_require__(2);

	module.exports = function generate(seed, options) {
		options = options || {}
		var scale = options.scale || 5;
		var size = options.size || 11;
		var rand = randMaker(seed + size);

		var imageData = generateData(rand, size);

		// random color MUST be after data generation else the data generated is dependand on wether color is provided
		var color = options.color || makeColor(rand);

		return makeCanvas(imageData, scale, color, options.background);
		;
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


	function makeCanvas(data, scale, color, background) {
		var canvas = document.createElement('canvas');
		var width = Math.sqrt(data.length);
		var i;

		canvas.width = canvas.height = width * scale;

		var ctx = canvas.getContext('2d');
		// transparent
		if (background) {
			ctx.fillStyle = background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
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

	 
	 


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";


	module.exports = function randomizerMaker(seed, min, max) {
		min = min || 0;
		max = max || 1;
		var round = max != 1;
		var pos = 0;

		var sum = 0;
		var data = (  seed + "").split('').map(function(x) {
			var val = x.charCodeAt(0);
			sum += val;
			return val;
		})

		data = data.map(function(x) {
			sum += Math.sin(sum) * 100;
			return x + Math.sin(sum);
		})


		return function rand() {
			var result = Math.abs((Math.sin(data[pos])) * 1337);
			if (round) {
				result = min + (result - (result | 0)) * (max+1); 
			} else {
				result = min + (result - (result | 0)) * max;
			}

			// make this point diffent next time
			data[pos] = data[pos] + 3.1;
			// move pointer to next position
			pos = data.length - 1 == pos ? 0 : pos + 1;

			return round ? result | 0 : result;
		}
	} 

/***/ }
/******/ ])