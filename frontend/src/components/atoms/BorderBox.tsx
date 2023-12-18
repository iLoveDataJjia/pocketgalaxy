import { ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
  rounded: "xl" | "full";
  color?: "emerald" | "sky" | "amber" | "rose";
  className?: string;
}

export function BorderBox({ children, rounded, color, className }: Props) {
  const convertRoundedToCSS = useMemo(
    () => ({ xl: "rounded-xl", full: "rounded-full" }),
    []
  );
  const convertColorToCSS = useMemo(
    () => ({
      ["emerald"]: "bg-emerald-500",
      ["sky"]: "bg-sky-500",
      ["amber"]: "bg-amber-500",
      ["rose"]: "bg-rose-500",
    }),
    []
  );

  const roundedCSS = convertRoundedToCSS[rounded];
  const bgColorCSS = color ? convertColorToCSS[color] : "bg-neutral-300";
  return (
    <div
      className={
        "border-black border-2" +
        ` ${roundedCSS} ${bgColorCSS}` +
        (className ? ` ${className}` : "")
      }
    >
      {children}
    </div>
  );
}
