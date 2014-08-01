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