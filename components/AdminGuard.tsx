"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/admin/login";
        return;
      }

      setAllowed(true);
      setChecking(false);
    }

    checkUser();
  }, []);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-6 py-4 font-bold shadow-sm">
          Sprawdzanie dostępu...
        </div>
      </main>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}