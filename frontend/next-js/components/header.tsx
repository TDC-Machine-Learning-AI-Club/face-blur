import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";
// import { SidebarList } from "@/components/sidebar-list";
import { CameraIcon, IconGitHub } from "@/components/ui/icons";
import { SidebarFooter } from "@/components/sidebar-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { SidebarMobile } from "./sidebar-mobile";
import { cookies } from "next/headers";

async function UserOrLogin() {
  const cookieStore = cookies();
  const session = await auth({ cookieStore });

  return (
    <>
      <div className="flex items-center">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in?callbackUrl=/">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <CameraIcon className="h-6 w-6" />
          <span className="ml-2 hidden text-xl font-bold sm:flex">
            Face <span className="text-foreground/50">Blur </span>AI
          </span>
        </Link>
      </div>
      {/* have menu at the center  */}
      <div className=" hidden items-center justify-center lg:flex">
        {/* <nav className="ml-auto flex gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="mr-4" />}
                <span className="ml-2 ">{item.title}</span>
              </div>
            </Link>
          ))}
        </nav> */}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
        <a
          target="_blank"
          href="https://github.com/TDC-Machine-Learning-AI-Club/face-blur"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <IconGitHub />
        </a>

        <ThemeToggle />
        <a href="/blur" className={cn(buttonVariants())}>
          {/* <CameraIcon className=" mr-4" /> */}
          <span className="">Face Blur</span>
        </a>
        {/* <SidebarMobile>
          <span className="flex-1 overflow-auto" />
          
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              {navItems.map((item) => (
                <div className="space-y-2 px-2" key={item.title}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between text-sm font-medium"
                  >
                    <div className="flex items-center">
                      {item.icon && <item.icon className="mr-4" />}
                      <span className="ml-2 ">{item.title}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </SidebarMobile> */}
      </div>
    </header>
  );
}

const navItems = [
  // {
  //   title: "Home",
  //   href: "/",
  //   icon: null,
  // },
  {
    title: "Blur Face",
    href: "/blur",
    icon: CameraIcon,
  },

  // // features , pricing , about , contact
  // {
  //   title: "Features",
  //   href: "/features",
  //   icon: null,
  // },
  // {
  //   title: "Pricing",
  //   href: "/pricing",
  //   icon: null,
  // },
  {
    title: "About",
    href: "/about",
    icon: null,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: null,
  },
];
