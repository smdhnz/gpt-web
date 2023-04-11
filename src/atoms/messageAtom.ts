import { OpenAI } from "openai-streams";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";
import { atom } from "jotai";
import { ommitedMessages } from "../utils";
import { apiKeyAtom } from "./apiKeyAtom";

export type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  messages: Message[];
};

export type History = Chat[];

export const promptAtom = atom("");

export const messagesAtom = atom<Message[]>([]);

export const isLoadingAtom = atom(false);

export const sendAtom = atom(null, async (get, set) => {
  const messages = ommitedMessages([
    ...get(messagesAtom),
    {
      id: createId(),
      role: "user",
      content: get(promptAtom).trim(),
    },
  ]);

  set(isLoadingAtom, true);
  set(promptAtom, "");
  set(messagesAtom, messages);

  try {
    const stream = await OpenAI(
      "chat",
      {
        model: "gpt-3.5-turbo",
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      },
      { apiKey: get(apiKeyAtom) }
    );

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let isFirst = true;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      if (isFirst) {
        isFirst = false;
        set(messagesAtom, (prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: decoder.decode(value),
          },
        ]);
      } else {
        set(messagesAtom, (prev) => [
          ...prev.slice(0, -1),
          {
            ...prev.slice(-1)[0],
            content: prev.slice(-1)[0].content + decoder.decode(value),
          },
        ]);
      }
    }
  } catch (e: any) {
    console.error(e.message);
    toast.error(e.message);
    set(messagesAtom, (prev) => prev.slice(0, -1));
  }
  set(isLoadingAtom, false);
});
