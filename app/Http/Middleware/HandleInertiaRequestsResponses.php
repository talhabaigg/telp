<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;

class HandleInertiaRequestsResponses extends Middleware
{
    /**
     * The root template that's loaded on the initial page visit.
     */
    protected $rootView = "app";

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return $response = parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        return $response = array_merge(parent::share($request), [

            //
        ]);
    }
}
