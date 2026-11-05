import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ArrowLeft, Leaf, Search } from 'lucide-react';
import SiteLayout from './layouts/SiteLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { useStore } from './store';
import { Button } from './components/ui';

const Landing = lazy(() => import('./pages/Landing').then(module => ({ default: module.Landing })));
const InformationPage = lazy(() => import('./pages/Information'));
const LoginPage = lazy(() => import('./pages/Auth').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/Auth').then(module => ({ default: module.RegisterPage })));
const DashboardHome = lazy(() => import('./pages/DashboardHome'));
const Operations = () => import('./pages/Operations');
const PointsPage = lazy(() => Operations().then(module => ({ default: module.PointsPage })));
const PointDetailPage = lazy(() => Operations().then(module => ({ default: module.PointDetailPage })));
const AppointmentsPage = lazy(() => Operations().then(module => ({ default: module.AppointmentsPage })));
const NewAppointmentPage = lazy(() => Operations().then(module => ({ default: module.NewAppointmentPage })));
const AppointmentDetailPage = lazy(() => Operations().then(module => ({ default: module.AppointmentDetailPage })));
const RewardsPage = lazy(() => Operations().then(module => ({ default: module.RewardsPage })));
const ImpactPage = lazy(() => Operations().then(module => ({ default: module.ImpactPage })));
const CampaignsPage = lazy(() => Operations().then(module => ({ default: module.CampaignsPage })));
const NotificationsPage = lazy(() => Operations().then(module => ({ default: module.NotificationsPage })));
const OrganizationPage = lazy(() => Operations().then(module => ({ default: module.OrganizationPage })));
const ProfilePage = lazy(() => Operations().then(module => ({ default: module.ProfilePage })));
const AdminPage = lazy(() => import('./pages/Admin'));

function AdminGate() {
  const { state } = useStore();
  if (!state.user) return <Navigate to="/login" replace />;
  return state.user.role === 'admin' ? <Outlet /> : <AdminPage />;
}
function NotFound() {
  return <div className="not-found"><span><Search size={24} /></span><p>404 · página não encontrada</p><h1>Este caminho ainda não existe.</h1><Button to="/">Voltar ao início <ArrowLeft size={14} /></Button><Leaf className="not-found-leaf" size={150} /></div>;
}
function RouteLoading() {
  return <div className="route-loading" role="status" aria-live="polite"><span className="loading-mark"><Leaf size={17} /></span><strong>Preparando sua jornada NovaTech…</strong></div>;
}
export default function App() {
  return <Suspense fallback={<RouteLoading />}><Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<Landing />} />
      <Route path="sobre" element={<InformationPage />} />
      <Route path="como-funciona" element={<InformationPage />} />
      <Route path="empresas" element={<InformationPage />} />
      <Route path="escolas" element={<InformationPage />} />
      <Route path="impacto" element={<InformationPage />} />
      <Route path="equipe" element={<InformationPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="cadastro" element={<RegisterPage />} />
    </Route>
    <Route path="app" element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="pontos-de-coleta" element={<PointsPage />} />
      <Route path="pontos-de-coleta/:id" element={<PointDetailPage />} />
      <Route path="agendamentos" element={<AppointmentsPage />} />
      <Route path="agendamentos/novo" element={<NewAppointmentPage />} />
      <Route path="agendamentos/:id" element={<AppointmentDetailPage />} />
      <Route path="recompensas" element={<RewardsPage />} />
      <Route path="impacto" element={<ImpactPage />} />
      <Route path="campanhas" element={<CampaignsPage />} />
      <Route path="perfil" element={<ProfilePage />} />
      <Route path="notificacoes" element={<NotificationsPage />} />
      <Route path="empresa" element={<OrganizationPage kind="company" />} />
      <Route path="escola" element={<OrganizationPage kind="school" />} />
      <Route element={<AdminGate />}><Route path="admin" element={<AdminPage />} /></Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes></Suspense>;
}
