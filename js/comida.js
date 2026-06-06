function ComidaCard({ comida, onOpen }) {
  return (
    <article className="py-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-purple-50 rounded-xl px-2 transition" onClick={onOpen} tabIndex="0" role="button" aria-label={`Ver detalle de ${comida.nombre}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl" aria-hidden="true">☆</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800">{comida.nombre}</h3>
          <p className="text-sm text-gray-500">{comida.descripcion}</p>
          <p className="mt-1 text-sm font-semibold text-purple-700">{comida.oferta}</p>
          <p className="mt-1 text-xs text-gray-400">{comida.direccion}</p>
        </div>
        <span className="font-bold text-purple-700 text-sm">Ver</span>
      </div>
    </article>
  );
}

function ComidaApp() {
  const [datos, setDatos] = React.useState(null);
  const [busqueda, setBusqueda] = React.useState("");
  const [seleccion, setSeleccion] = React.useState(null);

  React.useEffect(() => { cargarDatos().then(setDatos); }, []);
  if (!datos) return <PageLayout active="comida"><ErrorBox message="No se pudo cargar data/unigo.json. Usa Live Server para probar el proyecto." /></PageLayout>;

  const comidas = datos.comidas.filter((c) => `${c.nombre} ${c.descripcion} ${c.oferta} ${c.categoria}`.toLowerCase().includes(busqueda.toLowerCase().trim()));

  return (
    <PageLayout active="comida">
      <section>
        <div className="mb-4 flex gap-2 items-center">
          <button className="w-11 h-11 bg-[#2f2f2f] text-white rounded-full font-bold" aria-label="Favoritos">☆</button>
          <label className="sr-only" htmlFor="buscador">Buscar comida</label>
          <input id="buscador" className="flex-1 border border-gray-300 rounded-full px-4 py-3 outline-none focus:border-purple-500" placeholder="Busca comida: pizza, menú, café, sushi..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
        <div className="card-soft p-4">
          <p className="text-sm text-gray-500">Lugares para comer.</p>
          <h2 className="mt-1 font-black">Encuentra opciones económicas cerca del campus:</h2>
          <div className="mt-4">
            {comidas.length ? comidas.map((comida) => <ComidaCard key={comida.nombre} comida={comida} onOpen={() => setSeleccion(comida)} />) : <EmptyBox title="No se encontró esa comida" text="Prueba con pizza, café, menú, sushi o hamburguesa." />}
          </div>
        </div>
      </section>

      {seleccion && (
        <div className="modal-cover" role="dialog" aria-modal="true">
          <div className="modal-box">
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-purple-700">{seleccion.categoria}</p>
                <h2 className="text-2xl font-black">{seleccion.nombre}</h2>
                <p className="text-gray-500">{seleccion.descripcion}</p>
              </div>
              <button className="bg-gray-200 w-10 h-10 rounded-full font-black" onClick={() => setSeleccion(null)} aria-label="Cerrar detalle">X</button>
            </div>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Info title="Oferta" text={seleccion.oferta} />
                <Info title="Dirección" text={seleccion.direccion} />
                <Info title="Horario" text={seleccion.horario} />
                <Info title="Referencia" text={seleccion.referencia} />
                <Info title="Teléfono" text={seleccion.telefono} />
              </div>
              <iframe title={`Mapa de ${seleccion.nombre}`} className="w-full h-[340px] rounded-2xl border" src={`https://maps.google.com/maps?q=${seleccion.latitud},${seleccion.longitud}&z=16&output=embed`} loading="lazy"></iframe>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
function Info({ title, text }) { return <div className="bg-purple-50 rounded-2xl p-3"><h3 className="font-black">{title}</h3><p className="text-sm text-gray-600">{text}</p></div>; }
ReactDOM.render(<ComidaApp />, document.getElementById("comida-root"));
