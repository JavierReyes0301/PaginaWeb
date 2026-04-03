// 1. LÓGICA DE LAS VENTANAS DE SERVICIOS (MODALES)
const serviceData = {
  digital: {
    title: "Automatización y transformación digital",
    items: [
      "Plataforma digital de control y seguimiento de los procesos administrativos (presupuestación, planeación, adjudicación, contratación y comprobación), para la adquisición de bienes y contratación de servicios.",
      "Plataforma digital de control y seguimiento de los procesos administrativos y técnicos (presupuestación, planeación, adjudicación, contratación y ejecución), para la contratación de obra pública y servicios relacionados.",
      "Plataforma digital de control documental (documentación administrativa) de las áreas principales de la administración pública.",
      "Plataformas digitales para el manejo del padrón de proveedores y padrón de contratistas.",
    ],
  },
  gob: {
    title: "Asesoría y consultoría gubernamental",
    items: [
      "Desarrollo e integración de los procesos de adjudicatorios de la adquisición de bienes y contratación de servicios.",
      "Desarrollo e integración de los procesos de adjudicación, contratación, ejecución y cierre de las obras públicas y servicios relacionados.",
      "Desarrollo de procedimientos administrativos.",
      "Atención y respuesta de hallazgos y observaciones determinadas por Entes Fiscalizadores.",
      "Análisis, evaluación e implementación de controles internos establecidos para el desarrollo de los procesos administrativos gubernamentales.",
      "Análisis y evaluación del cumplimiento de las obligaciones de transparencia.",
      "Elaboración y actualización de estructuras orgánicas y reglamentos internos.",
      "Elaboración y actualización de manuales administrativos de organización y procedimientos administrativos.",
      "Verificación y evaluación del desempeño de la administración en la ejecución de los programas presupuestarios.",
      "Elaboración y evaluación de programas de desarrollo y programas presupuestarios y programas federales.",
      "Planeación y desarrollo del proceso de entrega-recepción de la administración pública.",
      "Control y seguimiento de la antigüedad de las cuentas contables del pasivo para su depuración contable.",
    ],
  },
  cont: {
    title: "Contabilidad y auditoría",
    items: [
      "Contabilidad fiscal",
      "Contabilidad gubernamental",
      "Auditoría interna y externa.",
    ],
  },
  cursos: {
    title: "Cursos y capacitaciones",
    items: [
      "Formulación y ejecución de programas presupuestarios.",
      "Planeación y adjudicación de obra pública.",
      "Ley General de Contabilidad Gubernamental.",
      "Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público Estatal y Municipal.",
      "Ley de Obra Pública y Servicios Relacionados con la Misma.",
      "Integración de procedimientos de la adquisición de bienes y servicios.",
      "Proceso de entrega – recepción de la administración pública.",
    ],
  },
};

function openDetails(key) {
  const data = serviceData[key];
  if (!data) return;

  document.getElementById("modalTitle").innerText = data.title;
  const list = document.getElementById("modalList");
  list.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");

  const overlay = document.getElementById("detailsOverlay");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeDetails() {
  const overlay = document.getElementById("detailsOverlay");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", function (event) {
  const overlay = document.getElementById("detailsOverlay");
  if (event.target === overlay) {
    closeDetails();
  }
});

// 2. LÓGICA DE ENVÍO A SUPABASE
const supabaseUrl = "https://onckgyxtttcbddezmnsj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uY2tneXh0dHRjYmRkZXptbnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MTcwOTEsImV4cCI6MjA4OTI5MzA5MX0.iJj7GG-0zPnvUKTetOVp8y8iwSn0GzxiMRQKGVkt-DU";

// Usamos el nombre de la librería cargada arriba
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const contactForm = document.getElementById("supabaseContactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("btnEnviar");

  if (btn) {
    btn.innerText = "Enviando...";
    btn.disabled = true; // Evita múltiples clics
  }

  const { error } = await supabaseClient.from("contactos").insert([
    {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      mensaje: document.getElementById("mensaje").value,
    },
  ]);

  if (error) {
    alert("Error al enviar: " + error.message);
  } else {
    alert("¡Mensaje guardado con éxito! Nos contactaremos pronto.");
    contactForm.reset();
  }

  if (btn) {
    btn.innerText = "ENVIAR MENSAJE";
    btn.disabled = false;
  }
});

const menuBtn = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Cerrar el menú automáticamente al hacer clic en una opción
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});
