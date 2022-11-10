<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles, HasApiTokens;

    protected $fillable = ['username', 'email', 'password'];
    protected $hidden = ['password'];

    protected $guard_name = ['api'];
}
