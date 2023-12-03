import { StatusType } from "@/helpers/StatusType";
import { BorderBox } from "../atoms/BorderBox";
import { useMemo } from "react";

export function GeneralButton({
  text,
  tag,
  active,
  formAction,
}: {
  text: string;
  tag: "post" | "get" | "put" | "delete";
  active: boolean;
  formAction: (payload: FormData) => void;
}) {
  const statuses = useMemo(
    () => ({
      ["post"]: StatusType.Success,
      ["get"]: StatusType.Info,
      ["put"]: StatusType.Warning,
      ["delete"]: StatusType.Error,
    }),
    []
  );
  const status = statuses[tag];

  return (
    <BorderBox border="lg" status={status}>
      <button
        disabled={!active}
        className="text-xs font-medium h-9 w-32"
        formAction={formAction}
      >
        {text}
      </button>
    </BorderBox>
  );
}
