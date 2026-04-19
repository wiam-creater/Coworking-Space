<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin ──────────────────────────────────────────────
        DB::table('users')->insertOrIgnore([
            'name'       => 'Dar Work',
            'email'      => 'gestioncoworking@gmail.com',
            'password'   => Hash::make('password'),
            'role'       => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ── Spaces ─────────────────────────────────────────────
        DB::table('spaces')->insertOrIgnore([
            ['name' => 'Salle réunion',   'type' => 'salle_reunion', 'capacity' => 8,  'price_per_hour' => 150.00, 'description' => 'Salle de réunion avec projecteur',  'status' => 'disponible', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Zone d\'Étude',   'type' => 'espace_ouvert', 'capacity' => 20, 'price_per_hour' => 30.00,  'description' => 'Zone de travail collaboratif',       'status' => 'disponible', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bureau Privé',    'type' => 'bureau',        'capacity' => 1,  'price_per_hour' => 50.00,  'description' => 'Bureau individuel calme avec vue',   'status' => 'disponible', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Espace Premium',  'type' => 'bureau',        'capacity' => 1,  'price_per_hour' => 100.00, 'description' => 'Bureau premium équipé',              'status' => 'disponible', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Open Space',      'type' => 'espace_ouvert', 'capacity' => 30, 'price_per_hour' => 25.00,  'description' => 'Grand espace ouvert collaboratif',   'status' => 'disponible', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Espace Bureau Moderne', 'type' => 'bureau', 'capacity' => 2, 'price_per_hour' => 90.00, 'description' => 'Espace moderne pour travail professionnel', 'status' => 'disponible', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}