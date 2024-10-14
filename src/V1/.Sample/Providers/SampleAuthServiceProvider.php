<?php

namespace Src\V1\Sample\Providers;

use Src\V1\Sample\Models\SampleModel;
use Src\V1\Sample\Policies\SamplePolicy;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Illuminate\Support\Facades\Gate;

class SampleAuthServiceProvider extends BaseServiceProvider
{
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
        Gate::policy(SampleModel::class, SamplePolicy::class);
    }
};
