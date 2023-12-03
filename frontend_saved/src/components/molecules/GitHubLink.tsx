import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import Image from "next/image";

export function GitHubLink() {
  return (
    <a
      href="https://github.com/iLoveDataJjia"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1"
    >
      <Image src="/icons/GitHub.webp" width={19} height={16} alt="GitHub" />
      <StrokedLabel text="GitHub" className="text-emerald-400 cursor-pointer" />
    </a>
  );
}
