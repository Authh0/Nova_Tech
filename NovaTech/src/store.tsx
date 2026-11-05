import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { initialCampaigns, type Appointment, type Campaign, type DemoNotification, type DemoUser, type EnvironmentalRecord, type EquipmentItem, type PointTransaction, type UserRole } from './data';

type AppState = {
  user: DemoUser | null;
  rememberUser: boolean;
  appointments: Appointment[];
  notifications: DemoNotification[];
  campaigns: Campaign[];
  participatingCampaignIds: string[];
  records: EnvironmentalRecord[];
  pointBalance: number;
  pointHistory: PointTransaction[];
};
type StoreApi = {
  state: AppState;
  login: (email: string, name: string, role: UserRole, remember?: boolean) => void;
  register: (name: string, email: string, role: UserRole) => void;
  logout: () => void;
  updateProfile: (data: Partial<DemoUser>) => void;
  createAppointment: (data: { date: string; time: string; mode: Appointment['mode']; pointId?: string; address?: string; equipment: EquipmentItem[] }) => string;
  cancelAppointment: (id: string) => void;
  redeem: (cost: number, rewardName: string) => string | false;
  markRead: (id: string) => void;
  markAllRead: () => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'status' | 'collected' | 'participants'>) => void;
  toggleCampaignParticipation: (id: string) => void;
  updateCampaign: (id: string, data: Partial<Pick<Campaign, 'name' | 'organizer' | 'type' | 'endDate' | 'goal' | 'description'>>) => void;
  closeCampaign: (id: string) => void;
  validateAppointment: (id: string, details?: { weight: number; destination: string; note: string }) => void;
};
const STORAGE_KEY = 'ecotech-demo-v1';
const today = new Date().toISOString().slice(0, 10);
const demoAppointment: Appointment = {
  id: 'a-demo-01', protocol: 'ET-2026-0831', date: '2026-11-12', time: '10:30', mode: 'Entrega em ponto', pointId: 'p1',
  equipment: [{ id: 'eq-1', kind: 'Smartphone', quantity: 2, condition: 'Em funcionamento', weight: 0.8, note: '' }, { id: 'eq-2', kind: 'Carregadores', quantity: 1, condition: 'Usado', weight: 0.3, note: '' }],
  status: 'Confirmado', createdAt: today, estimatedWeight: 1.1,
};
const seedState: AppState = {
  user: null,
  rememberUser: false,
  appointments: [demoAppointment],
  notifications: [
    { id: 'n1', title: 'Agendamento confirmado', detail: 'Seu horário no EcoPonto Pinheiros está confirmado para 12 de novembro.', date: 'Hoje, 09:42', read: false, icon: 'calendar' },
    { id: 'n2', title: 'Nova campanha na sua região', detail: 'Mutirão Conecta está recebendo eletrônicos até 30 de novembro.', date: 'Ontem, 16:18', read: false, icon: 'megaphone' },
    { id: 'n3', title: 'Meta quase alcançada', detail: 'Faltam 320 pontos para chegar à próxima conquista.', date: '2 dias atrás', read: true, icon: 'trophy' },
  ],
  campaigns: initialCampaigns,
  participatingCampaignIds: [],
  records: [
    { id: 'h1', date: '2026-10-22', equipment: 'Notebook', quantity: 1, weight: 2.4, destination: 'EcoPonto Pinheiros', status: 'Validado' },
    { id: 'h2', date: '2026-09-14', equipment: 'Smartphone', quantity: 2, weight: 0.8, destination: 'Hub Sustentável Paulista', status: 'Validado' },
    { id: 'h3', date: '2026-08-03', equipment: 'Cabos e carregadores', quantity: 4, weight: 1.2, destination: 'Estação Circular Vila Madalena', status: 'Validado' },
  ],
  pointBalance: 680,
  pointHistory: [
    { id: 'pt1', date: '2026-10-22', description: 'Descarte validado', detail: 'Notebook · EcoPonto Pinheiros', amount: 240, balance: 680, kind: 'credit' },
    { id: 'pt2', date: '2026-09-14', description: 'Descarte validado', detail: 'Smartphone · Hub Sustentável Paulista', amount: 160, balance: 440, kind: 'credit' },
    { id: 'pt3', date: '2026-08-03', description: 'Descarte validado', detail: 'Cabos e carregadores · Estação Circular', amount: 280, balance: 280, kind: 'credit' },
  ],
};
function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) { const parsed = JSON.parse(raw) as Partial<AppState>; return { ...seedState, ...parsed, rememberUser: parsed.rememberUser ?? false } as AppState; }
  } catch { /* storage may be unavailable; use in-memory seed */ }
  return seedState;
}
const StoreContext = createContext<StoreApi | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, user: state.rememberUser ? state.user : null })); } catch { /* demo remains usable in memory */ }
  }, [state]);
  const api = useMemo<StoreApi>(() => ({
    state,
    login: (email, name, role, remember = false) => setState(s => ({ ...s, rememberUser: remember, user: { name, email, role, city: 'São Paulo, SP', points: s.pointBalance, joinedAt: 'Novembro de 2026' } })),
    register: (name, email, role) => setState(s => ({ ...s, rememberUser: true, user: { name, email, role, city: 'São Paulo, SP', points: s.pointBalance, joinedAt: 'Novembro de 2026' } })),
    logout: () => setState(s => ({ ...s, user: null, rememberUser: false })),
    updateProfile: data => setState(s => ({ ...s, user: s.user ? { ...s.user, ...data } : null })),
    createAppointment: data => {
      const id = `a-${Date.now()}`;
      const protocol = `ET-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      const estimatedWeight = data.equipment.reduce((sum, item) => sum + item.weight * item.quantity, 0);
      const appointment: Appointment = { ...data, id, protocol, status: 'Solicitado', createdAt: new Date().toISOString().slice(0, 10), estimatedWeight };
      setState(s => ({ ...s, appointments: [appointment, ...s.appointments], notifications: [{ id: `n-${id}`, title: 'Agendamento solicitado', detail: `Protocolo ${protocol} criado. A confirmação será atualizada nesta demonstração.`, date: 'Agora', read: false, icon: 'calendar' }, ...s.notifications] }));
      return id;
    },
    cancelAppointment: id => setState(s => ({ ...s, appointments: s.appointments.map(a => a.id === id && a.status !== 'Concluído' ? { ...a, status: 'Cancelado' } : a) })),
    redeem: (cost, rewardName) => {
      if (state.pointBalance < cost) return false;
      const receiptCode = `EC-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
      setState(s => {
        if (s.pointBalance < cost) return s;
        const pointBalance = s.pointBalance - cost;
        const transaction: PointTransaction = { id: receiptCode, date: new Date().toISOString().slice(0, 10), description: 'Resgate demonstrativo', detail: `${rewardName} · comprovante ${receiptCode}`, amount: -cost, balance: pointBalance, kind: 'debit' };
        return { ...s, pointBalance, user: s.user ? { ...s.user, points: pointBalance } : null, pointHistory: [transaction, ...s.pointHistory], notifications: [{ id: `n-${Date.now()}`, title: 'Resgate demonstrativo registrado', detail: `${rewardName} foi resgatado. Comprovante local: ${receiptCode}.`, date: 'Agora', read: false, icon: 'gift' }, ...s.notifications] };
      });
      return receiptCode;
    },
    markRead: id => setState(s => ({ ...s, notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
    markAllRead: () => setState(s => ({ ...s, notifications: s.notifications.map(n => ({ ...n, read: true })) })),
    createCampaign: data => setState(s => ({ ...s, campaigns: [{ ...data, id: `c-${Date.now()}`, collected: '0 kg', participants: 0, status: 'Em andamento' }, ...s.campaigns] })),
    toggleCampaignParticipation: id => setState(s => {
      const campaign = s.campaigns.find(item => item.id === id);
      if (!campaign || campaign.status !== 'Em andamento') return s;
      const alreadyJoined = s.participatingCampaignIds.includes(id);
      return { ...s, participatingCampaignIds: alreadyJoined ? s.participatingCampaignIds.filter(item => item !== id) : [...s.participatingCampaignIds, id], campaigns: s.campaigns.map(item => item.id === id ? { ...item, participants: Math.max(0, item.participants + (alreadyJoined ? -1 : 1)) } : item), notifications: [{ id: `n-camp-${Date.now()}`, title: alreadyJoined ? 'Participação atualizada' : 'Você entrou na campanha', detail: alreadyJoined ? `Sua participação em ${campaign.name} foi removida nesta demonstração.` : `Sua participação em ${campaign.name} foi registrada localmente.`, date: 'Agora', read: false, icon: 'megaphone' }, ...s.notifications] };
    }),
    updateCampaign: (id, data) => setState(s => ({ ...s, campaigns: s.campaigns.map(campaign => campaign.id === id ? { ...campaign, ...data } : campaign) })),
    closeCampaign: id => setState(s => ({ ...s, campaigns: s.campaigns.map(campaign => campaign.id === id && campaign.status === 'Em andamento' ? { ...campaign, status: 'Encerrada' } : campaign) })),
    validateAppointment: (id, details) => setState(s => {
      const target = s.appointments.find(a => a.id === id);
      if (!target || target.status === 'Concluído' || target.status === 'Cancelado') return s;
      const receivedWeight = details?.weight ?? target.estimatedWeight;
      const destination = details?.destination.trim() || 'Destinação demonstrativa validada';
      const note = details?.note.trim() || '';
      const earned = Math.round(receivedWeight * 25);
      const pointBalance = s.pointBalance + earned;
      const transaction: PointTransaction = { id: `pt-${id}`, date: today, description: 'Descarte validado', detail: `${target.equipment.map(e => e.kind).join(', ')} · ${destination}`, amount: earned, balance: pointBalance, kind: 'credit' };
      return {
        ...s,
        pointBalance,
        pointHistory: [transaction, ...s.pointHistory],
        user: s.user ? { ...s.user, points: pointBalance } : null,
        appointments: s.appointments.map(a => a.id === id ? { ...a, status: 'Concluído' } : a),
        records: [{ id: `h-${id}`, date: today, equipment: target.equipment.map(e => e.kind).join(', '), quantity: target.equipment.reduce((n, e) => n + e.quantity, 0), weight: receivedWeight, destination, status: 'Validado', note }, ...s.records],
        notifications: [{ id: `n-${id}`, title: 'Descarte validado', detail: `${earned} EcoPoints demonstrativos foram adicionados após validação.`, date: 'Agora', read: false, icon: 'trophy' }, ...s.notifications],
      };
    }),
  }), [state]);
  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}
export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore deve ser usado dentro de StoreProvider.');
  return value;
}
