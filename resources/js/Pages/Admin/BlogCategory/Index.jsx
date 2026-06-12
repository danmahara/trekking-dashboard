import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminTable from '@/Components/AdminTable';
import { FileSearch } from 'lucide-react';

export default function BlogCategory({ categories = [] }) {
    return (
        <>
            <Head title="Blog Categories" />

            <AdminTable
                data={categories}
                resource="admin.blog-categories" // powers edit / destroy / status routes via Ziggy
                columns={[
                    { key: 'title', sortable: true },
                    { key: 'order', sortable: true },
                ]}
                createRoute="admin.blog-categories.create"
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Blog Categories' },
                ]}
            />
        </>
    );
}

/*
 * Persistent layout — the AdminLayout (sidebar, navbar) stays mounted
 * when navigating between admin pages, so sidebar state and scroll
 * position are preserved. Every admin page should end with this line.
 */
BlogCategory.layout = (page) => <AdminLayout title="Blog Categories" children={page} />;
