import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  header: string;
}

export function AppLayout({ children, header }: Props) {
  return (
    <div className="space-y-4">
      <Toaster position="top-center" />
      <NavBar />
      <Header text={header} />
      {children}
    </div>
  );
}
