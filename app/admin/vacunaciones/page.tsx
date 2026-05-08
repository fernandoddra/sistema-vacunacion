"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function VacunacionesPage() {
  const [vacunaciones, setVacunaciones] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerVacunaciones();
  }, []);

  async function obtenerVacunaciones() {
    const { data, error } = await supabase
      .from("vacunaciones")
      .select("*")
      .order("fecha_vacunacion", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setVacunaciones(data || []);
    setLoading(false);
  }

  const vacunacionesFiltradas = vacunaciones.filter((registro) =>
    `
      ${registro.nombre_paciente}
      ${registro.apellido_paterno}
      ${registro.ci_paciente}
      ${registro.vacuna_nombre}
    `
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Cargando vacunaciones...
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
          <h1 className="text-3xl font-bold">
            Registros de Vacunación
          </h1>

          <p className="text-zinc-400">
            Total registros: {vacunacionesFiltradas.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Buscar paciente o vacuna..."
          className="bg-zinc-950 border border-zinc-700 text-white px-4 py-3 rounded-xl outline-none focus:border-white w-full md:w-[320px]"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
        <table className="w-full bg-zinc-950 text-white">
          <thead className="bg-white text-black">
            <tr>
              <th className="p-4 text-left">Paciente</th>
              <th className="p-4 text-left">CI</th>
              <th className="p-4 text-left">Vacuna</th>
              <th className="p-4 text-left">Dosis</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-left">Edad Días</th>
              <th className="p-4 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {vacunacionesFiltradas.map((registro) => (
              <tr
                key={registro.registro_id}
                className="border-b border-zinc-800"
              >
                <td className="p-4 font-semibold">
                  {registro.nombre_paciente}{" "}
                  {registro.apellido_paterno}
                </td>

                <td className="p-4">
                  {registro.ci_paciente}
                </td>

                <td className="p-4">
                  {registro.vacuna_nombre}
                </td>

                <td className="p-4">
                  {registro.numero_dosis}
                </td>

                <td className="p-4">
                  {registro.fecha_vacunacion}
                </td>

                <td className="p-4">
                  {registro.edad_dias_aplicacion}
                </td>

                <td className="p-4">
                  {registro.aplicacion_oportuna ? (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      Oportuna
                    </span>
                  ) : (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      Fuera de rango
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}