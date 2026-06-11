<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
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
        Vite::prefetch(concurrency: 3);

        // if (config('app.debug')) {

        //     // Prevent N+1 queries — throws exception if lazy loading detected
        //     \Illuminate\Database\Eloquent\Model::preventLazyLoading();

        //     $queryCount = 0;
        //     \DB::listen(function ($query) use (&$queryCount) {
        //         $queryCount++;
        //         \Log::info('SQL: ' . $query->sql, [
        //             'bindings' => $query->bindings,
        //             'time' => $query->time . 'ms',
        //         ]);
        //     });

        //     app()->terminating(function () use (&$queryCount) {
        //         \Log::info("Total queries this request: {$queryCount}");
        //     });
        // }
    }
}
