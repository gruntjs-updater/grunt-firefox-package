# grunt-firefox-package

> Generate a package.zip and mini manifest for your app.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-firefox-package --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-firefox-package');
```

In your project's Gruntfile, add a section named `firefoxPackage` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  firefoxPackage: {...},
});
```
## The 'firefoxPackage' task

### Overview

To distribute a Firefox OS 'packaged' app outside of the Firefox store, you need two things:
* A `package.zip` that contains your app source code and manifest.
* A `mini-manifest.webapp` file that tells the system where `package.zip` can be downloaded, and also some basic info like the app's name.

Making the mini manifest is finicky, because it requires information to be duplicated from the main manifest, and installation will fail if those duplicated values don't match exactly [(1)][1].

Furthermore, it requires some additional information (such as the package file size) that mean it's not a simple copy/paste job. This task attempts to automate the process.

This task is intended to interoperate with [grunt-firefox-manifest][2], such that you can use `firefox-manifest` to build your main manifest from your `package.json`, then use `firefox-package` to build the final distributable using the generated  manifest.

### Options

#### source
Type: `String` Default value: `undefined`  
Example: `'dist'`

Directory containing your built application source code and `manifest.webapp`.

#### outputPackage
Type: `String` Default value: `undefined`  
Example: `'dist/packaged/package.zip'`

Where to place the output package file in your project tree.

#### outputMiniManifest
Type: `String` Default value: `undefined`  
Example: `'dist/packaged/mini-manifest.webapp'`

Where to place the output mini manifest in your project tree.

#### packageUrl
Type: `String` Default value: `undefined`  
Example: `'https://example.com/package.zip'`

Location from which you plan to distribute your `package.zip` file.

### Usage Examples

We have a `build` task that compiles and minifies our CSS and JS into a directory called `dist`. We want to include the contents of `dist` in the package, and create the zip and manifest in `packaged`.

```js
grunt.registerTask('build', [
  ...
  'firefoxPackage:dist'
]);
```

```js
grunt.initConfig({
  firefoxPackage: {
    dist: {
      options: {
        source: 'dist',
        outputPackage: 'packaged/package.zip',
        outputMiniManifest: 'packaged/mini-manifest.webapp',
        packageUrl: 'https://example.com/package.zip',
      }
    }
  }
});
```

## Contributing
Pull requests/issues are welcome.

## Release History
0.1.0
  * Initial release.  

0.2.0
  * Rename task `firefox_package`->`firefoxPackage`.

0.3.0
  * Remove default 'options'; now all are required.
  * Fix misc issues in readme.

[1]: https://developer.mozilla.org/en-US/Marketplace/Options/Self_publishing#Mini-manifest_fields
[2]: https://www.npmjs.org/package/grunt-firefox-manifest
