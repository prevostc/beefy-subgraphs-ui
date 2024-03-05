import { Divider } from "@nextui-org/react";

function Title({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-default-800 text-2xl mb-unit-md">{children}</h1>
      <Divider />
    </>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap flex-col sm:flex-row sm:justify-evenly lg:justify-between gap-unit-md py-unit-xl">
      {children}
    </div>
  );
}

function Metrics({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-wrap justify-evenly gap-unit-md lg:justify-between py-unit-xl">
      {children}
    </div>
  );
}

export const Section = {
  Title,
  Body,
  Metrics,
};
