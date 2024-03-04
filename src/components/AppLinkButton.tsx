import {
  Button,
  ButtonProps,
  Link as UiLink,
  LinkProps as UiLinkProps,
} from "@nextui-org/react";
import {
  LinkProps as RouterLinkProps,
  useRouter,
} from "@tanstack/react-router";

export type AppLinkButtonProps = Omit<
  RouterLinkProps & UiLinkProps & ButtonProps,
  "href" | "showAnchorIcon" | "params"
> & {
  // FIXME
  params: any;
};

export const AppLinkButton = (props: AppLinkButtonProps) => {
  const { to, params, as: _, ...rest } = props;
  const router = useRouter();
  const next = router.buildLocation({ to: props.to, params: props.params });
  return <Button as={UiLink} href={next.href} {...rest} />;
};
