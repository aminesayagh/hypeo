"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AppPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard by default
    router.replace("/app/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}