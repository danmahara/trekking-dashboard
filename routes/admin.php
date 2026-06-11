<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get("/dashboard", [AdminDashboardController::class, 'index'])->name('dashboard');



    //---------------------------------------- BLOG ----------------------------------------
    Route::controller(BlogController::class)->group(function () {
        Route::post('blogs/reorder', 'rowReOrder')->name("blogs.reorder");
        Route::patch('blogs/{id}/status', 'changeStatus')->name('blogs.status');
        Route::get('blogs/{blog}/seo', [BlogController::class, 'editSeo'])->name('blogs.seo.index');
        Route::put('blogs/{blog}/seo', [BlogController::class, 'updateSeo'])->name('blogs.seo.update');
    });
    Route::resource('blogs', BlogController::class)->except('show');


});
