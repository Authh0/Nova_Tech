import { useState, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Sparkles, UserRound, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandMark, Button, DemoBadge, Modal } from '../components/ui';
import { useStore } from '../store';
import type { UserRole } from '../data';

const roles: { value: UserRole; label: string }[] = [
  { value: 'citizen', label: 'Pessoa física' }, { value: 'company', label: 'Empresa' }, { value: 'school', label: 'Escola' },
  { value: 'collector', label: 'Ponto de coleta' }, { value: 'admin', label: 'Administração · demonstração' },
];
const signInSchema = z.object({ email: z.string().email('Informe um e-mail válido.'), password: z.string().min(6, 'Use pelo menos 6 caracteres.'), role: z.enum(['citizen', 'company', 'school', 'collector', 'admin']), keep: z.boolean().optional() });
type SignInValues = z.infer<typeof signInSchema>;
const signUpSchema = z.object({ name: z.string().min(2, 'Informe seu nome.'), email: z.string().email('Informe um e-mail válido.'), password: z.string().min(8, 'Use pelo menos 8 caracteres.'), confirm: z.string(), role: z.enum(['citizen', 'company', 'school', 'collector']), consent: z.boolean().refine(value => value, 'Confirme que entende o modo demonstrativo.') }).refine(data => data.password === data.confirm, { message: 'As senhas não coincidem.', path: ['confirm'] });
type SignUpValues = z.infer<typeof signUpSchema>;

function AuthFrame({ children, title, text, eyebrow }: { children: ReactNode; title: string; text: string; eyebrow: string }) {
  return <div className="auth-page"><div className="auth-left"><div className="auth-top"><BrandMark /><Link to="/" className="back-home"><ArrowLeft size={14} /> Voltar ao site</Link></div><div className="auth-content"><div className="auth-kicker"><Sparkles size={14} />{eyebrow}</div><h1>{title}</h1><p>{text}</p>{children}<div className="auth-disclaimer"><LockKeyhole size={15} /><span><strong>Ambiente demonstrativo.</strong> O acesso não é autenticação real e os dados ficam apenas neste navegador.</span></div></div><div className="auth-foot">© NovaTech · Tech & Arte SENAI</div></div><aside className="auth-right"><div className="auth-art-wrap"><div className="auth-art-circle" /><div className="auth-art-orbit auth-orbit-one" /><div className="auth-art-orbit auth-orbit-two" /><div className="auth-art-device"><span className="auth-device-top" /><div className="auth-device-screen"><RecycleLogo /></div><span className="auth-device-bottom" /></div><div className="auth-art-chip chip-one"><LeafMini />+1 novo ciclo</div><div className="auth-art-chip chip-two"><Sparkles size={14} /> EcoPoints <strong>+ 120</strong></div></div><div className="auth-right-copy"><DemoBadge /><h2>Pequenas escolhas.<br /><em>Novos ciclos.</em></h2><p>Uma experiência para conectar o descarte correto a um futuro mais circular.</p></div></aside></div>;
}
function RecycleLogo() { return <svg viewBox="0 0 48 48" width="45" height="45" aria-hidden="true"><path d="m21 8 4-6 5 9h-4l-2 3m11 3h8l-6 10-2-4-4-.5m-13 10-4 7-5-9h5l2-3m-4-14-7-1 6-9 2 4 4 .5m5 7 5 9-10-.2m-8-2 11-1" fill="none" stroke="#f97316" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function LeafMini() { return <span className="leaf-mini">✳</span>; }

export function LoginPage() {
  const [show, setShow] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInValues>({ resolver: zodResolver(signInSchema), defaultValues: { email: 'ana@novatech.demo', password: 'novatech2026', role: 'citizen', keep: true } });
  const onSubmit = (data: SignInValues) => {
    const emailName = data.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
    const fallback: Record<UserRole, string> = { citizen: 'Ana Clara Martins', company: 'Equipe NovaTech', school: 'Escola Horizonte', collector: 'Ponto parceiro', admin: 'Admin NovaTech' };
    login(data.email, emailName.trim() || fallback[data.role], data.role, data.keep ?? false);
    navigate('/app');
  };
  const demoLogin = () => { login('ana@novatech.demo', 'Ana Clara Martins', 'citizen', true); navigate('/app'); };
  return <AuthFrame eyebrow="Sua jornada sustentável" title="Bom ter você por aqui." text="Acesse sua jornada, acompanhe seus descartes e descubra os próximos passos." >
    <DemoBadge className="auth-form-badge" />
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className="form-label">E-mail<div className="input-wrap"><Mail size={16} /><input type="email" placeholder="voce@exemplo.com" autoComplete="email" {...register('email')} /></div>{errors.email && <small className="field-error">{errors.email.message}</small>}</label>
      <label className="form-label">Senha<div className="input-wrap"><LockKeyhole size={16} /><input type={show ? 'text' : 'password'} placeholder="Mínimo de 6 caracteres" autoComplete="current-password" {...register('password')} /><button type="button" className="input-trailing" onClick={() => setShow(v => !v)} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>{errors.password && <small className="field-error">{errors.password.message}</small>}</label>
      <div className="form-inline"><label className="check-label"><input type="checkbox" {...register('keep')} /><span>Manter conectado neste navegador</span></label><button type="button" className="text-button" onClick={() => setForgotOpen(true)}>Esqueci minha senha</button></div>
      <label className="form-label">Acessar como<div className="select-wrap"><select {...register('role')}>{roles.map(role => <option key={role.value} value={role.value}>{role.label}</option>)}</select><span>⌄</span></div></label>
      <Button type="submit" size="lg" className="auth-submit" disabled={isSubmitting}>Entrar <ArrowRight size={16} /></Button>
      <div className="auth-separator"><span />ou<span /></div>
      <Button variant="secondary" size="lg" className="auth-submit" onClick={demoLogin}><Sparkles size={15} /> Acessar demonstração</Button>
    </form>
    <div className="auth-switch">Ainda não tem uma conta? <Link to="/cadastro">Criar conta <ArrowRight size={14} /></Link></div>
    <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} title="Recuperar acesso"><div className="guide-modal"><div className="guide-icon"><Mail size={22} /></div><p>Este protótipo não envia e-mails nem realiza redefinição real de senha. A opção serve apenas como demonstração visual do fluxo.</p><Button onClick={() => setForgotOpen(false)}>Entendi</Button></div></Modal>
  </AuthFrame>;
}

export function RegisterPage() {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema), defaultValues: { name: '', email: '', password: '', confirm: '', role: 'citizen', consent: false } });
  const { register: createUser } = useStore();
  const navigate = useNavigate();
  const submit = (data: SignUpValues) => { createUser(data.name, data.email, data.role); navigate('/app'); };
  return <AuthFrame eyebrow="Faça parte da transformação" title="Sua próxima escolha começa aqui." text="Crie seu acesso demonstrativo e acompanhe seu impacto em um só lugar.">
    <DemoBadge className="auth-form-badge" />
    <form className="auth-form" onSubmit={handleSubmit(submit)} noValidate>
      <label className="form-label">Nome completo<div className="input-wrap"><UserRound size={16} /><input placeholder="Como podemos chamar você?" autoComplete="name" {...register('name')} /></div>{errors.name && <small className="field-error">{errors.name.message}</small>}</label>
      <label className="form-label">E-mail<div className="input-wrap"><Mail size={16} /><input type="email" placeholder="voce@exemplo.com" autoComplete="email" {...register('email')} /></div>{errors.email && <small className="field-error">{errors.email.message}</small>}</label>
      <label className="form-label">Tipo de usuário<div className="select-wrap"><select {...register('role')}>{roles.filter(r => r.value !== 'admin').map(role => <option key={role.value} value={role.value}>{role.label}</option>)}</select><span>⌄</span></div>{errors.role && <small className="field-error">Selecione um perfil.</small>}</label>
      <div className="form-two-col"><label className="form-label">Senha<div className="input-wrap"><LockKeyhole size={16} /><input type={show ? 'text' : 'password'} placeholder="8 caracteres ou mais" {...register('password')} /><button className="input-trailing" type="button" onClick={() => setShow(v => !v)} aria-label="Mostrar/ocultar senha">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>{errors.password && <small className="field-error">{errors.password.message}</small>}</label><label className="form-label">Confirmar<div className="input-wrap"><LockKeyhole size={16} /><input type={show ? 'text' : 'password'} placeholder="Repita a senha" {...register('confirm')} /></div>{errors.confirm && <small className="field-error">{errors.confirm.message}</small>}</label></div>
      <label className="check-label terms-check"><input type="checkbox" {...register('consent')} /><span>Entendo que esta é uma demonstração local e meus dados não serão enviados a um servidor.</span></label>{errors.consent && <small className="field-error">{errors.consent.message}</small>}
      <Button type="submit" size="lg" className="auth-submit">Criar conta <ArrowRight size={16} /></Button>
    </form>
    <div className="auth-switch">Já tem acesso? <Link to="/login">Entrar <ArrowRight size={14} /></Link></div>
  </AuthFrame>;
}
