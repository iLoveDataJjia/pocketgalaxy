import { ConnectorType } from "@/helpers/ConnectorType";
import { ConnectorLabel } from "@/components/molecules/ConnectorLabel";
import { ConnectorInfo } from "@/components/molecules/ConnectorInfo";
import { SubText } from "@/components/atoms/SubText";
import { NextButton } from "../atoms/NextButton";
import { RefreshButton } from "../atoms/RefreshButton";
import { CloseButton } from "../atoms/CloseButton";
import { Moment } from "moment";

export function ConnectorPannel({
  type,
  name,
  updatedAt,
  isUp,
}: {
  type: ConnectorType;
  name: string;
  updatedAt: Moment;
  isUp?: boolean;
}) {
  const bgColor = (() => {
    switch (isUp) {
      case undefined:
        return "bg-amber-500";
      case false:
        return "bg-rose-500";
      case true:
        return "bg-emerald-500";
    }
  })();

  return (
    <section
      className={
        "h-[74px] w-64 justify-between flex items-center opacity-90 border-2 border-black rounded-lg" +
        ` ${bgColor}`
      }
    >
      <div className="px-3 justify-between py-1.5 space-x-3 flex items-center">
        <ConnectorLabel type={type} className="w-14" />
        <ConnectorInfo name={name} isUp={isUp} />
      </div>
      <div className="flex flex-col justify-between self-stretch pr-1 py-0.5">
        <div className="ml-auto flex items-center space-x-0.5">
          <SubText text={updatedAt.fromNow()} className="pr-0.5" />
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
