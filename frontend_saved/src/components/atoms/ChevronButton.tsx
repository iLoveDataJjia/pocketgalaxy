import { MouseEventHandler } from "react";
import Image from "next/image";

export function ChevronButton({
  type,
  active,
  className,
  onClick,
}: {
  type: "left" | "right";
  active: boolean;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={className ? className : ""}
      onClick={onClick}
      disabled={!active}
    >
      <Image
        src="/icons/Chevron.webp"
        width={15}
        height={25}
        alt="Chevron"
        className={
          (!active ? "opacity-50" : "") + (type == "right" ? " rotate-180" : "")
        }
      />
    </button>
  );
}
