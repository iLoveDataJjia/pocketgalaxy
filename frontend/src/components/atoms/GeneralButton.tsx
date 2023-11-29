import { MouseEventHandler } from "react";

export function GeneralButton({
  text,
  color,
  active,
  onClick,
}: {
  text: string;
  color: "post" | "get" | "put";
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const bgColor = (() => {
    switch (color) {
      case "post":
        return "bg-emerald-500";
      case "get":
        return "bg-sky-500";
      case "put":
        return "bg-amber-500";
    }
  })();

  return (
    <button
      onClick={onClick}
      disabled={!active}
      className={
        "text-xs font-medium opacity-90 h-9 w-32 rounded-lg border-2 border-black" +
        (active ? ` ${bgColor}` : ` bg-transparent`)
      }
    >
      {text}
    </button>
  );
}
