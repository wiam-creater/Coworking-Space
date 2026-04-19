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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')                          // FK → users(id)
                  ->constrained()
                  ->cascadeOnDelete();
            $table->foreignId('reservation_id')                   // FK → reservations(id) nullable
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();
            $table->foreignId('subscription_id')                  // FK → subscriptions(id) nullable
                  ->nullable()
                  ->constrained()
                  ->nullOnDelete();
            $table->decimal('amount', 10, 2);
            $table->enum('method', ['especes', 'carte', 'virement', 'en_ligne'])->default('especes');
            $table->enum('status', ['en_attente', 'paye', 'rembourse', 'echoue'])->default('en_attente');
            $table->dateTime('payment_date')->nullable();
            $table->date('due_date');
            $table->string('reference', 100)->nullable()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
