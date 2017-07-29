<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'price';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'market_name', 'market_hash_name', 'price', 'imageurl', 'name_color', 'quality_color', 'type'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'pivot', 'created_at', 'updated_at', 'deleted_at', 'market_hash_name'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    public function item() {
        return $this->belongsTo('App\Item', 'priceid');
    }

     public function scopeSearchName($query, $name) {
        $query->where('market_hash_name', 'LIKE', '%'.$name.'%');
    }

    public function scopeNormal($query) {
        $query->where('price', '>', 0.03)->where('price', '<', 1800);
    }

}
