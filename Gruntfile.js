/*
 * grunt-couchbase
 * https://github.com/majorleaguesoccer/grunt-couchbase
 *
 * Copyright (c) 2013 Major League Soccer, LLC.
 * Licensed under the MIT license.
 */

'use strict';

// Couchbase HTTP request mocking for testing
require('./test/nock_setup');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/nock_setup.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    couchbaseExport: {
      test: {
        options: {
          hostname: 'localhost',
          bucket: 'foo'
        },
        dest: 'tmp/'
      }
    },

    couchbaseImport: {
      test: {
        options: {
          hostname: 'localhost',
          bucket: 'foo'
        },
        src: 'test/expected/foo.ddoc'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'couchbaseExport', 'couchbaseImport', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
