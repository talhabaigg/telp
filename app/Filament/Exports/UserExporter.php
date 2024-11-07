<?php

namespace App\Filament\Exports;

use App\Models\User;
use Filament\Actions\Exports\Models\Export;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;

class UserExporter extends Exporter
{
    /**
     * The model that this resource is associated with.
     */
    protected static ?string $model = User::class;

    /**
     * Get the columns to be exported.
     */
    public static function getColumns(): array
    {
        return [

            ExportColumn::make("name"),
            ExportColumn::make("email"),
        ];
    }

    /**
     * Get the body of the notification to be sent after export completion.
     */
    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = "Your user export has completed and ".number_format($export->successful_rows)." ".str("row")->plural($export->successful_rows)." exported.";

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= " ".number_format($failedRowsCount)." ".str("row")->plural($failedRowsCount)." failed to export.";
        }

        return $body;
    }
}
