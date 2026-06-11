<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
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
            'slug' => 'required|string|unique:blogs,slug|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
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
            'image' => 'required|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
            'cover' => 'required|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
        ];
    }

}
