<?php

namespace Src\V1\Api\Notification\Dtos;

use Illuminate\Notifications\DatabaseNotification;
use Spatie\LaravelData\Data;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class NotificationTransformerDto extends Data
{
    /**
     * @param string $id
     * @param string $type
     * @param string $notifiable_id
     * @param string $notifiable_type
     * @param array $data
     * @param \DateTime|null $created_at
     * @param \DateTime|null $updated_at
     * @param \DateTime|null $read_at
     * @return void
     */
    public function __construct(
        public string $id,
        public string $type,
        public string $notifiable_id,
        public string $notifiable_type,
        public array $data,
        public ?\DateTime $created_at,
        public ?\DateTime $updated_at,
        public ?\DateTime $read_at
    ) {
        //
    }
}
