<?php

namespace Milestone\SmartKitchen\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Milestone\SmartKitchen\Models\Model;

class MediaController extends Controller
{

    public function upload(){
        $data = request(['model','id']);
        $class = Str::of(Model::class)->replaceLast('Model',Str::of($data['model'])->title()->__toString())->__toString();
        $Object = $class::find($data['id']);
        $Object->addMediaFromRequest('media')->toMediaCollection($data['model']);
        $Object->touch(); return $Object->fresh();
    }

    public function remove(){
        $data = request(['model','id']);
        $class = Str::of(Model::class)->replaceLast('Model',Str::of($data['model'])->title()->__toString())->__toString();
        $Object = $class::find($data['id']); $fMedia = $Object->getFirstMedia($data['model']);
        if($fMedia) { $fMedia->delete(); $Object->touch(); } return $Object->fresh();
    }

    public static function ModelIDUrl($model,$id){
        return self::ModelIDObj($model,$id)->getFirstMediaUrl($model) ?: "/media/$model.jpg";
    }

    public static function ModelIDObj($model,$id){
        $class = Str::of(Model::class)->replaceLast('Model',Str::of($model)->title()->__toString())->__toString();
        return $class::find($id);
    }
}
