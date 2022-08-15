<?php

declare(strict_types=1);

namespace {vendor-namespace}\{project-classname};

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use {vendor-namespace}\{project-classname}\Commands\{project-classname}Command;

class {project-classname}ServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('{project-slug}')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_{project-slug}_table')
            ->hasCommand({project-classname}Command::class);
    }
}
