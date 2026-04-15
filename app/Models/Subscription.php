<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Subscription extends Model
{
    use HasFactory;
 
    // ── Colonnes autorisées ───────────────────────────────────
    protected $fillable = [
        'user_id',
        'type',
        'start_date',
        'end_date',
        'price',
        'status',
    ];
 
    // ── Casts ─────────────────────────────────────────────────
    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
        'price'      => 'decimal:2',
    ];
 
    // ── Méthodes métier ───────────────────────────────────────
 
    /** Active l'abonnement */
    public function activate(): bool
    {
        return $this->update(['status' => 'actif']);
    }
 
    /** Désactive l'abonnement */
    public function desactivate(): bool
    {
        return $this->update(['status' => 'inactif']);
    }
 
    /** Vérifie si l'abonnement est expiré */
    public function isExpired(): bool
    {
        return $this->end_date-> isPast();
    }
 
    // ── Scopes ────────────────────────────────────────────────
 
    /** Abonnements actifs non expirés */
    public function scopeActifs($query)
    {
        return $query->where('status', 'actif')
                     ->where('end_date', '>=', now());
    }
 
    /** Abonnements expirés non encore marqués */
    public function scopeExpires($query)
    {
        return $query->where('end_date', '<', now())
                     ->where('status', '!=', 'expire');
    }
 
    // ── Relations ─────────────────────────────────────────────
 
    /** Appartient à un user */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
 
    /** Un abonnement a un paiement */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
