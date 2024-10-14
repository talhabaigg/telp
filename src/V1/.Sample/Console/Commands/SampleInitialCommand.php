<?php

namespace Src\V1\Sample\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SampleInitialCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = "sample:initial";

    /**
     * @var string
     */
    protected $description = "Sample Initial";

    /**
     * @return int
     */
    public function handle()
    {
        exit();

        return 0;
    }
};
