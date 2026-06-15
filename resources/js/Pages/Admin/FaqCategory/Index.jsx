import AdminTable from "@/Components/AdminTable";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function FaqCategory({ categories = [] }) {
    return (
        <>
            <Head title="Faq Categories" />

            <AdminTable
                data={categories}
                resource="admin.faq-categories"
                columns={[
                    { key: "title" },
                    { key: "order", sortable: true }
                ]}
                createRoute="admin.faq-categories.create"
                breadcrumbs={[
                    { label: "Dashboard", href: route("admin.dashboard") },
                    { label: "Faq Categories" }
                ]}

            />
        </>
    );
}

FaqCategory.layout = (page) => <AdminLayout title="Faqs" children={page} />;
