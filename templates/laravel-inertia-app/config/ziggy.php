<?php

declare(strict_types=1);

use App\Support\Ziggy\ZiggyConfigToFile;

return [
    'except' => [
        '_debugbar.*',
        'sanctum.*',
        'ignition.*',
        'horizon.*',
        'storage.*',
        'admin.*',
        'admin:*',
        'api:*',
        'webhook:*',
        'test:*',
        'dev:*',
    ],
    'skip-route-function' => true,
    'output' => [
        'path' => 'appfront/assets/static/routes-config.js',
        'file' => ZiggyConfigToFile::class,
    ],
];
