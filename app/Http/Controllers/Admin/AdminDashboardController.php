<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
class AdminDashboardController extends Controller
{
    public function index()
    {
        // return Inertia::render('Dashboard', [
        //     'stats' => [
        //         'totalPackages' => \App\Models\Package::count(),
        //         'activeBookings' => \App\Models\Booking::where('status', 'active')->count(),
        //         'totalInquiries' => \App\Models\Inquiry::count(),
        //         'newsletterSubscribers' => \App\Models\Newsletter::count(),
        //         'featuredPackages' => \App\Models\Package::where('featured', true)->count(),
        //         'packageReviews' => \App\Models\Review::count(),
        //         'teamMembers' => \App\Models\TeamMember::count(),
        //         'blogPosts' => \App\Models\BlogPost::count(),
        //         'recentBookings' => \App\Models\Booking::with('user', 'package')
        //             ->latest()
        //             ->take(5)
        //             ->get()
        //             ->map(fn($b) => [
        //                 'customer' => $b->user->name,
        //                 'package' => $b->package->name,
        //                 'people' => $b->people,
        //                 'date' => $b->created_at->format('M d, Y'),
        //             ]),
        //     ],
        // ]);

        // return Inertia::render('Dashboard', [
        //     'stats' => [
        //         'totalPackages' => 15,
        //         'activeBookings' => 5,
        //         'totalInquiries' => 10,
        //         'newsletterSubscribers' => 5,
        //         'featuredPackages' => 4,
        //         'packageReviews' => 4,
        //         'teamMembers' => 99,
        //         'blogPosts' => 10,
        //         'recentBookings' => 5
        //     ],
        // ]);
        return Inertia::render('Dashboard', [
            'stats' => [
                'totalPackages' => 15,
                'activeBookings' => 5,
                'totalInquiries' => 10,
                'newsletterSubscribers' => 5,
                'featuredPackages' => 4,
                'packageReviews' => 4,
                'teamMembers' => 99,
                'blogPosts' => 10,
                'recentBookings' => [   // ← must be an array, not a number
                    [
                        'customer' => 'John Doe',
                        'package' => 'Everest Base Camp',
                        'people' => 3,
                        'date' => 'May 10, 2026',
                    ],
                    [
                        'customer' => 'Jane Smith',
                        'package' => 'Annapurna Circuit',
                        'people' => 2,
                        'date' => 'May 08, 2026',
                    ],
                ],
            ],
        ]);
    }
}
