"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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

import { logout } from "../actions/auth_actions";

import SearchNavBar from "./SearchNavBar";

interface NavBarProps {
  isAuthenticated: boolean;
  email?: string;
  className?: string;
}

export default function NavBar({
  isAuthenticated,
  email,
  className,
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Release Schedule", href: "#" },
    { name: "Diary", href: "#" },
    { name: "Watchlist", href: "#" },
  ];

  return (
    <Navbar
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
      {isAuthenticated ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                showFallback
                as="button"
                className="transition-transform"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <form action={logout}>
                  <button className="w-full h-full" type="submit">
                    Log Out
                  </button>
                </form>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
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
      </NavbarMenu>
    </Navbar>
  );
}
