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

export default Field
