<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
   use HasFactory;
 
    // ── Colonnes autorisées ───────────────────────────────────
    protected $fillable = [
        'user_id',
        'reservation_id',
        'subscription_id',
        'amount',
        'method',
        'status',
        'payment_date',
        'due_date',
        'reference',
    ];
 
    // ── Casts ─────────────────────────────────────────────────
    protected $casts = [
        'amount'       => 'decimal:2',
        'payment_date' => 'datetime',
        'due_date'     => 'date',
    ];
 
    // ── Scopes ────────────────────────────────────────────────
 
    /** Paiements en retard (en attente et date dépassée) */
    public function scopeEnRetard($query)
    {
        return $query->where('status', 'en_attente')
                     ->whereDate('due_date', '<', now());
    }
 
    /** Paiements effectués */
    public function scopePaies($query)
    {
        return $query->where('status', 'paye');
    }
 
    // ── Relations ─────────────────────────────────────────────
 
    /** Appartient à un user */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
 
    /** Appartient à une réservation (nullable) */
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }
 
    /** Appartient à un abonnement (nullable) */
    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }
}  

