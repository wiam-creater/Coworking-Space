<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Carbon\Carbon;

class Reservation extends Model
{
    use HasFactory;
 
    // ── Colonnes autorisées ───────────────────────────────────
    protected $fillable = [
        'user_id',
        'space_id',
        'date',
        'start_time',
        'end_time',
        'total_price',
        'status',
        'notes',
    ];
 
    // ── Casts ─────────────────────────────────────────────────
    protected $casts = [
        'date'        => 'date',
        'total_price' => 'decimal:2',
    ];
 
    // ── Méthodes métier ───────────────────────────────────────
 
    /**
     * Calcule le prix total selon la durée et le tarif de l'espace.
     * Exemple : 2h × 50 DH/h = 100 DH
     */
    public function calculatePrice(): float
    {
        $start = Carbon::parse($this->start_time);
        $end   = Carbon::parse($this->end_time);
        $hours = $start->diffInMinutes($end) / 60;
 
        return round($hours * $this->space->price_per_hour, 2);
    }
 
    /** Annule la réservation */
    public function cancelRes(): bool
    {
        return $this->update(['status' => 'annulee']);
    }
 
    /** Confirme la réservation */
    public function confirm(): bool
    {
        return $this->update(['status' => 'confirmee']);
    }
 
    // ── Scopes ────────────────────────────────────────────────
 
    /** Réservations actives (en attente ou confirmées) */
    public function scopeActives($query)
    {
        return $query->whereIn('status', ['en_attente', 'confirmee']);
    }
 
    /** Réservations en retard (en attente et date passée) */
    public function scopeEnRetard($query)
    {
        return $query->where('status', 'en_attente')
                     ->whereDate('date', '<', now());
    }
 
    // ── Relations ─────────────────────────────────────────────
 
    /** Appartient à un user */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
 
    /** Appartient à un espace */
    public function space(): BelongsTo
    {
        return $this->belongsTo(Space::class);
    }
 
    /** Une réservation a un paiement */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
} 

