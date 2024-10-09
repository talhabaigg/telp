<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;

if (file_exists($maintenance = __DIR__."/../storage/framework/maintenance.php")) {

    require $maintenance;
}

require __DIR__."/../vendor/autoload.php";

$response = (require_once __DIR__."/../bootstrap/app.php")->handleRequest($request = Request::capture());
