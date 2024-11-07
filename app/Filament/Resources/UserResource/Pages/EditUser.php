<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    /**
     * The resource associated with this page.
     */
    protected static string $resource = UserResource::class;

    /**
     * Returns an array of actions available in the header of the edit page.
     */
    protected function getHeaderActions(): array
    {
        return [

            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
