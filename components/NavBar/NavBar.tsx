"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import clsx from "clsx";

import SearchNavBar from "../SearchNavBar";

import NavBarAuth from "./NavBarAuth";

interface NavBarProps {
  className?: string;
}

export default function NavBar({
  className,
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Release Schedule", href: "#" },
    { name: "Diary", href: "#" },
    { name: "Watchlist", href: "#" },
    { name: "Attribution", href: "/attribution"}
  ];

  return (
    <Navbar
      key={Math.random() /* Forces the mobile search bar to close when searching */}
      className={clsx("h-1", className)}
      disableAnimation={true}
      position="static"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <MovieIcon className="w-12 h-12" />
            <p className="font-bold text-inherit mx-2 text-xl">Cinelog</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((m) => (
          <NavbarItem key={m.name}>
            <Link color="foreground" href={m.href}>
              {m.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent
        as="div"
        className="items-center hidden sm:inline-flex"
        justify="end"
      >
        <SearchNavBar />
      </NavbarContent>
      <NavBarAuth />
      <NavbarMenu className="my-6">
        <NavbarMenuItem
          className="sm:hidden block"
        >
          <SearchNavBar />
        </NavbarMenuItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="inline-flex">
            <Link
              className="w-full"
              color="foreground"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
          <NavbarMenuItem key="signin" className="inline-flex">
            <Link
              className="w-full"
              color="foreground"
              href="/api/auth/signin"
              size="lg"
            >
              Login
            </Link>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
