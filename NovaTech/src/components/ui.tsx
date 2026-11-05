import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BrandMark({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="NovaTech — início">
    <svg className="brand-symbol" viewBox="0 0 40 40" role="img" aria-label="Símbolo NovaTech">
      <rect x="1.5" y="1.5" width="37" height="37" rx="13" fill="#F97316" />
      <path d="M11.8 21.1c0-6.3 5.1-11.1 12.8-11.7-.2 7.3-3.5 12-9.1 12.8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M13.7 28.5c4.6-6.7 9.1-10.1 15-12.3M21.5 27.9h8v-6.4" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="29.5" cy="15.5" r="2" fill="#FFEDD5" />
    </svg>
    {!compact && <span className="brand-word">Nova<span>Tech</span></span>}
  </Link>;
}

export function DemoBadge({ className = '' }: { className?: string }) {
  return <span className={`demo-badge ${className}`}><span className="demo-dot" /> Ambiente demonstrativo</span>;
}

export function Button({ children, to, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled = false }: {
  children: ReactNode; to?: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg'; className?: string; type?: 'button' | 'submit' | 'reset'; disabled?: boolean;
}) {
  const classes = `button button-${variant} button-${size} ${className}`.trim();
  if (to) return <Link to={to} className={classes}>{children}</Link>;
  return <button className={classes} type={type} onClick={onClick} disabled={disabled}>{children}</button>;
}

export function Eyebrow({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return <div className="eyebrow">{icon}<span>{children}</span></div>;
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: { eyebrow?: string; title: string; subtitle?: string; align?: 'left' | 'center' }) {
  return <div className={`section-title section-title-${align}`}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}

export function MetricCard({ label, value, delta, icon, tone = 'orange', note }: { label: string; value: string; delta?: string; icon: ReactNode; tone?: 'orange' | 'green' | 'blue' | 'dark'; note?: string }) {
  return <article className={`metric-card metric-${tone}`}><div className="metric-top"><span className="metric-icon">{icon}</span>{delta && <span className="metric-delta"><ArrowUpRight size={13} />{delta}</span>}</div><div className="metric-value">{value}</div><div className="metric-label">{label}</div>{note && <div className="metric-note">{note}</div>}</article>;
}

export function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'orange' | 'blue' | 'red' }) {
  return <span className={`status-pill status-${tone}`}><span className="status-dot" />{children}</span>;
}

export function Modal({ open, title, onClose, children, width = 'md' }: { open: boolean; title: string; onClose: () => void; children: ReactNode; width?: 'md' | 'lg' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className={`modal-card modal-${width}`} role="dialog" aria-modal="true" aria-label={title}>
      <header className="modal-header"><div><div className="eyebrow">NovaTech</div><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={19} /></button></header>
      <div className="modal-content">{children}</div>
    </section>
  </div>;
}

export function SuccessLine({ children }: { children: ReactNode }) { return <div className="success-line"><Check size={15} />{children}</div>; }
