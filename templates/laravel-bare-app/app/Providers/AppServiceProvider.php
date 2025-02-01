<?php

declare(strict_types=1);

namespace App\Providers;

use Exception;
use Carbon\CarbonImmutable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Vite;
use Illuminate\Foundation\Application;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Client\RequestException;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Database\Eloquent\Relations\MorphTo;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * The application instance.
     *
     * @var Application
     */
    protected $app;

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->setupStrictMode();
        $this->setupPasswordDefaults();
        $this->setupBehaviorChanges();
    }

    private function setupStrictMode(): void
    {
        /**
         * @see https://laravel.com/docs/9.x/eloquent#configuring-eloquent-strictness
         */
        Model::shouldBeStrict(!$this->app->isProduction());

        /**
         * @see https://dyrynda.com.au/blog/laravel-immutable-dates
         */
        Date::use(CarbonImmutable::class);

        /**
         * @see https://laravel.com/docs/9.x/eloquent-relationships#custom-polymorphic-types
         */
        MorphTo::requireMorphMap();

        /**
         * @see https://laravel-news.com/prevent-destructive-commands-from-running-in-laravel-11
         */
        DB::prohibitDestructiveCommands($this->app->isProduction());

        $this->shouldMonitorCumulativeQueryTime(!$this->app->isProduction());
    }

    private function setupPasswordDefaults(): void
    {
        /**
         * @see https://laravel.com/docs/9.x/validation#defining-default-password-rules
         */
        Password::defaults(function (): Password {
            if ($this->app->isLocal()) {
                return Password::min(4);
            }

            return Password::min(12);
            // ->mixedCase()
            // ->uncompromised();
        });
    }

    private function setupBehaviorChanges(): void
    {
        /**
         * @see https://github.com/laravel/framework/pull/53734
         */
        RequestException::dontTruncate();

        /**
         * @see https://laravel.com/docs/11.x/vite#asset-prefetching
         * @see https://github.com/laravel/framework/pull/52462
         */
        Vite::prefetch(concurrency: 3);
    }

    /**
     * @see https://laravel.com/docs/9.x/database#monitoring-cumulative-query-time
     */
    private function shouldMonitorCumulativeQueryTime(bool $contition = true): void
    {
        if (!$contition) {
            return;
        }

        $threshold = 500;

        DB::whenQueryingForLongerThan($threshold, static function (Connection $connection, QueryExecuted $event) use ($threshold): void {
            $bindings = collect($event->bindings)->map(static fn (int|string|null $item): int|string => is_numeric($item) ? $item : "'{$item}'");
            $sql = Str::replaceArray('?', $bindings->toArray(), $event->sql);

            if (str_contains($sql, 'from information_schema.tables')) {
                return;
            }

            if (str_contains($sql, 'create table')) {
                return;
            }

            if (str_contains($sql, 'alter table')) {
                return;
            }

            if (str_contains($sql, 'drop table')) {
                return;
            }

            if (str_contains($sql, 'insert into')) {
                return;
            }

            if (str_contains($sql, 'update ')) {
                return;
            }

            throw new Exception(
                "[Long running query] - The following query executed on the connection `{$event->connectionName}` took `{$event->time}ms`, exceeding the `{$threshold}ms` threshold : `{$sql}`",
            );
        });
    }
}
