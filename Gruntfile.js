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

		watch: {
			css: {
				files: ['<%= config.app %>/assets/scss/{,*/}*.scss'],
				tasks: ['build:css']
			}
		}
	});

	grunt.registerTask('default', ['build', 'watch']);

	grunt.registerTask('build', ['sass', 'autoprefixer']);
};