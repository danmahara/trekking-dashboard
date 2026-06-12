<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CategoryType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FaqRequest;
use App\Models\Category;
use App\Models\Faq;
use App\Traits\RowReOrderingTrait;
use App\Traits\StatusTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    use StatusTrait, RowReOrderingTrait;

    public function index()
    {
        // $data = Faq::query()
        //     ->select("id", "category_id", "question", "status", "order")->get()
        //     ->toArray();
        // dd($data);

        return Inertia::render("Admin/Faq/Index", [
            'faqs' => Faq::query()
                ->select("id", "category_id", "question", "status", "order")->get()
                ->map(fn($faq) => [
                    'id' => $faq->id,
                    "question" => $faq->question,
                    "order" => $faq->order,
                    "status" => $faq->status,
                ])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Faq/Form', [
            // 'faq' => $faq ?? null,
            'categories' => Category::orderBy('title')->where('type', CategoryType::FAQ->value)->get(['id', 'title']),
        ]);
    }

    public function store(FaqRequest $request)
    {
        $data = $request->validated();
        Faq::create($data);
        return redirect()->route('admin.faqs.index')->with('success', 'Faq Created Successfully!');

    }
    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/Faq/Form', [
            'faq' => $faq ?? null,
            'categories' => Category::orderBy('title')->where('type', CategoryType::FAQ->value)->get(['id', 'title']),
        ]);
    }

    public function update(FaqRequest $request, Faq $faq)
    {
        $data = $request->validated();
        $faq->update($data);
        return redirect()->route('admin.faqs.index')->with('success', 'Faq Updated Successfully!');

    }


    public function changeStatus(Request $request, $id): RedirectResponse
    {
        $this->changeItemStatus('Faq', $id, $request->status);

        return back()->with('success', 'Status updated successfully!');
    }

}
