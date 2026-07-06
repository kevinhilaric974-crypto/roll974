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
  <svg class="brand-logo" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="29" r="21.5" fill="none" stroke="currentColor" stroke-width="3.5"/>
    <path d="M17 31c3-7 7-12 14-15 5 2 11 6 16 13-3 9-9 15-17 16-7-1-11-6-13-14Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <path d="m18 38 8-10 5 6 5-9 10 14M27 45l-9 9M37 45l10 9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25 43c3-4 11-4 14 0l-4 7h-6l-4-7Z" fill="#fff" stroke="currentColor" stroke-width="2"/>
    <path class="logo-lava" d="m43 49 7 6" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="square"/>
  </svg>`;

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

const openMats = [
  { id:"sp", club:"Sud Jiu-Jitsu", city:"Saint-Pierre", region:"Sud", address:"12 rue des Bons-Enfants", day:"Samedi", time:"10:00 – 12:00", type:"Gi & No-Gi", level:"Tous niveaux", contact:"0262 12 34 56", extra:"Vestiaires et douches disponibles.", x:"south" },
  { id:"lp", club:"Port Fight Club", city:"Le Port", region:"Ouest", address:"8 avenue de la Commune", day:"Dimanche", time:"09:30 – 11:30", type:"No-Gi", level:"Compétiteurs", contact:"0692 34 56 78", extra:"Rounds de 6 min. Rashguard obligatoire.", x:"west" },
  { id:"sd", club:"Nord Grappling", city:"Saint-Denis", region:"Nord", address:"24 rue de Paris", day:"Vendredi", time:"19:00 – 21:00", type:"Gi", level:"Tous niveaux", contact:"@nordgrappling974", extra:"Ouvert aux visiteurs, inscription conseillée.", x:"north" },
  { id:"sa", club:"Est BJJ Academy", city:"Saint-André", region:"Est", address:"5 chemin du Centre", day:"Mercredi", time:"18:30 – 20:30", type:"Gi & No-Gi", level:"Tous niveaux", contact:"0693 22 44 11", extra:"Une semaine Gi, une semaine No-Gi.", x:"east" }
];

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function getPartners() {
  try { return [...JSON.parse(localStorage.getItem("roll974-partners") || "[]"), ...seedPartners]; }
  catch { return seedPartners; }
}

function brand() {
  return `<a class="brand" href="#/">${logoSvg()}<span>ROLL<small>974</small></span></a>`;
}

function layout(content, route = "") {
  const links = [
    ["partners","Partenaires"], ["open-mats","Open mats"], ["map","Carte des clubs"], ["about","À propos"]
  ];
  return `<div class="shell">
    <header class="topbar"><nav class="nav container">
      ${brand()}
      <div class="nav-links">${links.map(([r,n]) => `<a class="nav-link ${route===r?"active":""}" href="#/${r}">${n}</a>`).join("")}</div>
      <div class="nav-actions">
        <a class="btn btn-ghost btn-sm" href="#/login">${icons.user} Connexion</a>
        <a class="btn btn-primary btn-sm" href="#/publish">${icons.plus} Publier</a>
        <button class="btn btn-light menu-btn" id="menuBtn" aria-label="Ouvrir le menu">${icons.menu}</button>
      </div>
    </nav>
    <div class="mobile-nav" id="mobileNav">
      ${links.map(([r,n]) => `<a class="nav-link" href="#/${r}">${n}</a>`).join("")}
      <a class="nav-link" href="#/profile">Mon profil</a><a class="nav-link" href="#/login">Connexion</a>
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
    <div class="card-divider"></div><div class="card-foot"><span class="time-ago">${safe(p.ago)}</span><button class="btn btn-light btn-sm contact-btn" data-person="${safe(p.name)}">${icons.message} Contacter</button></div>
  </article>`;
}

function openMatCard(o) {
  return `<article class="card openmat-card" data-region="${o.region}" data-type="${o.type}" data-level="${o.level}">
    <div class="om-visual"><span class="om-region">${o.region} · ${o.city}</span><h3>${o.club}</h3></div>
    <div class="om-body"><div class="schedule"><div class="date-box">${o.day.slice(0,3).toUpperCase()}</div><div><strong>${o.day} · ${o.time}</strong><span>${o.type} · ${o.level}</span></div></div>
    <div class="meta">${icons.pin} ${o.address}, ${o.city}</div><div class="card-divider"></div>
    <div class="card-foot"><a class="btn btn-light btn-sm" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address+" "+o.city+" La Réunion")}">${icons.map} Itinéraire</a><button class="btn btn-primary btn-sm contact-btn" data-person="${o.club}">Contacter</button></div></div>
  </article>`;
}

function homePage() {
  return layout(`
    <section class="hero"><div class="container hero-grid">
      <div class="hero-copy"><span class="eyebrow">La communauté du Jiu-Jitsu Brésilien à La Réunion</span>
        <h1>Trouve un <span class="accent">partenaire</span> d’entraînement près de chez toi.</h1>
        <p>La première plateforme réunionnaise dédiée au Jiu-Jitsu Brésilien. Trouve, organise, progresse — ensemble.</p>
        <div class="hero-actions"><a class="btn btn-primary" href="#/partners">${icons.search} Trouver un partenaire</a><a class="btn btn-light" href="#/open-mats">${icons.calendar} Voir les open mats</a></div>
        <div class="trust-row"><div class="avatars"><span class="avatar">MR</span><span class="avatar">LD</span><span class="avatar">YP</span><span class="avatar">+28</span></div><span><b>31 pratiquants</b> disponibles aujourd’hui sur l’île</span></div>
      </div>
      <div class="hero-panel"><div id="heroOsmMap" class="leaflet-map hero-leaflet-map" data-leaflet-map="compact" aria-label="Carte interactive de La Réunion"></div>
        <div class="floating-stat"><strong>12</strong><span>open mats cette semaine</span></div>
      </div>
    </div></section>
    <div class="container"><div class="stats-strip"><div class="stat"><strong>${icons.search} Trouve</strong><span>un partenaire adapté</span></div><div class="stat"><strong>${icons.calendar} Organise</strong><span>tes entraînements</span></div><div class="stat"><strong>${icons.map} Découvre</strong><span>les open mats</span></div><div class="stat"><strong>${icons.arrow} Progresse</strong><span>avec la communauté</span></div></div></div>
    <section class="section"><div class="container"><div class="section-head"><div><div class="section-label">Simple comme un shrimp</div><h2>Plus de temps sur le tatami</h2></div><p>Roll974 te rapproche des bonnes personnes, au bon endroit, au bon moment. Le reste se joue sur le tapis.</p></div>
      <div class="steps">
        <div class="step"><div class="step-icon">${icons.user}</div><span class="step-number">ÉTAPE 01</span><h3>Crée ton profil</h3><p>Indique ton grade, ta zone, ta discipline et tes objectifs d’entraînement.</p></div>
        <div class="step"><div class="step-icon">${icons.search}</div><span class="step-number">ÉTAPE 02</span><h3>Trouve ton match</h3><p>Filtre par secteur, niveau ou type de pratique pour trouver le bon partenaire.</p></div>
        <div class="step"><div class="step-icon">${icons.message}</div><span class="step-number">ÉTAPE 03</span><h3>Organisez le round</h3><p>Échangez directement et fixez votre session. Simple, rapide, local.</p></div>
      </div>
    </div></section>
    <section class="section section-white"><div class="container"><div class="section-head"><div><div class="section-label">En ce moment</div><h2>Ils cherchent un partenaire</h2></div><a class="btn btn-light" href="#/partners">Voir toutes les annonces ${icons.arrow}</a></div><div class="cards-grid">${getPartners().slice(0,3).map(partnerCard).join("")}</div></div></section>
    <section class="section"><div class="container"><div class="section-head"><div><div class="section-label">Où rouler cette semaine</div><h2>Les prochains open mats</h2></div><a class="btn btn-light" href="#/open-mats">Tous les open mats ${icons.arrow}</a></div><div class="cards-grid">${openMats.slice(0,3).map(openMatCard).join("")}</div></div></section>
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
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Agenda de l’île</span><h1>Open mats à La Réunion</h1><p>Trouve les sessions ouvertes dans les clubs du Nord, de l’Ouest, du Sud et de l’Est.</p></div><a class="btn btn-light" href="#/map">${icons.map} Voir la carte</a></div></section>
    <section class="page-main"><div class="container">
      <div class="section-label">Filtrer par zone</div><div class="filters" id="regionFilters"><button class="filter active" data-value="">Toute l’île</button>${["Nord","Ouest","Sud","Est"].map(x=>`<button class="filter" data-value="${x}">${x}</button>`).join("")}</div>
      <div class="section-label">Filtrer par format</div><div class="filters" id="matTypeFilters"><button class="filter active" data-value="">Tous</button><button class="filter" data-value="Gi">Gi</button><button class="filter" data-value="No-Gi">No-Gi</button><button class="filter" data-value="Tous niveaux">Tous niveaux</button><button class="filter" data-value="Compétiteurs">Compétiteurs</button></div>
      <div class="cards-grid" id="openMatsGrid">${openMats.map(openMatCard).join("")}</div>
    </div></section>`, "open-mats");
}

function mapPage() {
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Près de chez toi</span><h1>La carte des clubs</h1><p>Explore les clubs et les open mats aux quatre coins de La Réunion.</p></div></div></section>
  <section class="page-main"><div class="container"><div class="map-layout">
    <div class="map-card"><div id="mainOsmMap" class="leaflet-map" data-leaflet-map="full" aria-label="Carte interactive des clubs de La Réunion"></div><div class="map-key"><span><i class="dot blue"></i> Partenaire</span><span><i class="dot red"></i> Open mat</span><span><i class="dot green"></i> Club</span></div></div>
    <div class="club-list">${openMats.map(o=>`<article class="club-item" data-club="${o.id}"><span class="tag">${o.region}</span><h3>${o.club}</h3><div class="meta">${icons.pin} ${o.city}</div><div class="tags"><span class="tag green">${o.day} ${o.time}</span><span class="tag">${o.type}</span></div></article>`).join("")}</div>
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
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">Espace pratiquant</span><h1>Mon profil</h1><p>Les informations qui aident les autres pratiquants à trouver le bon partenaire.</p></div><button class="btn btn-light edit-profile">Modifier le profil</button></div></section>
  <section class="page-main"><div class="container"><div class="profile-grid">
    <aside class="profile-card"><div class="profile-avatar">KR</div><h2>Kevin R.</h2><p>Ceinture bleue · Saint-Paul</p><div class="tags" style="justify-content:center"><span class="tag">Gi</span><span class="tag">No-Gi</span><span class="tag red">Compétition</span></div><div class="profile-stats"><div><strong>12</strong><span>SESSIONS</span></div><div><strong>8</strong><span>PARTENAIRES</span></div><div><strong>4.9</strong><span>ÉVALUATION</span></div></div></aside>
    <div><section class="info-block"><h3>Informations de pratique</h3><dl class="info-grid"><div class="info"><dt>Club</dt><dd>West Coast BJJ</dd></div><div class="info"><dt>Grade</dt><dd>Ceinture bleue</dd></div><div class="info"><dt>Poids</dt><dd>78 kg</dd></div><div class="info"><dt>Objectif</dt><dd>Compétition & progression</dd></div><div class="info"><dt>Disponibilités</dt><dd>Soirs en semaine, samedi matin</dd></div><div class="info"><dt>Contact</dt><dd>WhatsApp · Instagram</dd></div></dl></section>
    <section class="info-block"><h3>Ma présentation</h3><p style="color:var(--muted);line-height:1.7;margin:0">Je pratique depuis trois ans et je cherche surtout des partenaires réguliers pour travailler le No-Gi, les passages de garde et préparer les compétitions locales. Toujours partant pour des rounds techniques.</p></section></div>
  </div></div></section>`, "profile");
}

function loginPage() {
  return `<div class="shell"><header class="topbar"><nav class="nav container">${brand()}<a class="btn btn-light btn-sm" href="#/">Retour au site</a></nav></header>
  <main class="auth-page"><form class="auth-card" id="loginForm">${brand()}<h1>Heureux de te revoir.</h1><p>Connecte-toi pour organiser ton prochain entraînement.</p>
    <div class="field"><label>Email</label><input type="email" required placeholder="toi@exemple.com"></div><div class="field"><label>Mot de passe</label><input type="password" required placeholder="8 caractères minimum"></div>
    <button class="btn btn-primary" type="submit">Se connecter ${icons.arrow}</button><p class="auth-switch">Pas encore de compte ? <a href="#/register">Créer mon profil</a></p></form></main></div>`;
}

function registerPage() {
  return `<div class="shell"><header class="topbar"><nav class="nav container">${brand()}<a class="btn btn-light btn-sm" href="#/">Retour au site</a></nav></header>
  <main class="auth-page"><form class="auth-card" id="registerForm">${brand()}<h1>Rejoins le mouvement.</h1><p>Crée ton profil pratiquant en quelques instants.</p>
    <div class="form-grid"><div class="field"><label>Prénom / pseudo</label><input required placeholder="Ex. Kevin"></div><div class="field"><label>Ville</label><select required><option>Saint-Paul</option><option>Saint-Denis</option><option>Le Port</option><option>Saint-Pierre</option></select></div><div class="field full"><label>Email</label><input type="email" required placeholder="toi@exemple.com"></div><div class="field"><label>Grade</label><select><option>Blanche</option><option>Bleue</option><option>Violette</option><option>Marron</option><option>Noire</option></select></div><div class="field"><label>Discipline</label><select><option>Gi & No-Gi</option><option>Gi</option><option>No-Gi</option></select></div></div>
    <button class="btn btn-primary" type="submit">Créer mon profil ${icons.arrow}</button><p class="auth-switch">Déjà membre ? <a href="#/login">Se connecter</a></p></form></main></div>`;
}

function simplePage(type) {
  const isAbout = type === "about";
  return layout(`<section class="page-hero"><div class="container"><div><span class="eyebrow">${isAbout ? "Notre raison d’être" : "Parlons-nous"}</span><h1>${isAbout ? "Plus de liens. Plus de rounds." : "Contacte l’équipe Roll974"}</h1><p>${isAbout ? "Roll974 est né d’une idée simple : rendre la communauté JJB réunionnaise plus facile à rencontrer, au-delà des clubs et des horaires habituels." : "Une question, un club à ajouter ou un open mat à signaler ? Écris-nous."}</p></div></div></section>
  <section class="page-main"><div class="container">${isAbout ? `<div class="steps"><div class="step"><div class="step-icon">${icons.user}</div><h3>Communauté d’abord</h3><p>Un espace ouvert à tous les clubs, grades et styles de pratique de l’île.</p></div><div class="step"><div class="step-icon">${icons.check}</div><h3>Respect sur le tapis</h3><p>Des rencontres basées sur la confiance, la clarté et le respect mutuel.</p></div><div class="step"><div class="step-icon">${icons.map}</div><h3>100% La Réunion</h3><p>Une plateforme pensée ici, pour les besoins concrets des pratiquants locaux.</p></div></div>` : `<div class="form-layout"><form class="form-card" id="contactForm"><h2>Envoyer un message</h2><p>Nous répondons généralement sous 48 h.</p><div class="form-grid"><div class="field"><label>Nom</label><input required></div><div class="field"><label>Email</label><input type="email" required></div><div class="field full"><label>Sujet</label><select><option>Ajouter mon club</option><option>Signaler un open mat</option><option>Question générale</option></select></div><div class="field full"><label>Message</label><textarea required></textarea></div></div><div class="form-actions"><button class="btn btn-primary">Envoyer le message</button></div></form><aside class="tip-card"><h3>Roll974</h3><p>La Réunion, France</p><p>contact@roll974.re<br>@roll974</p></aside></div>`}</div></section>`, type);
}

const routes = {
  "": homePage, "partners": partnersPage, "open-mats": openMatsPage, "map": mapPage,
  "publish": publishPage, "profile": profilePage, "login": loginPage, "register": registerPage,
  "about": () => simplePage("about"), "contact": () => simplePage("contact")
};

const activeLeafletMaps = [];

function setupLeafletMaps() {
  const containers = document.querySelectorAll("[data-leaflet-map]");
  if (!containers.length || !window.L) return;

  const points = [
    { lat: -20.8789, lng: 55.4481, title: "Nord Grappling", subtitle: "Open mat · Saint-Denis", color: "#E53935" },
    { lat: -20.9373, lng: 55.2919, title: "Port Fight Club", subtitle: "Club · Le Port", color: "#2E8B57" },
    { lat: -21.0099, lng: 55.2697, title: "Partenaire disponible", subtitle: "Saint-Paul", color: "#0066CC" },
    { lat: -21.3393, lng: 55.4781, title: "Sud Jiu-Jitsu", subtitle: "Open mat · Saint-Pierre", color: "#E53935" },
    { lat: -20.9633, lng: 55.6507, title: "Est BJJ Academy", subtitle: "Club · Saint-André", color: "#2E8B57" },
    { lat: -21.2765, lng: 55.5180, title: "Partenaire disponible", subtitle: "Le Tampon", color: "#0066CC" }
  ];

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
  document.querySelectorAll(".contact-btn").forEach(btn => btn.onclick = () => showToast(`Demande de contact prête pour ${btn.dataset.person}`));

  const search = document.getElementById("searchPartner"), region = document.getElementById("regionFilter"), type = document.getElementById("typeFilter");
  const filterPartners = () => {
    const q = (search?.value || "").toLowerCase(), r = region?.value || "", t = type?.value || "";
    document.querySelectorAll("#partnersGrid .partner-card").forEach(card => {
      card.style.display = (!q || card.textContent.toLowerCase().includes(q)) && (!r || card.dataset.region === r) && (!t || card.dataset.type.includes(t)) ? "" : "none";
    });
  };
  [search,region,type].forEach(el => el?.addEventListener(el.tagName==="INPUT"?"input":"change",filterPartners));
  document.getElementById("resetPartners")?.addEventListener("click", () => { search.value=""; region.value=""; type.value=""; filterPartners(); });

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

  document.getElementById("publishForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const city=document.getElementById("city").value, discipline=document.getElementById("discipline").value, training=document.getElementById("training").value;
    const regionMap={"Saint-Denis":"Nord","Le Port":"Ouest","Saint-Paul":"Ouest","Saint-Pierre":"Sud","Le Tampon":"Sud","Saint-André":"Est"};
    const p={id:Date.now(),name:"Kevin R.",initials:"KR",city,club:document.getElementById("place").value,belt:"Bleue",beltClass:"",title:document.getElementById("message").value, type:discipline,intensity:training,date:`${document.getElementById("date").value} · ${document.getElementById("time").value}`,ago:"À l’instant",weight:document.getElementById("weight").value||"Tous poids",region:regionMap[city]||"Ouest"};
    const saved=JSON.parse(localStorage.getItem("roll974-partners")||"[]"); saved.unshift(p); localStorage.setItem("roll974-partners",JSON.stringify(saved));
    showToast("Ton annonce est publiée !"); setTimeout(()=>location.hash="#/partners",700);
  });
  ["loginForm","registerForm","contactForm"].forEach(id => document.getElementById(id)?.addEventListener("submit",e=>{e.preventDefault();showToast(id==="contactForm"?"Message envoyé !":"Bienvenue sur Roll974 !");if(id!=="contactForm")setTimeout(()=>location.hash="#/profile",650);}));
  document.querySelector(".edit-profile")?.addEventListener("click",()=>showToast("L’édition du profil arrive dans la prochaine version."));
}

function render() {
  const route = location.hash.replace(/^#\/?/, "").split("?")[0];
  document.getElementById("app").innerHTML = (routes[route] || homePage)();
  window.scrollTo(0,0); bindEvents(); setupLeafletMaps();
}

window.addEventListener("hashchange", render);
render();
