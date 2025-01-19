<?php

namespace Src\V1\Api\I18N\Http\Middlewares;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Src\V1\Api\I18N\Services\I18NService;

class I18NWebMiddleware
{
    /**
     * @var \Src\V1\Api\I18N\Services\I18NService
     */
    protected $i18nService;

    /**
     * @param \Src\V1\Api\I18N\Services\I18NService $i18nService
     * @return void
     */
    public function __construct(I18NService $i18nService)
    {
        $this->i18nService = $i18nService;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param string ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response|RedirectResponse|JsonResponse
    {
        $this->i18nService->getLanguageFromSession($request);

        return $response = $next($request);
    }
}
