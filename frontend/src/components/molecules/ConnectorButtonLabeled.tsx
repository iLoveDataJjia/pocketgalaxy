import { MouseEventHandler } from "react";
import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import Image from "next/image";
import { ConnectorImage } from "../atoms/ConnectorImage";

export function ConnectorButtonLabeled({
  type,
  onClick,
  className,
}: {
  type: "PostgreSQL" | "MySQL" | "MariaDB" | "MongoDB" | "MinIO";
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <div
      className={
        "space-y-1 flex flex-col items-center w-12" +
        (className ? ` ${className}` : "")
      }
    >
      <button
        onClick={onClick}
        className="bg-neutral-300 backdrop-blur-sm w-12 h-12 rounded-lg border-2 border-black"
      >
        <ConnectorImage type={type} size="sm" />
      </button>
      <StrokedLabel text={type} className="select-none text-white" />
    </div>
  );
}
