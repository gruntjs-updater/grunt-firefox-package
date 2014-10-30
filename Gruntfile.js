/*
 * grunt-firefox-package
 * https://github.com/danhawkes/grunt-firefox-package
 *
 * Copyright (c) 2014 Dan Hawkes
 * Licensed under the Apache, 2.0 licenses.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    firefoxPackage: {
      basic: {
        options: {
          source: 'test/fixtures/default',
          packageUrl: 'http://www.example.com/package.zip',
          outputPackage: 'tmp/basic/package.zip',
          outputMiniManifest: 'tmp/basic/mini-manifest.webapp',
        }
      },
      nonStandardNames: {
        options: {
          source: 'test/fixtures/default',
          packageUrl: 'http://www.example.com/package.zip',
          outputPackage: 'tmp/nonStandardNames/alternative-package.zip',
          outputMiniManifest: 'tmp/nonStandardNames/alternative-mini-manifest.webapp',
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'firefoxPackage', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};