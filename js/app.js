const NAV_ITEMS = [
  { href: "tareas.html", label: "Tareas", icon: "▣" },
  { href: "comida.html", label: "Comida", icon: "⊕" },
  { href: "eventos.html", label: "Eventos", icon: "▤" },
  { href: "lugares.html", label: "Lugares", icon: "◇" },
  { href: "tips.html", label: "Tips", icon: "▥" },
  { href: "contactanos.html", label: "Contacto", icon: "✉" }
];

async function cargarDatos() {
  try {
    const respuesta = await fetch("data/unigo.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function safeGetJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Error leyendo localStorage", error);
    return fallback;
  }
}

function safeSetJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error guardando localStorage", error);
    return false;
  }
}

function Header({ active = "" }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="mobile-status" aria-hidden="true">
        <span>9:41</span><span>●● ▬</span>
      </div>
      <header className="topbar px-4 pt-4 pb-2">
        <a href="index.html" aria-label="Ir al inicio de UniGo">
          <h1 className="brand">UniGo</h1>
        </a>
        <p className="text-gray-500 font-medium">Tu vida universitaria, organizada.</p>
        <button
          className="sr-only"
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Menú
        </button>
      </header>
      <nav className="bg-white border-b border-gray-100 px-3 py-2" aria-label="Navegación principal">
        <div className="nav-scroll">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${active === item.label.toLowerCase() ? "active" : ""}`}
              aria-current={active === item.label.toLowerCase() ? "page" : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

function Sidebar({ active = "" }) {
  return (
    <aside className="sidebar">
      <a href="index.html"><h1 className="brand text-5xl text-center">UniGo</h1></a>
      <p className="mt-2 text-center text-sm text-gray-500">Tu vida universitaria, organizada.</p>
      <div className="mt-8 space-y-2">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded-2xl font-bold transition ${active === item.label.toLowerCase() ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100 text-gray-700"}`}
          >
            <span className="mr-2">{item.icon}</span>{item.label}
          </a>
        ))}
      </div>
      <div className="mt-8 bg-purple-50 rounded-3xl p-4">
        <h3 className="font-black text-gray-800">Resumen</h3>
        <p className="mt-2 text-sm text-gray-600">Organiza tareas, revisa comida, eventos, lugares útiles y consejos académicos.</p>
      </div>
    </aside>
  );
}

function PageLayout({ active, children }) {
  return (
    <main className="desktop-shell layout-desktop fade-in">
      <Sidebar active={active} />
      <section className="content-shell">
        <Header active={active} />
        <div className="desktop-pad slide-up">{children}</div>
      </section>
    </main>
  );
}

function ErrorBox({ message }) {
  return <div className="message error" role="alert">{message}</div>;
}

function EmptyBox({ title, text }) {
  return (
    <div className="text-center py-10 card-soft">
      <p className="text-3xl">⌕</p>
      <h3 className="mt-2 font-black">{title}</h3>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}
