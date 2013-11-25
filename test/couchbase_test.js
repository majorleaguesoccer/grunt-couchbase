'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.couchbase = {
  setUp: function(done) {
    done();
  },
  export: function(test) {
    test.expect(2);

    test.ok(global.apiExport.isDone(), 'should make a GET request to Couchbase.');
    var actual = grunt.file.read('tmp/foo.ddoc');
    var expected = grunt.file.read('test/expected/foo.ddoc');
    test.equal(actual, expected, 'should export views to the filesystem.');

    test.done();
  },
  import: function(test) {
    test.expect(1);

    test.ok(global.apiImport.isDone(), 'should make a PUT request to Couchbase.');

    test.done();
  }
};
