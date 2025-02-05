<?php

declare(strict_types=1);

namespace App\Support\Ziggy;

use Tighten\Ziggy\Output\File;

final class ZiggyConfigToFile extends File
{
    public function __toString(): string
    {
        /** @var array{url: string, port: string|null, defaults: array, routes: array} $config */
        $config = $this->ziggy->toArray();
        $routes = collect($config['routes'])->map(static function (array $route): array {
            if ($route['methods'] === ['GET', 'HEAD']) {
                $route['methods'] = ['GET'];
            }

            unset($route['wheres']);
            unset($route['parameters']);

            return $route;
        });

        unset($config['port']);
        unset($config['defaults']);

        $config['url'] = '';
        $config['routes'] = $routes->all();

        $config = json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        return <<<TYPESCRIPT
        export default {$config};

        TYPESCRIPT;
    }
}
