<?php

namespace Milestone\SmartKitchen\Models;

use App\Models\User as BaseUser;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends BaseUser implements JWTSubject, HasMedia
{
    use InteractsWithMedia;

    protected $fillable = ['name','email','login','password','role'];
    protected $hidden = ['created_at','updated_at','password', 'remember_token','email_verified_at','email'];
    protected $appends = ['image'];

    public function Logs(){ return $this->hasMany(UserLogin::class,'user','id'); }
    public function Tokens(){ return $this->hasMany(Token::class,'user','id'); }
    public function Log(){ return $this->hasOne(UserLogin::class,'user','id')->where('out',0); }

    public function getJWTIdentifier(){ return $this->getKey(); }
    public function getJWTCustomClaims(){ return []; }

    public function registerMediaCollections(): void { $this->addMediaCollection('user')->singleFile(); }
    private static $mCache = [];
    function getImageAttribute(){
        if(empty(self::$mCache)) self::$mCache = DB::table('media')
            ->where('model_type',get_called_class())
            ->get()
            ->mapWithKeys(function($item){ return [$item->model_id => implode('/',[$item->id,$item->file_name])]; });
        $item = Str::of(get_called_class())->afterLast('\\')->lower()->__toString();
        return Arr::get(self::$mCache,$this->attributes['id'],$item . '.jpg');
    }

}
