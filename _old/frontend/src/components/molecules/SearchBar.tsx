import { ChangeEventHandler } from "react";
import Image from "next/image";
import { BorderBox } from "../atoms/BorderBox";
import { StatusType } from "@/helpers/StatusType";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <BorderBox status={StatusType.Neutral} border="full">
      <search className="relative flex items-center h-7">
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
          className="text-xs bg-transparent focus:outline-none mx-2"
        />
      </search>
    </BorderBox>
  );
}
