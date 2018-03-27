<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Cases extends Model
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
    protected $table = 'cases';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'caseimageid', 'userid'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'pivot', 'deleted_at', 'updated_at', 'created_at', 'userid', 'caseimageid'
    ];

    public function items()
    {
        return $this->belongsToMany('App\Item', 'case_has_items', 'CaseID', 'ItemID');
    }

    public function image()
    {
        return $this->hasOne('App\Caseimages', 'id', 'caseimageid');
    }
}
