import Image from "next/image";
import { MouseEventHandler } from "react";

export function ConnectorButton({
  type,
  onClick,
}: {
  type: "PostgreSQL" | "MySQL" | "MariaDB" | "MongoDB" | "MinIO";
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-300 backdrop-blur-sm w-12 h-12 rounded-lg border-2 border-black"
    >
      <Image
        src={`/connectors/${type}.webp`}
        width={36}
        height={36}
        alt={type}
        className="m-auto max-h-9 max-w-min"
      />
    </button>
  );
}
