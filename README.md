# Skeletor ESLint Plugin

The purpose of this plugin is to lint a project's JavaScript using [ESLint](https://eslint.org/). This plugin is part of the Skeletor ecosystem. To learn more about Skeletor, [go here](https://github.com/deg-skeletor/skeletor-core).

**THIS REPOSITORY IS NO LONGER MAINTAINED**

## Installation
Install this plugin into your Skeletor-equipped project via the following terminal command: 
```
    npm install --save-dev @deg-skeletor/plugin-eslint
```

## Configuration

The configuration for this plugin mimics the standard configuration patterns for ESLint (learn more [here](https://eslint.org/docs/user-guide/configuring)).

### Example Configuration
```
config: {
    source: 'source/js/**/*.js'
}
```

### Configuration Options

#### source
Type: `String` 
A file path or globbing pattern of source files that should be processed. NOTE: When this plugin is run as part of `skel watch` task, only the changed file will be processed.

#### formatter 
Type: `String` 
Default: `codeframe` 
See ESLint's included [formatters](https://eslint.org/docs/user-guide/formatters/) for options.

For a detailed list of configuration options, check out ESLint's [options](https://eslint.org/docs/user-guide/configuring). 
