(function initLoader() {
  const loader = document.getElementById("loader-screen");
  if (!loader) return;

  const bar = loader.querySelector(".loader-bar");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
      }, 400);
    }
    if (bar) bar.style.width = progress + "%";
  }, 120);

  window.addEventListener("load", () => {
    if (bar) bar.style.width = "100%";
    setTimeout(() => loader.classList.add("hidden"), 500);
  });
})();
