'use strict';


var fs = require('fs');
var path = require('path');
var JSZip = require('jszip');
var chalk = require('chalk');

module.exports = function(grunt) {

  grunt.registerMultiTask('firefoxPackage',
    'Generates a package.zip and mini manifest for your app.',
    function() {

      var opt = this.options();

      if (!opt.source) {
        grunt.fail.warn(
          '\'source\' property was not found in options.');
      }
      if (!opt.packageUrl) {
        grunt.fail.warn(
          '\'packageUrl\' property was not found in options.');
      }
      if (!opt.outputPackage) {
        grunt.fail.warn(
          '\'outputPackage\' property was not found in options.');
      }
      if (!opt.outputMiniManifest) {
        grunt.fail.warn(
          '\'outputMiniManifest\' property was not found in options.'
        );
      }

      ensureOutputDirectoriesExist(opt);
      var zipSize = generateZip(opt);
      generateMiniManifest(opt, zipSize);

      grunt.log.ok();
    });

  function logFileCreated(filepath) {
    grunt.log.writeln('File ' + chalk.cyan(filepath) + ' created.');
  }

  function ensureOutputDirectoriesExist(opt) {
    [opt.outputPackage, opt.outputMiniManifest].forEach(
      function(item) {
        grunt.file.mkdir(path.dirname(item));
      });
  }

  function generateZip(opt) {

    // Build a map of input and output files, where the inputs are
    // relative to the working directory, and the outputs are relative
    // to opt.outputPackage.
    var filesAndDirs = grunt.file.expandMapping(['**/*'], '.', {
      cwd: opt.source
    });

    // Generate the zip
    var zip = new JSZip();
    filesAndDirs.forEach(function(item) {
      var src = item.src[0];
      var dest = item.dest;
      grunt.verbose.writeln('  ' + src + ' -> ' + dest);
      if (grunt.file.isDir(src)) {
        zip.folder(dest);
      } else if (grunt.file.isFile(src)) {
        zip.file(dest, fs.readFileSync(src));
      }
    });
    var output = zip.generate({
      type: 'nodebuffer',
      compression: 'DEFLATE'
    });
    fs.writeFileSync(opt.outputPackage, output);

    logFileCreated(opt.outputPackage);

    // Get the zip size
    var stat = fs.statSync(opt.outputPackage);
    return stat.size;
  }

  function generateMiniManifest(opt, packageSize) {

    var manifest = grunt.file.readJSON(path.join(opt.source,
      'manifest.webapp'));

    var miniManifest = {};

    // Copy fields from main manifest.
    miniManifest.name = manifest.name;
    if (manifest.version) {
      miniManifest.version = manifest.version;
    }
    if (manifest.developer) {
      miniManifest.developer = manifest.developer;
    }
    if (manifest.locales) {
      miniManifest.locales = manifest.locales;
    }

    // Add mini-manifest specific stuff
    miniManifest.package_path = opt.packageUrl;
    miniManifest.size = packageSize;

    fs.writeFileSync(opt.outputMiniManifest, JSON.stringify(
      miniManifest, null, '  '));

    logFileCreated(opt.outputMiniManifest);
  }
};
