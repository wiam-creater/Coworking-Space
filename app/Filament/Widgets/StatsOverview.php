<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\Reservation;
use App\Models\Payment;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            // ── Nombre de membres ──────────────────────────────
            Stat::make('Nombre de membres', User::where('role', 'member')->count())
                ->description('Total des membres inscrits')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),

            // ── Nombre de réservations ─────────────────────────
            Stat::make('Réservations', Reservation::count())
                ->description(Reservation::where('status', 'confirmee')->count() . ' confirmées')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),

            // ── Revenus générés ────────────────────────────────
            Stat::make('Revenus générés', Payment::where('status', 'paye')->sum('amount') . ' DH')
                ->description('Total des paiements reçus')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('warning'),

            // ── Paiements en retard ────────────────────────────
            Stat::make('Paiements en retard', Payment::where('status', 'en_attente')
                ->whereDate('due_date', '<', now())
                ->count())
                ->description('Paiements non réglés')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color('danger'),
        ];
    }
}