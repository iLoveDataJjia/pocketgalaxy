import { ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
  rounded: "xl" | "full";
  className?: string;
}

export function BorderBox({ children, rounded, className }: Props) {
  const convertToCSS = useMemo(
    () => ({ xl: "rounded-xl", full: "rounded-full" }),
    []
  );
  const roundedCSS = convertToCSS[rounded];

  return (
    <div
      className={
        "border-black border-2 bg-neutral-300" +
        ` ${roundedCSS}` +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </div>
  );
}
