import { ChevronButton } from "@/components/atoms/ChevronButton";
import { ConnectorButtonLabeled } from "@/components/molecules/ConnectorButtonLabeled";
import { useState, useMemo } from "react";
import { ConnectorType } from "@/helpers/ConnectorType";

export function ConnectorCarousel() {
  const allConnectors = useMemo(
    () => [
      <ConnectorButtonLabeled
        key={ConnectorType.PostgreSQL}
        type={ConnectorType.PostgreSQL}
        onClick={() => console.log(ConnectorType.PostgreSQL)}
      />,
      <ConnectorButtonLabeled
        key={ConnectorType.MySQL}
        type={ConnectorType.MySQL}
        onClick={() => console.log(ConnectorType.MySQL)}
      />,
      <ConnectorButtonLabeled
        key={ConnectorType.MariaDB}
        type={ConnectorType.MariaDB}
        onClick={() => console.log(ConnectorType.MariaDB)}
      />,
      <ConnectorButtonLabeled
        key={ConnectorType.MongoDB}
        type={ConnectorType.MongoDB}
        onClick={() => console.log(ConnectorType.MongoDB)}
      />,
      <ConnectorButtonLabeled
        key={ConnectorType.MinIO}
        type={ConnectorType.MinIO}
        onClick={() => console.log(ConnectorType.MinIO)}
      />,
    ],
    []
  );

  const [startIdx, setStartIdx] = useState(0);
  const shownConnectors = allConnectors.filter(
    (_, idx) => startIdx <= idx && idx < startIdx + 4
  );

  return (
    <section className="flex items-center space-x-3">
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
    </section>
  );
}
