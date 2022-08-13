# Personal fun tool to quickly scaffold projects

This "project scaffolder" is meant for personal use; it contains no tests, hasn't been tested on other systems than Windows and applies my own coding conventions and styles.

## Installation

_Nope, not needed._

## Usage

**First** create a folder **and** `cd` into it, **then** run the following command:

```bash
npx @vicgutt/vicinit
```

or

```bash
npx @vicgutt/vicapp
```

From there simply answer the questions asked and choose the template to scaffold.

## Templates

Templates are simply directories of files and folders representing a project structure for a given usecase.

### ts-lib

The _ts-lib_ template is meant for creating "public TypeScript libraries that will eventually be published to the NPM registry with a MIT license".

### laravel-lib

The _laravel-lib_ template is meant for creating "public Laravel PHP libraries that will eventually be published to the Composer registry with a MIT license".

### laravel-bare-app

The _laravel-bare-app_ template is meant for creating "private Laravel PHP applications, without any defined front-end framework and with a proprietary license".

<!-- ## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently. -->

## Contributing

If you're interested in contributing to the project, please read our [contributing docs](https://github.com/VicGUTT/vicinit/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
