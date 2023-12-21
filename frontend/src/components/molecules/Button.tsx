import { useMemo } from "react";
import { BorderBox } from "../atoms/BorderBox";
import { Text } from "../atoms/Text";
import Spinner from "../../assets/svgs/spinner.svg?react";

interface Props {
  label: string;
  color: "emerald" | "sky" | "amber" | "rose";
  loading: boolean;
  disabled: boolean;
  onClick?: React.MouseEventHandler;
}

export function Button({ label, color, loading, disabled, onClick }: Props) {
  const convertColorToCSS = useMemo(
    () => ({
      ["emerald"]: "bg-emerald-500",
      ["sky"]: "bg-sky-500",
      ["amber"]: "bg-amber-500",
      ["rose"]: "bg-rose-500",
    }),
    []
  );

  const bgColorCSS = convertColorToCSS[color];
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={loading || disabled}
    >
      <BorderBox
        rounded="full"
        color={color}
        className={
          "w-[7.5rem] h-9 flex items-center justify-center" +
          ` ${bgColorCSS}` +
          (disabled ? " bg-opacity-50" : "")
        }
      >
        {loading ? (
          <Spinner className="h-3/5 animate-spin" />
        ) : (
          <label>
            <Text
              text={label}
              className={"font-medium" + (disabled ? "" : " cursor-pointer")}
            />
          </label>
        )}
      </BorderBox>
    </button>
  );
}
