<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    protected $fillable = [
        'report_id',
        'claimer_id',
        'message',
        'status'
    ];

    public function report()
    {
        return $this->belongsTo(Report::class);
    }

    public function claimer()
    {
        return $this->belongsTo(User::class, 'claimer_id');
    }
}