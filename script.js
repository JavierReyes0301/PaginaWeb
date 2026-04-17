// CONTROL DEL MENÚ MÓVIL (Al inicio para evitar errores)
const menuBtn = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Cerrar el menú automáticamente al hacer clic en una opción
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// LÓGICA DE LAS VENTANAS DE SERVICIOS (MODALES)
const serviceData = {
  digital: {
    title: "Automatización y transformación digital",
    items: [
      "Plataforma Digital de Control y Seguimiento de los Procesos Administrativos (presupuestación, planeación, adjudicación, contratación y comprobación), para la Adquisición de Bienes y Contratación de Servicios.",
      "Plataforma Digital de Control y Seguimiento de los Procesos Administrativos y Técnicos (presupuestación, planeación, adjudicación, contratación y ejecución), para la Contratación de Obra Pública y Servicios Relacionados.",
      "Plataforma Digital de Gestión y Control Documental (documentación administrativa) de las Áreas Principales de la Administración Pública.",
      "Plataformas Digitales para la Gestión del Padrón de Proveedores y Contratistas.",
    ],
  },
  gob: {
    title: "Asesoría y consultoría gubernamental",
    items: [
      "Desarrollo e Integración de los Procesos de Adjudicatorios de la Adquisición de Bienes y Contratación de Servicios.",
      "Desarrollo e Integración de los Procesos de Adjudicación, Contratación, Ejecución y Cierre de las Obras Públicas y Servicios Relacionados.",
      "Desarrollo de Procedimientos Administrativos.",
      "Atención y Respuesta de Hallazgos y Observaciones Determinadas por Entes Fiscalizadores.",
      "Análisis, Evaluación e Implementación de Controles Internos Establecidos para el Desarrollo de los Procesos Administrativos Gubernamentales.",
      "Análisis y Evaluación del Cumplimiento de las Obligaciones de Transparencia.",
      "Elaboración y Actualización de Estructuras Orgánicas y Reglamentos Internos.",
      "Elaboración y Actualización de Manuales Administrativos de Organización y Procedimientos Administrativos.",
      "Verificación y Evaluación del Desempeño de la Administración en la Ejecución de los Programas Presupuestarios.",
      "Elaboración y Evaluación de Programas de Desarrollo y Programas Presupuestarios y Programas Federales.",
      "Planeación y Desarrollo del Proceso de Entrega-Recepción de la Administración Pública.",
      "Control y Seguimiento de la Antigüedad de las Cuentas Contables del Pasivo.",
    ],
  },
  cont: {
    title: "Contabilidad y auditoría",
    items: [
      "Contabilidad Fiscal",
      "Contabilidad Gubernamental",
      "Auditorías Interna y Externa.",
      "Auditoría de Matrícula Escolar.",
    ],
  },
  cursos: {
    title: "Cursos y capacitaciones",
    items: [
      "Transformación Digital: Gestión de Adjudicaciones y Padrón de Proveedores mediante Plataformas Integrales.",
      "Formulación, Ejecución y Seguimiento de Programas Presupuestarios.",
      "Gestión y Correcta Integración del Gasto Público: Del Registro Contable a la Comprobación.",      
      "Estrategias para la Atención y Solventación de Observaciones.",      
      "Integración de procedimientos de la adquisición de bienes y servicios.",
      "Integración Legal y Administrativa de Procedimientos para la Adquisición de Bienes y Servicios.",
      "Ingeniería Administrativa: Actualización de Reglamentos Internos y Manuales de Procedimientos bajo Estándares de Calidad.",
      "Blindaje Administrativo y Protocolos de Entrega-Recepción Institucional.",
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

// 1. PEGA TU URL AQUÍ
const MAKE_WEBHOOK_URL =
  "https://hook.us2.make.com/r4cmjp9lb7q4oyc8trtbfbwubvq9wfbm";
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("btnEnviar");
    btn.innerText = "Enviando...";
    btn.disabled = true;

    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      mensaje: document.getElementById("mensaje").value,
      sitio: "RT Consultores",
    };

    try {
      // Usamos 'no-cors' para evitar que el navegador bloquee el envío a Make
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Con 'no-cors' no podemos leer la respuesta, así que asumimos éxito si no hay error de red
      alert("¡Mensaje enviado con éxito! Nos contactaremos pronto.");
      contactForm.reset();
    } catch (err) {
      alert("Hubo un problema al enviar el mensaje. Intenta más tarde.");
      console.error("Error:", err);
    } finally {
      btn.innerText = "ENVIAR MENSAJE";
      btn.disabled = false;
    }
  });
}
