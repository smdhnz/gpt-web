import { Navbar as MtNavbar, Stack, Divider } from "@mantine/core";
import { SaveModalButton } from "./SaveModalButton";
import { ClearButton } from "./ClearButton";
import { ColorSchemeToggle } from "../ui/ColorSchemeToggle";
import { APIKeyInput } from "../ui/APIKeyInput";

export const Navbar = () => {
  return (
    <MtNavbar width={{ xs: 250 }}>
      <Stack p="1rem">
        <ColorSchemeToggle />
        <Divider />
        <APIKeyInput />
        <Divider />
        <ClearButton />
        <SaveModalButton />
        <Divider />
      </Stack>
    </MtNavbar>
  );
};
