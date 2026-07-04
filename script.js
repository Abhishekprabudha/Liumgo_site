document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 4) {
      header.classList.add("site-header--scrolled");
    } else {
      header.classList.remove("site-header--scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("login-email");
      const passwordInput = document.getElementById("login-password");

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      // Very simple front-end demo check – not secure, only for prototype use
      if (email === "liumgo@gmail.com" && password === "1234") {
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials. Please use the login or contact your admin.");
      }
    });
  }
});

const dashboardData = {
  dashboard: {
    title: "Delhi network view",
    subtitle: "2W, 3W and 4W EVs operating across priority lanes, with indicative positions for a live control-tower view."
  },
  charging: {
    title: "Delhi EV charging intelligence",
    subtitle: "Curated public and fleet charging points across Delhi localities, shown as an operator-ready GenBI lookup.",
    agentLabel: "Select locality",
    options: [
      { key: "Saket", title: "Saket District Centre Charging Hub", meta: "Area: Saket · Connector: CCS2 / Type-2 / Bharat AC", detail: "Address: Near Select Citywalk service lane, Saket District Centre, New Delhi 110017. Operator mix: Tata Power EZ Charge, Statiq and fleet AC points. Best for 2W top-ups and 4W mid-shift charging.", insight: "Peak demand 6–9 PM; reserve 4W slots before evening grocery lanes." },
      { key: "Connaught Place", title: "CP Inner Circle EV Point", meta: "Area: Connaught Place · Connector: DC fast / AC", detail: "Address: Inner Circle parking zone near Palika Bazaar, Connaught Place, New Delhi 110001. Useful for central Delhi delivery waves and executive EV fleets.", insight: "High parking turnover; 35–45 minute planned dwell recommended." },
      { key: "Dwarka", title: "Dwarka Sector 10 Metro Charger", meta: "Area: Dwarka · Connector: CCS2 / Type-2", detail: "Address: Sector 10 Metro Station parking, Dwarka, New Delhi 110075. Strong west Delhi coverage for 3W and 4W fleet returns.", insight: "Use as fallback for Janakpuri and Uttam Nagar routes." },
      { key: "Okhla", title: "Okhla Industrial Area Fleet Charger", meta: "Area: Okhla · Connector: Bharat DC / AC", detail: "Address: Okhla Industrial Area Phase II logistics cluster, New Delhi 110020. Suitable for cargo 3W, pharma routes and B2B morning departures.", insight: "Schedule preventive energy checks with maintenance visits." },
      { key: "Rohini", title: "Rohini Sector 18 Charging Plaza", meta: "Area: Rohini · Connector: Type-2 / AC slow", detail: "Address: Sector 18 market parking, Rohini, New Delhi 110089. Good north Delhi anchor for two-wheeler delivery fleets.", insight: "Overnight AC charging gives lower battery stress for 2W assets." },
      { key: "Nehru Place", title: "Nehru Place Commercial Charger", meta: "Area: Nehru Place · Connector: CCS2 / AC", detail: "Address: Multi-level parking, Nehru Place, New Delhi 110019. Covers Kalkaji, CR Park and Greater Kailash routes.", insight: "Prioritize 4W top-ups after B2B electronics delivery windows." }
    ]
  },
  vehicle: {
    title: "EV vehicle catalogue for Delhi operations",
    subtitle: "Representative 2W, 3W and 4W EV models available for Delhi fleet deployment.",
    agentLabel: "Select vehicle",
    options: [
      { key: "2W · Ola S1 Pro", title: "Ola S1 Pro", meta: "Category: 2W scooter · Range: ~170 km IDC", detail: "Payload fit: food, grocery and document delivery. Battery: fixed pack. Charging: home / AC. Typical Delhi use: high-density last-mile routes in South and Central Delhi.", insight: "Best productivity when assigned to 18–25 km compact delivery zones." },
      { key: "2W · Ather 450X", title: "Ather 450X", meta: "Category: 2W scooter · Range: ~150 km IDC", detail: "Payload fit: quick commerce and premium courier. Strong telematics ecosystem and public fast-charging support in dense urban pockets.", insight: "Use for riders requiring high reliability and frequent app-based tracking." },
      { key: "3W · Euler HiLoad EV", title: "Euler HiLoad EV", meta: "Category: 3W cargo · Payload: ~680 kg", detail: "Cargo fit: grocery crates, parcels and B2B replenishment. Strong Delhi NCR fleet presence with cargo-focused serviceability.", insight: "Ideal for hub-to-spoke replenishment before 11 AM and 4–7 PM waves." },
      { key: "3W · Piaggio Ape E-Xtra FX", title: "Piaggio Ape E-Xtra FX", meta: "Category: 3W cargo · Payload: ~500 kg", detail: "Cargo fit: retail replenishment, FMCG and e-commerce. Swappable / fixed battery variants depend on configuration.", insight: "Works well on predictable loops with scheduled charge or swap windows." },
      { key: "4W · Tata Ace EV", title: "Tata Ace EV", meta: "Category: 4W mini truck · Range: ~150 km certified", detail: "Cargo fit: larger B2B shipments, pharmacy crates and temperature-sensitive secondary distribution when upfitted.", insight: "Assign to consolidated lanes where drop density offsets vehicle cost." },
      { key: "4W · Mahindra Zor Grand", title: "Mahindra Zor Grand", meta: "Category: 3W/4W-style cargo platform · Payload: ~400 kg", detail: "Cargo fit: city cargo, parcel and enterprise distribution. Useful where a compact cargo EV has to navigate narrow Delhi markets.", insight: "Good for Chandni Chowk, Karol Bagh and Lajpat Nagar market access." }
    ]
  },
  maintenance: {
    title: "Maintenance planner",
    subtitle: "Synthetic Delhi EV registrations with downtime, preventive maintenance schedules and fleet-health insights.",
    agentLabel: "Select registration",
    options: [
      { key: "DL9S-EV-2146", title: "DL9S-EV-2146 · 2W · Ather 450X", meta: "Downtime: 1.2 days · Next PM: 08 Jul 2026", detail: "Open checks: brake pad inspection, tyre rotation and charger-port cleaning. Last route: Saket–Malviya Nagar grocery wave.", insight: "Low risk; combine PM with overnight charging to avoid rider idle time." },
      { key: "DL3C-EV-8021", title: "DL3C-EV-8021 · 3W · Euler HiLoad", meta: "Downtime: 3.5 days · Next PM: 06 Jul 2026", detail: "Open checks: suspension noise, cargo-bed latch, battery thermal scan. Last route: Okhla pharma replenishment.", insight: "High priority; downtime above target and route has cold-chain dependency." },
      { key: "DL1L-EV-4490", title: "DL1L-EV-4490 · 4W · Tata Ace EV", meta: "Downtime: 0.5 days · Next PM: 12 Jul 2026", detail: "Open checks: telematics SIM, brake-fluid level and DC charging cycle review. Last route: Dwarka B2B parcels.", insight: "Healthy asset; keep for west Delhi consolidated drops." },
      { key: "DL7S-EV-3308", title: "DL7S-EV-3308 · 2W · Ola S1 Pro", meta: "Downtime: 2.0 days · Next PM: 09 Jul 2026", detail: "Open checks: rear tyre, mirror assembly and rider-reported range drop. Last route: Rohini quick-commerce loop.", insight: "Investigate range variance before assigning long north ring routes." },
      { key: "DL5L-EV-7712", title: "DL5L-EV-7712 · 3W · Piaggio Ape E-Xtra", meta: "Downtime: 0.8 days · Next PM: 10 Jul 2026", detail: "Open checks: cabin wiring, cargo lock and AC charger handshake. Last route: CP restaurant supply.", insight: "Schedule as low-priority PM after lunch wave." }
    ]
  },
  drivers: {
    title: "Driver productivity command centre",
    subtitle: "Synthetic driver identities, compliance IDs and delivery productivity views for Delhi EV operations.",
    agentLabel: "Select driver",
    options: [
      { key: "Aarav Sharma", title: "Aarav Sharma", meta: "DL: DL0420260012345 · Aadhaar: XXXX-XXXX-2841", detail: "Vehicle: DL9S-EV-2146. Today: 31 deliveries, 96% on-time, 42 km, 4.8 customer rating. Shipment mix: grocery 62%, pharma 18%, documents 20%.", insight: "Top performer for compact South Delhi zones; assign training buddy for new riders." },
      { key: "Meera Khan", title: "Meera Khan", meta: "DL: DL0520260087654 · Aadhaar: XXXX-XXXX-9136", detail: "Vehicle: DL3C-EV-8021. Today: 18 deliveries, 94% on-time, 58 km. Shipment mix: FMCG crates 55%, pharma 30%, parcels 15%.", insight: "High cargo handling quality; avoid assigning until 3W maintenance clears." },
      { key: "Rohan Verma", title: "Rohan Verma", meta: "DL: DL1120260044210 · Aadhaar: XXXX-XXXX-6672", detail: "Vehicle: DL1L-EV-4490. Today: 22 deliveries, 98% on-time, 71 km. Shipment mix: B2B cartons 70%, returns 12%, pharma 18%.", insight: "Best fit for longer 4W consolidated lanes and early-morning dispatch." },
      { key: "Nisha Yadav", title: "Nisha Yadav", meta: "DL: DL0820260061188 · Aadhaar: XXXX-XXXX-4029", detail: "Vehicle: DL7S-EV-3308. Today: 27 deliveries, 91% on-time, 39 km. Shipment mix: quick commerce 84%, parcels 16%.", insight: "Needs route sequencing support in Rohini evening congestion." }
    ]
  },
  oems: {
    title: "OEM and EV leasing ecosystem",
    subtitle: "Delhi-ready OEMs, leasing partners and FinTechs for EV fleet scaling.",
    agentLabel: "Select partner",
    options: [
      { key: "Euler Motors", title: "Euler Motors", meta: "OEM · Cargo 3W", detail: "Offers HiLoad cargo EVs, service support and fleet-oriented product configurations for Delhi NCR logistics.", insight: "Strong option for high-payload grocery and B2B replenishment." },
      { key: "Piaggio Vehicles", title: "Piaggio Vehicles", meta: "OEM · Cargo 3W", detail: "Ape electric cargo platforms with established commercial vehicle dealer and service footprint.", insight: "Good for predictable route economics and familiar driver ergonomics." },
      { key: "Tata Motors", title: "Tata Motors", meta: "OEM · 4W cargo", detail: "Ace EV and commercial EV ecosystem for larger payloads and enterprise fleet deployments.", insight: "Best fit for client-branded, consolidated 4W lanes." },
      { key: "Revfin", title: "Revfin", meta: "FinTech · EV financing", detail: "EV-focused financing support for drivers and fleet operators with emphasis on commercial electric mobility.", insight: "Use where asset-light onboarding and driver ownership pilots are required." },
      { key: "Alt Mobility", title: "Alt Mobility", meta: "Leasing · fleet management", detail: "EV leasing and lifecycle management platform for commercial electric fleets.", insight: "Useful for scaling without upfront capex and with lifecycle support." }
    ]
  },
  parking: {
    title: "EV parking and hub directory",
    subtitle: "Operational parking points, hub operators and locality-based dispatch anchors across Delhi.",
    agentLabel: "Select locality",
    options: [
      { key: "Saket", title: "Saket Hub Parking", meta: "Operator: Lium Go partner yard · Capacity: 42 EVs", detail: "Address: A2 Saket Block service lane, New Delhi 110092. Facilities: overnight parking, AC charging, driver check-in and shift briefing.", insight: "Primary South Delhi hub for 2W and 3W deployments." },
      { key: "Okhla", title: "Okhla Industrial EV Yard", meta: "Operator: Industrial logistics park · Capacity: 55 EVs", detail: "Address: Okhla Industrial Area Phase II, New Delhi 110020. Facilities: cargo staging, maintenance bay and charger access.", insight: "Best for pharma and B2B morning dispatch." },
      { key: "Dwarka", title: "Dwarka Sector 21 Fleet Lot", meta: "Operator: Metro-adjacent parking partner · Capacity: 35 EVs", detail: "Address: Sector 21, Dwarka, New Delhi 110077. Facilities: secure overnight parking and west Delhi route staging.", insight: "Supports airport, Dwarka and Janakpuri lanes." },
      { key: "Rohini", title: "Rohini North Hub", meta: "Operator: Market association lot · Capacity: 28 EVs", detail: "Address: Sector 18 market parking, Rohini, New Delhi 110089. Facilities: rider reporting point and AC top-up charging.", insight: "Use for quick-commerce north Delhi clusters." }
    ]
  },
  clients: {
    title: "Client command centre",
    subtitle: "Representative EV logistics clients in Delhi with account and service-level details.",
    agentLabel: "Select client",
    options: [
      { key: "Zomato", title: "Zomato", meta: "Segment: Food delivery · Fleet mix: 2W", detail: "Delhi coverage: Saket, CP, Rohini, Dwarka. SLA: 95% under promised ETA. Current volume: 850 daily drops.", insight: "Needs high rider availability during lunch and dinner peaks." },
      { key: "Blinkit", title: "Blinkit", meta: "Segment: Quick commerce · Fleet mix: 2W / 3W", detail: "Delhi coverage: South and West dark stores. SLA: rapid dispatch with short-haul density. Current volume: 1,150 daily drops.", insight: "Charge planning should mirror dark-store replenishment cycles." },
      { key: "Tata 1mg", title: "Tata 1mg", meta: "Segment: Pharma · Fleet mix: 2W / 4W", detail: "Delhi coverage: Okhla, Lajpat Nagar, Dwarka and CP. SLA: high handover accuracy and exception tracking. Current volume: 430 daily drops.", insight: "Assign experienced drivers and prioritize package condition checks." },
      { key: "BigBasket", title: "BigBasket", meta: "Segment: Grocery · Fleet mix: 3W / 4W", detail: "Delhi coverage: planned hub-to-home grocery waves. Current volume: 620 daily drops with morning and evening demand peaks.", insight: "Use 3W cargo EVs for dense basket consolidation." }
    ]
  },
  trials: {
    title: "EV trial case studies",
    subtitle: "Synthetic Delhi trial programs with client outcomes, operational design and scale-up recommendations.",
    agentLabel: "Select trial",
    options: [
      { key: "Trial A · Saket Grocery", title: "Trial A · Saket Grocery Express", meta: "Client: FreshKart Delhi · 21 days · 12 EVs", detail: "Case study: 8 two-wheelers and 4 cargo three-wheelers ran grocery deliveries from Saket to Malviya Nagar and GK. Result: 97.1% on-time, 18% lower cost/km vs ICE baseline, 2.4 tonnes estimated CO₂ avoided.", insight: "Scale to 30 EVs with evening charging slots and better crate standardization." },
      { key: "Trial B · Okhla Pharma", title: "Trial B · Okhla Pharma Assurance", meta: "Client: MedSwift Labs · 30 days · 9 EVs", detail: "Case study: pharma replenishment and patient delivery routes from Okhla to South Delhi clinics. Result: 98.4% handover accuracy, 92% fleet availability, zero critical temperature exceptions in synthetic dataset.", insight: "Use dedicated 4W capacity for larger clinic replenishment days." },
      { key: "Trial C · CP Food", title: "Trial C · CP Food Peak Pilot", meta: "Client: UrbanMeals NCR · 14 days · 18 EVs", detail: "Case study: dense food-delivery waves around Connaught Place and Karol Bagh. Result: 11% faster pickup-to-drop cycle, 94% rider attendance and 31 km average daily distance per 2W.", insight: "Add micro-parking near CP to reduce rider deadhead time." },
      { key: "Trial D · Dwarka B2B", title: "Trial D · Dwarka B2B Consolidation", meta: "Client: MetroCart Wholesale · 28 days · 6 EVs", detail: "Case study: 4W and 3W EVs completed scheduled B2B carton deliveries in Dwarka, Janakpuri and airport-adjacent lanes. Result: 96% first-attempt delivery, 23% lower fuel-equivalent cost.", insight: "Good candidate for long-term Ace EV deployment." }
    ]
  },
  recovery: {
    title: "Recovery and no-show planner",
    subtitle: "Synthetic no-show vehicle records, recovery schedules and risk insights across Delhi EV assets.",
    agentLabel: "Select registration",
    options: [
      { key: "DL2S-EV-1180", title: "DL2S-EV-1180 · 2W · Ola S1 Pro", meta: "No-show: 2 days · Recovery scheduled: 05 Jul 2026", detail: "Last seen: Lajpat Nagar. Assigned driver missed two check-ins. Recovery plan: phone escalation, hub visit and immobilizer verification.", insight: "Medium risk; vehicle location ping is fresh within 6 hours." },
      { key: "DL8L-EV-6504", title: "DL8L-EV-6504 · 3W · Euler HiLoad", meta: "No-show: 5 days · Recovery scheduled: 06 Jul 2026", detail: "Last seen: Nangloi warehouse lane. Pending dues and missed dispatch. Recovery plan: field agent plus partner-yard verification.", insight: "High risk; prioritize before battery SOC drops below safe storage threshold." },
      { key: "DL4L-EV-9902", title: "DL4L-EV-9902 · 4W · Tata Ace EV", meta: "No-show: 1 day · Recovery scheduled: 04 Jul 2026", detail: "Last seen: Dwarka Sector 21 lot. Driver reported family emergency. Recovery plan: temporary custody transfer to hub supervisor.", insight: "Low risk; keep client lane covered with standby 4W." },
      { key: "DL6S-EV-4077", title: "DL6S-EV-4077 · 2W · Ather 450X", meta: "No-show: 3 days · Recovery scheduled: 07 Jul 2026", detail: "Last seen: Rohini Sector 18. Missed return after quick-commerce shift. Recovery plan: visit registered address and audit charger return.", insight: "Medium-high risk; validate Aadhaar and DL records before next assignment." }
    ]
  }
};

function renderDashboardOverview() {
  return `
    <h2>Delhi network view</h2>
    <p class="dashboard-subtitle">2W, 3W and 4W EVs operating across priority lanes, with indicative positions for a live control-tower view.</p>
    <div class="dashboard-layout">
      <div class="dashboard-main"><div class="dashboard-map"><div class="vehicle vehicle--2w vehicle--path-a"></div><div class="vehicle vehicle--2w vehicle--path-b"></div><div class="vehicle vehicle--3w vehicle--path-c"></div><div class="vehicle vehicle--3w vehicle--path-d"></div></div></div>
      <aside class="dashboard-side"><div class="page-highlight-card dashboard-card dashboard-alerts"><h3>Live alerts</h3><ul class="dashboard-alerts__list"><li class="dashboard-alert"><div class="dashboard-alert__title">Lane DL-02 · South Delhi</div><div class="dashboard-alert__meta"><span class="dashboard-pill dashboard-pill--critical">❗ Congestion</span><span class="dashboard-alert__time">ETA +8–10 min</span></div></li><li class="dashboard-alert"><div class="dashboard-alert__title">EV-3W-014 · Saket hub</div><div class="dashboard-alert__meta"><span class="dashboard-pill dashboard-pill--warn">⚠ Low SOC</span><span class="dashboard-alert__time">Rerouted via swap station</span></div></li><li class="dashboard-alert"><div class="dashboard-alert__title">Wave 3 · West Delhi cluster</div><div class="dashboard-alert__meta"><span class="dashboard-pill dashboard-pill--info">ℹ Load spike</span><span class="dashboard-alert__time">Extra riders deployed</span></div></li><li class="dashboard-alert"><div class="dashboard-alert__title">Hub Okhla · Pharma lane</div><div class="dashboard-alert__meta"><span class="dashboard-pill dashboard-pill--warn">⚠ Temp check</span><span class="dashboard-alert__time">1 shipment under review</span></div></li></ul></div></aside>
    </div>
    <div class="page-highlight-card dashboard-card dashboard-snapshot"><div class="dashboard-snapshot__header"><h3>Current shift snapshot</h3><span class="dashboard-snapshot__time">Updated 14:32 IST · Last 5 min</span></div><table class="dashboard-table"><thead><tr><th>Metric</th><th class="dashboard-table__col--value">Value</th><th class="dashboard-table__col--target">Target</th><th class="dashboard-table__col--status">Status</th></tr></thead><tbody><tr><td>On-time deliveries (60 min)</td><td class="dashboard-table__col--value">96.8%</td><td class="dashboard-table__col--target">&gt; 95%</td><td class="dashboard-table__col--status"><span class="dashboard-status dashboard-status--good">On track</span></td></tr><tr><td>Active vehicles</td><td class="dashboard-table__col--value">58 (32 × 2W, 18 × 3W, 8 × 4W)</td><td class="dashboard-table__col--target">55–62</td><td class="dashboard-table__col--status"><span class="dashboard-status dashboard-status--good">Stable</span></td></tr><tr><td>Avg. drops per vehicle</td><td class="dashboard-table__col--value">18.4</td><td class="dashboard-table__col--target">17–19</td><td class="dashboard-table__col--status"><span class="dashboard-status dashboard-status--good">Healthy</span></td></tr><tr><td>Energy exceptions</td><td class="dashboard-table__col--value">3 open</td><td class="dashboard-table__col--target">&lt; 5</td><td class="dashboard-table__col--status"><span class="dashboard-status dashboard-status--warn">Watch</span></td></tr></tbody></table><div class="dashboard-chart"><div class="dashboard-chart__item"><div class="dashboard-chart__bar dashboard-chart__bar--primary" style="--bar-height: 97;"></div><span class="dashboard-chart__value">96.8%</span><span class="dashboard-chart__label">On-time</span></div><div class="dashboard-chart__item"><div class="dashboard-chart__bar dashboard-chart__bar--accent" style="--bar-height: 88;"></div><span class="dashboard-chart__value">18.4</span><span class="dashboard-chart__label">Drops / veh</span></div><div class="dashboard-chart__item"><div class="dashboard-chart__bar dashboard-chart__bar--primary-soft" style="--bar-height: 92;"></div><span class="dashboard-chart__value">92%</span><span class="dashboard-chart__label">Fleet avail.</span></div><div class="dashboard-chart__item"><div class="dashboard-chart__bar dashboard-chart__bar--warn" style="--bar-height: 40;"></div><span class="dashboard-chart__value">3</span><span class="dashboard-chart__label">Energy exc.</span></div></div></div>`;
}

function renderIntelligencePanel(tabKey) {
  const tab = dashboardData[tabKey];
  const cards = tab.options.map((item, index) => `<article class="genbi-card"><div class="genbi-card__number">${String(index + 1).padStart(2, "0")}</div><h3>${item.title}</h3><p class="genbi-card__meta">${item.meta}</p><p>${item.detail}</p><span>${item.insight}</span></article>`).join("");
  const options = tab.options.map((item) => `<option value="${item.key}">${item.key}</option>`).join("");
  return `<div class="genbi-hero"><div><p class="genbi-eyebrow">GenBI workspace · Delhi EV network</p><h2>${tab.title}</h2><p>${tab.subtitle}</p></div><div class="genbi-kpi"><strong>${tab.options.length}</strong><span>records ready</span></div></div><div class="genbi-layout"><section class="genbi-grid">${cards}</section><aside class="page-highlight-card genbi-agent"><div class="genbi-agent__badge">✨ GenBI Agent</div><h3>Ask by selection</h3><label for="genbi-select">${tab.agentLabel}</label><select id="genbi-select" class="genbi-select">${options}</select><div id="genbi-answer" class="genbi-answer"></div></aside></div>`;
}

function bootDashboardTabs() {
  const content = document.getElementById("dashboard-tab-content");
  const buttons = document.querySelectorAll("[data-dashboard-tab]");
  if (!content || buttons.length === 0) return;

  function hydrateAgent(tabKey) {
    const select = document.getElementById("genbi-select");
    const answer = document.getElementById("genbi-answer");
    if (!select || !answer) return;
    function updateAnswer() {
      const item = dashboardData[tabKey].options.find((entry) => entry.key === select.value) || dashboardData[tabKey].options[0];
      answer.innerHTML = `<h4>${item.title}</h4><p class="genbi-answer__meta">${item.meta}</p><p>${item.detail}</p><strong>Insight:</strong><p>${item.insight}</p>`;
    }
    select.addEventListener("change", updateAnswer);
    updateAnswer();
  }

  function render(tabKey) {
    buttons.forEach((button) => button.classList.toggle("dashboard-menu__item--active", button.dataset.dashboardTab === tabKey));
    content.innerHTML = tabKey === "dashboard" ? renderDashboardOverview() : renderIntelligencePanel(tabKey);
    hydrateAgent(tabKey);
  }

  buttons.forEach((button) => button.addEventListener("click", () => render(button.dataset.dashboardTab)));
  render("dashboard");
}

document.addEventListener("DOMContentLoaded", bootDashboardTabs);
