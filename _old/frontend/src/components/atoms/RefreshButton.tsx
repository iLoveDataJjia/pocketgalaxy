import Image from "next/image";
import { MouseEventHandler } from "react";

export function RefreshButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick}>
      <Image src={"/icons/Refresh.webp"} width={10} height={10} alt="Refresh" />
    </button>
  );
}
