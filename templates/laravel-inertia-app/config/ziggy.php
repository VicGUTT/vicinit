<?php

declare(strict_types=1);

use App\Support\Ziggy\ZiggyConfigToJson;

return [
    'except' => ['_debugbar.*', 'sanctum.*', 'ignition.*', 'horizon.*', 'admin.*', 'admin:*', 'api:*', 'test:*', 'dev:*'],
    'skip-route-function' => true,
    'output' => [
        'path' => 'appfront/assets/static/routes-config.json',
        'file' => ZiggyConfigToJson::class,
    ],
];
