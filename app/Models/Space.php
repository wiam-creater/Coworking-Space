<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Space extends Model
{
    use HasFactory;
 
    // ── Colonnes autorisées ───────────────────────────────────
    protected $fillable = [
        'name',
        'type',
        'capacity',
        'price_per_hour',
        'description',
        'status',
    ];
 
    // ── Casts ─────────────────────────────────────────────────
    protected $casts = [
        'price_per_hour' => 'decimal:2',
        'capacity'       => 'integer',
    ];
 
    // ── Scopes ────────────────────────────────────────────────
 
    /** Espaces disponibles uniquement */
    public function scopeDisponible($query)
    {
        return $query->where('status', 'disponible');
    }
 
    /** Filtrer par type */
    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }
 
    // ── Méthodes métier ───────────────────────────────────────
 
    /**
     * Vérifie si l'espace est libre pour un créneau donné.
     * Utilisé avant de créer une réservation.
     */
    public function isAvailable(string $date, string $startTime, string $endTime): bool
    {
        return !$this->reservations()
            ->where('date', $date)
            ->where('status', '!=', 'annulee')
            ->where(function ($q) use ($startTime, $endTime) {
                $q->where(function ($q2) use ($startTime, $endTime) {
                    // créneau demandé chevauche une réservation existante
                    $q2->where('start_time', '<', $endTime)
                       ->where('end_time', '>', $startTime);
                });
            })
            ->exists();
    }
 
    // ── Relations ─────────────────────────────────────────────
 
    /** Un espace a plusieurs réservations */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}

