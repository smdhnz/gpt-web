import { atomWithStorage } from "jotai/utils";

export const apiKeyAtom = atomWithStorage("openai-api-key", "");
