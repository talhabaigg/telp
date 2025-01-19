<?php

namespace Src\V1\Api\I18N\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller as BaseController;
use Src\V1\Api\I18N\Services\I18NService;

class I18NController extends BaseController
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
     * @param string $lang
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, string $lang): Response|RedirectResponse
    {
        $this->i18nService->setLanguageFromSession($request, $lang);

        return back();
    }
}
