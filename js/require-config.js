requirejs.config({
	baseUrl: '/',
	paths: {
		jquery: 	   'bower_components/jquery/dist/jquery',
		handlebars:    'bower_components/handlebars/handlebars',
		underscore:    'bower_components/underscore/underscore',
		text: 		   'bower_components/requirejs-text/text',
		velocity:      'bower_components/velocity/velocity',
		moment:        'bower_components/moment/moment',
		facebook:      '//connect.facebook.net/en_US/sdk'
	} 
	, shim: {
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'velocity': {
			deps: [ "jquery" ]
		},
		'facebook': {
			exports: 'FB'
		}
	}
});