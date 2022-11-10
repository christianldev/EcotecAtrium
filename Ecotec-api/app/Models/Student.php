<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Authenticatable
{
    use HasFactory, HasApiTokens;
    protected $fillable = ['username', 'email', 'password'];
    protected $hidden = ['password'];
}
