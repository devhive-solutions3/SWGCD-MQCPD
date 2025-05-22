import React from "react";

export const metadata = {
  title: "Counselor Login",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export const dynamic = 'force-static'; 