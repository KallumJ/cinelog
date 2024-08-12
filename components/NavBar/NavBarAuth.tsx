import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Skeleton,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function NavBarAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Skeleton className="rounded-xl">
        <Avatar
          isBordered
          showFallback
          as="button"
          className="transition-transform"
          size="sm"
        />
      </Skeleton>
    );
  }

  return (
    <div>
      {session?.user ? (
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
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                <button
                  className="w-full h-full"
                  type="submit"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/signin">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </div>
  );
}
