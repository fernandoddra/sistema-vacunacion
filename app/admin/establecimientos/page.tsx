"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function EstablecimientosPage() {

  const [establecimientos, setEstablecimientos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerEstablecimientos();
  }, []);

  async function obtenerEstablecimientos() {

    const { data, error } = await supabase
      .from("establecimientos")
      .select("*")
      .order("nombre_establecimiento");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setEstablecimientos(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Cargando establecimientos...
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

      <h1 className="text-3xl font-bold mb-2">
        Establecimientos de Salud
      </h1>

      <p className="text-zinc-400 mb-6">
        Total establecimientos: {establecimientos.length}
      </p>

      <div className="overflow-x-auto border border-zinc-800 rounded-2xl">

        <table className="w-full bg-zinc-950 text-white">

          <thead className="bg-white text-black">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Nivel</th>
              <th className="p-4 text-left">Departamento</th>
              <th className="p-4 text-left">Municipio</th>
              <th className="p-4 text-left">Zona</th>
            </tr>

          </thead>

          <tbody>

            {establecimientos.map((establecimiento) => (

              <tr
                key={establecimiento.establecimiento_id}
                className="border-b border-zinc-800"
              >

                <td className="p-4">
                  {establecimiento.establecimiento_id}
                </td>

                <td className="p-4 font-semibold">
                  {establecimiento.nombre_establecimiento}
                </td>

                <td className="p-4">
                  {establecimiento.tipo_establecimiento}
                </td>

                <td className="p-4">
                  {establecimiento.nivel_atencion}
                </td>

                <td className="p-4">
                  {establecimiento.departamento}
                </td>

                <td className="p-4">
                  {establecimiento.municipio}
                </td>

                <td className="p-4">
                  {establecimiento.zona}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}