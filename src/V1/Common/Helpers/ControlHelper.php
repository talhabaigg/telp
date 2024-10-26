<?php

namespace Src\V1\Common\Helpers;

use Illuminate\Support\Facades\Auth;

trait ControlHelper
{
    /**
     * @return array
     */
    public function controls()
    {
        return [

            ...(Auth::check() ? [

                "controls" => $this->when(!is_null($this->user), function () {

                    return [

                        "view" => Auth::user()->can("view", $this->resource),
                        "update" => Auth::user()->can("update", $this->resource),
                        "delete" => Auth::user()->can("delete", $this->resource),
                    ];
                }),

            ] : []),
        ];
    }
};
