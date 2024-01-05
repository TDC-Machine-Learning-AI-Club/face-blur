import React from "react";

import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";
import Link from "next/link";

export function Footer({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <footer className="grid w-full shrink-0 grid-cols-3 items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground ">
          © FaceBlur AI. All rights reserved.
        </p>
      </div>
      <div className="flex justify-center">
        <p
          className={cn(
            "px-2 text-center text-xs leading-normal text-muted-foreground",
            className
          )}
          {...props}
        >
          {" "}
          <ExternalLink href="/"> Open source </ExternalLink>
          Made with ❤️ in 🇹🇿 +{" "}
          <ExternalLink href="https://python.org">
            {" "}
            Python{" "}
          </ExternalLink> and{" "}
          <ExternalLink href="https://nextjs.org"> Next.js </ExternalLink>.
        </p>
      </div>
      <div className="flex justify-end">
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
