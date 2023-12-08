import { useViewportSize } from "../../hooks/useViewportSize";
import { StrokedText } from "../atoms/StrokedText";
import { ConnectorButton } from "../molecules/ConnectorButton";
import { useState } from "react";
import { Connector } from "../../helpers/Connector";
import { useNavigate } from "react-router-dom";

export function ConnectorCarousel() {
  const { isMd } = useViewportSize();
  const [cursorIdx, setCursorIdx] = useState(1);
  const connectors = isMd
    ? Object.values(Connector)
    : Object.values(Connector).slice(cursorIdx - 1, cursorIdx + 2);

  const navigate = useNavigate();

  return (
    <div className="relative flex">
      <button
        className={
          "absolute md:hidden translate-y-5 -translate-x-4" +
          (cursorIdx == 1 ? " opacity-50" : "")
        }
        onClick={() => setCursorIdx((_) => Math.max(1, _ - 1))}
        disabled={cursorIdx == 1}
      >
        <StrokedText text="←" className="font-bold text-base" />
      </button>
      <div className="flex items-center space-x-4 mx-auto md:m-0">
        {connectors.map((conn) => (
          <ConnectorButton
            connector={conn}
            onClick={() => navigate(`/connections/create?connector=${conn}`)}
            key={conn}
          />
        ))}
      </div>
      <button
        className={
          "absolute md:hidden right-0 translate-y-5 translate-x-4" +
          (cursorIdx == connectors.length ? " opacity-50" : "")
        }
        onClick={() => setCursorIdx((_) => Math.min(_ + 1, connectors.length))}
        disabled={cursorIdx == connectors.length}
      >
        <StrokedText text="→" className="font-bold text-base" />
      </button>
    </div>
  );
}
