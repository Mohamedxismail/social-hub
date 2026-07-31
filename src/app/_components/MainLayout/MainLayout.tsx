"use client";

import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  return (
    <main className={`flex-1 ${isAuthPage ? "" : "mt-20"}`}>
      {children}
    </main>
  );
}