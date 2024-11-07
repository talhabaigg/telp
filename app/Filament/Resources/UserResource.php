<?php

namespace App\Filament\Resources;

use App\Models\User;
use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Filament\Exports\UserExporter;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Tables\Actions\ExportAction;
use Filament\Resources\Resource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserResource extends Resource
{
    /**
     * The model that this resource is associated with.
     */
    protected static ?string $model = User::class;

    /**
     * The icon to be displayed in the navigation menu for this resource.
     */
    protected static ?string $navigationIcon = "heroicon-o-rectangle-stack";

    /**
     * Defines the form schema for creating and editing User records.
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([

                Forms\Components\TextInput::make("name")->required()->label("Name"),
                Forms\Components\TextInput::make("email")->email()->unique()->required()->label("E-Mail"),
                Forms\Components\TextInput::make("password")->password()->required()->label("Password"),
                Forms\Components\TextInput::make("password_confirmation")->password()->same("password")->required()->label("Password Confirmation"),
            ]);
    }

    /**
     * Defines the table schema for listing User records.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->headerActions([

                ExportAction::make()->exporter(UserExporter::class),
            ])
            ->columns([

                Tables\Columns\TextColumn::make("id")->label("ID"),
                Tables\Columns\TextColumn::make("name")->sortable()->label("Name"),
                Tables\Columns\TextColumn::make("email")->sortable()->label("E-Mail"),
                Tables\Columns\TextColumn::make("created_at")->sortable()->label("Creation"),
            ])
            ->defaultSort("email")
            ->filters([

                Tables\Filters\TrashedFilter::make(),
                Tables\Filters\Filter::make("name")->label("Name"),
                Tables\Filters\Filter::make("email")->label("E-Mail"),
                Tables\Filters\Filter::make("created_at")->label("Creation"),
            ])
            ->actions([

                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([

                Tables\Actions\BulkActionGroup::make([

                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    /**
     * Get the Eloquent query builder for the resource, excluding global scopes.
     */
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([

                SoftDeletingScope::class,
            ]);
    }

    /**
     * Returns an array of relationships for the User model.
     */
    public static function getRelations(): array
    {
        return [

            //
        ];
    }

    /**
     * Returns an array of pages available for the User resource.
     */
    public static function getPages(): array
    {
        return [

            "index" => Pages\ListUsers::route("/"),
            "create" => Pages\CreateUser::route("/create"),
            "edit" => Pages\EditUser::route("/{record}/edit"),
        ];
    }
}
