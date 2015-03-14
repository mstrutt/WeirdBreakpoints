module.exports = function (grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Configurable paths
	var config = {
		app: 'app'
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: config,

		clean: {
			xml: ['stats.xml', 'stats-desktop.xml']
		},

		sass: {
			build: {
				files: {
					'<%= config.app %>/assets/css/app.css': '<%= config.app %>/assets/scss/app.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 3 version']
			},
			main: {
				src: '<%= config.app %>/assets/css/app.css',
				dest: '<%= config.app %>/assets/css/app.css'
			}
		},

		eslint: {
			app: {
				src: [
					'<%= config.app %>/assets/scripts/*.js'
				]
			}
		},

		xml_validator: {
			stats: {
				src: [ 'stats.xml', 'stats-desktop.xml' ]
			},
		},

		watch: {
			css: {
				files: ['<%= config.app %>/assets/scss/{,*/}*.scss'],
				tasks: ['build:css']
			}
		}
	});

	grunt.registerTask('default', ['build', 'watch']);

	grunt.registerTask('build', ['sass', 'autoprefixer']);

	grunt.registerTask('validate-xml', 'Curls and validates stats.xml, optionally pass in domain', function(target) {
		if (!target) {
			target = '127.0.0.1:8000';
		}

		target = 'http://' + target;

		curl = {
			'stats.xml': target + '/stats.php',
			'stats-desktop.xml': target + '/stats-desktop.php'
		};

		grunt.config('curl', curl);

		grunt.task.run(['clean', 'curl', 'xml_validator']);
	});

	grunt.registerTask('test', ['eslint', 'validate-xml']);
};