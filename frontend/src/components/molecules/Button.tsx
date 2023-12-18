import { useMemo } from "react";
import { BorderBox } from "../atoms/BorderBox";

interface Props {
  label: string;
  color: "emerald" | "sky" | "amber" | "rose";
  onClick?: React.MouseEventHandler;
}

export function Button({ label, color, onClick }: Props) {
  const convertColorToCSS = useMemo(
    () => ({
      ["emerald"]: "bg-emerald-500",
      ["sky"]: "bg-sky-500",
      ["amber"]: "bg-amber-500",
      ["rose"]: "bg-rose-500",
    }),
    []
  );

  const bgColorCSS = convertColorToCSS[color];
  return (
    <button onClick={onClick}>
      <BorderBox
        rounded="full"
        color={color}
        className={
          "w-[7.5rem] h-9 flex items-center justify-center" + ` ${bgColorCSS}`
        }
      >
        <label className="text-black font-medium cursor-pointer">{label}</label>
      </BorderBox>
    </button>
  );
}
