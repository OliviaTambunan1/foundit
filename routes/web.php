<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ClaimController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ReportController::class, 'home']);

Route::get('/lost-items', [ReportController::class, 'lostItems']);
Route::get('/found-items', [ReportController::class, 'foundItems']);

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return redirect('/');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/create-report', [ReportController::class, 'createReport']);
    Route::post('/reports', [ReportController::class, 'store'])
        ->name('reports.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/my-reports', [ReportController::class, 'myReports'])
        ->name('reports.my');

    Route::get('/reports/{id}/edit', [ReportController::class, 'edit'])
        ->name('reports.edit');

    Route::put('/reports/{id}', [ReportController::class, 'update'])
        ->name('reports.update');

    Route::post('/reports/{id}/claims', [ClaimController::class, 'store'])
        ->name('claims.store');
    Route::patch('/claims/{id}/approve', [ClaimController::class, 'approve'])
        ->name('claims.approve');
    Route::patch('/claims/{id}/reject', [ClaimController::class, 'reject'])
        ->name('claims.reject');

    Route::get('/my-claims', [ClaimController::class, 'myClaims'])
        ->name('claims.my');

    Route::get('/dashboard-stats', [ReportController::class, 'dashboard'])
        ->name('dashboard.stats');

    Route::patch('/reports/{id}/resolve', [ReportController::class, 'resolve'])
        ->name('reports.resolve');
});

Route::get('/reports/{id}', [ReportController::class, 'show'])
    ->name('reports.show');

Route::delete('/reports/{id}', [ReportController::class, 'destroy'])
    ->name('reports.destroy');

require __DIR__ . '/auth.php';
