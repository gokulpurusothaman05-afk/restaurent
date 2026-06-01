document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initHeaderScroll();
  initCounters();
  initFaq();
  initParticles();
  initMenuFilter();
  initMagneticButtons();
  initForms();
  initDashboardUser();
});

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .stagger-children");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = target.toLocaleString();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
  });
}

function initFaq() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

function initParticles() {
  const container = document.querySelector(".hero-particles");
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.setProperty("--dx", (Math.random() - 0.5) * 200 + "px");
    p.style.setProperty("--dy", (Math.random() - 0.5) * 200 + "px");
    p.style.animationDelay = Math.random() * 5 + "s";
    p.style.animationDuration = 6 + Math.random() * 6 + "s";
    container.appendChild(p);
  }
}

function initMenuFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".menu-item");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      items.forEach((item) => {
        const match = cat === "all" || item.dataset.category === cat;
        item.classList.toggle("hidden", !match);
        if (match) {
          item.style.animation = "fadeInUp 0.5s ease forwards";
        }
      });
    });
  });
}

function initMagneticButtons() {
  document.querySelectorAll(".btn-primary, .magnetic-hover").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

function initForms() {
  document.querySelectorAll("form[data-ajax]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const original = btn?.textContent;
      if (btn) {
        btn.textContent = "Sending...";
        btn.disabled = true;
      }

      setTimeout(() => {
        if (btn) {
          btn.textContent = "Sent!";
        }

        setTimeout(() => {
          if (btn) {
            btn.textContent = original;
            btn.disabled = false;
          }
          if (form.id === "contact-form" || form.classList.contains("newsletter-form")) {
            window.location.href = "404.html";
          } else {
            form.reset();
          }
        }, 1000);
      }, 1200);
    });
  });
}

function initDashboardUser() {
  const raw = localStorage.getItem('dashboardUserEmail');
  if (!raw) return;

  const localPart = raw.split('@')[0] || raw;
  const displayName = localPart
    .replace(/[._]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  document.querySelectorAll('.dashboard-topbar .user-name').forEach((el) => {
    el.textContent = displayName || 'Guest';
  });
  document.querySelectorAll('.dashboard-topbar .avatar').forEach((el) => {
    el.textContent = initials || 'U';
  });
}
