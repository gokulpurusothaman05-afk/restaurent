document.addEventListener("DOMContentLoaded", () => {
  const dashType = document.body.dataset.dashboard;
  if (!dashType) return;

  initSidebarNav();
  initSidebarToggle();
  initProgressBars();
  if (typeof initCharts === "function") initCharts(dashType);
});

function initSidebarNav() {
  const links = document.querySelectorAll(".sidebar-link[data-section]");
  const sections = document.querySelectorAll(".dashboard-section");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.dataset.section;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        document.querySelector(".dashboard-sidebar")?.classList.remove("open");
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) => {
            l.classList.toggle("active", l.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: "-15% 0px -60% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

function initSidebarToggle() {
  const btn = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector(".dashboard-sidebar");
  btn?.addEventListener("click", () => sidebar?.classList.toggle("open"));
}

function initProgressBars() {
  const bars = document.querySelectorAll(".progress-bar[data-width]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + "%";
        }
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((bar) => observer.observe(bar));
}
