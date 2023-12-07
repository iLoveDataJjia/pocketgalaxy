import { BodyText } from "@/components/atoms/BodyText";
import { ConnectorImage } from "@/components/atoms/ConnectorImage";
import { ConnectorType } from "@/helpers/ConnectorType";

export function ConnectorLabel({
  type,
  className,
}: {
  type: ConnectorType;
  className?: string;
}) {
  return (
    <div
      className={
        "space-y-1 flex flex-col items-center" +
        (className ? ` ${className}` : "")
      }
    >
      <ConnectorImage type={type} size="base" />
      <BodyText text={type.toString()} />
    </div>
  );
}
