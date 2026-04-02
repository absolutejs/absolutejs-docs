export const aiOverviewQuickStart = `\
import { Elysia } from 'elysia';
import { prepare, networking } from '@absolutejs/absolute';
import { aiChat } from '@absolutejs/absolute/ai';
import { anthropic } from '@absolutejs/absolute/ai/anthropic';

const { absolutejs, manifest } = await prepare();

new Elysia()
  .use(absolutejs)
  .use(
    aiChat({
      provider: () => anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
      systemPrompt: 'You are a helpful assistant.',
    })
  )
  .use(networking);`;

export const aiOverviewClientReact = `\
import { useAIStream } from '@absolutejs/absolute/react/ai';

export const Chat = () => {
  const { messages, send, cancel, isStreaming } = useAIStream('/chat');

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <button onClick={() => send('Hello!')}>Send</button>
      {isStreaming && <button onClick={cancel}>Cancel</button>}
    </div>
  );
};`;

export const aiImportPaths = `\
import { aiChat } from '@absolutejs/absolute/ai';              // Server plugin
import { anthropic } from '@absolutejs/absolute/ai/anthropic';  // Provider
import { useAIStream } from '@absolutejs/absolute/react/ai';    // Client hook`;

export const aiPluginBasicConfig = `\
import { aiChat } from '@absolutejs/absolute/ai';
import { anthropic } from '@absolutejs/absolute/ai/anthropic';

new Elysia().use(
  aiChat({
    // WebSocket path (default: '/chat')
    path: '/chat',

    // Provider factory — receives provider name, returns config
    provider: (providerName) =>
      anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),

    // System prompt sent with every request
    systemPrompt: 'You are a helpful assistant.',

    // Maximum tool-use turns before stopping (default: 10)
    maxTurns: 5,
  })
);`;

export const aiPluginFullConfig = `\
import { aiChat } from '@absolutejs/absolute/ai';
import { anthropic } from '@absolutejs/absolute/ai/anthropic';
import { openaiResponses } from '@absolutejs/absolute/ai/openai-responses';

const getProvider = (name: string) => {
  switch (name) {
    case 'anthropic':
      return anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    case 'openai':
      return openaiResponses({ apiKey: process.env.OPENAI_API_KEY });
    default:
      throw new Error(\`Unknown provider: \${name}\`);
  }
};

new Elysia().use(
  aiChat({
    path: '/chat',
    provider: getProvider,

    // Model can be static or dynamic per provider
    model: (providerName) => {
      if (providerName === 'anthropic') return 'claude-sonnet-4-6';
      return 'gpt-4o';
    },

    // Tools can vary by provider/model
    tools: (providerName, model) => {
      return TOOL_CAPABLE_MODELS.has(model) ? myTools : undefined;
    },

    // Extended thinking — static or per provider/model
    thinking: (providerName, model) => {
      return THINKING_MODELS.has(model)
        ? { budgetTokens: 8000 }
        : undefined;
    },

    // Custom message parser for provider:model:content format
    parseProvider: (raw) => {
      const first = raw.indexOf(':');
      const providerName = raw.slice(0, first);
      const rest = raw.slice(first + 1);
      const second = rest.indexOf(':');
      return {
        content: rest.slice(second + 1),
        model: rest.slice(0, second),
        providerName,
      };
    },

    // Called when a response completes
    onComplete: (conversationId, fullResponse, usage) => {
      console.log(\`[\${conversationId}] \${usage?.inputTokens}in / \${usage?.outputTokens}out\`);
    },
  })
);`;

export const aiPluginConfigType = `\
type AIChatPluginConfig = {
  path?: string;
  provider: (providerName: string) => AIProviderConfig;
  model?: string | ((providerName: string) => string);
  tools?:
    | AIToolMap
    | ((providerName: string, model: string) => AIToolMap | undefined);
  thinking?:
    | boolean
    | { budgetTokens: number }
    | ((
        providerName: string,
        model: string
      ) => boolean | { budgetTokens: number } | undefined);
  systemPrompt?: string;
  maxTurns?: number;
  parseProvider?: (content: string) => {
    content: string;
    model?: string;
    providerName: string;
  };
  onComplete?: (
    conversationId: string,
    fullResponse: string,
    usage?: AIUsage
  ) => void;
};`;

export const aiToolsDefinition = `\
import type { AIToolMap } from '@absolutejs/absolute';

export const tools: AIToolMap = {
  search_products: {
    description: 'Search the product catalog by query, category, or price.',
    input: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search text to match against product names',
        },
        category: {
          type: 'string',
          description: 'Filter by category',
        },
        max_price: {
          type: 'number',
          description: 'Maximum price in dollars',
        },
      },
    },
    handler: (input) => {
      // Query your database, call an API, etc.
      const results = db
        .prepare('SELECT * FROM products WHERE name LIKE ?')
        .all(\`%\${input.query}%\`);

      return JSON.stringify(results);
    },
  },

  get_weather: {
    description: 'Get current weather for a city.',
    input: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name' },
      },
      required: ['city'],
    },
    handler: async (input) => {
      const res = await fetch(\`https://api.weather.com/\${input.city}\`);
      const data = await res.json();
      return JSON.stringify(data);
    },
  },
};`;

export const aiToolsType = `\
type AIToolDefinition = {
  description: string;
  input: Record<string, unknown>; // JSON Schema object
  handler: (input: unknown) => Promise<string> | string;
};

type AIToolMap = Record<string, AIToolDefinition>;`;

export const aiToolsUsage = `\
import { aiChat } from '@absolutejs/absolute/ai';
import { anthropic } from '@absolutejs/absolute/ai/anthropic';
import { tools } from './tools';

new Elysia().use(
  aiChat({
    provider: () => anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
    tools,
    systemPrompt: 'You have access to a product database. Use the tools to help users find products.',
    maxTurns: 5, // Stop after 5 tool-use rounds
  })
);`;

export const aiToolsDynamic = `\
// Provide different tools based on provider or model
const getTools = (providerName: string, model: string) => {
  // Only give tools to models that support them
  const TOOL_CAPABLE = new Set([
    'claude-sonnet-4-6',
    'claude-opus-4-6',
    'gpt-4o',
    'gemini-3-pro',
  ]);

  return TOOL_CAPABLE.has(model) ? tools : undefined;
};

new Elysia().use(
  aiChat({
    provider: getProvider,
    tools: getTools,
  })
);`;

export const aiStreamingProtocol = `\
// Client → Server messages (sent over WebSocket)

type AIMessageRequest = {
  type: 'message';
  content: string;
  conversationId?: string;
  attachments?: AIAttachment[];
};

type AICancelRequest = {
  type: 'cancel';
  conversationId: string;
};

type AIBranchRequest = {
  type: 'branch';
  messageId: string;
  content: string;
  conversationId: string;
};`;

export const aiStreamingServerMessages = `\
// Server → Client messages (received over WebSocket)

type AIChunkMessage = {
  type: 'chunk';
  content: string;
  messageId: string;
  conversationId: string;
};

type AIThinkingMessage = {
  type: 'thinking';
  content: string;
  messageId: string;
  conversationId: string;
};

type AIToolStatusMessage = {
  type: 'tool_status';
  name: string;
  status: 'running' | 'complete';
  input?: unknown;
  result?: string;
  messageId: string;
  conversationId: string;
};

type AIImageMessage = {
  type: 'image';
  data: string;
  format: string;
  isPartial: boolean;
  revisedPrompt?: string;
  imageId?: string;
  messageId: string;
  conversationId: string;
};

type AICompleteMessage = {
  type: 'complete';
  durationMs?: number;
  messageId: string;
  model?: string;
  conversationId: string;
  usage?: AIUsage;
};

type AIErrorMessage = {
  type: 'error';
  message: string;
  messageId?: string;
  conversationId?: string;
};`;

export const aiStreamingMessageType = `\
type AIMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  conversationId: string;
  parentId?: string;
  attachments?: AIAttachment[];
  thinking?: string;
  toolCalls?: AIToolCall[];
  images?: AIImageData[];
  isStreaming?: boolean;
  model?: string;
  usage?: AIUsage;
  durationMs?: number;
  timestamp: number;
};

type AIUsage = {
  inputTokens: number;
  outputTokens: number;
};

type AIAttachment = {
  data: string; // base64-encoded
  media_type:
    | 'image/png'
    | 'image/jpeg'
    | 'image/gif'
    | 'image/webp'
    | 'application/pdf';
  name?: string;
};`;

export const aiStreamingThinkingStatic = `\
new Elysia().use(
  aiChat({
    provider: getProvider,
    thinking: { budgetTokens: 10000 },
  })
);`;

export const aiStreamingThinkingDynamic = `\
new Elysia().use(
  aiChat({
    provider: getProvider,
    thinking: (providerName, model) => {
      const THINKING_MODELS = new Set([
        'claude-opus-4-6',
        'claude-sonnet-4-6',
        'o3',
        'o4-mini',
        'deepseek-reasoner',
      ]);
      return THINKING_MODELS.has(model)
        ? { budgetTokens: 8000 }
        : undefined;
    },
  })
);`;

export const aiConnectionOptions = `\
type AIConnectionOptions = {
  protocols?: string[];
  reconnect?: boolean;
  pingInterval?: number;
  maxReconnectAttempts?: number;
};`;

export const aiStoreInterface = `\
type AIConversationStore = {
  get: (id: string) => Promise<AIConversation | undefined>;
  getOrCreate: (id: string) => Promise<AIConversation>;
  set: (id: string, conversation: AIConversation) => Promise<void>;
  list: () => Promise<AIConversationSummary[]>;
  remove: (id: string) => Promise<void>;
};`;

export const aiStoreMemory = `\
import { aiChat, createMemoryStore } from '@absolutejs/absolute/ai';

// Default — same as not passing store at all
new Elysia().use(
  aiChat({
    provider: getProvider,
    store: createMemoryStore(),
  })
);`;

export const aiStoreCustom = `\
import { aiChat } from '@absolutejs/absolute/ai';
import type { AIConversationStore } from '@absolutejs/absolute';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const redisStore: AIConversationStore = {
  get: async (id) => {
    const data = await redis.get(\`conv:\${id}\`);
    return data ? JSON.parse(data) : undefined;
  },
  getOrCreate: async (id) => {
    const existing = await redis.get(\`conv:\${id}\`);
    if (existing) return JSON.parse(existing);
    const conv = { id, messages: [], createdAt: Date.now() };
    await redis.set(\`conv:\${id}\`, JSON.stringify(conv));
    return conv;
  },
  set: async (id, conversation) => {
    await redis.set(\`conv:\${id}\`, JSON.stringify(conversation));
  },
  list: async () => {
    const keys = await redis.keys('conv:*');
    const convos = await Promise.all(
      keys.map(async (key) => {
        const data = JSON.parse(await redis.get(key) ?? '{}');
        return {
          id: data.id, title: data.title ?? 'Untitled',
          messageCount: data.messages?.length ?? 0,
          createdAt: data.createdAt, lastMessageAt: data.lastMessageAt,
        };
      })
    );
    return convos.sort((a, b) =>
      (b.lastMessageAt ?? b.createdAt) - (a.lastMessageAt ?? a.createdAt)
    );
  },
  remove: async (id) => { await redis.del(\`conv:\${id}\`); },
};

new Elysia().use(
  aiChat({ provider: getProvider, store: redisStore })
);`;

export const aiHtmxBasic = `\
import { aiChat } from '@absolutejs/absolute/ai';
import { anthropic } from '@absolutejs/absolute/ai/anthropic';

new Elysia().use(
  aiChat({
    provider: () => anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
    systemPrompt: 'You are a helpful assistant.',
    htmx: true,
  })
);`;

export const aiHtmxCustomRenderers = `\
new Elysia().use(
  aiChat({
    provider: getProvider,
    htmx: {
      render: {
        chunk: (text, fullContent) =>
          \`<div class="prose">\${markdownToHtml(fullContent)}</div>\`,
        thinking: (text) =>
          \`<details class="think"><summary>Reasoning</summary>\${text}</details>\`,
        toolRunning: (name) =>
          \`<div class="tool"><span class="spinner"></span> \${name}</div>\`,
        toolComplete: (name, result) =>
          \`<details class="tool done"><summary>\${name}</summary><pre>\${result}</pre></details>\`,
        complete: (usage, durationMs, model) =>
          \`<footer>\${model} · \${usage?.outputTokens} tokens · \${(durationMs! / 1000).toFixed(1)}s</footer>\`,
      },
    },
  })
);`;

export const aiHtmxForm = `\
<!-- Send a message — no JavaScript required -->
<form hx-post="/chat/message"
      hx-target="#messages"
      hx-swap="beforeend">
  <input type="hidden" name="conversationId" value="{{convId}}" />
  <textarea name="content" placeholder="Ask anything..."></textarea>
  <button type="submit">Send</button>
</form>

<!-- Messages container — SSE responses append here -->
<div id="messages"></div>

<!-- Sidebar with auto-polling conversation list -->
<aside hx-get="/chat/conversations/list"
       hx-trigger="load, every 3s"
       hx-swap="innerHTML">
</aside>`;

export const aiHtmxSseResponse = `\
<!-- The POST /chat/message endpoint returns HTML like this: -->

<!-- User message -->
<div id="msg-{id}" class="message user">
  <div>What products are under $50?</div>
</div>

<!-- SSE-connected container for the AI response -->
<div id="response-{id}"
     hx-ext="sse"
     sse-connect="/chat/sse/{conversationId}/{messageId}"
     hx-swap="innerHTML">
  <div sse-swap="content" hx-swap="innerHTML"></div>
  <div sse-swap="thinking" hx-swap="innerHTML"></div>
  <div sse-swap="tools" hx-swap="innerHTML"></div>
  <div sse-swap="images" hx-swap="innerHTML"></div>
  <div sse-swap="status" hx-swap="innerHTML"></div>
</div>`;

export const aiHtmxEndpoints = `\
// HTMX endpoints (added alongside WebSocket + REST when htmx is enabled)
//
// POST   /chat/message                     — form submission, returns HTML + SSE container
// GET    /chat/sse/:conversationId/:msgId  — SSE stream of HTML fragments
// GET    /chat/history/:conversationId     — conversation as HTML fragment
// GET    /chat/conversations/list          — sidebar HTML fragment
// DELETE /chat/conversations/:id           — delete, returns empty`;
