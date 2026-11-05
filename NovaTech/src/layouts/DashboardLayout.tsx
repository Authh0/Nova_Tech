import { useState } from 'react';
import { ArrowLeft, Bell, Building2, CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardCheck, Coins, Gauge, GraduationCap, Leaf, LogOut, MapPin, Menu, Search, Settings2, ShieldCheck, Sprout, Users, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BrandMark, DemoBadge } from '../components/ui';
import { useStore } from '../store';

const navItems = [
  { label: 'Visão geral', path: '/app', icon: Gauge },
  { label: 'Pontos de coleta', path: '/app/pontos-de-coleta', icon: MapPin },
  { label: 'Agendamentos', path: '/app/agendamentos', icon: CalendarDays },
  { label: 'Recompensas', path: '/app/recompensas', icon: Coins },
  { label: 'Impacto ambiental', path: '/app/impacto', icon: Leaf },
  { label: 'Campanhas', path: '/app/campanhas', icon: Sprout },
  { label: 'Perfil', path: '/app/perfil', icon: Users },
];
const bottomNav = [
  { label: 'Minha empresa', path: '/app/empresa', icon: Building2 },
  { label: 'Minha escola', path: '/app/escola', icon: GraduationCap },
];
const titles: Record<string, string> = { '/app': 'Visão geral', '/app/pontos-de-coleta': 'Pontos de coleta', '/app/agendamentos': 'Agendamentos', '/app/agendamentos/novo': 'Novo agendamento', '/app/recompensas': 'EcoPoints & recompensas', '/app/impacto': 'Impacto ambiental', '/app/campanhas': 'Campanhas', '/app/perfil': 'Meu perfil', '/app/notificacoes': 'Notificações', '/app/empresa': 'Painel da empresa', '/app/escola': 'Painel da escola', '/app/admin': 'Administração demonstrativa' };

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { state, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const user = state.user;
  const pageTitle = location.pathname.includes('/pontos-de-coleta/') ? 'Detalhe do ponto' : location.pathname.includes('/agendamentos/') && !location.pathname.endsWith('/novo') ? 'Detalhe do agendamento' : titles[location.pathname] ?? 'NovaTech';
  const initials = (user?.name ?? 'Visitante').split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase();
  if (!user) return <div className="app-locked"><div className="app-locked-card"><BrandMark /><span className="locked-icon"><ShieldCheck size={25} /></span><h1>Entre para acessar sua jornada.</h1><p>Esta é uma plataforma demonstrativa. Faça o acesso de demonstração para explorar o painel.</p><Link className="button button-primary" to="/login">Entrar na demonstração <ChevronRight size={16} /></Link><Link to="/" className="locked-back"><ArrowLeft size={14} /> Voltar ao site</Link></div></div>;
  const unreadCount = state.notifications.filter(n => !n.read).length;
  return <div className="dashboard-shell">
    <div className={`mobile-sidebar-scrim ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
    <aside className={`dashboard-sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand-row"><BrandMark /><button className="sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Fechar navegação"><X size={18} /></button></div>
      <div className="workspace-switch"><div className="workspace-avatar"><RecycleMini /></div><div><strong>NovaTech</strong><small>Espaço pessoal</small></div><ChevronDown size={14} /></div>
      <div className="sidebar-label">PLATAFORMA</div><nav className="sidebar-nav">{navItems.map(item => { const Icon = item.icon; return <NavLink key={item.path} to={item.path} end={item.path === '/app'} className={({ isActive }) => `side-link ${isActive ? 'side-active' : ''}`} onClick={() => setMobileOpen(false)}><Icon size={17} /><span>{item.label}</span>{item.label === 'Agendamentos' && state.appointments.length > 0 && <small>{state.appointments.filter(a => a.status !== 'Cancelado').length}</small>}</NavLink>; })}</nav>
      <div className="sidebar-label sidebar-label-gap">ORGANIZAÇÕES</div><nav className="sidebar-nav">{bottomNav.map(item => { const Icon = item.icon; return <NavLink key={item.path} to={item.path} className={({ isActive }) => `side-link ${isActive ? 'side-active' : ''}`} onClick={() => setMobileOpen(false)}><Icon size={17} /><span>{item.label}</span></NavLink>; })}{user.role === 'admin' && <NavLink to="/app/admin" className={({ isActive }) => `side-link ${isActive ? 'side-active' : ''}`} onClick={() => setMobileOpen(false)}><ClipboardCheck size={17} /><span>Administração</span><span className="admin-mini">DEMO</span></NavLink>}</nav>
      <div className="sidebar-bottom"><Link to="/app/notificacoes" className="side-link"><Bell size={17} /><span>Notificações</span>{unreadCount > 0 && <b className="unread-count">{unreadCount}</b>}</Link><Link to="/app/perfil" className="side-link"><Settings2 size={17} /><span>Configurações</span></Link><Link to="/como-funciona" className="side-link"><CircleHelp size={17} /><span>Ajuda</span></Link><div className="sidebar-user"><div className="user-avatar">{initials}</div><div className="sidebar-user-text"><strong>{user.name}</strong><small>{user.role === 'admin' ? 'Admin · demonstração' : 'Participante'}</small></div><button aria-label="Sair" className="sidebar-logout" onClick={() => { logout(); navigate('/'); }}><LogOut size={16} /></button></div></div>
    </aside>
    <div className="dashboard-main"><header className="dashboard-topbar"><div className="dashboard-top-left"><button className="mobile-menu top-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir navegação"><Menu size={19} /></button><div className="breadcrumbs"><Link to="/app">NovaTech</Link><ChevronRight size={13} /><span>{pageTitle}</span></div></div><div className="dashboard-top-actions"><label className="top-search"><Search size={15} /><input placeholder="Buscar na plataforma" value={search} onChange={e => setSearch(e.target.value)} aria-label="Buscar na plataforma" /></label><Link className="top-notification" to="/app/notificacoes" aria-label={`Notificações, ${unreadCount} não lidas`}><Bell size={18} />{unreadCount > 0 && <span />}</Link><div className="top-account"><div className="user-avatar small">{initials}</div><span>{user.name.split(' ')[0]}</span><ChevronDown size={13} /></div></div></header>
      <main className="dashboard-content"><div className="page-heading"><div><h1>{pageTitle}</h1><span className="page-heading-sub">Sua jornada sustentável, em um só lugar.</span></div><DemoBadge /></div><Outlet /></main>
    </div>
  </div>;
}
function RecycleMini() { return <span className="workspace-recycle"><Leaf size={17} /></span>; }
