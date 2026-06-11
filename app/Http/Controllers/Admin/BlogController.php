<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BlogRequest;
use App\Http\Requests\Admin\BlogUpdateRequest;
use App\Http\Requests\Admin\SeoRequest;
use App\Models\Blog;
use App\Traits\DatatableTrait;
use App\Traits\InertiaTableTrait;
use App\Traits\RowReOrderingTrait;
use App\Traits\StatusTrait;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BlogController extends Controller
{
    use StatusTrait, RowReOrderingTrait;

    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'blogs' => Blog::query()
                ->select(['id', 'title', 'publish_date', 'status'])
                ->with("feature_image")
                ->latest('publish_date')
                ->get()
                ->map(fn($blog) => [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'publish_date' => $blog->publish_date?->format('Y-m-d'),
                    'status' => $blog->status,
                    'feature_image' => $blog->feature_image?->getPath(),
                ]),
        ]);
    }

    public function create()
    {
        return Inertia::render("Admin/Blog/Form");
    }


    public function store(BlogRequest $request): RedirectResponse
    {
        DB::beginTransaction();

        // Create the blog without image, cover, hashtags
        $blog = Blog::create($request->safe()->except('image', 'cover'));

        // Feature image
        if ($request->hasFile('image')) {
            $blog->storeFeatureImage($blog->title, $request->file('image'));
        }

        // Cover image
        if ($request->hasFile('cover')) {
            $blog->storeCoverImage($blog->title, $request->file('cover'));
        }



        $blog->save();

        DB::commit();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog Created Successfully!');
    }


    public function show(Blog $blog): View
    {
        return view('admin.blog.show', compact('blog'));
    }

    public function edit(Blog $blog)
    {
        return Inertia::render("Admin/Blog/Form", ['blog' => $blog]);
    }



    public function update(BlogUpdateRequest $request, Blog $blog)
    {
        $blog->update($request->safe()->except('image', 'cover', 'hashtags'));

        // Feature image
        if ($request->hasFile('image')) {
            $blog->updateFeatureImage($blog->title, $request->file('image'));
        }

        // Cover image
        if ($request->hasFile('cover')) {
            $blog->updateCoverImage($blog->title, $request->file('cover'));
        }

        return redirect()->route('admin.blogs.index')->with('success', 'Blog Updated Successfully!');
    }



    public function destroy(Blog $blog): RedirectResponse
    {
        $blog->delete();
        $blog->deleteAllImages();

        return redirect()->route('admin.blogs.index')->with('success', 'Blog Deleted Successfully!');
    }

    public function changeStatus(Request $request, $id): RedirectResponse
    {
        $this->changeItemStatus('Blog', $id, $request->status);

        return back()->with('success', 'Status updated successfully!');
    }

    public function rowReOrder(): void
    {
        $blogs = Blog::select(['id', 'order'])->get();
        $this->reOrder($blogs);
    }

    public function editSeo(Blog $blog)
    {
        return Inertia::render('Admin/Blog/Seo', ['blog' => $blog]);
    }

    // public function updateSeo(SeoRequest $request, Blog $blog): RedirectResponse
    public function updateSeo(Request $request, Blog $blog): RedirectResponse
    {
        $blog->updateSeo($request->safe()->except('image'), $request->file('image'));

        return redirect()->route('admin.blogs.index')->with('success', 'Blog Seo Updated Successfully!');
    }
}
