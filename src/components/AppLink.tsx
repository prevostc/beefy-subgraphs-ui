import { Link as UiLink, LinkProps as UiLinkProps } from "@nextui-org/react";
import {
  LinkProps as RouterLinkProps,
  useRouter,
} from "@tanstack/react-router";

export type AppLinkProps = Omit<
  RouterLinkProps & UiLinkProps,
  "href" | "params"
> & {
  // FIXME
  params?: any;
};

export const AppLink = (props: AppLinkProps) => {
  const { to, params, as: _, ...rest } = props;
  const router = useRouter();
  const next = router.buildLocation({ to, params });
  return <UiLink href={next.href} {...rest} />;
};
