module.exports = function(grunt){

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		// handle vendor prefixing
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			dist: {
				src: 'stylesheets/affordance.css'
			}
		},
		// compile scss
		compass: {
		  compile: {
		    options: {
		      config: 'config.rb'
		    }
		  }
		},
		// CSS reporting
		parker: {
			options: {
				metrics: [
		          'TotalStylesheets',
		          'TotalStylesheetSize',
		          'TotalRules',
		          'TotalSelectors',
		          'TotalIdentifiers',
		          'TotalDeclarations',
		          'SelectorsPerRule',
		          'IdentifiersPerSelector',
		          'SpecificityPerSelector',
		          'TopSelectorSpecificity',
		          'TopSelectorSpecificitySelector',
		          'TotalIdSelectors',
		          'TotalUniqueColours',
		          'TotalImportantKeywords',
		          'TotalMediaQueries'					
				],
				file: 'stylesheets/.primer-stats.md',
				usePackage: true
			},
			src: [
				'stylesheets/*.css'
			],
		},
		// minify js
		uglify: {
			target: {
				files: [{
					expand: true,
					src: 'js/*.js',
					dest: 'dist'
				}]
			}
		},
		// minify css
		cssmin: {
			minify: {
				files: {
					'dist/stylesheets/affordance.min.css':'stylesheets/affordance.css'
				}
			}
		},
		// minify images
		imagemin: {
			target: {
				files: [{
					expand: true,
					src: ['img/**/*.{png,jpg,gif}'],
					dest: 'dist'
				}]
			}
		},
		// watch file change
		watch: {
			compass: {
				files: ['sass/*.scss'],
				tasks: ['compass']
			},
			css: {
				files: ['stylesheets/affordance.css'],
				tasks: ['cssmin'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['index.html', '**/*.css'],
				options: {
					livereload: true
				}
			}
		},
		// build tool
		buildcontrol: {
			pages: {
				options: {
					remote: 'git@github.com:KENJU/affordance.git',
					branch: 'gh-pages'
				}
			}
		}
	});

	// read all grunt plugin
	// http://webdrawer.net/javascript/firstgrunt.html
	var taskName;
	for(taskName in pkg.devDependencies){
		if(taskName.substring(0, 6) == 'grunt-'){
			grunt.loadNpmTasks(taskName);
		}
	}

	// Generate and format the CS
	grunt.registerTask('default', ['autoprefixer', 'uglify', 'cssmin']);

};