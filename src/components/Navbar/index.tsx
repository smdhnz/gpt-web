import { Navbar as MtNavbar, Stack, Divider, Button } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { APIKeyInput } from "../APIKeyInput";
import { useSetAtom } from "jotai";
import { messagesAtom } from "../../atoms/messageAtom";

export const Navbar = () => {
  const setMessages = useSetAtom(messagesAtom);
  const clear = () => setMessages([]);

  return (
    <MtNavbar width={{ xs: 250 }}>
      <Stack p="1rem">
        <ColorSchemeToggle />
        <Divider />
        <APIKeyInput />
        <Divider />
        <Button color="dark" variant="default" onClick={clear}>
          Clear
        </Button>
        <Divider />
      </Stack>
    </MtNavbar>
  );
};
