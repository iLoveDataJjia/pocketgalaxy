import { MouseEventHandler } from "react";

export function NextButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="font-bold text-xs h-3 -translate-y-0.5"
    >
      →
    </button>
  );
}
