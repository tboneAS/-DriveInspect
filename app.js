const steps = [...document.querySelectorAll('.step')];
const progress = document.getElementById('progress');
const stepLabel = document.getElementById('stepLabel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('inspectionForm');
const reportOutput = document.getElementById('reportOutput');
let currentStep = 1;
const storageKey = 'driveinspect-inspections';

const ratingClass = (score) => (score >= 90 ? 'good' : score >= 70 ? 'warn' : 'bad');
const to5 = {
  yes: 1, no: 5, ok: 5, suspicious: 2, none: 5, light: 3, heavy: 1,
  working: 5, faulty: 1, some: 2, normal: 5, abnormal: 1, present: 2,
  stable: 5, unstable: 2, smooth: 5, vibration: 1, noticeable: 2,
  Dealer: 4, Private: 3
};

function showStep(step) {
  steps.forEach((el) => el.classList.toggle('active', Number(el.dataset.step) === step));
  progress.style.width = `${(step / 5) * 100}%`;
  stepLabel.textContent = `Step ${step} of 5`;
  prevBtn.disabled = step === 1;
  nextBtn.style.display = step === 5 ? 'none' : 'inline-block';
  submitBtn.style.display = step === 5 ? 'inline-block' : 'none';
}

function scoreFromData(data) {
  const exterior = (Number(data.paint) + to5[data.rust] + to5[data.accident] + to5[data.panelGaps]) / 4;
  const interior = (Number(data.seats) + to5[data.electronics] + to5[data.warnings]) / 3;
  const technical = (to5[data.engineSound] + Number(data.oil) + Number(data.transmission) + to5[data.suspensionNoise] + Number(data.brakePerformance)) / 5;
  const testDrive = (Number(data.acceleration) + to5[data.steering] + to5[data.brakingBehavior] + to5[data.vibrations]) / 4;

  const marketPrice = Number(data.marketPrice);
  const listedPrice = Number(data.price);
  const deviation = ((listedPrice - marketPrice) / marketPrice) * 100;
  const priceScore = deviation <= -10 ? 5 : deviation <= 10 ? 3.5 : 1.5;

  const weighted = (exterior * 0.2 + interior * 0.15 + technical * 0.35 + testDrive * 0.2 + priceScore * 0.1);
  const finalScore = Math.round((weighted / 5) * 100);

  const verdict = finalScore >= 90 ? '🟢 Excellent Deal' : finalScore >= 70 ? '🟡 Acceptable' : finalScore >= 50 ? '🟠 Risky' : '🔴 Avoid';
  const priceEvaluation = deviation < -8 ? 'Undervalued' : deviation <= 8 ? 'Fair Price' : 'Overpriced';

  return { exterior, interior, technical, testDrive, deviation, priceScore, finalScore, verdict, priceEvaluation };
}

function buildInsights(data) {
  const items = [];
  if (data.brakingBehavior === 'vibration') items.push('Check brake discs and control arms.');
  if (data.engineSound === 'abnormal') items.push('Possible injector/turbo issue.');
  if (data.steering === 'unstable') items.push('Suspension or alignment issue.');
  if (data.accident === 'yes') items.push('Inspect chassis on lift for hidden structural damage.');
  return items.length ? items : ['No critical red flags detected.'];
}

function renderReport(data, score, insights) {
  const low = Math.max(250, Math.round((5 - score.technical) * 350));
  const high = low + 900;
  const role = document.getElementById('roleSelector').value;
  const shareId = crypto.randomUUID().slice(0, 8);

  reportOutput.innerHTML = `
    <h3>${data.brand} ${data.model} (${data.year})</h3>
    <p><strong>Seller:</strong> ${data.sellerType} | <strong>Mileage:</strong> ${Number(data.mileage).toLocaleString()} mi | <strong>VIN:</strong> ${data.vin || 'N/A'}</p>
    <p class="${ratingClass(score.finalScore)}"><strong>Final Score:</strong> ${score.finalScore}/100 — ${score.verdict}</p>
    <div class="progressBar"><span style="width:${score.finalScore}%"></span></div>
    <ul>
      <li>Exterior: ${(score.exterior * 20).toFixed(1)} / 100</li>
      <li>Interior: ${(score.interior * 20).toFixed(1)} / 100</li>
      <li>Engine & Technical: ${(score.technical * 20).toFixed(1)} / 100</li>
      <li>Test Drive: ${(score.testDrive * 20).toFixed(1)} / 100</li>
      <li>Price Evaluation: ${score.priceEvaluation} (${score.deviation.toFixed(1)}%)</li>
    </ul>
    <h4>Recommendations</h4>
    <ul>${insights.map((i) => `<li>${i}</li>`).join('')}</ul>
    <p><strong>Repair estimate:</strong> $${low}–$${high}</p>
    <p><strong>Export:</strong> Use browser print dialog to save as PDF.</p>
    <p><strong>Shareable link:</strong> https://driveinspect.app/report/${shareId}</p>
    <p><strong>Access role:</strong> ${role === 'customer' ? 'View only' : 'Can create & manage reports'}</p>
  `;
}

function saveInspection(entry) {
  const records = JSON.parse(localStorage.getItem(storageKey) || '[]');
  records.unshift({ ...entry, createdAt: new Date().toISOString() });
  localStorage.setItem(storageKey, JSON.stringify(records.slice(0, 100)));
  refreshDashboard();
}

function refreshDashboard() {
  const records = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const total = records.length;
  const avg = total ? Math.round(records.reduce((a, b) => a + b.finalScore, 0) / total) : 0;
  const deals = records.filter((r) => r.finalScore >= 70).length;
  const bad = records.filter((r) => r.finalScore < 50).length;
  document.getElementById('totalInspections').textContent = total;
  document.getElementById('averageScore').textContent = avg;
  document.getElementById('dealRatio').textContent = `${deals}/${bad}`;
  document.getElementById('recentCount').textContent = records.filter((r) => Date.now() - new Date(r.createdAt).getTime() < 1000 * 3600 * 24 * 7).length;
}

nextBtn.addEventListener('click', () => { currentStep += 1; showStep(currentStep); });
prevBtn.addEventListener('click', () => { currentStep -= 1; showStep(currentStep); });

document.getElementById('bookInspectionBtn').addEventListener('click', () => {
  alert('Booking request started. Our inspector will contact you soon.');
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('contactStatus').textContent = 'Message sent! We will get back to you shortly.';
  e.target.reset();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const score = scoreFromData(data);
  const insights = buildInsights(data);
  renderReport(data, score, insights);
  saveInspection({ brand: data.brand, model: data.model, finalScore: score.finalScore });
});

showStep(currentStep);
refreshDashboard();
