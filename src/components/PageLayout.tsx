import { ReactNode } from "react";
import { Menu } from "./Menu";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <div className="w-full flex flex-col items-center px-6">
        <div className="min-w-full">{children}</div>
      </div>
    </>
  );
};
