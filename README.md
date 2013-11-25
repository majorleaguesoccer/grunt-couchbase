# grunt-couchbase

> Import and export Couchbase views with Grunt.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-couchbase --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-couchbase');
```

## The "couchbaseExport" task

### Overview
In your project's Gruntfile, add a section named `couchbaseExport` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  couchbaseExport: {
    options: {
      hostname: 'localhost'
    },
    foo: {
      options: {
        bucket: 'foo',
        user: 'foo',
        password: 'bar'
      }
      dest: 'path/to/store/views/'
    },
  },
})
```

### Options

#### options.hostname
Type: `String`

The host address for Couchbase server.

#### options.bucket
Type: `String`

Name of the bucket.

#### options.includeDevelopment
Type: `Boolean`
Default value: `false`

Include Development views when exporting.

#### options.webAdminPort
Type: `Integer`
Default value: `8091`

Couchbase Web Administration Port.

#### options.apiPort
Type: `Integer`
Default value: `8092`

Couchbase API Port.

## The "couchbaseImport" task

### Overview
In your project's Gruntfile, add a section named `couchbaseImport` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  couchbaseImport: {
    options: {
      hostname: 'localhost'
    },
    foo: {
      options: {
        bucket: 'foo',
        user: 'foo',
        password: 'bar'
      }
      src: 'path/to/store/views/*'
    },
  },
})
```

### Options

#### options.hostname
Type: `String`

The host address for Couchbase server.

#### options.bucket
Type: `String`

Name of the bucket.

#### options.webAdminPort
Type: `Integer`
Default value: `8091`

Couchbase Web Administration Port.

#### options.apiPort
Type: `Integer`
Default value: `8092`

Couchbase API Port.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2013-11-25   v0.1.0   Initial release.
