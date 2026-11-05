export type UserRole = 'citizen' | 'company' | 'school' | 'collector' | 'admin';
export type DemoUser = { name: string; email: string; role: UserRole; city: string; points: number; joinedAt: string };
export type CollectionPoint = {
  id: string; name: string; category: string; address: string; neighborhood: string; city: string;
  hours: string; cep: string; materials: string[]; availability: string; distance: number; lat: number; lng: number;
  phone: string; access: string; note: string;
};
export type EquipmentItem = { id: string; kind: string; quantity: number; condition: string; weight: number; note: string };
export type Appointment = {
  id: string; protocol: string; date: string; time: string; mode: 'Entrega em ponto' | 'Coleta no endereço';
  pointId?: string; address?: string; equipment: EquipmentItem[]; status: 'Solicitado' | 'Confirmado' | 'Em coleta' | 'Concluído' | 'Cancelado';
  createdAt: string; estimatedWeight: number;
};
export type DemoNotification = { id: string; title: string; detail: string; date: string; read: boolean; icon: string };
export type Campaign = { id: string; name: string; organizer: string; type: string; endDate: string; collected: string; goal: string; participants: number; status: string; description: string };
export type EnvironmentalRecord = { id: string; date: string; equipment: string; quantity: number; weight: number; destination: string; status: string; note?: string };
export type PointTransaction = { id: string; date: string; description: string; detail: string; amount: number; balance: number; kind: 'credit' | 'debit' };

export const collectionPoints: CollectionPoint[] = [
  { id: 'p1', name: 'EcoPonto Pinheiros', category: 'Ponto de coleta parceiro', address: 'Rua dos Pinheiros, 870', neighborhood: 'Pinheiros', city: 'São Paulo', cep: '00000-001', hours: 'Seg–Sáb, 9h–18h', materials: ['Celulares', 'Cabos', 'Pilhas', 'Baterias'], availability: 'Aberto hoje', distance: 1.2, lat: -23.5628, lng: -46.6887, phone: '(11) 3000-1042', access: 'Entrada sem degraus; atendimento acessível.', note: 'Recebimento gratuito. Apague seus dados antes da entrega.' },
  { id: 'p2', name: 'Estação Circular Vila Madalena', category: 'Cooperativa', address: 'Rua Harmonia, 410', neighborhood: 'Vila Madalena', city: 'São Paulo', cep: '00000-001', hours: 'Seg–Sex, 8h–17h', materials: ['Computadores', 'Monitores', 'Impressoras', 'Cabos'], availability: 'Aberto hoje', distance: 2.4, lat: -23.5547, lng: -46.6913, phone: '(11) 3000-1088', access: 'Acesso térreo e área coberta para carga.', note: 'Para equipamentos maiores, consulte a equipe antes de levar.' },
  { id: 'p3', name: 'Hub Sustentável Paulista', category: 'Loja parceira', address: 'Avenida Paulista, 1578', neighborhood: 'Bela Vista', city: 'São Paulo', cep: '00000-001', hours: 'Todos os dias, 10h–20h', materials: ['Celulares', 'Tablets', 'Carregadores', 'Pilhas'], availability: 'Aberto hoje', distance: 4.1, lat: -23.5614, lng: -46.6559, phone: '(11) 3000-1104', access: 'Elevadores e sinalização acessível.', note: 'Ponto de entrega rápida no piso térreo.' },
  { id: 'p4', name: 'Coleta Consciente Lapa', category: 'Ponto municipal', address: 'Rua Guaicurus, 1200', neighborhood: 'Lapa', city: 'São Paulo', cep: '00000-001', hours: 'Seg–Sex, 8h–16h', materials: ['Eletrodomésticos pequenos', 'Cabos', 'Baterias', 'Monitores'], availability: 'Fecha às 16h', distance: 6.8, lat: -23.5215, lng: -46.7012, phone: '(11) 3000-1167', access: 'Rampa de acesso; estacionamento próximo.', note: 'Não recebe lâmpadas nem resíduos hospitalares.' },
  { id: 'p5', name: 'Ponto Verde Moema', category: 'Ponto de coleta parceiro', address: 'Alameda dos Maracatins, 820', neighborhood: 'Moema', city: 'São Paulo', cep: '00000-001', hours: 'Seg–Sáb, 9h–19h', materials: ['Notebooks', 'Celulares', 'Tablets', 'Cabos'], availability: 'Aberto hoje', distance: 7.3, lat: -23.6042, lng: -46.6658, phone: '(11) 3000-1210', access: 'Acesso nivelado e atendimento prioritário.', note: 'Faça backup e remova cartões de memória antes do descarte.' },
  { id: 'p6', name: 'Cooperativa Recomeço ABC', category: 'Cooperativa', address: 'Rua das Figueiras, 1450', neighborhood: 'Jardim', city: 'Santo André', cep: '00000-006', hours: 'Seg–Sex, 8h–17h', materials: ['Computadores', 'Impressoras', 'Teclados', 'Monitores'], availability: 'Aberto hoje', distance: 12.8, lat: -23.6502, lng: -46.5379, phone: '(11) 3000-1264', access: 'Pátio amplo e acesso em nível.', note: 'Recebimento de lotes escolares e empresariais mediante agendamento.' },
  { id: 'p7', name: 'Ecoponto Centro de Osasco', category: 'Ponto municipal', address: 'Avenida dos Autonomistas, 3200', neighborhood: 'Centro', city: 'Osasco', cep: '00000-007', hours: 'Ter–Dom, 8h–17h', materials: ['Celulares', 'Baterias', 'Pilhas', 'Cabos'], availability: 'Aberto hoje', distance: 14.6, lat: -23.5328, lng: -46.7917, phone: '(11) 3000-1338', access: 'Acesso por rampa e área de espera coberta.', note: 'Solicite comprovante demonstrativo de entrega no balcão.' },
  { id: 'p8', name: 'Centro de Reuso Guarulhos', category: 'Centro de triagem', address: 'Rua Sete de Setembro, 95', neighborhood: 'Centro', city: 'Guarulhos', cep: '00000-008', hours: 'Seg–Sex, 8h30–16h30', materials: ['Computadores', 'Notebooks', 'Monitores', 'Impressoras'], availability: 'Aberto hoje', distance: 16.2, lat: -23.4628, lng: -46.5333, phone: '(11) 3000-1421', access: 'Acesso térreo; solicitar apoio para itens pesados.', note: 'Os locais e contatos desta plataforma são fictícios para demonstração.' },
];

export const equipmentCatalog = [
  { name: 'Smartphones', detail: 'Celulares, mesmo sem funcionamento.', icon: 'smartphone', care: 'Faça backup, saia das contas e restaure as configurações de fábrica. Remova chip e cartão de memória.' },
  { name: 'Notebooks', detail: 'Portáteis, fontes e periféricos.', icon: 'laptop', care: 'Faça backup dos arquivos e apague os dados. Leve carregador separado e avise se a bateria estiver estufada.' },
  { name: 'Computadores', detail: 'Gabinetes, placas e periféricos.', icon: 'monitor', care: 'Desconecte cabos e acessórios. Não desmonte fontes ou componentes sem orientação especializada.' },
  { name: 'Tablets', detail: 'Tablets e leitores digitais.', icon: 'tablet', care: 'Apague seus dados, remova acessórios e não descarte baterias soltas no lixo comum.' },
  { name: 'Monitores', detail: 'Telas, displays e televisores pequenos.', icon: 'tv', care: 'Transporte com proteção para evitar quebra. Confirme antes se o ponto aceita telas grandes.' },
  { name: 'Cabos', detail: 'Cabos USB, energia e conectores.', icon: 'cable', care: 'Agrupe os cabos sem nós apertados. Eles podem ser separados e encaminhados para recuperação de materiais.' },
  { name: 'Carregadores', detail: 'Fontes, adaptadores e carregadores.', icon: 'plug', care: 'Separe carregadores danificados e não deixe fios expostos; evite contato com líquidos.' },
  { name: 'Teclados', detail: 'Teclados, mouses e periféricos.', icon: 'keyboard', care: 'Agrupe periféricos e acessórios. Verifique se o ponto aceita itens sem o equipamento principal.' },
  { name: 'Impressoras', detail: 'Impressoras e acessórios eletrônicos.', icon: 'printer', care: 'Retire papel e consulte o ponto sobre cartuchos e toners, que podem exigir destinação própria.' },
  { name: 'Pilhas', detail: 'Pilhas domésticas usadas.', icon: 'battery', care: 'Armazene secas em recipiente fechado. Não misture com resíduos orgânicos nem queime.' },
  { name: 'Baterias', detail: 'Baterias recarregáveis e de eletrônicos.', icon: 'battery-charging', care: 'Isole terminais expostos com fita. Não transporte bateria estufada ou aquecida; procure orientação do fabricante.' },
  { name: 'Mouses', detail: 'Mouses, trackpads e periféricos de apontamento.', icon: 'mouse', care: 'Separe pilhas removíveis e cabos. Apague pareamentos ou dados associados quando houver memória interna.' },
];

export const rewards = [
  { id: 'r1', name: 'Cupom de mobilidade', description: 'Crédito demonstrativo para uma viagem mais sustentável.', cost: 250, category: 'Mobilidade', available: true },
  { id: 'r2', name: 'Kit de cultivo urbano', description: 'Um pequeno incentivo para cultivar novas possibilidades.', cost: 420, category: 'Bem-estar', available: true },
  { id: 'r3', name: 'Ecobag reutilizável', description: 'Sacola resistente para reduzir o uso de descartáveis.', cost: 180, category: 'Dia a dia', available: true },
  { id: 'r4', name: 'Oficina de reparo', description: 'Vaga demonstrativa em uma oficina de extensão da vida útil.', cost: 560, category: 'Aprendizado', available: true },
];

export const initialCampaigns: Campaign[] = [
  { id: 'c1', name: 'Mutirão Conecta', organizer: 'Comunidade Pinheiros', type: 'Comunidade', endDate: '2026-11-30', collected: '148 kg', goal: '200 kg', participants: 86, status: 'Em andamento', description: 'Junte-se ao mutirão comunitário para dar o destino certo aos equipamentos.' },
  { id: 'c2', name: 'Escola Circular', organizer: 'Escola Horizonte', type: 'Escola', endDate: '2026-12-12', collected: '92 kg', goal: '120 kg', participants: 124, status: 'Em andamento', description: 'Uma jornada coletiva para aprender sobre reuso e descarte correto.' },
  { id: 'c3', name: 'Tecnologia que Retorna', organizer: 'Coletivo Tech SP', type: 'Empresa', endDate: '2026-12-20', collected: '318 kg', goal: '500 kg', participants: 205, status: 'Em andamento', description: 'Empresas e pessoas conectadas por uma cadeia de destinação transparente.' },
];

export const team = ['Pedro Sales', 'Mauro Filho Lima Noleto', 'Kauã Guilherme Laurentino Brito', 'Isaac Ramos Rodrigues Monteiro', 'João Antonio Nozue Bueno', 'Luca Bernardo Kemper Garcia', 'Julio Keven Silva Melo', 'Matheus Henrique Dos Santos Sousa Ferraz'];

export const monthlyImpact = [
  { month: 'Mai', kg: 18, devices: 6 }, { month: 'Jun', kg: 24, devices: 9 }, { month: 'Jul', kg: 21, devices: 8 },
  { month: 'Ago', kg: 36, devices: 13 }, { month: 'Set', kg: 32, devices: 11 }, { month: 'Out', kg: 47, devices: 17 },
];
export const categoryImpact = [
  { name: 'Informática', value: 42, color: '#F97316' }, { name: 'Celulares', value: 24, color: '#FDBA74' },
  { name: 'Cabos', value: 18, color: '#16A34A' }, { name: 'Pilhas e baterias', value: 16, color: '#2563EB' },
];

export const levelNames = ['Iniciante Verde', 'Explorador Sustentável', 'Guardião Ambiental', 'EcoHero', 'Lenda da Sustentabilidade'];
