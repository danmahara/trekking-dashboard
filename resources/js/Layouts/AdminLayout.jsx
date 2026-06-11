import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import AdminSidebar from '@/Layouts/AdminSidebar';
import AdminNavbar from '@/Layouts/AdminNavbar';

import '@/../../resources/css/admin.css';

// Defined OUTSIDE the layout so it isn't recreated on every render.
function FlashToasts() {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    console.log(flash);
    return <Toaster position="top-right" toastOptions={{ duration: 3500 }} />;
}


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
            {/* Toasts — mounted once, survives page navigation */}
            <FlashToasts />

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
