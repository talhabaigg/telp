<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
->withRouting(

    api: __DIR__."/../routes/api.php", apiPrefix: "api",
    web: __DIR__."/../routes/web.php",
    health: "/status",
)
->withCommands([

    \Src\V0\User\Console\Commands\GenerateUserCommand::class,
])
->withMiddleware(function (Middleware $middleware) {

    $middleware->group("api", [

        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        \App\Http\Middleware\Api::class,
    ]);
})
->withExceptions(function (Exceptions $exceptions) {

    $exceptions->report(function (\Src\V0\Auth\Exceptions\AuthTokenHandler $thrower) {

        //
    });

})->create();
