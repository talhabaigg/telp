<?php

namespace Src\V1\Api\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Src\V1\Api\User\Dtos\UserDto;
use Src\V1\Api\User\Services\UserService;
use Src\V1\Api\Common\Http\Controllers\Controller as BaseController;

class UserController extends BaseController
{
    /**
     * @var \Src\V1\Api\User\Services\UserService
     */
    protected $userService;

    /**
     * @param \Src\V1\Api\User\Services\UserService $userService
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @OA\Get(
     *      path="/api/v1/users/me",
     *      tags={"Users"},
     *      summary="Show",
     *      security={{ "bearerAuth": {} }},
     *      @OA\Response(
     *          response=200,
     *          description="Success."
     *      )
     * )
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(): JsonResponse
    {
        return response()->json($this->userService->get(), 200);
    }
}
