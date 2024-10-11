<?php

use Laravel\Pulse\Http\Middleware\Authorize;
use Laravel\Pulse\Pulse;
use Laravel\Pulse\Recorders;

return [

    "domain" => env("PULSE_DOMAIN"),

    "path" => env("PULSE_PATH", "monitor"),

    "enabled" => env("PULSE_ENABLED", true),

    /*
    |--------------------------------------------------------------------------
    | Pulse Storage Driver
    |--------------------------------------------------------------------------
    |
    | This configuration option determines which storage driver will be used
    | while storing entries from Pulse"s recorders. In addition, you also
    | may provide any options to configure the selected storage driver.
    |
    */

    "storage" => [

        "driver" => env("PULSE_STORAGE_DRIVER", "database"),

        "database" => [

            "connection" => env("PULSE_DB_CONNECTION"),
            "chunk" => 1000,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Pulse Ingest Driver
    |--------------------------------------------------------------------------
    |
    | This configuration options determines the ingest driver that will be used
    | to capture entries from Pulse"s recorders. Ingest drivers are great to
    | free up your request workers quickly by offloading the data storage.
    |
    */

    "ingest" => [

        "driver" => env("PULSE_INGEST_DRIVER", "storage"),

        "buffer" => env("PULSE_INGEST_BUFFER", 5_000),

        "trim" => [

            "lottery" => [ 1, 1_000, ],
            "keep" => "7 days",
        ],

        "redis" => [

            "connection" => env("PULSE_REDIS_CONNECTION"),
            "chunk" => 1000,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Pulse Cache Driver
    |--------------------------------------------------------------------------
    |
    | This configuration option determines the cache driver that will be used
    | for various tasks, including caching dashboard results, establishing
    | locks for events that should only occur on one server and signals.
    |
    */

    "cache" => env("PULSE_CACHE_DRIVER"),

    //

    /*
    |--------------------------------------------------------------------------
    | Pulse Route Middleware
    |--------------------------------------------------------------------------
    |
    | These middleware will be assigned to every Pulse route, giving you the
    | chance to add your own middleware to this list or change any of the
    | existing middleware. Of course, reasonable defaults are provided.
    |
    */

    "middleware" => [

        "web",
        Authorize::class,
    ],

    //

    /*
    |--------------------------------------------------------------------------
    | Pulse Recorders
    |--------------------------------------------------------------------------
    |
    | The following array lists the "recorders" that will be registered with
    | Pulse, along with their configuration. Recorders gather application
    | event data from requests and tasks to pass to your ingest driver.
    |
    */

    'recorders' => [

        \Laravel\Reverb\Pulse\Recorders\ReverbConnections::class => [

            'sample_rate' => 1,
        ],
     
        \Laravel\Reverb\Pulse\Recorders\ReverbMessages::class => [

            'sample_rate' => 1,
        ],

        Recorders\CacheInteractions::class => [

            'enabled' => env('PULSE_CACHE_INTERACTIONS_ENABLED', true),
            'sample_rate' => env('PULSE_CACHE_INTERACTIONS_SAMPLE_RATE', 1),

            'ignore' => [

                ...Pulse::defaultVendorCacheKeys(),
            ],

            'groups' => [

                '/^job-exceptions:.*/' => 'job-exceptions:*',
                // '/:\d+/' => ':*',
            ],
        ],

        Recorders\Exceptions::class => [

            'enabled' => env('PULSE_EXCEPTIONS_ENABLED', true),
            'sample_rate' => env('PULSE_EXCEPTIONS_SAMPLE_RATE', 1),
            'location' => env('PULSE_EXCEPTIONS_LOCATION', true),

            'ignore' => [

                // '/^Package\\\\Exceptions\\\\/',
            ],
        ],

        Recorders\Queues::class => [

            'enabled' => env('PULSE_QUEUES_ENABLED', true),
            'sample_rate' => env('PULSE_QUEUES_SAMPLE_RATE', 1),

            'ignore' => [

                // '/^Package\\\\Jobs\\\\/',
            ],
        ],

        Recorders\Servers::class => [

            'server_name' => env('PULSE_SERVER_NAME', gethostname()),
            'directories' => explode(':', env('PULSE_SERVER_DIRECTORIES', '/')),
        ],

        Recorders\SlowJobs::class => [

            'enabled' => env('PULSE_SLOW_JOBS_ENABLED', true),
            'sample_rate' => env('PULSE_SLOW_JOBS_SAMPLE_RATE', 1),
            'threshold' => env('PULSE_SLOW_JOBS_THRESHOLD', 1000),

            'ignore' => [

                // '/^Package\\\\Jobs\\\\/',
            ],
        ],

        Recorders\SlowOutgoingRequests::class => [

            'enabled' => env('PULSE_SLOW_OUTGOING_REQUESTS_ENABLED', true),
            'sample_rate' => env('PULSE_SLOW_OUTGOING_REQUESTS_SAMPLE_RATE', 1),
            'threshold' => env('PULSE_SLOW_OUTGOING_REQUESTS_THRESHOLD', 1000),

            'ignore' => [

                // '#^http://127\.0\.0\.1:13714#',
            ],

            'groups' => [

                // '#^https://api\.github\.com/repos/.*$#' => 'api.github.com/repos/*',
                // '#^https?://([^/]*).*$#' => '\1',
                // '#/\d+#' => '/*',
            ],
        ],

        Recorders\SlowQueries::class => [

            'enabled' => env('PULSE_SLOW_QUERIES_ENABLED', true),
            'sample_rate' => env('PULSE_SLOW_QUERIES_SAMPLE_RATE', 1),
            'threshold' => env('PULSE_SLOW_QUERIES_THRESHOLD', 1000),
            'location' => env('PULSE_SLOW_QUERIES_LOCATION', true),
            'max_query_length' => env('PULSE_SLOW_QUERIES_MAX_QUERY_LENGTH'),

            'ignore' => [

                '/(["`])pulse_[\w]+?\1/',
                '/(["`])telescope_[\w]+?\1/',
            ],
        ],

        Recorders\SlowRequests::class => [

            'enabled' => env('PULSE_SLOW_REQUESTS_ENABLED', true),
            'sample_rate' => env('PULSE_SLOW_REQUESTS_SAMPLE_RATE', 1),
            'threshold' => env('PULSE_SLOW_REQUESTS_THRESHOLD', 1000),

            'ignore' => [

                '#^/'.env('PULSE_PATH', 'pulse').'$#',
                '#^/telescope#',
            ],
        ],

        Recorders\UserJobs::class => [

            'enabled' => env('PULSE_USER_JOBS_ENABLED', true),
            'sample_rate' => env('PULSE_USER_JOBS_SAMPLE_RATE', 1),

            'ignore' => [

                // '/^Package\\\\Jobs\\\\/',
            ],
        ],

        Recorders\UserRequests::class => [

            'enabled' => env('PULSE_USER_REQUESTS_ENABLED', true),
            'sample_rate' => env('PULSE_USER_REQUESTS_SAMPLE_RATE', 1),

            'ignore' => [

                '#^/'.env('PULSE_PATH', 'pulse').'$#',
                '#^/telescope#',
            ],
        ],
    ],
];
