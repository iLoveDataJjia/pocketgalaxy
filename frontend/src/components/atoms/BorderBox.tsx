import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function BorderBox({ children }: Props) {
  return <div>{children}</div>;
}
