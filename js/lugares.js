function LugarCard({ lugar }) {
  return (
    <article className="card-soft p-4">
      <div className="flex justify-between gap-3">
        <h3 className="font-black">{lugar.nombre}</h3>
        <span className="text-xs text-gray-500">{lugar.costo}</span>
      </div>
      <p className="mt-3 text-gray-500">• {lugar.horario}</p>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {lugar.servicios.map((s) => <li key={s}>• {s}</li>)}
      </ul>
    </article>
  );
}
function LugaresApp() {
  const [datos, setDatos] = React.useState(null);
  React.useEffect(() => { cargarDatos().then(setDatos); }, []);
  return (
    <PageLayout active="lugares">
      <section>
        <h2 className="mb-4 font-black">Sitios Útiles:</h2>
        {!datos ? <ErrorBox message="No se pudo cargar data/unigo.json. Usa Live Server." /> : <div className="desktop-grid-3">{datos.lugares.map((lugar) => <LugarCard key={lugar.nombre} lugar={lugar} />)}</div>}
      </section>
    </PageLayout>
  );
}
ReactDOM.render(<LugaresApp />, document.getElementById("lugares-root"));
