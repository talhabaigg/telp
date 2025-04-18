<?php

namespace Src\V1\Api\User\Repositories;

use App\Models\User;
use Src\V1\Api\Common\Repositories\Repository as BaseRepository;

class UserRepository extends BaseRepository
{
    /**
     * @return \App\Models\User[]
     */
    public function all(): \Illuminate\Pagination\LengthAwarePaginator
    {
        $model = $this->getUser();

        return parent::accessAll(
            fn () => $model,
            sortables: [ "id", "name", "email", "created_at", "updated_at", "deleted_at", ],
            filterables: [ "id", "name", "email", "created_at", "updated_at", "deleted_at", ]
        );
    }

    /**
     * @return \App\Models\User|null
     */
    public function get(): ?User
    {
        $model = $this->getUser();

        return parent::accessGet(
            fn () => $model ?? null
        );
    }

    /**
     * @param \App\Models\User $userData
     * @return \App\Models\User|null
     */
    public function update(array $userData): ?User
    {
        $model = $this->get();

        return parent::mutateUpdate(
            fn () => $model->update($userData) ? $model : null
        );
    }

    /**
     * @param \App\Models\User $userData
     * @return \App\Models\User|null
     */
    public function create(array $userData): ?User
    {
        return parent::mutateCreate(
            fn () => User::create($userData) ?? null
        );
    }

    /**
     * @return \App\Models\User|null
     */
    public function restore(): ?User
    {
        $model = User::deactivated()->findOrFail($this->getUser()->getKey());

        return parent::mutateDelete(
            fn () => $model->restore() ? $model : null
        );
    }

    /**
     * @return \App\Models\User|null
     */
    public function delete(): ?User
    {
        $model = User::activated()->findOrFail($this->getUser()->getKey());

        return parent::mutateDelete(
            fn () => $model->delete() ? $model : null
        );
    }
}
