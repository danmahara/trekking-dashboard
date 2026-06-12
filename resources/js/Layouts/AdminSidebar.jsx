import { Link, usePage } from '@inertiajs/react';

// ── Icons ─────────────────────────────────────────────────────────────────

const Icon = {
    Globe: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
        </svg>
    ),
    Dashboard: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    Mail: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    Users: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    MessageSquare: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),
    Calendar: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Star: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    MapPin: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Zap: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    Package: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    FileText: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
    ),
    HelpCircle: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    ChevronRight: () => (
        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
            <polyline points="9 18 15 12 9 6" />
        </svg>
    ),
    LogOut: () => (
        <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
};

// ── Nav structure ─────────────────────────────────────────────────────────

const navSections = [
    {
        label: 'Main',
        items: [
            { label: 'Dashboard', routeName: 'admin.dashboard', Icon: Icon.Dashboard },
        ],
    },
    {
        label: 'Inquiries & Bookings',
        items: [
            { label: 'Newsletter', routeName: 'admin.newsletter.index', Icon: Icon.Mail },
            { label: 'Contact Us', routeName: 'admin.contact.index', Icon: Icon.Users },
            { label: 'Package Inquiries', routeName: 'admin.inquiry.index', Icon: Icon.MessageSquare },
            { label: 'Bookings', routeName: 'admin.bookings.index', Icon: Icon.Calendar },
            { label: 'Reviews', routeName: 'admin.reviews.index', Icon: Icon.Star },
        ],
    },
    {
        label: 'Travel Adventures',
        items: [
            { label: 'Destinations', routeName: 'admin.destinations.index', Icon: Icon.MapPin },
            { label: 'Activities', routeName: 'admin.activities.index', Icon: Icon.Zap },
            { label: 'Packages', routeName: 'admin.packages.index', Icon: Icon.Package },
            { label: 'Pages', routeName: 'admin.pages.index', Icon: Icon.FileText },
            { label: 'FAQs', routeName: 'admin.faqs.index', Icon: Icon.HelpCircle },
            { label: 'Blog Categories', routeName: 'admin.blog-categories.index', Icon: Icon.Star },
            { label: 'Blogs', routeName: 'admin.blogs.index', Icon: Icon.HelpCircle },
        ],
    },
];

// ── Component ─────────────────────────────────────────────────────────────

export default function AdminSidebar({ isOpen = false, onClose }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'A';

    const isActive = (routeName) => {
        try { return route().current(routeName); }
        catch { return false; }
    };

    const safeHref = (routeName) => {
        try { return route(routeName); }
        catch { return '#'; }
    };

    return (
        <aside className={`admin-sidebar${isOpen ? ' admin-sidebar--open' : ''}`}>
            {/* Brand */}
            <div className="sidebar-logo">
                <svg viewBox="0 0 40 40" width="38" height="38">
                    <polygon points="20,4 36,32 4,32" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                    <circle cx="20" cy="26" r="3" fill="#22c55e" />
                </svg>
                <div className="sidebar-logo-text">
                    <span>Adventure Pathways</span>
                    <span>Admin Panel</span>
                </div>
            </div>

            {/* Visit Site */}
            <a href="/" className="sidebar-visit-site" target="_blank" rel="noreferrer">
                <Icon.Globe />
                Visit Site
                <Icon.ChevronRight />
            </a>

            {/* Scrollable nav */}
            <nav className="sidebar-nav">
                {navSections.map((section) => (
                    <div key={section.label}>
                        <div className="sidebar-section-label">{section.label}</div>
                        {section.items.map(({ label, routeName, Icon: NavIcon }) => (
                            <Link
                                key={routeName}
                                href={safeHref(routeName)}
                                className={`sidebar-item${isActive(routeName) ? ' active' : ''}`}
                                onClick={onClose} // close sidebar on mobile nav tap
                            >
                                <NavIcon />
                                {label}
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-avatar">{initials}</div>
                    <div className="sidebar-user-info">
                        <div className="name">{user?.name ?? 'Admin'}</div>
                        <div className="role">Administrator</div>
                    </div>
                    <Link
                        href={safeHref('logout')}
                        method="post"
                        as="button"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                        title="Log out"
                    >
                        <Icon.LogOut />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
