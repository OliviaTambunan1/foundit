<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'description',
        'category',
        'location',
        'photo',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function claims()
    {
        return $this->hasMany(Claim::class);
    }
}