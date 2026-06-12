// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, required = false, error, hint, full = false, children }) {
    return (
        <div className={`af-field${full ? " af-field--full" : ""}`}>
            <label className="af-label">
                {label}
                {required && <span className="af-required">*</span>}
            </label>
            {children}
            {error && <span className="af-error">{error}</span>}
            {hint && !error && <span className="af-hint">{hint}</span>}
        </div>
    );
}

export default Field
