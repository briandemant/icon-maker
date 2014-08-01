!function(t) {
	function e(r) {
		if (n[r]) {
			return n[r].exports;
		}
		var o = n[r] = {exports : {}, id : r, loaded : !1};
		return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
	}

	var n = {};
	return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
	"use strict";
	var r = function() {return this instanceof r ? void 0 : new r};
	window.IconMaker = r, r.make = n(5)
}, , , function(t) {
	"use strict";
	t.exports = function(t, e, n) {
		e = e || 0, n = n || 1;
		var r = 1 != n, o = 0, i = 0, s = (t + "").split("").map(function(t) {
			var e = t.charCodeAt(0);
			return i += e, e
		});
		return s = s.map(function(t) {return i += 100 * Math.sin(i), t + Math.sin(i)}), function() {
			var t = Math.abs(1337 * Math.sin(s[o]));
			return t = r ? e + (t - (0 | t)) * (n + 1) : e + (t - (0 | t)) * n, s[o] = s[o] + 3.1, o = s.length - 1 == o ? 0 : o + 1, r ? 0 | t : t
		}
	}
}, , function(t, e, n) {
	"use strict";
	function r(t) {
		var e = 360 * t() | 0, n = (100 * t() | 0) + 0, r = (30 * t() | 0) + 35;
		return "hsl( " + e + ", " + n + "%, " + r + "%)"
	}

	function o(t, e) {
		e = e || 15;
		var n, r, o = Math.ceil(e / 2), i = [];
		for (n = 0; e > n; n++) {
			for (r = 0; o > r; r++) {
				var s = t() >= .5;
				i[n * e + r] = s, i[n * e + e - r - 1] = s
			}
		}
		return i
	}

	function i(t, e, n) {
		var r, o = document.createElement("canvas"), i = Math.sqrt(t.length);
		o.width = o.height = i * e;
		var s = o.getContext("2d");
		for (s.fillStyle = n, r = 0; r < t.length; r++) {
			var a = Math.floor(r / i), u = r % i;
			t[r] && s.fillRect(u * e, a * e, e, e)
		}
		return o
	}

	var s = n(3);
	t.exports = function(t, e) {
		var n = s(t);
		e = e || {};
		var a = e.scale || 5, u = e.size || 11, c = o(n, u), l = e.color || r(n);
		return i(c, a, l)
	}, t.exports._exposed = {makeColor : r, generateData : o, makeCanvas : i}
}]);