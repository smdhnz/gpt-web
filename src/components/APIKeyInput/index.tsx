import type { ChangeEvent, TouchEvent } from "react";
import { TextInput, type TextInputProps } from "@mantine/core";
import { useAtom } from "jotai";
import { apiKeyAtom } from "../../atoms/apiKeyAtom";

export const APIKeyInput = (props: TextInputProps) => {
  const [apiKey, setApiKey] = useAtom(apiKeyAtom);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.currentTarget.value);
  };

  const disableZoom = (e: TouchEvent<HTMLTextAreaElement>) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  };

  return (
    <TextInput
      {...{
        type: "password",
        label: "Your API key",
        value: apiKey,
        onChange,
        onTouchStart: disableZoom,
        ...props,
      }}
    />
  );
};
