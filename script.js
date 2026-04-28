// CONTROL DEL MENÚ MÓVIL (Al inicio para evitar errores)
const menuBtn = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");
if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// LÓGICA DE LAS VENTANAS DE SERVICIOS (MODALES)
const serviceData = {
  dig: {
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
      "Contabilidad Fiscal.",
      "Contabilidad Gubernamental.",
      "Auditorías Interna y Externa.",
      "Auditoría de Matrícula Escolar.",
    ],
  },
  curs: {
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

  // AGREGADO: Actualiza la URL con el ID del servicio
  if (window.location.hash !== "#" + key) {
    history.pushState(null, null, "#" + key);
  }
}

function closeDetails() {
  const overlay = document.getElementById("detailsOverlay");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";

  // AGREGADO: Limpia la URL al cerrar
  history.pushState(null, null, window.location.pathname);
}

window.addEventListener("click", function (event) {
  const overlay = document.getElementById("detailsOverlay");
  if (event.target === overlay) {
    closeDetails();
  }
});

// AGREGADO: Detectar URL al cargar para abrir automáticamente
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash && serviceData[hash]) {
    setTimeout(() => openDetails(hash), 300);
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
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
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
async function gestionarContadorVisitas() {
  // Verificamos si ya contó la visita en esta sesión de navegador
  const yaVisito = sessionStorage.getItem("visita_registrada");

  if (!yaVisito) {
    // Llamamos a la función RPC de Supabase
    const { error } = await supabase.rpc("incrementar_visitas");

    if (error) {
      console.error("Error al actualizar contador:", error);
    } else {
      // Marcamos que ya se contó para esta sesión
      sessionStorage.setItem("visita_registrada", "true");
      console.log("Visita global registrada exitosamente.");
    }
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", gestionarContadorVisitas);
async function mostrarVisitas() {
  const { data, error } = await supabase
    .from("estadisticas")
    .select("valor")
    .eq("nombre_metrica", "visitas_totales")
    .single();

  if (data) {
    document.getElementById("display-contador").innerText =
      `Visitas: ${data.valor}`;
  }
}
