//

module.exports = function(grunt) {
  // --- Grunt Configuration ---
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // --- Clean ---
    // Build: Clears all old files from DIST Folder
    // Styles: Clears all non-concactinated CSS files.
    // Scripts: Clears all non-concactinated JS files.
    clean: {
      build: {
        src: [ 'dist' ]
      },
      stylesmin: {
        src: [ 'dist/**/*.min.css' ]
      },
      scriptsmin: {
        src: [ 'dist/**/*.min.js' ]
      },
      styles: {
        src: [ 'dist/**/*.css', '!dist/**/*.min.css' ]
      },
      scripts: {
        src: [ 'dist/**/*.js', '!dist/**/*.min.js' ]
      }
    },

    copy: {
      html: {
        cwd: 'app',
        src: [ '**/*.html' ],
        dest: 'dist',
        expand: true
      },
    },

    // -- JS Hint ---
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    // -- Minify JS Files ---
    uglify: {
      dist: {
        src : 'app/**/*.js',
        dest : 'dist/js/project.min.js'
      }
    },

    // -- SASS ---
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.css', '**/!*.min.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      html: {
        files: 'app/**/*.html',
        tasks: [ 'copy:html' ]
      },
      styles: {
        files: 'app/**/*.scss',
        tasks: [ 'clean:stylesmin', 'sass', 'cssmin', 'clean:styles' ]
      },
      scripts: {
        files: 'app/**/*.js',
        tasks: [ 'clean:scriptsmin', 'jshint', 'uglify', 'clean:scripts' ]
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dist',
          hostname: 'localhost'
        }
      }
    }

  });

  // --- Load NPM Modules ---
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // --- Grunt Tasks ---
  grunt.registerTask('build', ['clean:build', 'copy:html', 'jshint', 'uglify', 'sass', 'cssmin', 'clean:styles', 'clean:scripts']);

  grunt.registerTask('dev', ['build', 'connect', 'watch']);

};
