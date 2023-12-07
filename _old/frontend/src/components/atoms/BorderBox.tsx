import { StatusType } from "@/helpers/StatusType";
import { ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
  border: "lg" | "full";
  status: StatusType;
}

export const BorderBox = ({ children, status, border }: Props) => {
  const bordersCSS = useMemo(
    () => ({ ["lg"]: "rounded-lg", ["full"]: "rounded-full" }),
    []
  );
  const borderCSS = bordersCSS[border];

  const bgColorsCSS = useMemo(
    () => ({
      [StatusType.Neutral]: "bg-neutral-300",
      [StatusType.Success]: "bg-emerald-500",
      [StatusType.Info]: "bg-sky-500",
      [StatusType.Warning]: "bg-amber-500",
      [StatusType.Error]: "bg-neutral-300",
    }),
    []
  );
  const bgColorCSS = bgColorsCSS[status];

  return (
    <div
      className={`border-2 border-black opacity-90 ${borderCSS} ${bgColorCSS}`}
    >
      {children}
    </div>
  );
};
