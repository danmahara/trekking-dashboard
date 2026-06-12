<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlogCategoryRequest;
use App\Http\Requests\Admin\BlogCategoryUpdateRequest;
use App\Models\Category;
use App\Traits\StatusTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogCategoryController extends Controller
{
    use StatusTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Admin/BlogCategory/Index", [
            'categories' => Category::query()
                ->select(['id', 'title', 'type', 'order', 'status'])->where("type", CategoryType::BLOG->value)
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
        return Inertia::render("Admin/BlogCategory/Form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BlogCategoryRequest $request)
    {
        $data = $request->validated();              // returns a plain array
        $data['type'] = CategoryType::BLOG->value;

        Category::create($data);

        return redirect()->route('admin.blog-categories.index')
            ->with('success', 'Category created successfully!');
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
    public function edit(Category $blog_category)
    {
        return Inertia::render('Admin/BlogCategory/Form', ['category' => $blog_category]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(BlogCategoryUpdateRequest $request, Category $blog_category)
    {
        $blog_category->update($request->validated());
        return redirect()->route('admin.blog-categories.index')
            ->with('success', 'Category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $blog_category): RedirectResponse
    {
        \Log::info('destroy hit', ['id' => $blog_category->id, 'title' => $blog_category->title]);

        $blog_category->delete();

        return redirect()->route('admin.blog-categories.index')
            ->with('success', 'Blog Category Deleted Successfully!');
    }

    public function changeStatus(Request $request, $id): RedirectResponse
    {
        $this->changeItemStatus('Category', $id, $request->status);

        return back()->with('success', 'Status updated successfully!');
    }
}
