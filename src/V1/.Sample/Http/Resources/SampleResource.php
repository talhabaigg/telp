<?php
 
namespace Src\V1\Sample\Http\Resources;

use Src\V1\Common\Helpers\ControlHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

class SampleResource extends JsonResource
{
    use ControlHelper;

    /**
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [

            "id" => $this->when(!is_null($this->user), $this->id),
            "content" => $this->when(!is_null($this->user), $this->content),
            "created_at" => $this->when(!is_null($this->user), $this->created_at),
            "updated_at" => $this->when(!is_null($this->user), $this->updated_at),
            "deleted_at" => $this->when(!is_null($this->user), $this->updated_at),
            "user" => $this->whenLoaded("user"),
            "samples" => $this->whenLoaded("samples"),
            "samples_count" => $this->whenCounted("samples"),
            ...($this->controls()),
        ];
    }
};
