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
    title: "Multi-fuel vehicle catalogue for Delhi operations",
    subtitle: "30 vehicle options across 2W, 3W and 4W categories, covering ICE, EV and alternative fuels with dispatch-fit guidance for Delhi fleet deployment.",
    agentLabel: "Select vehicle",
    options: []
  },
  maintenance: {
    title: "Maintenance planner",
    subtitle: "Synthetic Delhi EV registrations with downtime, preventive maintenance schedules and fleet-health insights.",
    agentLabel: "Select registration",
    options: [
      { key: "DL9S-EV-2146", title: "DL9S-EV-2146 · 2W · Ather 450X", category: "2W", downtimeDays: 1.2, nextPm: "08 Jul 2026", meta: "Category: 2W · Downtime: 1.2 days · Next PM: 08 Jul 2026", detail: "Open checks: brake pad inspection, tyre rotation and charger-port cleaning. Last route: Saket–Malviya Nagar grocery wave.", insight: "Low risk; combine PM with overnight charging to avoid rider idle time." },
      { key: "DL7S-EV-3308", title: "DL7S-EV-3308 · 2W · Ola S1 Pro", category: "2W", downtimeDays: 2.0, nextPm: "09 Jul 2026", meta: "Category: 2W · Downtime: 2.0 days · Next PM: 09 Jul 2026", detail: "Open checks: rear tyre, mirror assembly and rider-reported range drop. Last route: Rohini quick-commerce loop.", insight: "Investigate range variance before assigning long north ring routes." },
      { key: "DL2S-EV-1180", title: "DL2S-EV-1180 · 2W · Ola S1 Pro", category: "2W", downtimeDays: 1.6, nextPm: "11 Jul 2026", meta: "Category: 2W · Downtime: 1.6 days · Next PM: 11 Jul 2026", detail: "Open checks: front fork tightening, battery health scan and brake lever calibration. Last route: Lajpat Nagar food-delivery peak.", insight: "Route only on short lunch loops until fork check is complete." },
      { key: "DL6S-EV-4077", title: "DL6S-EV-4077 · 2W · Ather 450X", category: "2W", downtimeDays: 2.4, nextPm: "07 Jul 2026", meta: "Category: 2W · Downtime: 2.4 days · Next PM: 07 Jul 2026", detail: "Open checks: controller diagnostics, rear shock inspection and tyre pressure audit. Last route: Rohini Sector 18 quick-commerce shift.", insight: "Medium risk; clear controller alerts before next high-density assignment." },
      { key: "DL4S-EV-5631", title: "DL4S-EV-5631 · 2W · TVS iQube ST", category: "2W", downtimeDays: 0.7, nextPm: "13 Jul 2026", meta: "Category: 2W · Downtime: 0.7 days · Next PM: 13 Jul 2026", detail: "Open checks: routine PM, charger cable inspection and wheel alignment. Last route: Dwarka apartment grocery drops.", insight: "Healthy asset; keep available for west Delhi residential clusters." },
      { key: "DL8S-EV-9024", title: "DL8S-EV-9024 · 2W · Bajaj Chetak", category: "2W", downtimeDays: 1.0, nextPm: "15 Jul 2026", meta: "Category: 2W · Downtime: 1.0 days · Next PM: 15 Jul 2026", detail: "Open checks: body panel fitment, brake-fluid top-up and telematics ping review. Last route: Connaught Place restaurant errands.", insight: "Low downtime; align PM with off-peak afternoon parking." },
      { key: "DL5S-EV-7318", title: "DL5S-EV-7318 · 2W · Hero Vida V1 Pro", category: "2W", downtimeDays: 1.8, nextPm: "10 Jul 2026", meta: "Category: 2W · Downtime: 1.8 days · Next PM: 10 Jul 2026", detail: "Open checks: removable battery latch, range validation and headlamp check. Last route: Hauz Khas medicine delivery.", insight: "GenBI recommends battery-swap audit before pharma night route." },
      { key: "DL1S-EV-6842", title: "DL1S-EV-6842 · 2W · Ampere Magnus EX", category: "2W", downtimeDays: 0.9, nextPm: "16 Jul 2026", meta: "Category: 2W · Downtime: 0.9 days · Next PM: 16 Jul 2026", detail: "Open checks: chain lubrication, tyre tread check and app tracker reset. Last route: Karol Bagh document courier loop.", insight: "Suitable for micro-hub routes after quick preventive service." },
      { key: "DL3S-EV-2765", title: "DL3S-EV-2765 · 2W · Okaya Faast F4", category: "2W", downtimeDays: 1.4, nextPm: "14 Jul 2026", meta: "Category: 2W · Downtime: 1.4 days · Next PM: 14 Jul 2026", detail: "Open checks: AC charger handshake, brake pad review and firmware check. Last route: Janakpuri retail parcels.", insight: "Keep below 45 km daily duty until charger handshake is stable." },
      { key: "DL0S-EV-5197", title: "DL0S-EV-5197 · 2W · Revolt RV400", category: "2W", downtimeDays: 2.2, nextPm: "12 Jul 2026", meta: "Category: 2W · Downtime: 2.2 days · Next PM: 12 Jul 2026", detail: "Open checks: motor mount inspection, range test and indicator assembly replacement. Last route: CP field-supervisor rapid response.", insight: "Hold from urgent cross-zone trips until motor mount inspection passes." },
      { key: "DL3C-EV-8021", title: "DL3C-EV-8021 · 3W · Euler HiLoad", category: "3W", downtimeDays: 3.5, nextPm: "06 Jul 2026", meta: "Category: 3W · Downtime: 3.5 days · Next PM: 06 Jul 2026", detail: "Open checks: suspension noise, cargo-bed latch and battery thermal scan. Last route: Okhla pharma replenishment.", insight: "High priority; downtime above target and route has cold-chain dependency." },
      { key: "DL5L-EV-7712", title: "DL5L-EV-7712 · 3W · Piaggio Ape E-Xtra", category: "3W", downtimeDays: 0.8, nextPm: "10 Jul 2026", meta: "Category: 3W · Downtime: 0.8 days · Next PM: 10 Jul 2026", detail: "Open checks: cabin wiring, cargo lock and AC charger handshake. Last route: CP restaurant supply.", insight: "Schedule as low-priority PM after lunch wave." },
      { key: "DL8L-EV-6504", title: "DL8L-EV-6504 · 3W · Euler HiLoad", category: "3W", downtimeDays: 2.9, nextPm: "09 Jul 2026", meta: "Category: 3W · Downtime: 2.9 days · Next PM: 09 Jul 2026", detail: "Open checks: rear axle noise, tyre replacement and SOC calibration. Last route: Nangloi warehouse replenishment.", insight: "GenBI flags for early bay slot because downtime is trending upward." },
      { key: "DL2L-EV-3349", title: "DL2L-EV-3349 · 3W · Mahindra Treo Zor", category: "3W", downtimeDays: 1.7, nextPm: "13 Jul 2026", meta: "Category: 3W · Downtime: 1.7 days · Next PM: 13 Jul 2026", detail: "Open checks: cargo curtain repair, brake inspection and hub bearing check. Last route: Saket grocery crate shuttle.", insight: "Good candidate for preventive work between morning and evening waves." },
      { key: "DL6L-EV-1186", title: "DL6L-EV-1186 · 3W · Altigreen neEV High Deck", category: "3W", downtimeDays: 2.1, nextPm: "11 Jul 2026", meta: "Category: 3W · Downtime: 2.1 days · Next PM: 11 Jul 2026", detail: "Open checks: high-deck latch, DC fast-charge logs and suspension bush review. Last route: Okhla industrial B2B lane.", insight: "Protect for planned B2B lanes after suspension bush review." },
      { key: "DL1L-EV-4490", title: "DL1L-EV-4490 · 4W · Tata Ace EV", category: "4W", downtimeDays: 0.5, nextPm: "12 Jul 2026", meta: "Category: 4W · Downtime: 0.5 days · Next PM: 12 Jul 2026", detail: "Open checks: telematics SIM, brake-fluid level and DC charging cycle review. Last route: Dwarka B2B parcels.", insight: "Healthy asset; keep for west Delhi consolidated drops." }
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
    title: "OEM, leasing and vehicle ecosystem",
    subtitle: "Delhi-ready OEMs, leasing partners and FinTechs across ICE, electric and alternative-fuel fleets.",
    agentLabel: "Select partner",
    options: [
      { key: "Euler Motors", title: "Euler Motors", meta: "OEM · Cargo 3W", detail: "Offers HiLoad cargo EVs, service support and fleet-oriented product configurations for Delhi NCR logistics.", insight: "Strong option for high-payload grocery and B2B replenishment." },
      { key: "Piaggio Vehicles", title: "Piaggio Vehicles", meta: "OEM · ICE / CNG / EV cargo 3W", detail: "Cargo three-wheeler platforms across conventional, CNG and electric powertrains, supported by an established commercial dealer and service footprint.", insight: "Good for comparing fuel options against route economics and local infrastructure." },
      { key: "Tata Motors", title: "Tata Motors", meta: "OEM · ICE / CNG / EV 4W cargo", detail: "Multi-fuel commercial vehicle platforms for payloads ranging from city distribution to larger enterprise fleet deployments.", insight: "Match the powertrain and body configuration to payload, range and refuelling or charging access." },
      { key: "Mahindra Last Mile Mobility", title: "Mahindra Last Mile Mobility", meta: "OEM · ICE / CNG / EV 3W and 4W", detail: "Multi-powertrain three-wheelers and compact cargo platforms with commercial-service familiarity across Indian cities.", insight: "Good fit where lane needs, driver familiarity and local energy access must be balanced." },
      { key: "Ashok Leyland", title: "Ashok Leyland", meta: "OEM · ICE / CNG / LNG / EV commercial vehicles", detail: "Commercial vehicle options across conventional and alternative powertrains for city, mid-mile and hub-to-hub freight.", insight: "Evaluate by payload, duty cycle, emissions goals and available fuel or charging infrastructure." },
      { key: "Maruti Suzuki Commercial", title: "Maruti Suzuki Commercial", meta: "OEM · Petrol / CNG light cargo", detail: "Compact light-commercial platforms for urban deliveries where broad refuelling and service access are priorities.", insight: "Consider for flexible city routes that need rapid refuelling and a compact footprint." },
      { key: "Omega Seiki Mobility", title: "Omega Seiki Mobility", meta: "OEM · Cargo 3W / LCV", detail: "Cargo three-wheelers and light commercial EVs for urban freight, retail replenishment and cold-chain upfit pilots.", insight: "Use for specialized body configurations and medium-payload route experiments." },
      { key: "Altigreen", title: "Altigreen", meta: "OEM · Cargo 3W", detail: "High-deck electric cargo three-wheelers positioned for dense B2B, e-commerce and grocery crate movement.", insight: "Strong candidate for high-volume lanes around industrial and dark-store clusters." },
      { key: "Kinetic Green", title: "Kinetic Green", meta: "OEM · Cargo 3W", detail: "Commercial electric three-wheelers for cost-conscious local cargo operations and predictable hub-to-market loops.", insight: "Useful where acquisition economics are the primary deployment constraint." },
      { key: "Atul Auto", title: "Atul Auto", meta: "OEM · Cargo 3W", detail: "Electric three-wheeler platforms suited to neighborhood retail deliveries and narrow-lane access.", insight: "Best for short-distance local merchant lanes with simple operating patterns." },
      { key: "ETO Motors", title: "ETO Motors", meta: "OEM / Operator · Managed EV fleets", detail: "Managed electric mobility deployments with three-wheeler platforms, charging coordination and fleet operations experience.", insight: "Use for station-linked or managed-fleet routes requiring operational support." },
      { key: "YC Electric", title: "YC Electric", meta: "OEM · E-loader", detail: "Budget-oriented electric loaders for wholesale, local cargo and low-speed replenishment use cases.", insight: "Deploy where routes are short, predictable and charging discipline is easy to enforce." },
      { key: "Ola Electric", title: "Ola Electric", meta: "OEM · 2W", detail: "Electric scooter portfolio for high-density rider deployments across food, grocery and document delivery.", insight: "Good option for compact delivery loops with strong charging and uptime controls." },
      { key: "Ather Energy", title: "Ather Energy", meta: "OEM · 2W", detail: "Premium electric scooters with connected features and fast-charging ecosystem support in urban corridors.", insight: "Reserve for high-reliability app-tracked riders and premium courier lanes." },
      { key: "TVS Motor", title: "TVS Motor", meta: "OEM · ICE / EV 2W", detail: "Conventional and electric two-wheeler options backed by a broad service footprint and familiar rider ergonomics.", insight: "Compare route distance, energy access and total cost for mixed residential and grocery clusters." },
      { key: "Bajaj Auto", title: "Bajaj Auto", meta: "OEM · ICE / CNG / EV 2W and 3W", detail: "Two- and three-wheeler platforms across conventional, gaseous-fuel and electric powertrains for varied urban duty cycles.", insight: "Use the powertrain best aligned with payload, rider comfort and daily route intensity." },
      { key: "Hero MotoCorp Vida", title: "Hero MotoCorp Vida", meta: "OEM · 2W", detail: "Electric scooter platform with removable-battery flexibility for teams lacking dedicated overnight charging bays.", insight: "Best for medicine and quick-commerce routes needing battery flexibility." },
      { key: "Ampere Electric", title: "Ampere Electric", meta: "OEM · 2W", detail: "Value-oriented electric scooters for low-distance local parcel, document and neighborhood delivery routes.", insight: "Use for cost-sensitive micro-hub deployments." },
      { key: "Switch Mobility", title: "Switch Mobility", meta: "OEM · Electric LCV", detail: "Electric light commercial vehicles for larger parcel, grocery and distribution runs on depot-charged duty cycles.", insight: "Evaluate for outer-ring or warehouse-to-hub lanes with disciplined loading windows." },
      { key: "EKA Mobility", title: "EKA Mobility", meta: "OEM · Electric LCV", detail: "Electric light commercial vehicles targeting heavier B2B freight and scheduled replenishment operations.", insight: "Good for hub-to-hub or industrial corridor pilots needing higher payload capacity." },
      { key: "BYD India", title: "BYD India", meta: "OEM · Cargo van", detail: "Electric van options suited to protected parcels, pharma movement and higher-value secure deliveries.", insight: "Use where enclosed cargo security and longer range are important." },
      { key: "Revfin", title: "Revfin", meta: "FinTech · EV financing", detail: "EV-focused financing support for drivers and fleet operators with emphasis on commercial electric mobility.", insight: "Use where asset-light onboarding and driver ownership pilots are required." },
      { key: "Alt Mobility", title: "Alt Mobility", meta: "Leasing · fleet management", detail: "EV leasing and lifecycle management platform for commercial electric fleets.", insight: "Useful for scaling without upfront capex and with lifecycle support." },
      { key: "Turno", title: "Turno", meta: "FinTech / Marketplace · EV financing", detail: "Commercial EV financing and marketplace support for small operators and driver entrepreneurs.", insight: "Consider for rapid onboarding where vehicle discovery and finance need to be bundled." },
      { key: "Mufin Green Finance", title: "Mufin Green Finance", meta: "FinTech · EV financing", detail: "Green mobility financing for electric two-wheelers, three-wheelers and fleet-focused commercial EV assets.", insight: "Useful for expanding partner capacity with structured credit options." }
    ]
  },
  parking: {
    title: "Delhi multi-fuel parking and hub intelligence",
    subtitle: "100+ synthetic parking yards, micro-hubs and fleet staging points for every vehicle class—from 2W, 3W and 4W to commercial vehicles—across ICE, EV and alternative-fuel fleets, plotted across Delhi for GenBI-led dispatch planning.",
    agentLabel: "Select parking or hub",
    options: []
  },
  clients: {
    title: "Client command centre",
    subtitle: "25+ representative EV logistics clients in Delhi with account and service-level details.",
    agentLabel: "Select client",
    options: []
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


const clientAccountSeed = [
  ["Zomato", "Food delivery", "2W", "Saket, CP, Rohini, Dwarka", "95% under promised ETA", "850 daily drops", "Needs high rider availability during lunch and dinner peaks."],
  ["Blinkit", "Quick commerce", "2W / 3W", "South and West dark stores", "rapid dispatch with short-haul density", "1,150 daily drops", "Charge planning should mirror dark-store replenishment cycles."],
  ["Tata 1mg", "Pharma", "2W / 4W", "Okhla, Lajpat Nagar, Dwarka and CP", "high handover accuracy and exception tracking", "430 daily drops", "Assign experienced drivers and prioritize package condition checks."],
  ["BigBasket", "Grocery", "3W / 4W", "Saket, Dwarka, Janakpuri and Rohini", "planned hub-to-home grocery waves", "620 daily drops", "Use 3W cargo EVs for dense basket consolidation."],
  ["Amazon", "E-commerce", "2W / 3W / 4W", "Okhla, Bawana, Dwarka and Mayur Vihar", "same-day parcel handover and return scans", "980 daily drops", "Balance 4W trunk movement with 2W last-mile rider density."],
  ["Flipkart", "E-commerce", "2W / 3W / 4W", "Nangloi, Karol Bagh, Shahdara and Saket", "first-attempt delivery and reverse-pickup visibility", "910 daily drops", "Reserve 3W cargo EVs for marketplace sale-day parcel spikes."],
  ["Swiggy", "Food delivery", "2W", "CP, Hauz Khas, GK and Rohini", "peak-hour pickup-to-drop cycle control", "780 daily drops", "Protect rider charging windows between lunch and dinner peaks."],
  ["Zepto", "Quick commerce", "2W / 3W", "Hauz Khas, Lajpat Nagar, Punjabi Bagh and Dwarka", "dense 10-minute neighborhood delivery loops", "1,020 daily drops", "Position standby riders near high-throughput dark stores."],
  ["Dunzo", "Hyperlocal courier", "2W", "CP, Karol Bagh, Janakpuri and Mayur Vihar", "multi-category pickup accuracy", "360 daily drops", "Cluster assignments by merchant type to reduce deadhead travel."],
  ["Delhivery", "Parcel logistics", "3W / 4W", "Okhla, Bawana, Shahdara and Dwarka", "scheduled parcel sweeps and hub injections", "740 daily drops", "Use cargo EVs for consolidated bags before residential rider splits."],
  ["Blue Dart", "Express logistics", "2W / 4W", "Airport corridor, CP, Okhla and Saket", "premium timed delivery and proof-of-delivery", "310 daily drops", "Assign enclosed 4W EVs for secure and weather-sensitive consignments."],
  ["Shadowfax", "On-demand logistics", "2W / 3W", "Rohini, Dwarka, Lajpat Nagar and Mayur Vihar", "flexible rider capacity and surge absorption", "690 daily drops", "Use GenBI to match floating riders to short-notice client waves."],
  ["Porter", "Intra-city cargo", "3W / 4W", "Okhla, Naraina, Bawana and Shahdara", "scheduled cargo pickup windows", "280 daily trips", "Prioritize higher-payload EVs where loading-dock dwell time is predictable."],
  ["JioMart", "Grocery and retail", "2W / 3W / 4W", "Dwarka, Rohini, Janakpuri and Shahdara", "basket integrity and slot adherence", "560 daily drops", "Mix 3W grocery crates with 2W top-up orders during evening waves."],
  ["Reliance Digital", "Electronics retail", "2W / 4W", "CP, Saket, Punjabi Bagh and Nehru Place", "safe handling and scheduled customer handover", "145 daily drops", "Route fragile electronics on enclosed EV capacity with trained handlers."],
  ["Apollo 24|7", "Pharma", "2W / 4W", "Lajpat Nagar, Saket, Rohini and Mayur Vihar", "prescription handover accuracy", "390 daily drops", "Keep experienced riders on medicine lanes and audit failed handovers daily."],
  ["Netmeds", "Pharma", "2W / 4W", "Okhla, Dwarka, Janakpuri and CP", "temperature-aware delivery and exception logs", "340 daily drops", "Use 4W EVs for clinic replenishment and 2W for patient home deliveries."],
  ["FirstCry", "Retail", "2W / 3W", "Rohini, Dwarka, Saket and Shahdara", "family-slot adherence and return pickup quality", "220 daily drops", "Consolidate bulky baby-care cartons on 3W routes before rider fan-out."],
  ["Nykaa", "Beauty retail", "2W / 4W", "CP, GK, Saket and Punjabi Bagh", "premium packaging condition and timed handover", "260 daily drops", "Assign low-damage lanes and reinforce package-condition proofing."],
  ["Myntra", "Fashion e-commerce", "2W / 3W", "Karol Bagh, Dwarka, Rohini and Lajpat Nagar", "delivery plus exchange pickup tracking", "520 daily drops", "Use 3W EVs for return-heavy sale periods and dense apartment clusters."],
  ["Urban Company", "Service logistics", "2W", "Saket, Hauz Khas, Janakpuri and Mayur Vihar", "technician kit movement and on-time arrival", "180 daily service movements", "Pair field-service routes with document and spare-part micro-deliveries."],
  ["Lenskart", "Optical retail", "2W", "CP, Rohini, Dwarka and Lajpat Nagar", "small-parcel safe handover", "210 daily drops", "Use compact 2W loops with strict handover verification for eyewear orders."],
  ["Domino's", "Food delivery", "2W", "Saket, CP, Rohini and Janakpuri", "hot-food ETA adherence", "640 daily drops", "Stage charged riders close to restaurant clusters before meal peaks."],
  ["McDonald's", "Food delivery", "2W", "CP, Dwarka, Saket and Mayur Vihar", "restaurant dispatch speed and customer ETA", "410 daily drops", "Separate short food loops from parcel routes to protect service levels."],
  ["Metro Cash & Carry", "B2B wholesale", "3W / 4W", "Okhla, Bawana, Shahdara and Naraina", "bulk order slot adherence", "190 daily trips", "Use planned 4W lanes for heavier cartons and 3W for market top-ups."],
  ["MedPlus", "Pharma retail", "2W / 4W", "Lajpat Nagar, Karol Bagh, Rohini and Saket", "medicine availability and delivery accuracy", "300 daily drops", "Prioritize rider continuity and exception escalation for medicine orders."],
  ["FreshToHome", "Fresh food", "2W / 3W / 4W", "Okhla, Dwarka, Saket and Mayur Vihar", "cold-chain aware handover windows", "275 daily drops", "Assign insulated cargo options and avoid long dwell before customer handoff."],
  ["Country Delight", "Dairy delivery", "2W / 3W", "Rohini, Dwarka, Janakpuri and Pitampura", "early-morning subscription completion", "700 daily drops", "Plan overnight charging so riders are ready before the dawn delivery wave."]
];

function buildClientAccounts() {
  return clientAccountSeed.map(([name, segment, fleetMix, coverage, sla, volume, insight]) => ({
    key: name,
    title: name,
    meta: `Segment: ${segment} · Fleet mix: ${fleetMix}`,
    detail: `Delhi coverage: ${coverage}. SLA: ${sla}. Current volume: ${volume}.`,
    insight
  }));
}

const vehicleCatalogSeed = {
  "2W": [
    ["TVS Apache RTR", "Motorcycle", "ICE · petrol", "Food, parcels and field-service runs", "Rapid refuelling through the city network", "Long or variable daily routes", "Use where fast turnaround and broad fuel access outweigh charging needs."],
    ["Hero Splendor", "Motorcycle", "ICE · petrol", "Documents, food and lightweight parcels", "High-efficiency conventional powertrain", "High-frequency neighbourhood delivery", "A familiar, serviceable choice for cost-sensitive rider fleets."],
    ["Honda Activa", "Scooter", "ICE · petrol", "Food, grocery and customer-facing errands", "Rapid refuelling and broad service coverage", "Dense residential and market clusters", "Well suited to stop-start routes where rider familiarity matters."],
    ["Bajaj Pulsar", "Motorcycle", "ICE · petrol", "Courier, service visits and cross-zone trips", "Conventional fuel with quick replenishment", "Longer arterial routes", "Consider for urgent assignments needing range flexibility."],
    ["Ola S1 Pro", "Scooter", "EV · battery electric", "Food, grocery and document delivery", "Plug-in charging", "Compact delivery zones with planned charging", "Best productivity comes from matching range and charging windows to the route."],
    ["Ather 450X", "Scooter", "EV · battery electric", "Quick commerce and premium courier", "Connected charging ecosystem", "App-tracked urban routes", "Use where connected features and predictable energy access support uptime."],
    ["TVS iQube", "Scooter", "EV · battery electric", "Grocery, documents and light parcels", "Plug-in charging", "Repeat apartment and retail drops", "A practical electric option for steady, planned shifts."],
    ["Bajaj Chetak", "Scooter", "EV · battery electric", "Food delivery and customer-facing errands", "Plug-in charging", "Premium retail and restaurant routes", "Good fit where presentation, comfort and planned charging all matter."],
    ["Vida V1", "Scooter", "EV · removable battery", "Quick commerce and medicine delivery", "Removable-battery charging", "Sites without dedicated overnight bays", "Battery portability adds flexibility to energy planning."],
    ["Hydrogen fuel-cell 2W concept", "Motorcycle", "Alternative fuel · hydrogen", "Pilot courier and lightweight parcel routes", "Hydrogen refuelling", "Controlled innovation corridors", "Evaluate only where certified vehicles, safe refuelling and service support are available."],
  ],
  "3W": [
    ["Bajaj Maxima Cargo", "Cargo 3W", "ICE · petrol / diesel", "Retail stock, parcels and market replenishment", "Rapid liquid-fuel refuelling", "Variable city cargo duty", "Match the engine and body variant to payload, regulations and route economics."],
    ["Piaggio Ape Xtra", "Cargo 3W", "ICE · diesel", "FMCG, wholesale and general cargo", "Broad conventional-fuel access", "Market and industrial lanes", "Useful where payload resilience and service reach are priorities."],
    ["Bajaj Maxima C", "Cargo 3W", "Alternative fuel · CNG", "Grocery crates and urban B2B stock", "CNG station refuelling", "Routes with dependable CNG access", "Plan refuelling around station density and queue time."],
    ["Piaggio Ape CNG", "Cargo 3W", "Alternative fuel · CNG", "Retail replenishment and e-commerce bags", "CNG station refuelling", "Predictable city loops", "Balance lower-emission operation with local fuel availability."],
    ["Euler HiLoad EV", "Cargo 3W", "EV · battery electric", "Grocery crates, parcels and B2B replenishment", "Fast-charge capable", "Hub-to-spoke waves", "Ideal for scheduled waves supported by charging access."],
    ["Piaggio Ape E-Xtra", "Cargo 3W", "EV · battery electric", "Retail replenishment, FMCG and e-commerce", "Plug-in charging", "Predictable retail loops", "Works well on scheduled loops with protected charge windows."],
    ["Mahindra Treo Zor", "Cargo 3W", "EV · battery electric", "Parcel bags, grocery crates and returns", "Plug-in charging", "Multi-drop city cargo", "Match daily distance and payload to usable range."],
    ["Altigreen neEV", "Cargo 3W", "EV · battery electric", "E-commerce sacks and high-volume crates", "Fast-charging support", "Dense B2B lanes", "High-deck formats can improve bulky-package handling."],
    ["Bio-CNG cargo 3W", "Cargo 3W", "Alternative fuel · bio-CNG", "Retail, produce and municipal supply runs", "Bio-CNG / compatible CNG refuelling", "Circular-fuel corridors", "Confirm fuel quality, vehicle compatibility and reliable station access."],
    ["Hydrogen cargo 3W concept", "Cargo 3W", "Alternative fuel · hydrogen", "Pilot cargo and institutional delivery", "Hydrogen refuelling", "Controlled demonstration routes", "Assess safety, homologation, infrastructure and total cost before deployment."],
  ],
  "4W": [
    ["Tata Ace Gold", "Mini truck", "ICE · petrol / diesel", "B2B cartons, wholesale and secondary distribution", "Rapid liquid-fuel refuelling", "Flexible city and feeder lanes", "Select the compliant variant around payload, distance and service access."],
    ["Mahindra Bolero Pik-Up", "Pickup", "ICE · diesel", "Heavier cartons and mixed-terrain cargo", "Diesel refuelling", "Longer feeder and industrial routes", "Useful where payload and route variability lead the decision."],
    ["Maruti Suzuki Super Carry", "Mini truck", "ICE / alternative fuel · petrol / CNG", "Retail stock and light commercial cargo", "Petrol or CNG refuelling", "Compact urban distribution", "Choose the fuel variant based on station access and duty-cycle cost."],
    ["Tata Intra CNG", "Light commercial vehicle", "Alternative fuel · CNG", "Planned B2B and retail replenishment", "CNG station refuelling", "City lanes near dependable stations", "Include refuelling detours and payload needs in route economics."],
    ["Tata Ace EV", "Mini truck", "EV · battery electric", "B2B shipments, pharma crates and distribution", "Fast-charge capable", "Consolidated urban lanes", "Assign where drop density and depot charging support utilisation."],
    ["Tata Ace EV 1000", "Mini truck", "EV · battery electric", "Heavier B2B cartons and wholesale replenishment", "Fleet charging", "Industrial and warehouse lanes", "Reserve for planned manifests with suitable payload and energy buffers."],
    ["Switch IeV4", "Electric LCV", "EV · battery electric", "Large parcels, grocery pallets and distribution", "Depot / DC charging", "Outer-ring and warehouse routes", "Best for high-volume lanes with disciplined depot charging."],
    ["BYD T3", "Cargo van", "EV · battery electric", "Premium parcels, pharma and electronics", "AC / DC charging", "Secure delivery routes", "Use where enclosed cargo and planned energy stops are important."],
    ["LNG commercial truck", "Commercial truck", "Alternative fuel · LNG", "Hub-to-hub freight and larger scheduled loads", "LNG station refuelling", "Longer trunk corridors", "Deploy only when corridor infrastructure and duty-cycle savings are proven."],
    ["Hydrogen fuel-cell truck", "Commercial truck", "Alternative fuel · hydrogen", "Heavy hub-to-hub and zero-tailpipe-emission pilots", "Hydrogen refuelling", "Dedicated freight corridors", "Evaluate infrastructure, safety, vehicle availability and lifecycle economics together."],
  ]
};

function vehicleImage(category, index, title, powertrain) {
  const palette = { "2W": ["#4d148c", "#ff6600"], "3W": ["#0f766e", "#4d148c"], "4W": ["#1d4ed8", "#ff6600"] };
  const [primary, accent] = palette[category];
  const label = encodeURIComponent(title.replace(/&/g, "and"));
  const wheels = category === "2W" ? 2 : category === "3W" ? 3 : 4;
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 390'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='${encodeURIComponent(primary)}'/%3E%3Cstop offset='1' stop-color='${encodeURIComponent(accent)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='390' rx='34' fill='%23f8fafc'/%3E%3Ccircle cx='535' cy='80' r='92' fill='${encodeURIComponent(accent)}' opacity='.14'/%3E%3Cpath d='M88 292h464' stroke='%23dbe4ee' stroke-width='12' stroke-linecap='round'/%3E%3Cpath d='M${category === "2W" ? "206 206h146l60 58H152z" : category === "3W" ? "150 190h250l80 78H120z" : "126 178h348l64 90H92z"}' fill='url(%23g)'/%3E%3Cpath d='M${category === "2W" ? "274 150h70l42 56h-112z" : category === "3W" ? "356 128h86l42 62h-128z" : "178 126h210l62 52H152z"}' fill='%23ffffff' opacity='.86'/%3E%3Cg fill='%23111827'%3E${Array.from({length:wheels},(_,i)=>`%3Ccircle cx='${wheels===2?[198,426][i]:wheels===3?[174,322,474][i]:[152,272,416,520][i]}' cy='292' r='32'/%3E%3Ccircle cx='${wheels===2?[198,426][i]:wheels===3?[174,322,474][i]:[152,272,416,520][i]}' cy='292' r='14' fill='%23e5e7eb'/%3E`).join("")}%3C/g%3E%3Ctext x='42' y='58' font-family='Arial, sans-serif' font-size='30' font-weight='800' fill='${encodeURIComponent(primary)}'%3E${category} · ${encodeURIComponent(powertrain.split(" · " )[0])}%3C/text%3E%3Ctext x='42' y='94' font-family='Arial, sans-serif' font-size='22' font-weight='700' fill='%23374151'%3E${label}%3C/text%3E%3C/svg%3E`;
}

function buildVehicleCatalogue() {
  return Object.entries(vehicleCatalogSeed).flatMap(([category, vehicles]) => vehicles.map(([title, type, powertrain, payload, energy, useCase, insight], index) => ({
    key: `${category} · ${title}`,
    title,
    category,
    image: vehicleImage(category, index, title, powertrain),
    powertrain,
    meta: `Category: ${category} ${type} · ${powertrain}`,
    detail: `Payload fit: ${payload}. Fuel / energy access: ${energy}. Typical Delhi use: ${useCase}.`,
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


const parkingFacilityTypes = ["Fleet parking yard", "Micro-hub", "Partner mall basement", "Metro-adjacent lot", "Industrial hub", "Market association bay"];
const parkingOperators = ["Lium Go partner yard", "DMRC parking partner", "Market association", "Industrial logistics park", "Mall facilities partner", "multi-fuel fleet operator"];
const parkingFacilities = ["secure overnight parking", "driver check-in", "CCTV", "fuel and energy access", "cargo staging", "charging and battery-swap coordination", "maintenance handover", "route briefing desk"];

function buildDelhiParkingHubs() {
  return Array.from({ length: 126 }, (_, index) => {
    const locality = delhiChargingLocalities[index % delhiChargingLocalities.length];
    const ring = Math.floor(index / delhiChargingLocalities.length);
    const xOffset = ((index * 5) % 15) - 7;
    const yOffset = ((index * 9) % 17) - 8;
    const capacity = 18 + ((index * 7) % 58);
    const availableBays = Math.max(4, capacity - (8 + ((index * 11) % 35)));
    const operator = parkingOperators[index % parkingOperators.length];
    const facilityType = parkingFacilityTypes[(index + ring) % parkingFacilityTypes.length];
    const facilityA = parkingFacilities[index % parkingFacilities.length];
    const facilityB = parkingFacilities[(index + 3) % parkingFacilities.length];
    const facilityC = parkingFacilities[(index + 5) % parkingFacilities.length];
    const utilization = Math.round(((capacity - availableBays) / capacity) * 100);
    const pointNumber = String(index + 1).padStart(3, "0");
    const isHub = facilityType.toLowerCase().includes("hub") || index % 4 === 0;

    return {
      key: `${locality.area} Hub-${pointNumber}`,
      title: `${locality.area} ${isHub ? "Fleet Hub" : "Vehicle Parking"} ${pointNumber}`,
      meta: `Area: ${locality.area} · ${facilityType} · Capacity: ${capacity} vehicles · Available: ${availableBays}`,
      detail: `Address: ${locality.area} fleet cluster ${ring + 1}, New Delhi ${locality.pin}. Operator: ${operator}. Facilities: ${facilityA}, ${facilityB} and ${facilityC}. Supports 2W, 3W, 4W and commercial-vehicle staging across ICE, EV and alternative-fuel fleets, with geofenced check-in and access planning for petrol, diesel, CNG, LNG, biofuels, hydrogen, charging and battery swapping.`,
      insight: utilization >= 78 ? "GenBI flags high bay utilization; reserve fuel-agnostic overflow parking before the dispatch wave starts." : "GenBI sees usable bay buffer for mixed-fuel route staging, driver briefing, refuelling or charging coordination and return-to-hub parking.",
      area: locality.area,
      operator,
      facilityType,
      capacity,
      availableBays,
      utilization,
      x: Math.min(88, Math.max(12, locality.x + xOffset)),
      y: Math.min(86, Math.max(14, locality.y + yOffset))
    };
  });
}

const driverFirstNames = ["Aarav", "Meera", "Rohan", "Nisha", "Kabir", "Ananya", "Vivaan", "Ishaan", "Priya", "Arjun", "Sana", "Dev", "Tanya", "Karan", "Aditi", "Rahul", "Simran", "Vikram", "Pooja", "Aditya", "Neha", "Farhan", "Ritu", "Manav", "Jaspreet", "Ira", "Om", "Kavya", "Yuvraj", "Diya"];
const driverLastNames = ["Sharma", "Khan", "Verma", "Yadav", "Gupta", "Singh", "Bansal", "Mehta", "Malhotra", "Chauhan", "Kapoor", "Ansari", "Rana", "Saxena", "Gill", "Tyagi", "Sethi", "Bhardwaj", "Rawat", "Dutta"];
const driverClients = ["Zomato", "Blinkit", "Tata 1mg", "BigBasket", "Amazon", "Flipkart", "Swiggy", "Zepto"];
const driverZones = ["Saket", "Connaught Place", "Rohini", "Dwarka", "Okhla", "Lajpat Nagar", "Karol Bagh", "Janakpuri", "Mayur Vihar", "Hauz Khas"];
const driverVehiclePool = ["DL9S-EV-2146", "DL7S-EV-3308", "DL2S-EV-1180", "DL6S-EV-4077", "DL4S-EV-5631", "DL8S-EV-9024", "DL5S-EV-7318", "DL1S-EV-6842", "DL3S-EV-2765", "DL3C-EV-8021", "DL5L-EV-7712", "DL8L-EV-6504", "DL2L-EV-3349", "DL6L-EV-1186", "DL1L-EV-4490"];

function buildDriverRecords() {
  return Array.from({ length: 128 }, (_, index) => {
    const name = `${driverFirstNames[index % driverFirstNames.length]} ${driverLastNames[(index * 3) % driverLastNames.length]}`;
    const client = driverClients[index % driverClients.length];
    const zone = driverZones[(index * 2) % driverZones.length];
    const hoursWorked = Number((6.5 + ((index * 7) % 35) / 10).toFixed(1));
    const deliveries = 17 + ((index * 11) % 31) + (client === "Blinkit" || client === "Zepto" ? 6 : 0) + (client === "Zomato" || client === "Swiggy" ? 4 : 0);
    const productivity = Number((deliveries / hoursWorked).toFixed(1));
    const status = index % 13 === 0 ? "Break" : index % 17 === 0 ? "Training" : index % 19 === 0 ? "Leave" : "Working";
    const onTime = 89 + ((index * 5) % 11);
    const attendance = status === "Working" ? "On shift" : status;
    const vehicle = driverVehiclePool[index % driverVehiclePool.length];
    const dl = `DL${String(4 + (index % 8)).padStart(2, "0")}2026${String(1000000 + index * 7919).slice(-7)}`;
    const aadhaar = String(2200 + ((index * 337) % 7600));

    return {
      key: `${name} · ${client} · ${String(index + 1).padStart(3, "0")}`,
      title: name,
      client,
      zone,
      status,
      hoursWorked,
      deliveries,
      productivity,
      onTime,
      vehicle,
      meta: `Client: ${client} · ${attendance} · Zone: ${zone}`,
      detail: `Vehicle: ${vehicle}. Hours worked: ${hoursWorked}. Total deliveries: ${deliveries}. Productivity: ${productivity} deliveries/hour. On-time score: ${onTime}%. DL: ${dl} · Aadhaar: XXXX-XXXX-${aadhaar}.`,
      insight: status === "Working" ? `GenBI recommends ${zone} ${client} lanes; productivity is ${productivity >= 5.5 ? "above" : "within"} benchmark.` : `GenBI marks ${status.toLowerCase()} coverage risk; keep a standby driver for ${client} in ${zone}.`
    };
  });
}

dashboardData.clients.options = buildClientAccounts();

dashboardData.drivers.options = buildDriverRecords();


dashboardData.vehicle.options = buildVehicleCatalogue();
dashboardData.charging.options = buildDelhiChargingPoints();
dashboardData.parking.options = buildDelhiParkingHubs();

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
  const isParking = tabKey === "parking";
  const visibleOptions = isCharging ? tab.options.slice(0, 36) : isParking ? tab.options.slice(0, 48) : tab.options;
  const renderCard = (item, index) => `<article class="genbi-card${item.image ? " genbi-card--vehicle" : ""}">${item.image ? `<img class="genbi-card__image" src="${item.image}" alt="${item.title} ${item.powertrain || item.category || "vehicle"} illustration" loading="lazy">` : ""}<div class="genbi-card__number">${String(index + 1).padStart(2, "0")}</div><h3>${item.title}</h3><p class="genbi-card__meta">${item.meta}</p><p>${item.detail}</p><span>${item.insight}</span></article>`;
  const cards = isVehicle
    ? ["2W", "3W", "4W"].map((category) => {
        const categoryItems = visibleOptions.filter((item) => item.category === category);
        return `<section class="vehicle-category"><div class="vehicle-category__header"><h3>${category} vehicles</h3><span>${categoryItems.length} options</span></div><div class="genbi-grid genbi-grid--vehicle">${categoryItems.map((item, index) => renderCard(item, index)).join("")}</div></section>`;
      }).join("")
    : visibleOptions.map((item, index) => renderCard(item, index)).join("");
  const options = tab.options.map((item) => `<option value="${item.key}">${item.key}</option>`).join("");
  const mapPanel = (isCharging || isParking) ? `<section class="charging-map-panel ${isParking ? "parking-map-panel" : ""}"><div class="charging-map-panel__map ${isParking ? "parking-map-panel__map" : ""}">${tab.options.map((item) => `<button class="charging-pin${isParking ? " parking-pin" : ""}${item.utilization > 78 ? " charging-pin--busy" : ""}" style="--pin-x:${item.x}%; --pin-y:${item.y}%;" data-map-key="${item.key}" aria-label="${item.title}"></button>`).join("")}</div><div class="charging-map-panel__legend"><span><i class="charging-dot"></i> Available / moderate</span><span><i class="charging-dot charging-dot--busy"></i> High-demand GenBI alert</span><strong>${tab.options.length} ${isParking ? "parking and hub records" : "points"} across Delhi</strong></div></section>` : "";
  const listNote = isCharging ? `<p class="genbi-list-note">Showing 36 highlighted cards below; all ${tab.options.length} charging points are plotted on the Delhi map and available in the GenBI Agent selector.</p>` : isParking ? `<p class="genbi-list-note">Showing 48 highlighted parking and hub cards below; all ${tab.options.length} Delhi records are plotted on the map and searchable in the GenBI Agent selector.</p>` : "";
  return `<div class="genbi-hero"><div><p class="genbi-eyebrow">GenBI workspace · ${isParking || isVehicle ? "Delhi multi-fuel network" : "Delhi EV network"}</p><h2>${tab.title}</h2><p>${tab.subtitle}</p></div><div class="genbi-kpi"><strong>${tab.options.length}</strong><span>records ready</span></div></div>${mapPanel}${listNote}<div class="genbi-layout${isVehicle ? " genbi-layout--vehicle" : ""}"><section class="${isVehicle ? "vehicle-catalog" : `genbi-grid${isCharging ? " genbi-grid--charging" : ""}`}">${cards}</section><aside class="page-highlight-card genbi-agent"><div class="genbi-agent__badge">✨ GenBI Agent</div><h3>Ask by selection</h3><label for="genbi-select">${tab.agentLabel}</label><select id="genbi-select" class="genbi-select">${options}</select><div id="genbi-answer" class="genbi-answer"></div></aside></div>`;
}


function renderDriversDashboard() {
  const tab = dashboardData.drivers;
  const clientSummary = driverClients.map((client) => {
    const records = tab.options.filter((item) => item.client === client);
    const working = records.filter((item) => item.status === "Working").length;
    const hours = Number(records.reduce((sum, item) => sum + item.hoursWorked, 0).toFixed(1));
    const deliveries = records.reduce((sum, item) => sum + item.deliveries, 0);
    const productivity = Number((deliveries / hours).toFixed(1));
    return { client, records, working, hours, deliveries, productivity };
  });
  const totals = clientSummary.reduce((acc, item) => ({
    working: acc.working + item.working,
    hours: Number((acc.hours + item.hours).toFixed(1)),
    deliveries: acc.deliveries + item.deliveries
  }), { working: 0, hours: 0, deliveries: 0 });
  totals.productivity = Number((totals.deliveries / totals.hours).toFixed(1));
  const maxWorking = Math.max(...clientSummary.map((item) => item.working));
  const maxHours = Math.max(...clientSummary.map((item) => item.hours));
  const maxDeliveries = Math.max(...clientSummary.map((item) => item.deliveries));
  const maxProductivity = Math.max(...clientSummary.map((item) => item.productivity));
  const trendDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => ({
    day,
    deliveries: 3650 + index * 210 + (index % 2 ? 180 : 40),
    hours: 760 + index * 24,
    productivity: Number((4.8 + index * 0.18 + (index % 2 ? 0.08 : 0)).toFixed(1))
  }));
  const cards = tab.options.slice(0, 48).map((item, index) => `<article class="genbi-card driver-record-card"><div class="genbi-card__number">${String(index + 1).padStart(2, "0")}</div><h3>${item.title}</h3><p class="genbi-card__meta">${item.meta}</p><p>${item.detail}</p><span>${item.insight}</span></article>`).join("");
  const options = tab.options.map((item) => `<option value="${item.key}">${item.key}</option>`).join("");
  return `<div class="genbi-hero"><div><p class="genbi-eyebrow">GenBI workspace · Driver intelligence</p><h2>${tab.title}</h2><p>${tab.subtitle} The expanded dataset now tracks 100+ driver records across clients, shift status, hours, productivity and deliveries.</p></div><div class="genbi-kpi"><strong>${tab.options.length}</strong><span>driver records</span></div></div>
    <section class="drivers-dashboard">
      <div class="drivers-kpi-grid"><article><span>Working now</span><strong>${totals.working}</strong><p>active drivers across ${driverClients.length} clients</p></article><article><span>Hours worked</span><strong>${totals.hours}</strong><p>cumulative current-shift hours</p></article><article><span>Total deliveries</span><strong>${totals.deliveries}</strong><p>completed client deliveries</p></article><article><span>Productivity</span><strong>${totals.productivity}</strong><p>deliveries per driver hour</p></article></div>
      <div class="driver-analytics-grid">
        <article class="page-highlight-card driver-chart-card"><h3>Numbers working by client</h3><div class="driver-histogram">${clientSummary.map((item) => `<div class="driver-histogram__row"><span>${item.client}</span><div class="driver-histogram__track"><i style="--bar-width:${(item.working / maxWorking) * 100}%"></i></div><strong>${item.working}</strong></div>`).join("")}</div></article>
        <article class="page-highlight-card driver-chart-card"><h3>Hours worked by client</h3><div class="driver-histogram driver-histogram--hours">${clientSummary.map((item) => `<div class="driver-histogram__row"><span>${item.client}</span><div class="driver-histogram__track"><i style="--bar-width:${(item.hours / maxHours) * 100}%"></i></div><strong>${item.hours}h</strong></div>`).join("")}</div></article>
        <article class="page-highlight-card driver-chart-card"><h3>Productivity by client</h3><div class="driver-histogram driver-histogram--productivity">${clientSummary.map((item) => `<div class="driver-histogram__row"><span>${item.client}</span><div class="driver-histogram__track"><i style="--bar-width:${(item.productivity / maxProductivity) * 100}%"></i></div><strong>${item.productivity}/h</strong></div>`).join("")}</div></article>
        <article class="page-highlight-card driver-chart-card"><h3>Total deliveries by client</h3><div class="driver-histogram driver-histogram--deliveries">${clientSummary.map((item) => `<div class="driver-histogram__row"><span>${item.client}</span><div class="driver-histogram__track"><i style="--bar-width:${(item.deliveries / maxDeliveries) * 100}%"></i></div><strong>${item.deliveries}</strong></div>`).join("")}</div></article>
      </div>
      <article class="page-highlight-card driver-chart-card driver-chart-card--wide"><h3>6-day driver productivity trend</h3><div class="driver-trend">${trendDays.map((day) => `<div class="driver-trend__day"><div class="driver-trend__bars"><i class="driver-trend__bar driver-trend__bar--deliveries" style="--bar-height:${(day.deliveries / 4950) * 100}%" title="${day.deliveries} deliveries"></i><i class="driver-trend__bar driver-trend__bar--hours" style="--bar-height:${(day.hours / 910) * 100}%" title="${day.hours} hours"></i><i class="driver-trend__bar driver-trend__bar--productivity" style="--bar-height:${(day.productivity / 6.2) * 100}%" title="${day.productivity}/h"></i></div><span>${day.day}</span></div>`).join("")}</div><p class="maintenance-chart-note">Orange: deliveries · Purple: hours · Green: productivity.</p></article>
      <p class="genbi-list-note">Showing 48 highlighted driver cards below; all ${tab.options.length} records are available in the GenBI Agent selector.</p>
    </section>
    <div class="genbi-layout"><section class="genbi-grid genbi-grid--drivers">${cards}</section><aside class="page-highlight-card genbi-agent"><div class="genbi-agent__badge">✨ GenBI Agent</div><h3>Ask driver performance</h3><label for="genbi-select">${tab.agentLabel}</label><select id="genbi-select" class="genbi-select">${options}</select><div id="genbi-answer" class="genbi-answer"></div></aside></div>`;
}

function renderMaintenanceDashboard() {
  const tab = dashboardData.maintenance;
  const categories = ["2W", "3W", "4W"];
  const summary = categories.map((category) => {
    const records = tab.options.filter((item) => item.category === category);
    const downtime = records.reduce((sum, item) => sum + item.downtimeDays, 0);
    return {
      category,
      records,
      count: records.length,
      downtime: Number(downtime.toFixed(1)),
      avgDowntime: Number((downtime / records.length).toFixed(1)),
      pmDue: records.filter((item) => new Date(item.nextPm) <= new Date("2026-07-10T00:00:00Z")).length
    };
  });
  const maxDowntime = Math.max(...summary.map((item) => item.downtime));
  const maxCount = Math.max(...summary.map((item) => item.count));
  const trendWeeks = [
    { label: "W1", downtime: { "2W": 8.4, "3W": 7.2, "4W": 1.0 }, pm: { "2W": 5, "3W": 2, "4W": 1 } },
    { label: "W2", downtime: { "2W": 10.1, "3W": 8.4, "4W": 0.8 }, pm: { "2W": 6, "3W": 3, "4W": 1 } },
    { label: "W3", downtime: { "2W": 12.7, "3W": 9.1, "4W": 0.6 }, pm: { "2W": 7, "3W": 4, "4W": 1 } },
    { label: "W4", downtime: { "2W": 15.2, "3W": 11.0, "4W": 0.5 }, pm: { "2W": 8, "3W": 4, "4W": 1 } }
  ];
  const maxTrend = 16;
  const maxPm = 8;
  const cards = tab.options.map((item, index) => `<article class="genbi-card maintenance-record-card"><div class="genbi-card__number">${String(index + 1).padStart(2, "0")}</div><h3>${item.title}</h3><p class="genbi-card__meta">${item.meta}</p><p>${item.detail}</p><span>${item.insight}</span></article>`).join("");
  const options = tab.options.map((item) => `<option value="${item.key}">${item.key}</option>`).join("");
  return `<div class="genbi-hero"><div><p class="genbi-eyebrow">GenBI workspace · Maintenance intelligence</p><h2>${tab.title}</h2><p>${tab.subtitle}</p></div><div class="genbi-kpi"><strong>${tab.options.length}</strong><span>maintenance records</span></div></div>
    <section class="maintenance-dashboard">
      <div class="maintenance-summary-grid">${summary.map((item) => `<article class="maintenance-summary-card"><span>${item.category}</span><strong>${item.count}</strong><p>${item.downtime} total downtime days · ${item.avgDowntime} avg days · ${item.pmDue} PM due by 10 Jul</p></article>`).join("")}</div>
      <div class="maintenance-analytics-grid">
        <article class="page-highlight-card maintenance-chart-card"><h3>Downtime histogram by category</h3><div class="maintenance-histogram">${summary.map((item) => `<div class="maintenance-histogram__row"><span>${item.category}</span><div class="maintenance-histogram__track"><i style="--bar-width:${(item.downtime / maxDowntime) * 100}%"></i></div><strong>${item.downtime}d</strong></div>`).join("")}</div></article>
        <article class="page-highlight-card maintenance-chart-card"><h3>Preventive maintenance volume</h3><div class="maintenance-histogram maintenance-histogram--pm">${summary.map((item) => `<div class="maintenance-histogram__row"><span>${item.category}</span><div class="maintenance-histogram__track"><i style="--bar-width:${(item.count / maxCount) * 100}%"></i></div><strong>${item.count}</strong></div>`).join("")}</div></article>
      </div>
      <div class="maintenance-analytics-grid">
        <article class="page-highlight-card maintenance-chart-card"><h3>4-week downtime trend</h3><div class="maintenance-trend">${trendWeeks.map((week) => `<div class="maintenance-trend__week"><div class="maintenance-trend__bars">${categories.map((cat) => `<i class="maintenance-trend__bar maintenance-trend__bar--${cat.toLowerCase().replace('w','w')}" style="--bar-height:${(week.downtime[cat] / maxTrend) * 100}%" title="${cat}: ${week.downtime[cat]} days"></i>`).join("")}</div><span>${week.label}</span></div>`).join("")}</div><p class="maintenance-chart-note">Purple: 2W · Teal: 3W · Orange: 4W</p></article>
        <article class="page-highlight-card maintenance-chart-card"><h3>Preventive maintenance trend</h3><div class="maintenance-trend">${trendWeeks.map((week) => `<div class="maintenance-trend__week"><div class="maintenance-trend__bars">${categories.map((cat) => `<i class="maintenance-trend__bar maintenance-trend__bar--${cat.toLowerCase().replace('w','w')}" style="--bar-height:${(week.pm[cat] / maxPm) * 100}%" title="${cat}: ${week.pm[cat]} PM jobs"></i>`).join("")}</div><span>${week.label}</span></div>`).join("")}</div><p class="maintenance-chart-note">Trending planned PM jobs against downtime pressure.</p></article>
      </div>
    </section>
    <div class="genbi-layout"><section class="genbi-grid genbi-grid--maintenance">${cards}</section><aside class="page-highlight-card genbi-agent"><div class="genbi-agent__badge">✨ GenBI Agent</div><h3>Ask maintenance by registration</h3><label for="genbi-select">${tab.agentLabel}</label><select id="genbi-select" class="genbi-select">${options}</select><div id="genbi-answer" class="genbi-answer"></div></aside></div>`;
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
      answer.innerHTML = `${item.image ? `<img class="genbi-answer__image" src="${item.image}" alt="${item.title} ${item.powertrain || item.category || "vehicle"} illustration">` : ""}<h4>${item.title}</h4><p class="genbi-answer__meta">${item.meta}</p><p>${item.detail}</p><strong>Insight:</strong><p>${item.insight}</p>${item.utilization ? `<p><strong>GenBI capability:</strong> utilization ${item.utilization}%, ${item.fastSlots ? `${item.fastSlots} fast slots, ${item.chargers} total chargers` : `${item.availableBays} open bays, ${item.capacity} total vehicle capacity`}. Use this to match ${item.fastSlots ? "SOC" : "fuel or energy needs"}, bay availability, route ETA and return-to-hub planning before dispatch.</p>` : ""}`;
      document.querySelectorAll("[data-map-key]").forEach((pin) => pin.classList.toggle("charging-pin--selected", pin.dataset.mapKey === item.key));
    }
    select.addEventListener("change", updateAnswer);
    document.querySelectorAll("[data-map-key]").forEach((pin) => {
      pin.addEventListener("click", () => {
        select.value = pin.dataset.mapKey;
        updateAnswer();
      });
    });
    updateAnswer();
  }

  function render(tabKey) {
    buttons.forEach((button) => button.classList.toggle("dashboard-menu__item--active", button.dataset.dashboardTab === tabKey));
    content.innerHTML = tabKey === "dashboard" ? renderDashboardOverview() : tabKey === "maintenance" ? renderMaintenanceDashboard() : tabKey === "drivers" ? renderDriversDashboard() : renderIntelligencePanel(tabKey);
    hydrateAgent(tabKey);
  }

  buttons.forEach((button) => button.addEventListener("click", () => render(button.dataset.dashboardTab)));
  render("dashboard");
}

document.addEventListener("DOMContentLoaded", bootDashboardTabs);
