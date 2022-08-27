<?php

namespace App\Models;

use App\Models\Mark;
use Illuminate\Support\Str;
use App\Models\StudentParentInfo;
use App\Models\StudentAcademicInfo;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasRoles, HasFactory, Notifiable;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->uuid = (string) Str::uuid();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'dni',
        'password',
        'gender',
        'nationality',
        'phone',
        'address',
        'address2',
        'city',
        'zip',
        'photo',
        'birthday',
        'religion',
        'blood_type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * Get the parent_info.
     */
    public function parent_info()
    {
        return $this->hasOne(StudentParentInfo::class, 'student_id', 'id');
    }

    /**
     * Get the academic_info.
     */
    public function academic_info()
    {
        return $this->hasOne(StudentAcademicInfo::class, 'student_id', 'id');
    }

    /**
     * Get the marks.
     */
    public function marks()
    {
        return $this->hasMany(Mark::class, 'student_id', 'id');
    }
    
    
   
   
}