<?php

namespace Src\V1\Api\Notification\Services;

use Src\V1\Api\Notification\Dtos\NotificationValidatorDto;
use Src\V1\Api\Notification\Dtos\ReadNotificationValidatorDto;
use Src\V1\Api\Notification\Dtos\UnreadNotificationValidatorDto;
use Src\V1\Api\Notification\Dtos\NotificationTransformerDto;
use Src\V1\Api\Notification\Repositories\NotificationRepository;
use Src\V1\Api\Common\Services\Service as BaseService;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;

class NotificationService extends BaseService
{
    /**
     * @var \Src\V1\Api\Notification\Repositories\NotificationRepository
     */
    protected $notificationRepository;

    /**
     * @param \Src\V1\Api\Notification\Repositories\NotificationRepository $notificationRepository
     * @return void
     */
    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    /**
     * @return \Src\V1\Api\Notification\Dtos\NotificationTransformerDto[]
     */
    public function all(): PaginatedDataCollection
    {
        $notificationDto = NotificationTransformerDto::collect($this->notificationRepository->all(), PaginatedDataCollection::class);

        return $notificationDto;
    }

    /**
     * @return \Src\V1\Api\Notification\Dtos\NotificationTransformerDto[]
     */
    public function readall(): DataCollection
    {
        $notificationDto = NotificationTransformerDto::collect($this->notificationRepository->readall(), DataCollection::class);

        return $notificationDto;
    }

    /**
     * @param \Src\V1\Api\Notification\Dtos\UnreadNotificationValidatorDto $notificationData
     * @return \Src\V1\Api\Notification\Dtos\NotificationTransformerDto
     */
    public function read(UnreadNotificationValidatorDto $notificationData): NotificationTransformerDto
    {
        $notificationDto = NotificationTransformerDto::from($this->notificationRepository->read($notificationData->id));

        return $notificationDto;
    }

    /**
     * @return int
     */
    public function unread(): int
    {
        return $this->notificationRepository->unread();
    }

    /**
     * @param \Src\V1\Api\Notification\Dtos\NotificationValidatorDto $notificationData
     * @return \Src\V1\Api\Notification\Dtos\NotificationTransformerDto
     */
    public function get(NotificationValidatorDto $notificationData): NotificationTransformerDto
    {
        $notificationDto = NotificationTransformerDto::from($this->notificationRepository->get($notificationData->id));

        return $notificationDto;
    }

    /**
     * @param \Src\V1\Api\Notification\Dtos\NotificationValidatorDto $notificationData
     * @return \Src\V1\Api\Notification\Dtos\NotificationTransformerDto
     */
    public function delete(NotificationValidatorDto $notificationData): NotificationTransformerDto
    {
        $notificationDto = NotificationTransformerDto::from($this->notificationRepository->delete($notificationData->id));

        return $notificationDto;
    }
}
