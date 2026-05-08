export default function EnfermeroPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-950 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel Enfermero</h1>
          <p className="text-zinc-400">Registro y control de vacunaciones</p>
        </div>

        <a
          href="/logout"
          className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition"
        >
          Cerrar sesión
        </a>
      </header>

      <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/registrar"
          className="border border-zinc-800 bg-zinc-950 p-6 rounded-2xl hover:border-white transition"
        >
          <h2 className="text-xl font-bold mb-2">Registrar Vacunación</h2>
          <p className="text-zinc-400">Registrar vacuna aplicada a un paciente.</p>
        </a>

        <a
          href="/admin/vacunaciones"
          className="border border-zinc-800 bg-zinc-950 p-6 rounded-2xl hover:border-white transition"
        >
          <h2 className="text-xl font-bold mb-2">Ver Vacunaciones</h2>
          <p className="text-zinc-400">Consultar registros de vacunación.</p>
        </a>
      </section>
    </main>
  );
}