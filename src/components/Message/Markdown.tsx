import { Box, rem } from "@mantine/core";
import { markdownToHtml } from "@/utils";

type Props = {
  content: string;
};

export const Markdown = (props: Props) => {
  return (
    <Box
      fz="0.875rem"
      sx={(theme) => ({
        "& p": { margin: 0 },
        "& a": {
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        },
        "& code": {
          fontSize: "0.875rem",
          paddingInline: 5,
          fontFamily: theme.fontFamilyMonospace,
          borderRadius: "0.2rem",
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          captionSide: "bottom",
          marginBottom: theme.spacing.md,
          "& caption": {
            marginTop: theme.spacing.xs,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
          },
          "& th": {
            textAlign: "left",
            fontWeight: "bold",
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
            padding: `${rem(7)} ${rem(10)}`,
          },
          "& thead th": {
            borderBottom: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
            }`,
          },
          "& tfoot th": {
            borderTop: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
            }`,
          },
          "& td": {
            padding: `${rem(7)} ${rem(10)}`,
            borderBottom: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
            }`,
          },
          "& tr:last-of-type td": {
            borderBottom: "none",
          },
        },
      })}
      dangerouslySetInnerHTML={{ __html: markdownToHtml(props.content) }}
    />
  );
};
