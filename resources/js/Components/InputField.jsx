// Components/Admin/InputField.jsx
import Field from "./Field";

export default function InputField({
    label,
    field,
    data,
    errors,
    setData,
    required = false,
    hint = "",
    type = "text",
    placeholder = "",
    maxLength,
    min,
    extra = {},
}) {
    const handleChange = (e) => {
        const value =
            type === "checkbox" ? e.target.checked
                : type === "number" ? Number(e.target.value)
                    : e.target.value;
        setData(field, value);
    };

    return (
        <Field label={label} required={required} error={errors[field]} hint={hint}>
            <input
                id={field}
                name={field}
                type={type}
                value={data[field]}
                onChange={handleChange}
                placeholder={placeholder}
                maxLength={maxLength}
                min={min}
                className={`admin-input${errors[field] ? " is-invalid" : ""}`}
                {...extra}
            />
        </Field>
    );
}
