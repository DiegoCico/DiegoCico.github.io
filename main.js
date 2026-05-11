/* ─────────────── TWEAKS STATE ─────────────── */
const TWEAK_DEFAULTS = {
  timeOfDay: 'dusk',
  trailColor: '#ff6b6b',
  snow: 'light',
  speed: 'slow',
};

let state = { ...TWEAK_DEFAULTS };

const PALETTES = {
  dawn: {
    '--sky-top': '#1a1f4a',
    '--sky-mid': '#5a4f7a',
    '--sky-warm': '#d4906e',
    '--sky-horizon': '#f4c896',
    '--horizon-glow': '#fce0b0',
    '--lake-deep': '#1a2548',
    '--lake-mid': '#3a4068',
    '--lake-glow': '#8090b0',
    '--mtn-far': '#7868a0',
    '--mtn-mid': '#3a3460',
    '--mtn-front': '#15182e',
  },
  dusk: {
    '--sky-top': '#0a0e2a',
    '--sky-mid': '#2a2752',
    '--sky-warm': '#8a5067',
    '--sky-horizon': '#e8a878',
    '--horizon-glow': '#f4cc94',
    '--lake-deep': '#0b1530',
    '--lake-mid': '#1f2c54',
    '--lake-glow': '#5d6a8c',
    '--mtn-far': '#5e5a7e',
    '--mtn-mid': '#2a2a4e',
    '--mtn-front': '#0a0d22',
  },
  night: {
    '--sky-top': '#03050f',
    '--sky-mid': '#0c1132',
    '--sky-warm': '#1a2050',
    '--sky-horizon': '#2a3270',
    '--horizon-glow': '#a8b8e0',
    '--lake-deep': '#020410',
    '--lake-mid': '#0a1028',
    '--lake-glow': '#2e3a60',
    '--mtn-far': '#22264a',
    '--mtn-mid': '#10122a',
    '--mtn-front': '#04050e',
  },
};

function applyTweaks() {
  const p = PALETTES[state.timeOfDay] || PALETTES.dusk;
  for (const k in p) document.documentElement.style.setProperty(k, p[k]);
  document.documentElement.style.setProperty('--trail', state.trailColor);
  document.getElementById('stars').style.opacity =
    state.timeOfDay === 'night' ? 1 : state.timeOfDay === 'dawn' ? 0.3 : 0.6;
  buildSnow(state.snow);
  document.querySelectorAll('.seg').forEach(seg => {
    const k = seg.dataset.key;
    seg.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.val === state[k]));
  });
  document.querySelectorAll('.swatches').forEach(sw => {
    const k = sw.dataset.key;
    sw.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.val === state[k]));
  });
}

function setTweak(key, val) {
  state[key] = val;
  applyTweaks();
}

document.querySelectorAll('.seg button, .swatches button').forEach(btn => {
  btn.addEventListener('click', () => setTweak(btn.parentElement.dataset.key, btn.dataset.val));
});

document.getElementById('tweakClose').addEventListener('click', () => {
  document.getElementById('tweaks').classList.remove('is-open');
});

/* ─────────────── STARS ─────────────── */
(function buildStars() {
  const stars = document.getElementById('stars');
  let s = '';
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 1920;
    const y = Math.random() * 500;
    const r = (Math.random() * 1.2 + 0.3).toFixed(2);
    const o = (Math.random() * 0.6 + 0.3).toFixed(2);
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r}" fill="#fff" opacity="${o}"/>`;
  }
  stars.innerHTML = s;
})();

/* ─────────────── SNOW PARTICLES ─────────────── */
function buildSnow(level) {
  const layer = document.getElementById('snowLayer');
  layer.innerHTML = '';
  if (level === 'off') return;
  const count = level === 'heavy' ? 80 : 35;
  for (let i = 0; i < count; i++) {
    const f = document.createElement('div');
    f.className = 'flake';
    const size = Math.random() * 3 + 1.2;
    f.style.width = f.style.height = size + 'px';
    f.style.left = (Math.random() * 100) + '%';
    f.style.opacity = (Math.random() * 0.6 + 0.3).toFixed(2);
    f.style.animationDuration = (Math.random() * 12 + 8) + 's';
    f.style.animationDelay = (-Math.random() * 20) + 's';
    layer.appendChild(f);
  }
}

/* ─────────────── SCROLL / SNOWBOARDER ─────────────── */
const sceneWrap = document.getElementById('sceneWrap');
const boardPath = document.getElementById('boardPath');
const trailPath = document.getElementById('trailPath');
const boarder   = document.getElementById('boarder');
const heroText  = document.getElementById('heroText');
const chapters  = [...document.querySelectorAll('.chapter')];
const leftMtn   = document.getElementById('leftMtn');
const rightMtn  = document.getElementById('rightMtn');
const midLayer  = document.getElementById('midLayer');
const farLayer  = document.getElementById('farLayer');

const pathLength = boardPath.getTotalLength();
trailPath.style.strokeDasharray  = pathLength;
trailPath.style.strokeDashoffset = pathLength;

function getSceneProgress() {
  const rect  = sceneWrap.getBoundingClientRect();
  const total = sceneWrap.offsetHeight - window.innerHeight;
  return total > 0 ? Math.min(Math.max(-rect.top, 0), total) / total : 0;
}

function speedCurve(t) {
  if (state.speed === 'slow') return Math.pow(t, 1.4);
  if (state.speed === 'fast') return 1 - Math.pow(1 - t, 1.6);
  return t;
}

let lastProgress = -1;
function onScroll() {
  const raw = getSceneProgress();
  if (Math.abs(raw - lastProgress) < 0.0005) return;
  lastProgress = raw;

  const t  = speedCurve(Math.min(raw / 0.92, 1));
  const pt = boardPath.getPointAtLength(t * pathLength);
  const ahead = boardPath.getPointAtLength(Math.min((t + 0.005) * pathLength, pathLength));
  const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180 / Math.PI;
  boarder.setAttribute('transform', `translate(${pt.x}, ${pt.y}) rotate(${Math.max(-25, Math.min(55, angle))})`);

  trailPath.style.strokeDashoffset = pathLength * (1 - t);

  heroText.style.opacity   = Math.max(0, 1 - raw / 0.13);
  heroText.style.transform = `translateY(${-raw * 80}px)`;

  chapters.forEach(ch => {
    const visible = raw >= parseFloat(ch.dataset.start) && raw <= parseFloat(ch.dataset.end) + 0.04;
    ch.classList.toggle('is-visible', visible);
  });

  farLayer.setAttribute('transform', `translate(0, ${raw * 30})`);
  midLayer.setAttribute('transform', `translate(0, ${raw * 18})`);
  leftMtn.setAttribute('transform',  `translate(${-raw * 12}, ${raw * 6})`);
  rightMtn.setAttribute('transform', `translate(${raw * 12}, ${raw * 6})`);
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    ticking = true;
  }
}, { passive: true });

/* ─────────────── EXPERIENCE EXPAND ─────────────── */
const tlToggle = document.getElementById('tlToggle');
const tlEl     = document.getElementById('timeline');
tlToggle.addEventListener('click', () => {
  const expanded = tlEl.classList.toggle('is-expanded');
  tlToggle.setAttribute('aria-expanded', expanded);
  tlToggle.querySelector('.tl-toggle-label').textContent = expanded ? 'Show less' : 'View 7 more';
});

/* ─────────────── PROJECT FILTER + PAGINATION ─────────────── */
const filterBar    = document.getElementById('filterBar');
const projectCards = [...document.querySelectorAll('#projectsGrid .project')];
const projectCount = document.getElementById('projectCount');
const pagerPrev    = document.getElementById('pagerPrev');
const pagerNext    = document.getElementById('pagerNext');
const pagerStatus  = document.getElementById('pagerStatus');

let currentFilter = 'all';
let currentPage   = 0;
const pageSize = () => window.innerWidth <= 900 ? 2 : 4;

function renderProjects() {
  const matches = projectCards.filter(c => {
    const langs = (c.dataset.lang || '').split(',');
    return currentFilter === 'all' || langs.includes(currentFilter);
  });

  projectCards.forEach(c => c.classList.toggle('is-out', !matches.includes(c)));

  const sz         = pageSize();
  const totalPages = Math.max(1, Math.ceil(matches.length / sz));
  currentPage      = Math.min(Math.max(currentPage, 0), totalPages - 1);

  const start = currentPage * sz;
  matches.forEach((c, i) => c.classList.toggle('is-paged-out', i < start || i >= start + sz));

  projectCount.textContent = `— ${String(matches.length).padStart(2,'0')} ${matches.length === 1 ? 'project' : 'projects'}`;
  pagerStatus.textContent  = `${String(currentPage + 1).padStart(2,'0')} / ${String(totalPages).padStart(2,'0')}`;
  pagerPrev.disabled = currentPage === 0;
  pagerNext.disabled = currentPage >= totalPages - 1;
}

filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
  currentFilter = btn.dataset.filter;
  currentPage   = 0;
  renderProjects();
});
pagerPrev.addEventListener('click', () => { currentPage--; renderProjects(); });
pagerNext.addEventListener('click', () => { currentPage++; renderProjects(); });
window.addEventListener('resize', renderProjects);

/* ─────────────── INIT ─────────────── */
applyTweaks();
renderProjects();
onScroll();
