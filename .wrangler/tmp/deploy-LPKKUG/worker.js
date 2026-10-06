// worker.js
var worker_default = {
  async fetch(request) {
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>karolayne@Karol: ~</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">
<style>
  :root {
    --pink: #ff6eb4;
    --pink-dim: #b5386e;
    --pink-dark: #6b1f40;
    --amber: #ffb3d9;
    --cyan: #f0f0f0;
    --red: #ff4444;
    --bg: #0a0a0a;
    --bg2: #0f0f0f;
    --border: #222222;
    --text: #e0e0e0;
    --text-dim: #888888;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    min-height: 100vh;
    padding: 2rem 1rem;
    overflow-x: hidden;
  }
  .scanlines {
    position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
    pointer-events: none; z-index: 999;
  }
  .crt-glow {
    position: fixed; inset: 0;
    background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%);
    pointer-events: none; z-index: 998;
  }
  .terminal {
    max-width: 860px; margin: 0 auto;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 4px;
    box-shadow: 0 0 40px rgba(255,110,180,0.06), 0 0 1px rgba(255,110,180,0.25);
  }
  .terminal-bar {
    background: #1a1a1a; border-bottom: 1px solid var(--border);
    padding: 0; display: flex; align-items: stretch;
    border-radius: 4px 4px 0 0; user-select: none;
  }
  .win-tab {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; background: #0f0f0f;
    border-right: 1px solid var(--border);
    color: var(--text-dim); font-size: 12px; letter-spacing: 0.03em;
    border-radius: 4px 0 0 0;
  }
  .win-tab-icon { color: var(--pink); font-size: 13px; }
  .win-tab-new {
    display: flex; align-items: center;
    padding: 0 12px; color: var(--text-dim); font-size: 16px; cursor: default;
    border-right: 1px solid var(--border);
  }
  .win-tab-new:hover { color: var(--text); background: rgba(255,255,255,0.05); }
  .win-spacer { flex: 1; }
  .win-controls {
    display: flex; align-items: stretch;
  }
  .win-btn {
    display: flex; align-items: center; justify-content: center;
    width: 46px; font-size: 12px; color: var(--text-dim); cursor: default;
  }
  .win-btn:hover { background: rgba(255,255,255,0.08); color: var(--text); }
  .win-btn.close:hover { background: #e81123; color: #fff; }
  .body { padding: 2rem; }
  .prompt-line { display: flex; align-items: baseline; gap: 0; margin-bottom: 0.25rem; flex-wrap: wrap; }
  .ps1 { color: var(--pink); font-weight: 500; white-space: nowrap; }
  .ps1 .user { color: var(--cyan); }
  .ps1 .sep { color: var(--text-dim); }
  .ps1 .path { color: var(--pink); }
  .ps1 .dollar { color: var(--text-dim); margin: 0 6px 0 0; }
  .cmd { color: var(--text); }
  .output { margin: 0.5rem 0 1.75rem 0; }
  .box {
    border: 1px solid var(--pink-dark); border-radius: 2px;
    padding: 1rem 1.25rem; margin: 0.25rem 0;
    background: rgba(255,110,180,0.02);
  }
  .info-line { color: var(--text); margin: 0.15rem 0; font-size: 13px; }
  .info-line .label { color: var(--text-dim); min-width: 180px; display: inline-block; }
  .info-line .value { color: var(--cyan); }
  .info-line .value a { color: var(--cyan); text-decoration: none; }
  .info-line .value a:hover { color: var(--pink); text-decoration: underline; }
  .badge {
    display: inline-block;
    background: rgba(255,110,180,0.1); border: 1px solid var(--pink-dark);
    color: var(--pink); font-size: 11px; padding: 1px 6px;
    border-radius: 2px; margin: 2px 3px 2px 0; letter-spacing: 0.03em;
  }
  .badge.amber { background: rgba(240,165,0,0.08); border-color: rgba(240,165,0,0.3); color: var(--amber); }
  .badge.cyan { background: rgba(0,229,229,0.08); border-color: rgba(0,229,229,0.3); color: var(--cyan); }
  .job-entry { margin-bottom: 1.25rem; padding-left: 1rem; border-left: 1px solid var(--pink-dark); }
  .job-title { color: var(--pink); font-weight: 500; }
  .job-meta { color: var(--text-dim); font-size: 12px; margin: 0.1rem 0 0.5rem; }
  .bullet { color: var(--text); font-size: 13px; margin: 0.2rem 0; padding-left: 1.2em; text-indent: -1.2em; }
  .bullet::before { content: '\u25B8 '; color: var(--pink-dim); }
  .edu-entry { padding-left: 1rem; border-left: 1px solid var(--pink-dark); }
  .edu-title { color: var(--pink); font-weight: 500; }
  .edu-sub { color: var(--text-dim); font-size: 12px; margin: 0.1rem 0 0.5rem; }
  .stack-grid { display: grid; grid-template-columns: 140px 1fr; gap: 0.3rem 1rem; font-size: 13px; }
  .stack-key { color: var(--text-dim); white-space: nowrap; }
  .stack-key::before { content: '['; } .stack-key::after { content: ']'; }
  .stack-val { color: var(--text); }
  .dot-sep { color: var(--pink-dim); margin: 0 4px; }
  .hobbies { color: var(--text); font-size: 13px; }
  .hobbies span { color: var(--pink-dim); margin: 0 4px; }
  .status-dot {
    display: inline-block; width: 7px; height: 7px; border-radius: 50%;
    background: var(--pink); margin-right: 6px; vertical-align: middle;
    animation: pulse 2s ease-in-out infinite;
  }
  .status-text { color: var(--pink); font-weight: 500; }
  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,110,180,0.5); }
    50% { opacity: 0.8; box-shadow: 0 0 0 5px rgba(255,110,180,0); }
  }
  .cursor {
    display: inline-block; width: 8px; height: 14px;
    background: var(--pink); vertical-align: text-bottom;
    animation: blink 1.1s step-end infinite; margin-left: 2px;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .section { opacity: 0; animation: fadeIn 0.5s ease forwards; }
  .section:nth-child(1) { animation-delay: 0s; }
  .section:nth-child(2) { animation-delay: 0.08s; }
  .section:nth-child(3) { animation-delay: 0.16s; }
  .section:nth-child(4) { animation-delay: 0.24s; }
  .section:nth-child(5) { animation-delay: 0.32s; }
  .section:nth-child(6) { animation-delay: 0.40s; }
  .section:nth-child(7) { animation-delay: 0.48s; }
  @keyframes fadeIn { to { opacity: 1; } }
  @media (max-width: 600px) {
    body { padding: 0.5rem; font-size: 13px; }
    .body { padding: 1rem; }
    .stack-grid { grid-template-columns: 1fr; }
    .info-line .label { min-width: 120px; font-size: 12px; }
  }
</style>
</head>
<body>
<div class="scanlines"></div>
<div class="crt-glow"></div>
<div class="terminal">
  <div class="terminal-bar">
    <div class="win-tab"><span class="win-tab-icon">\u276F_</span>karolayne@Karol: ~</div>
    <div class="win-tab-new">+</div>
    <div class="win-spacer"></div>
    <div class="win-controls">
      <div class="win-btn">&#x2500;</div>
      <div class="win-btn">&#x25A1;</div>
      <div class="win-btn close">&#x2715;</div>
    </div>
  </div>
  <div class="body">
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">whoami</span>
      </div>
      <div class="output">
        <div class="box">
          <div class="info-line">Karolayne Am\xE1bile Brito Borges &nbsp;<span class="badge">DevOps Engineer Jr</span></div>
          <div class="info-line" style="margin-top:0.5rem;"><span class="label">localiza\xE7\xE3o</span><span class="value">An\xE1polis, Goi\xE1s \xB7 Brasil</span></div>
          <div class="info-line"><span class="label">e-mail</span><span class="value"><a href="mailto:karolayneamabile@gmail.com">karolayneamabile@gmail.com</a></span></div>
          <div class="info-line"><span class="label">github</span><span class="value"><a href="https://github.com/KarolayneAmabile" target="_blank">github.com/KarolayneAmabile</a></span></div>
          <div class="info-line"><span class="label">linkedin</span><span class="value"><a href="https://linkedin.com/in/karolayneamabile" target="_blank">linkedin.com/in/karolayneamabile</a></span></div>
          <div style="margin-top:0.75rem; color:#888888; font-size:13px; font-style:italic; line-height:1.5;">
            DevOps Engineer Jr com experi\xEAncia em infraestrutura cloud-native, Kubernetes, automa\xE7\xE3o e pr\xE1ticas GitOps. AWS Certified Cloud Practitioner. Graduanda em Ci\xEAncia da Computa\xE7\xE3o pelo IFG \u2014 5\xBA per\xEDodo, IRA 8,0.
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">cat stack.conf</span>
      </div>
      <div class="output">
        <div class="stack-grid">
          <span class="stack-key">cloud &amp; iac</span><span class="stack-val">AWS <span class="dot-sep">\xB7</span> Terraform/OpenTOFU <span class="dot-sep">\xB7</span> Terragrunt <span class="dot-sep">\xB7</span> Helmfile</span>
          <span class="stack-key">kubernetes</span><span class="stack-val">EKS <span class="dot-sep">\xB7</span> k0s <span class="dot-sep">\xB7</span> Helm <span class="dot-sep">\xB7</span> ArgoCD <span class="dot-sep">\xB7</span> Cilium <span class="dot-sep">\xB7</span> cert-manager</span>
          <span class="stack-key">ci/cd</span><span class="stack-val">GitHub Actions <span class="dot-sep">\xB7</span> ArgoCD <span class="dot-sep">\xB7</span> ArgoCD Image Updater</span>
          <span class="stack-key">observability</span><span class="stack-val">Grafana <span class="dot-sep">\xB7</span> Prometheus <span class="dot-sep">\xB7</span> Loki <span class="dot-sep">\xB7</span> Alloy</span>
          <span class="stack-key">storage</span><span class="stack-val">Longhorn <span class="dot-sep">\xB7</span> Rook-Ceph <span class="dot-sep">\xB7</span> Velero</span>
          <span class="stack-key">secrets</span><span class="stack-val">Vault <span class="dot-sep">\xB7</span> Vaultwarden <span class="dot-sep">\xB7</span> External Secrets Operator</span>
          <span class="stack-key">linguagens</span><span class="stack-val">Rust <span class="dot-sep">\xB7</span> C <span class="dot-sep">\xB7</span> Python <span class="dot-sep">\xB7</span> YAML</span>
          <span class="stack-key">idiomas</span><span class="stack-val">Portugu\xEAs (nativo) <span class="dot-sep">\xB7</span> Ingl\xEAs (intermedi\xE1rio)</span>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">cat experience.log</span>
      </div>
      <div class="output">
        <div class="job-entry">
          <div class="job-title">DevOps Engineer Jr &nbsp;<span class="badge">Soliton</span> <span class="badge">Remoto</span></div>
          <div class="job-meta">Abril 2025 \u2014 Maio 2026</div>
          <div class="bullet">Reduzi o tempo de deploy da plataforma OpenEDX em 5\xD7 substituindo a camada de abstra\xE7\xE3o do Tutor por uma pipeline customizada com GitHub Actions, ArgoCD e ArgoCD Image Updater.</div>
          <div class="bullet">Projetei e administrei clusters Kubernetes multi-purpose com isolamento por ambiente (seguran\xE7a, monitoramento, opera\xE7\xF5es e produ\xE7\xE3o).</div>
          <div class="bullet">Desenvolvi m\xF3dulos Terraform/OpenTOFU e Helm Charts para padroniza\xE7\xE3o de infraestrutura, garantindo padr\xE3o GitOps e consist\xEAncia entre deploys.</div>
          <div class="bullet">Implementei stack de observabilidade com Grafana, Prometheus, Loki e Alloy para monitoramento e alertas em ambientes cloud-native.</div>
          <div class="bullet">Automatizei gerenciamento de secrets com Vault e External Secrets Operator, eliminando credenciais hardcoded nos reposit\xF3rios.</div>
          <div class="bullet">Desenvolvi API REST em Rust com arquitetura hexagonal, garantindo baixo acoplamento entre dom\xEDnio, aplica\xE7\xE3o e infraestrutura.</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">ls certifications/</span>
      </div>
      <div class="output">
        <a href="https://www.credly.com/badges/cf49021b-d946-47a7-8442-c0349f7d8b7e" target="_blank" style="text-decoration:none;"><span class="badge amber">\u2713 AWS Certified Cloud Practitioner</span></a>
        <span style="color:var(--text-dim); font-size:12px; margin-left:6px;">Amazon Web Services</span>
      </div>
    </div>
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">cat education.txt</span>
      </div>
      <div class="output">
        <div class="edu-entry">
          <div class="edu-title">Bacharelado em Ci\xEAncia da Computa\xE7\xE3o</div>
          <div class="edu-sub">Instituto Federal de Goi\xE1s (IFG) \xB7 2024\u20132027 \xB7 5\xBA per\xEDodo \xB7 IRA 8,0</div>
          <div style="font-size:12px; color:var(--text-dim);">Arquitetura de Computadores \xB7 Sistemas Operacionais \xB7 Redes de Computadores \xB7 Engenharia de Software \xB7 Estrutura de Dados \xB7 Bancos de Dados</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <span class="cmd">cat hobbies.txt</span>
      </div>
      <div class="output">
        <div class="hobbies">games <span>\xB7</span> anime <span>\xB7</span> caf\xE9 hopping <span>\xB7</span> gardening <span>\xB7</span> learning new things</div>
      </div>
    </div>
    <div class="section">
      <div class="prompt-line">
        <span class="ps1"><span class="user">karolayne</span><span class="sep">@</span><span class="path">Karol</span><span class="sep">:~</span><span class="dollar">$</span></span>
        <div class="cursor"></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
