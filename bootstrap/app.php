<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
->withCommands([

    //
])
->withRouting(

    api: __DIR__."/../routes/api.php", apiPrefix: "api",
    web: __DIR__."/../routes/web.php",
    health: "/status",
)
->withBroadcasting(

    channels: __DIR__."/../routes/channels.php",
)
->withMiddleware(function (Middleware $middleware) {

    $middleware->alias([

        "i18n" => \Src\V1\Api\I18N\Http\Middlewares\I18NWebMiddleware::class,
    ]);

    $middleware->web(append: [

        \App\Http\Middleware\HandleInertiaRequestsResponses::class,
    ]);

    $middleware->group("api", [

        "throttle:api",
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \Src\V1\Api\Common\Http\Middlewares\ApiMiddleware::class,
        \Src\V1\Api\I18N\Http\Middlewares\I18NApiMiddleware::class,
    ]);
})
->withExceptions(function (Exceptions $exceptions) {

    //

})->create();
