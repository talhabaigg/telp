<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        \Tripteki\Docs\Providers\DocsServiceProvider::ignoreConfig();
        \Tripteki\Adminer\Providers\AdminerServiceProvider::ignoreConfig();
        \Tripteki\Log\Providers\LogServiceProvider::ignoreConfig();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
