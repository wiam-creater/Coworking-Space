<?php

namespace App\Filament\Resources\Spaces\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput as UrlInput;
use Filament\Schemas\Schema;

class SpaceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nom de l\'espace')
                    ->required()
                    ->maxLength(100),

                Select::make('type')
                    ->label('Type d\'espace')
                    ->options([
                        'bureau'        => '🖥️ Bureau privé',
                        'salle_reunion' => '👥 Salle de réunion',
                        'espace_ouvert' => '🌐 Espace ouvert',
                        'cabine'        => '📦 Cabine',
                    ])
                    ->required(),

                TextInput::make('capacity')
                    ->label('Capacité (personnes)')
                    ->required()
                    ->numeric()
                    ->minValue(1)
                    ->default(1),

                TextInput::make('price_per_hour')
                    ->label('Prix par heure (DH)')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->suffix('DH'),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'disponible'   => '✅ Disponible',
                        'indisponible' => '❌ Indisponible',
                        'maintenance'  => '🔧 En maintenance',
                    ])
                    ->required()
                    ->default('disponible'),

                TextInput::make('image')
                    ->label('URL de l\'image')
                    ->url()
                    ->placeholder('https://images.unsplash.com/...')
                    ->maxLength(500)
                    ->columnSpanFull(),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(3)
                    ->maxLength(500)
                    ->columnSpanFull(),
            ]);
    }
}