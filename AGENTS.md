<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Contexto do projeto

`PRODUCT.md` descreve o produto-alvo e `DESIGN.md` o sistema visual. Os dois mudam pouco — leia antes de propor mudanças de escopo ou de estilo.

## Restrição: licença e atribuição, ainda em aberto

Levantado em 11/09/2026, não resolvido. **Obrigação legal não quebra build, não
falha teste e não aparece no lint** — por isso mora aqui: se ninguém perguntar,
ela nunca aparece.

- Repositório **público**, sem `LICENSE` e sem campo `license` no
  `package.json`. Sem licença declarada, o padrão legal é *todos os direitos
  reservados* — provavelmente não é o que se quer num portfólio.
- **Inter** via `next/font/google` — SIL OFL 1.1. Auditado: não exige aviso de
  copyright visível para uso como fonte de site. Sem obrigação pendente.
- **Iconify** por CDN (`src/app/layout.tsx`) — conjuntos `logos:` e
  `simple-icons:`, ambos **CC0**. Nenhuma atribuição exigida pela licença. Mas
  **CC0 não cobre marca registrada**: os logos exibidos (Google, Next.js,
  Cal.com) identificam tecnologia de fato usada (uso nominativo, defensável),
  não decoração — ainda assim os termos do Cal.com restringem uso de marca sem
  consentimento escrito, e não há verificação de brand guidelines que
  autorizem explicitamente.
- **Cal.com API v2** e **TMDB** (via FilmPro) citados como stack, sem linha de
  atribuição.

Se uma tarefa pedir adicionar `LICENSE`, trocar de fonte, ou usar API/dataset/
mídia de terceiro nova, **pare e levante com o Lucas** em vez de decidir
sozinho. Procedimento: skill `licencas-e-termos`.

## Regra de handoff (contexto e estado)

`docs/NOTES.local.md` é o documento oficial de handoff e estado de sessão
(ignorado no git, confirmado por `git check-ignore -v`).

**Obrigação:** ao fim de uma sessão de trabalho, após resolver defeitos, tomar
decisões arquiteturais ou commitar, atualize o arquivo antes de encerrar.

**Teto de ~400 linhas.** Ao passar, mova histórico antigo para
`docs/NOTES-historico.local.md`. Não guarde segredo ali mesmo estando fora do
git — a pasta é sincronizada e lida por ferramentas de IA.

### Contexto: as releituras

- **Leia o handoff UMA vez por sessão.** No meio, `Grep` no ponto específico em
  vez de reler o arquivo inteiro. No fim, `Edit` sem reler.
- **Arquivo de código em iteração: um `Read`, depois só `Edit`.** Não releia
  para "conferir se aplicou" — um `Edit` que falha retorna erro, então silêncio
  já é confirmação.
- **Screenshot:** menor viewport que responde à pergunta, JPEG (~q72), nunca
  recapturar a mesma tela sem mudança visual. Use `scripts/shot.mjs`.
- **JSON de workflow do n8n não vem para a conversa principal** — inspecione
  por subagente e traga o resumo (`get_workflow_details` sozinho são
  12–14k tokens).

## Armadilhas deste projeto

- **`npm run lint` falha com `no such directory`.** O script é `eslint` sem
  alvo, e o Next lê o nome como diretório. Use `npx eslint .` diretamente.
- **`$` na senha do basic auth do n8n é engolido em silêncio.** O Next expande
  variáveis ao carregar `.env*`; um `$` no meio do valor some e o sintoma é
  `502` sem pista nenhuma. Gere a senha só com caracteres `base64url`
  (`node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`).
- **Navegue para `localhost:3000`, nunca `127.0.0.1:3000`** ao testar no
  navegador. O dev server do Next trata o segundo como cross-origin, devolve
  `403` nos scripts e a página nunca hidrata — mas o HTML renderiza e o
  console não mostra erro de React, então o sintoma engana.
- **Espere a hidratação, não o `readyState`**, ao dirigir o Chrome por CDP. A
  navbar vem do servidor e existe antes do React assumir; o sinal confiável é
  uma chave `__reactFiber`/`__reactProps` no elemento.
- **Tailwind 4 devolve `lab(...)` no `getComputedStyle`.** Ler L/a/b como
  R/G/B transforma cinza legível em quase-preto — já deu 17 falhas falsas de
  contraste numa auditoria. Converta a cor por canvas
  (`ctx.fillStyle = cor` e leia o pixel de volta), nunca por regex no `lab()`.
- **`Page.captureScreenshot` usa coordenadas de página; `getBoundingClientRect`
  usa viewport.** Sem somar `scrollY`, todo recorte abaixo da dobra cai em
  área vazia.
- **O `setNodeCredential` do MCP do n8n responde sucesso e não persiste.** O nó
  fica sem a chave `credentials` e o n8n recusa com 403; o `publish` devolve o
  mesmo `activeVersionId` de antes como se nada tivesse mudado. Ligue
  credencial pela interface do n8n, não pelo MCP, e confira o nó depois.
- **O stream do n8n é NDJSON com `Content-Type: application/json`.** Um
  `res.json()` ingênuo quebra — é um objeto por linha, não um JSON único. Os
  deltas de texto também cortam no meio de caractere multibyte; use
  `TextDecoder` com `{ stream: true }` e só renderize o acumulado.
- **O evento `keepalive` do stream chega sem `metadata`.** O parser não pode
  assumir que o campo existe em todo evento.
- **O bloco `<!-- BEGIN:nextjs-agent-rules -->` no topo deste arquivo reaparece
  se removido da diff.** É gerado pelo próprio `next dev`
  (`node_modules/next/dist/server/lib/generate-agent-files.js`). Committar
  junto é o que mantém a árvore limpa.

## Auditoria pré-commit (obrigatória)

Antes de todo `git commit`, revise o que está em `git diff --cached` — o que de
fato está staged, não o que "deveria" ter mudado. Responda, por escrito:

1. **Segurança:** expõe dado de usuário, credencial ou rota sem proteção? Abre
   brecha (injeção, SSRF, path traversal, XSS)?
2. **Eficiência:** aguenta escala? Query em loop, N+1, payload inflado, trabalho
   repetido a cada request?
3. **Regressões:** o que isso pode quebrar no resto do projeto? Componente que
   consome o mesmo estado, contrato de API, rota que compartilha layout.
4. **Testes:** o que precisa ser escrito ou rodado antes de ir para produção?
   Rode o que já existe.

Um hook `PreToolUse` bloqueia o `git commit` até o aval ser gravado. Como o
hook roda **antes** do comando, faça em dois passos separados:

1. Num comando só para isso:
   `git diff --cached | git hash-object --stdin > .claude/.review-ok`
2. Noutro comando, o `git commit` sozinho.

**Aval e commit na mesma linha com `&&` não funciona** — quando o hook checa, o
aval ainda não existe. O aval é de uso único e vale só para aquele diff exato.
Script em `.claude/hooks/revisao-pre-commit.sh` (fora do git — a regra é esta
seção).

## Configuração que vive só no painel

- **n8n → workflow "Agendamento — Demo Web" → Chat Trigger:** credencial basic
  auth, `mode: webhook`, `responseMode: streaming`. Se o workflow for
  recriado, o trigger volta para `hostedChat`/`authentication: none` por
  padrão — os dois precisam ser trocados de novo pela interface, nunca pelo
  MCP (ver armadilhas acima).
- **n8n → Chat Trigger → aba Disponibilidade do event type:** ⚠️ **não
  verificado se usa um schedule dedicado**, separado da agenda real. É a
  pendência de maior risco do projeto — se compartilhar schedule, reserva de
  visitante consome horário de cliente.
- **n8n → Chat Trigger → Limites e intervalos:** sem teto de reservas por dia
  configurado. O rate limit do Route Handler é por IP e por processo — não
  substitui um limite aplicado pelo Cal.com.
- **Vercel → Environment Variables:** as 3 obrigatórias abaixo, por ambiente
  (preview/production). Trocar credencial no n8n sem atualizar aqui quebra
  silenciosamente em produção mesmo com `.env.local` local correto.
- **Vercel → Domains → redirect do apex para `www`:** o apex responde `308`
  com corpo `Redirecting...` em `text/plain`. Para `/llms.txt` isso reprova
  na auditoria de navegação agêntica do PageSpeed (medido em 12/09/2026): o
  verificador não segue o redirect, lê `Redirecting...` e não acha o `H1`.
  O arquivo em `www` está correto. **Nenhuma linha de código conserta** — o
  corpo do 308 é gerado pela Vercel. Se algum dia incomodar de verdade,
  a saída é servir o apex direto em vez de redirecionar.

## Variáveis de ambiente

Só a rota `/demo/agendamento` depende delas — sem elas o Route Handler responde
`503` e o resto do site funciona normal.

| Variável | Obrigatória | Se faltar |
|---|---|---|
| `N8N_CHAT_WEBHOOK_URL` | sim | `/api/chat` responde `503` em runtime; build não quebra |
| `N8N_CHAT_BASIC_AUTH_USER` | sim | idem; se só a senha faltar, upstream responde `401`, handler devolve `502` |
| `N8N_CHAT_BASIC_AUTH_PASSWORD` | sim | idem acima. Usuário/senha divergentes do que está no n8n dá `403` do upstream, `502` do handler |
| `DEMO_CHAT_BURST_LIMIT` / `_HOURLY_LIMIT` / `DEMO_CHAT_TIMEOUT_MS` | não | usa os defaults no código (8/min, 40/h, 120s) |

**Diagnóstico por sintoma** (ver `docs/SETUP.md` para o procedimento completo):

| Sintoma | Causa |
|---|---|
| `/api/chat` → 503 | `N8N_CHAT_WEBHOOK_URL` vazio ou ausente |
| `/api/chat` → 502, log `upstream responded 401` | faltou o `Authorization` |
| `/api/chat` → 502, log `upstream responded 403` | usuário/senha divergentes entre env e a credencial no n8n |
| `/api/chat` → 502, log `upstream responded 404` | URL errada — confira o sufixo `/chat` no fim |
