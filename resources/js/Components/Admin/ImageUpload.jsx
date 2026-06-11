// Resources/js/Components/Admin/ImageUpload.jsx
import { useRef, useState } from "react";

export default function ImageUpload({
    label = "Image",
    name = "image",
    required = false,
    error = "",
    preview = null,
    onChange,
    accept = "image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml",
    maxMB = 2,
}) {
    const inputRef = useRef(null);
    const [localPreview, setLocalPreview] = useState(null);
    const [fileName, setFileName] = useState("");

    const displayPreview = localPreview || preview || null;

    const processFile = (file) => {
        if (!file) return;
        setFileName(file.name);
        setLocalPreview(URL.createObjectURL(file));
        onChange?.(file);
    };

    const handleInput = (e) => {
        processFile(e.target.files?.[0] ?? null);
        e.target.value = "";
    };

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLocalPreview(null);
        setFileName("");
        onChange?.(null);
    };

    return (
        <>
            <style>{IU_CSS}</style>
            <div className="iu-wrap">
                <label className="bf-label" htmlFor={name}>
                    {label}
                    {required && <span className="bf-required"> *</span>}
                </label>

                {/* File input row — no more ✕ here */}
                <div
                    className={`iu-input-row${error ? " iu-input-row--error" : ""}`}
                    onClick={() => inputRef.current?.click()}
                >
                    <span className="iu-choose-btn">Choose File</span>
                    <span className="iu-file-name">
                        {fileName || (preview ? preview.split("/").pop() : "No file chosen")}
                    </span>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    id={name}
                    name={name}
                    accept={accept}
                    onChange={handleInput}
                    style={{ display: "none" }}
                />

                {/* Preview with overlayed remove button */}
                {displayPreview && (
                    <div className="iu-preview-box">
                        <img
                            src={displayPreview}
                            alt={label}
                            className="iu-preview-img"
                        />
                        <button
                            type="button"
                            className="iu-clear-btn"
                            onClick={handleRemove}
                            title="Remove"
                            aria-label="Remove image"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {error && <span className="bf-error">{error}</span>}
            </div>
        </>
    );
}

const IU_CSS = `
.iu-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* File input row */
.iu-input-row {
    display: flex;
    align-items: center;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    background: var(--card-bg);
    transition: border-color 0.15s;
    user-select: none;
}
.iu-input-row:hover {
    border-color: var(--color-primary);
}
.iu-input-row--error {
    border-color: var(--color-accent-red);
}
.iu-choose-btn {
    flex-shrink: 0;
    padding: 8px 14px;
    background: var(--sidebar-bg);
    color: #e2e8f0;
    font-family: var(--font-sans);
    font-size: 0.82rem;
    font-weight: 500;
    border-right: 1px solid var(--card-border);
    white-space: nowrap;
    transition: background 0.15s;
}
.iu-input-row:hover .iu-choose-btn {
    background: #1e293b;
}
.iu-file-name {
    flex: 1;
    padding: 8px 12px;
    font-family: var(--font-sans);
    font-size: 0.83rem;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Preview box — now positioned so we can overlay the remove button */
.iu-preview-box {
    position: relative;
    margin-top: 2px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--card-border);
    background: var(--content-bg);
    display: inline-block;
    max-width: 200px;
}
.iu-preview-img {
    display: block;
    width: 100%;
    max-width: 200px;
    height: 120px;
    object-fit: cover;
}

/* Remove button overlayed on top-right of image */
.iu-clear-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.9);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: background 0.15s, transform 0.15s;
}
.iu-clear-btn:hover {
    background: rgb(220, 38, 38);
    transform: scale(1.08);
}
`;
