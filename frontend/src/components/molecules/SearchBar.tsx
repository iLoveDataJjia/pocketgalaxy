import { ChangeEventHandler } from "react";

import { BorderBox } from "../atoms/BorderBox";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <BorderBox rounded="full" className="h-8 flex items-center w-64">
      <img
        src={`/icons/Search.webp`}
        alt="Search"
        className="pl-3 py-1.5 pr-2 select-none max-w-full max-h-full"
      />
      <input
        value={value}
        placeholder="Search"
        onChange={onChange}
        className="bg-transparent focus:outline-none text-black"
      />
    </BorderBox>
  );
}
