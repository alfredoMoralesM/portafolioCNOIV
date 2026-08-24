// =====================================================
// Año del footer
// =====================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =====================================================
// Menú móvil
// =====================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Dropdown "Actividades" en móvil (toggle por click); en escritorio usa :hover/:focus-within (CSS)
document.querySelectorAll('.dropdown-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.has-dropdown');
    const isOpen = parent.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});

// Cerrar menú móvil al elegir un enlace de sección
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =====================================================
// Terminal de estado (efecto de escritura)
// =====================================================
const terminalLines = [
  '$ whoami',
  'alfredoMorales@cno4-seguridad',
  '',
  '$ cat modulo.txt',
  'Seguridad Informática — CNO IV',
  '',
  '$ status --check',
  '[ok] control de versiones ......... git',
  '[ok] publicación .................. github pages',
  '[ok] certificado tls .............. activo',
  '[ok] portafolio ................... en construcción',
  '',
  '$ _'
];

const terminalBody = document.getElementById('terminalBody');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeTerminal() {
  if (!terminalBody) return;

  if (prefersReducedMotion) {
    terminalBody.textContent = terminalLines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function step() {
    if (lineIndex >= terminalLines.length) return;

    const currentLine = terminalLines[lineIndex];

    if (charIndex <= currentLine.length) {
      terminalBody.textContent = output + currentLine.slice(0, charIndex);
      charIndex++;
      setTimeout(step, currentLine.length === 0 ? 60 : 18);
    } else {
      output += currentLine + '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 120);
    }
  }
  step();
}

typeTerminal();

// Inicializar EmailJS con tu Public Key
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init({
    publicKey: "fb5qq_uLFvKE6M6Ix"
  });

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Validación del navegador
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.textContent = "Enviando mensaje...";
    formStatus.className = "form-status";

    emailjs.sendForm(
      "service_wt8vt6l",
      "template_n4iq6xb",
      contactForm
    )
    .then(() => {
      formStatus.textContent = "Mensaje enviado correctamente.";
      formStatus.className = "form-status success";
      contactForm.reset();
    })
    .catch((error) => {
      console.error("Error EmailJS:", error);

      formStatus.textContent =
        "Error al enviar el mensaje. Inténtalo nuevamente.";
      formStatus.className = "form-status error";
    });
  });
});


