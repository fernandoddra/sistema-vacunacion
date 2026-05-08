"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function cerrarSesion() {
      await supabase.auth.signOut();
      router.push("/login");
    }

    cerrarSesion();
  }, [router]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Cerrando sesión...</p>
    </main>
  );
}