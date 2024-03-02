<?php

declare(strict_types=1);

namespace App\Providers;

use Exception;
use Carbon\CarbonImmutable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Date;
use Illuminate\Foundation\Application;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Validation\Rules\Password;
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
        $this->setupRequestMacros();
        $this->setupBuilderMacros();
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

    private function setupRequestMacros(): void
    {
        //
    }

    private function setupBuilderMacros(): void
    {
        Builder::macro('toSqlWithBindings', function (): string {
            /** @var Builder<\Illuminate\Database\Eloquent\Model> $this */

            /** @var array $bindings */
            $bindings = array_map(
                static fn (int|string|null $item): int|string => is_numeric($item) ? $item : "'{$item}'",
                $this->getBindings(),
            );

            return Str::replaceArray('?', $bindings, $this->toSql());
        });
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

            throw new Exception(
                "[Long running query] - The following query executed on the connection `{$event->connectionName}` took `{$event->time}ms`, exceeding the `{$threshold}ms` threshold : `{$sql}`",
            );
        });
    }
}
