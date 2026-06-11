// Laravel controller:
//   return Inertia::render('Admin/Blogs/Form', [
//       'categories' => Category::all(['id','name']),
//       'blog'       => $blog ?? null,   // null = create, Blog = edit
//   ]);

import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ImageUpload from "@/Components/Admin/ImageUpload";

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
            <nav className="admin-breadcrumb">
                <span className="admin-breadcrumb-item">
                    <a href={safeHref("admin.dashboard")}>Dashboard</a>
                </span>
                <span className="admin-breadcrumb-sep">›</span>
                <span className="admin-breadcrumb-item">
                    <a href={safeHref("admin.blogs.index")}>Our Blogs</a>
                </span>
                <span className="admin-breadcrumb-sep">›</span>
                <span className="admin-breadcrumb-item">
                    <strong>{isEditing ? "Edit Blog" : "Create Blog"}</strong>
                </span>
            </nav>

            <form onSubmit={handleSubmit} noValidate>
                <div className="bf-layout">
                    <div className="admin-table-card bf-main">

                        <div className="bf-card-header">
                            <span className="bf-card-title">Blog Details</span>
                        </div>

                        <div className="bf-card-body">

                            {/* Row 1: Title + Slug */}
                            <div className="bf-row">
                                <Field label="Title" required error={errors.title}>
                                    <input
                                        type="text"
                                        placeholder="Enter blog title"
                                        maxLength={100}
                                        {...inputProps("title")}
                                    />
                                </Field>
                                <Field
                                    label="Slug" required
                                    error={errors.slug}
                                    hint={data.slug ? `yoursite.com/blog/${data.slug}` : ""}
                                >
                                    <input
                                        type="text"
                                        placeholder="auto-generated-from-title"
                                        maxLength={100}
                                        {...inputProps("slug")}
                                    />
                                </Field>
                            </div>

                            {/* Row 2: Image + Cover — reusable ImageUpload */}
                            <div className="bf-row">
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
                            <div className="bf-row">
                                <Field label="Blog Category" error={errors.category_id}>
                                    <select {...inputProps("category_id")}>
                                        <option value="">Select Blog Category</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Short Title" error={errors.short_title}>
                                    <input
                                        type="text"
                                        placeholder="Short headline for cards"
                                        maxLength={255}
                                        {...inputProps("short_title")}
                                    />
                                </Field>
                            </div>

                            {/* Row 4: Publish Date + Order No. */}
                            <div className="bf-row">
                                <Field label="Publish Date" required error={errors.publish_date}>
                                    <input type="date" {...inputProps("publish_date")} />
                                </Field>
                                <Field label="Order No." error={errors.order}>
                                    <input
                                        type="number" min={0} placeholder="0"
                                        {...inputProps("order", { value: data.order })}
                                    />
                                </Field>
                            </div>




                            {/* Description */}
                            <Field label="Description" required error={errors.description} full>
                                <textarea
                                    rows={10}
                                    placeholder="Write the blog content here…"
                                    {...inputProps("description")}
                                />
                            </Field>

                            {/* Row 5: Author + Author Position */}
                            <div className="bf-row">
                                <Field label="Author" error={errors.author}>
                                    <input
                                        type="text" placeholder="e.g. Jane Doe" maxLength={100}
                                        {...inputProps("author")}
                                    />
                                </Field>
                                <Field label="Author Position" error={errors.author_post}>
                                    <input
                                        type="text" placeholder="e.g. Senior Editor" maxLength={50}
                                        {...inputProps("author_post")}
                                    />
                                </Field>
                            </div>

                            {/* Row 6: Country + Quote */}
                            <div className="bf-row">
                                <Field label="Country" error={errors.country}>
                                    <input
                                        type="text" placeholder="e.g. Nepal" maxLength={50}
                                        {...inputProps("country")}
                                    />
                                </Field>
                                <Field label="Pull Quote" error={errors.quote}>
                                    <input
                                        type="text" placeholder="A memorable quote to highlight"
                                        {...inputProps("quote")}
                                    />
                                </Field>
                            </div>

                            {/* Checkboxes */}
                            <div className="bf-checks">
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
                <div className="bf-actions">
                    <a href={safeHref("admin.blogs.index")} className="bf-btn-cancel">
                        Cancel
                    </a>
                    <button type="submit" className="admin-create-btn" disabled={processing}>
                        {processing
                            ? <><span className="bf-spinner" /> Saving…</>
                            : isEditing ? "Update Blog" : "Create Blog"
                        }
                    </button>
                </div>
            </form>

            <style>{CSS}</style>
        </AdminLayout>
    );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, required = false, error, hint, full = false, children }) {
    return (
        <div className={`bf-field${full ? " bf-field--full" : ""}`}>
            <label className="bf-label">
                {label}
                {required && <span className="bf-required">*</span>}
            </label>
            {children}
            {error && <span className="bf-error">{error}</span>}
            {hint && !error && <span className="bf-hint">{hint}</span>}
        </div>
    );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────
function CheckField({ name, checked, onChange, label, desc }) {
    return (
        <label className="bf-check-row" htmlFor={name}>
            <input
                type="checkbox"
                id={name} name={name}
                checked={checked}
                onChange={onChange}
                className="bf-checkbox"
            />
            <div className="bf-check-text">
                <span className="bf-check-label">{label}</span>
                {desc && <span className="bf-check-desc">{desc}</span>}
            </div>
        </label>
    );
}

// ── Scoped CSS ────────────────────────────────────────────────────────────────
const CSS = `
.bf-layout { display: flex; flex-direction: column; gap: 20px; }

.bf-card-header {
    display: flex; align-items: center;
    padding: 16px 22px;
    border-bottom: 1px solid var(--card-border);
}
.bf-card-title {
    font-family: var(--font-display);
    font-size: 0.95rem; font-weight: 700;
    color: var(--text-primary); letter-spacing: -0.01em;
}

.bf-card-body {
    padding: 24px 22px;
    display: flex; flex-direction: column; gap: 20px;
}

.bf-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
@media (max-width: 640px) { .bf-row { grid-template-columns: 1fr; } }

.bf-field { display: flex; flex-direction: column; gap: 6px; }
.bf-field--full { grid-column: 1 / -1; }

.bf-label {
    font-family: var(--font-display);
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--text-secondary);
}
.bf-required { color: var(--color-accent-red); margin-left: 2px; }

.admin-input {
    width: 100%; padding: 9px 12px;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    font-family: var(--font-sans);
    font-size: 0.875rem; color: var(--text-primary);
    outline: none; appearance: none;
    transition: border-color 0.15s, box-shadow 0.15s;
}
.admin-input::placeholder { color: var(--text-muted); }
.admin-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
}
.admin-input.is-invalid {
    border-color: var(--color-accent-red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
textarea.admin-input { resize: vertical; line-height: 1.65; min-height: 160px; }
select.admin-input {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px; cursor: pointer;
}

.bf-error {
    font-size: 0.75rem; color: var(--color-accent-red);
    display: flex; align-items: center; gap: 4px;
}
.bf-error::before { content: '⚠'; font-size: 0.65rem; }
.bf-hint { font-size: 0.72rem; color: var(--text-muted); word-break: break-all; }

.bf-checks { display: flex; flex-direction:row !important; width:100%; flex-direction: column; gap: 10px; padding-top: 4px; }
.bf-check-row {
    width: 150px;
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px;
    background: var(--content-bg);
    border: 1px solid var(--card-border);
    border-radius: 8px; cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    user-select: none;
}
.bf-check-row:hover {
    border-color: var(--color-primary);
    background: rgba(34, 197, 94, 0.04);
}
.bf-checkbox {
    width: 17px; height: 17px;
    accent-color: var(--color-primary);
    cursor: pointer; flex-shrink: 0;
}
.bf-check-text { display: flex; flex-direction: column; gap: 1px; }
.bf-check-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
.bf-check-desc  { font-size: 0.75rem; color: var(--text-muted); }

.bf-actions {
    display: flex; align-items: center;
    justify-content: flex-end; gap: 10px;
    margin-top: 20px; padding-top: 20px;
    border-top: 1px solid var(--card-border);
}
.bf-btn-cancel {
    padding: 8px 20px;
    font-family: var(--font-sans);
    font-size: 0.83rem; font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none; border-radius: 8px;
    border: 1px solid var(--card-border);
    background: var(--card-bg);
    transition: background 0.15s, color 0.15s;
}
.bf-btn-cancel:hover { background: var(--content-bg); color: var(--text-primary); }

.admin-create-btn { display: inline-flex; align-items: center; gap: 6px; }
.admin-create-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }

.bf-spinner {
    display: inline-block; width: 12px; height: 12px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: bf-spin 0.6s linear infinite;
}
@keyframes bf-spin { to { transform: rotate(360deg); } }
`;
