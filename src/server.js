var st = require('st');
var http = require('http');

var PORT = 8080;
var cache = {
	static : {
		server : 10,
		client : 10,
		mem : 5
	},
	images : {
		server : 20,
		client : 20,
		mem : 5
	},
};

// very short for development
cache = {static : {server : 1, client : 1, mem : 1}, images : {server : 1, client : 1, mem : 1}};

var static_path = __dirname + '/../public/';
var images_path = __dirname + '/../images/';

var static_files = st({
	                      path : static_path, // resolved against the process cwd
	                      url : '/', // defaults to '/'

	                      cache : { // specify cache:false to turn off caching entirely 
		                      fd : {
			                      max : 1000, // number of fd's to hang on to
			                      maxAge : 1000 * cache.static.server, // amount of ms before fd's expire
		                      },
		                      stat : {maxAge : 1000 * cache.static.server},
		                      content : {
			                      max : 1024 * 1024 * cache.static.mem, // how much memory to use on caching contents
			                      maxAge : 1000 * cache.static.client, // how long to cache contents for
			                      // if `false` does not set cache control headers
			                      cacheControl : 'public, max-age=' + cache.static.client // to set an explicit cache-control
			                      // header value
		                      }
	                      },

	                      // indexing options
	                      index : true, // auto-index, the default
	                      // index : 'index.html', 
	                      dot : false, // default: return 403 for any url with a dot-file part
	                      passthrough : true, // calls next/returns instead of returning a 404 error
	                      gzip : true // default: compresses the response with gzip compression
                      });
var image_files = st({
	                     path : images_path, // resolved against the process cwd
	                     url : 'images/', // defaults to '/'

	                     cache : { // specify cache:false to turn off caching entirely 
		                     fd : {
			                     max : 1000, // number of fd's to hang on to
			                     maxAge : 1000 * cache.images.server // amount of ms before fd's expire
		                     },
		                     stat : {maxAge : 1000 * cache.images.server},
		                     content : {
			                     max : 1024 * 1024 * cache.images.mem, // how much memory to use on caching contents
			                     maxAge : 1000 * cache.images.client, // how long to cache contents for
			                     // if `false` does not set cache control headers
			                     cacheControl : 'public, max-age=' + cache.images.client // to set an explicit cache-control
			                     // header value
		                     }
	                     },

	                     // indexing options
	                     index : false, // auto-index, the default
	                     dot : false, // default: return 403 for any url with a dot-file part
	                     passthrough : true, // calls next/returns instead of returning a 404 error
	                     gzip : true // default: compresses the response with gzip compression
                     });

// with bare node.js
http.createServer(function(req, res) {
	static_files(req, res, function() {

		if (image_files(req, res)) {
			console.log("serving image");
			return
		} // serving a static file
		console.log("serving dynamic");

		res.end("wazzup?");
	})
}).listen(PORT, function() {
	console.log("server listening on " + PORT);
})
 