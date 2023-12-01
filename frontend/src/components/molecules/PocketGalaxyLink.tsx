import { useNavigate } from "react-router-dom";
import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import Image from "next/image";

export function PocketGalaxyLink() {
  // const navigate = useNavigate();

  return (
    <button
      className="flex space-x-1 items-center"
      // onClick={() => navigate("/")}
    >
      <Image
        src="/icons/PocketGalaxy.webp"
        width={24}
        height={24}
        alt="PocketGalaxy"
      />
      <StrokedLabel
        text="PocketGalaxy"
        className="text-sky-300 cursor-pointer"
      />
    </button>
  );
}
