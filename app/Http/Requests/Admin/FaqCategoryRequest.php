<?php

namespace App\Http\Requests\Admin;

use App\Enums\CategoryType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FaqCategoryRequest extends FormRequest
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
        return [
            'title' => [
                'required',
                'string',
                'max:255',
                // Unique among blog categories only (scoped by type)
                Rule::unique('categories', 'title')
                    ->where('type', CategoryType::FAQ->value),
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
