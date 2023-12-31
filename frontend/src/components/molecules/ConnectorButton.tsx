import { ConnectorImg } from "../atoms/ConnectorImg";
import { BorderBox } from "../atoms/BorderBox";
import { StrokedText } from "../atoms/StrokedText";
import { Connector } from "../../helpers/Connector";

interface Props {
  connector: Connector;
  className?: string;
  onClick?: React.MouseEventHandler;
}

export function ConnectorButton({ connector, className, onClick }: Props) {
  return (
    <div
      className={
        "flex flex-col space-y-1 items-center w-16" +
        (className ? ` ${className}` : "")
      }
    >
      <button onClick={onClick}>
        <BorderBox
          rounded="xl"
          className="cursor-pointer flex items-center justify-center w-16 h-16 p-2.5"
        >
          <ConnectorImg
            connector={connector}
            className="select-none max-w-full max-h-full"
          />
        </BorderBox>
      </button>
      <label>
        <StrokedText text={connector} className="text-xs font-bold" />
      </label>
    </div>
  );
}
