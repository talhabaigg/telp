<?php

namespace Src\V1\Common\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as BaseServiceProvider;

class EventListenerServiceProvider extends BaseServiceProvider
{
    /**
     * @var array
     */
    protected $listen = [

        //
    ];

    /**
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
};
