"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

interface RootProvidersProps {
  children: ReactNode;
}

const RootProviders: FC<RootProvidersProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default RootProviders;
