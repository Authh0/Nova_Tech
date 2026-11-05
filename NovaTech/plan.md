# Plano de implementação — NovaTech

## Escopo e arquitetura

Construir o site institucional e a plataforma operacional descritos no anexo, em português brasileiro, como aplicação responsiva com navegação real, interações funcionais e dados demonstrativos. Usar React + TypeScript + Vite, React Router, Lucide React e Recharts; React Hook Form e Zod validam formulários. O mapa oficial GDF fornecido pelo usuário é incorporado via Google My Maps em `src/components/MapPanel.tsx`, com ligação para a fonte original; sua cobertura no DF é identificada como independente da lista fictícia da Grande São Paulo. Tailwind está configurado, mas o design é implementado em CSS modularizado por área. Estrutura efetiva: `src/main.tsx` inicializa a aplicação e providers; `src/App.tsx` declara rotas e lazy loading; `src/components/ui.tsx` e `src/components/MapPanel.tsx` reúnem interface reutilizável e mapa; `src/layouts` separa site institucional e workspace; `src/pages` contém telas; `src/data.ts` mantém tipos e seeds; `src/store.tsx` centraliza regras e persistência local; `src/index.css` e `src/dashboard.css` definem visual e responsividade; `public` contém o manifesto e assets da marca. Não há conexão a backend/Supabase: o usuário aprovou persistência demonstrativa em `localStorage`; as capacidades gerenciadas provisionadas não são usadas pelo aplicativo.

O site institucional terá `/`, `/sobre`, `/como-funciona`, `/empresas`, `/escolas`, `/impacto`, `/equipe`, `/login` e `/cadastro`. A plataforma operacional terá `/app`, `/app/pontos-de-coleta`, `/app/pontos-de-coleta/:id`, `/app/agendamentos`, `/app/agendamentos/novo`, `/app/agendamentos/:id`, `/app/recompensas`, `/app/impacto`, `/app/campanhas`, `/app/perfil`, `/app/notificacoes`, `/app/empresa`, `/app/escola` e `/app/admin`, com layouts distintos.

A landing page apresentará hero, indicadores demonstrativos, problema e solução, fluxo de três etapas, equipamentos com modal educativo, chamadas para empresas/escolas, impacto, recompensas, equipe e footer completo. A equipe exibirá exatamente os oito nomes do anexo por meio de iniciais, sem inventar cargos, especialidades ou fotografias. A demonstração inclui dashboard, pontos, agendamentos, EcoPoints, impacto, campanhas, perfil, notificações, áreas institucionais e painel administrativo. Haverá pelo menos oito pontos fictícios, claramente marcados como demonstrativos, geograficamente coerentes; para o exemplo será usada a região metropolitana de São Paulo. Os fluxos principais permitirão pesquisar/filtrar pontos; navegar e selecionar marcadores; realizar agendamento em etapas com protocolo, status e histórico; cancelar e consultar; resgatar recompensas apenas com saldo suficiente; acompanhar campanhas e impacto; filtrar períodos; marcar notificações como lidas; editar perfil; consultar guia inteligente; e usar as áreas de demonstração para empresas, escolas e administração. Pontos e contabilização ambiental definitiva só serão atribuídos após validação. Estimativas ambientais serão explicitamente estimadas, sem alegação de medição científica. O ranking de escolas não exibirá dados pessoais de estudantes.

## Decisão aprovada: autenticação e persistência demonstrativas

O usuário aprovou a opção 1: demonstração local com `localStorage`. O prompt cita Supabase, mas nenhuma conexão Supabase está configurada; não será feita nem simulada integração com Supabase. Os dados fictícios e operações de demonstração serão salvos no navegador deste dispositivo e não serão sincronizados. A interface identificará explicitamente que o login é demonstrativo e não representa autenticação real; os fluxos de criar/editar/agendar/resgatar/validar são voltados à apresentação e não devem ser descritos como serviços reais.

## Design visual

- **Design Movement:** estética de SaaS editorial contemporâneo combinando precisão de produto digital e economia circular.
- **Princípios:** clareza de ação; hierarquia calma; transparência ambiental; inclusão e acessibilidade.
- **Filosofia de cor:** laranja NovaTech `#F97316` como assinatura visual, ilustração, ícones e marcadores; verde para resultados sustentáveis; azul escuro pontual para tecnologia; neutros para legibilidade. Ações primárias usam `#C2410C` com texto branco e hover `#9A3412`: contraste calculado de 5,18:1 e 7,31:1, respectivamente; texto branco sobre o laranja vivo `#F97316` (2,80:1) é evitado. Tokens adicionais: `#EA580C`, `#FFF7ED`, `#FFEDD5`, verde `#16A34A`, azul `#0F172A`, neutros `#FFFFFF`, `#F8FAFC`, `#E2E8F0`, `#334155`, `#020617`.
- **Layout:** composição editorial assimétrica na landing page, com narrativa alternada e faixas de indicadores; plataforma com sidebar persistente e área de trabalho responsiva para gráficos, listas e tabelas.
- **Elementos de assinatura:** símbolo de circuito/folha; linhas de circuito discretas; badges laranja de descarte e selos verdes para registros validados.
- **Interação:** feedback imediato, confirmação antes de resgates/cancelamentos, rótulos além de cores, foco visível e mensagens compreensíveis.
- **Animação:** transições breves e indicadores suaves; respeitar `prefers-reduced-motion`.
- **Tipografia:** DM Sans para leitura e interface; Manrope para títulos, marca e números, com fallback de sistema.
- **Essência:** tecnologia simples que conecta pessoas a destinos corretos para eletrônicos; personalidade confiável, ativa e colaborativa.
- **Tom:** direto, positivo e educativo. Exemplos: “Seu eletrônico antigo pode transformar o futuro.” e “Encontre um ponto. Faça o descarte certo. Acompanhe o impacto.”
- **Logotipo:** marca vetorial original, símbolo compacto de circuito formando folha/loop e wordmark horizontal NovaTech.
- **Cor de assinatura:** laranja NovaTech `#F97316`; contraste para texto e controles prioriza combinações conformes com WCAG AA e foco visível reforçado.

## Assets e acessibilidade

Usar uma ilustração original gerada para o hero e uma marca vetorial original com favicon. Não usar imagens de pessoas reais para a equipe; usar iniciais. Referências de pesquisa servem somente para orientar o estilo, não serão copiadas como assets. Prever navegação por teclado, rótulos, foco visível, contraste AA para ações, layout responsivo e redução de movimento.

## Fluxo de construção

Com o plano aprovado e a persistência demonstrativa decidida, decompor requisitos no `TODO.md`, registrar diagnósticos TypeScript, instalar/configurar dependências, escrever manifesto estático completo de rotas antes de iniciar o servidor, implementar as páginas/componentes e fluxos descritos, iniciar Preview quando houver interface significativa e corrigir defeitos observados. Não habilitar publicação automática. Checkpoints seguirão o fluxo normal do projeto.
