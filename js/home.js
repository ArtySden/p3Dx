function HomeApp() {
  const [usuario, setUsuario] = React.useState(() => localStorage.getItem("unigo_usuario") || "");
  const [nombre, setNombre] = React.useState(usuario);
  const [error, setError] = React.useState("");

  function entrar(e) {
    e.preventDefault();
    const limpio = nombre.trim();
    if (limpio.length < 3) {
      setError("Ingresa un nombre de usuario de al menos 3 caracteres.");
      return;
    }
    localStorage.setItem("unigo_usuario", limpio);
    setUsuario(limpio);
    window.location.href = "tareas.html";
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10 fade-in">
      <section className="w-full max-w-md text-center">
        <div className="mx-auto w-24 h-24 bg-white rounded-sm shadow-sm flex items-center justify-center">
          <div>
            <p className="text-purple-600 text-2xl">☂</p>
            <h1 className="brand text-4xl leading-none">UG</h1>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-black">Inicia sesión</h2>
        <p className="mt-2 text-sm font-bold">Tu vida universitaria organizada</p>

        <form onSubmit={entrar} className="mt-8 space-y-3" noValidate>
          <label className="sr-only" htmlFor="usuario">Nombre de usuario</label>
          <input
            id="usuario"
            className="input-ui"
            type="text"
            placeholder="Ingrese nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            aria-invalid={error ? "true" : "false"}
          />
          {error && <p className="message error text-left text-sm">{error}</p>}
          <button className="w-full bg-[#c9c4df] border border-gray-500 py-2 font-bold text-gray-700 hover:bg-purple-200 transition" type="submit">
            Continuar
          </button>
        </form>

        <p className="mt-20 text-xs font-medium">Términos de Uso y Política de privacidad</p>
      </section>
    </main>
  );
}

ReactDOM.render(<HomeApp />, document.getElementById("app"));
