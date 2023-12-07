import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import { BorderBox } from "../atoms/BorderBox";
import { StatusType } from "@/helpers/StatusType";

interface Props {
  label: string;
  required: boolean;
  type: "text" | "number" | "password";
}

export const InputTextField = ({ label, required, type }: Props) => {
  return (
    <div className="space-y-1">
      <label className="flex space-x-1">
        <StrokedLabel text={label} className="text-white" />
        <StrokedLabel text={required ? "*" : ""} className="text-rose-500" />
      </label>
      <BorderBox status={StatusType.Neutral} border="full">
        <input
          name={label}
          type={type}
          placeholder="Empty"
          className="w-full text-xs h-7 px-3 hide-spinner bg-transparent focus:outline-none"
        />
      </BorderBox>
    </div>
  );
};
