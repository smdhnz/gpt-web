import { OpenAI } from "openai-streams";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
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
export const historyAtom = atomWithStorage<Chat[]>("chat-history", []);
export const chatIdAtom = atom<string | null>(null);
export const isLoadingAtom = atom(false);

export const clearAtom = atom(null, (_get, set) => {
  set(messagesAtom, []);
  set(chatIdAtom, null);
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

export const restoreAtom = atom(
  null,
  (_get, set, id: string, messages: Message[]) => {
    set(messagesAtom, messages);
    set(chatIdAtom, id);
  }
);

export const trashAtom = atom(null, (get, set, id: string) => {
  set(historyAtom, (prev) => prev.filter((chat) => chat.id !== id));
  if (get(chatIdAtom) === id) set(chatIdAtom, null);
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
          messages: [
            { role: "system", content: "Respond using Markdown" },
            ...messages.map(({ role, content }) => ({ role, content })),
          ],
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
    set(historyAtom, (prev) => {
      const currentChatIndex = prev.findIndex(
        (chat) => chat.id === get(chatIdAtom)
      );
      if (currentChatIndex !== -1) {
        const currentChat = prev[currentChatIndex];
        return [
          ...prev.slice(0, currentChatIndex),
          { ...currentChat, messages: get(messagesAtom) },
          ...prev.slice(currentChatIndex + 1),
        ];
      }
      return prev;
    });
    set(isLoadingAtom, false);
  }
});
