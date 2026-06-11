<?php

namespace App\Traits;

use App\Enums\ImageType;
use App\Http\Requests\Admin\ImageRequest;
use App\Jobs\WaterMark;
use App\Models\Image;
use App\Models\Seo;
use App\Models\SiteSetting;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
trait UploadFileTrait
{

    public function storeCoverImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->storeImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_COVER);
    }
    public function updateMeta1Image(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_META1);
    }
    public function updateMeta2Image(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_META2);
    }


    public function storeIconImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->storeImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_ICON);
    }

    public function storeMetaImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->storeImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_META);
    }

    public function storeFeatureImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        $feature = $this->storeImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_FEATURE);
        if (method_exists(static::class, "seo")) {
            $this->seo()->create([
                "title" => $alt_text,
                "keywords" => $alt_text,
                "description" => $alt_text,
                "image_id" => $feature->id
            ]);
        }
        return $feature;
    }

    public function storeGalleryImage(ImageRequest $imageRequest, $name = "image", $optimize = true, $watermark = true): Image
    {
        return $this->storeImage(
            $imageRequest->file($name),
            $imageRequest->alt,
            true,
            true,
            ImageType::TYPE_GALLERY,
            $imageRequest->order,
            $imageRequest->link ?? null,
            $imageRequest->short_description ?? null,
        );
    }

    public function storeGalleryEntry(string $alt, string $category, int $order, ?string $link = null, ?string $short_description = null): Image
    {
        return $this->images()->create([
            'alt' => $alt,
            'file_name' => '',
            'slug' => \Str::slug($alt) . '-' . uniqid(),
            'type' => ImageType::TYPE_GALLERY,
            'order' => $order,
            'link' => $link,
            'category' => $category,
            'short_description' => $short_description,
            'status' => 1,
        ]);
    }

    // public function storeDocImage(ImageRequest $imageRequest, $name = "image", $optimize = true, $watermark = true): Image
    // {
    //     return $this->storeImage($imageRequest->file($name), $imageRequest->alt, true, true, ImageType::TYPE_DOCS, $imageRequest->order);
    // }

    public function storeDocImage(ImageRequest $imageRequest, $name = "image", $optimize = true, $watermark = true): Image
    {
        $file = $imageRequest->file($name);
        $alt = $imageRequest->alt;

        // Apply watermark to the uploaded file before storing
        if ($watermark) {
            $file = $this->addWatermarkToUpload($file);
        }

        // Store the watermarked image
        // $image = $this->storeImage(
        //     $file,
        //     $alt,
        //     $optimize,
        //     false,
        //     ImageType::TYPE_DOCS,
        //     $imageRequest->order
        // );

        $image = $this->storeImage(
            $file,
            $alt,
            $optimize,
            false,
            ImageType::TYPE_DOCS,
            $imageRequest->order,
            null,
            $imageRequest->short_description
        );

        return $image;
    }

    private function addWatermarkToUpload($uploadedFile)
    {
        try {
            // $setting = SiteSetting::first();

            if (!$setting || !$setting->feature_image) {
                \Log::warning('Watermark skipped: No site setting or feature image found');
                return $uploadedFile;
            }

            // Convert URL to file path
            $watermarkUrl = $setting->feature_image->getPath();
            $watermarkPath = str_replace(url('/'), public_path(), $watermarkUrl);

            // \Log::info('Watermark URL: ' . $watermarkUrl);
            // \Log::info('Watermark Path: ' . $watermarkPath);

            if (!file_exists($watermarkPath)) {
                \Log::error('Watermark image not found at: ' . $watermarkPath);
                return $uploadedFile;
            }

            // Intervention Image v3 syntax - use static method
            $mainImage = ImageManager::gd()->read($uploadedFile->getRealPath());
            $watermark = ImageManager::gd()->read($watermarkPath);

            // Resize watermark to 25% of the main image width
            $watermarkWidth = (int) ($mainImage->width() * 0.25);
            $watermark->scale(width: $watermarkWidth);

            // Position watermark at bottom-right corner with padding
            $mainImage->place(
                element: $watermark,
                // position: 'bottom-right',
                position: 'center',
                offset_x: 40,
                offset_y: 40,
                opacity: 60,
            );

            // Save to temporary file
            $tempPath = sys_get_temp_dir() . '/' . uniqid('watermarked_') . '.' . $uploadedFile->getClientOriginalExtension();
            $mainImage->save($tempPath);

            // Create new UploadedFile instance from the watermarked image
            $watermarkedFile = new \Illuminate\Http\UploadedFile(
                $tempPath,
                $uploadedFile->getClientOriginalName(),
                $uploadedFile->getClientMimeType(),
                null,
                true
            );

            \Log::info('Watermark applied successfully');

            return $watermarkedFile;

        } catch (\Exception $e) {
            \Log::error('Watermark application failed: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return $uploadedFile; // Return original file if watermark fails
        }
    }

    public function updateIconImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_ICON);
    }

    public function updateMetaImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_META);
    }

    public function updateCoverImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_COVER);
    }

    public function updateFeatureImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_FEATURE);
    }

    public function updateGalleryImage(ImageRequest $imageRequest, $name = "image", $optimize = true, $watermark = true): Image
    {
        return $this->updateImage(
            $imageRequest->file($name),
            $imageRequest->alt,
            $optimize,
            $watermark,
            ImageType::TYPE_GALLERY,
            $imageRequest->link ?? null
        );
    }

    public function updateDocImage(string $alt_text, $file, $optimize = true, $watermark = true): Image
    {
        return $this->updateImage($file, $alt_text, $optimize, $watermark, ImageType::TYPE_DOCS);
    }


    public function deleteAllImages(): void
    {
        $folder_name = $this->getFolderName();

        foreach ($this->images as $image) {
            @unlink('uploaded_images/' . $folder_name . '/' . $image->file_name);
        }

        $this->images()->delete();
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function deleteImage(string $field): static
    {
        $folder_name = $this->getFolderName();
        if (isset($this->{$field})) {
            @unlink('uploaded_images/' . $folder_name . '/' . $this->{$field});
        }
        return $this;
    }


    private function storeImage($file, $alt_text = "", $optimize, $watermark, ImageType $type, $order = 1, $link = null, $short_description = null)
    {
        if ($alt_text == "") {
            $alt_text = $file->getClientOriginalName();
        }
        $folder_name = $this->getFolderName();
        $slug = Str::slug($alt_text);

        // Convert to WebP if possible
        $result = $this->convertToWebp($file, $folder_name, $slug);
        $filename = $result['filename'];

        $function = $type->value . "_image";

        $imageData = [
            "imageable_type" => static::class,
            "imageable_id" => $this->id,
            "alt" => $alt_text,
            "file_name" => $filename,
            "slug" => $slug,
            "type" => $type->value,
            "order" => $order,
            "short_description" => $short_description
        ];

        // Add link field only for gallery images
        if ($type === ImageType::TYPE_GALLERY && $link !== null) {
            $imageData['link'] = $link;
        }

        $image = $this->$function()->save(Image::create($imageData));

        return $image;
    }

    private function updateImage($file, $alt_text = "", $optimize, $watermark, ImageType $type, $link = null)
    {
        $function = $type->value . "_image";
        $image = $this->$function;
        if ($image?->file_name === null) {
            return $this->storeImage($file, $alt_text, $optimize, $watermark, $type, 1, $link);
        }
        if ($alt_text == "") {
            $alt_text = $file->getClientOriginalName();
        }
        $folder_name = $this->getFolderName();
        $slug = Str::slug($alt_text);

        // Convert to WebP if possible
        $result = $this->convertToWebp($file, $folder_name, $slug);
        $filename = $result['filename'];

        if (isset($image)) {
            @unlink('uploaded_images/' . $folder_name . '/' . $image->file_name);
        }

        $updateData = [
            "alt" => $alt_text,
            "file_name" => $filename,
            "slug" => $slug
        ];

        // Add link field only for gallery images
        if ($type === ImageType::TYPE_GALLERY && $link !== null) {
            $updateData['link'] = $link;
        }

        $image->update($updateData);
        return $image;
    }




    public function feature_image()
    {
        return $this->morphOne(Image::class, 'imageable')->where(["type" => ImageType::TYPE_FEATURE])
            ->withDefault([
                'file_name' => null,
                'alt' => "File not found",
            ]);
    }

    public function icon_image()
    {
        return $this->morphOne(Image::class, 'imageable')->where(["type" => ImageType::TYPE_ICON])
            ->withDefault([
                'file_name' => null,
                'alt' => "File not found",
            ]);
    }

    public function meta_image()
    {
        return $this->morphOne(Image::class, 'imageable')->where(["type" => ImageType::TYPE_META])
            ->withDefault([
                'file_name' => null,
                'alt' => "File not found",
            ]);
    }

    public function cover_image()
    {
        return $this->morphOne(Image::class, 'imageable')->where(["type" => ImageType::TYPE_COVER])
            ->withDefault([
                'file_name' => null,
                'alt' => "File not found",
            ]);
    }

    public function meta1_image()
    {
        return $this->morphOne(Image::class, 'imageable')->where(["type" => ImageType::TYPE_META1])
            ->withDefault([
                'file_name' => null,
                'alt' => "File not found",
            ]);
    }

    public function meta2_image()
    {
        return $this->morphOne(Image::class, 'imageable')->where(["type" => ImageType::TYPE_META2])
            ->withDefault([
                'file_name' => null,
                'alt' => "File not found",
            ]);
    }



    public function gallery_image()
    {
        return $this->morphMany(Image::class, 'imageable')->where(["type" => ImageType::TYPE_GALLERY]);
    }

    public function doc_image()
    {
        return $this->morphMany(Image::class, 'imageable')->where(["type" => ImageType::TYPE_DOCS]);
    }

    private function getFolderName()
    {
        $parts = explode("\\", static::class);
        return strtolower(array_pop($parts));
    }




    private function convertToWebp($file, $folder_name, $slug)
    {
        $original_extension = strtolower($file->getClientOriginalExtension());
        $random_id = rand(100000, 999999);

        // Formats that can be converted to WebP
        $convertible_formats = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

        // If the file is SVG or another non-convertible format, just return the original
        if (!in_array($original_extension, $convertible_formats)) {
            $filename = $slug . "-" . $random_id . "." . $original_extension;
            $file->move(public_path('uploaded_images/' . $folder_name), $filename);
            return [
                'filename' => $filename,
                'extension' => $original_extension
            ];
        }

        // Create destination path for WebP
        $filename = $slug . "-" . $random_id . ".webp";
        $destination_path = public_path('uploaded_images/' . $folder_name . '/' . $filename);

        // Create image resource based on file extension
        try {
            switch ($original_extension) {
                case 'jpeg':
                case 'jpg':
                    $image = imagecreatefromjpeg($file->getPathname());
                    break;
                case 'png':
                    $image = imagecreatefrompng($file->getPathname());
                    imagepalettetotruecolor($image);
                    imagealphablending($image, true);
                    imagesavealpha($image, true);
                    break;
                case 'gif':
                    $image = imagecreatefromgif($file->getPathname());
                    break;
                case 'bmp':
                    $image = imagecreatefromstring(file_get_contents($file->getPathname()));
                    break;
                default:
                    // Fallback to original format if can't process
                    $filename = $slug . "-" . $random_id . "." . $original_extension;
                    $file->move(public_path('uploaded_images/' . $folder_name), $filename);
                    return [
                        'filename' => $filename,
                        'extension' => $original_extension
                    ];
            }

            imagewebp($image, $destination_path, 100);

            // Free up memory
            imagedestroy($image);

            return [
                'filename' => $filename,
                'extension' => 'webp'
            ];
        } catch (\Exception $e) {
            // Fallback to original if conversion fails
            $filename = $slug . "-" . $random_id . "." . $original_extension;
            $file->move(public_path('uploaded_images/' . $folder_name), $filename);
            return [
                'filename' => $filename,
                'extension' => $original_extension
            ];
        }
    }
}
