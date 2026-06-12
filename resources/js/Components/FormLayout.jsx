import { Link } from '@inertiajs/react';

/* ==========================================================================
   Form layout building blocks — shared across all admin module forms.
   Pair with admin-form.css (the `af-` classes).
   ========================================================================== */

/**
 * FormCard — a titled card section. A form can contain one or several.
 *
 *   <FormCard title="Blog Details">
 *       <FormRow>...</FormRow>
 *   </FormCard>
 *
 * `actions` renders on the right side of the header (e.g. a small button).
 */
export function FormCard({ title, actions = null, children }) {
    return (
        <div className="admin-table-card">
            {(title || actions) && (
                <div className="af-card-header">
                    {title && <span className="af-card-title">{title}</span>}
                    {actions}
                </div>
            )}
            <div className="af-card-body">{children}</div>
        </div>
    );
}

/**
 * FormRow — responsive grid row. `cols` = 2 (default), 3, or 4.
 * Collapses to a single column on mobile.
 */
export function FormRow({ cols = 2, children }) {
    const cls = cols === 3 ? 'af-row af-row--3'
        : cols === 4 ? 'af-row af-row--4'
            : 'af-row';
    return <div className={cls}>{children}</div>;
}

/**
 * CheckField — a single styled checkbox row. Group several inside FormChecks.
 */
export function CheckField({ name, checked, onChange, label, desc }) {
    return (
        <label className="af-check-row" htmlFor={name}>
            <input
                type="checkbox"
                id={name}
                name={name}
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

export function FormChecks({ children }) {
    return <div className="af-checks">{children}</div>;
}

/**
 * FormActions — the bottom Cancel / Submit bar.
 *
 *   <FormActions
 *       cancelHref={route('admin.blogs.index')}
 *       processing={processing}
 *       submitLabel={isEditing ? 'Update Blog' : 'Create Blog'}
 *   />
 */
export function FormActions({
    cancelHref,
    cancelLabel = 'Cancel',
    processing = false,
    submitLabel = 'Save',
    savingLabel = 'Saving…',
}) {
    return (
        <div className="af-actions">
            {cancelHref && (
                <Link href={cancelHref} className="af-btn-cancel">
                    {cancelLabel}
                </Link>
            )}
            <button type="submit" className="admin-create-btn" disabled={processing}>
                {processing
                    ? <><span className="af-spinner" /> {savingLabel}</>
                    : submitLabel}
            </button>
        </div>
    );
}
