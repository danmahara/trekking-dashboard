<?php

namespace App\Models;

use App\Traits\ModelQueryTrait;
use App\Traits\StatusTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory, ModelQueryTrait, StatusTrait;
    protected $guarded = [];
}
