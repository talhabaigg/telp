<?php

use Src\V0\Setting\Http\Controllers\Setting\SettingController;
use Illuminate\Support\Facades\Route;

Route::prefix(config("adminer.route.user"))->middleware(config("adminer.middleware.user"))->group(function () {

    /**
     * Settings.
     */
    Route::apiResource("settings", SettingController::class)->only([ "index", "update", "destroy", ])->parameters([ "settings" => "key", ]);
});
