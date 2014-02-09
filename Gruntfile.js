/*jslint nomen: true */
/*jslint node: true */
/*globals module, require */
"use strict";

module.exports = function (grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		watch: {
			options: {
				livereload: true
			},
			files: [ 'src/**/*.js', 'libs/**/*.js' ],
            tasks: [ 'jshint:all' ]
        },
		jshint: {
			options: {
				'jshintrc': true,
				reporter: require('jshint-stylish')
			},
			all: {
                files: {
                    src: [ 'app/**/*.js', 'conf/**/*.js', 'Gruntfile.js', 'tests/**/*.js' ]
                }
            }
		},
		karma: {
			options: {
				configFile: 'conf/karma.conf.js',
				autoWatch: true
            },

            unit: {
                singleRun: true
            },
            continuous: {
                singleRun: false
            }
        }
	});
	
	grunt.registerTask('test', [ 'jshint:all', 'karma:unit' ]);
	grunt.registerTask('test:continuous', [ 'watch', 'karma:continuous' ]);
};