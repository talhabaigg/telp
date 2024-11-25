<?php

namespace Src\V1\Api\Common\Http\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;

class I18NMiddleware
{
    /**
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param string ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response|JsonResponse
    {
        if ($request->expectsJson()) {

            $language = $this->getLanguageFromQueryString($request) ??
                        $this->getLanguageFromAcceptHeader($request) ??
                        $this->getLanguageFromCustomHeader($request);

            if ($language) App::setLocale($language);
        }

        return $response = $next($request);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    protected function getLanguageFromCustomHeader(Request $request): string|null
    {
        return $request->header("x-lang");
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    protected function getLanguageFromQueryString(Request $request): string|null
    {
        return $request->query("lang");
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    protected function getLanguageFromAcceptHeader(Request $request): string|null
    {
        $acceptLanguage = $request->header("accept-language");

        if ($acceptLanguage) {

            $languages = explode(",", $acceptLanguage);

            return strtok($languages[0], "-");
        }

        return null;
    }
}
