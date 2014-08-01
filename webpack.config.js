module.exports = {
	context : __dirname,
	entry : { client : "./src/client.js", tests : "./test/tests.js" } ,
	output : {
		path : __dirname + "/public/js",
		filename : "[name].js"
	}
};