import { SectionTitle } from "@/components/atoms/SectionTitle";
import { BodyText } from "@/components/atoms/BodyText";

export function ConnectorEditingInfo({ name }: { name: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <SectionTitle text={name} className="w-24 truncate" />
      <BodyText text={"Editing . . ."} />
    </div>
  );
}
