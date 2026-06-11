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
            'category_id' => 'nullable|integer',
            'slug' => "required|string|unique:blogs,slug,{$this->blog->id},id|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/",
            'title' => 'required|string|max:100|min:3',
            'description' => 'required|string|min:5',
            'short_title' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:100',
            'author_post' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:50',
            'quote' => 'nullable|string',
            'publish_date' => 'required|date',
            'order' => 'nullable|integer|min:0',
            'status' => 'boolean',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
            'cover' => 'nullable|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.regex' => 'The slug must be lowercase and can only contain letters, numbers, and hyphens.',
            'image.max' => 'The image size must not exceed 2MB.',
            'cover.max' => 'The cover image size must not exceed 2MB.',
            'title.max' => 'The title must not exceed 100 characters.',
        ];
    }
}
