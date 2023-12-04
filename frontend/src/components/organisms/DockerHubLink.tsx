import { StrokedText } from "../atoms/StrokedText";
import DockerHub from "/icons/Docker.webp";

export function DockerHubLink() {
  return (
    <a
      href="https://hub.docker.com/u/ilovedatajjia"
      target="_blank"
      rel="noopener noreferrer"
      className="flex space-x-2 items-center"
    >
      <img src={DockerHub} className="max-h-6 max-w-6" />
      <StrokedText
        text="DockerHub"
        className="hidden md:block font-bold text-sky-300 text-xs"
      />
    </a>
  );
}
