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

    //
})
->withExceptions(function (Exceptions $exceptions) {

    //
})->create();
