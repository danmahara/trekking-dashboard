<?php

namespace App\Models;

use App\Traits\ModelQueryTrait;
use App\Traits\StatusTrait;
use App\Traits\UploadFileTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory, ModelQueryTrait, StatusTrait, UploadFileTrait;

    protected $guarded = [];
    protected $casts = [
        'publish_date' => 'datetime',
    ];
}
