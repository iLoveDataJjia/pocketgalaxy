import { MouseEventHandler } from "react";

export function PreviousButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="flex font-bold text-xs h-3 -translate-y-0.5 text-white"
    >
      <p className="absolute">←</p>
      <p className="select-none" style={{ WebkitTextStroke: "2px black" }}>
        ←
      </p>
    </button>
  );
}
