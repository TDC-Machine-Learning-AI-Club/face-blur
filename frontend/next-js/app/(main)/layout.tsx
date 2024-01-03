import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-9">
      <div>{children}</div>
    </div>
  );
}
