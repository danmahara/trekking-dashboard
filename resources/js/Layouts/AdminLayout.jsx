import AdminSidebar from '@/Layouts/AdminSidebar';
import AdminNavbar from '@/Layouts/AdminNavbar';

// Import the core admin CSS (place this file at resources/css/admin.css)
// import '@/../../resources/css/admin.css';
import '../../css/admin.css'

/**
 * AdminLayout
 *
 * Usage:
 *   <AdminLayout title="Dashboard">
 *     <YourContent />
 *   </AdminLayout>
 *
 * Props:
 *   title    — string shown in the top navbar (default: "Dashboard")
 *   children — page content
 */
export default function AdminLayout({ title = 'Dashboard', children }) {
    return (
        <div className="admin-shell">
            {/* Fixed-height sidebar, independently scrollable */}
            <AdminSidebar />

            {/* Right side: navbar + scrollable content */}
            <div className="admin-body">
                <AdminNavbar title={title} />
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
