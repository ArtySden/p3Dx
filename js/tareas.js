const STORAGE_TAREAS = "unigo_tareas";

function TareaCard({ tarea, indice, abrirDetalle }) {
  return (
    <article className="task-card">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl" aria-hidden="true">▣</span>
        <div className="min-w-0">
          <h3 className={`font-black truncate ${tarea.estado === "completada" ? "line-through text-gray-400" : "text-gray-900"}`}>
            {tarea.favorito ? "★ " : ""}{tarea.titulo}
          </h3>
          <p className="text-xs text-gray-500">{tarea.fecha}</p>
        </div>
      </div>
      <button className="tiny-button" onClick={() => abrirDetalle(indice)} aria-label={`Entrar a la tarea ${tarea.titulo}`}>Entrar</button>
    </article>
  );
}

function TareasApp() {
  const iniciales = [
    { titulo: "Resolver Test 1 de Inglés", fecha: "18/03/26 - 19/03/26", estado: "pendiente", favorito: false, nombreArchivo: "Sin archivo" },
    { titulo: "Estudiar Cálculo I", fecha: "Hasta 23/03/26", estado: "pendiente", favorito: false, nombreArchivo: "Sin archivo" },
    { titulo: "Resolver Álgebra Lineal", fecha: "Hasta 26/03/26", estado: "pendiente", favorito: false, nombreArchivo: "Sin archivo" },
    { titulo: "Leer Lectura 1 de Economía", fecha: "Hasta 21/06/26", estado: "completada", favorito: false, nombreArchivo: "Sin archivo" }
  ];
  const [tareas, setTareas] = React.useState(() => safeGetJSON(STORAGE_TAREAS, iniciales));
  const [modal, setModal] = React.useState(null);
  const [mensaje, setMensaje] = React.useState("");

  React.useEffect(() => { safeSetJSON(STORAGE_TAREAS, tareas); }, [tareas]);

  const pendientes = tareas.filter((t) => t.estado === "pendiente").length;
  const completadas = tareas.filter((t) => t.estado === "completada").length;

  function guardarTarea(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const titulo = String(form.get("titulo") || "").trim();
    const fecha = String(form.get("fecha") || "").trim();
    const archivo = e.currentTarget.archivo.files[0];
    if (titulo.length < 3 || !fecha) {
      setMensaje("Completa el curso y la fecha correctamente.");
      return;
    }
    setTareas([...tareas, { titulo, fecha, estado: "pendiente", favorito: false, nombreArchivo: archivo ? archivo.name : "Sin archivo" }]);
    setModal(null); setMensaje("Tarea guardada correctamente.");
  }

  function cambiarEstado(indice, estado) {
    setTareas(tareas.map((t, i) => i === indice ? { ...t, estado } : t));
    setModal(null);
  }

  function toggleFavorito(indice) {
    setTareas(tareas.map((t, i) => i === indice ? { ...t, favorito: !t.favorito } : t));
  }

  return (
    <PageLayout active="tareas">
      <section>
        {mensaje && <div className={`message ${mensaje.includes("correctamente") ? "success" : "error"} mb-3`}>{mensaje}</div>}
        <div className="bg-[#f1e2f4] rounded-[28px] p-3 md:p-5">
          <button className="w-full mb-3 bg-purple-300 hover:bg-purple-400 text-white text-2xl font-black rounded-xl py-3 transition" onClick={() => {setModal("nuevo"); setMensaje("");}} aria-label="Agregar nueva tarea">+</button>
          <div className="grid md:grid-cols-2 gap-2">
            {tareas.map((tarea, indice) => <TareaCard key={indice} tarea={tarea} indice={indice} abrirDetalle={setModal} />)}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="counter pending">{pendientes} Tareas Pendientes</div>
          <div className="counter done">{completadas} Completada</div>
        </div>
      </section>

      {modal === "nuevo" && (
        <div className="modal-cover" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <form className="modal-box" onSubmit={guardarTarea} noValidate>
            <h2 id="modal-title" className="text-2xl font-black mb-4">Agrega un curso</h2>
            <input name="titulo" className="input-ui mb-3 rounded-xl" placeholder="Nombre del curso" />
            <input name="archivo" type="file" className="input-ui mb-3 rounded-xl" />
            <input name="fecha" type="date" className="input-ui mb-3 rounded-xl" />
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-4 py-2 rounded-xl bg-gray-200 font-bold" onClick={() => setModal(null)}>Cancelar</button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-purple-400 text-white font-bold">Guardar</button>
            </div>
          </form>
        </div>
      )}

      {typeof modal === "number" && tareas[modal] && (
        <div className="modal-cover" role="dialog" aria-modal="true">
          <div className="modal-box">
            <div className="flex justify-between items-center gap-3">
              <h2 className="text-2xl font-black">{tareas[modal].titulo}</h2>
              <button className="text-3xl" onClick={() => toggleFavorito(modal)} aria-label="Marcar como favorito">{tareas[modal].favorito ? "★" : "☆"}</button>
            </div>
            <p className="mt-4"><b>Fecha:</b> {tareas[modal].fecha}</p>
            <p className="mt-2"><b>Documento:</b> {tareas[modal].nombreArchivo}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-2">
              <button className="bg-green-500 text-white py-3 rounded-xl font-bold" onClick={() => cambiarEstado(modal, "completada")}>Completada</button>
              <button className="bg-red-400 text-white py-3 rounded-xl font-bold" onClick={() => cambiarEstado(modal, "pendiente")}>Sin completar</button>
            </div>
            <button className="mt-3 w-full bg-gray-200 py-3 rounded-xl font-bold" onClick={() => setModal(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

ReactDOM.render(<TareasApp />, document.getElementById("tareas-root"));
