<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject as IAuthJWT;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\MustVerifyEmail as VerifyableContract;
use Illuminate\Contracts\Auth\CanResetPassword as ResetableContract;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable as AuthorizableTrait;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use Illuminate\Notifications\Notifiable as NotifiableTrait;

class User extends Authenticatable implements IAuthJWT, AuthenticatableContract, AuthorizableContract, VerifyableContract, ResetableContract
{
    use AuthorizableTrait,
        MustVerifyEmailTrait,
        CanResetPasswordTrait,
        NotifiableTrait,
        HasUlids,
        SoftDeletes,
        HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [

        "name",
        "email",
        "password",
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [

        "password",
        "remember_token",
    ];

    /**
     * @return array
     */
    protected function casts()
    {
        return [

            "email_verified_at" => "datetime",
            "password" => "hashed",
        ];
    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [

            //
        ];
    }
}
