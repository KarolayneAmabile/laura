// worker.js — Laura (@wujubong) · cegs de k-pop
// Routes:
//   /            → página (aba "profile" por padrão, aba "rules" via #regras)
//   /avatar.png  → avatar (art: @Mitynix on tumblr)
//   /bat.png     → Count Fabulous
//   anything else → redirect to /

import avatar from './avatar.png';
import bat from './bat.png';

const TWITTER = 'https://x.com/wujubong';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, '') || '/';

    if (path === '/') return new Response(buildHTML(), htmlHeaders());
    if (path === '/avatar.png') return pngResponse(avatar);
    if (path === '/bat.png') return pngResponse(bat);

    return Response.redirect(`${url.origin}/`, 302);
  },
};

function pngResponse(data) {
  return new Response(data, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
  });
}

function htmlHeaders() {
  return {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy':
        "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; script-src 'none';",
    },
  };
}

// ─── Conteúdo ────────────────────────────────────────────────────────────────

const profile = {
  handle: 'wujubong',
  name: 'laura',
  meta: ['she/her', '2003', 'gemini', 'INTJ', 'pt/eng'],
  yes: 'cats, lol, kpop, anime, monster high &amp; chocolate',
  no: 'uneducated people',
};

// Resumo exibido na coluna da direita (no lugar da lista de grupos)
const cegsSummary = [
  'cegs de álbuns &amp; itens de k-pop',
  'pedidos individuais &amp; busca de wishlist',
  'claims no privado',
];

const rules = [
  {
    title: 'sobre as cegs',
    items: [
      'Cegs <b>demoradas</b>.',
      '<b>Claims no privado.</b>',
      'Aceito <b>pedidos individuais</b> e de <b>busca de wishlist</b>.',
      'Em caso de ceg de álbuns, as compras são feitas <b>somente por lojas oficiais coreanas</b>: Yes24, Makestar, Ktown4u e Aladin. Outras lojas não estão disponíveis!',
    ],
  },
  {
    title: 'condições &amp; responsabilidades',
    items: [
      '<b>NÃO permitido compradores sensíveis</b>: as cegs vêm de pessoas que não ligam muito em enviar fotos ou preservar as condições do produto, tenha ciência que o controle sobre isso é falho. Caso o produto chegue com alguma avaria, será avisado quando o produto estiver em minhas mãos.',
      'Não me responsabilizo por <b>calotes, golpes ou avarias</b> causadas pelo vendedor original. Todos os perfis passam por uma checagem rigorosa de referências antes da compra. Caso ocorra qualquer imprevisto ou intercorrência por parte do vendedor, todos os participantes serão imediatamente informados.',
      'Não me responsabilizo por <b>perda dos correios</b>.',
    ],
  },
  {
    title: 'compromissos de quem compra',
    items: [
      'É <b>obrigatório</b> entrar no <b>grupo de atualizações do WhatsApp</b> para acompanhar os prazos e a chegada do código de rastreio.',
      'Mudar de número ou não responder cobranças de pagamento resulta em <b>banimento de futuras CEGs e perda do produto</b>.',
      '<b>Repasses</b> somente com aviso prévio e antes do produto chegar no Brasil.',
    ],
  },
  {
    title: 'pagamento &amp; frete',
    formula: ['valor do produto', 'frete inter', 'taxas', 'frete nacional'],
    items: [
      '<b>Parcelamentos</b> permitidos, apenas consultar previamente.',
      'Caso precise deixar em <b>armazenamento</b>, também consultar previamente.',
      'Frete por <b>carta registrada</b> ou <b>super-frete</b>.',
    ],
  },
];

// ─── Ícones (SVG inline) ──────────────────────────────────────────────────────

const xIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;

// ─── HTML Builder ─────────────────────────────────────────────────────────────

function buildHTML() {
  const sep = `<span class="tick">'</span>`;
  const meta = profile.meta.join(` ${sep} `);

  const summaryItems = cegsSummary.map(s => `<div class="like-item">♡ ${s}</div>`).join('\n            ');

  const ruleGroups = rules.map(g => `
          <section class="rule-group">
            <h3>${g.title}</h3>
            ${g.formula ? `<div class="formula">${g.formula.map(f => `<span class="chip">${f}</span>`).join('<span class="plus">+</span>')}</div>` : ''}
            <ul>
              ${g.items.map(i => `<li>${i}</li>`).join('\n              ')}
            </ul>
          </section>`).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>@${profile.handle}'s profile ♡ cegs</title>
<meta name="description" content="laura (@${profile.handle}) · cegs de k-pop · termos de compra">
<meta name="theme-color" content="#ffc2d8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Pirata+One&display=swap" rel="stylesheet">
<style>
  :root {
    --pink: #e0609a;
    --pink-hot: #ff7eb6;
    --pink-soft: #ffc2d8;
    --pink-pale: #ffe6ef;
    --pink-line: #d47aa3;
    --ink: #141014;
    --ink-soft: #3a2a33;
    --text: #6b4a5a;
    --white: #fff;
    --grey: #d4d0d2;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    padding: 3rem 16px;
    font-family: 'Poppins', system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.45;
    color: var(--text);
    background-color: var(--pink-soft);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M30 34 C24 24 14 22 4 24 C10 28 10 32 8 36 C14 34 16 38 15 42 C20 38 24 40 25 45 C27 40 29 39 30 40 C31 39 33 40 35 45 C36 40 40 38 45 42 C44 38 46 34 52 36 C50 32 50 28 56 24 C46 22 36 24 30 34 Z' fill='%23141014' fill-opacity='.07'/%3E%3Cpath d='M90 88 c-3-5-11-3-9 3 c1 3 9 9 9 9 s8-6 9-9 c2-6-6-8-9-3 z' fill='%23e0609a' fill-opacity='.14'/%3E%3C/svg%3E"),
      linear-gradient(180deg, #ffb9d0 0%, #ffd3e2 55%, #ffeef4 100%);
    background-attachment: fixed;
  }
  a { color: inherit; }

  /* moldura externa (estilo carrd) */
  .frame {
    max-width: 760px; margin: 0 auto;
    background: var(--white);
    border: 3px dashed var(--grey);
    padding: 12px;
    box-shadow: 8px 8px 0 rgba(20,16,20,0.12);
  }
  .card { border: 3px solid var(--pink-line); background: var(--white); }

  /* barra superior */
  .bar {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 12px;
    background: linear-gradient(180deg, #ffd0e3 0%, #fff 55%, #ffd0e3 100%);
    border-bottom: 3px solid var(--pink-line);
  }
  .bar-icons { display: flex; gap: 10px; color: var(--pink); font-weight: 700; font-size: 17px; }
  .bar-title {
    flex: 1; text-align: center; color: var(--pink); font-size: 17px;
    text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .search {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); border: 1px solid #f3c6d8;
    padding: 4px 12px; min-width: 150px; color: var(--pink); font-size: 14px;
  }
  .search::before { content: '⌕'; font-size: 18px; line-height: 1; }

  /* faixa preta */
  .ribbon {
    background: var(--ink); color: var(--pink-hot);
    font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: lowercase;
    padding: 5px 0; overflow: hidden; white-space: nowrap;
    border-bottom: 3px solid var(--pink-line);
  }
  .ribbon span { display: inline-block; padding-left: 100%; animation: marquee 22s linear infinite; }
  @keyframes marquee { to { transform: translateX(-100%); } }

  /* painéis (troca via :target, sem JS) */
  .pane-rules { display: none; }
  #regras:target { display: block; }
  #regras:target ~ #perfil { display: none; }

  .cols { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 1fr); }
  .col { padding: 12px; min-width: 0; }
  .col + .col { border-left: 3px solid var(--pink-line); }

  /* coluna 1 */
  .handle { color: var(--pink); font-size: 19px; font-weight: 500; line-height: 1.2; }
  .handle .s { color: #f7a8c8; }
  .avatar {
    display: block; width: 100%; aspect-ratio: 1; object-fit: cover;
    margin-top: 8px; border: 3px solid var(--ink);
    background: var(--pink-pale);
  }
  .credit { font-size: 15px; color: var(--ink-soft); margin: 4px 0 8px; line-height: 1.2; }
  .credit em { font-style: normal; color: var(--pink); }
  .actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  .action {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    border: 1px solid #eee; padding: 4px 2px; font-size: 10px;
    color: #b9b9b9; text-decoration: none; background: #fcfcfc;
  }
  .action i { font-style: normal; font-size: 18px; line-height: 1.1; color: #c9c9c9; }
  a.action { color: var(--pink); }
  a.action i { color: var(--pink); }
  a.action:hover { background: var(--pink-pale); border-color: var(--pink-soft); }
  .status { margin-top: 8px; font-size: 11px; font-weight: 600; color: var(--ink-soft); }
  .status div { display: flex; justify-content: space-between; padding: 2px 6px; }
  .status div:nth-child(odd) { background: #fafafa; }
  .status .on { color: var(--pink-hot); font-weight: 500; }
  .status .on::before { content: '● '; font-size: 9px; }

  /* coluna 2 */
  .me { text-align: center; padding-top: 1.5rem; }
  .me h2 { color: var(--pink); font-size: 26px; font-weight: 500; }
  .me-line { color: var(--ink-soft); font-size: 17px; line-height: 1.35; text-align: left; margin-bottom: 12px; }
  .me-line mark { background: var(--pink-soft); color: var(--ink-soft); padding: 0 2px; }
  .tick { color: var(--pink); }
  .hearts { color: var(--pink-hot); font-size: 9px; letter-spacing: 1px; overflow: hidden; white-space: nowrap; margin-bottom: 4px; }
  .yn { border: 2px solid var(--pink-line); text-align: left; margin-bottom: 6px; }
  .yn-head { background: var(--pink-pale); border-bottom: 2px solid var(--pink-line); color: var(--ink-soft); font-size: 13px; padding: 1px 6px; }
  .yn-body { padding: 2px 6px; color: var(--text); font-size: 14px; line-height: 1.2; }
  .yn.no .yn-head { background: var(--ink); color: var(--pink-hot); border-color: var(--ink); }
  .yn.no { border-color: var(--ink); }
  .counts { color: var(--pink); font-weight: 600; font-size: 14px; margin-top: 10px; }

  /* coluna 3 */
  .box-title {
    display: flex; border: 2px solid var(--pink-line);
    color: #f2a7c6; font-weight: 600; font-size: 15px;
  }
  .box-title span { flex: 1; text-align: center; padding: 2px 4px; }
  .box-title span + span { flex: 0 0 44px; border-left: 2px solid var(--pink-line); }
  .like-item {
    color: var(--pink); font-weight: 600; font-size: 13.5px; line-height: 1.15;
    padding: 5px 0; border-bottom: 2px solid #f0bcd2;
  }
  .stores { font-size: 12px; color: var(--ink-soft); padding: 6px 0 8px; line-height: 1.3; }
  .stores b { color: var(--pink); }
  .cta {
    display: block; text-align: center; text-decoration: none;
    background: var(--pink); color: var(--white); font-weight: 500;
    border-radius: 12px; padding: 7px; margin-top: 8px;
    box-shadow: 3px 3px 0 rgba(20,16,20,0.18);
  }
  .cta.dark { background: var(--ink); color: var(--pink-hot); }
  .cta:hover { filter: brightness(1.08); }
  .social { display: flex; justify-content: center; margin: 10px 0 4px; }
  .social a { color: var(--ink); width: 28px; height: 28px; }
  .social a:hover { color: var(--pink); }
  .social svg { width: 100%; height: 100%; }
  .bat { display: block; width: 100%; max-width: 230px; height: auto; margin: 4px auto 0; animation: flap 3s ease-in-out infinite; }
  @keyframes flap { 50% { transform: translateY(-5px) rotate(-2deg); } }

  /* aba de regras */
  .pane-rules { padding: 18px 20px 22px; scroll-margin-top: 16px; }
  .rules-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
  .rules-head h2 { font-family: 'Pirata One', 'Poppins', serif; font-weight: 400; color: var(--ink); font-size: 34px; line-height: 1.1; }
  .rules-head h2 small { display: block; font-family: 'Poppins', sans-serif; font-size: 13px; color: var(--pink); letter-spacing: 0.1em; font-weight: 600; }
  .back { color: var(--pink); font-weight: 600; text-decoration: none; font-size: 14px; }
  .back:hover { text-decoration: underline; }
  .rules-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 12px; }
  .rule-group { border: 2px solid var(--pink-line); }
  .rule-group h3 {
    background: var(--ink); color: var(--pink-hot);
    font-size: 13px; font-weight: 600; letter-spacing: 0.08em; padding: 4px 10px;
  }
  .rule-group h3::before { content: '♡ '; }
  .rule-group ul { list-style: none; padding: 6px 10px 8px; }
  .rule-group li { position: relative; padding: 5px 0 5px 20px; font-size: 13.5px; color: var(--ink-soft); border-bottom: 1px dashed #f0bcd2; }
  .rule-group li:last-child { border-bottom: 0; }
  .rule-group li::before { content: '✦'; position: absolute; left: 2px; top: 5px; color: var(--pink-hot); }
  .rule-group b { color: var(--pink); font-weight: 600; }
  .formula { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 10px 10px 0; }
  .chip { background: var(--pink-pale); border: 1px solid var(--pink-soft); color: var(--pink); font-size: 12px; font-weight: 600; padding: 1px 8px; border-radius: 999px; }
  .plus { color: var(--ink); font-weight: 700; }
  .rules-note { margin-top: 14px; text-align: center; font-size: 13px; color: var(--ink-soft); }
  .rules-note a { color: var(--pink); font-weight: 600; }

  /* rodapé do card */
  .foot {
    display: flex; align-items: center; gap: 12px;
    padding: 6px 12px;
    background: linear-gradient(180deg, #ffd0e3 0%, #fff 55%, #ffd0e3 100%);
    border-top: 3px solid var(--pink-line);
  }
  .tabs { font-size: 19px; color: var(--pink); white-space: nowrap; }
  .tabs a { color: var(--pink); text-underline-offset: 3px; }
  .tabs a:hover { color: var(--ink); }
  .card:has(#regras:target) .tab-rules,
  .card:not(:has(#regras:target)) .tab-profile { color: var(--ink); text-decoration-color: var(--pink-hot); }
  .foot-mid { flex: 1; text-align: center; color: var(--pink); font-size: 15px; white-space: nowrap; overflow: hidden; }
  .foot-icons { display: flex; gap: 12px; color: var(--pink); font-size: 16px; }
  .made { text-align: center; color: #f4b2cb; font-size: 17px; padding: 14px 0 4px; }

  @media (max-width: 680px) {
    body { padding: 1rem 16px; }
    .frame { padding: 8px; }
    .cols { grid-template-columns: minmax(0, 1fr); }
    .col + .col { border-left: 0; border-top: 3px solid var(--pink-line); }
    .col-1 {
      display: grid; gap: 8px 12px; align-items: start;
      grid-template-columns: minmax(0, 120px) minmax(0, 1fr);
      grid-template-areas: "handle handle" "avatar credit" "avatar status" "actions actions";
    }
    .col-1 .handle { grid-area: handle; }
    .col-1 .avatar { grid-area: avatar; margin-top: 0; }
    .col-1 .credit { grid-area: credit; margin: 0; font-size: 14px; }
    .col-1 .status { grid-area: status; align-self: end; margin-top: 0; }
    .col-1 .actions { grid-area: actions; }
    .me h2 { font-size: 23px; }
    .me-line { font-size: 15px; }
    .rules-head h2 { font-size: 28px; }
    .me { padding-top: 0.5rem; }
    .search { display: none; }
    .rules-grid { grid-template-columns: minmax(0, 1fr); }
    .pane-rules { padding: 14px 12px 18px; }
    .foot-mid { display: none; }
    .foot { justify-content: space-between; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ribbon span, .bat { animation: none; }
    .ribbon span { padding-left: 12px; }
  }
</style>
</head>
<body>
<div class="frame">
  <div class="card">

    <header class="bar">
      <div class="bar-icons" aria-hidden="true"><span>✖</span><span>⟳</span><span>▦</span><span>ʚɞ</span></div>
      <a class="bar-title" href="#perfil">( ˶ᵔ ᵕ ᵔ˶ )♡ cegs da laura</a>
      <div class="search" aria-hidden="true">search...</div>
    </header>

    <div class="ribbon" aria-hidden="true"><span>♡ cegs abertas ♡ claims no privado ♡ pedidos individuais &amp; wishlist ♡ leia os termos de compra antes de participar ♡</span></div>

    <main>
      <!-- aba: rules (termos de compra) -->
      <section id="regras" class="pane-rules" aria-labelledby="regras-titulo">
        <div class="rules-head">
          <h2 id="regras-titulo"><small>avisos ♡</small>termos de compra</h2>
          <a class="back" href="#perfil">← voltar ao perfil</a>
        </div>
        <div class="rules-grid">${ruleGroups}
        </div>
        <p class="rules-note">dúvidas ou claims? chama no privado: <a href="${TWITTER}" target="_blank" rel="noopener noreferrer">@${profile.handle}</a> ♡</p>
      </section>

      <!-- aba: profile -->
      <section id="perfil" class="cols">

        <div class="col col-1">
          <div class="handle">@${profile.handle}<span class="s">'s</span><br><span class="s">profile</span></div>
          <img class="avatar" src="/avatar.png" alt="ilustração no estilo Draculaura" width="194" height="193">
          <div class="credit">art: <em>@Mitynix</em> on tumblr</div>
          <div class="actions">
            <span class="action"><i>▭</i>Comment</span>
            <a class="action" href="${TWITTER}" target="_blank" rel="noopener noreferrer"><i>✉</i>Message</a>
            <span class="action"><i>⊕</i>Request</span>
          </div>
          <div class="status">
            <div><span>Last Online</span><span class="on">Now</span></div>
            <div><span>Location</span><span>Earth</span></div>
          </div>
        </div>

        <div class="col me">
          <h2>my profile♡</h2>
          <p class="me-line"><mark>${profile.name}</mark> ${meta} ${sep}</p>
          <div class="hearts" aria-hidden="true">♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥</div>
          <div class="yn">
            <div class="yn-head">( ˶ˆᗜˆ˵ ) ✧ YES!</div>
            <div class="yn-body">${profile.yes}</div>
          </div>
          <div class="yn no">
            <div class="yn-head">( ˃̣̣̥⌓˂̣̣̥ ) ☆ NO!</div>
            <div class="yn-body">${profile.no}</div>
          </div>
          <div class="counts">♡123 / ✉123 / ♫123</div>
        </div>

        <div class="col">
          <div class="box-title"><span>my cegs...</span><span>♡</span></div>
            ${summaryItems}
          <div class="stores">álbuns só por lojas oficiais: <b>Yes24 · Makestar · Ktown4u · Aladin</b></div>
          <a class="cta dark" href="#regras">termos de compra ✦</a>
          <a class="cta" href="${TWITTER}" target="_blank" rel="noopener noreferrer">find me on</a>
          <div class="social">
            <a href="${TWITTER}" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter @${profile.handle}">${xIcon}</a>
          </div>
          <img class="bat" src="/bat.png" alt="Count Fabulous, o morceguinho da Draculaura" width="500" height="310">
        </div>

      </section>
    </main>

    <footer class="foot">
      <nav class="tabs"><a class="tab-profile" href="#perfil">profile</a> / <a class="tab-rules" href="#regras">rules</a></nav>
      <div class="foot-mid" aria-hidden="true">( ˶ᵔ ᵕ ᵔ˶ ) ˖ ° ✧ ⋆ ☆</div>
      <div class="foot-icons" aria-hidden="true"><span>✉</span><span>⤓</span><span>♛</span></div>
    </footer>

  </div>
  <div class="made">( made with love ♡ )</div>
</div>
</body>
</html>`;
}
