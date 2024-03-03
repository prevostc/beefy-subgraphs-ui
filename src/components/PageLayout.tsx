import { ReactNode } from "react";
import { Menu } from "./Menu";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Menu />
      <div className="px-unit-sm max-w-[1024px] md:w-[100%]">{children}</div>
    </div>
  );
};
