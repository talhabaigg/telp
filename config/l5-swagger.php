<?php

return [

    "default" => env("SWAGGER", "default"),

    "documentations" => env("IS_SWAGGER", false) ? [

        "default" => [

            "api" => [ "title" => "Swagger", ],

            "routes" => [

                "api" => "api/docs",
            ],

            "paths" => [

                "use_absolute_path" => true,
                "docs_yaml" => "api-docs.yaml",
                "docs_json" => "api-docs.json",
                "format_to_use_for_docs" => env("SWAGGER_DEFAULT_FORMAT", "json"),

                "annotations" => [

                    base_path("app"),
                    base_path("src"),
                ],
            ],
        ],

    ] : [],

    //

    "defaults" => [

        "generate_always" => env("SWAGGER_AUTO_GENERATE", false),
        "generate_yaml_copy" => false,
        "proxy" => false,
        "additional_config_url" => null,
        "operations_sort" => null,
        "validator_url" => null,

        "ui" => [

            "display" => [

                "dark_mode" => env("SWAGGER_THEME_DARK_MODE", false),

                "filter" => true,
                "doc_expansion" => "none",
            ],

            "authorization" => [

                "persist_authorization" => false,

                "oauth2" => [

                    "use_pkce_with_authorization_code_grant" => false,
                ],
            ],
        ],

        "routes" => [

            "docs" => "/",

            "oauth2_callback" => "api/oauth2-callback",

            "middleware" => [

                "asset" => [

                    //
                ],
                
                "api" => [

                    //
                ],

                "docs" => [

                    //
                ],

                "oauth2_callback" => [

                    //
                ],
            ],

            "group_options" => [

                //
            ],
        ],

        "paths" => [

            "base" => "api",
            "docs" => storage_path("swagger"),
            "views" => resource_path("views/vendor/swagger"),
            "swagger_ui_assets_path" => "vendor/swagger-api/swagger-ui/dist",

            "excludes" => [

                //
            ],
        ],

        "scanOptions" => [

            "analyser" => null,
            "analysis" => null,
            "pattern" => null,
            "open_api_spec_version" => \L5Swagger\Generator::OPEN_API_DEFAULT_SPEC_VERSION,

            "default_processors_configuration" => [

                //
            ],

            "processors" => [

                //
            ],

            "exclude" => [

                //
            ],
        ],

        "securityDefinitions" => [

            "securitySchemes" => [

                //
            ],

            "security" => [

                //
            ],
        ],

        "constants" => [

            //
        ],
    ],

];
