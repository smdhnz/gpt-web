import { Flex, Button, ActionIcon, Stack } from "@mantine/core";
import { TbTrash } from "react-icons/tb";
import { useAtomValue, useSetAtom } from "jotai";
import { historyAtom, restoreAtom, trashAtom } from "@/atoms/messageAtom";

export const ChatList = () => {
  const history = useAtomValue(historyAtom);
  const restore = useSetAtom(restoreAtom);
  const trash = useSetAtom(trashAtom);

  return (
    <Stack>
      {history.map((chat) => (
        <Flex key={chat.id} align="center" gap="0.5rem">
          <Button
            variant="default"
            onClick={() => restore(chat.id, chat.messages)}
            sx={{ flex: 1 }}
          >
            {chat.name}
          </Button>
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => trash(chat.id)}
          >
            <TbTrash />
          </ActionIcon>
        </Flex>
      ))}
    </Stack>
  );
};
