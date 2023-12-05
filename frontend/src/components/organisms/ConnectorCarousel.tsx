import { StrokedText } from "../atoms/StrokedText";
import { ConnectorButton } from "../molecules/ConnectorButton";

export function ConnectorCarousel() {
  return (
    <div className="relative">
      <StrokedText
        text="←"
        className="font-bold text-base absolute md:hidden"
      />
      <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide snap-x">
        <ConnectorButton
          connector="PostgreSQL"
          className="snap-center"
          onClick={() => console.log("TODO - PostgreSQL Create")}
        />
        <ConnectorButton
          connector="MySQL"
          className="snap-center"
          onClick={() => console.log("TODO - MySQL Create")}
        />
        <ConnectorButton
          connector="MariaDB"
          className="snap-center"
          onClick={() => console.log("TODO - MariaDB Create")}
        />
        <ConnectorButton
          connector="MongoDB"
          className="snap-center"
          onClick={() => console.log("TODO - MongoDB Create")}
        />
        <ConnectorButton
          connector="MinIO"
          className="snap-center"
          onClick={() => console.log("TODO - MinIO Create")}
        />
      </div>
    </div>
  );
}
