import {
  MantineProvider,
  AppShell,
  Stack,
  Container,
  Box,
} from "@mantine/core";
import { Message, Navbar, PromptInput } from "./components";
import { Toaster } from "sonner";
import { useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { useRef, useEffect } from "react";
import { colorSchemeAtom } from "./atoms/colorSchemaAtom";
import { messagesAtom } from "./atoms/messageAtom";

export const App = () => {
  const colorScheme = useAtomValue(colorSchemeAtom);
  const messages = useAtomValue(messagesAtom);
  const isSmallScreen = useMediaQuery("(max-width: 40rem)");
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: "Inter, Noto Sans JP, sans-serif",
          fontFamilyMonospace: "Noto Sans Mono, monospace",
          globalStyles: (_theme) => ({
            body: {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            },
            "*::-webkit-scrollbar": {
              display: "none",
            },
          }),
        }}
      >
        <Toaster richColors position="top-right" />
        <AppShell
          navbar={isSmallScreen ? undefined : <Navbar />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
          padding={0}
        >
          <Container>
            <Stack spacing={0} mih="100vh">
              {messages.map((m) => (
                <Message key={m.id} role={m.role} content={m.content} />
              ))}
              <Box sx={{ flexGrow: 1 }} mb="3rem" ref={scrollBottomRef} />
              <PromptInput pos="sticky" bottom="1rem" />
            </Stack>
          </Container>
        </AppShell>
      </MantineProvider>
    </>
  );
};
