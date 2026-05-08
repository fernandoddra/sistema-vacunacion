"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function VacunasPage() {
  const [vacunas, setVacunas] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerVacunas();
  }, []);

  async function obtenerVacunas() {
    const { data, error } = await supabase
      .from("vacunas_pai")
      .select("*")
      .order("vacuna_id");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setVacunas(data || []);
    setLoading(false);
  }

  const vacunasFiltradas = vacunas.filter((vacuna) =>
    `${vacuna.vacuna_id} ${vacuna.vacuna_nombre} ${vacuna.enfermedad_previene}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Cargando vacunas...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <a
        href="/admin"
        className="inline-block mb-6 border border-zinc-700 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
      >
        ← Volver al dashboard
      </a>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de Vacunas</h1>
          <p className="text-zinc-400">
            Total vacunas: {vacunasFiltradas.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Buscar vacuna..."
          className="bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-white w-full md:w-[320px]"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
        <table className="w-full bg-zinc-950 text-white">
          <thead className="bg-white text-black">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Vacuna</th>
              <th className="p-4 text-left">Enfermedad</th>
              <th className="p-4 text-left">Dosis</th>
              <th className="p-4 text-left">Edad</th>
              <th className="p-4 text-left">Vía</th>
            </tr>
          </thead>

          <tbody>
            {vacunasFiltradas.map((vacuna) => (
              <tr key={vacuna.vacuna_id} className="border-b border-zinc-800">
                <td className="p-4">{vacuna.vacuna_id}</td>
                <td className="p-4 font-semibold">{vacuna.vacuna_nombre}</td>
                <td className="p-4">{vacuna.enfermedad_previene}</td>
                <td className="p-4">{vacuna.dosis_descripcion}</td>
                <td className="p-4">{vacuna.edad_aplicacion_descripcion}</td>
                <td className="p-4">{vacuna.via_administracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}