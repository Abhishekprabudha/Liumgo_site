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
    subtitle: "100+ synthetic public, fleet and partner charging points plotted across Delhi for GenBI-led route planning.",
    agentLabel: "Select charging point",
    options: []
  },
  vehicle: {
    title: "EV vehicle catalogue for Delhi operations",
    subtitle: "30 vehicle options grouped across 2W, 3W and 4W categories, with dispatch-fit details and vehicle pictures for Delhi fleet deployment.",
    agentLabel: "Select vehicle",
    options: []
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

const vehicleCatalogSeed = {
  "2W": [
    ["Ola S1 Pro", "Scooter", "Range: ~170 km IDC", "Food, grocery and document delivery", "Fixed battery · AC charging", "South and Central Delhi compact delivery zones", "Best productivity when assigned to 18–25 km high-density loops."],
    ["Ather 450X", "Scooter", "Range: ~150 km IDC", "Quick commerce and premium courier", "Fixed battery · fast-charging ecosystem", "Saket, CP and Rohini app-tracked rider routes", "Use for riders requiring high reliability and frequent app-based tracking."],
    ["TVS iQube ST", "Scooter", "Range: ~145 km IDC", "Grocery, documents and light parcels", "Fixed battery · AC charging", "Residential delivery clusters in Dwarka and Janakpuri", "Comfortable option for steady riders covering repeat apartment drops."],
    ["Bajaj Chetak", "Scooter", "Range: ~126 km IDC", "Food delivery and customer-facing errands", "Fixed battery · AC charging", "Premium retail and restaurant routes", "Good fit where brand presentation and ride comfort are important."],
    ["Hero Vida V1 Pro", "Scooter", "Range: ~165 km IDC", "Quick commerce and medicine delivery", "Removable batteries · AC charging", "Hauz Khas, GK and Lajpat Nagar", "Battery-removal flexibility helps teams without dedicated overnight bays."],
    ["Ampere Magnus EX", "Scooter", "Range: ~100 km ARAI", "Low-cost local parcels and documents", "Removable battery · AC charging", "Short neighborhood loops from micro-hubs", "Use for low-distance routes where acquisition cost matters most."],
    ["Bounce Infinity E1", "Scooter", "Range: ~85 km IDC", "Hyperlocal food and small parcels", "Swappable / removable battery options", "Dense market runs near Karol Bagh and CP", "Best when paired with predictable swap or top-up windows."],
    ["Okaya Faast F4", "Scooter", "Range: ~140 km IDC", "Grocery bags and retail courier loads", "Fixed battery · AC charging", "West Delhi mixed retail clusters", "Useful for longer two-wheeler shifts with moderate payload."],
    ["Simple One", "Scooter", "Range: ~212 km IDC", "Extended quick-commerce coverage", "Fixed + removable battery setup", "Longer feeder routes between hubs", "Reserve for routes needing extra range buffer before return-to-hub."],
    ["Revolt RV400", "Motorcycle", "Range: ~150 km ARAI", "Documents, service visits and lightweight parcels", "Removable battery · AC charging", "Field-supervisor and rapid-response usage", "Motorcycle stance works well for urgent cross-zone trips."],
  ],
  "3W": [
    ["Euler HiLoad EV", "Cargo 3W", "Payload: ~680 kg", "Grocery crates, parcels and B2B replenishment", "Fixed battery · fast charge capable", "Okhla and Saket hub-to-spoke waves", "Ideal for replenishment before 11 AM and 4–7 PM waves."],
    ["Piaggio Ape E-Xtra FX", "Cargo 3W", "Payload: ~500 kg", "Retail replenishment, FMCG and e-commerce", "Fixed battery · AC charging", "Predictable retail loops", "Works well on scheduled loops with planned charge windows."],
    ["Mahindra Treo Zor", "Cargo 3W", "Payload: ~550 kg", "Parcel bags, grocery crates and returns", "Lithium-ion battery · AC charging", "South Delhi and West Delhi cargo lanes", "Strong option for multi-drop city cargo with familiar ergonomics."],
    ["Altigreen neEV High Deck", "Cargo 3W", "Payload: ~550 kg", "E-commerce sacks and high-volume crates", "Fixed battery · fast charging", "Dense B2B lanes around industrial clusters", "High-deck format helps teams separate bulky packages."],
    ["Omega Seiki Rage+", "Cargo 3W", "Payload: ~500 kg", "Cold-chain boxes, retail stock and parcels", "Fixed battery · AC charging", "Okhla pharma and market replenishment", "Good candidate for upfit-based pharma or insulated box use."],
    ["Kinetic Safar Jumbo", "Cargo 3W", "Payload: ~500 kg", "Bulk grocery and light FMCG", "Lithium battery · AC charging", "Morning grocery waves", "Use where loading simplicity and affordable operations are priority."],
    ["Atul Elite Cargo", "Cargo 3W", "Payload: ~400 kg", "Neighborhood retail and courier bags", "Lead-acid / lithium variants", "Short-range market access", "Useful for narrow lanes and smaller merchant routes."],
    ["Lohia Narain Cargo", "Cargo 3W", "Payload: ~500 kg", "General cargo and daily replenishment", "Lithium battery · AC charging", "Local hub distribution", "Best for predictable cargo duty cycles with simple maintenance."],
    ["ETO Trilux Cargo", "Cargo 3W", "Payload: ~500 kg", "Parcel consolidation and corporate deliveries", "Fixed battery · fleet charging", "Corporate and station-linked logistics", "Works well for managed fleet deployments with central charging."],
    ["YC Electric E-Loader", "Cargo 3W", "Payload: ~450 kg", "Budget cargo, returns and local wholesale", "Lead-acid / lithium variants", "Wholesale market loops", "Deploy on low-speed, low-distance routes with clear charging discipline."],
  ],
  "4W": [
    ["Tata Ace EV", "Mini truck", "Range: ~150 km certified", "B2B shipments, pharma crates and secondary distribution", "Fixed battery · fast charge capable", "Dwarka and Okhla consolidated lanes", "Assign to consolidated lanes where drop density offsets vehicle cost."],
    ["Mahindra Zor Grand", "Compact cargo EV", "Payload: ~400 kg", "City cargo, parcels and enterprise distribution", "Fixed battery · AC charging", "Narrow Delhi market access", "Good for Chandni Chowk, Karol Bagh and Lajpat Nagar access."],
    ["Tata Ace EV 1000", "Mini truck", "Payload: ~1 tonne", "Heavier B2B cartons and wholesale replenishment", "Fixed battery · fleet charging", "Industrial and warehouse lanes", "Reserve for heavier consolidated manifests and fewer drops."],
    ["EKA K1.5", "Electric light commercial vehicle", "Payload: ~1.5 tonne", "Bulky B2B freight and scheduled replenishment", "Fixed battery · DC charging", "Hub-to-hub and industrial corridors", "Use when route planning can protect range and loading windows."],
    ["Switch IeV4", "Electric LCV", "Payload: ~1.7 tonne", "Large parcels, grocery pallets and distribution runs", "Fixed battery · DC charging", "Outer ring and warehouse routes", "Best for high-volume lanes with disciplined depot charging."],
    ["Switch IeV3", "Electric LCV", "Payload: ~1.2 tonne", "Retail cartons and urban logistics", "Fixed battery · DC charging", "Mixed city and arterial runs", "Flexible 4W option between mini-truck and larger LCV duties."],
    ["Mahindra eSupro Cargo Van", "Cargo van", "Range: ~115 km", "Protected parcel and service logistics", "Fixed battery · AC charging", "Documented handover and secure parcel routes", "Closed body is useful for weather-sensitive parcels."],
    ["BYD T3", "Cargo van", "Range: ~250 km NEDC", "Premium parcels, pharma and electronics", "Fixed battery · AC / DC charging", "Longer secure delivery routes", "Use for higher-value loads that need enclosed cargo security."],
    ["Omega Seiki M1KA", "Electric truck", "Payload: ~1 tonne", "B2B cargo and larger retail replenishment", "Fixed battery · fleet charging", "Okhla, Bawana and warehouse clusters", "Good candidate for planned day routes with loading-dock access."],
    ["Ashok Leyland BOSS EV", "Electric truck", "Payload: heavy-duty urban cargo", "Large scheduled shipments and enterprise logistics", "Depot charging · commercial duty cycle", "Warehouse-to-client trunk movements", "Use for larger clients once lane demand justifies dedicated capacity."],
  ]
};

function vehicleImage(category, index, title) {
  const palette = { "2W": ["#4d148c", "#ff6600"], "3W": ["#0f766e", "#4d148c"], "4W": ["#1d4ed8", "#ff6600"] };
  const [primary, accent] = palette[category];
  const label = encodeURIComponent(title.replace(/&/g, "and"));
  const wheels = category === "2W" ? 2 : category === "3W" ? 3 : 4;
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 390'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='${encodeURIComponent(primary)}'/%3E%3Cstop offset='1' stop-color='${encodeURIComponent(accent)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='390' rx='34' fill='%23f8fafc'/%3E%3Ccircle cx='535' cy='80' r='92' fill='${encodeURIComponent(accent)}' opacity='.14'/%3E%3Cpath d='M88 292h464' stroke='%23dbe4ee' stroke-width='12' stroke-linecap='round'/%3E%3Cpath d='M${category === "2W" ? "206 206h146l60 58H152z" : category === "3W" ? "150 190h250l80 78H120z" : "126 178h348l64 90H92z"}' fill='url(%23g)'/%3E%3Cpath d='M${category === "2W" ? "274 150h70l42 56h-112z" : category === "3W" ? "356 128h86l42 62h-128z" : "178 126h210l62 52H152z"}' fill='%23ffffff' opacity='.86'/%3E%3Cg fill='%23111827'%3E${Array.from({length:wheels},(_,i)=>`%3Ccircle cx='${wheels===2?[198,426][i]:wheels===3?[174,322,474][i]:[152,272,416,520][i]}' cy='292' r='32'/%3E%3Ccircle cx='${wheels===2?[198,426][i]:wheels===3?[174,322,474][i]:[152,272,416,520][i]}' cy='292' r='14' fill='%23e5e7eb'/%3E`).join("")}%3C/g%3E%3Ctext x='42' y='58' font-family='Arial, sans-serif' font-size='30' font-weight='800' fill='${encodeURIComponent(primary)}'%3E${category} EV%3C/text%3E%3Ctext x='42' y='94' font-family='Arial, sans-serif' font-size='22' font-weight='700' fill='%23374151'%3E${label}%3C/text%3E%3C/svg%3E`;
}

function buildVehicleCatalogue() {
  return Object.entries(vehicleCatalogSeed).flatMap(([category, vehicles]) => vehicles.map(([title, type, spec, payload, battery, useCase, insight], index) => ({
    key: `${category} · ${title}`,
    title,
    category,
    image: vehicleImage(category, index, title),
    meta: `Category: ${category} ${type} · ${spec}`,
    detail: `Payload fit: ${payload}. Battery: ${battery}. Typical Delhi use: ${useCase}.`,
    insight
  })));
}

const delhiChargingLocalities = [
  { area: "Saket", x: 48, y: 70, pin: "110017" }, { area: "Connaught Place", x: 52, y: 48, pin: "110001" }, { area: "Dwarka", x: 23, y: 60, pin: "110075" },
  { area: "Okhla", x: 63, y: 72, pin: "110020" }, { area: "Rohini", x: 38, y: 24, pin: "110089" }, { area: "Nehru Place", x: 58, y: 68, pin: "110019" },
  { area: "Karol Bagh", x: 47, y: 42, pin: "110005" }, { area: "Lajpat Nagar", x: 57, y: 63, pin: "110024" }, { area: "Janakpuri", x: 30, y: 53, pin: "110058" },
  { area: "Vasant Kunj", x: 41, y: 74, pin: "110070" }, { area: "Mayur Vihar", x: 70, y: 52, pin: "110091" }, { area: "Shahdara", x: 72, y: 40, pin: "110032" },
  { area: "Pitampura", x: 40, y: 32, pin: "110034" }, { area: "Chandni Chowk", x: 55, y: 39, pin: "110006" }, { area: "Hauz Khas", x: 50, y: 66, pin: "110016" },
  { area: "Greater Kailash", x: 59, y: 66, pin: "110048" }, { area: "Punjabi Bagh", x: 38, y: 44, pin: "110026" }, { area: "Preet Vihar", x: 68, y: 46, pin: "110092" }
];

const chargingOperators = ["Tata Power EZ", "Statiq", "ChargeZone", "BSES EV", "E-Fill", "Lium Go Partner"];
const chargingConnectors = ["CCS2 / Type-2", "Bharat AC / DC", "Type-2 AC", "DC fast / AC", "Fleet AC + CCS2"];

function buildDelhiChargingPoints() {
  return Array.from({ length: 108 }, (_, index) => {
    const locality = delhiChargingLocalities[index % delhiChargingLocalities.length];
    const ring = Math.floor(index / delhiChargingLocalities.length);
    const xOffset = ((index * 7) % 13) - 6;
    const yOffset = ((index * 11) % 15) - 7;
    const chargerCount = 2 + ((index + ring) % 7);
    const fastSlots = 1 + (index % 4);
    const utilization = 42 + ((index * 5) % 48);
    const operator = chargingOperators[index % chargingOperators.length];
    const connector = chargingConnectors[index % chargingConnectors.length];
    const pointNumber = String(index + 1).padStart(3, "0");

    return {
      key: `${locality.area} CP-${pointNumber}`,
      title: `${locality.area} EV Charge Point ${pointNumber}`,
      meta: `Area: ${locality.area} · ${chargerCount} chargers · ${connector}`,
      detail: `Address: ${locality.area} mobility cluster ${ring + 1}, New Delhi ${locality.pin}. Operator: ${operator}. Available capacity: ${fastSlots} fast slots plus ${Math.max(chargerCount - fastSlots, 1)} AC fleet bays.`,
      insight: utilization > 78 ? "GenBI flags heavy demand; reserve slots before dispatching low-SOC vehicles." : "GenBI sees usable buffer; suitable for planned top-ups and return-to-hub charging.",
      area: locality.area,
      operator,
      connectors: connector,
      chargers: chargerCount,
      fastSlots,
      utilization,
      x: Math.min(88, Math.max(12, locality.x + xOffset)),
      y: Math.min(86, Math.max(14, locality.y + yOffset))
    };
  });
}

dashboardData.vehicle.options = buildVehicleCatalogue();
dashboardData.charging.options = buildDelhiChargingPoints();

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
  const isCharging = tabKey === "charging";
  const isVehicle = tabKey === "vehicle";
  const visibleOptions = isCharging ? tab.options.slice(0, 36) : tab.options;
  const renderCard = (item, index) => `<article class="genbi-card${item.image ? " genbi-card--vehicle" : ""}">${item.image ? `<img class="genbi-card__image" src="${item.image}" alt="${item.title} ${item.category || "EV"} illustration" loading="lazy">` : ""}<div class="genbi-card__number">${String(index + 1).padStart(2, "0")}</div><h3>${item.title}</h3><p class="genbi-card__meta">${item.meta}</p><p>${item.detail}</p><span>${item.insight}</span></article>`;
  const cards = isVehicle
    ? ["2W", "3W", "4W"].map((category) => {
        const categoryItems = visibleOptions.filter((item) => item.category === category);
        return `<section class="vehicle-category"><div class="vehicle-category__header"><h3>${category} vehicles</h3><span>${categoryItems.length} options</span></div><div class="genbi-grid genbi-grid--vehicle">${categoryItems.map((item, index) => renderCard(item, index)).join("")}</div></section>`;
      }).join("")
    : visibleOptions.map((item, index) => renderCard(item, index)).join("");
  const options = tab.options.map((item) => `<option value="${item.key}">${item.key}</option>`).join("");
  const chargingMap = isCharging ? `<section class="charging-map-panel"><div class="charging-map-panel__map">${tab.options.map((item) => `<button class="charging-pin${item.utilization > 78 ? " charging-pin--busy" : ""}" style="--pin-x:${item.x}%; --pin-y:${item.y}%;" data-charge-key="${item.key}" aria-label="${item.title}"></button>`).join("")}</div><div class="charging-map-panel__legend"><span><i class="charging-dot"></i> Available / moderate</span><span><i class="charging-dot charging-dot--busy"></i> High-demand GenBI alert</span><strong>${tab.options.length} points across Delhi</strong></div></section>` : "";
  const listNote = isCharging ? `<p class="genbi-list-note">Showing 36 highlighted cards below; all ${tab.options.length} charging points are plotted on the Delhi map and available in the GenBI Agent selector.</p>` : "";
  return `<div class="genbi-hero"><div><p class="genbi-eyebrow">GenBI workspace · Delhi EV network</p><h2>${tab.title}</h2><p>${tab.subtitle}</p></div><div class="genbi-kpi"><strong>${tab.options.length}</strong><span>records ready</span></div></div>${chargingMap}${listNote}<div class="genbi-layout${isVehicle ? " genbi-layout--vehicle" : ""}"><section class="${isVehicle ? "vehicle-catalog" : `genbi-grid${isCharging ? " genbi-grid--charging" : ""}`}">${cards}</section><aside class="page-highlight-card genbi-agent"><div class="genbi-agent__badge">✨ GenBI Agent</div><h3>Ask by selection</h3><label for="genbi-select">${tab.agentLabel}</label><select id="genbi-select" class="genbi-select">${options}</select><div id="genbi-answer" class="genbi-answer"></div></aside></div>`;
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
      answer.innerHTML = `${item.image ? `<img class="genbi-answer__image" src="${item.image}" alt="${item.title} ${item.category || "EV"} illustration">` : ""}<h4>${item.title}</h4><p class="genbi-answer__meta">${item.meta}</p><p>${item.detail}</p><strong>Insight:</strong><p>${item.insight}</p>${item.utilization ? `<p><strong>GenBI capability:</strong> utilization ${item.utilization}%, ${item.fastSlots} fast slots, ${item.chargers} total chargers. Use this to match SOC, connector type and route ETA before dispatch.</p>` : ""}`;
      document.querySelectorAll("[data-charge-key]").forEach((pin) => pin.classList.toggle("charging-pin--selected", pin.dataset.chargeKey === item.key));
    }
    select.addEventListener("change", updateAnswer);
    document.querySelectorAll("[data-charge-key]").forEach((pin) => {
      pin.addEventListener("click", () => {
        select.value = pin.dataset.chargeKey;
        updateAnswer();
      });
    });
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
