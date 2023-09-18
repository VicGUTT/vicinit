<?php

declare(strict_types=1);

if (! function_exists('front_path')) {
    /**
     * Get the path to the front-end application folder.
     */
    function front_path(string $path = ''): string
    {
        $app = app();

        return $app->joinPaths($app->basePath('appfront'), $path);
    }
}
