function TipCard({ tip, color }) {
  return (
    <article className={`tip-card ${color}`}>
      <h3 className="font-black">{tip.titulo}</h3>
      <p className="text-sm font-semibold text-gray-700">{tip.subtitulo}</p>
      <ul className="mt-2 space-y-1 text-xs text-gray-600">
        {tip.puntos.map((p) => <li key={p}>• {p}</li>)}
      </ul>
    </article>
  );
}
function TipsApp() {
  const [datos, setDatos] = React.useState(null);
  const [categoria, setCategoria] = React.useState("productividad");
  React.useEffect(() => { cargarDatos().then(setDatos); }, []);
  const color = categoria === "memorizacion" ? "blue" : categoria === "bienestar" ? "green" : "";
  return (
    <PageLayout active="tips">
      <section>
        <div className="pill-tabs mb-4" role="tablist" aria-label="Categorías de tips">
          {Object.entries({productividad:"Productividad", memorizacion:"Memorización", bienestar:"Bienestar"}).map(([key, label]) => (
            <button key={key} role="tab" aria-selected={categoria === key} className={categoria === key ? "active" : ""} onClick={() => setCategoria(key)}>{label}</button>
          ))}
        </div>
        {!datos ? <ErrorBox message="No se pudo cargar data/unigo.json. Usa Live Server." /> : <div className="desktop-grid-2">{datos.tips[categoria].map((tip) => <TipCard key={tip.titulo} tip={tip} color={color} />)}</div>}
      </section>
    </PageLayout>
  );
}
ReactDOM.render(<TipsApp />, document.getElementById("tips-root"));
