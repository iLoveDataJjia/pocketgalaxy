import { SectionTitle } from "@/components/atoms/SectionTitle";
import { BodyText } from "@/components/atoms/BodyText";

export function ConnectorInfo({
  name,
  statusDesc,
  dataframesDesc,
}: {
  name: string;
  statusDesc: string;
  dataframesDesc: string;
}) {
  return (
    <div className="flex flex-col space-y-0.5">
      <SectionTitle text={name} className="w-24 truncate" />
      <BodyText text={statusDesc} />
      <BodyText text={dataframesDesc} />
    </div>
  );
}
