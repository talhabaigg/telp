<?php

namespace Src\V1\Api\Common\Http\Controllers;

/**
 * @OA\Info(
 *      title="Tripteki",
 *      description="Trip Teknologi Documentation",
 *      version="1.0.0"
 * ),
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      in="header",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT"
 * )
 */
abstract class Controller
{
    //
}
