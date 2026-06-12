import { Link } from '@inertiajs/react';

/**
 * Breadcrumb — admin breadcrumb trail.
 *
 * Usage:
 *   <Breadcrumb
 *       items={[
 *           { label: 'Dashboard', href: route('admin.dashboard') },
 *           { label: 'Our Blogs', href: route('admin.blogs.index') },
 *           { label: 'Create Blog' },   // no href → current page (bold)
 *       ]}
 *   />
 *
 * The last item (or any item without `href`) renders as bold plain text.
 * Items with `href` render as Inertia links (SPA navigation, no full reload).
 */
export default function Breadcrumb({ items = [] }) {
    if (items.length === 0) return null;

    return (
        <nav className="admin-breadcrumb" aria-label="Breadcrumb">
            {items.map((item, i) => {
                const isLast = i === items.length - 1;

                return (
                    <span key={i} className="admin-breadcrumb-item">
                        {item.href && !isLast ? (
                            <Link href={item.href}>{item.label}</Link>
                        ) : (
                            <strong>{item.label}</strong>
                        )}
                        {!isLast && <span className="admin-breadcrumb-sep">›</span>}
                    </span>
                );
            })}
        </nav>
    );
}
