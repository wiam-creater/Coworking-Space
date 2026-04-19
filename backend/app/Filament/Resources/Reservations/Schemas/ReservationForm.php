<?php

namespace App\Filament\Resources\Reservations\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class ReservationForm
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

                Select::make('space_id')
                    ->label('Espace')
                    ->relationship('space', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),

                DatePicker::make('date')
                    ->label('Date de réservation')
                    ->required()
                    ->minDate(now()),

                TimePicker::make('start_time')
                    ->label('Heure de début')
                    ->required()
                    ->seconds(false),

                TimePicker::make('end_time')
                    ->label('Heure de fin')
                    ->required()
                    ->seconds(false),

                TextInput::make('total_price')
                    ->label('Prix total')
                    ->required()
                    ->numeric()
                    ->default(0.00)
                    ->minValue(0)
                    ->suffix('DH'),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'en_attente' => '⏳ En attente',
                        'confirmee'  => '✅ Confirmée',
                        'annulee'    => '❌ Annulée',
                        'terminee'   => '🏁 Terminée',
                    ])
                    ->required()
                    ->default('en_attente'),

                Textarea::make('notes')
                    ->label('Notes')
                    ->rows(3)
                    ->maxLength(500)
                    ->columnSpanFull(),
            ]);
    }
}