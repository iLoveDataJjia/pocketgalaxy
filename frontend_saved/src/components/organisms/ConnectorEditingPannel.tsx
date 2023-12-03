import { ConnectorType } from "@/helpers/ConnectorType";
import { ConnectorLabel } from "@/components/molecules/ConnectorLabel";
import { ConnectorEditingInfo } from "../molecules/ConnectorEditingInfo";
import { StrokedSubText } from "../atoms/StrokedSubText";
import { PreviousButton } from "../atoms/PreviousButton";

export function ConnectorEditingPannel({
  type,
  name,
}: {
  type: ConnectorType;
  name: string;
}) {
  return (
    <section className="items-center flex space-x-1.5">
      <div className="flex flex-col items-end">
        <StrokedSubText text="Tap to" />
        <StrokedSubText text="go back" />
        <PreviousButton onClick={() => console.log("Previous")} />
      </div>
      <div className="px-3 py-1.5 space-x-3 h-[74px] w-60 flex items-center opacity-90 border-2 border-black rounded-lg bg-neutral-300">
        <ConnectorLabel type={type} className="w-14" />
        <ConnectorEditingInfo name={name} />
      </div>
    </section>
  );
}
