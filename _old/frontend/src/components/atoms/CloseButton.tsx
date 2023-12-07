import { MouseEventHandler } from "react";

export function CloseButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick} className="italic text-xs translate-y-[1px]">
      ✘
    </button>
  );
}
