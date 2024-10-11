<?php

use Src\V0\ACL\Http\Controllers\ACL\ACLController;
use Illuminate\Support\Facades\Route;

Route::prefix(config("adminer.route.user"))->middleware(config("adminer.middleware.user"))->group(function () {

    /**
     * ACLs.
     */
    Route::get("acls", [ ACLController::class, "index", ]);
});
