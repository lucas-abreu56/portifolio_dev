# Setup — demo de agendamento (n8n + Cal.com + Vercel)

O `README.md` cobre `cp .env.example .env.local` e a lista de variáveis. Isto
aqui cobre o que falta: a **ordem** de configuração dos serviços externos, o
que vive só no painel de cada um e volta ao padrão se o recurso for recriado, e
como verificar que cada camada está de pé.

A home e o resto do site funcionam sem nada disto. Só `/demo/agendamento` e
`/api/chat` dependem.

## Ordem

### 1. Credencial basic auth no n8n

No n8n, crie uma credencial do tipo **Basic Auth**. Gere a senha só com
caracteres `base64url`:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

**Por quê só `base64url`:** o Next expande variáveis ao carregar `.env*`. Um
`$` no meio da senha é engolido em silêncio — o sintoma não é erro de
carregamento, é `/api/chat` respondendo `502` sem nenhuma pista de onde olhar.

### 2. Ligar a credencial no trigger — pela interface, não por MCP

Abra o workflow "Agendamento — Demo Web" no n8n, nó **Chat Trigger**, e
configure pela **interface web**:

- `authentication: basicAuth`, com a credencial do passo 1
- `mode: webhook` (não `hostedChat` — esse serve a própria página de chat do
  n8n, e este projeto tem UI própria falando por Route Handler)
- `responseMode: streaming`
- `public: true`

⚠️ **Não use o `setNodeCredential` do MCP do n8n para isto.** Ele responde
sucesso (`appliedOperations: 1`) e **não persiste** — o nó fica com
`authentication: basicAuth` configurado mas sem a chave `credentials`, e todo
request é recusado com `403`. O sinal de que não pegou: `publish` devolve o
mesmo `activeVersionId` de antes, como se nada tivesse mudado. Depois de ligar
pela interface, confira o nó abrindo-o de novo.

Depois de configurar, ative o workflow (`active: true`).

### 3. Event type dedicado no Cal.com

Use ou crie um event type separado da agenda real, exclusivo para o demo.
Todas as ferramentas do agente (`buscar_horarios`, `criar_agendamento`,
`reagendar_agendamento`, `cancelar_agendamento`) são filtradas por
`eventTypeId` — esse id é a fronteira do que o agente alcança.

Confira, na interface do Cal.com:

- **Aba Disponibilidade:** o event type deve usar um **schedule dedicado**,
  não o mesmo da agenda real. ⚠️ Isto nunca foi verificado neste projeto — se
  compartilhar schedule, uma reserva de visitante anônimo consome horário de
  cliente de verdade. É a checagem de maior risco desta lista.
- **Limites e intervalos:** configure um teto de reservas por dia. O rate
  limit do Route Handler (passo 5) é por IP e por processo — não é a defesa
  de custo real, só uma camada. Quem segura o abuso de fato é o limite
  aplicado pelo Cal.com.

### 4. Variáveis na Vercel

Defina para os ambientes que precisar (Preview / Production):

| Variável | Valor |
|---|---|
| `N8N_CHAT_WEBHOOK_URL` | URL do webhook do Chat Trigger, terminando em `/chat` |
| `N8N_CHAT_BASIC_AUTH_USER` | usuário da credencial do passo 1 |
| `N8N_CHAT_BASIC_AUTH_PASSWORD` | senha `base64url` do passo 1 |

Opcionais (têm default no código): `DEMO_CHAT_BURST_LIMIT`,
`DEMO_CHAT_HOURLY_LIMIT`, `DEMO_CHAT_TIMEOUT_MS`.

Trocar a credencial no n8n sem atualizar aqui quebra em produção mesmo com
`.env.local` local correto — os dois lados guardam o mesmo segredo de forma
independente.

## Verificação, na ordem

Rode de baixo para cima é inútil — cada `curl` aqui isola uma camada. Um
`curl` de 10 segundos evita uma hora perseguindo credencial vencida.

```bash
# 1. O Route Handler está de pé e valida entrada (não depende do n8n):
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://SEU_DOMINIO/api/chat
# esperado: 400 (corpo vazio/inválido)

curl -s -o /dev/null -w "%{http_code}\n" https://SEU_DOMINIO/api/chat
# esperado: 405 (método errado)
```

Se as env vars estiverem ausentes, o POST acima responde `503` em vez de
`400` — isso já diagnostica antes de qualquer chamada ao n8n.

Para verificar a ponta n8n de fato (não coberto pelos dois `curl` acima, que só
provam validação do Route Handler): abra `/demo/agendamento` no navegador e
mande uma mensagem real. Os sintomas por código de erro:

| Sintoma | Causa |
|---|---|
| `/api/chat` → 503 | `N8N_CHAT_WEBHOOK_URL` vazio ou ausente |
| `/api/chat` → 502, log `upstream responded 401` | faltou o `Authorization` — credencial não ligada no trigger |
| `/api/chat` → 502, log `upstream responded 403` | usuário/senha divergentes entre a Vercel/`.env.local` e a credencial no n8n |
| `/api/chat` → 502, log `upstream responded 404` | URL errada — confira o sufixo `/chat` no fim |
| Resposta demora e nunca chega | workflow inativo no n8n, ou `mode` ainda em `hostedChat` |

Se tudo isso passar mas a resposta parecer genérica ou sem uso de ferramenta,
confira se o workflow está `active: true` e se o modelo (Gemini, com fallback
Groq) está respondendo — ver logs de execução no n8n.
