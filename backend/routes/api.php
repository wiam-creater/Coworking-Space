<?php

use App\Models\Payment;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'max:255', 'unique:users,email'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
        'phone' => ['nullable', 'string', 'max:20'],
    ]);

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'phone' => $data['phone'] ?? null,
        'role' => 'member',
    ]);

    $token = Str::random(60);
    $user->forceFill(['remember_token' => $token])->save();

    return response()->json([
        'token' => $token,
        'user' => $user,
    ], 201);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required', 'string'],
    ]);

    if (! Auth::attempt($credentials)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    /** @var User $user */
    $user = Auth::user();
    $token = Str::random(60);
    $user->forceFill(['remember_token' => $token])->save();

    return response()->json([
        'token' => $token,
        'user' => $user,
    ]);
});

Route::get('/profile', function (Request $request) {
    $token = $request->bearerToken();

    if (! $token) {
        return response()->json(['message' => 'Non authentifie'], 401);
    }

    $user = User::where('remember_token', $token)->first();

    if (! $user) {
        return response()->json(['message' => 'Token invalide'], 401);
    }

    return response()->json($user);
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

Route::get('/members', function (Request $request) {
    $search = trim((string) $request->query('search', ''));

    $members = User::query()
        ->where('role', 'member')
        ->when($search !== '', function ($query) use ($search) {
            $query->where(function ($nested) use ($search) {
                $nested->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        })
        ->orderByDesc('id')
        ->get(['id', 'name', 'email', 'phone', 'role', 'created_at']);

    return response()->json($members);
});

Route::get('/reservations', function (Request $request) {
    $search = trim((string) $request->query('search', ''));

    $reservations = Reservation::query()
        ->with(['space:id,name', 'user:id,name,email'])
        ->when($search !== '', function ($query) use ($search) {
            $query->where(function ($nested) use ($search) {
                $nested->whereHas('space', function ($spaceQuery) use ($search) {
                    $spaceQuery->where('name', 'like', "%{$search}%");
                })->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhere('status', 'like', "%{$search}%");
            });
        })
        ->orderByDesc('date')
        ->orderByDesc('start_time')
        ->get();

    return response()->json($reservations);
});

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
        ->when($status !== '', fn ($query) => $query->where('status', $status))
        ->when($search !== '', function ($query) use ($search) {
            $query->where(function ($nested) use ($search) {
                $nested->where('reference', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    })
                    ->orWhereHas('reservation.space', function ($spaceQuery) use ($search) {
                        $spaceQuery->where('name', 'like', "%{$search}%");
                    });
            });
        })
        ->orderByDesc('id')
        ->get();

    return response()->json($payments);
});
