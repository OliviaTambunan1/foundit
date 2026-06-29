<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClaimController extends Controller
{
    public function store(Request $request, $reportId)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $report = Report::findOrFail($reportId);

        if ($report->user_id === Auth::id()) {
            abort(403, 'Kamu tidak bisa mengklaim laporanmu sendiri.');
        }

        // Validasi backend: cek duplikasi klaim
        $existingClaim = Claim::where('report_id', $report->id)
            ->where('claimer_id', Auth::id())
            ->first();

        if ($existingClaim) {
            return back()->withErrors(['message' => 'Kamu sudah pernah mengklaim barang ini.']);
        }

        Claim::create([
            'report_id' => $report->id,
            'claimer_id' => Auth::id(),
            'message' => $validated['message'],
            'status' => 'pending',
        ]);

        return redirect()->route('reports.show', $report->id)
            ->with('success', 'Klaim berhasil diajukan.');
    }

    public function approve($id)
    {
        $claim = Claim::with('report')->findOrFail($id);

        if ($claim->report->user_id !== Auth::id()) {
            abort(403);
        }

        $claim->update(['status' => 'approved']);
        $claim->report->update(['status' => 'diklaim']);

        return back()->with('success', 'Klaim disetujui.');
    }

    public function reject($id)
    {
        $claim = Claim::with('report')->findOrFail($id);

        if ($claim->report->user_id !== Auth::id()) {
            abort(403);
        }

        $claim->update(['status' => 'rejected']);

        return back()->with('success', 'Klaim ditolak.');
    }

    public function myClaims()
    {
        $claims = Claim::with('report')
            ->where('claimer_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('my-claims', [
            'claims' => $claims,
        ]);
    }
}
