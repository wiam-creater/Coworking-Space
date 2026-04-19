<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')                          // FK → users(id)
                  ->constrained()
                  ->cascadeOnDelete();
            $table->foreignId('space_id')                         // FK → spaces(id)
                  ->constrained()
                  ->cascadeOnDelete();
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->decimal('total_price', 10, 2)->default(0.00);
            $table->enum('status', ['en_attente', 'confirmee', 'annulee', 'terminee'])
                  ->default('en_attente');
            $table->text('notes')->nullable();
            $table->timestamps();
 
            // Empêcher les conflits de réservation (même espace / même créneau)
            $table->unique(['space_id', 'date', 'start_time', 'end_time'], 'uq_space_time_slot');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
