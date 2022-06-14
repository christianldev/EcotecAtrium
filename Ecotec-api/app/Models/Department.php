<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'campus_id',
        'department_name'
    ];

    public function campus()
    {
        return $this->belongsTo(Campus::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

}