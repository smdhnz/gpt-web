import type { ChangeEvent } from "react";
import type { PaperProps } from "@mantine/core";
import { Paper, Textarea, Flex, ActionIcon } from "@mantine/core";
import { TbSend } from "react-icons/tb";
import { getHotkeyHandler } from "@mantine/hooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { promptAtom, sendAtom, isLoadingAtom } from "../../atoms/messageAtom";

export const PromptInput = (props: PaperProps) => {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const send = useSetAtom(sendAtom);
  const isLoading = useAtomValue(isLoadingAtom);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setPrompt(e.currentTarget.value);

  const submit = () => {
    if (prompt.trim().length === 0 || isLoading) return;
    send();
  };

  return (
    <Paper px="0.5rem" shadow="lg" withBorder {...props}>
      <Flex align="center">
        <Textarea
          placeholder="Send a message... (ctrl + enter)"
          variant="unstyled"
          autosize
          minRows={2}
          sx={{ flex: 1 }}
          value={prompt}
          onChange={onChange}
          onKeyDown={getHotkeyHandler([["mod+Enter", submit]])}
        />
        <ActionIcon
          size="lg"
          variant="light"
          onClick={submit}
          loading={isLoading}
        >
          <TbSend />
        </ActionIcon>
      </Flex>
    </Paper>
  );
};
