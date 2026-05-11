import { useState, useEffect } from 'react';
import AdminSidebar from '@/Layouts/AdminSidebar';
import AdminNavbar from '@/Layouts/AdminNavbar';

import '@/../../resources/css/admin.css';

export default function AdminLayout({ title = 'Dashboard', children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close on ESC key
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setSidebarOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    // Lock body scroll when mobile sidebar is open
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    return (
        <div className="admin-shell">
            {/* Overlay — tapping it closes the sidebar on mobile */}
            <div
                className={`sidebar-overlay${sidebarOpen ? ' sidebar-overlay--visible' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar — gets an "open" class on mobile */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Right side */}
            <div className="admin-body">
                <AdminNavbar
                    title={title}
                    onHamburgerClick={() => setSidebarOpen((v) => !v)}
                    sidebarOpen={sidebarOpen}
                />
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
