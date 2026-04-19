<?php

namespace App\Filament\Resources\Payments\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PaymentForm
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

                Select::make('reservation_id')
                    ->label('Réservation')
                    ->relationship('reservation', 'id')
                    ->searchable()
                    ->preload()
                    ->nullable(),

                Select::make('subscription_id')
                    ->label('Abonnement')
                    ->relationship('subscription', 'type')
                    ->searchable()
                    ->preload()
                    ->nullable(),

                TextInput::make('amount')
                    ->label('Montant')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->suffix('DH'),

                Select::make('method')
                    ->label('Méthode de paiement')
                    ->options([
                        'especes'  => '💵 Espèces',
                        'carte'    => '💳 Carte bancaire',
                        'virement' => '🏦 Virement',
                        'en_ligne' => '🌐 En ligne',
                    ])
                    ->required()
                    ->default('especes'),

                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'en_attente' => '⏳ En attente',
                        'paye'       => '✅ Payé',
                        'rembourse'  => '↩️ Remboursé',
                        'echoue'     => '❌ Échoué',
                    ])
                    ->required()
                    ->default('en_attente'),

                DateTimePicker::make('payment_date')
                    ->label('Date de paiement')
                    ->nullable(),

                DatePicker::make('due_date')
                    ->label('Date d\'échéance')
                    ->required()
                    ->minDate(now()),

                TextInput::make('reference')
                    ->label('Référence')
                    ->maxLength(100)
                    ->unique(ignoreRecord: true)
                    ->nullable(),
            ]);
    }
}