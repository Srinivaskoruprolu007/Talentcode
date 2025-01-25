import React from "react";
import StremClientProvider from "@/components/providers/StreamClientProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <StremClientProvider>{children}</StremClientProvider>;
};

export default Layout;
