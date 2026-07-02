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
            'photo' => [
                'nullable',
                'image',
                'max:2048',
                // Foto wajib untuk laporan lost, opsional untuk found
                function ($attribute, $value, $fail) use ($request, $reportId) {
                    $report = \App\Models\Report::find($reportId);
                    if ($report && $report->type === 'lost' && !$value) {
                        $fail('Foto bukti wajib disertakan untuk laporan barang hilang.');
                    }
                },
            ],
        ]);

        $report = Report::findOrFail($reportId);

        if ($report->user_id === Auth::id()) {
            abort(403, 'Kamu tidak bisa mengklaim laporanmu sendiri.');
        }

        $existingClaim = Claim::where('report_id', $report->id)
            ->where('claimer_id', Auth::id())
            ->first();

        if ($existingClaim) {
            return back()->withErrors(['message' => 'Kamu sudah pernah mengajukan untuk laporan ini.']);
        }

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('claims', 'public');
        }

        Claim::create([
            'report_id' => $report->id,
            'claimer_id' => Auth::id(),
            'message' => $validated['message'],
            'photo' => $photoPath,
            'status' => 'pending',
        ]);

        return redirect()->route('reports.show', $report->id)
            ->with('success', 'Berhasil diajukan.');
    }

    public function approve($id)
    {
        $claim = Claim::with('report')->findOrFail($id);

        if ($claim->report->user_id !== Auth::id()) {
            abort(403);
        }

        $alreadyApproved = Claim::where('report_id', $claim->report_id)
            ->where('status', 'approved')
            ->where('id', '!=', $claim->id)
            ->exists();

        if ($alreadyApproved) {
            return back()->withErrors(['error' => 'Sudah ada klaim yang disetujui untuk laporan ini.']);
        }

        $claim->update(['status' => 'approved']);

        Claim::where('report_id', $claim->report_id)
            ->where('status', 'pending')
            ->where('id', '!=', $claim->id)
            ->update(['status' => 'rejected']);

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
