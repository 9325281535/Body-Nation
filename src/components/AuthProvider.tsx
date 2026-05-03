"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Define the pages that anyone is allowed to see without logging in
    const publicPaths = ["/login", "/signup"];
    
    // 2. Check if they are logged in
    const isLoggedIn = localStorage.getItem("bodynation_auth");

    // 3. If they are NOT logged in AND trying to access a private page, kick them to login
    if (!isLoggedIn && !publicPaths.includes(pathname)) {
      router.push("/login");
    } else {
      // 4. Otherwise, let them through!
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Show a solid dark screen while checking to prevent the website from flashing
  if (!isAuthorized) {
    return <div className="min-h-screen bg-[#0a0a0a]"></div>;
  }

  // Render the website
  return <>{children}</>;
}