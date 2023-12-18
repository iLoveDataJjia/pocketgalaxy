import { BorderBox } from "../atoms/BorderBox";
import { useMemo } from "react";
import { Text } from "../atoms/Text";

interface Props {
  text: string;
  status: "success" | "info" | "warning" | "error";
}

export function Toaster({ text, status }: Props) {
  const convertStatusToBorderBoxColor = () => {
    switch (status) {
      case "success":
        return "emerald";
      case "info":
        return "sky";
      case "warning":
        return "amber";
      case "error":
        return "rose";
    }
  };
  const convertStatusToPrefix = useMemo(
    () => ({
      ["success"]: "✓",
      ["info"]: "🛈",
      ["warning"]: "⚠",
      ["error"]: "✗",
    }),
    []
  );

  const bgColorCSS = convertStatusToBorderBoxColor();
  const textStatus = convertStatusToPrefix[status];
  return (
    <BorderBox rounded="xl" color={bgColorCSS}>
      <div className="flex justify-center items-center px-5 pt-1 pb-0.5 space-x-1.5">
        <Text text={textStatus} className="font-semibold" />
        <Text text={text} />
      </div>
    </BorderBox>
  );
}
