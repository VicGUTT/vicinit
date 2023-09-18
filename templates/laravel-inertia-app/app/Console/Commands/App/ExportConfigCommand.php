<?php

declare(strict_types=1);

namespace App\Console\Commands\App;

use Illuminate\Support\Arr;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

final class ExportConfigCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-config';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export specific config values to the front-end';

    public function __construct(protected Filesystem $file)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $configs = [
            'app' => $this->prepareAppConfig(),
        ];

        $basePath = front_path('/configs');

        $this->file->ensureDirectoryExists($basePath);

        foreach ($configs as $key => $values) {
            $this->file->put(
                "{$basePath}/{$key}.json",
                (string) json_encode($values, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            );
        }

        $this->newLine();
        $this->info('The needed config values have been exported successfully!');

        return self::SUCCESS;
    }

    private function prepareAppConfig(): array
    {
        $config = Arr::only(config('app'), [
            'name',
            'env',
            'debug',
            // 'url',
            // 'asset_url',
            // 'timezone',
            // 'locale',
            // 'fallback_locale',
        ]);

        if ($config['debug'] !== true) {
            unset($config['debug']);
        }

        if ($config['env'] === 'production') {
            unset($config['env'], $config['debug']);
        }

        return $config;
    }
}
