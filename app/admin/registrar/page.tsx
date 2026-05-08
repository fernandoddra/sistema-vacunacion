"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RegistrarVacunacionPage() {
  const router = useRouter();

  const [vacunas, setVacunas] = useState<any[]>([]);
  const [establecimientos, setEstablecimientos] = useState<any[]>([]);

  const [ciPaciente, setCiPaciente] = useState("");
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [municipioResidencia, setMunicipioResidencia] = useState("");
  const [comunidadIndigena, setComunidadIndigena] = useState(false);

  const [vacunaId, setVacunaId] = useState("");
  const [establecimientoId, setEstablecimientoId] = useState("");
  const [loteVacuna, setLoteVacuna] = useState("");
  const [temperatura, setTemperatura] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const vacunasData = await supabase.from("vacunas_pai").select("*");
    const establecimientosData = await supabase.from("establecimientos").select("*");

    setVacunas(vacunasData.data || []);
    setEstablecimientos(establecimientosData.data || []);
  }

  function calcularEdadDias(fecha: string) {
    const nacimiento = new Date(fecha);
    const hoy = new Date();

    const diferencia = hoy.getTime() - nacimiento.getTime();
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  }

  async function registrarVacunacion(e: React.FormEvent) {
    e.preventDefault();

    const vacunaSeleccionada = vacunas.find((v) => v.vacuna_id === vacunaId);
    const establecimientoSeleccionado = establecimientos.find(
      (e) => e.establecimiento_id === establecimientoId
    );

    if (!vacunaSeleccionada || !establecimientoSeleccionado) {
      alert("Selecciona vacuna y establecimiento");
      return;
    }

    const edadDias = calcularEdadDias(fechaNacimiento);

    const aplicacionOportuna =
      edadDias >= vacunaSeleccionada.edad_minima_dias &&
      edadDias <= vacunaSeleccionada.edad_maxima_dias;

    const { error } = await supabase.from("vacunaciones").insert([
      {
        registro_id: crypto.randomUUID(),
        paciente_id: crypto.randomUUID(),
        ci_paciente: ciPaciente,
        nombre_paciente: nombrePaciente,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        sexo: sexo,
        fecha_nacimiento: fechaNacimiento,
        municipio_residencia: municipioResidencia,
        comunidad_indigena: comunidadIndigena,
        fecha_vacunacion: new Date().toISOString().split("T")[0],
        vacuna_id: vacunaSeleccionada.vacuna_id,
        vacuna_nombre: vacunaSeleccionada.vacuna_nombre,
        numero_dosis: vacunaSeleccionada.numero_dosis,
        establecimiento_id: establecimientoSeleccionado.establecimiento_id,
        nombre_establecimiento: establecimientoSeleccionado.nombre_establecimiento,
        departamento: establecimientoSeleccionado.departamento,
        lote_vacuna: loteVacuna,
        temperatura_conservacion: Number(temperatura),
        edad_dias_aplicacion: edadDias,
        aplicacion_oportuna: aplicacionOportuna,
        via_administracion: vacunaSeleccionada.via_administracion,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Vacunación registrada correctamente");
    router.push("/admin/vacunaciones");
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <a
        href="/admin"
        className="inline-block mb-6 border border-zinc-700 px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
      >
        ← Volver al dashboard
      </a>

      <div className="max-w-5xl mx-auto bg-zinc-950 border border-zinc-800 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">Registrar Vacunación</h1>
        <p className="text-zinc-400 mb-8">
          Complete los datos del paciente y de la vacuna aplicada.
        </p>

        <form onSubmit={registrarVacunacion} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="CI del paciente"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={ciPaciente}
            onChange={(e) => setCiPaciente(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Nombre del paciente"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={nombrePaciente}
            onChange={(e) => setNombrePaciente(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Apellido paterno"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Apellido materno"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
            required
          />

          <select
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Seleccionar sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>

          <input
            type="date"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Municipio de residencia"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={municipioResidencia}
            onChange={(e) => setMunicipioResidencia(e.target.value)}
            required
          />

          <select
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={vacunaId}
            onChange={(e) => setVacunaId(e.target.value)}
            required
          >
            <option value="">Seleccionar vacuna</option>
            {vacunas.map((vacuna) => (
              <option key={vacuna.vacuna_id} value={vacuna.vacuna_id}>
                {vacuna.vacuna_nombre} - {vacuna.dosis_descripcion}
              </option>
            ))}
          </select>

          <select
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={establecimientoId}
            onChange={(e) => setEstablecimientoId(e.target.value)}
            required
          >
            <option value="">Seleccionar establecimiento</option>
            {establecimientos.map((establecimiento) => (
              <option
                key={establecimiento.establecimiento_id}
                value={establecimiento.establecimiento_id}
              >
                {establecimiento.nombre_establecimiento}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Lote de vacuna"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={loteVacuna}
            onChange={(e) => setLoteVacuna(e.target.value)}
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Temperatura conservación °C"
            className="bg-black border border-zinc-700 p-4 rounded-xl"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
            required
          />

          <label className="flex items-center gap-3 bg-black border border-zinc-700 p-4 rounded-xl">
            <input
              type="checkbox"
              checked={comunidadIndigena}
              onChange={(e) => setComunidadIndigena(e.target.checked)}
            />
            Pertenece a comunidad indígena
          </label>

          <button className="md:col-span-2 bg-white text-black p-4 rounded-xl font-bold hover:bg-zinc-300 transition">
            Registrar Vacunación
          </button>
        </form>
      </div>
    </main>
  );
}