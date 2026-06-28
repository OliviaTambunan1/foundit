<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReportController extends Controller
{
    private const CATEGORIES = ['Elektronik', 'Dokumen', 'Aksesoris', 'Pakaian', 'Buku/Alat Tulis', 'Lainnya'];
    public function home()
    {
        $reports = Report::latest()->take(6)->get();

        return Inertia::render('home', [
            'reports' => $reports,
        ]);
    }

    public function lostItems(Request $request)
    {
        $reports = Report::where('type', 'lost')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->latest()
            ->get();

        return Inertia::render('lost-items', [
            'reports' => $reports,
            'filters' => $request->only(['search', 'category']),
            'categories' => self::CATEGORIES,
        ]);
    }

    public function foundItems(Request $request)
    {
        $reports = Report::where('type', 'found')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->latest()
            ->get();

        return Inertia::render('found-items', [
            'reports' => $reports,
            'filters' => $request->only(['search', 'category']),
            'categories' => self::CATEGORIES,
        ]);
    }

    public function createReport()
    {
        return Inertia::render('create-report', [
            'categories' => self::CATEGORIES,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:lost,found',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'location' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('reports', 'public');
        }

        Report::create([
            'user_id' => Auth::id(),
            'type' => $validated['type'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'category' => $validated['category'],
            'location' => $validated['location'],
            'photo' => $photoPath,
            'status' => $validated['type'] == 'lost' ? 'hilang' : 'ditemukan',
        ]);

        return redirect('/');
    }

    public function show($id)
    {
        $report = Report::with(['user', 'claims.claimer'])->findOrFail($id);

        return Inertia::render('report-detail', [
            'report' => $report,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function myReports()
    {
        $reports = Report::where('user_id', Auth::id())->latest()->get();

        return Inertia::render('my-reports', [
            'reports' => $reports,
        ]);
    }

    public function destroy($id)
    {
        $report = Report::findOrFail($id);

        if ($report->user_id != Auth::id()) {
            abort(403);
        }

        $report->delete();

        return redirect()->route('reports.my');
    }

    public function edit($id)
    {
        $report = Report::findOrFail($id);

        if ($report->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('edit-report', [
            'report' => $report,
            'categories' => self::CATEGORIES,
        ]);
    }

    public function update(Request $request, $id)
    {
        $report = Report::findOrFail($id);

        if ($report->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'type' => 'required|in:lost,found',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string',
            'location' => 'required|string|max:255',
        ]);

        $report->update($validated);

        return redirect()->route('reports.my');
    }

    public function dashboard()
    {
        $userId = Auth::id();

        $stats = [
            'total_reports' => Report::count(),
            'total_lost' => Report::where('type', 'lost')->count(),
            'total_found' => Report::where('type', 'found')->count(),
            'total_resolved' => Report::where('status', 'diklaim')->count(),
            'my_reports' => Report::where('user_id', $userId)->count(),
            'my_pending_claims' => \App\Models\Claim::where('claimer_id', $userId)
                ->where('status', 'pending')->count(),
            'claims_to_review' => \App\Models\Claim::whereHas('report', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'pending')->count(),
        ];

        $recentReports = Report::latest()->take(5)->get();

        return Inertia::render('dashboard-stats', [
            'stats' => $stats,
            'recentReports' => $recentReports,
        ]);
    }
}
