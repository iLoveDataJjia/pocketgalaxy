import { SectionTitle } from "@/components/atoms/SectionTitle";
import { BodyText } from "@/components/atoms/BodyText";

export function ConnectorInfo({
  name,
  isUp,
}: {
  name: string;
  isUp?: boolean;
}) {
  const statusDesc = (() => {
    switch (isUp) {
      case undefined:
        return "Connecting . . .";
      case false:
        return "Failed ✗";
      case true:
        return "Connected ✓";
    }
  })();

  return (
    <div className="flex flex-col space-y-1">
      <SectionTitle text={name} className="w-24 truncate" />
      <BodyText text={statusDesc} />
      <BodyText text={"Cancelled"} />
    </div>
  );
}
