<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class BlogUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3',
            'slug' => "required|string|unique:blogs,slug,{$this->blog->id},id|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/",
            'image' => 'nullable|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
            'cover' => 'nullable|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
            'publish_date' => 'required|string|min:5',
            'description' => 'required|string|min:5',
            // 'category_id' => 'required|numeric',
            'order' => 'nullable|numeric|min:0',
            'is_featured' => 'boolean',
            'author' => 'required|string',
            'status' => 'boolean',
        ];
    }
    public function messages(): array
    {
        return [
            'slug.regex' => 'The slug must be lowercase and can only contain letters, numbers, and hyphens.',
            'image.max' => 'The image size must not exceed 2MB.',
            'cover.max' => 'The cover image size must not exceed 2MB.',
            'category_id.required' => 'The blog category is required.',
        ];
    }
}
