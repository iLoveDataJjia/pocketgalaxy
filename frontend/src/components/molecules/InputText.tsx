import { BorderBox } from "../atoms/BorderBox";
import { StrokedText } from "../atoms/StrokedText";

interface Props {
  type: "text" | "password" | "number";
  label: string;
  required: boolean;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputText({ type, label, required, value, onChange }: Props) {
  return (
    <div className="space-y-1">
      <label className="flex space-x-1.5">
        <StrokedText text={label} />
        {required && <StrokedText text="*" className="text-rose-500" />}
      </label>
      <BorderBox rounded="full" className="h-8 flex items-center w-64 px-3">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder="Empty"
          className="bg-transparent outline-none text-black h-8 w-64"
        />
      </BorderBox>
    </div>
  );
}
