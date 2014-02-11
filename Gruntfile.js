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
		},
		clean: {
            build: [ 'dist' ]
		},
		cssmin: {
			build_app: {
				files: {
					'dist/assets/css/style.min.css': [ 'assets/**/*.css' ]
				}
			}
		},
		htmlmin: {
			build: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					src: '*.html',
					dest: 'dist'
				}]
			}
		},
		copy: {
			build: {
				files: [{
					expand: true,
					src: [ 'libs/**' ],
					dest: 'dist/'
				}]
			}
		},
		uglify: {
			build: {
				files: {
					'dist/app/app.min.js': [
						'app/app.js', 'app/filters/*.js', 'app/services/*.js', 'app/controllers/*.js',
						'dist/app/templates.js'
					]
				}
			}
		},
		bower_concat: {
			build: {
				dest: 'dist/libs/libs.js',
				mainFiles: {
					'angular-gestures': '../../gestures.min.js'
				}
			}
		},
		ngtemplates: {
			build: {
				src: 'app/**/*.html',
				dest: 'dist/app/templates.js',
				options: {
					module: 'yataApp',
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					}
				}
			}
		}
	});
	
	grunt.registerTask('test', [ 'jshint:all', 'karma:unit' ]);
	grunt.registerTask('test:continuous', [ 'karma:continuous' ]);
	grunt.registerTask('build', [
		'clean:build', 'ngtemplates:build', 'uglify:build', 'cssmin:build_app', 'htmlmin:build', 'copy:build'
	]);
};