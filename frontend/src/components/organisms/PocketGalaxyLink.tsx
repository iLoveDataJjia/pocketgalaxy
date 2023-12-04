import { StrokedText } from "../atoms/StrokedText";
import PocketGalaxy from "/icons/PocketGalaxy.webp";

export function PocketGalaxyLink() {
  return (
    <a href="/" className="flex space-x-2 items-center">
      <img src={PocketGalaxy} className="max-h-8 max-w-8" />
      <StrokedText text="PocketGalaxy" className="font-bold text-sky-300" />
    </a>
  );
}
