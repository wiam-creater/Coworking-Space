<?php

use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Space;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

// ─────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name'     => ['required', 'string', 'max:255'],
        'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
        'phone'    => ['nullable', 'string', 'max:20'],
    ]);

    $user = User::create([
        'name'     => $data['name'],
        'email'    => $data['email'],
        'password' => Hash::make($data['password']),
        'phone'    => $data['phone'] ?? null,
        'role'     => 'member',
    ]);

    $token = Str::random(60);
    $user->forceFill(['remember_token' => $token])->save();

    return response()->json(['token' => $token, 'user' => $user], 201);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email'    => ['required', 'email'],
        'password' => ['required', 'string'],
    ]);

    if (! Auth::attempt($credentials)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    $user  = Auth::user();
    $token = Str::random(60);
    $user->forceFill(['remember_token' => $token])->save();

    return response()->json([
        'token' => $token,
        'user'  => $user,
    ]);
});

Route::post('/logout', function (Request $request) {
    $token = $request->bearerToken();

    if ($token) {
        $user = User::where('remember_token', $token)->first();
        if ($user) {
            $user->forceFill(['remember_token' => null])->save();
        }
    }

    return response()->json(['message' => 'Deconnexion reussie']);
});

Route::get('/profile', function (Request $request) {
    $token = $request->bearerToken();

    if (!$token) {
        return response()->json(['message' => 'Non authentifie'], 401);
    }

    $user = User::where('remember_token', $token)->first();

    if (!$user) {
        return response()->json(['message' => 'Token invalide'], 401);
    }

    return response()->json($user);
});

// ─────────────────────────────────────────
// SPACES  ✅ ROUTE AJOUTÉE — SELECT VIDE CORRIGÉ
// ─────────────────────────────────────────

Route::get('/spaces', function () {
    $spaces = \App\Models\Space::orderBy('name')
                ->get(['id', 'name', 'type', 'capacity', 'price_per_hour', 'description', 'image', 'status']); // ✅ status ajouté

    return response()->json($spaces);
});

// ─────────────────────────────────────────
// MEMBERS
// ─────────────────────────────────────────

Route::get('/members', function (Request $request) {
    $search = trim((string) $request->query('search', ''));

    $members = User::query()
        ->where('role', 'member')
        ->when($search !== '', function ($query) use ($search) {
            $query->where(function ($nested) use ($search) {
                $nested->where('name',  'like', "%{$search}%")
                       ->orWhere('email', 'like', "%{$search}%")
                       ->orWhere('phone', 'like', "%{$search}%");
            });
        })
        ->orderByDesc('id')
        ->get(['id', 'name', 'email', 'phone', 'role', 'created_at']);

    return response()->json($members);
});

// ─────────────────────────────────────────
// RESERVATIONS
// ─────────────────────────────────────────

// ✅ GET unique — plus de doublon
Route::get('/reservations', function (Request $request) {
    $token = $request->bearerToken();

    if (!$token) {
        return response()->json(['message' => 'Non authentifie'], 401);
    }

    $user = User::where('remember_token', $token)->first();

    if (!$user) {
        return response()->json(['message' => 'Token invalide'], 401);
    }

    $query = Reservation::with([
        'space:id,name,price_per_hour',
        'user:id,name,email',
    ]);

    // Membre → ses réservations seulement / Admin → toutes
    if ($user->role === 'member') {
        $query->where('user_id', $user->id);
    }

    $search = trim((string) $request->query('search', ''));
    if ($search !== '') {
        $query->where(function ($q) use ($search) {
            $q->whereHas('space', fn($s) => $s->where('name', 'like', "%$search%"))
              ->orWhereHas('user',  fn($u) => $u->where('name', 'like', "%$search%"))
              ->orWhere('status',   'like', "%$search%");
        });
    }

    return response()->json($query->orderByDesc('date')->get());
});

Route::post('/reservations', function (Request $request) {
    $token = $request->bearerToken();
    $user  = User::where('remember_token', $token)->first();

    if (!$user) {
        return response()->json(['message' => 'Non authentifie'], 401);
    }

    $data = $request->validate([
        'space_id'   => 'required|integer|exists:spaces,id',
        'date'       => 'required|date|after_or_equal:today',
        'start_time' => 'required|date_format:H:i',
        'end_time'   => 'required|date_format:H:i|after:start_time',
        'notes'      => 'nullable|string|max:1000', // ✅ ajouté
    ]);

    // ✅ Vérification conflit créneau
    $conflit = Reservation::where('space_id',   $data['space_id'])
                           ->where('date',       $data['date'])
                           ->where('start_time', $data['start_time'])
                           ->where('end_time',   $data['end_time'])
                           ->exists();

    if ($conflit) {
        return response()->json([
            'message' => 'Ce créneau est déjà réservé.',
            'errors'  => ['space_id' => ['Créneau indisponible.']]
        ], 422);
    }

    $reservation = Reservation::create([
        'user_id'     => $user->id,
        'space_id'    => $data['space_id'],
        'date'        => $data['date'],
        'start_time'  => $data['start_time'],
        'end_time'    => $data['end_time'],
        'notes'       => $data['notes'] ?? null,
        'status'      => 'en_attente',
        'total_price' => 0,
    ]);

    // ✅ Calcul du prix réel
    $reservation->total_price = $reservation->calculatePrice();
    $reservation->save();

    return response()->json(
        $reservation->load(['space:id,name', 'user:id,name,email']),
        201
    );
});

// ─────────────────────────────────────────
// PAYMENTS
// ─────────────────────────────────────────

Route::get('/payments', function (Request $request) {
    $status = trim((string) $request->query('status', ''));
    $search = trim((string) $request->query('search', ''));

    $payments = Payment::query()
        ->with([
            'reservation:id,space_id,date',
            'reservation.space:id,name',
            'subscription:id,type',
            'user:id,name,email',
        ])
        ->when($status !== '', fn($query) => $query->where('status', $status))
        ->when($search !== '', function ($query) use ($search) {
            $query->where(function ($nested) use ($search) {
                $nested->where('reference', 'like', "%{$search}%")
                       ->orWhere('status',    'like', "%{$search}%")
                       ->orWhereHas('user', function ($q) use ($search) {
                           $q->where('name',  'like', "%{$search}%")
                             ->orWhere('email', 'like', "%{$search}%");
                       })
                       ->orWhereHas('reservation.space', function ($q) use ($search) {
                           $q->where('name', 'like', "%{$search}%");
                       });
            });
        })
        ->orderByDesc('id')
        ->get();

    return response()->json($payments);
});