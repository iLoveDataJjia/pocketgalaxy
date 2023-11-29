import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import { ChangeEventHandler } from "react";

export function InputTextField({
  label,
  isRequired,
  value,
  onChange,
}: {
  label: string;
  isRequired: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="space-x-1">
      <label className="flex space-x-1">
        <StrokedLabel text={label} className="text-white" />
        <StrokedLabel text={isRequired ? "*" : ""} className="text-rose-500" />
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder="Empty"
        className="bg-neutral-300 text-xs opacity-90 h-7 rounded-full border-2 border-black px-3"
      />
    </div>
  );
}
