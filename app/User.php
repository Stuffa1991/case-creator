<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'steamid64', 'avatar'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token', 'id', 'role', 'trade_link', 'email'
    ];

    public function cases()
    {
        return $this->hasMany('App\Cases', 'userid');
    }

    public function transactions()
    {
        return $this->hasMany('App\Transaction', 'userid');
    }

    public function hasItems()
    {
        return $this->belongsToMany('App\Item', 'user_has_items', 'UserID', 'ItemID');
    }
}
