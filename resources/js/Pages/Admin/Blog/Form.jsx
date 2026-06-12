// Laravel controller:
//   return Inertia::render('Admin/Blogs/Form', [
//       'categories' => Category::all(['id','name']),
//       'blog'       => $blog ?? null,   // null = create, Blog = edit
//   ]);
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ImageUpload from "@/Components/Admin/ImageUpload";
import InputLabel from "@/Components/Field";
import Field from "@/Components/Field";
import InputField from "@/Components/InputField";
import TextareaField from "@/Components/TextareaField";
import Breadcrumb from "@/Components/Breadcrumb";

const toSlug = (str) =>
    str.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const safeHref = (name, params = {}) => {
    try { return route(name, params); } catch { return "#"; }
};

export default function BlogForm({ categories = [], blog = null }) {
    const isEditing = !!blog;

    const { data, setData, post, put, processing, errors } = useForm({
        category_id: blog?.category_id ?? "",
        slug: blog?.slug ?? "",
        title: blog?.title ?? "",
        description: blog?.description ?? "",
        short_title: blog?.short_title ?? "",
        author: blog?.author ?? "",
        author_post: blog?.author_post ?? "",
        country: blog?.country ?? "",
        quote: blog?.quote ?? "",
        publish_date: blog?.publish_date ?? "",
        order: blog?.order ?? 0,
        status: !!blog?.status,
        is_featured: !!blog?.is_featured,
        image: null,
        cover: null,
    });

    const handleChange = (field) => (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked
                : e.target.type === "number" ? Number(e.target.value)
                    : e.target.value;

        setData(field, value);

        if (field === "title" && !isEditing) {
            setData("slug", toSlug(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        isEditing
            ? put(route("admin.blogs.update", blog.id), { forceFormData: true, _method: "PUT" })
            : post(route("admin.blogs.store"), { forceFormData: true });
    };

    const inputProps = (field, extra = {}) => ({
        id: field,
        name: field,
        value: data[field],
        onChange: handleChange(field),
        className: `admin-input${errors[field] ? " is-invalid" : ""}`,
        ...extra,
    });

    return (
        <AdminLayout title={isEditing ? "Edit Blog" : "Create Blog"}>
            <Head title={isEditing ? "Edit Blog" : "Create Blog"} />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: route("admin.dashboard") },
                    { label: "Our Blogs", href: route("admin.blogs.index") },
                    { label: isEditing ? "Edit Blog" : "Create Blog" },
                ]}
            />

            <form onSubmit={handleSubmit} noValidate>
                <div className="af-layout">
                    <div className="admin-table-card af-main">

                        {/* <div className="af-card-header">
                            <span className="af-card-title">Blog Details</span>
                        </div> */}

                        <div className="af-card-body">

                            {/* Row 1: Title + Slug */}
                            <div className="af-row">
                                <InputField
                                    label="Title" field="title" required
                                    data={data} errors={errors} setData={setData}
                                    placeholder="Enter blog title" maxLength={100}
                                    extra={{ onChange: handleChange("title") }}
                                />
                                <InputField
                                    label="Slug" field="slug" required
                                    data={data} errors={errors} setData={setData}
                                    placeholder="auto-generated-from-title" maxLength={100}
                                    hint={data.slug ? `yoursite.com/blog/${data.slug}` : ""}
                                />
                            </div>

                            {/* Row 2: Image + Cover — reusable ImageUpload */}
                            <div className="af-row">
                                <ImageUpload
                                    label="Feature Image"
                                    name="image"
                                    required={!isEditing}
                                    error={errors.image}
                                    preview={blog?.image_url ?? null}
                                    onChange={(file) => setData("image", file)}
                                />
                                <ImageUpload
                                    label="Cover Image"
                                    name="cover"
                                    required={!isEditing}
                                    error={errors.cover}
                                    preview={blog?.cover_url ?? null}
                                    onChange={(file) => setData("cover", file)}
                                />
                            </div>


                            {/* Row 3: Category + Short Title */}
                            <div className="af-row">
                                <Field label="Blog Category" error={errors.category_id}>
                                    <select {...inputProps("category_id")}>
                                        <option value="">Select Blog Category</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </Field>

                                <InputField label="Short title" field="short_title" required maxLength={255} type="text" data={data} errors={errors} setData={setData} />

                            </div>

                            {/* Row 4: Publish Date + Order No. */}
                            <div className="af-row">
                                <InputField label="Publish Date" field="publish_date" required
                                    type="date" data={data} errors={errors} setData={setData} />

                                <InputField label="Order No." field="order" required
                                    type="number" data={data} errors={errors} setData={setData} />
                            </div>


                            {/* Description */}
                            <TextareaField
                                label="Description" field="description" required full
                                data={data} errors={errors} setData={setData}
                                placeholder="Write the blog content here…"
                                rows={10}
                            />

                            {/* Row 5: Author + Author Position */}
                            <div className="af-row">
                                <InputField label="Author" field="author" required
                                    type="text" data={data} errors={errors} setData={setData} />

                                <InputField label="Author Position" field="author_post" required
                                    type="text" data={data} errors={errors} setData={setData} placeholder="e.g. Senior Editor" />
                            </div>

                            {/* Row 6: Country + Quote */}
                            <div className="af-row">
                                <InputField
                                    label="Country" field="country"
                                    data={data} errors={errors} setData={setData}
                                    placeholder="e.g. Nepal" maxLength={50}
                                />
                                <InputField
                                    label="Pull Quote" field="quote"
                                    data={data} errors={errors} setData={setData}
                                    placeholder="A memorable quote to highlight"
                                />
                            </div>

                            {/* Checkboxes */}
                            <div className="af-checks">
                                <CheckField
                                    name="status"
                                    checked={data.status}
                                    onChange={handleChange("status")}
                                    label="Status"
                                />
                                <CheckField
                                    name="is_featured"
                                    checked={data.is_featured}
                                    onChange={handleChange("is_featured")}
                                    label="Featured"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="af-actions">
                    <a href={safeHref("admin.blogs.index")} className="af-btn-cancel">
                        Cancel
                    </a>
                    <button type="submit" className="admin-create-btn" disabled={processing}>
                        {processing
                            ? <><span className="af-spinner" /> Saving…</>
                            : isEditing ? "Update Blog" : "Create Blog"
                        }
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────
function CheckField({ name, checked, onChange, label, desc }) {
    return (
        <label className="af-check-row" htmlFor={name}>
            <input
                type="checkbox"
                id={name} name={name}
                checked={checked}
                onChange={onChange}
                className="af-checkbox"
            />
            <div className="af-check-text">
                <span className="af-check-label">{label}</span>
                {desc && <span className="af-check-desc">{desc}</span>}
            </div>
        </label>
    );
}
