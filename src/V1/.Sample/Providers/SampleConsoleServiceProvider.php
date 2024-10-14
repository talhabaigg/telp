<?php

namespace Src\V1\Sample\Providers;

use Src\V1\Common\Providers\ConsoleServiceProvider as BaseServiceProvider;

class SampleConsoleServiceProvider extends BaseServiceProvider
{
    /**
     * @var array
     */
    protected $commands = [

        \Src\V1\Sample\Console\Commands\SampleInitialCommand::class,
    ];
};
