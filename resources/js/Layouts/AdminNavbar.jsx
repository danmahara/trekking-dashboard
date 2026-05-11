import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const BellIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        style={{ width: 18, height: 18, color: '#64748b' }}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        style={{ width: 14, height: 14, color: '#94a3b8' }}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const PersonIcon = () => (
    <svg fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24"
        style={{ width: 18, height: 18 }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default function AdminNavbar({ title = 'Dashboard' }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const safeHref = (routeName) => {
        try { return route(routeName); }
        catch { return '#'; }
    };

    return (
        <header className="admin-navbar">
            {/* Page title */}
            <h1 className="navbar-title">{title}</h1>

            {/* Right-side actions */}
            <div className="navbar-actions">
                {/* Bell */}
                <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 6 }}
                    title="Notifications"
                >
                    <BellIcon />
                </button>

                {/* User dropdown */}
                <div className="navbar-dropdown-wrap" ref={dropdownRef}>
                    <button
                        className="navbar-avatar-btn"
                        onClick={() => setOpen((v) => !v)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, width: 'auto', padding: '0 6px 0 0', borderRadius: 999, background: 'none', border: '1px solid #e2e8f0' }}
                        title="Account"
                    >
                        {/* Avatar circle */}
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, position: 'relative',
                        }}>
                            <PersonIcon />
                            {/* Online dot */}
                            <span style={{
                                position: 'absolute', bottom: 0, right: 0,
                                width: 8, height: 8, borderRadius: '50%',
                                background: '#22c55e', border: '2px solid white',
                            }} />
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 2 }}>
                            {user?.name ?? 'Admin'}
                        </span>
                        <ChevronDownIcon />
                    </button>

                    {open && (
                        <div className="navbar-dropdown">
                            <div style={{ padding: '10px 16px 8px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#0f172a' }}>{user?.name}</div>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 1 }}>{user?.email}</div>
                            </div>
                            <Link href={safeHref('profile.edit')} onClick={() => setOpen(false)}>
                                Profile
                            </Link>
                            <div className="navbar-dropdown-divider" />
                            <Link
                                href={safeHref('logout')}
                                method="post"
                                as="button"
                                onClick={() => setOpen(false)}
                            >
                                Log Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
