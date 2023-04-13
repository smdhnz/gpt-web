import { Button } from "@mantine/core";
import { useSetAtom } from "jotai";
import { clearAtom } from "@/atoms/messageAtom";

export const ClearButton = () => {
  const clear = useSetAtom(clearAtom);

  return (
    <Button variant="default" onClick={clear}>
      Clear chat
    </Button>
  );
};
