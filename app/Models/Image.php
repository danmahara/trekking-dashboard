<?php

namespace App\Models;

use App\Traits\ModelQueryTrait;
use App\Traits\UploadFileTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory, ModelQueryTrait, UploadFileTrait;
    protected $table = "images";
    protected $guarded = [];
    protected $hidden = [
        'imageable_id',
        'imageable_type',
        'type',
        'order',
        'status',
        'created_at',
        'updated_at',
    ];

    protected static function booted(): void
    {
        if (!request()->is("admin/*")) {

            static::addGlobalScope('activeWeb', function (Builder $query) {
                $query->where('status', 1);
            });

            static::addGlobalScope('orderedWeb', function (Builder $query) {
                $query->orderBy('order', 'asc');
            });
        }
    }

    public function getPath(): string
    {
        if ($this->file_name == null) {
            return asset('assets/images/no_image_available.svg');
        }
        $parts = explode("\\", $this->imageable_type);
        return asset('uploaded_images/' . strtolower(array_pop($parts)) . '/' . $this->file_name);
    }

    public function getReviewPath(): string
    {
        if ($this->file_name == null) {
            return asset('assets/images/no_image_review.svg');
        }
        $parts = explode("\\", $this->imageable_type);
        return asset('uploaded_images/' . strtolower(array_pop($parts)) . '/' . $this->file_name);
    }



    public function getThumb(): string
    {
        return $this->getFileType() == "image" ? $this->getPath() : "/assets/images/video.png";
    }

    public function isEmpty(): string
    {
        return $this->file_name === null;
    }

    public function getFileType(): string
    {
        $extension = pathinfo($this->file_name, PATHINFO_EXTENSION);
        $isImage = in_array(strtolower($extension), ["jpg", "jpeg", "png", "gif", "svg", "webp"]);
        if ($isImage) {
            return "image";
        } else {
            return "video";
        }
    }
}
