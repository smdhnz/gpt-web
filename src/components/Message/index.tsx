import { Stack, Text, Divider } from "@mantine/core";
import { Markdown } from "./Markdown";

type Props = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const Message = (props: Props) => {
  return (
    <>
      <Stack spacing="xs" py="1.2rem">
        <Text size="xs" color="dimmed" fw="bold" transform="capitalize">
          {props.role}
        </Text>
        {props.role === "user" ? (
          <Text fz="0.875rem" sx={{ whiteSpace: "pre-wrap" }}>
            {props.content}
          </Text>
        ) : (
          <Markdown content={props.content} />
        )}
      </Stack>
      <Divider />
    </>
  );
};
