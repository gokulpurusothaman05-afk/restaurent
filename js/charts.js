function drawLineChart(canvasId, data, labels, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const max = Math.max(...data) * 1.1;
  const min = 0;
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
  }

  const points = data.map((val, i) => ({
    x: pad.left + (chartW / (data.length - 1)) * i,
    y: pad.top + chartH - ((val - min) / (max - min)) * chartH,
  }));

  const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  gradient.addColorStop(0, color + "60");
  gradient.addColorStop(1, color + "00");

  ctx.beginPath();
  ctx.moveTo(points[0].x, h - pad.bottom);
  points.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  points.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#0d0d0d";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  ctx.fillStyle = "#8a8178";
  ctx.font = "11px Outfit, sans-serif";
  ctx.textAlign = "center";
  labels.forEach((label, i) => {
    ctx.fillText(label, points[i].x, h - 8);
  });
}

function drawBarChart(canvasId, data, labels, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const max = Math.max(...data) * 1.15;
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barW = (chartW / data.length) * 0.55;
  const gap = (chartW / data.length) * 0.45;

  ctx.clearRect(0, 0, w, h);

  data.forEach((val, i) => {
    const barH = (val / max) * chartH;
    const x = pad.left + i * (barW + gap) + gap / 2;
    const y = pad.top + chartH - barH;

    const grad = ctx.createLinearGradient(x, y, x, y + barH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + "80");

    ctx.fillStyle = grad;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, barW, barH, [6, 6, 0, 0]);
    } else {
      ctx.rect(x, y, barW, barH);
    }
    ctx.fill();

    ctx.fillStyle = "#8a8178";
    ctx.font = "11px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[i], x + barW / 2, h - 8);
  });
}

function drawDonutChart(canvasId, segments) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const cx = w / 2;
  const cy = h / 2 - 10;
  const radius = Math.min(w, h) / 2 - 30;
  const inner = radius * 0.6;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, w, h);

  segments.forEach((seg) => {
    const slice = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start, start + slice);
    ctx.arc(cx, cy, inner, start + slice, start, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    start += slice;
  });

  ctx.fillStyle = "#faf7f2";
  ctx.font = "bold 22px Playfair Display, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(total + "%", cx, cy);

  ctx.font = "11px Outfit, sans-serif";
  ctx.fillStyle = "#8a8178";
  ctx.fillText("Satisfaction", cx, cy + 22);

  let ly = h - 20;
  segments.forEach((seg, i) => {
    ctx.fillStyle = seg.color;
    ctx.fillRect(20, ly - 8 + i * 18, 10, 10);
    ctx.fillStyle = "#8a8178";
    ctx.font = "10px Outfit, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(seg.label, 36, ly + i * 18);
  });
}

function initCharts(type) {
  if (type === "client") {
    drawLineChart("chart-revenue", [120, 180, 150, 220, 280, 320, 290], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "#e85d04");
    drawBarChart("chart-orders", [4, 7, 3, 9, 6, 12, 8], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "#ffba08");
    drawDonutChart("chart-satisfaction", [
      { label: "Excellent", value: 45, color: "#e85d04" },
      { label: "Good", value: 35, color: "#ffba08" },
      { label: "Fair", value: 20, color: "#8a8178" },
    ]);
  } else if (type === "admin") {
    drawLineChart("chart-revenue", [420, 580, 510, 720, 890, 950, 1020], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], "#e85d04");
    drawBarChart("chart-orders", [120, 145, 98, 167, 189, 210, 195], ["W1", "W2", "W3", "W4", "W5", "W6", "W7"], "#ffba08");
    drawDonutChart("chart-satisfaction", [
      { label: "Dine-in", value: 40, color: "#e85d04" },
      { label: "Delivery", value: 35, color: "#ffba08" },
      { label: "Takeaway", value: 25, color: "#6a040f" },
    ]);
  }
}

window.addEventListener("resize", () => {
  const dash = document.body.dataset.dashboard;
  if (dash) initCharts(dash);
});
