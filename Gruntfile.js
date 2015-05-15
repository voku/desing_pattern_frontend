/**
 * # Grunt
 * A task manager for auto compiling and validating code
 *
 * ## Set up
 * Make sure the you have nodejs running on your machine
 * Install Grunt with npm `npm install -g grunt-cli`
 * Install Grunt packages `npm install`
 *
 * ## Config
 * The configuration settings are found in `package.json`.
 *
 * ## Running
 * You can type `grunt <command>` to run any of rules in the `initConfig` function
 * e.g. `grunt compass` to compile the scss files to css
 *
 * You can also run a sub-task by adding `:<subtask>`
 * e.g. `grunt uglify:js` to compile to javaScript header file
 *
 * ## Helper Commands
 * There are a number of helper command at the end of the file
 * - default (`grunt`) will watch the folder and compile when files are saved
 */

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  'use strict';

  // require it at the top and pass in the grunt instance
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '<%= pkg.name %> by <%= pkg.author %>)',
      bannerJS:
      '/*\n' +
      ' * <%= meta.banner %>\n' +
      ' */'
    },

    clean: {
      build: ["js-min/*", "css/*", "css-min/*"]
    },

    penthouse: {
      dist : {
        outfile : 'css/critical-path.css',
        css : 'css/app.css',
        url : '<%= pkg.url %>',
        width : 320,
        height : 640
      }
    },

    emberTemplates: {
      compile: {
        options: {
          templateName: function(name) {
            return name.substring(name.lastIndexOf('/')+1);
          },
          templateCompilerPath: 'vendor/bower/ember/ember-template-compiler.js',
          handlebarsPath: 'vendor/bower/handlebars/handlebars.js'
        },
        files: {
          "js/templates.js": "templates/**/*.hbs"
        }
      }
    },

    sass: {
      dist: {
        options: {
          loadPath: ['vendor/bower/normalize-scss'],
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },

    concat: {
      js: {
        options: {
          separator: ';\n\r',
          sourceMap: true
        },
        src: [
          'js/app.js',
          'js/router.js',
          'routes/*.js',
          'controllers/*.js',
          'models/*.js'
        ],
        dest: 'js/app.pkgd.js'
      },
      cssFonts: {
        options: {
          separator: '\n\r'
        },
        src: [
          'fonts/style.css'
        ],
        dest: 'scss/extra/_fonts.scss'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 100 version'],
        map: true
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/*.css',
        dest: 'css/'
      }
    },

    csswring: {
      options: {
        banner: '<%= meta.banner %>\n',
        map: true,
        preserveHacks: true
      },
      minify: {
        expand: true,
        flatten: true,
        src: ['css/**/*.css'],
        dest: 'css-min/'
      }
    },

    uglify: {
      js: {
        options: {
          banner: '<%= meta.bannerJS %>\n',
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'js/',
          src: '**/*.js',
          dest: 'js-min/'
        }]
      }
    },

    dalek: {
      options: {
        // invoke phantomjs, chrome & chrome canary ...
        browser: ['phantomjs', 'chrome', 'ie'],
        // generate an html & an jUnit report
        reporter: ['html', 'junit']
      },
      dist: {
        src: ['tests/dalek/*.js']
      }
    },

    watch: {

      handlebars: {
        files: ['templates/**/*.hbs'],
        tasks: ['concat:js', 'emberTemplates:compile', 'uglify:js'],
        options: {
          livereload: true
        }
      },

      js: {
        files: [
          'js/**/*.js',
          'routes/**/*.js',
          'controllers/**/*.js',
          'models/**/*.js'
        ],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true
        }
      },

      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dist', 'autoprefixer', 'csswring:minify'],
        options: {
          livereload: true,
          spawn : false       // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions.
        }
      }

    },

    serve: {
      options: {
        port: 9000
      }
    }

  });

  // load all plugins from the "package.json"-file
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('clean-build', ['clean:build']);
  grunt.registerTask('csswring' ['csswring:minify']);
  grunt.registerTask('image-min', ['imagemin:dynamic']);
  grunt.registerTask('test', ['dalek']);
  grunt.registerTask('server', ['serve']);

  grunt.registerTask(
      'build',
      'Build this website ... yeaahhh!',
      [ 'clean:build', 'concat:js', 'emberTemplates:compile', 'uglify:js', 'concat:cssFonts', 'sass:dist', 'autoprefixer', 'csswring:minify']
  );

};
