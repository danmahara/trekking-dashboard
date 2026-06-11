import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminTable from '@/Components/AdminTable';
import { FileSearch } from 'lucide-react';

export default function Blog({ blogs = [] }) {
    return (
        <>
            <Head title="Blogs" />

            <AdminTable
                data={blogs}
                resource="admin.blogs" // powers edit / destroy / status routes via Ziggy
                columns={[
                    { key: 'feature_image', label: 'Image', type: 'image' },
                    { key: 'title', sortable: true },
                    { key: 'publish_date', sortable: true },
                ]}
                extraActions={(row) => [
                    {
                        icon: FileSearch,
                        href: route().has('admin.blogs.seo.index')
                            ? route('admin.blogs.seo.index', row.id)
                            : '#',
                        title: 'Blog SEO',
                    },
                ]}
                createRoute="admin.blogs.create"
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Blogs' },
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
Blog.layout = (page) => <AdminLayout title="Blogs" children={page} />;
