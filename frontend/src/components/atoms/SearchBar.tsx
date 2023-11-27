import { ChangeEventHandler } from "react";
import Image from "next/image";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="relative flex items-center bg-neutral-300 opacity-90 h-7 rounded-full border-2 border-black">
      <Image
        src={`/icons/Search.webp`}
        width={16}
        height={16}
        alt="Search Icon"
        className="ml-2"
      />
      <input
        value={value}
        placeholder="Search"
        onChange={onChange}
        className="bg-transparent translate-y-0.5 focus:outline-none w-full mx-2"
      />
    </div>
  );
}
