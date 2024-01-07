import React from "react";

import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="grid w-full shrink-0 grid-cols-1 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:grid-cols-3 sm:flex-row md:px-6">
      <div className="order-3 flex justify-center gap-2 sm:order-1 sm:justify-start">
        <p className="text-xs text-muted-foreground ">
          © FaceBlur AI. All rights reserved {new Date().getFullYear()}. version{" "}
          {siteConfig.version}
        </p>
      </div>
      <div className="order-2 flex justify-center gap-2 sm:order-2">
        <p
          className={cn(
            "text-center text-xs leading-normal text-muted-foreground"
          )}
        >
          {" "}
          <ExternalLink href="/"> Open source </ExternalLink>
          Made with ❤️ in 🇹🇿 using{" "}
          <ExternalLink href="https://python.org">
            {" "}
            Python{" "}
          </ExternalLink> and{" "}
          <ExternalLink href="https://nextjs.org"> Next.js </ExternalLink>.
        </p>
      </div>
      <div className="order-1 flex justify-center gap-2 sm:order-3 sm:justify-end">
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
