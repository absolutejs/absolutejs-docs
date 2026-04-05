export const angularAIStreamReturn = `\
// AIStreamService.connect() return type (uses Angular signals)
{
  send: (content: string, attachments?: AIAttachment[]) => void;
  cancel: () => void;
  branch: (messageId: string, content: string) => void;

  messages: Signal<AIMessage[]>;   // Angular computed signal
  isStreaming: Signal<boolean>;    // Angular computed signal
  error: Signal<string | null>;   // Angular computed signal
}`;
export const angularAIStreamService = `\
import { Component, OnInit } from '@angular/core';
import { AIStreamService } from '@absolutejs/absolute/angular/ai';

@Component({
  selector: 'app-chat',
  template: \`
    @for (msg of messages(); track msg.id) {
      <div>
        <strong>{{ msg.role }}:</strong> {{ msg.content }}
        @if (msg.thinking) {
          <details>
            <summary>Thinking</summary>
            <p>{{ msg.thinking }}</p>
          </details>
        }
      </div>
    }

    @if (streaming()) {
      <button (click)="cancel()">Stop</button>
    }
    @if (err()) {
      <p style="color: red">{{ err() }}</p>
    }
  \`,
})
export class ChatComponent implements OnInit {
  private ai!: ReturnType<AIStreamService['connect']>;

  messages = () => this.ai?.messages() ?? [];
  streaming = () => this.ai?.isStreaming() ?? false;
  err = () => this.ai?.error() ?? null;

  constructor(private aiService: AIStreamService) {}

  ngOnInit() {
    this.ai = this.aiService.connect('/chat');
  }

  send(text: string) {
    this.ai.send(text);
  }

  cancel() {
    this.ai.cancel();
  }
}`;
export const reactAttachments = `\
import { useAIStream } from '@absolutejs/absolute/react/ai';
import type { AIAttachment } from '@absolutejs/absolute';

const ChatWithFiles = () => {
  const { send } = useAIStream('/chat');

  const handleFileUpload = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    const attachment: AIAttachment = {
      data: base64,
      media_type: file.type as AIAttachment['media_type'],
      name: file.name,
    };

    send('Describe this image', [attachment]);
  };

  return <input type="file" onChange={(e) => {
    if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
  }} />;
};`;
export const reactProvider = `\
import { AIStreamProvider } from '@absolutejs/absolute/react/ai';

// Wrap your app to share a single WebSocket connection
export const App = ({ children }: { children: React.ReactNode }) => (
  <AIStreamProvider path="/chat">
    {children}
  </AIStreamProvider>
);

// Any descendant can call useAIStream() without a path
import { useAIStream } from '@absolutejs/absolute/react/ai';

const ChatWidget = () => {
  // Uses the connection from AIStreamProvider
  const { messages, send } = useAIStream();
  // ...
};`;
export const reactUseAIStream = `\
import { useAIStream } from '@absolutejs/absolute/react/ai';

export const Chat = ({ conversationId }: { conversationId?: string }) => {
  const { messages, send, cancel, branch, isStreaming, error } =
    useAIStream('/chat', conversationId);

  const handleSend = (text: string) => {
    send(text);
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
          {msg.thinking && (
            <details>
              <summary>Thinking</summary>
              <p>{msg.thinking}</p>
            </details>
          )}
          {msg.toolCalls?.map((tool) => (
            <details key={tool.name}>
              <summary>Tool: {tool.name}</summary>
              <pre>{tool.result}</pre>
            </details>
          ))}
        </div>
      ))}

      {isStreaming && <button onClick={cancel}>Stop</button>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};`;
export const reactUseAIStreamReturn = `\
// useAIStream return type
{
  // Send a message with optional file attachments
  send: (content: string, attachments?: AIAttachment[]) => void;

  // Cancel the current streaming response
  cancel: () => void;

  // Branch conversation from a specific message
  branch: (messageId: string, content: string) => void;

  // Current conversation messages
  messages: AIMessage[];

  // Whether a response is currently streaming
  isStreaming: boolean;

  // Error message or null
  error: string | null;
}`;
export const svelteCreateAIStream = `\
<script lang="ts">
  import { createAIStream } from '@absolutejs/absolute/svelte/ai';

  const ai = createAIStream('/chat');

  const handleSend = (text: string) => {
    ai.send(text);
  };
</script>

<div>
  {#each ai.messages as msg (msg.id)}
    <div>
      <strong>{msg.role}:</strong> {msg.content}
      {#if msg.thinking}
        <details>
          <summary>Thinking</summary>
          <p>{msg.thinking}</p>
        </details>
      {/if}
    </div>
  {/each}

  {#if ai.isStreaming}
    <button onclick={() => ai.cancel()}>Stop</button>
  {/if}
  {#if ai.error}
    <p style="color: red">{ai.error}</p>
  {/if}
</div>`;
export const svelteCreateAIStreamReturn = `\
// createAIStream return type (uses getter properties for reactivity)
{
  send: (content: string, attachments?: AIAttachment[]) => void;
  cancel: () => void;
  branch: (messageId: string, content: string) => void;
  destroy: () => void; // Clean up connection manually

  get messages(): AIMessage[];    // Reactive getter
  get isStreaming(): boolean;     // Reactive getter
  get error(): string | null;    // Reactive getter
}`;
export const vanillaAttachments = `\
import { createAIStream } from '@absolutejs/absolute/ai/client';
import type { AIAttachment } from '@absolutejs/absolute';

const ai = createAIStream('/chat');

const sendWithFile = async (text: string, file: File) => {
  const buffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  const attachment: AIAttachment = {
    data: base64,
    media_type: file.type as AIAttachment['media_type'],
    name: file.name,
  };

  ai.send(text, [attachment]);
};`;
export const vanillaCreateAIStream = `\
import { createAIStream } from '@absolutejs/absolute/ai/client';

const ai = createAIStream('/chat');

// Subscribe to state changes
ai.subscribe(() => {
  renderMessages(ai.messages);
  toggleSpinner(ai.isStreaming);
  showError(ai.error);
});

// Send a message
document.querySelector('#send')!.addEventListener('click', () => {
  const input = document.querySelector<HTMLInputElement>('#input')!;
  ai.send(input.value);
  input.value = '';
});

// Cancel streaming
document.querySelector('#cancel')!.addEventListener('click', () => {
  ai.cancel();
});`;
export const vanillaCreateAIStreamReturn = `\
// createAIStream return type
{
  send: (content: string, attachments?: AIAttachment[]) => void;
  cancel: () => void;
  branch: (messageId: string, content: string) => void;
  destroy: () => void;

  // Subscribe to state changes : returns an unsubscribe function
  subscribe: (callback: () => void) => () => void;

  get messages(): AIMessage[];    // Current conversation messages
  get isStreaming(): boolean;     // Whether a response is streaming
  get error(): string | null;    // Error message or null
}`;
export const vanillaRenderExample = `\
import { createAIStream } from '@absolutejs/absolute/ai/client';
import type { AIMessage } from '@absolutejs/absolute';

const ai = createAIStream('/chat');
const container = document.querySelector<HTMLElement>('#messages')!;

const renderMessage = (msg: AIMessage) => {
  const div = document.createElement('div');
  div.className = \`message \${msg.role}\`;
  div.textContent = msg.content;

  if (msg.thinking) {
    const details = document.createElement('details');
    details.innerHTML = \`<summary>Thinking</summary><p>\${msg.thinking}</p>\`;
    div.appendChild(details);
  }

  if (msg.toolCalls) {
    for (const tool of msg.toolCalls) {
      const details = document.createElement('details');
      details.innerHTML = \`<summary>Tool: \${tool.name}</summary><pre>\${tool.result ?? ''}</pre>\`;
      div.appendChild(details);
    }
  }

  return div;
};

ai.subscribe(() => {
  container.replaceChildren(...ai.messages.map(renderMessage));
});`;
export const vueProvide = `\
<script setup lang="ts">
import { provide } from 'vue';
import { useAIStream, AIStreamKey } from '@absolutejs/absolute/vue/ai';

// Create the stream and provide it to descendants
const ai = useAIStream('/chat');
provide(AIStreamKey, ai);
</script>

<!-- Child component -->
<script setup lang="ts">
import { inject } from 'vue';
import { AIStreamKey } from '@absolutejs/absolute/vue/ai';

const ai = inject(AIStreamKey)!;
// ai.messages, ai.send, ai.cancel, etc.
</script>`;
export const vueUseAIStream = `\
<script setup lang="ts">
import { useAIStream } from '@absolutejs/absolute/vue/ai';

const { messages, send, cancel, branch, isStreaming, error } =
  useAIStream('/chat');

const handleSend = (text: string) => {
  send(text);
};
</script>

<template>
  <div>
    <div v-for="msg in messages" :key="msg.id">
      <strong>{{ msg.role }}:</strong> {{ msg.content }}
      <details v-if="msg.thinking">
        <summary>Thinking</summary>
        <p>{{ msg.thinking }}</p>
      </details>
    </div>

    <button v-if="isStreaming" @click="cancel()">Stop</button>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>`;
export const vueUseAIStreamReturn = `\
// useAIStream return type (all values are Vue refs)
{
  send: (content: string, attachments?: AIAttachment[]) => void;
  cancel: () => void;
  branch: (messageId: string, content: string) => void;
  destroy: () => void; // Clean up connection manually

  messages: ShallowRef<AIMessage[]>;
  isStreaming: Ref<boolean>;
  error: Ref<string | null>;
}`;
