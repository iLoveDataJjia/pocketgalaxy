import { ChevronButton } from "@/components/atoms/ChevronButton";
import { ConnectorButtonLabeled } from "@/components/molecules/ConnectorButtonLabeled";
import { useState, useMemo } from "react";

export function ConnectorCarousel() {
  const allConnectors = useMemo(
    () => [
      <ConnectorButtonLabeled
        key="PostgreSQL"
        type="PostgreSQL"
        onClick={() => console.log("PostgreSQL")}
      />,
      <ConnectorButtonLabeled
        key="MySQL"
        type="MySQL"
        onClick={() => console.log("MySQL")}
      />,
      <ConnectorButtonLabeled
        key="MariaDB"
        type="MariaDB"
        onClick={() => console.log("MariaDB")}
      />,
      <ConnectorButtonLabeled
        key="MongoDB"
        type="MongoDB"
        onClick={() => console.log("MongoDB")}
      />,
      <ConnectorButtonLabeled
        key="MinIO"
        type="MinIO"
        onClick={() => console.log("MinIO")}
      />,
    ],
    []
  );

  const [startIdx, setStartIdx] = useState(0);
  const shownConnectors = allConnectors.filter(
    (_, idx) => startIdx <= idx && idx < startIdx + 4
  );

  return (
    <div className="flex items-center space-x-3">
      <ChevronButton
        type="left"
        className="-translate-y-2"
        active={0 < startIdx}
        onClick={() => 0 < startIdx && setStartIdx((_) => _ - 1)}
      />
      {shownConnectors}
      <ChevronButton
        type="right"
        className="-translate-y-2"
        active={!(startIdx + 4 == allConnectors.length)}
        onClick={() =>
          startIdx + 4 < allConnectors.length && setStartIdx((_) => _ + 1)
        }
      />
    </div>
  );
}
