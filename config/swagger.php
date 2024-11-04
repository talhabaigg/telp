<?php

return [

    /**
     * Enable or disable the Weather Swagger.
     * Set to false to hide Swagger's route.
     */
    "enable" => env("SWAGGER_ENABLE", config("app.env") !== "production"),

    /**
     * The title of the API documentation.
     */
    "title" => env("APP_NAME", "Application API Documentation"),

    /**
     * A brief description of the API.
     */
    "description" => env("APP_DESCRIPTION", "Documentation for the Application API"),

    /**
     * The version of the API.
     */
    "version" => env("APP_VERSION", "1.0.0"),



    /**
     * The host of the API.
     */
    "host" => env("APP_URL"),

    /**
     * The path to access the API documentation.
     */
    "path" => env("SWAGGER_PATH", "/api/docs"),

    /**
     * The base path for the API.
     */
    "api_base_path" => env("SWAGGER_API_BASE_PATH", "/api"),



    /**
     * The storage path for Swagger-related files.
     */
    "storage" => env("SWAGGER_STORAGE", storage_path("swagger")),

    /**
     * The path to the API views.
     */
    "views" => base_path("resources/views/vendor/swagger"),

    /**
     * The path for API translations.
     */
    "translations" => base_path("resources/lang/vendor/swagger"),

    /**
     * List of servers for the API.
     * Can be a simple array of URLs or an array of associative arrays with "url" and "description".
     */
    "servers" => env("APP_URL", false) ? [ env("APP_URL").env("SWAGGER_API_BASE_PATH", "/api"), ] : [],

    /**
     * Always generate schema when accessing Swagger.
     */
    "generated" => env("SWAGGER_GENERATE_ALWAYS", true),

    /**
     * Additional data to append to all routes.
     */
    "append" => [

        "responses" => [

            "401" => [

                "description" => "(Unauthorized) Invalid or missing Access Token.",
            ],
        ],
    ],

    /**
     * List of ignored items (routes and methods).
     * These will be hidden from the documentation.
     */
    "ignored" => [

        "methods" => [

            "head",
            "options",
        ],

        "routes" => [

            "passport.authorizations.authorize",
            "passport.authorizations.approve",
            "passport.authorizations.deny",
            "passport.token",
            "passport.tokens.index",
            "passport.tokens.destroy",
            "passport.token.refresh",
            "passport.clients.index",
            "passport.clients.store",
            "passport.clients.update",
            "passport.clients.destroy",
            "passport.scopes.index",
            "passport.personal.tokens.index",
            "passport.personal.tokens.store",
            "passport.personal.tokens.destroy",
            "/_ignition/health-check",
            "/_ignition/execute-solution",
            "/_ignition/share-report",
            "/_ignition/scripts/{script}",
            "/_ignition/styles/{style}",
            env("SWAGGER_PATH", "/api/docs"),
            env("SWAGGER_PATH", "/api/docs")."/content",
        ],

        "models" => [

            //
        ],
    ],

    /**
     * Tags for organizing API routes.
     */
    "tags" => [

        //
    ],

    /**
     * Default tag generation strategy.
     * Options: "prefix" (first non-null part of URI) or "controller" (controller name in words).
     */
    "default_tags_generation_strategy" => env("SWAGGER_DEFAULT_TAGS_GENERATION_STRATEGY", "prefix"),

    /**
     * Parsing strategies for documentation.
     */
    "parse" => [

        "docBlock" => true,
        "security" => true,
    ],

    /**
     * Authentication flow values.
     */
    "authentication_flow" => [

        "bearerAuth" => "http",
        // "OAuth2" => "authorizationCode", //
    ],

    /**
     * List of security middlewares.
     * Paths under these middlewares will be protected.
     */
    "security_middlewares" => [

        "auth:sanctum",
        "auth:api",
    ],

    /**
     * Schema builders for custom Swagger responses.
     * Implement your own schema builder if needed.
     */
    "schema_builders" => [

        "P" => \Mezatsong\SwaggerDocs\Responses\SchemaBuilders\LaravelPaginateSchemaBuilder::class,
        "SP" => \Mezatsong\SwaggerDocs\Responses\SchemaBuilders\LaravelSimplePaginateSchemaBuilder::class,
    ],

];
