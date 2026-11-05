# TODO — NovaTech

## 1. Identidade visual e navegação responsiva — Concluído
- Criar marca NovaTech original, em versões horizontal e compacta, utilizável no site, dashboard, favicon e cards; incorporar circuito/folha/reciclagem sem copiar marcas existentes.
- Aplicar identidade premium, moderna, minimalista, tecnológica e sustentável, com laranja NovaTech como cor principal para descarte/ações, verde de apoio para resultado ambiental e azul moderado para informação tecnológica; fundos neutros, contraste acessível, consistência de tokens e foco visível.
- Implementar componentes consistentes para botões, inputs, cards, badges, modais, dropdowns, tabs, tooltips, toasts, progress bars, tabelas, gráficos, menus e navegação.
- Implementar interações e animações discretas, hover e feedback de estado, respeitando preferência de redução de movimento.
- Garantir uso em desktop, notebook, tablet e smartphone, com header/menu mobile no site e navegação adaptável no painel.

## 2. Site institucional e landing page — Parcial
> Identidade, páginas, interações e conteúdo demonstrativo entregues. Os canais sociais e contatos oficiais ficaram não configurados porque o prompt não forneceu dados reais; o footer os identifica como ausentes em vez de inventá-los.
- Implementar rotas `/`, `/sobre`, `/como-funciona`, `/empresas`, `/escolas`, `/impacto`, `/equipe`, `/login` e `/cadastro`, com navegação consistente.
- A página inicial terá header com logotipo e links Início, Como funciona, Pontos de coleta, Empresas, Escolas, Impacto, Equipe, Entrar e Começar agora; responsividade, hover, menu mobile, sticky header e transições.
- A seção hero exibirá o título “Seu eletrônico antigo pode transformar o futuro.”, o subtítulo “Descubra onde descartar, agende coletas e acompanhe o impacto positivo das suas escolhas. A sustentabilidade começa com uma decisão inteligente.” e botões “Encontrar ponto de coleta” e “Explorar a plataforma”, com elementos tecnológicos/sustentáveis e ilustração original.
- Exibir indicadores demonstrativos de kg destinados, dispositivos descartados, participantes, pontos de coleta e CO₂ equivalente estimado, identificando dados fictícios quando necessário.
- Incluir seções de problema (“Um problema invisível. Um impacto enorme.”), solução (“Uma solução inteligente para um futuro sustentável.”), descarte inteligente, coleta simplificada, recompensas, impacto, fluxo em três etapas, equipamentos, empresas, escolas, impacto, recompensas, equipe, CTA final e footer com logotipo, descrição, links, contato, redes sociais, equipe, política de privacidade, termos e copyright.
- O CTA final usará “Faça parte da transformação.”, o texto “Conecte-se à sustentabilidade e transforme o destino dos seus eletrônicos.” e botões “Criar minha conta” e “Encontrar pontos de coleta”.
- Cada card de equipamento — smartphones, notebooks, computadores, tablets, monitores, cabos, carregadores, teclados, mouses, impressoras, pilhas e baterias — terá ícone, nome, descrição e modal educativo ao clicar.
- Incluir páginas institucionais de sobre/como funciona/empresas/escolas/impacto/equipe e linkagem funcional entre elas.

## 3. Equipe e apresentação institucional — Concluído
- Criar seção “Nossa Equipe” e rota `/equipe` com título “Por trás da transformação, uma equipe.”, o subtítulo “Conheça os integrantes que estão construindo uma solução tecnológica para um futuro mais sustentável.”, descrição do projeto, objetivo e contexto do desafio Tech & Arte SENAI.
- Apresentar oito cards individuais com nome completo, espaço para foto, avatar por iniciais e efeito hover; não inventar cargos, funções, especialidades, formação, experiência ou fotografias reais.
- Usar exatamente estes nomes: Pedro Sales; Mauro Filho Lima Noleto; Kauã Guilherme Laurentino Brito; Isaac Ramos Rodrigues Monteiro; João Antonio Nozue Bueno; Luca Bernardo Kemper Garcia; Julio Keven Silva Melo; Matheus Henrique Dos Santos Sousa Ferraz.

## 4. Login, cadastro e persistência demonstrativa — Concluído
- Implementar login com e-mail e senha, mostrar senha, “Esqueci minha senha”, “Manter conectado”, “Entrar”, “Criar conta” e “Acessar demonstração”.
- Implementar cadastro com nome, e-mail, senha, confirmação e tipo de usuário: Pessoa física, Empresa, Escola ou Ponto de coleta; validar campos e direcionar para dashboard após entrar.
- Informar claramente que autenticação e persistência são demonstrativas, locais no navegador e sem sincronização entre dispositivos; não simular Supabase nem autenticação segura real.
- Persistir alterações demonstrativas em `localStorage`, com dados iniciais coerentes e serviços independentes da interface.

## 5. Plataforma operacional e dashboard — Concluído
- Implementar rotas `/app`, `/app/pontos-de-coleta`, `/app/pontos-de-coleta/:id`, `/app/agendamentos`, `/app/agendamentos/novo`, `/app/agendamentos/:id`, `/app/recompensas`, `/app/impacto`, `/app/campanhas`, `/app/perfil`, `/app/notificacoes`, `/app/empresa`, `/app/escola` e `/app/admin`, com layout operacional separado do institucional.
- A sidebar terá Visão geral, Pontos de coleta, Agendamentos, Recompensas, Impacto ambiental, Campanhas e Perfil; no rodapé, Configurações, Ajuda, Avatar, Nome e Sair.
- O header terá breadcrumb, título, busca, notificações, avatar e menu do usuário.
- O dashboard terá “Olá, [Nome]! Vamos gerar impacto hoje?”, “Acompanhe sua jornada sustentável.”, indicadores de resíduos destinados, dispositivos, EcoPoints e impacto estimado; gráficos de evolução mensal, resíduos por categoria, atividade e participação; atividade recente; próximo agendamento com data/horário/protocolo/equipamentos/status; meta com progresso/recompensa/próxima conquista.
- Utilizar Recharts nos gráficos e dados demonstrativos coerentes.

## 6. Pontos de coleta e mapa — Concluído
- A página terá o título “Encontre o destino certo para seus eletrônicos.”, barra de pesquisa, filtros, mapa, lista, cards e detalhes.
- Incorporar o mapa público original do GDF pelo Google My Maps, preservando interatividade de zoom, pan e marcadores do mapa oficial, link para abrir a fonte e aviso de cobertura no Distrito Federal; explicitar que a lista fictícia de Grande São Paulo é uma demonstração independente e não sincroniza com os marcadores oficiais.
- Pesquisar por nome, bairro, cidade, CEP ou tipo de material.
- Filtrar por tipo de estabelecimento, materiais aceitos, distância, disponibilidade e atendimento.
- Cada card exibirá nome, categoria, endereço, horário, materiais, status, detalhes e como chegar.
- Detalhes completos incluirão informações, endereço, mapa, horários, contato, materiais aceitos, orientações e acessibilidade.
- Cadastrar pelo menos oito pontos fictícios geograficamente coerentes, claramente identificados como demonstrativos.

## 7. Agendamentos de coleta — Concluído
- Implementar fluxo em seis etapas: (1) adicionar vários equipamentos com tipo, quantidade, estado, observação e peso estimado opcional; (2) escolher entrega em ponto ou coleta no endereço; (3) informar CEP, rua, número, complemento, bairro, cidade e estado quando aplicável; (4) escolher data/calendário e horário disponível com validação; (5) revisar resumo; (6) confirmar e gerar protocolo, status, resumo e histórico.
- Permitir consultar, cancelar, acompanhar, filtrar e visualizar histórico.
- Estados: Solicitado, Confirmado, Em coleta, Concluído e Cancelado.
- Não conceder pontos antes da validação do descarte.

## 8. EcoPoints e recompensas — Concluído
- Exibir saldo, histórico, nível, conquistas e próxima meta.
- Níveis: Iniciante Verde, Explorador Sustentável, Guardião Ambiental, EcoHero e Lenda da Sustentabilidade.
- Conquistas: Primeiro descarte, 10 dispositivos, 10 kg destinados, Participação em campanha e Diversidade de materiais.
- Catálogo de recompensas com nome, descrição, custo, categoria, disponibilidade e ação de resgate.
- Resgate deve validar saldo, pedir confirmação, deduzir pontos, registrar operação e gerar comprovante.
- Mostrar rankings individual e institucional com posição, nome, avatar, pontos e nível.

## 9. Impacto ambiental, relatórios e transparência — Concluído
- Criar página “Seu impacto vai muito além do descarte.” com resíduos destinados, dispositivos, CO₂ equivalente estimado, campanhas e participações.
- Incluir gráficos de evolução mensal, categorias, contribuições, metas e comparações; filtros 7 dias, 30 dias, 90 dias e 12 meses.
- Histórico com data, equipamento, quantidade, peso, destinação e status; progresso de metas e próximas conquistas.
- Diferenciar dados reais, estimados e demonstrativos; não apresentar estimativas como medições científicas oficiais.

## 10. Áreas de empresas e escolas — Parcial
> Existem dashboards por perfil e gestão local de campanhas, mas ainda faltam formulários completos de cadastro institucional (incluindo CNPJ, responsável e endereço), relatórios/exportações próprios e emissão de certificados escolares.
- Empresas: cadastro demonstrativo com nome, CNPJ, e-mail, telefone, endereço, responsável e logo; dashboard de resíduos, dispositivos, campanhas, participantes, metas e impacto; criar, editar, consultar, encerrar e acompanhar campanhas; relatórios com indicadores, gráficos, histórico, resultados e exportação demonstrativa.
- Escolas: dashboard de resíduos, participantes, turmas, campanhas, metas e ranking; criar campanhas, arrecadar eletrônicos, acompanhar resultados, comparar turmas, visualizar indicadores e gerar certificados demonstrativos.
- Desafios escolares: turma mais sustentável, maior arrecadação, participação coletiva e diversidade de equipamentos.
- Não expor dados pessoais de estudantes em rankings.

## 11. Painel administrativo e validação — Concluído
- Criar painel com indicadores de usuários, empresas, escolas, pontos, agendamentos, campanhas, resíduos e recompensas.
- Oferecer gerenciamento demonstrativo de usuários, pontos de coleta, agendamentos, campanhas, recompensas e registros ambientais.
- Permitir validar descartes com protocolo, equipamentos, quantidade, peso, destinação, observação e status.
- Somente registros validados geram recompensas e contabilização ambiental definitiva.
- A interface deve identificar claramente dados e ações demonstrativos; administração não deve ser apresentada como segurança de produção.

## 12. Notificações, perfil e educação ambiental — Parcial
> Notificações, edição básica do perfil, guia por equipamento, EcoScore com critérios divulgados e mapa demonstrativo foram implementados. Permanecem pendentes as preferências/endereço editáveis do perfil e uma biblioteca separada de artigos, curiosidades e certificados.
- Notificações: agendamento confirmado, coleta concluída, EcoPoints recebidos, recompensa resgatada, campanha iniciada, meta alcançada e conquista desbloqueada; badge, lista, data, status, marcar como lida e marcar todas.
- Perfil com nome, e-mail, avatar, tipo, cidade e data de cadastro; configurações para editar perfil, endereços, notificações, privacidade, preferências e sair.
- Guia de inteligência de descarte permite escolher equipamento e consultar preparação, cuidados, onde descartar, orientações, riscos e informações.
- Área educativa com artigos, guias, curiosidades, dicas, economia circular e sustentabilidade.
- Campanhas comunitárias de escolas, empresas, comunidades e instituições.
- EcoScore baseado em contribuições validadas, com critérios de cálculo visíveis; mapa de impacto com pontos, campanhas, regiões e participação.

## 13. Manifesto de rotas, execução e entrega — Concluído
- Servir `GET /manus-routes.json` com a lista completa de rotas de página, incluindo padrões dinâmicos e títulos; sincronizar quando rotas mudarem.
- Configurar diagnósticos TypeScript antes do primeiro lote de código e resolver diagnósticos acionáveis.
- Usar variáveis/serviços locais para demonstração, sem credenciais falsas; manter a interface utilizável em tamanhos de tela definidos.
- Confirmar funcionamento do servidor de Preview e do manifesto de rotas antes da entrega; não habilitar publicação automática.
