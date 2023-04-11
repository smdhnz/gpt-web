import { Navbar as MtNavbar, Stack, Divider } from "@mantine/core";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { APIKeyInput } from "../APIKeyInput";

export const Navbar = () => {
  return (
    <MtNavbar width={{ base: 250 }}>
      <Stack p="1rem">
        <ColorSchemeToggle />
        <Divider />
        <APIKeyInput />
        <Divider />
      </Stack>
    </MtNavbar>
  );
};
