export const providerAnthropic = `\
import { anthropic } from '@absolutejs/absolute/ai/anthropic';

const provider = anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseUrl: 'https://api.anthropic.com', // optional
});

// Models: claude-opus-4-6, claude-sonnet-4-6, claude-haiku-4-5,
//         claude-3-5-sonnet-20241022
// Supports: tool calling, vision, PDF, extended thinking`;
export const providerCompatible = `\
// OpenAI-compatible providers use the same API format
// Each has a convenience wrapper with the correct base URL

import {
  alibaba,
  deepseek,
  google,
  meta,
  mistralai,
  moonshot,
  xai,
} from '@absolutejs/absolute/ai/providers';

// xAI (Grok)
const xaiProvider = xai({ apiKey: process.env.XAI_API_KEY });
// Models: grok-4, grok-4-fast, grok-3

// DeepSeek
const deepseekProvider = deepseek({ apiKey: process.env.DEEPSEEK_API_KEY });
// Models: deepseek-chat, deepseek-reasoner

// Mistral AI
const mistralProvider = mistralai({ apiKey: process.env.MISTRAL_API_KEY });
// Models: mistral-large-latest, mistral-small-latest, codestral-latest

// Meta (Llama)
const metaProvider = meta({ apiKey: process.env.META_API_KEY });
// Models: Llama-4-Maverick-17Bx128E, Llama-4-Scout-17B, Llama-3.3-70B

// Alibaba (Qwen)
const alibabaProvider = alibaba({ apiKey: process.env.ALIBABA_API_KEY });
// Models: qwen-max, qwen-plus, qwen-turbo

// Moonshot (Kimi)
const moonshotProvider = moonshot({ apiKey: process.env.MOONSHOT_API_KEY });
// Models: kimi-k2`;
export const providerCustom = `\
// Use openaiCompatible() for any provider with an OpenAI-compatible API
import { openaiCompatible } from '@absolutejs/absolute/ai/providers';

const myProvider = openaiCompatible({
  apiKey: process.env.MY_API_KEY,
  baseUrl: 'https://api.my-provider.com/v1',
});`;
export const providerGemini = `\
import { gemini } from '@absolutejs/absolute/ai/gemini';

const provider = gemini({
  apiKey: process.env.GOOGLE_API_KEY,
  // Specify which models support image generation
  imageModels: ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image'],
});

// Models: gemini-3-pro, gemini-3-flash, gemini-2.5-pro, gemini-2.5-flash
// Supports: tool calling, vision, PDF, image generation, reasoning`;
export const providerInterface = `\
// Every provider implements the same interface
type AIProviderConfig = {
  stream: (params: AIProviderStreamParams) => AsyncIterable<AIChunk>;
};

type AIProviderStreamParams = {
  model: string;
  messages: AIProviderMessage[];
  tools?: AIProviderToolDefinition[];
  systemPrompt?: string;
  thinking?: { type: string; budget_tokens: number };
  signal?: AbortSignal;
};`;
export const providerMulti = `\
// Multi-provider setup with dynamic routing
import { anthropic } from '@absolutejs/absolute/ai/anthropic';
import { openaiResponses } from '@absolutejs/absolute/ai/openai-responses';
import { gemini } from '@absolutejs/absolute/ai/gemini';
import { ollama } from '@absolutejs/absolute/ai/ollama';
import { xai, deepseek, mistralai } from '@absolutejs/absolute/ai/providers';
import { getEnv } from '@absolutejs/absolute';

const getProvider = (name: string) => {
  switch (name) {
    case 'anthropic':
      return anthropic({ apiKey: getEnv('ANTHROPIC_API_KEY') });
    case 'openai':
      return openaiResponses({
        apiKey: getEnv('OPENAI_API_KEY'),
        imageModels: ['gpt-image-1.5'],
      });
    case 'google':
      return gemini({
        apiKey: getEnv('GOOGLE_API_KEY'),
        imageModels: ['gemini-3-pro-image-preview'],
      });
    case 'xai':
      return xai({ apiKey: getEnv('XAI_API_KEY') });
    case 'deepseek':
      return deepseek({ apiKey: getEnv('DEEPSEEK_API_KEY') });
    case 'mistral':
      return mistralai({ apiKey: getEnv('MISTRAL_API_KEY') });
    case 'ollama':
      return ollama({ baseUrl: process.env.OLLAMA_URL });
    default:
      throw new Error(\`Unknown provider: \${name}\`);
  }
};

new Elysia().use(
  aiChat({
    provider: getProvider,
    parseProvider: (raw) => {
      // Format: "provider:model:message"
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
  })
);`;
export const providerOllama = `\
import { ollama } from '@absolutejs/absolute/ai/ollama';

const provider = ollama({
  baseUrl: process.env.OLLAMA_URL, // defaults to http://localhost:11434
});

// Models: any model pulled locally (llama3.2, qwen3, mistral, etc.)
// Supports: tool calling (model-dependent), free local inference`;
export const providerOpenAI = `\
import { openai } from '@absolutejs/absolute/ai/openai';

const provider = openai({
  apiKey: process.env.OPENAI_API_KEY,
  baseUrl: 'https://api.openai.com', // optional
});

// Models: gpt-4o, gpt-4o-mini, gpt-5.4, gpt-5.3
// Supports: tool calling, vision`;
export const providerOpenAIResponses = `\
import { openaiResponses } from '@absolutejs/absolute/ai/openai-responses';

const provider = openaiResponses({
  apiKey: process.env.OPENAI_API_KEY,
  // Specify which models support image generation
  imageModels: ['gpt-image-1.5', 'gpt-image-1'],
});

// Models: gpt-4o, o3, o4-mini, gpt-image-1.5
// Supports: tool calling, vision, image generation, reasoning`;
