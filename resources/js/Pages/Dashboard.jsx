import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

// ── Icons ─────────────────────────────────────────────────────────────────

const PackageIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const CalendarCheckIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
    </svg>
);

const MailIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const UsersIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const PlusIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const SettingsIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

const BlogIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const StarIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const TeamIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const FileIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ width: 12, height: 12 }}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);

// ── Dashboard Component ───────────────────────────────────────────────────

export default function Dashboard({ stats = {} }) {
    console.log("Stats: ", stats);

    const {
        totalPackages = 19,
        activeBookings = 0,
        totalInquiries = 0,
        newsletterSubscribers = 2,
        featuredPackages = 15,
        packageReviews = 9,
        teamMembers = 5,
        blogPosts = 8,
        recentBookings = [],
    } = stats;

    const safeHref = (routeName) => {
        try { return route(routeName); }
        catch { return '#'; }
    };

    return (
        <AdminLayout title="Admin Dashboard">
            <Head title="Admin Dashboard" />

            {/* ── Stat Cards ── */}
            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <span className="stat-card-label">Total Packages</span>
                        <div className="stat-card-icon icon-bg-green"><PackageIcon /></div>
                    </div>
                    <div className="stat-card-value">{totalPackages}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <span className="stat-card-label">Active Bookings</span>
                        <div className="stat-card-icon icon-bg-cyan"><CalendarCheckIcon /></div>
                    </div>
                    <div className="stat-card-value">{activeBookings}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <span className="stat-card-label">Total Inquiries</span>
                        <div className="stat-card-icon icon-bg-amber"><MailIcon /></div>
                    </div>
                    <div className="stat-card-value">{totalInquiries}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <span className="stat-card-label">Newsletter Subscribers</span>
                        <div className="stat-card-icon icon-bg-slate"><UsersIcon /></div>
                    </div>
                    <div className="stat-card-value">{newsletterSubscribers}</div>
                </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="section-card">
                <div className="section-card-header">
                    <h2 className="section-card-title">Quick Actions</h2>
                </div>
                <div className="section-card-body">
                    <div className="quick-actions-grid">
                        <Link href={safeHref('admin.packages.create')} className="action-btn action-btn-green">
                            <PlusIcon /> Add New Package
                        </Link>
                        <Link href={safeHref('admin.bookings.index')} className="action-btn action-btn-cyan">
                            <CalendarCheckIcon /> Manage Bookings
                        </Link>
                        <Link href={safeHref('admin.blog.create')} className="action-btn action-btn-amber">
                            <BlogIcon /> Write Blog Post
                        </Link>
                        <Link href={safeHref('admin.settings.index')} className="action-btn action-btn-dark">
                            <SettingsIcon /> Site Settings
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Bottom grid: Recent Bookings + Quick Stats ── */}
            <div className="dashboard-bottom-grid">
                {/* Recent Bookings */}
                <div className="section-card" style={{ marginBottom: 0 }}>
                    <div className="section-card-header flex-between">
                        <h2 className="section-card-title">Recent Bookings</h2>
                        <Link href={safeHref('admin.bookings.index')} className="view-all-link">
                            View All <ArrowRightIcon />
                        </Link>
                    </div>

                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Package</th>
                                <th>People</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.length > 0 ? (
                                recentBookings.map((booking, i) => (
                                    <tr key={i}>
                                        <td>{booking.customer}</td>
                                        <td>{booking.package}</td>
                                        <td>{booking.people}</td>
                                        <td>{booking.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="table-empty">
                                        No recent bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Quick Stats */}
                <div className="section-card" style={{ marginBottom: 0 }}>
                    <div className="section-card-header">
                        <h2 className="section-card-title">Quick Stats</h2>
                    </div>
                    <div className="quick-stats-list">
                        <div className="quick-stat-item">
                            <div className="quick-stat-icon icon-bg-green"><PackageIcon /></div>
                            <div className="quick-stat-info">
                                <div className="quick-stat-label">Featured Packages</div>
                                <div className="quick-stat-value">{featuredPackages}</div>
                            </div>
                        </div>
                        <div className="quick-stat-item">
                            <div className="quick-stat-icon icon-bg-amber"><StarIcon /></div>
                            <div className="quick-stat-info">
                                <div className="quick-stat-label">Package Reviews</div>
                                <div className="quick-stat-value">{packageReviews}</div>
                            </div>
                        </div>
                        <div className="quick-stat-item">
                            <div className="quick-stat-icon icon-bg-cyan"><TeamIcon /></div>
                            <div className="quick-stat-info">
                                <div className="quick-stat-label">Team Members</div>
                                <div className="quick-stat-value">{teamMembers}</div>
                            </div>
                        </div>
                        <div className="quick-stat-item">
                            <div className="quick-stat-icon icon-bg-slate"><FileIcon /></div>
                            <div className="quick-stat-info">
                                <div className="quick-stat-label">Blog Posts</div>
                                <div className="quick-stat-value">{blogPosts}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
