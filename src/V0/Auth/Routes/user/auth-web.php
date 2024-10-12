<?php

use Src\V0\Auth\Http\Controllers\API\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::get("/auth/verify-email/{id}/{hash}", VerifyEmailController::class)
                ->middleware([ "auth:web", "signed", "throttle:6,1", ])
                ->name("verification.verify");