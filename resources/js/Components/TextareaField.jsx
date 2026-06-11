// Components/Admin/TextareaField.jsx
import Field from "./Field";

export default function TextareaField({
    label,
    field,
    data,
    errors,
    setData,
    required = false,
    placeholder = "",
    rows = 10,
    full = false,
}) {
    return (
        <Field label={label} required={required} error={errors[field]} full={full}>
            <textarea
                id={field}
                name={field}
                rows={rows}
                value={data[field]}
                onChange={(e) => setData(field, e.target.value)}
                placeholder={placeholder}
                className={`admin-input${errors[field] ? " is-invalid" : ""}`}
            />
        </Field>
    );
}
