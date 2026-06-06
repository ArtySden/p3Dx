function ContactanosApp() {
  const [form, setForm] = React.useState({ nombre:"", email:"", pais:"peru", mensaje:"" });
  const [estado, setEstado] = React.useState(null);

  function cambiar(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function validar() {
    if (form.nombre.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Ingresa un correo electrónico válido.";
    if (form.mensaje.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres.";
    return "";
  }
  async function enviar(e) {
    e.preventDefault();
    const error = validar();
    if (error) { setEstado({ tipo:"error", texto:error }); return; }
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      setEstado({ tipo:"success", texto:`Gracias por contactarnos, ${form.nombre.trim()}.` });
      setForm({ nombre:"", email:"", pais:"peru", mensaje:"" });
    } catch (err) {
      setEstado({ tipo:"error", texto:"Hubo un problema enviando el formulario." });
    }
  }
  return (
    <PageLayout active="contacto">
      <section className="grid md:grid-cols-2 gap-5">
        <form className="card-soft p-5" onSubmit={enviar} noValidate>
          <h2 className="text-2xl font-black text-purple-700 mb-4">Contáctanos Aquí</h2>
          {estado && <div className={`message ${estado.tipo} mb-3`} role="alert">{estado.texto}</div>}
          <Campo label="Nombre" name="nombre" value={form.nombre} onChange={cambiar} />
          <Campo label="Correo Electrónico" name="email" value={form.email} onChange={cambiar} type="email" />
          <label className="block text-sm font-bold mt-3 mb-1" htmlFor="pais">País:</label>
          <select id="pais" name="pais" className="input-ui rounded-xl" value={form.pais} onChange={cambiar}>
            <option value="peru">Perú</option><option value="colombia">Colombia</option><option value="mexico">México</option><option value="argentina">Argentina</option>
          </select>
          <label className="block text-sm font-bold mt-3 mb-1" htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" rows="4" className="input-ui rounded-xl" value={form.mensaje} onChange={cambiar}></textarea>
          <button className="mt-4 w-full bg-purple-400 hover:bg-purple-500 text-white py-3 rounded-xl font-bold transition" type="submit">Enviar</button>
        </form>
        <div className="space-y-5">
          <div className="card-soft p-5">
            <h3 className="font-black text-xl mb-3">Información de Contacto</h3>
            <p><b>Teléfono:</b> +51 123 456 789</p>
            <p><b>Dirección:</b> Av. Principal 123, Lima, Perú</p>
            <div className="mt-4 flex gap-3 text-purple-700 font-bold"><a href="https://www.facebook.com">Facebook</a><a href="https://www.instagram.com">Instagram</a></div>
          </div>
          <iframe title="Mapa de ubicación" className="w-full h-[260px] rounded-2xl border" src="https://maps.google.com/maps?q=-12.089,-76.95&z=13&output=embed" loading="lazy"></iframe>
        </div>
      </section>
    </PageLayout>
  );
}
function Campo({ label, name, value, onChange, type="text" }) {
  return <><label className="block text-sm font-bold mt-3 mb-1" htmlFor={name}>{label}:</label><input id={name} name={name} type={type} className="input-ui rounded-xl" value={value} onChange={onChange} /></>;
}
ReactDOM.render(<ContactanosApp />, document.getElementById("contacto-root"));
