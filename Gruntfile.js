module.exports = function (grunt) {
	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		build: 'build'
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: config,

		clean: {
			xml: ['stats.xml', 'stats-desktop.xml'],
			build: ['build']
		},

		copy: {
			build: {
				expand: true,
				cwd: '<%= config.app %>',
				src: [
					'{,*}.*',
					'assets/php/*'
				],
				dest: '<%= config.build %>'
			}
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

		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/assets/images',
					src: ['*.{png,jpg,gif}'],
					dest: '<%= config.build %>/assets/images'
				}]
			}
		},

		useminPrepare: {
			html: '<%= config.app %>/index.php',
			options: {
				flow: {
					html: {
						steps: {
							'css': ['cssmin'],
							'js': ['uglifyjs']
						},
						post: {}
					}
				},
				root: '<%= config.app %>',
				dest: '<%= config.build %>'
			}
		},

		usemin: {
			html: '<%= config.build %>/index.php'
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

	grunt.registerTask('default', ['build:css', 'watch']);

	grunt.registerTask('build', 'Build all or part of the app', function(target) {
		var tasks = {
			css: ['sass', 'autoprefixer'],
			minify: ['useminPrepare', 'cssmin', 'uglify', 'usemin'],
			default: [
				'clean:build',
				'copy:build',
				'build:css',
				'build:minify',
				'imagemin:build'
			]
		};

		grunt.task.run(tasks[target] || tasks['default']);
	});

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

		grunt.task.run(['clean:xml', 'curl', 'xml_validator']);
	});

	grunt.registerTask('test', ['eslint', 'validate-xml']);
};