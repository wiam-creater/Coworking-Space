<?php

namespace App\Filament\Resources\Subscriptions\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SubscriptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Membre')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                Select::make('type')
                    ->label('Type d\'abonnement')
                    ->options([
                        'mensuel'      => '📅 Mensuel',
                        'trimestriel'  => '📆 Trimestriel',
                        'annuel'       => '🗓️ Annuel',
                    ])
                    ->required(),

                DatePicker::make('start_date')
                    ->label('Date de début')
                    ->required()
                    ->minDate(now()),

                DatePicker::make('end_date')
                    ->label('Date de fin')
                    ->required()
                    ->minDate(now()),

                TextInput::make('price')
                    ->label('Prix')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->suffix('DH'),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'actif'     => '✅ Actif',
                        'inactif'   => '⏸️ Inactif',
                        'expire'    => '⌛ Expiré',
                        'suspendu'  => '🚫 Suspendu',
                    ])
                    ->required()
                    ->default('actif'),
            ]);
    }
}