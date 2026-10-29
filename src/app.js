/* ---------- Application : sections, recherche, fiches, détail, brief ---------- */
const TOOLS = {css:"CSS natif",js:"JavaScript",html:"HTML natif",gsap:"GSAP",st:"GSAP ScrollTrigger",split:"GSAP SplitText",motion:"Motion (Framer Motion)",lottie:"Lottie",rive:"Rive",vt:"View Transitions API",aos:"AOS",anime:"anime.js",three:"Three.js",tsp:"tsParticles",conf:"canvas-confetti",typed:"Typed.js",lenis:"Lenis",scrolly:"Scrollama",hf:"HyperFrames",rem:"Remotion",shad:"shadcn/ui",radix:"Radix UI",mui:"MUI",tw:"Tailwind CSS",aria:"ARIA (W3C APG)",swiper:"Swiper",embla:"Embla Carousel",pswp:"PhotoSwipe",plyr:"Plyr",leaflet:"Leaflet",chart:"Chart.js",d3:"D3.js",sortable:"SortableJS",flat:"Flatpickr",tiptap:"Tiptap",cmdk:"cmdk",driver:"Driver.js",shep:"Shepherd.js",h5p:"H5P",figma:"Figma",ae:"After Effects",pr:"Premiere Pro",dv:"DaVinci Resolve",cc:"CapCut",fcp:"Final Cut Pro",desc:"Descript",blend:"Blender"};
const SECTIONS = [
  {id:"animations",label:"Animations",data:ANIM,title:"Animations",desc:"Les mouvements qu'on donne aux éléments d'une interface ou d'une vidéo. Clique une scène pour rejouer, ouvre une fiche pour le prompt complet.",
   tpl:e=>`Ajoute une animation « ${e.n} » (${e.f.toLowerCase()}) sur [l'élément] : ${e.s}.`},
  {id:"composants",label:"Composants",data:COMP,title:"Composants web",desc:"Les briques d'interface et leurs noms officiels. Les démos sont manipulables.",
   tpl:e=>`Utilise un composant « ${e.n} » (${e.f.toLowerCase()}) pour [ton usage] : ${e.s}.`},
  {id:"apprentissage",label:"Apprentissage",data:LEARN,title:"Patterns d'apprentissage",desc:"Des façons de faire interagir l'apprenant, pour varier tes modules et tes vidéos.",
   tpl:e=>`Crée une interaction « ${e.n} » (${e.f.toLowerCase()}) sur [ton contenu] : ${e.s}.`},
  {id:"video",label:"Vidéo & motion",data:VIDEO,title:"Vidéo & motion design",desc:"Le vocabulaire du tournage et du montage : plans, mouvements de caméra, transitions, habillage, rythme et formats. Les démos tournent en boucle dans un cadre 16:9.",
   tpl:e=>`Dans la vidéo, utilise « ${e.n} » (${e.f.toLowerCase()}) pour [ta scène ou ton moment] : ${e.s}.`},
  {id:"easing",label:"Easing & timing",data:EASE,title:"Easing & timing",desc:"Le vocabulaire du rythme : courbes d'accélération, durées, chorégraphie et principes d'animation. La balle pleine suit la courbe, la balle en pointillés est linéaire.",
   tpl:e=>`Pour [les animations de l'élément], applique « ${e.n} » (${e.f.toLowerCase()}) : ${e.s}.`},
  {id:"principes",label:"Lois & principes",data:LAWS,title:"Lois & principes UX",desc:"Les règles de perception et de psychologie qui expliquent pourquoi une interface marche, et le vocabulaire des designers.",
   tpl:e=>`Applique le principe « ${e.n} » (${e.f.toLowerCase()}) à [ton écran] : ${e.s}.`},
  {id:"layouts",label:"Layouts & styles",data:LAYOUT,title:"Layouts & styles visuels",desc:"Les noms des mises en page, des sections de page et des « looks » graphiques.",
   tpl:e=>`Utilise ${e.g==="Styles visuels"?"le style visuel":e.g==="Layouts"?"la mise en page":"la section"} « ${e.n} » (${e.f.toLowerCase()}) pour [ta page] : ${e.s}.`},
];
const ALL = [];
SECTIONS.forEach(S => S.data.forEach((e, i) => { e.sec = S; e.id = S.id + "-" + e.n.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); ALL.push(e); }));
const BY_ID = Object.fromEntries(ALL.map(e => [e.id, e]));

/* ---------- Stockage local (confort, jamais indispensable) ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("bonmot." + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("bonmot." + k, JSON.stringify(v)); } catch {} },
};
let favs = store.get("fav", []).filter(id => BY_ID[id]);
let edits = store.get("edits", {});
const promptOf = e => edits[e.id] || e.sec.tpl(e);

/* ---------- Recherche par description ---------- */
const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ");
const STOP = new Set("le la les un une des de du d l au aux et ou en a sur pour avec qui que quoi quand dans par se ce cet cette ces il elle on est sont qu y truc chose machin bidule genre petit petite fait faire ca cela comme quelque quelqu ne pas plus tres je tu mon ma mes ton ta tes son sa ses".split(" "));
const SYN = {tourne:"spin rotate rotation orbit",bulle:"tooltip popover bubble chat",survol:"hover",fenetre:"modal dialog popup",popup:"modal dialog popover",clignote:"blink flash",secoue:"shake",tremble:"shake vibrate",glisse:"slide drawer swipe",rebond:"bounce",rebondit:"bounce",apparait:"fade reveal entrance",disparait:"fade out exit",chargement:"loading spinner skeleton progress",attente:"loading spinner skeleton",menu:"menu navigation dropdown",deroulant:"dropdown select accordion",carrousel:"carousel slider",diapo:"carousel slides",onglet:"tabs",etape:"stepper wizard step",progression:"progress",barre:"bar progress navbar",notif:"toast notification badge",notification:"toast notification badge alert",message:"toast alert chat",bouton:"button",case:"checkbox",cocher:"checkbox check",interrupteur:"switch toggle",curseur:"slider cursor",calendrier:"date picker",date:"date picker",image:"image lightbox gallery",photo:"image lightbox ken burns",zoom:"zoom",flou:"blur glass",verre:"glass",ombre:"shadow lift",lettre:"letter text typewriter",texte:"text typography",ecrit:"typewriter",chiffre:"count number odometer",nombre:"count number odometer",defile:"scroll marquee",scroll:"scroll parallax sticky",descend:"scroll",colle:"sticky pin",fond:"background gradient",degrade:"gradient",couleur:"color gradient",carte:"card flip flashcard map",retourne:"flip",quiz:"quiz multiple choice",question:"quiz poll",glisser:"drag drop",deposer:"drop drag upload",fichier:"file upload",recherche:"search command",cherche:"search",liste:"list",tableau:"table data kanban",graphique:"chart",ressort:"spring elastic",vitesse:"easing duration",lent:"easing slow",rapide:"easing fast duration",oeil:"pattern hierarchy",lire:"pattern reading",ecran:"layout screen",grille:"grid bento",colonne:"column grid",pied:"footer",haut:"header navbar hero top",cote:"sidebar drawer side",cache:"reveal hidden",cacher:"reveal hidden",revele:"reveal",reponse:"reveal quiz flashcard",jeu:"game gamification memory",points:"xp gamification",recompense:"badge achievement confetti",fete:"confetti celebration tada",bravo:"confetti success tada",erreur:"error shake",valide:"success check",copie:"copy",son:"audio",video:"video player",histoire:"scrollytelling story timeline branching",choix:"choice radio select branching",trier:"sort categorize sequencing",ordre:"sequencing order",relier:"matching connect",trou:"fill blank cloze",plan:"shot",camera:"pan tilt dolly zoom truck crane tracking handheld",cadre:"shot frame",cadrage:"shot rule thirds",montage:"cut montage",coupe:"cut",raccord:"cut match",fondu:"dissolve fade dip",ralenti:"slow motion speed ramp",accelere:"time-lapse",soustitre:"captions",sous:"captions",bandeau:"lower third banner",titre:"title card lower",voix:"voice-over",musique:"beat ducking",bruit:"whoosh riser",vertical:"aspect ratio reframing safe",format:"aspect ratio",flou:"blur focus depth bokeh",fige:"freeze frame",incruste:"chroma key picture overlay",fond:"background chroma gradient",tournage:"shot camera",filme:"shot camera",visage:"close-up talking head",};
function searchItems(q) {
  const toks = norm(q).split(/[^a-z0-9]+/).filter(t => t.length > 1 && !STOP.has(t));
  if (!toks.length) return [];
  const exp = toks.map(t => { const s = Object.keys(SYN).find(k => t.startsWith(k) || k.startsWith(t) && t.length > 3); return [t, ...(s ? SYN[s].split(" ") : [])]; });
  const res = [];
  for (const e of ALL) {
    if (!e._h) e._h = { n: norm(e.n), f: norm(e.f), a: norm(e.a), k: norm(e.k), d: norm(e.d + " " + e.u), s: norm(e.s + " " + e.g) };
    const H = e._h; let score = 0, hits = 0;
    for (const group of exp) {
      let best = 0;
      group.forEach((t, gi) => {
        const stem = t.length > 5 ? t.slice(0, t.length - 2) : t, w = gi ? .6 : 1;
        if (H.n.includes(t)) best = Math.max(best, 10 * w); else if (H.n.includes(stem)) best = Math.max(best, 7 * w);
        if (H.f.includes(stem)) best = Math.max(best, 7 * w);
        if (H.a.includes(stem)) best = Math.max(best, 6 * w);
        if (H.k.includes(stem)) best = Math.max(best, 5 * w);
        if (H.d.includes(stem)) best = Math.max(best, 2.5 * w);
        if (H.s.includes(stem)) best = Math.max(best, 1.5 * w);
      });
      if (best) { score += best; hits++; }
    }
    if (hits) res.push([e, score * (hits / exp.length) ** 1.5]);
  }
  return res.sort((a, b) => b[1] - a[1]).filter(r => r[1] >= 2).slice(0, 60).map(r => r[0]);
}

/* ---------- Démos ---------- */
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const live = new Set();
function mountDemo(stage, e) {
  stage.innerHTML = "";
  let play = null;
  if (e.kf) {
    stage.classList.add("kf");
    stage.innerHTML = SUBJ;
    const s = stage.firstElementChild; if (e.o) s.style.transformOrigin = e.o;
    let t;
    play = () => { clearTimeout(t); s.style.animation = "none"; void s.offsetWidth; s.style.animation = e.kf + " both";
      if (e.out) { const ms = parseFloat(e.kf.split(" ")[1]) * 1000; t = setTimeout(() => { s.style.animation = "fadeIn .3s both"; }, ms + 700); } };
    stage.addEventListener("click", play);
  } else {
    stage.innerHTML = typeof e.h === "function" ? e.h() : e.h;
    fitDemo(stage);
    if (e.init) play = e.init(stage) || null;
  }
  if (play) {
    const b = document.createElement("button");
    b.className = "replay"; b.setAttribute("aria-label", "Rejouer la démo"); b.title = "Rejouer";
    b.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5"/></svg>`;
    b.addEventListener("click", ev => { ev.stopPropagation(); play(); });
    stage.appendChild(b);
  }
  stage._play = play; stage._e = e;
  return play;
}
/* Réduit une maquette trop grande pour sa scène (zoom garde la mise en page et les clics cohérents) */
function fitDemo(stage) {
  const el = stage.firstElementChild; if (!el || getComputedStyle(el).position === "absolute") return;
  const H = stage.clientHeight - 14, W = stage.clientWidth - 14, h = el.offsetHeight, w = el.offsetWidth;
  const k = Math.min(1, H / h, W / w); if (k < .98 && h && w) el.style.zoom = k.toFixed(3);
}
const io = new IntersectionObserver(es => es.forEach(x => {
  const st = x.target;
  if (x.isIntersecting) {
    if (!st._mounted) { st._mounted = 1; const p = mountDemo(st, BY_ID[st.dataset.id]); if (p && !reduced) setTimeout(() => p(), 250 + Math.random() * 300); }
    live.add(st);
  } else live.delete(st);
}), { rootMargin: "120px 0px" });
let loopOn = store.get("loop", false), loopT;
function setLoop(v) {
  loopOn = v; store.set("loop", v); $("#loopBtn").setAttribute("aria-pressed", v);
  clearInterval(loopT);
  if (v) loopT = setInterval(() => live.forEach(st => { if (st._play && !st._e.noloop && st.isConnected) st._play(); }), 2800);
}

/* ---------- Rendu ---------- */
const IC = {
  heart: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.3 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.7 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21z"/></svg>`,
  copy: ICON.copy,
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const cardHTML = e => `<article class="card"><div class="stage" data-id="${e.id}"></div><div class="meta">
  <button class="name" data-open="${e.id}">${esc(e.n)}</button><span class="fr">${esc(e.f)}</span><span class="spec">${esc(e.s)}</span>
  <div class="acts"><button class="ib grow" data-copy="${e.id}" title="Copier le prompt">${IC.copy}<span>Prompt</span></button>
  <button class="ib fav" data-fav="${e.id}" aria-pressed="${favs.includes(e.id)}" aria-label="Ajouter au brief" title="Ajouter au brief">${IC.heart}</button>
  <button class="ib" data-open="${e.id}">Fiche</button></div></div></article>`;
let cur = SECTIONS[0], sub = "Tout";
const results = $(document, "#results");
function observe() { $$(results, ".stage").forEach(s => io.observe(s)); }
function renderTabs() {
  $("#tabs").innerHTML = SECTIONS.map(S => `<button class="tab" role="tab" data-sec="${S.id}" aria-selected="${S === cur && !query}">${S.label}<small>${S.data.length}</small></button>`).join("");
}
let query = "";
function render() {
  live.clear(); renderTabs();
  const intro = $("#intro");
  if (query) {
    const r = searchItems(query);
    $("#secTitle").textContent = r.length ? `${r.length} résultat${r.length > 1 ? "s" : ""} pour « ${query} »` : `Rien trouvé pour « ${query} »`;
    $("#secDesc").textContent = r.length ? "Les noms les plus proches de ta description, toutes sections confondues." : "";
    $("#chips").innerHTML = "";
    if (!r.length) { results.innerHTML = `<p class="empty">Essaie de décrire ce que tu vois avec d'autres mots : <b>« ça tourne »</b>, <b>« ça apparaît en fondu »</b>, <b>« la carte se retourne »</b>, <b>« menu qui sort du côté »</b>.</p>`; return; }
    const groups = SECTIONS.map(S => [S, r.filter(e => e.sec === S)]).filter(g => g[1].length);
    results.innerHTML = groups.map(([S, items]) => `<section class="group"><h2 class="group-h">${S.title}<small>${items.length}</small></h2><div class="grid">${items.map(cardHTML).join("")}</div></section>`).join("");
  } else {
    $("#secTitle").textContent = cur.title; $("#secDesc").textContent = cur.desc + ` ${cur.data.length} entrées.`;
    const gs = [...new Set(cur.data.map(e => e.g))];
    $("#chips").innerHTML = ["Tout", ...gs].map(g => `<button class="chip" data-sub="${esc(g)}" aria-pressed="${g === sub}">${esc(g)}<small>${g === "Tout" ? cur.data.length : cur.data.filter(e => e.g === g).length}</small></button>`).join("");
    const show = sub === "Tout" ? gs : [sub];
    results.innerHTML = show.map(g => { const items = cur.data.filter(e => e.g === g); return `<section class="group"><h2 class="group-h">${esc(g)}<small>${items.length}</small></h2><div class="grid">${items.map(cardHTML).join("")}</div></section>`; }).join("");
  }
  observe();
}

/* ---------- Panneau latéral ---------- */
const panel = $("#panel"), scrim = $("#scrim");
let lastFocus = null;
function openPanel(html) {
  lastFocus = document.activeElement; panel.innerHTML = `<div class="p-in">${html}</div>`;
  panel.hidden = false; scrim.hidden = false; document.body.style.overflow = "hidden";
  const x = $(panel, ".x"); x && x.focus();
}
function closePanel() { panel.hidden = true; scrim.hidden = true; panel.innerHTML = ""; document.body.style.overflow = ""; lastFocus && lastFocus.focus && lastFocus.focus(); }
const X_BTN = `<button class="x" data-close aria-label="Fermer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`;
function openDetail(id) {
  const e = BY_ID[id]; if (!e) return;
  const tags = (s, cls = "") => s.split(",").map(x => x.trim()).filter(Boolean).map(x => `<span class="tag ${cls}">${esc(x)}</span>`).join("");
  openPanel(`<div class="p-head"><div><div class="crumb">${esc(e.sec.label)} · ${esc(e.g)}</div><h2>${esc(e.n)}</h2><div class="fr">${esc(e.f)}</div></div>${X_BTN}</div>
  <div class="stage big" id="bigStage"></div>
  <div class="p-sec"><h3>Ce que c'est</h3><p>${esc(e.d)}</p></div>
  <div class="two"><div class="ok"><h3>Quand l'utiliser</h3><p>${esc(e.u)}</p></div>${e.x ? `<div class="no"><h3>À éviter</h3><p>${esc(e.x)}</p></div>` : `<div><h3>Réglage type</h3><p>${esc(e.s)}</p></div>`}</div>
  <div class="p-sec"><h3>Aussi appelé</h3><div class="tags">${tags(e.a)}</div></div>
  <div class="p-sec"><h3>Outils et librairies</h3><div class="tags">${tags(e.t.split(" ").map(t => TOOLS[t] || t).join(","), "tool")}</div></div>
  <div class="p-sec"><h3>Prompt prêt à copier</h3><textarea class="prompt" id="pTxt" aria-label="Prompt modifiable">${esc(promptOf(e))}</textarea>
  <p class="hint">Remplace les <code>[crochets]</code> par ton cas. Tes modifications sont gardées pour cette fiche.</p>
  <div class="row"><button class="btn primary" id="pCopy">${ICON.copy} Copier le prompt</button><button class="btn" id="pFav">${IC.heart} ${favs.includes(id) ? "Retirer du brief" : "Ajouter au brief"}</button>${edits[id] ? `<button class="btn" id="pReset">Revenir au prompt d'origine</button>` : ""}</div></div>`);
  const big = $("#bigStage"); big.dataset.id = id; const p = mountDemo(big, e); if (p && !reduced) setTimeout(p, 200);
  const ta = $("#pTxt");
  ta.addEventListener("input", () => { edits[id] = ta.value; store.set("edits", edits); });
  $("#pCopy").addEventListener("click", () => copy(ta.value, ta));
  $("#pFav").addEventListener("click", () => { toggleFav(id); openDetail(id); });
  const r = $("#pReset"); r && r.addEventListener("click", () => { delete edits[id]; store.set("edits", edits); openDetail(id); });
}
function briefText() {
  const ctx = store.get("ctx", "").trim(), cons = store.get("cons", true);
  const items = favs.map(id => BY_ID[id]).filter(Boolean);
  const bySec = SECTIONS.map(S => [S, items.filter(e => e.sec === S)]).filter(g => g[1].length);
  let t = `Contexte : ${ctx || "[décris ton projet : vidéo, module d'apprentissage, page web, public visé…]"}\n\n`;
  bySec.forEach(([S, list]) => { t += `${S.title} :\n` + list.map(e => `- ${promptOf(e)}`).join("\n") + "\n\n"; });
  if (cons) t += "Contraintes : animations sobres (150–400 ms, ease-out pour les entrées), respecte prefers-reduced-motion, tout doit rester utilisable au clavier et lisible (contraste WCAG AA).";
  return t.trim();
}
function openBrief() {
  const items = favs.map(id => BY_ID[id]).filter(Boolean);
  openPanel(`<div class="p-head"><div><div class="crumb">Panier de prompt</div><h2>Mon brief</h2><div class="fr">${items.length} élément${items.length > 1 ? "s" : ""} choisi${items.length > 1 ? "s" : ""}</div></div>${X_BTN}</div>
  ${items.length ? `<div class="p-sec"><h3>Ton projet</h3><textarea class="prompt" id="bCtx" style="min-height:70px" placeholder="Ex. : vidéo de 3 min pour des élèves de 5e sur les volcans, ton dynamique, format vertical.">${esc(store.get("ctx", ""))}</textarea></div>
  <div class="p-sec"><h3>Éléments</h3><ul class="brief-list">${items.map(e => `<li><span><b>${esc(e.n)}</b> · ${esc(e.f)}<span class="hint">${esc(promptOf(e))}</span></span><button class="x" data-unfav="${e.id}" aria-label="Retirer ${esc(e.n)}" style="width:32px;height:32px">×</button></li>`).join("")}</ul></div>
  <label class="check"><input type="checkbox" id="bCons" ${store.get("cons", true) ? "checked" : ""}> Ajouter les contraintes de qualité (durées, accessibilité)</label>
  <div class="p-sec"><h3>Brief complet</h3><textarea class="prompt" id="bOut" style="min-height:220px" readonly aria-label="Brief à copier"></textarea></div>
  <div class="row"><button class="btn primary" id="bCopy">${ICON.copy} Copier le brief</button><button class="btn" id="bClear">Vider le brief</button></div>`
  : `<p class="empty">Ton brief est vide. Clique sur le <b>cœur</b> d'une fiche pour l'ajouter : tu pourras ensuite copier un seul prompt qui combine tout (contexte de ton projet + chaque élément).</p>`}`);
  const out = $("#bOut"); if (!out) return;
  const up = () => out.value = briefText(); up();
  $("#bCtx").addEventListener("input", ev => { store.set("ctx", ev.target.value); up(); });
  $("#bCons").addEventListener("change", ev => { store.set("cons", ev.target.checked); up(); });
  $("#bCopy").addEventListener("click", () => copy(out.value, out));
  const clr = $("#bClear");
  clr.addEventListener("click", () => { if (clr.dataset.sure) { favs = []; store.set("fav", favs); syncFavs(); openBrief(); } else { clr.dataset.sure = 1; clr.textContent = "Confirmer : tout retirer"; } });
}

/* ---------- Favoris, copie, toast ---------- */
function syncFavs() {
  $$(document, "[data-fav]").forEach(b => b.setAttribute("aria-pressed", favs.includes(b.dataset.fav)));
  const c = $("#briefCount"); c.textContent = favs.length; c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
}
function toggleFav(id) {
  favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]; store.set("fav", favs); syncFavs();
  toast(favs.includes(id) ? `« ${BY_ID[id].n} » ajouté au brief` : "Retiré du brief");
}
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2000); }
function copy(text, el) {
  const fallback = () => { if (el && el.select) { el.focus(); el.select(); } try { document.execCommand("copy"); toast("Copié"); } catch { toast("Sélectionné : fais Ctrl+C pour copier"); } };
  try { navigator.clipboard.writeText(text).then(() => toast("Prompt copié"), fallback); } catch { fallback(); }
}

/* ---------- Événements ---------- */
document.addEventListener("click", ev => {
  const t = ev.target.closest("[data-sec],[data-sub],[data-open],[data-copy],[data-fav],[data-close],[data-unfav]"); if (!t) return;
  if (t.dataset.sec) { cur = SECTIONS.find(S => S.id === t.dataset.sec); sub = "Tout"; query = ""; $("#q").value = ""; history.replaceState(null, "", "#" + cur.id); render(); scrollTo({ top: 0 }); }
  else if (t.dataset.sub) { sub = t.dataset.sub; render(); }
  else if (t.dataset.open) openDetail(t.dataset.open);
  else if (t.dataset.copy) { const e = BY_ID[t.dataset.copy]; copy(promptOf(e)); }
  else if (t.dataset.fav) toggleFav(t.dataset.fav);
  else if (t.dataset.unfav) { toggleFav(t.dataset.unfav); openBrief(); }
  else if ("close" in t.dataset) closePanel();
});
scrim.addEventListener("click", closePanel);
document.addEventListener("keydown", ev => {
  if (ev.key === "Escape" && !panel.hidden) closePanel();
  if (ev.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") { ev.preventDefault(); $("#q").focus(); }
});
let qT;
$("#q").addEventListener("input", ev => { clearTimeout(qT); qT = setTimeout(() => { query = ev.target.value.trim(); render(); }, 180); });
$("#loopBtn").addEventListener("click", () => setLoop(!loopOn));
$("#briefBtn").addEventListener("click", openBrief);

/* ---------- Démarrage ---------- */
const h = location.hash.slice(1); cur = SECTIONS.find(S => S.id === h) || SECTIONS[0];
$("#briefCount").textContent = favs.length;
$("#total").textContent = ALL.length;
setLoop(loopOn); render();
