<?php

namespace App\Http\Requests\Admin;

use App\Enums\CategoryType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogCategoryUpdateRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        // Route model binding key — matches Route::resource('blog-categories', ...)
        // which uses {blog_category}. Adjust if your parameter name differs.
        $categoryId = $this->route('blog_category')?->id
            ?? $this->route('blog_category');

        return [
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'title')
                    ->where('type', CategoryType::BLOG->value)
                    ->ignore($categoryId),
            ],
            'short_description' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'boolean'],
            'order' => ['required', 'integer', 'min:0'],
        ];
    }

    /**
     * Normalize inputs before validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'status' => $this->boolean('status'),
            'order' => (int) $this->input('order', 0),
        ]);
    }
}
