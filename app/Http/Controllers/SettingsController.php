<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function edit()
    {
        return Inertia::render('settings', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'phone' => ['nullable', 'string', 'max:20'],
        ]);

        $phone = $request->phone;
        if ($phone) {
            $phone = preg_replace('/\D/', '', $phone);
            if (str_starts_with($phone, '0')) {
                $phone = '62' . substr($phone, 1);
            } elseif (str_starts_with($phone, '+62')) {
                $phone = substr($phone, 1);
            }
        }

        Auth::user()->update(['phone' => $phone ?: null]);

        return back()->with('success', 'Nomor WhatsApp berhasil diperbarui.');
    }
}