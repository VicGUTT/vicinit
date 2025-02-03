<?php

declare(strict_types=1);

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\AddContentSecurityPolicyHeaders;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__ . '/../routes/console.php',
        /**
         * @see https://laravel.com/docs/11.x/routing#routing-customization
         * @see app/Providers/RouteServiceProvider.php
         */
        using: static fn () => null,
    )
    ->withMiddleware(static function (Middleware $middleware): void {
        $middleware->web(append: [
            AddContentSecurityPolicyHeaders::class,
        ]);
    })
    ->withExceptions(static function (Exceptions $exceptions): void {
        //
    })->create();
