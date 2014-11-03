module.exports = function ( grunt ) {

	grunt.initConfig( {

		less: {

			dev: {

				files: { 'css/main.css' : 'styles/main.less' }

			}		

		},

		jshint: {

			task: ['src/**/*.js', 'tests/**/*.js'],
			options: { jshintrc: true }

		},

		watch: {
			
			styles: {

				files: ['styles/**/*.less'],
				tasks: ['less'],
				options: { spawn: false	}

			},

			scripts: {

				files: ['src/**/*.js', 'tests/**/*.js'],
				tasks: ['jshint'],
				options: { spawn: false	}

			}

		}

	} );

	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

};