import { useRef, useState } from "react";
import { StrokedText } from "../atoms/StrokedText";
import { ConnectorButton } from "../molecules/ConnectorButton";

export function ConnectorCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + 64,
      });
      setIsAtStart(ref.current.scrollLeft === 0);
      setIsAtEnd(ref.current.scrollLeft == ref.current.scrollWidth);
    }
  };
  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - 64,
      });
      setIsAtStart(ref.current.scrollLeft === 0);
      setIsAtEnd(ref.current.scrollLeft == ref.current.scrollWidth);
    }
  };

  return (
    <div className="relative flex justify-between">
      <button
        className={
          "absolute md:hidden translate-y-5 -translate-x-[1.626rem]" +
          (isAtStart ? " opacity-50" : "")
        }
        disabled={isAtStart}
        onClick={() => scrollLeft()}
      >
        <StrokedText text="←" className="font-bold text-base" />
      </button>
      <div
        className="flex items-center space-x-4 overflow-x-auto scrollbar-hide snap-x"
        ref={ref}
      >
        <ConnectorButton
          connector="PostgreSQL"
          className="snap-start"
          onClick={() => console.log("TODO - PostgreSQL Create")}
        />
        <ConnectorButton
          connector="MySQL"
          className="snap-start"
          onClick={() => console.log("TODO - MySQL Create")}
        />
        <ConnectorButton
          connector="MariaDB"
          className="snap-start"
          onClick={() => console.log("TODO - MariaDB Create")}
        />
        <ConnectorButton
          connector="MongoDB"
          className="snap-start"
          onClick={() => console.log("TODO - MongoDB Create")}
        />
        <ConnectorButton
          connector="MinIO"
          className="snap-start"
          onClick={() => console.log("TODO - MinIO Create")}
        />
      </div>
      <button
        className={
          "absolute md:hidden right-0 translate-y-5 translate-x-[1.626rem]" +
          (isAtEnd ? " opacity-50" : "")
        }
        disabled={isAtEnd}
        onClick={() => scrollRight()}
      >
        <StrokedText text="→" className="font-bold text-base" />
      </button>
    </div>
  );
}
