import { StrokedLabel } from "@/components/atoms/StrokedLabel";

export function InputTextField({
  label,
  isRequired,
}: {
  label: string;
  isRequired: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="flex space-x-1">
        <StrokedLabel text={label} className="text-white" />
        <StrokedLabel text={isRequired ? "*" : ""} className="text-rose-500" />
      </label>
      <input
        name={label}
        placeholder="Empty"
        className="bg-neutral-300 w-full text-xs opacity-90 h-7 rounded-full border-2 border-black px-3"
      />
    </div>
  );
}
