import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

// ── Icons ────────────────────────────────────────────────────────────────

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

// Hamburger / X icon — animates between the two states
const HamburgerIcon = ({ open }) => (
    <svg
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        viewBox="0 0 24 24"
        style={{ width: 22, height: 22, transition: 'transform 0.2s ease' }}
    >
        {open ? (
            // X
            <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </>
        ) : (
            // Hamburger
            <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
            </>
        )}
    </svg>
);

// ── Component ────────────────────────────────────────────────────────────

export default function AdminNavbar({ title = 'Dashboard', onHamburgerClick, sidebarOpen }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
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
            <div className="navbar-left">
                {/* Hamburger — only visible on mobile */}
                <button
                    className="hamburger-btn"
                    onClick={onHamburgerClick}
                    aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={sidebarOpen}
                >
                    <HamburgerIcon open={sidebarOpen} />
                </button>

                <h1 className="navbar-title">{title}</h1>
            </div>

            {/* Right-side actions */}
            <div className="navbar-actions">
                {/* Bell */}
                <button className="navbar-icon-btn" title="Notifications">
                    <BellIcon />
                </button>

                {/* User dropdown */}
                <div className="navbar-dropdown-wrap" ref={dropdownRef}>
                    <button
                        className="navbar-user-btn"
                        onClick={() => setDropdownOpen((v) => !v)}
                        title="Account"
                    >
                        {/* Avatar */}
                        <div className="navbar-user-avatar">
                            <PersonIcon />
                            <span className="navbar-online-dot" />
                        </div>
                        <span className="navbar-user-name">
                            {user?.name ?? 'Admin'}
                        </span>
                        <ChevronDownIcon />
                    </button>

                    {dropdownOpen && (
                        <div className="navbar-dropdown">
                            <div className="navbar-dropdown-header">
                                <div className="navbar-dropdown-name">{user?.name}</div>
                                <div className="navbar-dropdown-email">{user?.email}</div>
                            </div>
                            <Link href={safeHref('profile.edit')} onClick={() => setDropdownOpen(false)}>
                                Profile
                            </Link>
                            <div className="navbar-dropdown-divider" />
                            <Link
                                href={safeHref('logout')}
                                method="post"
                                as="button"
                                onClick={() => setDropdownOpen(false)}
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
