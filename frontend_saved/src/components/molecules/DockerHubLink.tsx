import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import Image from "next/image";

export function DockerHubLink() {
  return (
    <a
      href="https://hub.docker.com/u/ilovedatajjia"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1"
    >
      <Image src="/icons/Docker.webp" width={19} height={16} alt="Docker" />
      <StrokedLabel text="DockerHub" className="text-blue-400 cursor-pointer" />
    </a>
  );
}
