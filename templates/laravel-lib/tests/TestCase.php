<?php

declare(strict_types=1);

namespace {vendor-namespace}\{project-classname}\Tests;

use Orchestra\Testbench\TestCase as Orchestra;
use Illuminate\Database\Eloquent\Factories\Factory;
use {vendor-namespace}\{project-classname}\{project-classname}ServiceProvider;

abstract class TestCase extends Orchestra
{
    /**
     * Define environment setup.
     *
     * @param  \Illuminate\Foundation\Application  $app
     */
    public function getEnvironmentSetUp($app): void
    {
        config()->set('database.default', 'testing');

        /*
        $migration = include __DIR__.'/../database/migrations/create_{project-slug}_table.php.stub';
        $migration->up();
        */
    }

    /**
     * Get package providers.
     *
     * @param  \Illuminate\Foundation\Application  $app
     * @return array<int, class-string>
     */
    protected function getPackageProviders($app): array
    {
        return [
            {project-classname}ServiceProvider::class,
        ];
    }

    /**
     * This method is called before each test.
     */
    protected function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            static fn (string $modelName): string => 'VicGutt\\LaravelStubs\\Database\\Factories\\' . class_basename($modelName) . 'Factory',
        );
    }
}
