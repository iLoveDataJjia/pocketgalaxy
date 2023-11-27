import { ConnectorType } from "@/helpers/ConnectorType";
import { ConnectorLabel } from "@/components/molecules/ConnectorLabel";
import { ConnectorInfo } from "@/components/molecules/ConnectorInfo";
import { SubText } from "@/components/atoms/SubText";
import { NextButton } from "../atoms/NextButton";
import { RefreshButton } from "../atoms/RefreshButton";
import { CloseButton } from "../atoms/CloseButton";

export function ConnectorPannel({
  type,
  name,
  updatedAt,
  isUp,
}: {
  type: ConnectorType;
  name: string;
  updatedAt: string;
  isUp: boolean;
}) {
  return (
    <section className="flex items-center bg-emerald-500 opacity-90 border-2 border-black rounded-lg">
      <div className="px-3 py-1.5 space-x-3 flex items-center">
        <ConnectorLabel type={type} />
        <ConnectorInfo
          name={name}
          statusDesc={isUp ? "Connected ✓" : "Failed ✗"}
          dataframesDesc={"Cancelled"}
        />
      </div>
      <div className="flex flex-col justify-between self-stretch pr-1 py-0.5">
        <div className="ml-auto flex items-center space-x-0.5">
          <RefreshButton onClick={() => console.log("Refresh")} />
          <CloseButton onClick={() => console.log("Close")} />
        </div>
        <div className="ml-auto flex items-center space-x-0.5">
          <SubText text="Tap to go on" />
          <NextButton onClick={() => console.log("Next")} />
        </div>
      </div>
    </section>
  );
}
