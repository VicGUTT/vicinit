# {project-description}

[![Latest Version on Packagist](https://img.shields.io/packagist/v/{vendor-slug}/{project-slug}.svg?style=flat-square)](https://packagist.org/packages/{vendor-slug}/{project-slug})
[![GitHub Tests Action Status](https://img.shields.io/github/workflow/status/{vendor-slug}/{project-slug}/run-tests?label=tests)](https://github.com/{vendor-slug}/{project-slug}/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/workflow/status/{vendor-slug}/{project-slug}/Fix%20PHP%20code%20style%20issues?label=code%20style)](https://github.com/{vendor-slug}/{project-slug}/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/{vendor-slug}/{project-slug}.svg?style=flat-square)](https://packagist.org/packages/{vendor-slug}/{project-slug})

---

This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Installation

You can install the package via composer:

```bash
composer require {vendor-slug}/{project-slug}
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --tag="{project-slug}-migrations"
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="{project-slug}-config"
```

This is the contents of the published config file:

```php
return [
    //
];
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="{project-slug}-views"
```

## Usage

```php
${project-classname-variable} = new {vendor-namespace}\{project-classname}();
echo ${project-classname-variable}->echoPhrase('Hello, {vendor-namespace}!');
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

If you're interested in contributing to the project, please read our [contributing docs](https://github.com/{vendor-slug}/{project-slug}/blob/main/.github/CONTRIBUTING.md) **before submitting a pull request**.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

-   [{author-name}](https://github.com/{author-username})
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
