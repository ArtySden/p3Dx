function EventoCard({ evento }) {
  return (
    <article className="card-soft overflow-hidden hover:shadow-xl transition relative">
      <img src={evento.imagen} alt={evento.titulo} className="event-img" />
      <div className="p-3">
        <span className="inline-block bg-yellow-200 px-3 py-1 rounded-full text-xs font-bold mb-2">{evento.tipo}</span>
        <h3 className="font-black text-gray-900">{evento.titulo}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-700">{evento.descripcion}</p>
        <p className="mt-2 text-xs text-gray-500">{evento.fecha}</p>
      </div>
      <button className="absolute right-2 top-1/2 bg-yellow-300 w-8 h-8 rounded-full font-black" aria-label={`Guardar evento ${evento.titulo}`}>☆</button>
    </article>
  );
}
function EventosApp() {
  const [datos, setDatos] = React.useState(null);
  React.useEffect(() => { cargarDatos().then(setDatos); }, []);
  return (
    <PageLayout active="eventos">
      <section>
        <h2 className="mb-4 font-black">Eventos Juveniles:</h2>
        {!datos ? <ErrorBox message="No se pudo cargar data/unigo.json. Usa Live Server." /> : <div className="desktop-grid-3">{datos.eventos.map((evento) => <EventoCard key={evento.titulo} evento={evento} />)}</div>}
      </section>
    </PageLayout>
  );
}
ReactDOM.render(<EventosApp />, document.getElementById("eventos-root"));
