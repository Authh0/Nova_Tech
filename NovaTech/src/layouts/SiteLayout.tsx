import { useState } from 'react';
import { ArrowRight, Menu, X, MapPin, Leaf, Instagram, Linkedin, ShieldCheck } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BrandMark, Button, Modal } from '../components/ui';

const nav = [['Como funciona', '/como-funciona'], ['Pontos de coleta', '/app/pontos-de-coleta'], ['Empresas', '/empresas'], ['Escolas', '/escolas'], ['Impacto', '/impacto'], ['Equipe', '/equipe']];
export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState<'Privacidade' | 'Termos de uso' | null>(null);
  const location = useLocation();
  return <div className="site-shell">
    <header className="site-header"><div className="site-nav wrap"><BrandMark />
      <nav className={`site-links ${open ? 'site-links-open' : ''}`} aria-label="Navegação principal">
        {nav.map(([label, path]) => <Link key={path} to={path} className={location.pathname === path ? 'nav-current' : ''} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="mobile-signin" to="/login" onClick={() => setOpen(false)}>Entrar na plataforma</Link>
      </nav>
      <div className="nav-actions"><Link to="/login" className="nav-login">Entrar</Link><Button to="/cadastro" size="sm">Começar agora <ArrowRight size={15} /></Button></div>
      <button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
    </div></header>
    <main><Outlet /></main>
    <footer className="site-footer"><div className="wrap footer-main"><div className="footer-brand-col"><BrandMark light /><p>Conectamos pessoas, organizações e destinos corretos para os eletrônicos que já cumpriram seu primeiro ciclo.</p><div className="footer-social" aria-label="Canais sociais não configurados"><span aria-label="Instagram demonstrativo"><Instagram size={17} /></span><span aria-label="LinkedIn demonstrativo"><Linkedin size={17} /></span></div><small className="footer-social-note">Canais oficiais não informados para esta demonstração.</small></div>
      <div className="footer-col"><h3>Explore</h3><Link to="/sobre">Sobre a NovaTech</Link><Link to="/como-funciona">Como funciona</Link><Link to="/equipe">Nossa equipe</Link><Link to="/impacto">Impacto ambiental</Link></div>
      <div className="footer-col"><h3>Para organizações</h3><Link to="/empresas">Empresas</Link><Link to="/escolas">Escolas</Link><Link to="/app/campanhas">Campanhas</Link><Link to="/app/pontos-de-coleta">Pontos de coleta</Link></div>
      <div className="footer-contact"><div className="footer-orbit"><Leaf size={25} /></div><strong>O próximo ciclo começa com você.</strong><span>Plataforma demonstrativa — Tech & Arte SENAI</span><Button to="/cadastro" variant="outline" size="sm">Fazer parte <ArrowRight size={14} /></Button></div>
    </div><div className="footer-bottom wrap"><span>© 2026 NovaTech · Projeto Tech & Arte SENAI</span><span className="footer-demo"><MapPin size={13} />Dados demonstrativos · Grande São Paulo</span><div><button type="button" className="legal-footer-link" onClick={() => setLegalOpen('Privacidade')}>Privacidade</button><button type="button" className="legal-footer-link" onClick={() => setLegalOpen('Termos de uso')}>Termos de uso</button></div></div></footer>
    <Modal open={!!legalOpen} title={legalOpen ?? ''} onClose={() => setLegalOpen(null)}><div className="legal-modal-copy">{legalOpen === 'Privacidade' ? <><p>Esta é uma demonstração educacional. Os dados fictícios, agendamentos, preferências, campanhas, pontos e perfil digitado ficam no armazenamento local deste navegador e não são enviados a um servidor NovaTech.</p><p>O botão de localização solicita acesso apenas depois de acionado e usa coordenadas temporariamente para recalcular distâncias indicativas; elas não são salvas. O login não é autenticação real nem deve receber senhas usadas em outros serviços.</p></> : <><p>Endereços, pontos, campanhas, indicadores, EcoPoints, recompensas e contatos nesta experiência são ilustrativos. Não representam oferta, parceria, serviço de coleta, recompensa comercial ou destinação confirmada.</p><p>Não use este protótipo para descarte real. Confirme instruções e locais com operadores habilitados; estimativas e relatórios não são medições científicas ou certificadas.</p></>}<div className="inline-demo-note"><ShieldCheck size={14} />Modo demonstrativo local — sem sincronização nem serviços externos.</div><Button onClick={() => setLegalOpen(null)}>Entendi</Button></div></Modal>
  </div>;
}
