// Laravel controller:
//   return Inertia::render('Admin/BlogCategory/Form', [
//       'category' => $category ?? null,   // null = create, Category = edit
//   ]);
import Breadcrumb from "@/Components/Breadcrumb";
import InputField from "@/Components/InputField";
import Field from "@/Components/Field";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function BlogCategoryForm({ category = null }) {
    const isEditing = !!category;

    const { data, setData, post, put, processing, errors } = useForm({
        title: category?.title ?? "",
        short_description: category?.short_description ?? "",
        status: !!category?.status,
        order: category?.order ?? 0,
    });

    const handleChange = (field) => (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked
                : e.target.type === "number" ? Number(e.target.value)
                    : e.target.value;
        setData(field, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onError: () => toast.error("Please fix the highlighted fields."),
        };
        isEditing
            ? put(route("admin.blog-categories.update", category.id), options)
            : post(route("admin.blog-categories.store"), options);
    };

    return (
        <AdminLayout title={isEditing ? "Edit Blog Category" : "Create Blog Category"}>
            <Head title={isEditing ? "Edit Blog Category" : "Create Blog Category"} />

            <Breadcrumb items={[
                { label: "Dashboard", href: route("admin.dashboard") },
                { label: "Blog Categories", href: route("admin.blog-categories.index") },
                { label: isEditing ? "Edit Blog Category" : "Create Blog Category" },
            ]} />

            <form onSubmit={handleSubmit} noValidate>
                <div className="af-layout">
                    <div className="admin-table-card">
                        <div className="af-card-body">

                            {/* Title + Order */}
                            <div className="af-row">
                                <InputField
                                    label="Title" field="title" required
                                    type="text" maxLength={255}
                                    data={data} errors={errors} setData={setData}
                                    placeholder="Enter category title"
                                />
                                <InputField
                                    label="Order No." field="order" required
                                    type="number"
                                    data={data} errors={errors} setData={setData}
                                />
                            </div>

                            {/* Short Description (full width) */}
                            <InputField
                                label="Short Description" field="short_description" full
                                type="text" maxLength={255}
                                data={data} errors={errors} setData={setData}
                                placeholder="A brief description of this category"
                            />

                            {/* Status */}
                            <div className="af-checks">
                                <label className="af-check-row" htmlFor="status">
                                    <input
                                        type="checkbox"
                                        id="status" name="status"
                                        checked={data.status}
                                        onChange={handleChange("status")}
                                        className="af-checkbox"
                                    />
                                    <div className="af-check-text">
                                        <span className="af-check-label">Status</span>
                                    </div>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="af-actions">
                    <a href={route("admin.blog-categories.index")} className="af-btn-cancel">
                        Cancel
                    </a>
                    <button type="submit" className="admin-create-btn" disabled={processing}>
                        {processing
                            ? <><span className="af-spinner" /> Saving…</>
                            : isEditing ? "Update Category" : "Create Category"
                        }
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
