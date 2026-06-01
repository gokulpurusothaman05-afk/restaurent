document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".login-tab");
  const panels = document.querySelectorAll(".login-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.panel;
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  document.getElementById("client-login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    if (emailInput?.value) {
      localStorage.setItem('dashboardUserEmail', emailInput.value);
    }
    window.location.href = "client-dashboard.html";
  });

  document.getElementById("admin-login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"], input[type="text"]');
    if (emailInput?.value) {
      localStorage.setItem('dashboardUserEmail', emailInput.value);
    }
    window.location.href = "admin-dashboard.html";
  });
});
