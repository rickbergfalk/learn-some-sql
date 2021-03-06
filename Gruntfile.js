module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), // Loads package.json into grunt so it has those variables available if needed
		concat: {
			options: {
				separator: ';'
			},
			// https://github.com/gruntjs/grunt/wiki/Configuring-tasks 
			dist: {
				files: {
					'public/javascripts/everyone.js': [
						'public/javascripts/vendor/jquery-1.9.1.min.js',
						'public/javascripts/vendor/jquery-migrate-1.1.1.js',
						'public/javascripts/vendor/bootstrap.min.js',
						'public/javascripts/vendor/underscore-min.js',
						//'public/javascripts/vendor/codemirror-2.24-sql-runmode.js',
						'public/javascripts/vendor/codemirror-3.02.js',
						'public/javascripts/vendor/codemirror-3.02-addon-runmode.js',
						'public/javascripts/vendor/codemirror-3.02-mode-sql.js',
						'public/javascripts/models/lesson.js',
						'public/javascripts/views/lesson-view.js'
					],
					'public/javascripts/editor-addons.js': [
						'public/javascripts/vendor/jquery-ui-1.10.1.custom.min.js',
						'public/javascripts/vendor/marked.js', 
						'public/javascripts/vendor/uuid.js',
						'public/javascripts/views/lesson-list-editor.js',
						'public/javascripts/views/lesson-editor.js'
					]
				}
			}
			//dist: {
			//	src: ['public/javascripts/**/*.js'],
			//	dest: 'dist/<%= pkg.name %>.js'
			//}
			
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					//'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
					'public/javascripts/everyone.min.js': ['public/javascripts/everyone.js'],
					'public/javascripts/editor-addons.min.js': ['public/javascripts/editor-addons.js']
				}
			}
		},
		less: {
			allenv: {
				options: {
					paths: ["public/stylesheets"],
					yuicompress: true
				},
				files: {
					"public/stylesheets/bootstrap.css": "public/stylesheets/bootstrap.less"
				}
			}
				
		},
		watch: {
			js: {
				files: [
						'public/javascripts/vendor/*.js',
						'public/javascripts/models/*.js',
						'public/javascripts/views/*.js'
					],
				tasks: ['concat', 'uglify'],
				options: {
					debounceDelay: 200,
					interrupt: true	
				}
			},
			less: {
				files: [
						'public/stylesheets/*.less'
					],
				tasks: ['less'],
				options: {
					debounceDelay: 200,
					interrupt: true	
				}
			}
		}
	});

	// Load the plugin that provides the concat and uglify task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// Default task(s).
	// when running "grunt" or "grunt default" it will run this task
	// specify others if you want I guess...
	// You could specify an uglify task only and run it as "grunt uglify"
	grunt.registerTask('default', ['concat', 'uglify', 'less']);

};