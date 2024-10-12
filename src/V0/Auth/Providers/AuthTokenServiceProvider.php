<?php

namespace Src\V0\Auth\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Tymon\JWTAuth\Providers\LumenServiceProvider;
use Tymon\JWTAuth\Providers\LaravelServiceProvider as ServiceProvider;

class AuthTokenServiceProvider extends ServiceProvider
{
    /**
     * @return void
     */
    public function register()
    {
        parent::register();

        $this->extendAuthGuard();
    }

    /**
     * @return void
     */
    public function boot()
    {
        parent::boot();

        $this->registerRoutes();
    }

    /**
     * @return void
     */
    protected function registerRoutes()
    {
        ResetPassword::createUrlUsing(function ($notifiable, $token) {

            return config("app.frontend_url")."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
