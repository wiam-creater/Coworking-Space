<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
         'role',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];

    }
    // ── Helpers rôles ─────────────────────────────────────────
 
    /** Vérifie si l'utilisateur est admin */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
 
    /** Vérifie si l'utilisateur est membre */
    public function isMember(): bool
    {
        return $this->role === 'member';
    }
 
    // ── Relations ─────────────────────────────────────────────
 
    /** Un user a plusieurs réservations */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
 
    /** Un user a plusieurs abonnements */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }
 
    /** Abonnement actif en cours */
    public function activeSubscription(): HasOne
    {
        return $this->hasOne(Subscription::class)
                    ->where('status', 'actif')
                    ->latestOfMany();
    }
 
    /** Un user a plusieurs paiements */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
