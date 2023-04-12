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
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .processSync(text);

  return result.toString();
};

// =================================================================

import GPT3Tokenizer from "gpt3-tokenizer";
import type { Message } from "./atoms/messageAtom";

const MAX_TOKENS = 4096;
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
