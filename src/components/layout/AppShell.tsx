import { Bell, ChevronRight, Menu, MoreHorizontal, PanelLeftClose } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers';

export type Role = 'parent' | 'admin' | 'teacher';

interface NavItem { id: string; label: string; icon: LucideIcon; }

interface AppShellProps {
  children: React.ReactNode;
  nav: NavItem[];
  active: string;
  onNavChange: (id: string) => void;
  title: string;
  subtitle: string;
  role: Role;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onSwitchRole?: () => void;
  onHome?: () => void;
}

const roleLabels: Record<Role, { name: string; initials: string; workspace: string }> = {
  parent: { name: 'Sarah Johnson', initials: 'SJ', workspace: 'Parent account' },
  admin: { name: 'Therese', initials: 'TH', workspace: 'Admin workspace' },
  teacher: { name: 'Jessica Taylor', initials: 'JT', workspace: 'Teacher portal' },
};

export function AppShell({ children, nav, active, onNavChange, title, subtitle, role, menuOpen, onMenuToggle, onSwitchRole, onHome }: AppShellProps) {
  const { name, initials, workspace } = roleLabels[role];
  return (
    <div className={`app-shell ${role}-app`}>
      <aside className={menuOpen ? 'open' : ''} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="side-brand">
          <div className="brand brand-compact">
            <img src="/assets/image.png" alt="Fairybread & Fractions" />
            <div><strong>fairybread</strong><span>& fractions</span></div>
          </div>
          <button onClick={onMenuToggle}><PanelLeftClose size={18} /></button>
        </div>
        <div className="side-profile">
          <div className="profile-avatar">{initials}</div>
          <div><strong>{name}</strong><span>{workspace}</span></div>
          <MoreHorizontal size={17} />
        </div>
        <nav className="side-nav" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => { onNavChange(id); if (menuOpen) onMenuToggle(); }}>
              <Icon size={18} /><span>{label}</span>
              {id.endsWith('/messages') && <i className="nav-dot" />}
            </button>
          ))}
        </nav>
      </aside>
      <div className="app-content">
        <header className="app-header">
          <button className="mobile-menu" onClick={onMenuToggle}><Menu size={22} /></button>
          <div>
            <div className="breadcrumb">
              {role === 'parent' ? 'Parent portal' : role === 'admin' ? 'Admin workspace' : 'Teacher portal'}
              <ChevronRight size={13} /> {title}
            </div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={18} /><i /></button>
            <div className="header-avatar">{initials}</div>
          </div>
        </header>
        <main className="app-main">{children}</main>
      </div>
      <DemoBar active={role} />
    </div>
  );
}

function DemoBar({ active }: { active: Role }) {
  const navigate = useNavigate();
  const { familyId, setFamilyId } = useAuth();

  const portals: { label: string; path: string; role: Role | 'home' }[] = [
    { label: 'Website', path: '/', role: 'home' },
    { label: 'Parent', path: '/parent', role: 'parent' },
    { label: 'Admin', path: '/admin', role: 'admin' },
    { label: 'Teacher', path: '/teacher', role: 'teacher' },
  ];

  // Demo families — one per gating state so every state is testable
  const families: { label: string; id: string; desc: string }[] = [
    { label: 'f1', id: 'f1', desc: 'Active term, 3 credits' },
    { label: 'f2', id: 'f2', desc: 'Active term, 0 credits' },
    { label: 'f3', id: 'f3', desc: 'Term expired' },
    { label: 'f4', id: 'f4', desc: 'No term ever' },
  ];

  const btnBase: React.CSSProperties = {
    border: 'none', color: '#fff', borderRadius: 999,
    padding: '5px 12px', fontSize: 12, cursor: 'pointer',
  };

  return (
    <div style={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 6, background: '#23312f', borderRadius: 999, padding: '7px 14px', zIndex: 9999, boxShadow: '0 4px 24px rgba(0,0,0,.3)', flexWrap: 'wrap', maxWidth: '90vw' }}>
      <span style={{ color: '#75817d', fontSize: 11, marginRight: 2 }}>Portal</span>
      {portals.map(({ label, path, role }) => (
        <button key={path} onClick={() => navigate(path)} style={{ ...btnBase, background: role === active ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.08)', fontWeight: role === active ? 600 : 400 }}>
          {label}
        </button>
      ))}
      <span style={{ color: '#4a5e59', margin: '0 4px' }}>|</span>
      <span style={{ color: '#75817d', fontSize: 11, marginRight: 2 }}>Family</span>
      {families.map(f => (
        <button
          key={f.id}
          onClick={() => setFamilyId(f.id)}
          title={f.desc}
          style={{ ...btnBase, background: familyId === f.id ? 'rgba(68,183,189,.4)' : 'rgba(255,255,255,.08)', fontWeight: familyId === f.id ? 600 : 400 }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
