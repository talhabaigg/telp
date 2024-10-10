<?php

return [

    "default" => env("REVERB_SERVER", "reverb"),

    "servers" => [

        "reverb" => [

            "host" => env("REVERB_SERVER_HOST", "0.0.0.0"),
            "port" => env("REVERB_SERVER_PORT", 8080),
            "hostname" => env("REVERB_HOST"),
            "max_request_size" => env("REVERB_MAX_REQUEST_SIZE", 10_000),
            "pulse_ingest_interval" => env("REVERB_PULSE_INGEST_INTERVAL", 15),
            "telescope_ingest_interval" => env("REVERB_TELESCOPE_INGEST_INTERVAL", 15),

            "options" => [

                "tls" => [

                    //
                ],
            ],

            "scaling" => [

                "enabled" => env("REVERB_SCALING_ENABLED", false),
                "channel" => env("REVERB_SCALING_CHANNEL", "reverb"),

                "server" => [

                    "url" => env("MEMORY_URL"),
                    "host" => env("MM_HOST", "localhost"),
                    "port" => env("MM_PORT", "6379"),
                    "username" => env("MM_USERNAME"),
                    "password" => env("MM_PASSWORD"),
                    "database" => config("database.redis.broadcasting.database"),
                ],
            ],
        ],

    ],

    "apps" => [

        "provider" => "config",

        "apps" => [

            [
                "key" => env("REVERB_APP_KEY"),
                "secret" => env("REVERB_APP_SECRET"),
                "app_id" => env("REVERB_APP_ID"),
                "allowed_origins" => [ "*", ],
                "ping_interval" => env("REVERB_APP_PING_INTERVAL", 60),
                "activity_timeout" => env("REVERB_APP_ACTIVITY_TIMEOUT", 30),
                "max_message_size" => env("REVERB_APP_MAX_MESSAGE_SIZE", 10_000),

                "options" => [

                    "host" => env("REVERB_HOST"),
                    "port" => env("REVERB_PORT", 443),
                    "scheme" => env("REVERB_SCHEME", "https"),
                    "useTLS" => env("REVERB_SCHEME", "https") === "https",
                ],
            ],
        ],

    ],

];
