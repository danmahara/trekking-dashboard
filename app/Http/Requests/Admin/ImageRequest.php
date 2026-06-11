<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ImageRequest extends FormRequest
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
            'alt' => 'required|string|min:1',
            'order' => 'required|numeric',
            // 'image' => 'required|image|mimes:png,jpg,jpeg,svg,gif,webp,avi,mp4|max:2048',
            'image' => [
                'nullable',
                'file', // or 'image' if only images
                'mimes:jpg,jpeg,png,webp,gif,svg',
                'max:2048', // size in KB (2MB)
                Rule::requiredIf($this->template != \App\Enums\PageTemplateType::gallery->value),
            ],

            'short_description' => [
                'nullable',
                'string',
                'min:3',
                'max:200',
                Rule::requiredIf($this->template === \App\Enums\PageTemplateType::gallery->value),
            ],
            'link' => [
                'nullable',
                'string',
                'min:3',
                Rule::requiredIf(isset($this->template) && $this->template === \App\Enums\PageTemplateType::gallery->value),
            ],
            'category' => [
                'nullable',
                'string',
                'min:3',
                Rule::requiredIf($this->template === \App\Enums\PageTemplateType::gallery->value),
            ],
        ];
    }

    public function attributes()
    {
        return [
            'link' => 'Youtube Link',
            'alt' => "Title"
        ];
    }
}
