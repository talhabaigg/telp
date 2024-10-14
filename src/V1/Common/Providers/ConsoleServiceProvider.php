<?php

namespace Src\V1\Common\Providers;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ConsoleServiceProvider extends BaseServiceProvider
{
    /**
     * @var array
     */
    protected $commands = [

        //
    ];

    /**
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * @return void
     */
    public function boot()
    {
        $this->registerCommands();
    }

    /**
     * @return void
     */
    protected function registerCommands()
    {
        if ($this->app->runningInConsole()) {

            $this->commands($this->commands);
        }
    }
};
