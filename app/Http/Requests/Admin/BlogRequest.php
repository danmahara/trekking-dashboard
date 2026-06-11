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
            'title' => 'required|string|min:3',
            'slug' => "required|string|unique:blogs,slug|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/",
            'image' => 'required|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
            'cover' => 'required|image|mimes:png,jpg,jpeg,svg,gif,webp|max:2048',
            'publish_date' => 'required|string|min:5',
            'description' => 'required|string|min:5',
            'order' => 'nullable|numeric|min:0',
            // 'category_id' => 'required|numeric',
            'is_featured' => 'boolean',
            'author' => 'required|string',
            'status' => 'boolean',
        ];
    }

}
