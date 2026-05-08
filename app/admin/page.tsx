"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminPage() {
  const [totalVacunas, setTotalVacunas] = useState(0);
  const [totalEstablecimientos, setTotalEstablecimientos] = useState(0);
  const [totalVacunaciones, setTotalVacunaciones] = useState(0);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const vacunas = await supabase
      .from("vacunas_pai")
      .select("*", { count: "exact", head: true });

    const establecimientos = await supabase
      .from("establecimientos")
      .select("*", { count: "exact", head: true });

    const vacunaciones = await supabase
      .from("vacunaciones")
      .select("*", { count: "exact", head: true });

    setTotalVacunas(vacunas.count || 0);
    setTotalEstablecimientos(establecimientos.count || 0);
    setTotalVacunaciones(vacunaciones.count || 0);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-950 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel Administrador</h1>
          <p className="text-zinc-400">Sistema de Vacunación PAI Bolivia</p>
        </div>

        <a
          href="/logout"
          className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
        >
          Cerrar sesión
        </a>
      </header>

      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-zinc-400 mb-2">Total Vacunas</h2>
          <p className="text-5xl font-bold">{totalVacunas}</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-zinc-400 mb-2">Establecimientos</h2>
          <p className="text-5xl font-bold">{totalEstablecimientos}</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl">
          <h2 className="text-zinc-400 mb-2">Vacunaciones</h2>
          <p className="text-5xl font-bold">{totalVacunaciones}</p>
        </div>
      </section>

      <section className="px-8 pb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <a
          href="/admin/vacunas"
          className="border border-zinc-800 bg-zinc-950 p-6 rounded-2xl hover:border-white transition"
        >
          <h2 className="text-xl font-bold mb-2">Vacunas</h2>
          <p className="text-zinc-400">Ver catálogo de vacunas PAI</p>
        </a>

        <a
          href="/admin/establecimientos"
          className="border border-zinc-800 bg-zinc-950 p-6 rounded-2xl hover:border-white transition"
        >
          <h2 className="text-xl font-bold mb-2">Establecimientos</h2>
          <p className="text-zinc-400">Centros de salud registrados</p>
        </a>

        <a
          href="/admin/vacunaciones"
          className="border border-zinc-800 bg-zinc-950 p-6 rounded-2xl hover:border-white transition"
        >
          <h2 className="text-xl font-bold mb-2">Vacunaciones</h2>
          <p className="text-zinc-400">Registros de vacunación</p>
        </a>

        <a
          href="/admin/registrar"
          className="border border-zinc-800 bg-zinc-950 p-6 rounded-2xl hover:border-white transition"
        >
          <h2 className="text-xl font-bold mb-2">Registrar Vacunación</h2>
          <p className="text-zinc-400">Registrar nueva vacuna aplicada</p>
        </a>
      </section>
    </main>
  );
}