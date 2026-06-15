<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlogCategoryRequest;
use App\Http\Requests\Admin\BlogCategoryUpdateRequest;
use App\Http\Requests\Admin\FaqCategoryRequest;
use App\Models\Category;
use App\Traits\StatusTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqCategoryController extends Controller
{
    use StatusTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Admin/FaqCategory/Index", [
            'categories' => Category::query()
                ->select(['id', 'title', 'type', 'order', 'status'])->where("type", CategoryType::FAQ->value)
                ->get()
                ->map(fn($category) => [
                    'id' => $category->id,
                    'title' => $category->title,
                    'order' => $category->order,
                    'status' => $category->status,
                ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/FaqCategory/Form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FaqCategoryRequest $request)
    {
        $data = $request->validated();              // returns a plain array
        $data['type'] = CategoryType::FAQ->value;

        Category::create($data);

        return redirect()->route('admin.faq-categories.index')
            ->with('success', 'Faq Category created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $faq_category)
    {
        return Inertia::render('Admin/FaqCategory/Form', ['category' => $faq_category]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(FaqCategoryRequest $request, Category $faq_category)
    {
        $faq_category->update($request->validated());
        return redirect()->route('admin.faq-categories.index')
            ->with('success', 'Faq Category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $faq_category): RedirectResponse
    {
        \Log::info('destroy hit', ['id' => $faq_category->id, 'title' => $faq_category->title]);

        $faq_category->delete();

        return redirect()->route('admin.faq-categories.index')
            ->with('success', 'Faq Category Deleted Successfully!');
    }

    public function changeStatus(Request $request, $id): RedirectResponse
    {
        $this->changeItemStatus('Category', $id, $request->status);

        return back()->with('success', 'Status updated successfully!');
    }
}
