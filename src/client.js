"use strict";

var IconMaker = function() {
	if (!(this instanceof IconMaker)) { 
		return new IconMaker();
	} 
}

window.IconMaker = IconMaker;
 
IconMaker.make = require('./generator');