import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export const markdownToHtml = (text: string) => {
  const result = remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify)
    .processSync(text);

  return result.toString();
};

// =================================================================

import GPT3Tokenizer from "gpt3-tokenizer";
import type { Message } from "./atoms/messageAtom";

const MAX_TOKENS = 4096 - 6;
const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
const getTokens = (str: string): number => tokenizer.encode(str).bpe.length;

export const ommitedMessages = (chat: Message[]): Message[] => {
  const tokenLength = chat.reduce((sum, message) => {
    return sum + getTokens(message.content);
  }, 0);

  if (tokenLength < MAX_TOKENS) return chat;

  chat.splice(0, 1);

  return ommitedMessages(chat);
};

// =================================================================

export function promiseWithTimeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error("Promise timed out")
): Promise<T> {
  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });
  // returns a race between timeout and the passed promise
  return Promise.race<T>([promise, timeout]);
}

// =================================================================

export const handleStreamData = async (
  stream: ReadableStream,
  callback: (value: string) => void
) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    callback(decoder.decode(value));
  }
};
