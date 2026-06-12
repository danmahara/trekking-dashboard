import AdminTable from "@/Components/AdminTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";


export default function Faq({ faqs = [] }) {

    return (
        <>
            <Head title="Faqs" />
            <AdminTable
                data={faqs}
                resource="admin.faqs"
                columns={[
                    { key: "question" },
                    { key: "order", sortable: true }
                ]}
                createRoute="admin.faqs.create"
                breadcrumbs={[
                    { label: "Dashboard", href: route("admin.dashboard") },
                    { label: "Faqs" }
                ]}

            />
        </>
    )
}



/*
 * Persistent layout — the AdminLayout (sidebar, navbar) stays mounted
 * when navigating between admin pages, so sidebar state and scroll
 * position are preserved. Every admin page should end with this line.
 */
Faq.layout = (page) => <AdminLayout title="Faqs" children={page} />;
