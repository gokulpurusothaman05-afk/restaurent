const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "menu.html", label: "Menu" },
  { href: "services.html", label: "Services" },
  { href: "contact.html", label: "Contact" },
  { href: "login.html", label: "Login", login: true },
];

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path === "" ? "index.html" : path;
}

function renderNav() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const current = getCurrentPage();
  const linksHtml = NAV_LINKS.map((link) => {
    const active = current === link.href ? " active" : "";
    const loginClass = link.login ? " nav-link-login" : "";
    return `<a href="${link.href}" class="nav-link${active}${loginClass}">${link.label}</a>`;
  }).join("");

  header.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="logo"><img src="images/logo.webp" alt="Stackly logo"><span>Stackly</span></a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav-menu" id="nav-menu">${linksHtml}</nav>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle?.addEventListener("click", () => {
    toggle.classList.toggle("open");
    menu?.classList.toggle("open");
    document.body.style.overflow = menu?.classList.contains("open") ? "hidden" : "";
  });

  menu?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.classList.remove("open");
      menu?.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo"><img src="images/logo.webp" alt="Stackly logo"><span>Stackly</span></a>
          <p>Premium dining experience crafted with passion. Taste the art of fine cuisine at Stackly Restaurant.</p>
          <div class="social-links" style="margin-top:1.25rem">
            <a href="404.html" aria-label="Facebook">f</a>
            <a href="404.html" aria-label="Instagram">in</a>
            <a href="404.html" aria-label="Twitter">X</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="404.html">Home</a>
          <a href="404.html">About</a>
          <a href="404.html">Menu</a>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="404.html">Catering</a>
          <a href="404.html">Private Events</a>
          <a href="404.html">Reservations</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="404.html">+91 44 1234 5678</a>
          <a href="404.html">hello@stackly.in</a>
          <a href="404.html">No. 12, Marina Beach Road, Chennai</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} Stackly Restaurant. All rights reserved.</span>
        <span>restaurent.stackly.com</span>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
});
