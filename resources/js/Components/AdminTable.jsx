// import { useCallback, isValidElement, createElement } from 'react';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';


// ── Icons ─────────────────────────────────────────────────────────────────
const SortIcon = ({ dir }) => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        style={{ width: 12, height: 12, marginLeft: 4, opacity: dir ? 1 : 0.35 }}>
        {dir === 'asc'
            ? <polyline points="18 15 12 9 6 15" />
            : dir === 'desc'
                ? <polyline points="6 9 12 15 18 9" />
                : <><polyline points="18 15 12 9 6 15" /><polyline points="6 15 12 21 18 15" style={{ opacity: 0.4 }} /></>
        }
    </svg>
);
const ChevronLeft = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const ChevronRight = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ width: 14, height: 14 }}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);
const SearchIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        style={{ width: 15, height: 15, color: '#94a3b8', flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

// ── Toggle Switch ─────────────────────────────────────────────────────────
import { useState, useMemo, useCallback, useEffect, isValidElement, createElement } from 'react';

export function StatusToggle({ active, onChange }) {
    const [isOn, setIsOn] = useState(active);

    // Re-sync with server truth whenever fresh props arrive
    useEffect(() => setIsOn(active), [active]);

    const toggle = () => {
        const next = !isOn;
        setIsOn(next);   // flip instantly — no waiting
        onChange(next);  // server request happens in background
    };

    return (
        <button
            className={`admin-toggle${isOn ? ' admin-toggle--on' : ''}`}
            onClick={toggle}
            aria-label={isOn ? 'Disable' : 'Enable'}
        >
            <span className="admin-toggle-thumb" />
        </button>
    );
}

// ── Action Buttons ────────────────────────────────────────────────────────
// `icon` can be rendered JSX (<Pencil size={16} />) or a component
// reference (Pencil, including forwardRef components like lucide icons).
const renderIcon = (icon) => {
    if (!icon) return null;
    if (isValidElement(icon)) return icon;     // already JSX → render as-is
    return createElement(icon, { size: 16 });  // component reference → instantiate it
};

export function TableActions({ actions }) {
    return (
        <div className="table-actions">
            {actions.map(({ icon, href, onClick, title, variant = 'default' }, i) =>
                href ? (
                    <Link key={i} href={href} className={`table-action-btn table-action-btn--${variant}`} title={title}>
                        {renderIcon(icon)}
                    </Link>
                ) : (
                    <button key={i} onClick={onClick} className={`table-action-btn table-action-btn--${variant}`} title={title}>
                        {renderIcon(icon)}
                    </button>
                )
            )}
        </div>
    );
}

// ── Column conventions ────────────────────────────────────────────────────
// 'publish_date' → 'Publish Date'
const labelFromKey = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// Built-in cell renderers, chosen by the column `type`.
const CELL_TYPES = {
    text: (value) => value ?? '—',
    date: (value) => (value ? new Date(value).toLocaleDateString() : '—'),
    image: (value, row) =>
        value ? (
            <img src={value} alt={row.title ?? ''} className="table-thumb" />
        ) : (
            <div className="table-thumb-placeholder">No Image</div>
        ),
};

/**
 * Accepts columns as plain strings OR objects, returns a unified shape:
 *
 *   'title'                                  → { key: 'title', label: 'Title' }
 *   { key: 'title', sortable: true }         → label auto-generated
 *   { key: 'feature_image', type: 'image' }  → built-in image renderer
 *   { key: 'x', render: (row) => <... /> }   → fully custom cell
 */
const normalizeColumns = (columns) =>
    columns.map((col) => {
        const c = typeof col === 'string' ? { key: col } : col;
        return {
            label: labelFromKey(c.key),
            sortable: false,
            type: 'text',
            ...c,
        };
    });

// ── Main AdminTable ───────────────────────────────────────────────────────
/**
 * AdminTable — reusable data table component
 *
 * Props:
 *   data         — array of row objects (must include `id`; `status` if using toggle)
 *   columns      — strings or { key, label?, sortable?, type?, render?, className? }
 *   resource     — Ziggy route prefix, e.g. "admin.blogs". Auto-wires:
 *                    edit   → route('admin.blogs.edit', row.id)
 *                    delete → route('admin.blogs.destroy', row.id) (with confirm)
 *                    status → route('admin.blogs.status') PATCH { id, status }
 *   actions      — disable defaults: { edit: false, delete: false, status: false }
 *   extraActions — (row) => [{ icon, href|onClick, title, variant? }]
 *   createRoute  — route name string for "+ Create" button (optional)
 *   createLabel  — label for create button (default: "+ Create")
 *   perPageOptions — array of numbers (default: [10, 25, 50, 100])
 *   breadcrumbs  — array of { label, href? }
 *   confirmDelete — (row) => string shown in the confirm() dialog
 */
export default function AdminTable({
    columns = [],
    data = [],
    resource = null,
    actions = {},
    extraActions = null,
    createRoute,
    createLabel = '+ Create',
    perPageOptions = [10, 25, 50, 100],
    breadcrumbs = [],
    confirmDelete = (row) => `Delete "${row.title ?? 'this item'}"? This cannot be undone.`,
}) {
    const cols = useMemo(() => normalizeColumns(columns), [columns]);

    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(perPageOptions[0]);
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');

    // ── Default actions, derived from `resource` ──
    const showEdit = resource && actions.edit !== false;
    const showDelete = resource && actions.delete !== false;
    const showStatus = resource && actions.status !== false;
    const hasActionsColumn = showEdit || showDelete || showStatus || !!extraActions;

    const handleDelete = useCallback((row) => {
        if (!confirm(confirmDelete(row))) return;
        router.delete(route(`${resource}.destroy`, row.id), { preserveScroll: true });
    }, [resource, confirmDelete]);


    const handleStatusChange = useCallback((row, value) => {
        router.patch(
            route(`${resource}.status`, row.id),
            { status: value ? 1 : 0 },
            {
                preserveScroll: true,
                showProgress: false,
                onError: () => router.reload(),
            },
        );
    }, [resource]);

    const renderActionsCell = (row) => {
        const items = [
            ...(extraActions ? extraActions(row) : []),
            ...(showEdit ? [{
                icon: Pencil,
                href: route(`${resource}.edit`, row.id),
                title: 'Edit',
                variant: 'edit',
            }] : []),
            ...(showDelete ? [{
                icon: Trash2,
                onClick: () => handleDelete(row),
                title: 'Delete',
                variant: 'danger',
            }] : []),
        ];
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <TableActions actions={items} />
                {showStatus && (
                    <StatusToggle
                        active={row.status === 1 || row.status === true}
                        onChange={(v) => handleStatusChange(row, v)}
                    />
                )}
            </div>
        );
    };

    // ── Filter ──
    const filtered = useMemo(() => {
        if (!search.trim()) return data;
        const q = search.toLowerCase();
        return data.filter(row =>
            cols.some(col => {
                const val = row[col.key];
                return val != null && String(val).toLowerCase().includes(q);
            })
        );
    }, [data, search, cols]);

    // ── Sort ──
    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return [...filtered].sort((a, b) => {
            const av = a[sortKey] ?? '';
            const bv = b[sortKey] ?? '';
            const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
            return sortDir === 'asc' ? cmp : -cmp;
        });
    }, [filtered, sortKey, sortDir]);

    // ── Paginate ──
    const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
    const safePage = Math.min(page, totalPages);
    const paginated = useMemo(() => {
        const start = (safePage - 1) * perPage;
        return sorted.slice(start, start + perPage);
    }, [sorted, safePage, perPage]);

    const handleSort = useCallback((key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
        setPage(1);
    }, [sortKey]);

    const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
    const handlePerPage = (e) => { setPerPage(Number(e.target.value)); setPage(1); };

    const startRow = sorted.length === 0 ? 0 : (safePage - 1) * perPage + 1;
    const endRow = Math.min(safePage * perPage, sorted.length);

    // ── Page numbers ──
    const pageNumbers = useMemo(() => {
        const delta = 1;
        const pages = [];
        for (let i = Math.max(1, safePage - delta); i <= Math.min(totalPages, safePage + delta); i++) {
            pages.push(i);
        }
        return pages;
    }, [safePage, totalPages]);

    const renderCell = (col, row) => {
        if (col.render) return col.render(row);
        const renderer = CELL_TYPES[col.type] ?? CELL_TYPES.text;
        return renderer(row[col.key], row);
    };

    return (
        <div className="admin-table-wrap">
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
                <nav className="admin-breadcrumb">
                    {breadcrumbs.map((crumb, i) => (
                        <span key={i} className="admin-breadcrumb-item">
                            {crumb.href
                                ? <Link href={crumb.href}>{crumb.label}</Link>
                                : <strong>{crumb.label}</strong>
                            }
                            {i < breadcrumbs.length - 1 && <span className="admin-breadcrumb-sep">›</span>}
                        </span>
                    ))}
                </nav>
            )}

            {/* Card */}
            <div className="admin-table-card">
                {/* Toolbar */}
                <div className="admin-table-toolbar">
                    <div className="admin-table-toolbar-left">
                        <label className="per-page-label">
                            Show
                            <select
                                className="per-page-select"
                                value={perPage}
                                onChange={handlePerPage}
                            >
                                {perPageOptions.map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                            entries
                        </label>
                    </div>
                    <div className="admin-table-toolbar-right">
                        <div className="admin-table-search">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={handleSearch}
                                className="admin-table-search-input"
                            />
                        </div>
                        {createRoute && (
                            <Link href={route(createRoute)} className="admin-create-btn">
                                {createLabel}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="admin-table-scroll">
                    <table className="admin-data-table">
                        <thead>
                            <tr>
                                <th className="col-sn">SN</th>
                                {cols.map(col => (
                                    <th
                                        key={col.key}
                                        className={col.sortable ? 'sortable' : ''}
                                        onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                    >
                                        <span className="th-inner">
                                            {col.label}
                                            {col.sortable && (
                                                <SortIcon dir={sortKey === col.key ? sortDir : null} />
                                            )}
                                        </span>
                                    </th>
                                ))}
                                {hasActionsColumn && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length > 0 ? (
                                paginated.map((row, i) => (
                                    <tr key={row.id ?? i} data-id={row.id}>
                                        <td className="col-sn">{startRow + i}</td>
                                        {cols.map(col => (
                                            <td key={col.key} className={col.className ?? ''}>
                                                {renderCell(col, row)}
                                            </td>
                                        ))}
                                        {hasActionsColumn && (
                                            <td>{renderActionsCell(row)}</td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={cols.length + 1 + (hasActionsColumn ? 1 : 0)}
                                        className="admin-table-empty"
                                    >
                                        {search ? `No results for "${search}"` : 'No records found'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer: info + pagination */}
                <div className="admin-table-footer">
                    <div className="admin-table-info">
                        {sorted.length > 0
                            ? `Showing ${startRow}–${endRow} of ${sorted.length} entries${search ? ` (filtered from ${data.length} total)` : ''}`
                            : 'No entries to show'
                        }
                    </div>
                    {totalPages > 1 && (
                        <div className="admin-pagination">
                            <button
                                className="page-btn"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                aria-label="Previous"
                            >
                                <ChevronLeft />
                            </button>
                            {safePage > 2 && (
                                <>
                                    <button className="page-btn" onClick={() => setPage(1)}>1</button>
                                    {safePage > 3 && <span className="page-ellipsis">…</span>}
                                </>
                            )}
                            {pageNumbers.map(n => (
                                <button
                                    key={n}
                                    className={`page-btn${n === safePage ? ' page-btn--active' : ''}`}
                                    onClick={() => setPage(n)}
                                >
                                    {n}
                                </button>
                            ))}
                            {safePage < totalPages - 1 && (
                                <>
                                    {safePage < totalPages - 2 && <span className="page-ellipsis">…</span>}
                                    <button className="page-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
                                </>
                            )}
                            <button
                                className="page-btn"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={safePage === totalPages}
                                aria-label="Next"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
