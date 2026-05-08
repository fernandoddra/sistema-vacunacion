"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function PacientePage() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    cargarHistorial();
  }, []);

  async function cargarHistorial() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    setCorreo(userData.user.email || "");

    const { data: perfil } = await supabase
      .from("usuarios_perfil")
      .select("correo")
      .eq("id", userData.user.id)
      .single();

    const { data } = await supabase
      .from("vacunaciones")
      .select("*")
      .eq("ci_paciente", perfil?.correo)
      .order("fecha_vacunacion", { ascending: false });

    setRegistros(data || []);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-950 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel Paciente</h1>
          <p className="text-zinc-400">Historial personal de vacunación</p>
        </div>

        <a
          href="/logout"
          className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
        >
          Cerrar sesión
        </a>
      </header>

      <section className="p-8">
        <h2 className="text-xl font-bold mb-2">Bienvenido</h2>
        <p className="text-zinc-400 mb-6">{correo}</p>

        <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
          <table className="w-full bg-zinc-950 text-white">
            <thead className="bg-white text-black">
              <tr>
                <th className="p-4 text-left">Vacuna</th>
                <th className="p-4 text-left">Dosis</th>
                <th className="p-4 text-left">Fecha</th>
                <th className="p-4 text-left">Establecimiento</th>
                <th className="p-4 text-left">Estado</th>
              </tr>
            </thead>

            <tbody>
              {registros.map((registro) => (
                <tr key={registro.registro_id} className="border-b border-zinc-800">
                  <td className="p-4">{registro.vacuna_nombre}</td>
                  <td className="p-4">{registro.numero_dosis}</td>
                  <td className="p-4">{registro.fecha_vacunacion}</td>
                  <td className="p-4">{registro.nombre_establecimiento}</td>
                  <td className="p-4">
                    {registro.aplicacion_oportuna ? "Oportuna" : "Fuera de rango"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {registros.length === 0 && (
          <p className="text-zinc-400 mt-6">
            No se encontraron vacunas registradas para este paciente.
          </p>
        )}
      </section>
    </main>
  );
}