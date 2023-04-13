import type { ChangeEvent, TouchEvent } from "react";
import { Modal, Stack, Button, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { saveAtom, messagesAtom } from "@/atoms/messageAtom";

export const SaveModalButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const save = useSetAtom(saveAtom);
  const messages = useAtomValue(messagesAtom);
  const isEmpty = messages.length === 0;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onClick = () => {
    if (!!value) {
      save(value);
      close();
    }
    setValue("");
  };

  const disableZoom = (e: TouchEvent<HTMLInputElement>) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Modal
        size={250}
        title="Save current chat"
        opened={opened}
        onClose={close}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Stack p="1rem">
          <TextInput
            label="Name"
            value={value}
            onChange={onChange}
            onTouchStart={disableZoom}
          />
          <Button color="dark" variant="default" onClick={onClick}>
            Save
          </Button>
        </Stack>
      </Modal>

      <Button
        color="dark"
        variant="default"
        onClick={isEmpty ? undefined : open}
      >
        Save
      </Button>
    </>
  );
};
