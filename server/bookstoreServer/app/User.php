<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject

{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'isHelper', 'street', 'streetnumber', 'zipcode', 'city'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function shoppinglist()
    {
        return $this->hasMany(Shoppinglist::class);
    }

    public function comment()
    {
        return $this->hasMany(Comment::class);
    }

    /*JWT AUTH*/
    public function getJWTIdentifier() {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id, 'isHelper' => $this->isHelper, 'username' => $this->name]];
    }
}
