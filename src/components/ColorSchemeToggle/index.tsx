import { SegmentedControl, Center, Box } from "@mantine/core";
import { TbSun, TbMoon } from "react-icons/tb";
import { useAtom } from "jotai";
import { toggleColorSchemeAtom } from "../../atoms/colorSchemaAtom";

export const ColorSchemeToggle = () => {
  const [colorScheme, toggleColorScheme] = useAtom(toggleColorSchemeAtom);
  return (
    <SegmentedControl
      value={colorScheme}
      onChange={() => toggleColorScheme()}
      data={[
        {
          value: "light",
          label: (
            <Center>
              <TbSun size="1rem" />
              <Box ml={10}>Light</Box>
            </Center>
          ),
        },
        {
          value: "dark",
          label: (
            <Center>
              <TbMoon size="1rem" />
              <Box ml={10}>Dark</Box>
            </Center>
          ),
        },
      ]}
    />
  );
};
