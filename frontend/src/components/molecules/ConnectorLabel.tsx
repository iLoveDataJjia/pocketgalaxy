import { BodyText } from "@/components/atoms/BodyText";
import { ConnectorImage } from "@/components/atoms/ConnectorImage";
import { ConnectorType } from "@/helpers/ConnectorType";

export function ConnectorLabel({ type }: { type: ConnectorType }) {
  return (
    <div className="space-y-1 flex flex-col items-center">
      <ConnectorImage type={type} size="base" />
      <BodyText text={type.toString()} />
    </div>
  );
}
