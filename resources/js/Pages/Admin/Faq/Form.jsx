import Breadcrumb from "@/Components/Breadcrumb";
import Field from "@/Components/Field";
import InputField from "@/Components/InputField";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function FaqForm({ faq = null, categories = [] }) {
    const isEditing = !!faq;

    const { data, setData, post, put, processing, errors } = useForm({
        category_id: faq?.category_id ?? "",
        question: faq?.question ?? "",
        answer: faq?.answer ?? "",
        status: faq?.status ?? true,
        order: faq?.order ?? 0,
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
            ? put(route("admin.faqs.update", faq.id), options)
            : post(route("admin.faqs.store"), options);
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
        <AdminLayout title={isEditing ? "Edit FAQ" : "Create FAQ"}>
            <Head title={isEditing ? "Edit FAQ" : "Create FAQ"} />
            <Breadcrumb items={[
                { label: "Dashboard", href: route("admin.dashboard") },
                { label: "FAQs", href: route("admin.faqs.index") },
                { label: isEditing ? "Edit FAQ" : "Create FAQ" },
            ]} />

            <form onSubmit={handleSubmit} noValidate>
                <div className="af-layout">
                    <div className="admin-table-card">
                        <div className="af-card-body">

                            {/* Category + Sort Order */}
                            <div className="af-row">
                                <div className="af-field">
                                    {/* <label className="af-label" htmlFor="category_id">
                                        Category
                                    </label> */}
                                    <Field label="Blog Category" error={errors.category_id}>

                                        <select
                                            id="category_id"
                                            name="category_id"
                                            value={data.category_id}
                                            onChange={handleChange("category_id")}
                                            className={`admin-input${errors.category_id ? " is-invalid" : ""}`
                                            }
                                        >
                                            {/* <select {...inputProps("category_id")}> */}

                                            <option value="">— Select Category —</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.title}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    {/* {errors.category_id && (
                                            <p className="af-error">{errors.category_id}</p>
                                        )} */}
                                </div>

                                <InputField
                                    label="Sort Order" field="order" required
                                    type="number"
                                    data={data} errors={errors} setData={setData}
                                />
                            </div>

                            {/* Question (full width) */}
                            <InputField
                                label="Question" field="question" required full
                                type="text" maxLength={255}
                                data={data} errors={errors} setData={setData}
                                placeholder="Enter the FAQ question"
                            />

                            {/* Answer (full width textarea) */}
                            <div className="af-field af-field-full">
                                <label className="af-label" htmlFor="answer">
                                    Answer <span className="af-required">*</span>
                                </label>
                                <textarea
                                    id="answer"
                                    name="answer"
                                    rows={5}
                                    value={data.answer}
                                    onChange={handleChange("answer")}
                                    placeholder="Enter the FAQ answer"
                                    className={`af-input af-textarea${errors.answer ? " af-input-error" : ""}`}
                                />
                                {errors.answer && (
                                    <p className="af-error">{errors.answer}</p>
                                )}
                            </div>

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
                                        <span className="af-check-label">Active</span>
                                    </div>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="af-actions">
                    <a href={route("admin.faqs.index")} className="af-btn-cancel">
                        Cancel
                    </a>
                    <button type="submit" className="admin-create-btn" disabled={processing}>
                        {processing
                            ? <><span className="af-spinner" /> Saving…</>
                            : isEditing ? "Update FAQ" : "Create FAQ"
                        }
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
