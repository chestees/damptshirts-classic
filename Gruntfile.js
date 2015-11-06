module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		, less: {
			dev: {
				options: {
				compile: true,
				compress: true
			},
			files: {
				"css/style.css": "css/style.less"
				} 
			}
		}
		, requirejs: {
			compile: {
				options: {
					baseUrl: "./public",
					mainConfigFile: "./public/js/require-config.js",

					name: "js/app-start",
					include: [],
					insertRequire: ['js/app-start'],
					out: "./public/js/o.js",
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Default task(s).
	grunt.registerTask( 'default', [ 'less:dev' ] );
	grunt.registerTask( 'default', [ 'requirejs' ] );
};