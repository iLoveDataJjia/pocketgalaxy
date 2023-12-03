import { MouseEventHandler } from "react";
import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import { ConnectorImage } from "../atoms/ConnectorImage";
import { ConnectorType } from "@/helpers/ConnectorType";
import { BorderBox } from "@/components/atoms/BorderBox";
import { StatusType } from "@/helpers/StatusType";

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
      <BorderBox status={StatusType.Neutral} border="lg">
        <button onClick={onClick} className="w-12 h-12">
          <ConnectorImage type={type} size="sm" />
        </button>
      </BorderBox>
      <StrokedLabel text={type.toString()} className="select-none text-white" />
    </div>
  );
}
