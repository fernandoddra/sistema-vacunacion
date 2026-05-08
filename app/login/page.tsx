"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password,
    });

    if (error) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    const { data: perfil, error: perfilError } = await supabase
      .from("usuarios_perfil")
      .select("rol")
      .eq("id", data.user.id)
      .single();

    if (perfilError || !perfil) {
      alert("Perfil no encontrado");
      return;
    }

    if (perfil.rol === "admin") router.push("/admin");
    if (perfil.rol === "enfermero") router.push("/enfermero");
    if (perfil.rol === "paciente") router.push("/paciente");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          Sistema de Vacunación
        </h1>

        <p className="text-center text-zinc-400 mb-8">
          Inicia sesión para continuar
        </p>

        <form onSubmit={iniciarSesion} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-white"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-xl outline-none focus:border-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-white text-black font-semibold p-3 rounded-xl hover:bg-zinc-200 transition">
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}