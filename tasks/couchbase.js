/*
 * grunt-couchbase
 * https://github.com/majorleaguesoccer/grunt-couchbase
 *
 * Copyright (c) 2013 Major League Soccer, LLC.
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');

module.exports = function(grunt) {
  grunt.registerMultiTask('couchbaseExport', 'Export Couchbase views.', function() {
    var done = this.async();
    var options = this.options({
      hostname: 'localhost',
      webAdminPort: 8091,
      apiPort: 8092,
      includeDevelopment: false
    });
    var files = this.files;
    var auth;
    var url = 'http://' + options.hostname + ':' + options.webAdminPort + '/pools/default/buckets/' + options.bucket + '/ddocs';


    if (options.user && options.password) {
      auth = {
        user: options.user,
        pass: options.password
      };
    }

    request(url, {
      method: 'GET',
      auth: auth,
      json: true
    }, function _request(err, response, body) {
      if (err || response.statusCode !== 200 || !body || !body.rows) {
        grunt.log.error('Failed to export views.');
        return false;
      }

      // Save each design doc into its own file
      body.rows.forEach(function(row) {
        var ddoc = row.doc.meta.id.split('/')[1];

        // Ignore development views if option not set
        if (options.includeDevelopment || ddoc.substr(0, 4) !== 'dev_') {
          files.forEach(function(file) {
            grunt.file.write(file.dest + ddoc + '.ddoc', JSON.stringify(row.doc.json, null, 2));
          });
        }
      });

      done();
    });
  });

  grunt.registerMultiTask('couchbaseImport', 'Import Couchbase views.', function() {
    var done = this.async();
    var options = this.options({
      hostname: 'localhost',
      webAdminPort: 8091,
      apiPort: 8092
    });
    var files = this.files;
    var auth;

    if (options.user && options.password) {
      auth = {
        user: options.user,
        pass: options.password
      };
    }

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        var name = src.split('/').pop().split('.')[0];
        var url = 'http://' + options.hostname + ':' + options.apiPort + '/' + options.bucket + '/_design/' + name;

        request(url, {
          method: 'PUT',
          auth: auth,
          body: grunt.file.readJSON(src),
          json: true
        }, function _request(err, response, body) {
          if (err || response.statusCode !== 201 || !body || !body.ok) {
            grunt.log.error('Failed to import views.');
            return false;
          }
          done();
        });
      });
    });
  });

};
