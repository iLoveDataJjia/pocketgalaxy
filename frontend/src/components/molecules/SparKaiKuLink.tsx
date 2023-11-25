import { useNavigate } from "react-router-dom";
import { StrokedLabel } from "@/components/atoms/StrokedLabel";
import Image from "next/image";

export function SparKaiKuLink() {
  // const navigate = useNavigate();

  return (
    <button
      className="flex space-x-1 items-center"
      // onClick={() => navigate("/")}
    >
      <Image
        src="/icons/SparKaiKu.webp"
        width={24}
        height={24}
        alt="SparKaiKu"
      />
      <StrokedLabel text="SparKaiKu" className="text-sky-300" />
    </button>
  );
}
