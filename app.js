import { supabase } from "./supabase-client.js";
import logoUrl from "./assets/logo-roll974.png";

let currentUser = null;
let currentProfile = null;
let remotePartners = [];
let remoteClubs = [];
let remoteOpenMats = [];

const icons = {
  arrow: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  search: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>`,
  plus: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`,
  map: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/></svg>`,
  pin: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></svg>`,
  clock: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  message: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>`,
  user: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
  menu: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  check: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>`,
  calendar: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>`,
};

const islandSvg = (className = "") => `
  <svg class="${className}" viewBox="0 0 420 360" aria-label="Silhouette de La Réunion">
    <path d="M208 17C265 22 329 61 374 126c35 51 32 105 4 153-30 51-93 69-158 63-65-6-130-24-164-74-33-48-25-109 4-158C91 57 147 12 208 17Z" fill="currentColor"/>
    <path d="M208 58c43 4 92 33 126 81 25 36 24 76 1 110-25 37-70 50-114 45-47-5-95-18-118-55-23-35-15-77 8-112 24-38 57-72 97-69Z" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
  </svg>`;

const logoSvg = () => `
  <img class="brand-logo brand-logo-img" src="${logoUrl}" alt="" aria-hidden="true" loading="eager" decoding="async">`;

const networkIsland = () => `
  <div class="network-island" aria-label="Réseau des pratiquants à La Réunion">
    ${islandSvg("network-shape")}
    <svg class="network-lines" viewBox="0 0 420 360" aria-hidden="true">
      <path d="M111 142 215 82 318 136 277 253 153 280 72 213 111 142M215 82l62 171M111 142l166 111M318 136 153 280M72 213l246-77M111 142l42 138"/>
      <circle cx="215" cy="82" r="8" class="node openmat"/><circle cx="318" cy="136" r="7" class="node partner"/>
      <circle cx="277" cy="253" r="8" class="node openmat"/><circle cx="153" cy="280" r="7" class="node partner"/>
      <circle cx="72" cy="213" r="8" class="node partner"/><circle cx="111" cy="142" r="8" class="node club"/>
      <circle cx="205" cy="184" r="9" class="node partner"/>
    </svg>
    <div class="map-legend"><span><i class="dot blue"></i> Partenaire</span><span><i class="dot red"></i> Open mat</span><span><i class="dot green"></i> Club</span></div>
  </div>`;

const seedPartners = [
  { id: 1, name: "Mathis R.", initials: "MR", city: "Saint-Paul", club: "West Coast BJJ", belt: "Bleue", beltClass: "", title: "Sparring No-Gi — préparation compétition", type: "No-Gi", intensity: "Intense", date: "Mardi 18:30", ago: "Il y a 12 min", weight: "75–85 kg", region: "Ouest" },
  { id: 2, name: "Léa D.", initials: "LD", city: "Saint-Denis", club: "Nord Grappling", belt: "Blanche", beltClass: "white", title: "Session drill : passages de garde", type: "Gi", intensity: "Technique", date: "Jeudi 17:45", ago: "Il y a 1 h", weight: "Tous poids", region: "Nord" },
  { id: 3, name: "Yanis P.", initials: "YP", city: "Saint-Pierre", club: "Sud Jiu-Jitsu", belt: "Violette", beltClass: "purple", title: "Rounds légers avant l’open mat", type: "Gi & No-Gi", intensity: "Modéré", date: "Samedi 09:00", ago: "Il y a 3 h", weight: "70–80 kg", region: "Sud" },
  { id: 4, name: "Émilie C.", initials: "EC", city: "Le Port", club: "Port Fight Club", belt: "Bleue", beltClass: "", title: "Drill takedowns et travail debout", type: "No-Gi", intensity: "Technique", date: "Vendredi 19:00", ago: "Hier", weight: "Tous poids", region: "Ouest" },
  { id: 5, name: "Romain T.", initials: "RT", city: "Saint-André", club: "Est BJJ Academy", belt: "Marron", beltClass: "brown", title: "Sparring tous niveaux bienvenus", type: "Gi", intensity: "Modéré", date: "Dimanche 10:00", ago: "Hier", weight: "80–95 kg", region: "Est" },
  { id: 6, name: "Anaïs L.", initials: "AL", city: "Le Tampon", club: "Tampon Grappling", belt: "Blanche", beltClass: "white", title: "Réviser les bases et faire des drills", type: "Gi", intensity: "Léger", date: "Mercredi 18:00", ago: "Il y a 2 j", weight: "55–70 kg", region: "Sud" }
];

const seedOpenMats = [
  { id:"icon-reunion-dimanche", club:"ICON Jiu-Jitsu Réunion", city:"Saint-Paul", region:"Ouest", address:"Saint-Gilles-les-Hauts, Saint-Paul — confirmer le dojo auprès du club", day:"Dimanche", time:"10:00 – 12:00", type:"Gi & No-Gi", level:"Tous niveaux", contact:"0692 86 51 28", extra:"Ouvert aux pratiquants licenciés CFJJB. Confirmer le format et le lieu avant de venir.", source_url:"https://www.localgymsandfitness.com/RE/Saint-Paul/159982297389329/Jiujitsu-ICON-reunion", verified:true, latitude:-21.0560, longitude:55.2640 },
  { id:"bjj-reunion-island-etang-sale", club:"BJJ Réunion Island", city:"L’Étang-Salé", region:"Sud", address:"Rue Comtat Venaissin, 97427 L’Étang-Salé-les-Bains", day:"Samedi", time:"08:30 – 10:30", type:"Gi / No-Gi à confirmer", level:"Contacter le club", contact:"", extra:"Créneau trouvé dans un annuaire public : confirmation indispensable avant déplacement.", source_url:"https://search.webmartial.com/cgi-bin/comment_club.pl?club_id=10864&id2=hhmeinez", verified:false, latitude:-21.2668, longitude:55.3347 }
];

const seedClubs = [
  { slug:"foucheroll-saint-denis", name:"FoucheRoll BJJ", city:"Saint-Denis", region:"Nord", address:"Sainte-Clotilde, Saint-Denis", latitude:-20.8907, longitude:55.4693, disciplines:"Gi · No-Gi · Adultes · Enfants", schedule:"Cours adultes, débutants, enfants et adolescents. Consulter le planning du club.", phone:"0692 95 15 80", email:"", instagram:"", website:"https://www.foucherollbjj.com/", source_url:"https://www.foucherollbjj.com/", open_mat_info:"", verified:true },
  { slug:"foucheroll-saint-benoit", name:"FoucheRoll BJJ — Saint-Benoît", city:"Saint-Benoît", region:"Est", address:"9 rue des Myosotis, Saint-Benoît", latitude:-21.0337, longitude:55.7210, disciplines:"Gi · No-Gi", schedule:"Mardi et jeudi · 18h30–20h30", phone:"0692 95 15 80", email:"", instagram:"", website:"https://www.foucherollbjj.com/", source_url:"https://www.localgymsandfitness.com/YT/Sainte-Clotilde/360261104636484/FoucheRoll-BJJ", open_mat_info:"", verified:true },
  { slug:"pythagore-saint-denis", name:"Académie Pythagore Saint-Denis", city:"Saint-Denis", region:"Nord", address:"Saint-Denis, La Réunion", latitude:-20.8789, longitude:55.4481, disciplines:"Jiu-Jitsu Brésilien · No-Gi · Grappling", schedule:"Horaires à confirmer auprès du club.", phone:"0692 13 68 46", email:"saintdenis@pythagorejiujitsu.com", instagram:"", website:"https://www.pythagorejiujitsu.com/", source_url:"https://www.pythagorejiujitsu.com/clubs-affilies/academie-saint-denis-la-reunion/", open_mat_info:"", verified:true },
  { slug:"csag-saint-denis", name:"CSAG 974 Sports de combat", city:"Saint-Denis", region:"Nord", address:"8 route de la Montagne, 97400 Saint-Denis", latitude:-20.8878, longitude:55.4386, disciplines:"Gi · No-Gi · Grappling · MMA", schedule:"Lundi 18h–19h30 JJB · Mardi 6h30–8h No-Gi · Mercredi 19h30–21h No-Gi · Jeudi 19h30–21h JJB", phone:"0624 50 84 33", email:"sportdecombat.csag974@gmail.com", instagram:"https://www.instagram.com/csag974sportdecombat/", website:"https://www.csag974.fr/saint-denis-s17181/arts-martiaux-d5147", source_url:"https://www.csag974.fr/saint-denis-s17181/arts-martiaux-d5147", open_mat_info:"", verified:true },
  { slug:"ascir-apjjb-le-port", name:"ASCIR / APJJB", city:"Le Port", region:"Ouest", address:"172 boulevard de Toulouse, 97420 Le Port", latitude:-20.9396, longitude:55.2993, disciplines:"Jiu-Jitsu Brésilien · Grappling · MMA", schedule:"Horaires à confirmer auprès du club.", phone:"0692 88 06 64", email:"associationportoise.contact@gmail.com", instagram:"", website:"https://ascir.re/", source_url:"https://ascir.re/", open_mat_info:"", verified:true },
  { slug:"icon-reunion-saint-paul", name:"ICON Jiu-Jitsu Réunion", city:"Saint-Paul", region:"Ouest", address:"Dojo La Kaz JJB, 176 boulevard du Front de Mer, 97460 Saint-Paul", latitude:-21.0102, longitude:55.2695, disciplines:"Gi · No-Gi · Grappling · Adultes · Enfants", schedule:"Cours à Saint-Paul, Plateau Caillou, Saint-Gilles-les-Hauts et Le Guillaume.", phone:"0692 86 51 28", email:"", instagram:"https://www.instagram.com/jiujitsubjjreunionisland/", website:"", source_url:"https://www.localgymsandfitness.com/RE/Saint-Paul/159982297389329/Jiujitsu-ICON-reunion", open_mat_info:"Open mat du dimanche ouvert aux licenciés CFJJB.", verified:true },
  { slug:"jco-reunion", name:"Judo Club de l’Ouest Réunion", city:"Saint-Paul", region:"Ouest", address:"Dojo Roquefeuil, 25 rue Bianca, 97434 Saint-Paul", latitude:-21.0561, longitude:55.2257, disciplines:"JJB · Ne-Waza · Judo", schedule:"Lundi 18h30–20h30 JJB · Mercredi 18h30–20h30 JJB / Ne-Waza", phone:"", email:"", instagram:"", website:"https://www.ffjudo.com/club-judo-club-de-l-ouest-reunion", source_url:"https://www.ffjudo.com/club-judo-club-de-l-ouest-reunion", open_mat_info:"", verified:true },
  { slug:"jitzen-saint-louis", name:"Jitzen MKTeam Réunion", city:"Saint-Louis", region:"Sud", address:"Gymnase Hégésippe Hoarau, rue Sehedic Sery, 97421 La Rivière Saint-Louis", latitude:-21.2677, longitude:55.4126, disciplines:"Jiu-Jitsu Brésilien · Adultes · Enfants · Compétition", schedule:"Deux lieux à Saint-Louis : La Rivière et Dojo de Plateau Goyave.", phone:"", email:"", instagram:"", website:"https://www.jitzen.fr/", source_url:"https://www.jitzen.fr/", open_mat_info:"", verified:true },
  { slug:"cdk-974-saint-pierre", name:"CDK 974", city:"Saint-Pierre", region:"Sud", address:"Gymnase Gaston Richardson, 97410 Saint-Pierre", latitude:-21.3372, longitude:55.4780, disciplines:"Jiu-Jitsu Brésilien · Tous niveaux", schedule:"Horaires à confirmer auprès du club.", phone:"0643 17 16 53", email:"", instagram:"", website:"", source_url:"https://www.grizzliz.com/media/clubs/cdk-974/", open_mat_info:"", verified:true },
  { slug:"vivancos-saint-pierre", name:"Vivancos Mixed Fight", city:"Saint-Pierre", region:"Sud", address:"161C chemin Badamier, Saint-Pierre", latitude:-21.3138, longitude:55.5002, disciplines:"Jiu-Jitsu Brésilien · MMA · Sports de combat", schedule:"Lundi à vendredi 14h–21h15 · Samedi 9h–17h", phone:"0692 79 24 42", email:"mixed.fighting.training@gmail.com", instagram:"", website:"https://mixedfight.re/", source_url:"https://mixedfight.re/", open_mat_info:"", verified:true }
];

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function safeUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function getPartners() {
  return [...remotePartners, ...seedPartners];
}

function getClubs() {
  return remoteClubs.length ? remoteClubs : seedClubs;
}

function getOpenMats() {
  return remoteOpenMats.length ? remoteOpenMats : seedOpenMats;
}

function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "R9";
}

function beltClass(belt = "") {
  return ({ Blanche: "white", Violette: "purple", Marron: "brown" })[belt] || "";
}

function regionForCity(city) {
  return ({
    "Saint-Denis": "Nord", "Le Port": "Ouest", "Saint-Paul": "Ouest",
    "Saint-Pierre": "Sud", "Le Tampon": "Sud", "Saint-André": "Est"
  })[city] || "Ouest";
}

function formatSessionDate(date, time) {
  if (!date) return "";
  const value = new Date(`${date}T${time || "00:00"}`);
  const day = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short" }).format(value);
  return `${day} · ${(time || "").slice(0, 5)}`;
}

function formatRemotePartner(post) {
  const profile = post.profiles || {};
  return {
    id: post.id,
    userId: post.user_id,
    name: profile.display_name || "Pratiquant ROLL974",
    initials: initials(profile.display_name),
    city: post.city,
    club: profile.club || post.place,
    belt: profile.belt || "Blanche",
    beltClass: beltClass(profile.belt),
    title: post.message,
    type: post.discipline,
    intensity: post.training_type,
    date: formatSessionDate(post.session_date, post.session_time),
    ago: "Annonce ROLL974",
    weight: post.weight || "Tous poids",
    region: post.region,
    contact: profile.contact || ""
  };
}

async function loadRemotePartners() {
  const { data, error } = await supabase
    .from("partner_posts")
    .select("id,user_id,session_date,session_time,city,region,place,training_type,discipline,level,weight,message,created_at,profiles(display_name,club,belt,contact)")
    .order("created_at", { ascending: false });

  if (error) {
    console.info("Supabase attend la création des tables :", error.message);
    remotePartners = [];
    return;
  }
  remotePartners = (data || []).map(formatRemotePartner);
}

async function loadRemoteClubs() {
  const { data, error } = await supabase
    .from("clubs")
    .select("slug,name,city,region,address,latitude,longitude,disciplines,schedule,phone,email,instagram,website,source_url,open_mat_info,verified")
    .order("name", { ascending: true });

  if (error) {
    console.info("L’annuaire Supabase attend la création de la table clubs :", error.message);
    remoteClubs = [];
    return;
  }
  remoteClubs = data || [];
}

async function loadRemoteOpenMats() {
  const { data, error } = await supabase
    .from("open_mats")
    .select("slug,club_name,city,region,address,latitude,longitude,weekday,start_time,end_time,format,level,access_conditions,contact,source_url,verified,last_verified_at")
    .order("weekday", { ascending: true });

  if (error) {
    console.info("L’agenda Supabase attend la création de la table open_mats :", error.message);
    remoteOpenMats = [];
    return;
  }
  remoteOpenMats = (data || []).map(mat => ({
    id: mat.slug,
    club: mat.club_name,
    city: mat.city,
    region: mat.region,
    address: mat.address,
    day: mat.weekday,
    time: `${(mat.start_time || "").slice(0, 5)}${mat.end_time ? ` – ${mat.end_time.slice(0, 5)}` : ""}`,
    type: mat.format,
    level: mat.level,
    contact: mat.contact,
    extra: mat.access_conditions,
    source_url: mat.source_url,
    verified: mat.verified,
    latitude: mat.latitude,
    longitude: mat.longitude
  }));
}

async function loadCurrentProfile() {
  if (!currentUser) {
    currentProfile = null;
    return;
  }
  const { data } = await supabase.from("profiles").select("*").eq("id", currentUser.id).maybeSingle();
  currentProfile = data || null;
}

function brand() {
  return `<a class="brand" href="#/">${logoSvg()}<span>ROLL<small>974</small></span></a>`;
}

function layout(content, route = "") {
  const links = [
    ["partners","Partenaires"], ["open-mats","Open mats"], ["map","Carte des clubs"], ["about","À propos"]
  ];
  const desktopAuth = currentUser
    ? `<a class="btn btn-ghost btn-sm" href="#/profile">${icons.user} ${safe(currentProfile?.display_name || "Mon profil")}</a>
       <button class="btn btn-light btn-sm" id="logoutBtn">Déconnexion</button>`
    : `<a class="btn btn-ghost btn-sm" href="#/login">${icons.user} Connexion</a>`;
  const mobileAuth = currentUser
    ? `<a class="nav-link" href="#/profile">Mon profil</a><button class="nav-link logout-mobile" id="logoutMobile">Déconnexion</button>`
    : `<a class="nav-link" href="#/login">Connexion</a>`;
  return `<div class="shell">
    <header class="topbar"><nav class="nav container">
      ${brand()}
      <div class="nav-links">${links.map(([r,n]) => `<a class="nav-link ${route===r?"active":""}" href="#/${r}">${n}</a>`).join("")}</div>
      <div class="nav-actions">
        ${desktopAuth}
        <a class="btn btn-primary btn-sm" href="#/publish">${icons.plus} Publier</a>
        <button class="btn btn-light menu-btn" id="menuBtn" aria-label="Ouvrir le menu">${icons.menu}</button>
      </div>
    </nav>
    <div class="mobile-nav" id="mobileNav">
      ${links.map(([r,n]) => `<a class="nav-link" href="#/${r}">${n}</a>`).join("")}
      ${mobileAuth}
    </div></header>
    <main>${content}</main>${footer()}
  </div>`;
}

function footer() {
  return `<footer class="footer"><div class="container">
    <div class="footer-grid">
      <div>${brand()}<p class="footer-about">La plateforme des pratiquants de Jiu-Jitsu Brésilien à La Réunion. Trouve, échange, entraîne-toi.</p></div>
      <div><h4>Explorer</h4><div class="footer-links"><a href="#/partners">Trouver un partenaire</a><a href="#/open-mats">Open mats</a><a href="#/map">Carte des clubs</a></div></div>
      <div><h4>Roll974</h4><div class="footer-links"><a href="#/about">À propos</a><a href="#/contact">Contact</a><a href="#/profile">Mon profil</a></div></div>
      <div><h4>Suivez le mouvement</h4><div class="footer-links"><a href="#">Instagram</a><a href="#">WhatsApp</a><a href="#">Facebook</a></div></div>
    </div>
    <div class="copyright"><span>© 2026 Roll974. Fait avec énergie à La Réunion.</span><span>Respect · Partage · Progression</span></div>
  </div></footer>`;
}

function partnerCard(p) {
  return `<article class="card partner-card" data-region="${p.region}" data-type="${p.type}">
    <div class="card-top"><div class="person-row"><div class="avatar-lg">${safe(p.initials)}</div><div><strong>${safe(p.name)}</strong><span class="meta">${safe(p.city)} · ${safe(p.club)}</span></div></div><span class="belt ${safe(p.beltClass)}" title="Ceinture ${safe(p.belt)}"></span></div>
    <h3>${safe(p.title)}</h3>
    <div class="tags"><span class="tag">${safe(p.type)}</span><span class="tag red">${safe(p.intensity)}</span><span class="tag">${safe(p.weight)}</span></div>
    <div class="meta">${icons.calendar} ${safe(p.date)}</div>
    <div class="meta">${icons.pin} ${safe(p.city)}, La Réunion</div>
    <div class="card-divider"></div><div class="card-foot"><span class="time-ago">${safe(p.ago)}</span><button class="btn btn-light btn-sm contact-btn" data-person="${safe(p.name)}" data-contact="${safe(p.contact || "")}">${icons.message} Contacter</button></div>
  </article>`;
}

function openMatCard(o) {
  return `<article class="card openmat-card" data-region="${safe(o.region)}" data-type="${safe(o.type)}" data-level="${safe(o.level)}">
    <div class="om-visual"><div class="openmat-status"><span class="om-region">${safe(o.region)} · ${safe(o.city)}</span>${o.verified ? `<span class="verified-badge">${icons.check} Vérifié</span>` : `<span class="tag red">À confirmer</span>`}</div><h3>${safe(o.club)}</h3></div>
    <div class="om-body"><div class="schedule"><div class="date-box">${o.day.slice(0,3).toUpperCase()}</div><div><strong>${o.day} · ${o.time}</strong><span>${o.type} · ${o.level}</span></div></div>
    <div class="meta">${icons.pin} ${safe(o.address)}, ${safe(o.city)}</div>${o.extra ? `<p class="openmat-extra">${safe(o.extra)}</p>` : ""}<div class="card-divider"></div>
    <div class="card-foot"><a class="btn btn-light btn-sm" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address+" "+o.city+" La Réunion")}">${icons.map} Itinéraire</a>${o.source_url ? `<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="${safeUrl(o.source_url)}">Vérifier</a>` : `<button class="btn btn-primary btn-sm contact-btn" data-person="${safe(o.club)}" data-contact="${safe(o.contact)}">Contacter</button>`}</div></div>
  </article>`;
}

function clubCard(club) {
  const primaryLink = club.website || club.instagram || club.source_url;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${club.address} ${club.city} La Réunion`)}`;
  return `<article class="card club-directory-card" data-region="${safe(club.region)}" data-search="${safe(`${club.name} ${club.city} ${club.disciplines}`.toLowerCase())}">
    <div class="card-top"><div><span class="tag green">${safe(club.region)}</span><h3>${safe(club.name)}</h3></div>${club.verified ? `<span class="verified-badge">${icons.check} Vérifié</span>` : `<span class="tag">À confirmer</span>`}</div>
    <div class="meta">${icons.pin} ${safe(club.address || club.city)}</div>
    <div class="tags"><span class="tag">${safe(club.disciplines)}</span></div>
    <p class="club-schedule">${safe(club.schedule || "Horaires à confirmer auprès du club.")}</p>
    ${club.open_mat_info ? `<div class="club-openmat">${icons.calendar}<span>${safe(club.open_mat_info)}</span></div>` : ""}
    <div class="card-divider"></div>
    <div class="club-contact-line">${club.phone ? `<span>${safe(club.phone)}</span>` : ""}${club.email ? `<span>${safe(club.email)}</span>` : ""}</div>
    <div class="card-foot">
      <a class="btn btn-light btn-sm" target="_blank" rel="noopener" href="${mapLink}">${icons.map} Itinéraire</a>
      ${primaryLink ? `<a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="${safeUrl(primaryLink)}">Voir le club</a>` : ""}
    </div>
  </article>`;
}

function homePage() {
  return layout(`
    <section class="hero"><div class="container hero-grid">
      <div class="hero-copy"><span class="eyebrow">La communauté du Jiu-Jitsu Brésilien à La Réunion</span>
        <h1>Trouve un <span class="accent">partenaire</span> ou un club de JJB près de chez toi.</h1>
        <p>ROLL974 connecte les pratiquants, les clubs et les open mats de La Réunion pour s’entraîner plus souvent et progresser ensemble.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="#/partners">${icons.search} Trouver un partenaire</a><a class="btn btn-light" href="#/map">${icons.map} Voir les clubs</a></div>
        <div class="trust-row"><div class="avatars"><span class="avatar">MR</span><span class="avatar">LD</span><span class="avatar">YP</span><span class="avatar">+28</span></div><span><b>31 pratiquants</b> disponibles aujourd’hui sur l’île</span></div>
      </div>
      <div class="hero-panel hero-map-panel">
        <div id="heroOsmMap" class="leaflet-map hero-leaflet-map" data-leaflet-map="compact" aria-label="Carte interactive de La Réunion"></div>
        <div class="hero-photo-overlay"></div>
        <div class="hero-stamp"><strong>974</strong><span>Notre île<br>notre force</span></div>
        <div class="floating-stat"><strong>12</strong><span>open mats cette semaine</span></div>
      </div>
    </div></section>
    <div class="container"><div class="stats-strip"><div class="stat"><strong>${icons.search} Trouve</strong><span>un partenaire adapté</span></div><div class="stat"><strong>${icons.calendar} Organise</strong><span>tes entraînements</span></div><div class="stat"><strong>${icons.map} Découvre</strong><span>les open mats</span></div><div class="stat"><strong>${icons.arrow} Progresse</strong><span>avec la communauté</span></div></div></div>
    <section class="section"><div class="container"><div class="section-head"><div><div class="section-label">Comment ça marche</div><h2>Plus de temps sur le tatami</h2></div><p>Roll974 te rapproche des bonnes personnes, au bon endroit, au bon moment. Le reste se joue sur le tapis.</p></div>
      <div class="steps">
        <div class="step"><div class="step-icon">${icons.user}</div><span class="step-number">ÉTAPE 01</span><h3>Crée ton profil</h3><p>Indique ton grade, ta zone, ta discipline et tes objectifs d’entraînement.</p></div>
        <div class="step"><div class="step-icon">${icons.search}</div><span class="step-number">ÉTAPE 02</span><h3>Trouve ton match</h3><p>Filtre par secteur, niveau ou type de pratique pour trouver le bon partenaire.</p></div>
        <div class="step"><div class="step-icon">${icons.message}</div><span class="step-number">ÉTAPE 03</span><h3>Organisez le round</h3><p>Échangez directement et fixez votre session. Simple, rapide, local.</p></div>
      </div>
    </div></section>
    <section class="section section-white"><div class="container"><div class="section-head"><div><div class="section-label">En ce moment</div><h2>Ils cherchent un partenaire</h2></div><a class="btn btn-light" href="#/partners">Voir toutes les annonces ${icons.arrow}</a></div><div class="cards-grid">${getPartners().slice(0,3).map(partnerCard).join("")}</div></div></section>
    <section class="section"><div class="container"><div class="section-head"><div><div class="section-label">Où rouler cette semaine</div><h2>Les prochains open mats</h2></div><a class="btn btn-light" href="#/open-mats">Tous les open mats ${icons.arrow}</a></div><div class="cards-grid">${getOpenMats().slice(0,3).map(openMatCard).join("")}</div></div></section>
    <section class="section section-white"><div class="container"><div class="cta"><div><h2>Ton prochain partenaire est peut-être à quelques kilomètres.</h2><p>Publie une annonce en moins de deux minutes.</p></div><a class="btn btn-light" href="#/publish">${icons.plus} Créer une annonce</a></div></div></section>
  `);
}

function partnersPage() {
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Partenaires d’entraînement</span><h1>Trouve ton prochain round</h1><p>Drill, sparring léger ou préparation compétition : rencontre les pratiquants disponibles autour de toi.</p></div><a class="btn btn-primary" href="#/publish">${icons.plus} Créer une annonce</a></div></section>
    <section class="page-main"><div class="container">
      <div class="searchbar"><input id="searchPartner" class="field-inline" placeholder="Rechercher une ville, un club…"><select id="regionFilter" class="field-inline"><option value="">Toutes les zones</option><option>Nord</option><option>Ouest</option><option>Sud</option><option>Est</option></select><select id="typeFilter" class="field-inline"><option value="">Toutes disciplines</option><option>Gi</option><option>No-Gi</option></select><button class="btn btn-dark" id="resetPartners">Réinitialiser</button></div>
      <div class="cards-grid" id="partnersGrid">${getPartners().map(partnerCard).join("")}</div>
    </div></section>`, "partners");
}

function openMatsPage() {
  const mats = getOpenMats();
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Agenda vérifié de l’île</span><h1>Open mats à La Réunion</h1><p>Consulte les créneaux publiés et vérifie toujours les conditions auprès du club avant de te déplacer.</p></div><div class="hero-actions"><a class="btn btn-primary" href="#/add-open-mat">${icons.plus} Ajouter un open mat</a><a class="btn btn-light" href="#/map">${icons.map} Voir la carte</a></div></div></section>
    <section class="page-main"><div class="container">
      <div class="section-label">Filtrer par zone</div><div class="filters" id="regionFilters"><button class="filter active" data-value="">Toute l’île</button>${["Nord","Ouest","Sud","Est"].map(x=>`<button class="filter" data-value="${x}">${x}</button>`).join("")}</div>
      <div class="section-label">Filtrer par format</div><div class="filters" id="matTypeFilters"><button class="filter active" data-value="">Tous</button><button class="filter" data-value="Gi">Gi</button><button class="filter" data-value="No-Gi">No-Gi</button><button class="filter" data-value="Tous niveaux">Tous niveaux</button><button class="filter" data-value="Compétiteurs">Compétiteurs</button></div>
      <div class="cards-grid" id="openMatsGrid">${mats.map(openMatCard).join("")}</div>
      <div class="directory-notice"><strong>Un créneau manque ?</strong><span>Les responsables de club peuvent proposer un open mat. La fiche sera vérifiée avant publication.</span><a class="btn btn-primary btn-sm" href="#/add-open-mat">Proposer un créneau</a></div>
    </div></section>`, "open-mats");
}

function addOpenMatPage() {
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Agenda communautaire</span><h1>Ajouter ou corriger un open mat</h1><p>Envoie le créneau public du club. ROLL974 le vérifiera avant publication.</p></div></div></section>
  <section class="page-main"><div class="container"><div class="form-layout">
    <form class="form-card" id="openMatSubmissionForm"><h2>Informations du créneau</h2><p>Les champs marqués d’un * sont obligatoires.</p><div class="form-grid">
      <div class="field full"><label for="matClubName">Nom du club *</label><input required id="matClubName"></div>
      <div class="field"><label for="matCity">Ville *</label><input required id="matCity"></div>
      <div class="field"><label for="matRegion">Zone *</label><select required id="matRegion"><option>Nord</option><option>Ouest</option><option>Sud</option><option>Est</option></select></div>
      <div class="field full"><label for="matAddress">Adresse *</label><input required id="matAddress"></div>
      <div class="field"><label for="matWeekday">Jour *</label><select required id="matWeekday">${["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"].map(day=>`<option>${day}</option>`).join("")}</select></div>
      <div class="field"><label for="matFormat">Format *</label><select required id="matFormat"><option>Gi</option><option>No-Gi</option><option>Gi & No-Gi</option><option>Grappling</option></select></div>
      <div class="field"><label for="matStart">Début *</label><input required type="time" id="matStart"></div>
      <div class="field"><label for="matEnd">Fin</label><input type="time" id="matEnd"></div>
      <div class="field"><label for="matLevel">Niveau accepté</label><input id="matLevel" placeholder="Tous niveaux, compétiteurs…"></div>
      <div class="field"><label for="matPublicContact">Contact public</label><input id="matPublicContact" placeholder="Téléphone, Instagram…"></div>
      <div class="field full"><label for="matConditions">Conditions d’accès</label><textarea id="matConditions" placeholder="Licence, inscription, tarif, matériel…"></textarea></div>
      <div class="field full"><label for="matSource">Lien officiel du club</label><input type="url" id="matSource" placeholder="https://…"></div>
      <div class="field"><label for="matContactName">Ton nom *</label><input required id="matContactName"></div>
      <div class="field"><label for="matContactEmail">Ton email *</label><input required type="email" id="matContactEmail"></div>
      <div class="field full"><label for="matMessage">Précisions</label><textarea id="matMessage"></textarea></div>
    </div><div class="form-actions"><a class="btn btn-light" href="#/open-mats">Annuler</a><button class="btn btn-primary" type="submit">${icons.check} Envoyer pour validation</button></div></form>
    <aside class="tip-card"><div class="step-icon">${icons.calendar}</div><h3>Un agenda fiable</h3><p>Les open mats changent parfois de lieu, d’horaire ou de format. ROLL974 vérifie chaque proposition avant publication.</p><p>Indique un lien officiel ou un contact du club lorsque c’est possible.</p></aside>
  </div></div></section>`, "open-mats");
}

function mapPage() {
  const clubs = getClubs();
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Annuaire vérifié</span><h1>Les clubs de La Réunion</h1><p>Explore les clubs de JJB, leurs disciplines, leurs contacts et leurs lieux d’entraînement.</p></div><a class="btn btn-primary" href="#/add-club">${icons.plus} Ajouter mon club</a></div></section>
  <section class="page-main"><div class="container">
    <div class="searchbar club-searchbar"><input id="searchClub" class="field-inline" placeholder="Rechercher un club, une ville…"><select id="clubRegionFilter" class="field-inline"><option value="">Toute l’île</option><option>Nord</option><option>Ouest</option><option>Sud</option><option>Est</option></select><button class="btn btn-dark" id="resetClubs">Réinitialiser</button></div>
    <div class="map-layout">
    <div class="map-card"><div id="mainOsmMap" class="leaflet-map" data-leaflet-map="full" aria-label="Carte interactive des clubs de La Réunion"></div><div class="map-key"><span><i class="dot blue"></i> Partenaire</span><span><i class="dot red"></i> Open mat</span><span><i class="dot green"></i> Club</span></div></div>
    <div class="club-list">${clubs.map(club=>`<article class="club-item" data-club="${safe(club.slug)}"><span class="tag">${safe(club.region)}</span><h3>${safe(club.name)}</h3><div class="meta">${icons.pin} ${safe(club.city)}</div><div class="tags"><span class="tag green">${safe(club.disciplines)}</span></div></article>`).join("")}</div>
    </div>
    <div class="section-head club-directory-head"><div><div class="section-label">${clubs.length} lieux référencés</div><h2>Annuaire des clubs</h2></div><p>Une information est incorrecte ou un club manque ? Propose une mise à jour.</p></div>
    <div class="cards-grid" id="clubsGrid">${clubs.map(clubCard).join("")}</div>
  </div></section>`, "map");
}

function addClubPage() {
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Annuaire communautaire</span><h1>Ajouter ou corriger un club</h1><p>Envoie les informations publiques du club. L’équipe ROLL974 les vérifiera avant publication.</p></div></div></section>
  <section class="page-main"><div class="container"><div class="form-layout">
    <form class="form-card" id="clubSubmissionForm"><h2>Fiche du club</h2><p>Les champs marqués d’un * sont obligatoires.</p><div class="form-grid">
      <div class="field full"><label for="clubName">Nom du club *</label><input required id="clubName" placeholder="Ex. Académie ROLL974"></div>
      <div class="field"><label for="clubCity">Ville *</label><input required id="clubCity" placeholder="Ex. Saint-Paul"></div>
      <div class="field"><label for="clubRegion">Zone *</label><select required id="clubRegion"><option>Nord</option><option>Ouest</option><option>Sud</option><option>Est</option></select></div>
      <div class="field full"><label for="clubAddress">Adresse</label><input id="clubAddress" placeholder="Adresse du dojo ou gymnase"></div>
      <div class="field"><label for="clubDisciplines">Disciplines</label><input id="clubDisciplines" placeholder="Gi, No-Gi, Grappling…"></div>
      <div class="field"><label for="clubPhone">Téléphone public</label><input id="clubPhone" placeholder="0692…"></div>
      <div class="field full"><label for="clubSchedule">Horaires</label><textarea id="clubSchedule" placeholder="Jours et heures des cours"></textarea></div>
      <div class="field full"><label for="clubWebsite">Site ou réseau social</label><input id="clubWebsite" type="url" placeholder="https://…"></div>
      <div class="field"><label for="clubContactName">Ton nom *</label><input required id="clubContactName"></div>
      <div class="field"><label for="clubContactEmail">Ton email *</label><input required type="email" id="clubContactEmail"></div>
      <div class="field full"><label for="clubMessage">Précisions</label><textarea id="clubMessage" placeholder="Open mats, corrections, informations utiles…"></textarea></div>
    </div><div class="form-actions"><a class="btn btn-light" href="#/map">Annuler</a><button class="btn btn-primary" type="submit">${icons.check} Envoyer pour validation</button></div></form>
    <aside class="tip-card"><div class="step-icon">${icons.check}</div><h3>Pourquoi une validation ?</h3><p>ROLL974 vérifie l’adresse et les contacts avant d’afficher une fiche. Cela évite les horaires obsolètes et les doublons.</p><p>Les coordonnées personnelles ne sont pas affichées sans accord.</p></aside>
  </div></div></section>`, "map");
}

function publishPage() {
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Passe à l’action</span><h1>Publier une annonce</h1><p>Quelques informations suffisent pour trouver le partenaire adapté à ta session.</p></div></div></section>
  <section class="page-main"><div class="container"><div class="form-layout">
    <form class="form-card" id="publishForm"><h2>Ta session</h2><p>Les champs marqués d’un * sont obligatoires.</p><div class="form-grid">
      <div class="field"><label for="date">Date *</label><input required type="date" id="date"></div>
      <div class="field"><label for="time">Heure *</label><input required type="time" id="time"></div>
      <div class="field"><label for="city">Ville / secteur *</label><select required id="city"><option value="">Choisir</option><option>Saint-Denis</option><option>Le Port</option><option>Saint-Paul</option><option>Saint-Pierre</option><option>Saint-André</option><option>Le Tampon</option></select></div>
      <div class="field"><label for="place">Lieu / club *</label><input required id="place" placeholder="Ex. West Coast BJJ"></div>
      <div class="field"><label for="training">Type d’entraînement *</label><select required id="training"><option>Drill technique</option><option>Sparring léger</option><option>Sparring intense</option><option>Préparation compétition</option></select></div>
      <div class="field"><label for="discipline">Discipline *</label><select required id="discipline"><option>Gi</option><option>No-Gi</option><option>Gi & No-Gi</option><option>Grappling</option></select></div>
      <div class="field"><label for="level">Niveau recherché</label><select id="level"><option>Tous niveaux</option><option>Ceinture blanche</option><option>Ceinture bleue</option><option>Ceinture violette et +</option></select></div>
      <div class="field"><label for="weight">Poids recherché</label><input id="weight" placeholder="Ex. 70–80 kg ou tous poids"></div>
      <div class="field full"><label for="message">Ton message *</label><textarea required id="message" placeholder="Décris le type de travail souhaité, l’intensité et toute information utile…"></textarea></div>
    </div><div class="form-actions"><a class="btn btn-light" href="#/partners">Annuler</a><button class="btn btn-primary" type="submit">${icons.check} Publier l’annonce</button></div></form>
    <aside class="tip-card"><div class="step-icon">${icons.check}</div><h3>Une bonne annonce, c’est…</h3><ul><li>un objectif clair et précis ;</li><li>une intensité annoncée à l’avance ;</li><li>un lieu public ou un club ;</li><li>du respect pour tous les niveaux.</li></ul><p>Roll974 met les pratiquants en relation. Assurez-vous toujours de l’accord du club avant une session.</p></aside>
  </div></div></section>`, "publish");
}

function profilePage() {
  const p = currentProfile || {
    display_name: currentUser?.user_metadata?.display_name || "Pratiquant ROLL974",
    city: currentUser?.user_metadata?.city || "", club: "", belt: currentUser?.user_metadata?.belt || "Blanche",
    weight: "", discipline: currentUser?.user_metadata?.discipline || "Gi & No-Gi",
    objective: "", availability: "", contact: "", bio: ""
  };
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Espace pratiquant</span><h1>Mon profil</h1><p>Les informations qui aident les autres pratiquants à trouver le bon partenaire.</p></div></div></section>
  <section class="page-main"><div class="container"><div class="profile-grid">
    <aside class="profile-card"><div class="profile-avatar">${safe(initials(p.display_name))}</div><h2>${safe(p.display_name)}</h2><p>Ceinture ${safe(p.belt)} · ${safe(p.city || "La Réunion")}</p><div class="tags" style="justify-content:center"><span class="tag">${safe(p.discipline)}</span>${p.objective ? `<span class="tag red">${safe(p.objective)}</span>` : ""}</div></aside>
    <form class="form-card" id="profileForm"><h2>Mes informations</h2><p>Elles apparaîtront sur tes annonces.</p><div class="form-grid">
      <div class="field"><label for="profileName">Prénom / pseudo</label><input required id="profileName" value="${safe(p.display_name)}"></div>
      <div class="field"><label for="profileCity">Ville</label><select required id="profileCity">${["Saint-Paul","Saint-Denis","Le Port","Saint-Pierre","Saint-André","Le Tampon"].map(city => `<option ${p.city===city?"selected":""}>${city}</option>`).join("")}</select></div>
      <div class="field"><label for="profileClub">Club</label><input id="profileClub" value="${safe(p.club)}" placeholder="Nom de ton club"></div>
      <div class="field"><label for="profileBelt">Grade</label><select id="profileBelt">${["Blanche","Bleue","Violette","Marron","Noire"].map(belt => `<option ${p.belt===belt?"selected":""}>${belt}</option>`).join("")}</select></div>
      <div class="field"><label for="profileWeight">Poids</label><input id="profileWeight" value="${safe(p.weight)}" placeholder="Ex. 78 kg"></div>
      <div class="field"><label for="profileDiscipline">Discipline</label><select id="profileDiscipline">${["Gi & No-Gi","Gi","No-Gi","Grappling"].map(value => `<option ${p.discipline===value?"selected":""}>${value}</option>`).join("")}</select></div>
      <div class="field"><label for="profileObjective">Objectif</label><input id="profileObjective" value="${safe(p.objective)}" placeholder="Loisir, compétition, drill…"></div>
      <div class="field"><label for="profileAvailability">Disponibilités</label><input id="profileAvailability" value="${safe(p.availability)}" placeholder="Soirs, week-end…"></div>
      <div class="field full"><label for="profileContact">Contact public</label><input id="profileContact" value="${safe(p.contact)}" placeholder="WhatsApp, Instagram ou email"></div>
      <div class="field full"><label for="profileBio">Présentation</label><textarea id="profileBio" placeholder="Parle de ta pratique…">${safe(p.bio)}</textarea></div>
    </div><div class="form-actions"><button class="btn btn-primary" type="submit">${icons.check} Enregistrer mon profil</button></div></form>
  </div></div></section>`, "profile");
}

function loginPage() {
  return `<div class="shell"><header class="topbar"><nav class="nav container">${brand()}<a class="btn btn-light btn-sm" href="#/">Retour au site</a></nav></header>
  <main class="auth-page"><form class="auth-card" id="loginForm">${brand()}<h1>Heureux de te revoir.</h1><p>Connecte-toi pour organiser ton prochain entraînement.</p>
    <div class="field"><label for="loginEmail">Email</label><input id="loginEmail" type="email" required autocomplete="email" placeholder="toi@exemple.com"></div><div class="field"><label for="loginPassword">Mot de passe</label><input id="loginPassword" type="password" required autocomplete="current-password" placeholder="8 caractères minimum"></div>
    <button class="btn btn-primary" type="submit">Se connecter ${icons.arrow}</button><p class="auth-switch">Pas encore de compte ? <a href="#/register">Créer mon profil</a></p></form></main></div>`;
}

function registerPage() {
  return `<div class="shell"><header class="topbar"><nav class="nav container">${brand()}<a class="btn btn-light btn-sm" href="#/">Retour au site</a></nav></header>
  <main class="auth-page"><form class="auth-card" id="registerForm">${brand()}<h1>Rejoins le mouvement.</h1><p>Crée ton profil pratiquant en quelques instants.</p>
    <div class="form-grid"><div class="field"><label for="registerName">Prénom / pseudo</label><input id="registerName" required placeholder="Ex. Kevin"></div><div class="field"><label for="registerCity">Ville</label><select id="registerCity" required><option>Saint-Paul</option><option>Saint-Denis</option><option>Le Port</option><option>Saint-Pierre</option><option>Saint-André</option><option>Le Tampon</option></select></div><div class="field full"><label for="registerEmail">Email</label><input id="registerEmail" type="email" required autocomplete="email" placeholder="toi@exemple.com"></div><div class="field"><label for="registerBelt">Grade</label><select id="registerBelt"><option>Blanche</option><option>Bleue</option><option>Violette</option><option>Marron</option><option>Noire</option></select></div><div class="field"><label for="registerDiscipline">Discipline</label><select id="registerDiscipline"><option>Gi & No-Gi</option><option>Gi</option><option>No-Gi</option><option>Grappling</option></select></div><div class="field full"><label for="registerPassword">Mot de passe</label><input id="registerPassword" type="password" minlength="8" required autocomplete="new-password" placeholder="8 caractères minimum"></div></div>
    <button class="btn btn-primary" type="submit">Créer mon profil ${icons.arrow}</button><p class="auth-switch">Déjà membre ? <a href="#/login">Se connecter</a></p></form></main></div>`;
}

function simplePage(type) {
  const isAbout = type === "about";
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">${isAbout ? "Notre raison d’être" : "Parlons-nous"}</span><h1>${isAbout ? "Plus de liens. Plus de rounds." : "Contacte l’équipe Roll974"}</h1><p>${isAbout ? "Roll974 est né d’une idée simple : rendre la communauté JJB réunionnaise plus facile à rencontrer, au-delà des clubs et des horaires habituels." : "Une question, un club à ajouter ou un open mat à signaler ? Écris-nous."}</p></div></div></section>
  <section class="page-main"><div class="container">${isAbout ? `<div class="steps"><div class="step"><div class="step-icon">${icons.user}</div><h3>Communauté d’abord</h3><p>Un espace ouvert à tous les clubs, grades et styles de pratique de l’île.</p></div><div class="step"><div class="step-icon">${icons.check}</div><h3>Respect sur le tapis</h3><p>Des rencontres basées sur la confiance, la clarté et le respect mutuel.</p></div><div class="step"><div class="step-icon">${icons.map}</div><h3>100% La Réunion</h3><p>Une plateforme pensée ici, pour les besoins concrets des pratiquants locaux.</p></div></div>` : `<div class="form-layout"><form class="form-card" id="contactForm"><h2>Envoyer un message</h2><p>Nous répondons généralement sous 48 h.</p><div class="form-grid"><div class="field"><label>Nom</label><input required></div><div class="field"><label>Email</label><input type="email" required></div><div class="field full"><label>Sujet</label><select><option>Ajouter mon club</option><option>Signaler un open mat</option><option>Question générale</option></select></div><div class="field full"><label>Message</label><textarea required></textarea></div></div><div class="form-actions"><button class="btn btn-primary">Envoyer le message</button></div></form><aside class="tip-card"><h3>Roll974</h3><p>La Réunion, France</p><p>contact@roll974.re<br>@roll974</p></aside></div>`}</div></section>`, type);
}

const routes = {
  "": homePage, "partners": partnersPage, "open-mats": openMatsPage, "map": mapPage,
  "add-club": addClubPage, "add-open-mat": addOpenMatPage, "publish": publishPage, "profile": profilePage, "login": loginPage, "register": registerPage,
  "about": () => simplePage("about"), "contact": () => simplePage("contact")
};

const activeLeafletMaps = [];

function setupLeafletMaps() {
  const containers = document.querySelectorAll("[data-leaflet-map]");
  if (!containers.length || !window.L) return;

  const communityPoints = [
    { lat: -21.0099, lng: 55.2697, title: "Partenaire disponible", subtitle: "Saint-Paul", color: "#1565C0" },
    { lat: -21.2765, lng: 55.5180, title: "Partenaire disponible", subtitle: "Le Tampon", color: "#1565C0" }
  ];
  const clubPoints = getClubs()
    .filter(club => Number.isFinite(club.latitude) && Number.isFinite(club.longitude))
    .map(club => ({
      lat: club.latitude,
      lng: club.longitude,
      title: club.name,
      subtitle: `Club · ${club.city}`,
      color: "#2E7D32"
    }));
  const openMatPoints = getOpenMats()
    .filter(mat => Number.isFinite(mat.latitude) && Number.isFinite(mat.longitude))
    .map(mat => ({
      lat: mat.latitude,
      lng: mat.longitude,
      title: mat.club,
      subtitle: `Open mat · ${mat.day} ${mat.time}`,
      color: "#E41E26"
    }));
  const points = [...clubPoints, ...openMatPoints, ...communityPoints];

  containers.forEach(container => {
    if (container.dataset.ready === "true") return;
    const compact = container.dataset.leafletMap === "compact";
    const map = L.map(container, {
      zoomControl: !compact,
      attributionControl: true,
      scrollWheelZoom: !compact,
      dragging: true,
      doubleClickZoom: !compact
    }).setView([-21.1151, 55.5364], compact ? 9 : 10);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    points.forEach(point => {
      L.circleMarker([point.lat, point.lng], {
        radius: compact ? 8 : 10,
        color: "#FFFFFF",
        weight: 3,
        fillColor: point.color,
        fillOpacity: 1
      }).addTo(map).bindPopup(`<strong>${point.title}</strong><br>${point.subtitle}`);
    });

    container.dataset.ready = "true";
    activeLeafletMaps.push(map);
    setTimeout(() => map.invalidateSize(), 0);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function bindEvents() {
  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) menuBtn.onclick = () => document.getElementById("mobileNav").classList.toggle("open");
  document.querySelectorAll(".contact-btn").forEach(btn => btn.onclick = () => {
    if (!currentUser) {
      showToast("Connecte-toi pour contacter un pratiquant.");
      setTimeout(() => { location.hash = "#/login"; }, 700);
      return;
    }
    showToast(btn.dataset.contact ? `Contact de ${btn.dataset.person} : ${btn.dataset.contact}` : `Demande de contact prête pour ${btn.dataset.person}`);
  });
  const logout = async () => {
    await supabase.auth.signOut();
    currentUser = null;
    currentProfile = null;
    showToast("Tu es déconnecté.");
    location.hash = "#/";
  };
  document.getElementById("logoutBtn")?.addEventListener("click", logout);
  document.getElementById("logoutMobile")?.addEventListener("click", logout);

  const search = document.getElementById("searchPartner"), region = document.getElementById("regionFilter"), type = document.getElementById("typeFilter");
  const filterPartners = () => {
    const q = (search?.value || "").toLowerCase(), r = region?.value || "", t = type?.value || "";
    document.querySelectorAll("#partnersGrid .partner-card").forEach(card => {
      card.style.display = (!q || card.textContent.toLowerCase().includes(q)) && (!r || card.dataset.region === r) && (!t || card.dataset.type.includes(t)) ? "" : "none";
    });
  };
  [search,region,type].forEach(el => el?.addEventListener(el.tagName==="INPUT"?"input":"change",filterPartners));
  document.getElementById("resetPartners")?.addEventListener("click", () => { search.value=""; region.value=""; type.value=""; filterPartners(); });

  const clubSearch = document.getElementById("searchClub");
  const clubRegion = document.getElementById("clubRegionFilter");
  const filterClubs = () => {
    const q = (clubSearch?.value || "").trim().toLowerCase();
    const selectedRegion = clubRegion?.value || "";
    document.querySelectorAll("#clubsGrid .club-directory-card").forEach(card => {
      card.style.display = (!q || card.dataset.search.includes(q)) && (!selectedRegion || card.dataset.region === selectedRegion) ? "" : "none";
    });
  };
  clubSearch?.addEventListener("input", filterClubs);
  clubRegion?.addEventListener("change", filterClubs);
  document.getElementById("resetClubs")?.addEventListener("click", () => {
    clubSearch.value = "";
    clubRegion.value = "";
    filterClubs();
  });

  let matRegion="", matType="";
  const filterMats = () => document.querySelectorAll("#openMatsGrid .openmat-card").forEach(card => {
    card.style.display = (!matRegion || card.dataset.region===matRegion) && (!matType || card.dataset.type.includes(matType) || card.dataset.level===matType) ? "" : "none";
  });
  document.querySelectorAll("#regionFilters .filter").forEach(btn => btn.onclick = () => {
    btn.parentNode.querySelectorAll(".filter").forEach(x=>x.classList.remove("active")); btn.classList.add("active"); matRegion=btn.dataset.value; filterMats();
  });
  document.querySelectorAll("#matTypeFilters .filter").forEach(btn => btn.onclick = () => {
    btn.parentNode.querySelectorAll(".filter").forEach(x=>x.classList.remove("active")); btn.classList.add("active"); matType=btn.dataset.value; filterMats();
  });
  document.querySelectorAll("[data-club]").forEach(el => el.onclick = () => {
    const id=el.dataset.club; document.querySelectorAll("[data-club]").forEach(x=>x.classList.toggle("active",x.dataset.club===id));
    document.querySelector(`.club-item[data-club="${id}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"});
  });

  document.getElementById("publishForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    if (!currentUser) {
      showToast("Connecte-toi avant de publier.");
      setTimeout(() => { location.hash = "#/login"; }, 700);
      return;
    }
    const city = document.getElementById("city").value;
    const button = e.submitter;
    if (button) button.disabled = true;
    const { error } = await supabase.from("partner_posts").insert({
      user_id: currentUser.id,
      session_date: document.getElementById("date").value,
      session_time: document.getElementById("time").value,
      city,
      region: regionForCity(city),
      place: document.getElementById("place").value.trim(),
      training_type: document.getElementById("training").value,
      discipline: document.getElementById("discipline").value,
      level: document.getElementById("level").value,
      weight: document.getElementById("weight").value.trim() || "Tous poids",
      message: document.getElementById("message").value.trim()
    });
    if (button) button.disabled = false;
    if (error) {
      showToast(`Publication impossible : ${error.message}`);
      return;
    }
    await loadRemotePartners();
    showToast("Ton annonce est publiée !");
    setTimeout(() => { location.hash = "#/partners"; }, 700);
  });

  document.getElementById("loginForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const button = e.submitter;
    if (button) button.disabled = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: document.getElementById("loginEmail").value.trim(),
      password: document.getElementById("loginPassword").value
    });
    if (button) button.disabled = false;
    if (error) {
      showToast("Email ou mot de passe incorrect.");
      return;
    }
    currentUser = data.user;
    await loadCurrentProfile();
    showToast("Bienvenue sur ROLL974 !");
    location.hash = "#/profile";
  });

  document.getElementById("registerForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const button = e.submitter;
    if (button) button.disabled = true;
    const metadata = {
      display_name: document.getElementById("registerName").value.trim(),
      city: document.getElementById("registerCity").value,
      belt: document.getElementById("registerBelt").value,
      discipline: document.getElementById("registerDiscipline").value
    };
    const { data, error } = await supabase.auth.signUp({
      email: document.getElementById("registerEmail").value.trim(),
      password: document.getElementById("registerPassword").value,
      options: { data: metadata }
    });
    if (button) button.disabled = false;
    if (error) {
      showToast(`Inscription impossible : ${error.message}`);
      return;
    }
    if (!data.session) {
      showToast("Compte créé ! Confirme ton adresse dans l’email reçu.");
      setTimeout(() => { location.hash = "#/login"; }, 1800);
      return;
    }
    currentUser = data.user;
    await loadCurrentProfile();
    showToast("Bienvenue dans la communauté !");
    location.hash = "#/profile";
  });

  document.getElementById("profileForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const button = e.submitter;
    if (button) button.disabled = true;
    const profile = {
      id: currentUser.id,
      display_name: document.getElementById("profileName").value.trim(),
      city: document.getElementById("profileCity").value,
      club: document.getElementById("profileClub").value.trim(),
      belt: document.getElementById("profileBelt").value,
      weight: document.getElementById("profileWeight").value.trim(),
      discipline: document.getElementById("profileDiscipline").value,
      objective: document.getElementById("profileObjective").value.trim(),
      availability: document.getElementById("profileAvailability").value.trim(),
      contact: document.getElementById("profileContact").value.trim(),
      bio: document.getElementById("profileBio").value.trim(),
      updated_at: new Date().toISOString()
    };
    const { error } = await supabase.from("profiles").upsert(profile);
    if (button) button.disabled = false;
    if (error) {
      showToast(`Enregistrement impossible : ${error.message}`);
      return;
    }
    currentProfile = profile;
    await loadRemotePartners();
    showToast("Ton profil est enregistré.");
    render();
  });

  document.getElementById("clubSubmissionForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const button = e.submitter;
    if (button) button.disabled = true;
    const { error } = await supabase.from("club_submissions").insert({
      submitted_by: currentUser?.id || null,
      club_name: document.getElementById("clubName").value.trim(),
      city: document.getElementById("clubCity").value.trim(),
      region: document.getElementById("clubRegion").value,
      address: document.getElementById("clubAddress").value.trim(),
      disciplines: document.getElementById("clubDisciplines").value.trim(),
      schedule: document.getElementById("clubSchedule").value.trim(),
      contact_name: document.getElementById("clubContactName").value.trim(),
      contact_email: document.getElementById("clubContactEmail").value.trim(),
      phone: document.getElementById("clubPhone").value.trim(),
      website: document.getElementById("clubWebsite").value.trim(),
      message: document.getElementById("clubMessage").value.trim()
    });
    if (button) button.disabled = false;
    if (error) {
      showToast(`Envoi impossible : ${error.message}`);
      return;
    }
    showToast("Merci ! La fiche sera vérifiée avant publication.");
    e.currentTarget.reset();
    setTimeout(() => { location.hash = "#/map"; }, 1500);
  });

  document.getElementById("openMatSubmissionForm")?.addEventListener("submit", async e => {
    e.preventDefault();
    const button = e.submitter;
    if (button) button.disabled = true;
    const { error } = await supabase.from("open_mat_submissions").insert({
      submitted_by: currentUser?.id || null,
      club_name: document.getElementById("matClubName").value.trim(),
      city: document.getElementById("matCity").value.trim(),
      region: document.getElementById("matRegion").value,
      address: document.getElementById("matAddress").value.trim(),
      weekday: document.getElementById("matWeekday").value,
      start_time: document.getElementById("matStart").value,
      end_time: document.getElementById("matEnd").value || null,
      format: document.getElementById("matFormat").value,
      level: document.getElementById("matLevel").value.trim(),
      access_conditions: document.getElementById("matConditions").value.trim(),
      public_contact: document.getElementById("matPublicContact").value.trim(),
      source_url: document.getElementById("matSource").value.trim(),
      contact_name: document.getElementById("matContactName").value.trim(),
      contact_email: document.getElementById("matContactEmail").value.trim(),
      message: document.getElementById("matMessage").value.trim()
    });
    if (button) button.disabled = false;
    if (error) {
      showToast(`Envoi impossible : ${error.message}`);
      return;
    }
    showToast("Merci ! Le créneau sera vérifié avant publication.");
    e.currentTarget.reset();
    setTimeout(() => { location.hash = "#/open-mats"; }, 1500);
  });

  document.getElementById("contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Message envoyé !");
  });
}

function render() {
  const route = location.hash.replace(/^#\/?/, "").split("?")[0];
  if ((route === "profile" || route === "publish") && !currentUser) {
    document.getElementById("app").innerHTML = loginPage();
    window.scrollTo(0, 0);
    bindEvents();
    return;
  }
  document.getElementById("app").innerHTML = (routes[route] || homePage)();
  window.scrollTo(0,0); bindEvents(); setupLeafletMaps();
}

window.addEventListener("hashchange", render);

async function initialize() {
  const { data } = await supabase.auth.getSession();
  currentUser = data.session?.user || null;
  await Promise.all([loadCurrentProfile(), loadRemotePartners(), loadRemoteClubs(), loadRemoteOpenMats()]);
  render();

  supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(async () => {
      currentUser = session?.user || null;
      await loadCurrentProfile();
      render();
    }, 0);
  });
}

initialize();
