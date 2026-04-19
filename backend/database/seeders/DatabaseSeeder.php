<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Reset
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('payments')->truncate();
        DB::table('reservations')->truncate();
        DB::table('subscriptions')->truncate();
        DB::table('spaces')->truncate();
        DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // =========================
        // USERS
        // =========================
        DB::table('users')->insert([
            [
                'name'       => 'Admin Coworking',
                'email'      => 'admin@coworking.ma',
                'password'   => Hash::make('password'),
                'role'       => 'admin',
                'phone'      => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Ahmed Benali',
                'email'      => 'ahmed@gmail.com',
                'password'   => Hash::make('123456'),
                'role'       => 'member',
                'phone'      => '0612345678',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Sara Alaoui',
                'email'      => 'sara@gmail.com',
                'password'   => Hash::make('123456'),
                'role'       => 'member',
                'phone'      => '0623456789',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Youssef Idrissi',
                'email'      => 'youssef@gmail.com',
                'password'   => Hash::make('123456'),
                'role'       => 'member',
                'phone'      => '0634567890',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Fatima Zahra',
                'email'      => 'fatima@gmail.com',
                'password'   => Hash::make('123456'),
                'role'       => 'member',
                'phone'      => '0645678901',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Karim Mansouri',
                'email'      => 'karim@gmail.com',
                'password'   => Hash::make('123456'),
                'role'       => 'member',
                'phone'      => '0656789012',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'       => 'Nadia Tazi',
                'email'      => 'nadia@gmail.com',
                'password'   => Hash::make('123456'),
                'role'       => 'member',
                'phone'      => '0667890123',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // =========================
        // SPACES (6 espaces avec images)
        // =========================
        DB::table('spaces')->insert([
            [
                'name'          => 'Salle réunion',
                'type'          => 'salle_reunion',
                'capacity'      => 8,
                'price_per_hour'=> 150,
                'description'   => 'Salle de réunion avec projecteur',
                'image'         => 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
                'status'        => 'disponible',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Zone d\'Étude',
                'type'          => 'espace_ouvert',
                'capacity'      => 20,
                'price_per_hour'=> 30,
                'description'   => 'Zone de travail collaboratif',
                'image'         => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
                'status'        => 'disponible',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Bureau Privé',
                'type'          => 'bureau',
                'capacity'      => 1,
                'price_per_hour'=> 50,
                'description'   => 'Bureau individuel équipé',
                'image'         => 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
                'status'        => 'disponible',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Espace Premium',
                'type'          => 'bureau',
                'capacity'      => 1,
                'price_per_hour'=> 100,
                'description'   => 'Bureau individuel calme avec vue',
                'image'         => 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
                'status'        => 'disponible',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Open Space',
                'type'          => 'espace_ouvert',
                'capacity'      => 20,
                'price_per_hour'=> 30,
                'description'   => 'Espace ouvert collaboratif',
                'image'         => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
                'status'        => 'disponible',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'name'          => 'Espace Bureau Moderne',
                'type'          => 'bureau',
                'capacity'      => 2,
                'price_per_hour'=> 90,
                'description'   => 'Espace moderne pour travail professionnel',
                'image'         => 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=1200&q=80',
                'status'        => 'disponible',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);

        // =========================
        // SUBSCRIPTIONS
        // =========================
        DB::table('subscriptions')->insert([
            ['user_id' => 2, 'type' => 'mensuel',     'start_date' => '2025-01-01', 'end_date' => '2025-01-31', 'price' => 500.00,  'status' => 'expire', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'type' => 'trimestriel', 'start_date' => '2025-01-01', 'end_date' => '2025-03-31', 'price' => 1200.00, 'status' => 'expire', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'type' => 'mensuel',     'start_date' => '2025-02-01', 'end_date' => '2025-02-28', 'price' => 500.00,  'status' => 'expire', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'type' => 'annuel',      'start_date' => '2025-01-01', 'end_date' => '2025-12-31', 'price' => 4000.00, 'status' => 'actif',  'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 6, 'type' => 'mensuel',     'start_date' => '2025-03-01', 'end_date' => '2025-03-31', 'price' => 500.00,  'status' => 'expire', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 7, 'type' => 'trimestriel', 'start_date' => '2025-02-01', 'end_date' => '2025-04-30', 'price' => 1200.00, 'status' => 'actif',  'created_at' => now(), 'updated_at' => now()],
        ]);

        // =========================
        // RESERVATIONS
        // =========================
        DB::table('reservations')->insert([
            ['user_id' => 2, 'space_id' => 1, 'date' => '2025-04-01', 'start_time' => '09:00:00', 'end_time' => '11:00:00', 'total_price' => 300.00, 'status' => 'confirmee',  'notes' => 'Reunion equipe',             'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'space_id' => 2, 'date' => '2025-04-02', 'start_time' => '10:00:00', 'end_time' => '12:00:00', 'total_price' => 60.00,  'status' => 'confirmee',  'notes' => 'Travail individuel',         'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'space_id' => 3, 'date' => '2025-04-03', 'start_time' => '08:00:00', 'end_time' => '10:00:00', 'total_price' => 100.00, 'status' => 'terminee',   'notes' => 'Entretien client',           'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'space_id' => 4, 'date' => '2025-04-04', 'start_time' => '14:00:00', 'end_time' => '16:00:00', 'total_price' => 200.00, 'status' => 'confirmee',  'notes' => 'Formation',                  'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 6, 'space_id' => 5, 'date' => '2025-04-05', 'start_time' => '09:00:00', 'end_time' => '11:00:00', 'total_price' => 60.00,  'status' => 'annulee',    'notes' => 'Annule par membre',          'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 7, 'space_id' => 6, 'date' => '2025-04-06', 'start_time' => '11:00:00', 'end_time' => '13:00:00', 'total_price' => 180.00, 'status' => 'en_attente', 'notes' => 'En attente confirmation',    'created_at' => now(), 'updated_at' => now()],
        ]);

        // =========================
        // PAYMENTS
        // =========================
        DB::table('payments')->insert([
            ['user_id' => 2, 'reservation_id' => 1, 'subscription_id' => null, 'amount' => 300.00, 'method' => 'carte',    'status' => 'paye',       'payment_date' => '2025-04-01 09:00:00', 'due_date' => '2025-04-01', 'reference' => 'PAY-2025-001', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'reservation_id' => 2, 'subscription_id' => null, 'amount' => 60.00,  'method' => 'especes',  'status' => 'paye',       'payment_date' => '2025-04-02 10:00:00', 'due_date' => '2025-04-02', 'reference' => 'PAY-2025-002', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'reservation_id' => 3, 'subscription_id' => null, 'amount' => 100.00, 'method' => 'virement', 'status' => 'paye',       'payment_date' => '2025-04-03 08:00:00', 'due_date' => '2025-04-03', 'reference' => 'PAY-2025-003', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'reservation_id' => 4, 'subscription_id' => null, 'amount' => 200.00, 'method' => 'en_ligne', 'status' => 'paye',       'payment_date' => '2025-04-04 14:00:00', 'due_date' => '2025-04-04', 'reference' => 'PAY-2025-004', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 6, 'reservation_id' => 5, 'subscription_id' => null, 'amount' => 60.00,  'method' => 'especes',  'status' => 'rembourse',  'payment_date' => '2025-04-05 09:00:00', 'due_date' => '2025-04-05', 'reference' => 'PAY-2025-005', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 7, 'reservation_id' => 6, 'subscription_id' => null, 'amount' => 180.00, 'method' => 'carte',    'status' => 'en_attente', 'payment_date' => null,                  'due_date' => '2025-04-06', 'reference' => 'PAY-2025-006', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}