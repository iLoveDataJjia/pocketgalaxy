import { MouseEventHandler } from "react";
import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import { ConnectorImage } from "../atoms/ConnectorImage";
import { ConnectorType } from "@/helpers/ConnectorType";

export function ConnectorButtonLabeled({
  type,
  onClick,
  className,
}: {
  type: ConnectorType;
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
        className="bg-neutral-300 opacity-90 w-12 h-12 rounded-lg border-2 border-black"
      >
        <ConnectorImage type={type} size="sm" />
      </button>
      <StrokedLabel text={type.toString()} className="select-none text-white" />
    </div>
  );
}
