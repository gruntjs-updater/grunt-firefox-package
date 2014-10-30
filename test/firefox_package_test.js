'use strict';

var grunt = require('grunt');
var JSZip = require('jszip');

function assertPackagesEqual(test, actual, expected) {
  // TODO: figure out how to compare ZIPs in a platform-independent manner.
  // var a = grunt.file.read(actual);
  // var e = grunt.file.read(expected);
  // test.equal(a, e);
}

function assertMiniManifestsEqual(test, actual, expected) {
  var a = grunt.file.readJSON(actual);
  var e = grunt.file.readJSON(expected);

  test.equal(JSON.stringify(a), JSON.stringify(e),
    'The generated manifest does not match the expectation'
  );
}

function testEqual(test, outputPackage, outputMiniManifest) {
  test.expect(1);
  assertMiniManifestsEqual(test, outputMiniManifest,
    'test/expected/mini-manifest.webapp');
  test.done();
}
exports.firefoxPackage = {

  basic: function(test) {
    testEqual(test, 'tmp/basic/package.zip',
      'tmp/basic/mini-manifest.webapp');
  },

  nonStandardNames: function(test) {
    testEqual(test, 'tmp/nonStandardNames/alternative-package.zip',
      'tmp/nonStandardNames/alternative-mini-manifest.webapp');
  },
};