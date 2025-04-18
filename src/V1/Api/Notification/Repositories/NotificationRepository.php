<?php

namespace Src\V1\Api\Notification\Repositories;

use Illuminate\Notifications\DatabaseNotification;
use Src\V1\Api\Common\Repositories\Repository as BaseRepository;

class NotificationRepository extends BaseRepository
{
    /**
     * @return \Illuminate\Notifications\DatabaseNotification[]
     */
    public function all(): \Illuminate\Pagination\LengthAwarePaginator
    {
        $model = $this->getUser()->notifications()->whereNot("type", \Filament\Notifications\DatabaseNotification::class);

        return parent::accessAll(
            fn () => $model,
            sortables: [ "id", "type", "updated_at", "read_at", ],
            defaultSorts: [ "-updated_at", "-read_at", ],
            filterables: [ "id", "type", "updated_at", "read_at", ],
            defaultFilters: [],
        );
    }

    /**
     * @return \Illuminate\Notifications\DatabaseNotification[]
     */
    public function readall(): \Illuminate\Notifications\DatabaseNotificationCollection
    {
        $model = $this->getUser()->unreadNotifications()->whereNot("type", \Filament\Notifications\DatabaseNotification::class)->get();

        return parent::mutateUpdate(
            fn () => $model->markAsRead() ? null : $model
        );
    }

    /**
     * @param int|string $id
     * @return \Illuminate\Notifications\DatabaseNotification|null
     */
    public function read(int|string $id): ?DatabaseNotification
    {
        $model = $this->getUser()->unreadNotifications()->findOrFail($id);

        return parent::mutateUpdate(
            fn () => $model->markAsRead() ? null : $model
        );
    }

    /**
     * @return int
     */
    public function unread(): int
    {
        return $model = $this->getUser()->unreadNotifications()->whereNot("type", \Filament\Notifications\DatabaseNotification::class)->count();
    }

    /**
     * @param int|string $id
     * @return \Illuminate\Notifications\DatabaseNotification|null
     */
    public function get(int|string $id): ?DatabaseNotification
    {
        $model = $this->getUser()->notifications()->findOrFail($id);

        return parent::accessGet(
            fn () => $model ?? null
        );
    }

    /**
     * @param int|string $id
     * @return \Illuminate\Notifications\DatabaseNotification|null
     */
    public function delete(int|string $id): ?DatabaseNotification
    {
        $model = $this->getUser()->notifications()->findOrFail($id);

        return parent::mutateDelete(
            fn () => $model->delete() ? $model : null
        );
    }
}
