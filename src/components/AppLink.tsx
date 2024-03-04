import { Link as UiLink, LinkProps as UiLinkProps } from "@nextui-org/react";
import { LinkProps as RouterLinkProps } from "@tanstack/react-router";

export type AppLinkProps = Omit<RouterLinkProps & UiLinkProps, "href">;

export const AppLink = (props: AppLinkProps) => {
  const { to, ...rest } = props;
  return <UiLink href={to} {...rest} />;
};
