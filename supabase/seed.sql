-- Dados iniciais (os mesmos do site em desenvolvimento). Idempotente.

insert into public.settings (key, value) values
  ('site', '{"tvCristalEmbedUrl":null,"streamUrl":"https://sonicpanel.oficialserver.com/8200/stream"}'::jsonb),
  ('contact', '{"phone":"(63) 98150-0935","whatsapp":"5563981500935","email":"comercial@hitsfmto.com.br","hours":"Segunda a sexta, das 8h às 18h"}'::jsonb),
  ('social', '{"instagram":null,"facebook":null}'::jsonb),
  ('apps', '{"android":null,"ios":null}'::jsonb)
on conflict (key) do nothing;

insert into public.hosts (slug, name, bio, sort_order) values
  ('xandao', 'Xandão', 'Nilson Bittar, apresentador do Padrão Sertanejo e do Modão da Hits.', 0),
  ('naty-batista', 'Naty Batista', 'Apresentadora do Manhã da Hits, das 8h às 12h.', 1),
  ('guido-aldobanne', 'Guido Aldobanne', 'Locutor desde 1995, com passagem pelas principais rádios do Tocantins, Goiás e Distrito Federal.', 2),
  ('leo-vieira', 'Léo Vieira', 'Apresenta o Show da Hits de segunda a sexta, às 16h.', 3)
on conflict (slug) do nothing;

insert into public.programs (slug, name, description) values
  ('redacao-1', 'Direto da Redação – 1ª edição', ''),
  ('redacao-2', 'Direto da Redação – 2ª edição', ''),
  ('go-back', 'Go Back', ''),
  ('live-hits', 'Live Hits', ''),
  ('via-brasil', 'Via Brasil', ''),
  ('night-hits', 'Night Hits', ''),
  ('rock-hits', 'Rock Hits', ''),
  ('especiais', 'Especiais da Hits', ''),
  ('80-por-hora', '80 por Hora', '')
on conflict (slug) do nothing;

-- A grade só é semeada se ainda estiver vazia.
insert into public.schedule_slots (program_id, day, start_time, end_time)
select p.id, v.day, v.start_time::time, v.end_time::time from (values
  ('redacao-1', 1, '07:00', '08:00'),
  ('go-back', 1, '08:00', '10:00'),
  ('live-hits', 1, '12:00', '13:00'),
  ('via-brasil', 1, '13:00', '14:00'),
  ('redacao-2', 1, '18:00', '19:00'),
  ('night-hits', 1, '19:00', '24:00'),
  ('redacao-1', 2, '07:00', '08:00'),
  ('go-back', 2, '08:00', '10:00'),
  ('live-hits', 2, '12:00', '13:00'),
  ('via-brasil', 2, '13:00', '14:00'),
  ('redacao-2', 2, '18:00', '19:00'),
  ('night-hits', 2, '19:00', '24:00'),
  ('redacao-1', 3, '07:00', '08:00'),
  ('go-back', 3, '08:00', '10:00'),
  ('live-hits', 3, '12:00', '13:00'),
  ('via-brasil', 3, '13:00', '14:00'),
  ('redacao-2', 3, '18:00', '19:00'),
  ('night-hits', 3, '19:00', '24:00'),
  ('redacao-1', 4, '07:00', '08:00'),
  ('go-back', 4, '08:00', '10:00'),
  ('live-hits', 4, '12:00', '13:00'),
  ('via-brasil', 4, '13:00', '14:00'),
  ('redacao-2', 4, '18:00', '19:00'),
  ('night-hits', 4, '19:00', '24:00'),
  ('redacao-1', 5, '07:00', '08:00'),
  ('go-back', 5, '08:00', '10:00'),
  ('live-hits', 5, '12:00', '13:00'),
  ('via-brasil', 5, '13:00', '14:00'),
  ('redacao-2', 5, '18:00', '19:00'),
  ('night-hits', 5, '19:00', '24:00'),
  ('go-back', 6, '08:00', '10:00'),
  ('via-brasil', 6, '13:00', '14:00'),
  ('rock-hits', 6, '14:00', '15:00'),
  ('especiais', 6, '17:00', '18:00'),
  ('night-hits', 6, '19:00', '21:00'),
  ('80-por-hora', 6, '22:00', '24:00'),
  ('via-brasil', 0, '13:00', '14:00'),
  ('especiais', 0, '17:00', '18:00')
) as v (program_slug, day, start_time, end_time)
join public.programs p on p.slug = v.program_slug
where not exists (select 1 from public.schedule_slots);

-- Notícias de exemplo; somem quando a importação do site antigo rodar.
insert into public.news (slug, title, excerpt, content_html, category, status, published_at) values
  ('concurso-saude-tocantins', 'Concurso da Saúde do Tocantins com salários de até R$ 17,7 mil encerra inscrições nesta quinta', 'Candidatos ainda podem se inscrever pelo site da banca organizadora.', '<p>Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.</p><p>A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.</p><p>No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.</p>', 'Tocantins', 'published', '2026-10-02T10:00:00-03:00'),
  ('acidente-aviao-zona-rural', 'Empresário goiano morre em acidente de avião de pequeno porte na zona rural do Tocantins', 'A aeronave caiu logo após a decolagem, segundo a polícia.', '<p>Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.</p><p>A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.</p><p>No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.</p>', 'Tocantins', 'published', '2026-10-01T15:30:00-03:00'),
  ('colisao-to-373', 'Colisão entre caminhonete e caminhão deixa homem morto na TO-373, em Araguaçu', 'O acidente aconteceu no início da manhã.', '<p>Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.</p><p>A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.</p><p>No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.</p>', 'Trânsito', 'published', '2026-10-01T09:10:00-03:00'),
  ('laudo-familia-aguarda', 'Família aguarda há mais de quatro meses por laudo de identificação no TO', 'Parentes cobram resposta do Instituto Médico Legal.', '<p>Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.</p><p>A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.</p><p>No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.</p>', 'Tocantins', 'published', '2026-09-30T18:00:00-03:00'),
  ('motorista-eletrocutado', 'Motorista tenta retirar fiação presa a carro em cegonha e morre eletrocutado no TO', 'A concessionária de energia foi acionada.', '<p>Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.</p><p>A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.</p><p>No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.</p>', 'Tocantins', 'published', '2026-09-30T11:00:00-03:00'),
  ('palmas-agenda-cultural', 'Palmas tem agenda cultural movimentada neste fim de semana', 'Shows, feiras e atividades gratuitas na capital.', '<p>Este é um texto de exemplo para mostrar como a notícia aparece no novo site da Hits FM. O conteúdo real será importado do site atual.</p><p>A página de notícia usa letras grandes e espaçamento confortável para facilitar a leitura no celular e no computador, com botão para compartilhar no WhatsApp.</p><p>No fim de cada notícia aparecem outras da mesma categoria, para o ouvinte continuar lendo.</p>', 'Palmas', 'published', '2026-09-29T08:00:00-03:00')
on conflict (slug) do nothing;

insert into public.promotions (slug, title, summary, how_to, rules, ends_at, published) values
  ('promocao-da-hits', 'Promoção da Hits', 'Ouça a Hits FM 93.5, participe e concorra a prêmios.', array['Siga a Hits FM no Instagram.', 'Fique ligado na programação: a palavra-chave é anunciada ao vivo.', 'Mande a palavra-chave pelo WhatsApp da rádio com seu nome e bairro.']::text[], array['Promoção válida para maiores de 18 anos residentes em Palmas – TO.', 'O ganhador será anunciado ao vivo e contatado pelo WhatsApp.', 'Regulamento completo disponível na rádio.']::text[], '2026-12-20T23:59:00-03:00', true),
  ('dia-das-maes-hits', 'Dia das Mães Hits', 'Homenagem às mães ouvintes da Hits, com prêmios especiais.', array['Envie uma mensagem para sua mãe pelo WhatsApp da rádio.']::text[], array['Promoção encerrada.']::text[], '2026-05-10T23:59:00-03:00', true)
on conflict (slug) do nothing;
