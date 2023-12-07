import { StatusType } from "@/helpers/StatusType";
import { BorderBox } from "@/components/atoms/BorderBox";
import { useMemo } from "react";

interface Props {
  text: string;
  status: StatusType;
  className?: string;
}

export const Toaster = ({ text, status }: Props) => {
  const textPrefix = useMemo(
    () => ({
      [StatusType.Success]: "✓ ",
      [StatusType.Warning]: "! ",
      [StatusType.Info]: "🛈",
      [StatusType.Error]: "✗",
    }),
    []
  );
  const textDisplayed = `${textPrefix[status]} ${text}`;

  return (
    <BorderBox status={status} border="lg">
      <div className="flex justify-center items-center px-2 py-0.5">
        <span className="text-[10px]">{textDisplayed}</span>
      </div>
    </BorderBox>
  );
};
