import { useDisclosure } from "@mantine/hooks";
import { Modal, Stack, Divider, ActionIcon } from "@mantine/core";
import { TbSettings } from "react-icons/tb";
import { ColorSchemeToggle } from "../ui/ColorSchemeToggle";
import { APIKeyInput } from "../ui/APIKeyInput";

export const SettingModalButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Stack p="1rem">
          <ColorSchemeToggle />
          <Divider />
          <APIKeyInput />
        </Stack>
      </Modal>

      <ActionIcon
        variant="light"
        onClick={open}
        sx={{
          position: "fixed",
          right: "0.5rem",
          top: "0.5rem",
        }}
      >
        <TbSettings />
      </ActionIcon>
    </>
  );
};
