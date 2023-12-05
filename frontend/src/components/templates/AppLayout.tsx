import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { PocketGalaxyLink } from "../organisms/PocketGalaxyLink";
import { GitHubLink } from "../organisms/GitHubLink";
import { DockerHubLink } from "../organisms/DockerHubLink";
import { StrokedText } from "../atoms/StrokedText";

interface Props {
  children: ReactNode;
  h1: string;
}

export function AppLayout({ children, h1 }: Props) {
  return (
    <div
      className={`bg-[url('/others/Wallpaper.webp')] bg-cover bg-center h-screen`}
    >
      <Toaster position="top-center" />
      <div className="max-w-xs md:max-w-3xl mx-auto">
        <div className="flex flex-col space-y-4 p-4">
          <header className="flex justify-between">
            <PocketGalaxyLink />
            <div className="flex space-x-4 items-center">
              <DockerHubLink />
              <GitHubLink />
            </div>
          </header>
          <h1>
            <StrokedText text={h1} className="font-bold text-xl" />
          </h1>
          <div className="px-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
