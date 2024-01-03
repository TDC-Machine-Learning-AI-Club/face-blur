import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="prose prose-sm prose-invert max-w-none text-foreground ">
      <h1 className="text-6xl font-bold text-foreground ">
        Face
        {/* blur the blur */}
        <span className="text-foreground/50">blur</span>
      </h1>
    </div>
  );
}
