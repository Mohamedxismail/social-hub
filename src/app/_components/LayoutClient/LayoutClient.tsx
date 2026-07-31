"use client";

import { useState } from "react";
import SideBar from "@/app/SideBar/SideBar";
import BottomNavigation from "../BottomNavigation/BottomNavigation";

type Props = {
  authenticated: boolean;
};

export default function LayoutClient({ authenticated }: Props) {
  const [open, setOpen] = useState(false);

  if (!authenticated) return null;

  return (
    <>
      <SideBar open={open} setOpen={setOpen} />
      <BottomNavigation open={open} />
    </>
  );
}