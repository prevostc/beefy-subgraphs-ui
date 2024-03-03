import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { AppLink, AppLinkProps } from "./AppLink";
import { useMatch, useMatchRoute, useMatches } from "@tanstack/react-router";

const menuItems: { title: string; route: AppLinkProps["to"] }[] = [
  { title: "Home", route: "/" },
  { title: "Protocol", route: "/protocol" },
];

export const Menu = () => {
  const matchRoute = useMatchRoute();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Beefy CL</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:flex gap-4" justify="center">
        {menuItems.map(({ route, title }, index) => (
          <NavbarItem
            key={`${route}-${index}`}
            isActive={
              matchRoute({
                to: route,
              }) !== false
            }
          >
            <AppLink to={route} className="[&.active]:font-bold">
              {title}
            </AppLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ route, title }, index) => (
          <NavbarMenuItem
            key={`${route}-${index}`}
            isActive={
              matchRoute({
                to: route,
              }) !== false
            }
          >
            <AppLink to={route} color="primary" className="w-full" size="lg">
              {title}
            </AppLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
