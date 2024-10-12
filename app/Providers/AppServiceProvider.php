<?php

namespace App\Providers;

use App\Models\User;
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
        \Tripteki\ACL\Providers\ACLServiceProvider::ignoreConfig();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        User::observe(\Tripteki\Uid\Observers\UniqueIdObserver::class);
    }
}
