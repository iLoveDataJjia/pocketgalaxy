import { StrokedText } from "../atoms/StrokedText";
import GitHub from "/icons/GitHub.webp";

export function GitHubLink() {
  return (
    <a
      href="https://github.com/iLoveDataJjia/pocketgalaxy"
      target="_blank"
      rel="noopener noreferrer"
      className="flex space-x-2 items-center"
    >
      <img src={GitHub} className="max-h-6 max-w-6" />
      <StrokedText
        text="GitHub"
        className="hidden md:block font-bold text-emerald-400 text-xs"
      />
    </a>
  );
}
