import { OpenAI } from "openai-streams";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";
import { atom } from "jotai";
import {
  ommitedMessages,
  promiseWithTimeout,
  handleStreamData,
} from "../utils";
import { apiKeyAtom } from "./apiKeyAtom";

export type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};
export type Chat = {
  id: string;
  name: string;
  messages: Message[];
};

export const promptAtom = atom("");
export const messagesAtom = atom<Message[]>([]);
export const historyAtom = atom<Chat[]>([]);
export const isLoadingAtom = atom(false);

export const clearAtom = atom(null, (_, set) => {
  set(messagesAtom, []);
});

export const saveAtom = atom(null, (get, set, name: string) => {
  set(historyAtom, (prev) => [
    ...prev,
    {
      id: createId(),
      name,
      messages: get(messagesAtom),
    },
  ]);
});

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
    const stream = await promiseWithTimeout(
      OpenAI(
        "chat",
        {
          model: "gpt-3.5-turbo",
          messages: messages.map(({ role, content }) => ({ role, content })),
        },
        { apiKey: get(apiKeyAtom) }
      ),
      5000
    );

    let isFirst = true;

    await handleStreamData(stream, (content) => {
      set(messagesAtom, (prev) => {
        if (isFirst) {
          isFirst = false;
          return [...prev, { id: createId(), role: "assistant", content }];
        } else {
          return [
            ...prev.slice(0, -1),
            {
              ...prev.slice(-1)[0],
              content: prev.slice(-1)[0].content + content,
            },
          ];
        }
      });
    });
  } catch (e: any) {
    toast.error(e.message);
    set(messagesAtom, (prev) => prev.slice(0, -1));
  } finally {
    set(isLoadingAtom, false);
  }
});
