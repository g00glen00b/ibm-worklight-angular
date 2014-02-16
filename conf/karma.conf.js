/*jslint nomen: true */
/*jslint node: true */
/*globals module */
"use strict";

module.exports = function (config) {

    config.set({
        basePath: '../',
        frameworks: [ 'jasmine' ],

        files: [
			'libs/jQuery/dist/jquery.js',
			'libs/angular/angular.js',
			'libs/angular-mocks/angular-mocks.js',
			'libs/angular-resource/angular-resource.js',
			'libs/underscore/underscore.js',
			'libs/ionic/dist/js/ionic.js',
			'libs/ionic/dist/js/ionic-angular.js',
			'libs/momentjs/moment.js',
            
			'app/app.js',
			'app/services/*.js',
			'app/filters/*.js',
			'app/controllers/*.js',

			'tests/**/*.spec.js'
		],

		preprocessors: {
			'**/*.html': 'ng-html2js'
		},
        ngHtml2JsPreprocessor: {

        },
        
        exclude: [],

        logLevel: config.LOG_INFO,

        port: 9876,
        browsers: [ 'PhantomJS' ],
        reporters: [ 'progress' ]
    });
};