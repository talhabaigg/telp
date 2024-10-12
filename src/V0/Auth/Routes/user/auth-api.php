<?php

use Src\V0\Auth\Http\Controllers\API\Auth\AuthenticatedController;
use Src\V0\Auth\Http\Controllers\API\Auth\EmailVerificationNotificationController;
use Src\V0\Auth\Http\Controllers\API\Auth\NewPasswordController;
use Src\V0\Auth\Http\Controllers\API\Auth\PasswordResetLinkController;
use Src\V0\Auth\Http\Controllers\API\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::post("/auth/register", [RegisteredUserController::class, "store"])
                ->middleware("guest:api")
                ->name("register");

Route::post("/auth/login", [AuthenticatedController::class, "store"])
                ->middleware("guest:api")
                ->name("login");

Route::post("/auth/logout", [AuthenticatedController::class, "destroy"])
                ->middleware("auth:api")
                ->name("logout");

Route::match([ "put", "patch", ], "/auth/refresh", [AuthenticatedController::class, "update"])
                ->middleware("auth:api")
                ->name("refresh");

Route::get("/auth/me", [AuthenticatedController::class, "me"])
                ->middleware("auth:api")
                ->name("me");

Route::post("/auth/email/verification-notification", [EmailVerificationNotificationController::class, "store"])
                ->middleware([ "auth:api", "throttle:6,1", ])
                ->name("verification.send");

Route::post("/auth/forgot-password", [PasswordResetLinkController::class, "store"])
                ->middleware("guest:api")
                ->name("password.email");

Route::post("/auth/reset-password", [NewPasswordController::class, "store"])
                ->middleware("guest:api")
                ->name("password.store");
