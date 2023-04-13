import { Navbar as MtNavbar, Stack, Divider, ScrollArea } from "@mantine/core";
import { SaveModalButton } from "./SaveModalButton";
import { ClearButton } from "./ClearButton";
import { ChatList } from "./ChatList";
import { ColorSchemeToggle } from "../ui/ColorSchemeToggle";
import { APIKeyInput } from "../ui/APIKeyInput";

export const Navbar = () => {
  return (
    <MtNavbar width={{ xs: 250 }} p="1rem">
      <Stack mb="1rem">
        <ColorSchemeToggle />
        <Divider />
        <APIKeyInput />
        <Divider />
        <ClearButton />
        <SaveModalButton />
        <Divider />
      </Stack>
      <MtNavbar.Section grow component={ScrollArea}>
        <ChatList />
      </MtNavbar.Section>
    </MtNavbar>
  );
};
