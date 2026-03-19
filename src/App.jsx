import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Archive,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Bath,
  Bell,
  BellRing,
  Boxes,
  Building,
  Calendar,
  CalendarDays,
  CheckCircle2,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Crown,
  Database,
  DoorOpen,
  Download,
  Euro,
  Eye,
  EyeOff,
  Factory,
  FileBarChart2,
  FileText,
  Flame,
  HardHat,
  Hammer,
  Landmark,
  Layers3,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  Moon,
  Package,
  PackageCheck,
  Palette,
  Phone,
  Plus,
  Receipt,
  ReceiptText,
  RefreshCcw,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  SquareStack,
  Store,
  SunMedium,
  Trash2,
  Truck,
  Upload,
  UserCog,
  Users,
  Wallet,
  Wrench,
  X,
} from 'lucide-react';

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; height: 100%; min-height: 100%; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
  body { overflow: hidden; }
  button, input, select, textarea { font: inherit; }
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb { background: rgba(249,115,22,.28); border-radius: 999px; }
  ::-webkit-scrollbar-track { background: transparent; }
  .app-shell { display: flex; min-height: 100dvh; height: 100dvh; width: 100vw; overflow: hidden; }
  .app-sidebar { width: 276px; flex: 0 0 276px; display: flex; flex-direction: column; position: sticky; top: 0; z-index: 40; height: 100dvh; min-height: 0; }
  .main-panel { flex: 1 1 auto; min-width: 0; min-height: 0; height: 100dvh; display: flex; flex-direction: column; }
  .page-wrap { flex: 1 1 auto; min-height: 0; min-width: 0; width: 100%; overflow-y: auto; overflow-x: hidden; padding: 24px 24px 22px; display: flex; flex-direction: column; gap: 20px; }
  .grid-2 { display: grid; grid-template-columns: 1.45fr .95fr; gap: 18px; min-width: 0; }
  .grid-2-even { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; min-width: 0; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; min-width: 0; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; min-width: 0; }
  .grid-5 { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px; min-width: 0; }
  .stack { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  .kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .kanban-grid { display: grid; grid-template-columns: repeat(4, minmax(260px, 1fr)); gap: 16px; overflow-x: auto; align-items: start; }
  .responsive-table { min-width: 0; }
  .search-pop { position: absolute; top: calc(100% + 10px); left: 0; width: min(560px, calc(100vw - 32px)); max-height: 420px; overflow: auto; z-index: 60; }
  .fade-up { animation: fadeUp .24s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 1220px) {
    .grid-2, .grid-2-even { grid-template-columns: 1fr; }
    .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 980px) {
    .app-sidebar { position: fixed; inset: 0 auto 0 0; transform: translateX(-100%); transition: transform .26s ease; width: 292px; max-width: calc(100vw - 28px); }
    .app-sidebar.open { transform: translateX(0); }
    .page-wrap { padding: 18px 16px 18px; }
    .kpi-grid, .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 760px) {
    .kpi-grid, .grid-3, .grid-4, .grid-5 { grid-template-columns: 1fr; }
    .page-wrap { padding: 14px; gap: 14px; }
  }
`;

function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

const COLORS = {
  orange: '#f97316',
  orangeDark: '#ea580c',
  orangeSoft: '#fff7ed',
  orangeBorder: '#fdba74',
  green: '#16a34a',
  greenSoft: '#ecfdf3',
  red: '#ef4444',
  redSoft: '#fef2f2',
  sky: '#0ea5e9',
  black: '#0f172a',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate700: '#334155',
  slate900: '#0f172a',
};

function tk(theme = 'light') {
  const d = theme === 'dark';
  return {
    bg: d ? '#0b0d14' : '#f5f7fb',
    shell: d ? '#0b0d14' : '#f8fafc',
    card: d ? '#101521' : '#ffffff',
    alt: d ? '#151b2a' : '#f8fafc',
    sidebar: d ? '#0d111a' : '#ffffff',
    topbar: d ? 'rgba(11,13,20,.92)' : 'rgba(255,255,255,.92)',
    border: d ? '#1d2636' : '#e2e8f0',
    borderSoft: d ? '#182132' : '#e8eef6',
    text: d ? '#f8fafc' : '#0f172a',
    muted: d ? '#94a3b8' : '#64748b',
    faint: d ? '#7b8799' : '#94a3b8',
    hover: d ? '#161d2b' : '#f8fafc',
    activeNav: d ? '#171f30' : '#fff7ed',
    activeText: d ? '#ffffff' : COLORS.orangeDark,
    activeBorder: d ? '#374151' : '#fed7aa',
    accent: d ? '#fb923c' : '#f97316',
    dangerBg: d ? 'rgba(239,68,68,.1)' : COLORS.redSoft,
    successBg: d ? 'rgba(22,163,74,.1)' : COLORS.greenSoft,
    font: `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
  };
}

const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.14 } },
};

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function fmtMoney(v) {
  const n = Number(v || 0);
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function toISODate(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10);
}

function formatDate(date) {
  if (!date) return '—';
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
}

function monthLabel(date) {
  return new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' }).format(date);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function printHtml(title, html) {
  const win = window.open('', '_blank', 'width=1024,height=768');
  if (!win) return;
  win.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body{font-family: 'DM Sans', Arial, sans-serif; padding: 32px; color:#0f172a;}
          h1,h2,h3{margin:0 0 12px;}
          .meta{color:#64748b; margin-bottom:18px;}
          table{width:100%; border-collapse: collapse; margin-top:20px;}
          th,td{border:1px solid #e2e8f0; padding:10px; text-align:left; font-size:14px;}
          th{background:#fff7ed; color:#ea580c;}
          .total{margin-top:18px; text-align:right; font-size:18px; font-weight:700;}
          .badge{display:inline-block; padding:4px 10px; border-radius:999px; background:#fff7ed; color:#ea580c; font-size:12px; font-weight:700;}
        </style>
      </head>
      <body>${html}</body>
    </html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 250);
}

function exportCsv(filename, rows) {
  if (!rows?.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')].concat(
    rows.map((row) => headers.map((h) => {
      const raw = row[h] == null ? '' : String(row[h]);
      return `"${raw.replace(/"/g, '""')}"`;
    }).join(','))
  );
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function sumBy(arr, key) {
  return arr.reduce((acc, item) => acc + Number(item[key] || 0), 0);
}

function useStoredState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;
      const parsed = JSON.parse(raw);
      return { ...initial, ...parsed };
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const CLIENTS = [
  {
    id: 'edilcasa',
    name: 'EdilCasa S.r.l.',
    contact: 'Marco Rossi',
    email: 'admin@edilcasa.it',
    city: 'Milano',
    plan: 'Enterprise',
    status: 'Attivo',
    since: 'Gen 2025',
    modules: {
      dashboard: true, reporting: true, cashflow: true, crm: true, sopralluoghi: true,
      preventivi: true, showroom: true, cantieri: true, attivita: true, squadre: true,
      documenti: true, calendario: true, infissi: true, pavimenti: true, bagni: true,
      magazzino: true, shopify: true, ordini: true, fatture: true, pagamenti: true, compliance: true,
    },
  },
  {
    id: 'geoco',
    name: 'Geo.co S.r.l.',
    contact: 'Laura Ferretti',
    email: 'info@geo.co',
    city: 'Bergamo',
    plan: 'Professional',
    status: 'Attivo',
    since: 'Mar 2026',
    modules: {
      dashboard: true, reporting: true, cashflow: true, crm: true, sopralluoghi: true,
      preventivi: true, showroom: false, cantieri: true, attivita: true, squadre: true,
      documenti: true, calendario: true, infissi: false, pavimenti: true, bagni: false,
      magazzino: true, shopify: false, ordini: true, fatture: true, pagamenti: true, compliance: true,
    },
  },
];

const USERS = [
  { email: 'admin@prismaos.it', pw: 'admin2026', role: 'admin', client: null, name: 'PRISMA Admin' },
  { email: 'admin@edilcasa.it', pw: 'edilcasa', role: 'client', client: 'edilcasa', name: 'Marco Rossi' },
  { email: 'info@geo.co', pw: 'geoco', role: 'client', client: 'geoco', name: 'Laura Ferretti' },
];

const QUOTE_TEMPLATES = {
  bagno: {
    label: 'Ristrutturazione bagno',
    title: 'Preventivo bagno completo',
    items: [
      { id: uid('li'), description: 'Demolizioni e smaltimento', qty: 1, price: 850 },
      { id: uid('li'), description: 'Impianto idrico e scarichi', qty: 1, price: 1450 },
      { id: uid('li'), description: 'Posa rivestimenti', qty: 18, price: 48 },
      { id: uid('li'), description: 'Sanitari e rubinetteria', qty: 1, price: 1850 },
    ],
  },
  infissi: {
    label: 'Fornitura infissi',
    title: 'Preventivo infissi PVC',
    items: [
      { id: uid('li'), description: 'Rilievo misure', qty: 1, price: 220 },
      { id: uid('li'), description: 'Infissi PVC premium', qty: 5, price: 1240 },
      { id: uid('li'), description: 'Posa certificata', qty: 5, price: 180 },
      { id: uid('li'), description: 'Smaltimento vecchi serramenti', qty: 5, price: 55 },
    ],
  },
  general: {
    label: 'Ristrutturazione completa',
    title: 'Preventivo ristrutturazione completa',
    items: [
      { id: uid('li'), description: 'Allestimento cantiere', qty: 1, price: 2200 },
      { id: uid('li'), description: 'Demolizioni', qty: 1, price: 4200 },
      { id: uid('li'), description: 'Impianti', qty: 1, price: 9600 },
      { id: uid('li'), description: 'Finiture e posa', qty: 1, price: 12400 },
    ],
  },
};

const PAGE_META = {
  dashboard: { title: 'Dashboard direzionale', subtitle: 'Controllo sintetico aziendale', ey: 'Executive' },
  reporting: { title: 'Reporting', subtitle: 'Ricavi, margini e prestazioni', ey: 'Executive' },
  cashflow: { title: 'Cash Flow', subtitle: 'Entrate, uscite e previsione di cassa', ey: 'Executive' },
  crm: { title: 'CRM & Lead', subtitle: 'Lead, contatti e opportunità', ey: 'Commerciale' },
  sopralluoghi: { title: 'Sopralluoghi', subtitle: 'Agenda tecnici, note e allegati', ey: 'Commerciale' },
  preventivi: { title: 'Preventivi', subtitle: 'Offerte, template e PDF', ey: 'Commerciale' },
  showroom: { title: 'Showroom', subtitle: 'Selezioni prodotto e ambienti', ey: 'Commerciale' },
  cantieri: { title: 'Cantieri', subtitle: 'Commesse, budget e avanzamento', ey: 'Operativo' },
  attivita: { title: 'Task & SAL', subtitle: 'Workflow operativo stile board', ey: 'Operativo' },
  squadre: { title: 'Squadre', subtitle: 'Risorse, ore e assegnazioni', ey: 'Operativo' },
  documenti: { title: 'Documenti', subtitle: 'Archivio tecnico e amministrativo', ey: 'Operativo' },
  calendario: { title: 'Calendario', subtitle: 'Pianificazione interattiva', ey: 'Operativo' },
  infissi: { title: 'Infissi', subtitle: 'Prodotti e dati Shopify', ey: 'Prodotti' },
  pavimenti: { title: 'Pavimentazioni', subtitle: 'Catalogo, stock e vendita', ey: 'Prodotti' },
  bagni: { title: 'Bagni', subtitle: 'Articoli, showroom e vendita', ey: 'Prodotti' },
  magazzino: { title: 'Magazzino', subtitle: 'Scorte e prodotti allocati', ey: 'Prodotti' },
  shopify: { title: 'Shopify', subtitle: 'Export catalogo e impostazioni', ey: 'Prodotti' },
  ordini: { title: 'Ordini Fornitori', subtitle: 'Richieste acquisto e consegne', ey: 'Finance' },
  fatture: { title: 'Fatture', subtitle: 'Emissione, PDF e stato', ey: 'Finance' },
  pagamenti: { title: 'Pagamenti', subtitle: 'Scadenze e priorità', ey: 'Finance' },
  compliance: { title: 'Compliance', subtitle: 'DURC, sicurezza e rinnovi', ey: 'Finance' },
};

const NAV = [
  { label: 'Executive', items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'reporting', label: 'Reporting', icon: FileBarChart2 }, { id: 'cashflow', label: 'Cash Flow', icon: Wallet }] },
  { label: 'Commerciale', items: [{ id: 'crm', label: 'CRM & Lead', icon: Users }, { id: 'sopralluoghi', label: 'Sopralluoghi', icon: CalendarDays }, { id: 'preventivi', label: 'Preventivi', icon: FileText }, { id: 'showroom', label: 'Showroom', icon: Sparkles }] },
  { label: 'Operativo', items: [{ id: 'cantieri', label: 'Cantieri', icon: HardHat }, { id: 'attivita', label: 'Task & SAL', icon: CheckSquare }, { id: 'squadre', label: 'Squadre', icon: UserCog }, { id: 'documenti', label: 'Documenti', icon: Archive }, { id: 'calendario', label: 'Calendario', icon: Calendar }] },
  { label: 'Prodotti', items: [{ id: 'infissi', label: 'Infissi', icon: DoorOpen }, { id: 'pavimenti', label: 'Pavimentazioni', icon: SquareStack }, { id: 'bagni', label: 'Bagni', icon: Bath }, { id: 'magazzino', label: 'Magazzino', icon: Boxes }, { id: 'shopify', label: 'Shopify', icon: Store }] },
  { label: 'Finance', items: [{ id: 'ordini', label: 'Ordini Fornitori', icon: ShoppingCart }, { id: 'fatture', label: 'Fatture', icon: Receipt }, { id: 'pagamenti', label: 'Pagamenti', icon: CreditCard }, { id: 'compliance', label: 'Compliance', icon: ShieldCheck }] },
];

function seedDb() {
  return {
    leads: [
      { id: uid('lead'), name: 'Fam. De Luca', company: '', email: 'deluca@email.it', phone: '333 1234567', source: 'Meta Ads', status: 'Caldo', value: 96000, owner: 'Sara Leone', notes: 'Richiesta ristrutturazione completa appartamento.', createdAt: '2026-03-12', attachments: [] },
      { id: uid('lead'), name: 'Studio Bianchi', company: 'Studio Bianchi', email: 'hello@studiobianchi.it', phone: '02 445566', source: 'Referral', status: 'Preventivo', value: 42300, owner: 'Marco Rossi', notes: 'Infissi ufficio con triplo vetro.', createdAt: '2026-03-08', attachments: [] },
      { id: uid('lead'), name: 'Condominio Iris', company: 'Condominio Iris', email: 'amministratore@iris.it', phone: '02 556677', source: 'Sito Web', status: 'Sopralluogo', value: 210000, owner: 'Luca Rinaldi', notes: 'Facciata + balconi.', createdAt: '2026-03-14', attachments: [] },
    ],
    visits: [
      { id: uid('visit'), title: 'Sopralluogo bagno master', leadId: '', client: 'Fam. De Luca', site: 'Bergamo', date: '2026-03-20', status: 'Confermato', owner: 'Andrea Villa', notes: 'Verificare scarichi esistenti e quote massetto.', attachments: [] },
      { id: uid('visit'), title: 'Rilievo infissi ufficio', leadId: '', client: 'Studio Bianchi', site: 'Como', date: '2026-03-22', status: 'Da eseguire', owner: 'Sara Leone', notes: 'Servono misure precise e foto prospetti.', attachments: [] },
    ],
    quotes: [
      { id: uid('quote'), template: 'bagno', title: 'Preventivo bagno completo', client: 'Giulia Conti', status: 'Inviato', validUntil: '2026-04-15', notes: 'Comprensivo di posa e smaltimento.', items: QUOTE_TEMPLATES.bagno.items.map((x) => ({ ...x, id: uid('li') })), createdAt: '2026-03-10' },
      { id: uid('quote'), template: 'infissi', title: 'Preventivo infissi PVC', client: 'Studio Bianchi', status: 'Bozza', validUntil: '2026-04-18', notes: 'Fornitura con posa certificata.', items: QUOTE_TEMPLATES.infissi.items.map((x) => ({ ...x, id: uid('li') })), createdAt: '2026-03-12' },
    ],
    showroom: [
      { id: uid('show'), client: 'Fam. De Luca', environment: 'Bagno master', selection: 'Mobile lavabo noce + gres soft beige', amount: 2640, status: 'In revisione', notes: 'Valutare variante top in quarzo.' },
    ],
    projects: [
      { id: uid('proj'), name: 'Villa Moretti', client: 'Fam. Moretti', status: 'In esecuzione', budget: 148000, responsabile: 'Luca Rinaldi', progress: 72, address: 'Monza', startDate: '2026-01-12', endDate: '2026-05-30', notes: 'In attesa conferma sanitari master bathroom.' },
      { id: uid('proj'), name: 'Condominio Aurora', client: 'Aurora Gestioni', status: 'In esecuzione', budget: 286000, responsabile: 'Marco Sala', progress: 41, address: 'Milano', startDate: '2026-02-01', endDate: '2026-08-31', notes: 'Rinnovo occupazione suolo da chiudere.' },
      { id: uid('proj'), name: 'Città Studi', client: 'Giulia Conti', status: 'Quasi completato', budget: 39500, responsabile: 'Sara Leone', progress: 88, address: 'Milano', startDate: '2026-02-15', endDate: '2026-03-29', notes: 'Collaudo finale previsto la prossima settimana.' },
    ],
    tasks: [
      { id: uid('task'), title: 'Valida SAL Villa Moretti', projectId: '', project: 'Villa Moretti', stage: 'review', priority: 'Alta', assignee: 'Luca Rinaldi', dueDate: '2026-03-21', description: 'Verifica quantità e avanzamento impianti idrici.', comments: ['Verificare foto cantiere piano primo.'] },
      { id: uid('task'), title: 'Ordine sanitari master', projectId: '', project: 'Villa Moretti', stage: 'todo', priority: 'Media', assignee: 'Ufficio Acquisti', dueDate: '2026-03-23', description: 'Confermare modello scelto dal cliente.', comments: [] },
      { id: uid('task'), title: 'Ponteggio lato nord', projectId: '', project: 'Condominio Aurora', stage: 'in_progress', priority: 'Alta', assignee: 'Marco Sala', dueDate: '2026-03-20', description: 'Completare montaggio e verifica sicurezza.', comments: [] },
      { id: uid('task'), title: 'Collaudo finale appartamento', projectId: '', project: 'Città Studi', stage: 'done', priority: 'Alta', assignee: 'Sara Leone', dueDate: '2026-03-19', description: 'Checklist finale e consegna chiavi.', comments: ['Cliente avvisato via email.'] },
    ],
    documents: [
      { id: uid('doc'), name: 'PSC Villa Moretti', category: 'Sicurezza', project: 'Villa Moretti', uploadedAt: '2026-03-12', notes: 'Versione firmata.', fileName: 'psc-villa-moretti.pdf', dataUrl: '' },
      { id: uid('doc'), name: 'Contratto Aurora', category: 'Commerciale', project: 'Condominio Aurora', uploadedAt: '2026-03-07', notes: 'Contratto firmato digitalmente.', fileName: 'contratto-aurora.pdf', dataUrl: '' },
    ],
    events: [
      { id: uid('ev'), title: 'Sopralluogo De Luca', date: '2026-03-20', type: 'Sopralluogo', related: 'Fam. De Luca', notes: 'Portare laser e checklist bagno.' },
      { id: uid('ev'), title: 'Scadenza F24 IVA', date: '2026-03-16', type: 'Finance', related: 'Amministrazione', notes: 'Controllo con commercialista.' },
      { id: uid('ev'), title: 'Consegna gres showroom', date: '2026-03-24', type: 'Magazzino', related: 'Pavimentazioni', notes: 'Scarico diretto in showroom.' },
    ],
    products: [
      { id: uid('prd'), category: 'Infissi', sku: 'INF-101', name: 'Infisso PVC Premium 2 ante', description: 'Telaio 82mm, doppia guarnizione.', price: 1240, stock: 12, status: 'Attivo', brand: 'EdilCasa', shopifyHandle: 'infisso-pvc-premium-2-ante', shopifyTitle: 'Infisso PVC Premium 2 ante', shopifyVendor: 'EdilCasa', shopifyType: 'Infissi', tags: 'pvc,premium,serramento', barcode: '800111222333', weight: '28', imageUrl: '', published: 'TRUE' },
      { id: uid('prd'), category: 'Pavimenti', sku: 'PAV-330', name: 'Gres Pearl 60x120', description: 'Gres porcellanato effetto pietra.', price: 46, stock: 96, status: 'Attivo', brand: 'EdilCasa', shopifyHandle: 'gres-pearl-60x120', shopifyTitle: 'Gres Pearl 60x120', shopifyVendor: 'EdilCasa', shopifyType: 'Pavimentazioni', tags: 'gres,60x120,pearl', barcode: '800111222444', weight: '32', imageUrl: '', published: 'TRUE' },
      { id: uid('prd'), category: 'Bagni', sku: 'BAG-204', name: 'Mobile bagno Urban 120', description: 'Mobile sospeso finitura noce.', price: 990, stock: 8, status: 'Bozza', brand: 'EdilCasa', shopifyHandle: 'mobile-bagno-urban-120', shopifyTitle: 'Mobile bagno Urban 120', shopifyVendor: 'EdilCasa', shopifyType: 'Bagni', tags: 'bagno,mobile,urban', barcode: '800111222555', weight: '18', imageUrl: '', published: 'FALSE' },
    ],
    orders: [
      { id: uid('ord'), supplier: 'Ceramiche Uno', category: 'Pavimenti', amount: 8420, status: 'In consegna', dueDate: '2026-03-29', notes: 'Consegna showroom + cantiere.', project: 'Villa Moretti' },
      { id: uid('ord'), supplier: 'InfissiTech', category: 'Infissi', amount: 21600, status: 'Confermato', dueDate: '2026-04-04', notes: 'Lotto 2 villa Moretti.', project: 'Villa Moretti' },
    ],
    invoices: [
      { id: uid('inv'), number: 'FT-421', client: 'Giulia Conti', type: 'Saldo finale', amount: 7800, status: 'In scadenza', dueDate: '2026-03-21', notes: 'Saldo appartamento Città Studi.' },
      { id: uid('inv'), number: 'FT-425', client: 'Aurora Gestioni', type: 'Acconto', amount: 31500, status: 'Incassata', dueDate: '2026-03-25', notes: 'Acconto ponteggi e facciata.' },
    ],
    payments: [
      { id: uid('pay'), supplier: 'Ceramiche Uno', date: '2026-03-29', amount: 9850, priority: 'Alta', status: 'Pianificato', notes: 'Pagamento da confermare il 27.' },
      { id: uid('pay'), supplier: 'Bagno Design', date: '2026-04-04', amount: 5980, priority: 'Media', status: 'Pianificato', notes: 'Merce showroom.' },
    ],
    compliance: [
      { id: uid('cmp'), title: 'DURC Edil Nord', owner: 'HR / Compliance', dueDate: '2026-03-21', status: 'Urgente', notes: 'Richiedere rinnovo entro venerdì.' },
      { id: uid('cmp'), title: 'Assicurazione autocarro EC-12', owner: 'Amministrazione', dueDate: '2026-04-02', status: 'In rinnovo', notes: 'Preventivo già richiesto.' },
    ],
    settings: {
      shopifyStoreUrl: '',
      shopifyToken: '',
      defaultQuoteFooter: 'Prezzi iva esclusa salvo diversa indicazione. Validità 30 giorni.',
    },
  };
}

const EMPTY = {
  lead: () => ({ id: uid('lead'), name: '', company: '', email: '', phone: '', source: 'Sito Web', status: 'Nuovo', value: 0, owner: '', notes: '', createdAt: todayISO(), attachments: [] }),
  visit: () => ({ id: uid('visit'), title: '', leadId: '', client: '', site: '', date: todayISO(), status: 'Da eseguire', owner: '', notes: '', attachments: [] }),
  quote: () => ({ id: uid('quote'), template: 'general', title: QUOTE_TEMPLATES.general.title, client: '', status: 'Bozza', validUntil: todayISO(), notes: '', createdAt: todayISO(), items: QUOTE_TEMPLATES.general.items.map((x) => ({ ...x, id: uid('li') })) }),
  showroom: () => ({ id: uid('show'), client: '', environment: '', selection: '', amount: 0, status: 'Bozza', notes: '' }),
  project: () => ({ id: uid('proj'), name: '', client: '', status: 'Bozza', budget: 0, responsabile: '', progress: 0, address: '', startDate: todayISO(), endDate: todayISO(), notes: '' }),
  task: () => ({ id: uid('task'), title: '', projectId: '', project: '', stage: 'todo', priority: 'Media', assignee: '', dueDate: todayISO(), description: '', comments: [] }),
  document: () => ({ id: uid('doc'), name: '', category: 'Tecnico', project: '', uploadedAt: todayISO(), notes: '', fileName: '', dataUrl: '' }),
  event: () => ({ id: uid('ev'), title: '', date: todayISO(), type: 'Operativo', related: '', notes: '' }),
  product: (category = 'Infissi') => ({ id: uid('prd'), category, sku: '', name: '', description: '', price: 0, stock: 0, status: 'Bozza', brand: 'EdilCasa', shopifyHandle: '', shopifyTitle: '', shopifyVendor: 'EdilCasa', shopifyType: category, tags: '', barcode: '', weight: '', imageUrl: '', published: 'FALSE' }),
  order: () => ({ id: uid('ord'), supplier: '', category: 'Generale', amount: 0, status: 'Da approvare', dueDate: todayISO(), notes: '', project: '' }),
  invoice: () => ({ id: uid('inv'), number: '', client: '', type: 'Acconto', amount: 0, status: 'Bozza', dueDate: todayISO(), notes: '' }),
  payment: () => ({ id: uid('pay'), supplier: '', date: todayISO(), amount: 0, priority: 'Media', status: 'Pianificato', notes: '' }),
  compliance: () => ({ id: uid('cmp'), title: '', owner: '', dueDate: todayISO(), status: 'Da pianificare', notes: '' }),
};

const COLLECTION_BY_TYPE = {
  lead: 'leads',
  visit: 'visits',
  quote: 'quotes',
  showroom: 'showroom',
  project: 'projects',
  task: 'tasks',
  document: 'documents',
  event: 'events',
  product: 'products',
  order: 'orders',
  invoice: 'invoices',
  payment: 'payments',
  compliance: 'compliance',
};

const SCHEMAS = {
  lead: [
    { key: 'name', label: 'Nome lead' },
    { key: 'company', label: 'Azienda' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'phone', label: 'Telefono' },
    { key: 'source', label: 'Origine', type: 'select', options: ['Sito Web', 'Meta Ads', 'Google Ads', 'Referral', 'Passaparola'] },
    { key: 'status', label: 'Stato', type: 'select', options: ['Nuovo', 'Caldo', 'Sopralluogo', 'Preventivo', 'Chiuso'] },
    { key: 'value', label: 'Valore potenziale', type: 'number' },
    { key: 'owner', label: 'Responsabile' },
    { key: 'createdAt', label: 'Data creazione', type: 'date' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  visit: [
    { key: 'title', label: 'Titolo sopralluogo' },
    { key: 'client', label: 'Cliente' },
    { key: 'site', label: 'Zona / indirizzo' },
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Da eseguire', 'Confermato', 'Completato', 'Annullato'] },
    { key: 'owner', label: 'Tecnico' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  showroom: [
    { key: 'client', label: 'Cliente' },
    { key: 'environment', label: 'Ambiente' },
    { key: 'selection', label: 'Selezione', type: 'textarea' },
    { key: 'amount', label: 'Importo', type: 'number' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Bozza', 'In revisione', 'Confermato'] },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  project: [
    { key: 'name', label: 'Nome cantiere' },
    { key: 'client', label: 'Cliente' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Bozza', 'In esecuzione', 'In partenza', 'Quasi completato', 'Chiuso'] },
    { key: 'budget', label: 'Budget', type: 'number' },
    { key: 'responsabile', label: 'Responsabile' },
    { key: 'progress', label: 'Avanzamento %', type: 'number' },
    { key: 'address', label: 'Indirizzo' },
    { key: 'startDate', label: 'Inizio', type: 'date' },
    { key: 'endDate', label: 'Fine', type: 'date' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  task: [
    { key: 'title', label: 'Task' },
    { key: 'project', label: 'Cantiere / progetto' },
    { key: 'stage', label: 'Colonna workflow', type: 'select', options: ['todo', 'in_progress', 'review', 'done'] },
    { key: 'priority', label: 'Priorità', type: 'select', options: ['Bassa', 'Media', 'Alta', 'Urgente'] },
    { key: 'assignee', label: 'Assegnata a' },
    { key: 'dueDate', label: 'Scadenza', type: 'date' },
    { key: 'description', label: 'Descrizione', type: 'textarea' },
  ],
  document: [
    { key: 'name', label: 'Nome documento' },
    { key: 'category', label: 'Categoria', type: 'select', options: ['Tecnico', 'Commerciale', 'Sicurezza', 'Fatture', 'Foto cantiere'] },
    { key: 'project', label: 'Cantiere / progetto' },
    { key: 'uploadedAt', label: 'Data', type: 'date' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  event: [
    { key: 'title', label: 'Titolo evento' },
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'type', label: 'Tipo', type: 'select', options: ['Operativo', 'Sopralluogo', 'Finance', 'Magazzino', 'Commerciale'] },
    { key: 'related', label: 'Collegato a' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  product: [
    { key: 'category', label: 'Categoria', type: 'select', options: ['Infissi', 'Pavimenti', 'Bagni'] },
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Nome prodotto' },
    { key: 'description', label: 'Descrizione', type: 'textarea' },
    { key: 'price', label: 'Prezzo', type: 'number' },
    { key: 'stock', label: 'Stock', type: 'number' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Bozza', 'Attivo', 'Esaurito'] },
    { key: 'brand', label: 'Brand' },
    { key: 'shopifyHandle', label: 'Shopify Handle' },
    { key: 'shopifyTitle', label: 'Shopify Title' },
    { key: 'shopifyVendor', label: 'Shopify Vendor' },
    { key: 'shopifyType', label: 'Shopify Type' },
    { key: 'tags', label: 'Tag Shopify' },
    { key: 'barcode', label: 'Barcode' },
    { key: 'weight', label: 'Peso (kg)' },
    { key: 'imageUrl', label: 'Image URL' },
    { key: 'published', label: 'Published', type: 'select', options: ['TRUE', 'FALSE'] },
  ],
  order: [
    { key: 'supplier', label: 'Fornitore' },
    { key: 'category', label: 'Categoria' },
    { key: 'amount', label: 'Importo', type: 'number' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Da approvare', 'Confermato', 'In consegna', 'Ricevuto'] },
    { key: 'dueDate', label: 'Scadenza / consegna', type: 'date' },
    { key: 'project', label: 'Commessa' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  invoice: [
    { key: 'number', label: 'Numero fattura' },
    { key: 'client', label: 'Cliente' },
    { key: 'type', label: 'Tipo', type: 'select', options: ['Acconto', 'SAL', 'Saldo finale'] },
    { key: 'amount', label: 'Importo', type: 'number' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Bozza', 'Da inviare', 'In scadenza', 'Incassata'] },
    { key: 'dueDate', label: 'Scadenza', type: 'date' },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  payment: [
    { key: 'supplier', label: 'Fornitore' },
    { key: 'date', label: 'Data', type: 'date' },
    { key: 'amount', label: 'Importo', type: 'number' },
    { key: 'priority', label: 'Priorità', type: 'select', options: ['Bassa', 'Media', 'Alta'] },
    { key: 'status', label: 'Stato', type: 'select', options: ['Pianificato', 'Autorizzato', 'Pagato'] },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
  compliance: [
    { key: 'title', label: 'Adempimento' },
    { key: 'owner', label: 'Responsabile' },
    { key: 'dueDate', label: 'Scadenza', type: 'date' },
    { key: 'status', label: 'Stato', type: 'select', options: ['Da pianificare', 'In rinnovo', 'Urgente', 'Completato'] },
    { key: 'notes', label: 'Note', type: 'textarea' },
  ],
};

function useToast() {
  const [toast, setToast] = useState(null);
  const push = useCallback((message, tone = 'default') => {
    setToast({ id: uid('toast'), message, tone });
  }, []);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);
  return { toast, push };
}

function Btn({ theme, children, variant = 'solid', icon: Icon, onClick, style = {}, disabled = false }) {
  const T = tk(theme);
  const variants = {
    solid: { background: COLORS.orange, color: '#fff', border: `1px solid ${COLORS.orange}`, boxShadow: '0 12px 28px rgba(249,115,22,.18)' },
    soft: { background: theme === 'dark' ? 'rgba(249,115,22,.12)' : COLORS.orangeSoft, color: COLORS.orangeDark, border: `1px solid rgba(249,115,22,.22)` },
    outline: { background: theme === 'dark' ? T.alt : '#fff', color: T.text, border: `1px solid ${T.border}` },
    ghost: { background: 'transparent', color: T.text, border: '1px solid transparent' },
    danger: { background: COLORS.red, color: '#fff', border: `1px solid ${COLORS.red}` },
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '10px 14px', borderRadius: 12, cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 700, fontSize: 13, transition: 'all .18s ease', opacity: disabled ? .55 : 1,
        ...variants[variant], ...style,
      }}
    >
      {Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}

function Tag({ children, tone = 'default' }) {
  const map = {
    default: { bg: 'rgba(148,163,184,.12)', c: '#64748b', b: 'rgba(148,163,184,.25)' },
    success: { bg: 'rgba(22,163,74,.12)', c: '#16a34a', b: 'rgba(22,163,74,.22)' },
    warning: { bg: 'rgba(249,115,22,.12)', c: '#f97316', b: 'rgba(249,115,22,.22)' },
    danger: { bg: 'rgba(239,68,68,.12)', c: '#ef4444', b: 'rgba(239,68,68,.22)' },
    info: { bg: 'rgba(14,165,233,.12)', c: '#0ea5e9', b: 'rgba(14,165,233,.22)' },
  };
  const c = map[tone] || map.default;
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 9px', borderRadius: 999, background: c.bg, color: c.c, border: `1px solid ${c.b}`, fontSize: 11, fontWeight: 700 }}>{children}</span>;
}

function Modal({ open, onClose, theme, title, subtitle, children, wide = false }) {
  const T = tk(theme);
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: 18 }}>
      <motion.div initial={{ opacity: 0, y: 14, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} style={{ width: wide ? 'min(1100px, 96vw)' : 'min(760px, 96vw)', maxHeight: '92vh', overflow: 'auto', background: T.card, color: T.text, borderRadius: 20, border: `1px solid ${T.border}`, boxShadow: '0 28px 70px rgba(2,6,23,.32)' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 2, background: T.card, borderBottom: `1px solid ${T.border}`, padding: '18px 20px', display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
            {subtitle ? <div style={{ marginTop: 4, color: T.muted, fontSize: 13 }}>{subtitle}</div> : null}
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 12, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer' }}><X size={18} /></button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </motion.div>
    </div>
  );
}

function Field({ theme, label, value, onChange, type = 'text', options = [], placeholder = '', rows = 4 }) {
  const T = tk(theme);
  const base = { width: '100%', border: `1px solid ${T.border}`, background: theme === 'dark' ? T.alt : '#fff', color: T.text, borderRadius: 12, padding: '12px 13px', fontSize: 14, outline: 'none' };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: T.muted }}>{label}</span>
      {type === 'textarea' ? (
        <textarea rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={base} />
      ) : type === 'select' ? (
        <select value={value || ''} onChange={(e) => onChange(e.target.value)} style={base}>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} value={value ?? ''} onChange={(e) => onChange(type === 'number' ? Number(e.target.value || 0) : e.target.value)} placeholder={placeholder} style={base} />
      )}
    </label>
  );
}

function Section({ theme, title, subtitle, icon: Icon = Layers3, action, children, padded = true }) {
  const T = tk(theme);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: theme === 'dark' ? '0 14px 34px rgba(2,6,23,.18)' : '0 10px 28px rgba(15,23,42,.05)' }}>
      <div style={{ padding: '16px 18px', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 14 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 11px', borderRadius: 999, background: theme === 'dark' ? 'rgba(249,115,22,.12)' : COLORS.orangeSoft, color: COLORS.orangeDark, border: '1px solid rgba(249,115,22,.22)', fontSize: 13, fontWeight: 800 }}>
            <Icon size={14} /> {title}
          </div>
          {subtitle ? <div style={{ marginTop: 8, color: T.muted, fontSize: 13 }}>{subtitle}</div> : null}
        </div>
        {action}
      </div>
      <div style={{ padding: padded ? 18 : 0 }}>{children}</div>
    </div>
  );
}

function StatCard({ theme, label, value, delta, icon: Icon }) {
  const T = tk(theme);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, padding: 18, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: T.muted, fontWeight: 700 }}>{label}</div>
        <div style={{ marginTop: 10, fontSize: 20, fontWeight: 800 }}>{value}</div>
        <div style={{ marginTop: 6, color: COLORS.green, fontSize: 12, fontWeight: 700 }}>{delta}</div>
      </div>
      <div style={{ width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: theme === 'dark' ? 'rgba(249,115,22,.12)' : COLORS.orangeSoft, border: '1px solid rgba(249,115,22,.22)', color: COLORS.orange }}>
        <Icon size={18} />
      </div>
    </div>
  );
}

function ValueBox({ theme, icon: Icon, label, value, hint }) {
  const T = tk(theme);
  return (
    <div style={{ background: T.alt, border: `1px solid ${T.borderSoft}`, borderRadius: 16, padding: 15 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.muted }}>{label}</div>
        {Icon ? <Icon size={15} color={COLORS.orange} /> : null}
      </div>
      <div style={{ marginTop: 8, fontSize: 21, fontWeight: 800 }}>{value}</div>
      {hint ? <div style={{ marginTop: 6, color: T.muted, fontSize: 12 }}>{hint}</div> : null}
    </div>
  );
}

function ProgressBar({ value = 0 }) {
  return (
    <div style={{ height: 7, background: 'rgba(148,163,184,.18)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, Number(value || 0)))}%`, background: COLORS.orange, borderRadius: 999 }} />
    </div>
  );
}

function ClickTable({ theme, columns, rows, onRowClick }) {
  const T = tk(theme);
  return (
    <div className="responsive-table" style={{ border: `1px solid ${T.border}`, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))`, padding: '11px 14px', background: theme === 'dark' ? '#0b111d' : '#f8fafc', color: T.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 800 }}>
        {columns.map((col) => <div key={col}>{col}</div>)}
      </div>
      {rows.map((row) => (
        <button key={row.id} onClick={() => onRowClick?.(row.original)} style={{ width: '100%', textAlign: 'left', display: 'grid', gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))`, gap: 12, padding: '13px 14px', background: T.card, color: T.text, border: 0, borderTop: `1px solid ${T.border}`, cursor: 'pointer' }}>
          {row.cells.map((cell, idx) => <div key={idx} style={{ color: idx === 0 ? T.text : T.muted, fontWeight: idx === 0 ? 700 : 500 }}>{cell}</div>)}
        </button>
      ))}
    </div>
  );
}

function Toast({ toast, theme }) {
  if (!toast) return null;
  const T = tk(theme);
  const tone = toast.tone === 'success' ? { bg: COLORS.greenSoft, c: COLORS.green, b: 'rgba(22,163,74,.22)' }
    : toast.tone === 'danger' ? { bg: COLORS.redSoft, c: COLORS.red, b: 'rgba(239,68,68,.22)' }
    : { bg: theme === 'dark' ? 'rgba(249,115,22,.12)' : COLORS.orangeSoft, c: COLORS.orangeDark, b: 'rgba(249,115,22,.22)' };
  return (
    <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 500, background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, boxShadow: '0 18px 34px rgba(2,6,23,.2)', padding: 12, minWidth: 240 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, display: 'grid', placeItems: 'center', background: tone.bg, color: tone.c, border: `1px solid ${tone.b}` }}><CheckCircle2 size={16} /></div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{toast.message}</div>
      </div>
    </div>
  );
}

function AttachmentList({ attachments = [], onOpen, onRemove, theme }) {
  const T = tk(theme);
  return (
    <div className="stack" style={{ gap: 8 }}>
      {attachments.length === 0 ? <div style={{ fontSize: 12, color: T.muted }}>Nessun allegato</div> : attachments.map((att) => (
        <div key={att.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '10px 12px', borderRadius: 12, background: T.alt, border: `1px solid ${T.borderSoft}` }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{att.name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{att.type || 'file'} · {att.sizeLabel || ''}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {onOpen ? <Btn theme={theme} variant="outline" icon={Eye} onClick={() => onOpen(att)} style={{ padding: '8px 10px' }}>Apri</Btn> : null}
            {onRemove ? <Btn theme={theme} variant="ghost" icon={Trash2} onClick={() => onRemove(att.id)} style={{ padding: '8px 10px', color: COLORS.red }}>Rimuovi</Btn> : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@edilcasa.it');
  const [pw, setPw] = useState('edilcasa');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    const user = USERS.find((u) => u.email === email && u.pw === pw);
    if (!user) {
      setError('Credenziali non valide');
      return;
    }
    onLogin(user);
  };

  const coverBg = `linear-gradient(135deg, rgba(15,23,42,.9), rgba(234,88,12,.72)), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1200'%3E%3Crect width='1200' height='1200' fill='%23111827'/%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='.16' stroke-width='8'%3E%3Cpath d='M90 980h220V560H90zM360 980h180V430H360zM590 980h230V300H590zM870 980h160V650H870z'/%3E%3Cpath d='M120 540h160M390 410h120M625 280h150M900 630h100'/%3E%3Cpath d='M760 170l130 130M825 170v220M715 235h220'/%3E%3C/g%3E%3Cg fill='%23f97316' fill-opacity='.16'%3E%3Ccircle cx='975' cy='220' r='180'/%3E%3Ccircle cx='280' cy='1020' r='220'/%3E%3C/g%3E%3C/svg%3E") center/cover`;

  return (
    <div style={{ minHeight: '100dvh', background: '#ffffff', color: '#0f172a' }}>
      <div style={{ minHeight: '100dvh', width: '100vw', display: 'grid', gridTemplateColumns: '1.2fr .8fr' }} className="grid-2-even">
        <div style={{ minHeight: '100dvh', backgroundImage: coverBg, backgroundSize: 'cover', backgroundPosition: 'center', padding: '48px clamp(24px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 999, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', fontWeight: 800, width: 'fit-content', backdropFilter: 'blur(8px)' }}>
            <Building size={18} /> CantiereDigitale
          </div>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 'clamp(44px, 6vw, 76px)', lineHeight: .95, fontWeight: 900, letterSpacing: '-.06em' }}>Il gestionale operativo per l'edilizia.</div>
            <div style={{ marginTop: 20, fontSize: 'clamp(16px, 2vw, 21px)', lineHeight: 1.6, color: 'rgba(255,255,255,.82)', maxWidth: 560 }}>
              Controlla cantieri, sopralluoghi, preventivi, documenti, magazzino e finance in un unico ambiente di lavoro.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,.74)' }}>
            <CheckCircle2 size={16} /> Versione operativa locale pronta per essere collegata a database reale.
          </div>
        </div>
        <div style={{ minHeight: '100dvh', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px clamp(18px, 4vw, 52px)' }}>
          <div style={{ width: 'min(520px, 100%)', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 28, padding: '30px clamp(20px, 3vw, 34px)', boxShadow: '0 24px 60px rgba(15,23,42,.08)' }}>
            <div>
              <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-.05em' }}>Accedi</div>
              <div style={{ marginTop: 8, color: '#64748b', fontSize: 15, lineHeight: 1.6 }}>Ambiente chiaro, pulito e pronto all'uso. Inserisci le credenziali demo per entrare.</div>
            </div>
            <div className="stack" style={{ marginTop: 24 }}>
              <Field theme="light" label="Email" value={email} onChange={setEmail} type="email" />
              <div>
                <Field theme="light" label="Password" value={pw} onChange={setPw} type={showPw ? 'text' : 'password'} />
                <button onClick={() => setShowPw(!showPw)} style={{ marginTop: 8, background: 'transparent', border: 0, color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12 }}>{showPw ? <EyeOff size={14} /> : <Eye size={14} />} {showPw ? 'Nascondi' : 'Mostra'} password</button>
              </div>
              {error ? <div style={{ fontSize: 12, color: COLORS.red, fontWeight: 700 }}>{error}</div> : null}
              <Btn theme="light" icon={ArrowUpRight} onClick={submit} style={{ width: '100%', marginTop: 8, padding: '14px 18px', fontSize: 14 }}>Entra</Btn>
            </div>
            <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Utenti demo rapidi</div>
              <div className="stack" style={{ gap: 8 }}>
                {USERS.map((u) => (
                  <button key={u.email} onClick={() => { setEmail(u.email); setPw(u.pw); setError(''); }} style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 14, border: '1px solid #e2e8f0', background: '#ffffff', color: '#0f172a', cursor: 'pointer' }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{u.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{u.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ theme, page, setPage, activeClient, onLogout, sideOpen, setSideOpen, setView, isAdmin }) {
  const T = tk(theme);
  return (
    <>
      {sideOpen ? <div onClick={() => setSideOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,.46)', zIndex: 35 }} /> : null}
      <aside className={`app-sidebar ${sideOpen ? 'open' : ''}`} style={{ background: T.sidebar, color: T.text, borderRight: `1px solid ${T.border}` }}>
        <div style={{ padding: 16, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: COLORS.black, color: '#fff' }}><Building size={18} /></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-.05em' }}>CantiereDigitale</div>
              <div style={{ fontSize: 12, color: T.muted }}>{activeClient?.name || 'PRISMAos'}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', overflowX: 'hidden', flex: 1, minHeight: 0 }}>
          <div style={{ padding: 12, borderRadius: 16, border: `1px solid ${T.border}`, background: T.alt, flexShrink: 0 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: T.muted, fontWeight: 800 }}>Account</div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{activeClient?.contact || 'Marco Rossi'}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{activeClient?.city || 'Milano'}</div>
              </div>
              <Tag tone="warning">{activeClient?.plan || 'Enterprise'}</Tag>
            </div>
          </div>
          {NAV.map((group) => (
            <div key={group.label} style={{ flexShrink: 0 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: T.muted, fontWeight: 800, margin: '8px 10px' }}>{group.label}</div>
              <div className="stack" style={{ gap: 6 }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.id === page;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setPage(item.id); setSideOpen(false); }}
                      className="nav-btn"
                      style={{
                        padding: '12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                        borderRadius: 14, border: `1px solid ${active ? T.activeBorder : 'transparent'}`, background: active ? T.activeNav : 'transparent', color: active ? T.activeText : T.text, cursor: 'pointer',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <Icon size={16} color={active ? COLORS.orange : T.muted} />
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</span>
                      </span>
                      {item.id === 'cantieri' ? <Tag tone="warning">14</Tag> : null}
                      {item.id === 'fatture' ? <Tag tone="danger">2</Tag> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 14, borderTop: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          {isAdmin ? <Btn theme={theme} variant="outline" icon={Crown} onClick={() => setView('admin')} style={{ width: '100%' }}>Admin</Btn> : null}
          <Btn theme={theme} variant="ghost" icon={X} onClick={onLogout} style={{ width: '100%', justifyContent: 'flex-start', color: COLORS.red }}>Esci</Btn>
        </div>
      </aside>
    </>
  );
}

function SearchDropdown({ theme, results, onSelect }) {
  const T = tk(theme);
  return (
    <div className="search-pop fade-up" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, boxShadow: '0 24px 56px rgba(15,23,42,.16)' }}>
      <div style={{ padding: '12px 14px', borderBottom: `1px solid ${T.border}`, fontSize: 12, color: T.muted, fontWeight: 700 }}>Risultati ricerca</div>
      {results.length === 0 ? <div style={{ padding: 14, color: T.muted, fontSize: 13 }}>Nessun risultato</div> : results.map((r) => (
        <button key={r.key} onClick={() => onSelect(r)} style={{ width: '100%', textAlign: 'left', padding: '12px 14px', border: 0, borderTop: `1px solid ${T.borderSoft}`, background: T.card, color: T.text, cursor: 'pointer' }}>
          <div style={{ fontWeight: 800 }}>{r.title}</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{r.subtitle}</div>
        </button>
      ))}
    </div>
  );
}

function NotificationsSheet({ theme, open, onClose, items = [], onSelect }) {
  const T = tk(theme);
  return (
    <Modal open={open} onClose={onClose} theme={theme} title="Notifiche" subtitle="Avvisi cliccabili e azioni prioritarie">
      <div className="stack" style={{ gap: 10 }}>
        {items.length === 0 ? <div style={{ fontSize: 13, color: T.muted }}>Nessuna notifica disponibile.</div> : items.map((item) => {
          const Icon = item.icon || Bell;
          return (
            <button key={item.id} onClick={() => onSelect(item)} style={{ width: '100%', textAlign: 'left', padding: '14px 15px', borderRadius: 16, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, display: 'grid', placeItems: 'center', background: item.tone === 'danger' ? (theme === 'dark' ? 'rgba(239,68,68,.12)' : COLORS.redSoft) : item.tone === 'success' ? (theme === 'dark' ? 'rgba(22,163,74,.12)' : COLORS.greenSoft) : (theme === 'dark' ? 'rgba(249,115,22,.12)' : COLORS.orangeSoft), color: item.tone === 'danger' ? COLORS.red : item.tone === 'success' ? COLORS.green : COLORS.orangeDark, border: `1px solid ${item.tone === 'danger' ? 'rgba(239,68,68,.18)' : item.tone === 'success' ? 'rgba(22,163,74,.18)' : 'rgba(249,115,22,.18)'}` }}><Icon size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{item.subtitle}</div>
                  </div>
                </div>
                <Tag tone={item.tone || 'warning'}>{item.tag || 'Apri'}</Tag>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

function Topbar({ theme, page, setTheme, search, setSearch, results, onSelectResult, onNew, setSideOpen, notifications, onOpenNotifications }) {
  const T = tk(theme);
  const meta = PAGE_META[page] || PAGE_META.dashboard;
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = vw < 980;
  const isCompact = vw < 760;

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 30, background: T.topbar, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.border}`, padding: isMobile ? '16px 14px' : '18px 22px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 12 }}>
        <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, minWidth: 0, flex: isMobile ? '1 1 100%' : '1 1 auto' }}>
            {isMobile ? <button onClick={() => setSideOpen(true)} style={{ display: 'inline-flex', width: 46, height: 46, borderRadius: 14, border: `1px solid ${T.border}`, background: T.card, color: T.text, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><Menu size={20} /></button> : null}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em', color: T.muted, fontWeight: 800 }}>{meta.ey}</div>
              <div style={{ fontSize: isMobile ? 24 : 28, fontWeight: 900, letterSpacing: '-.05em', lineHeight: 1.02 }}>{meta.title}</div>
              <div style={{ fontSize: isMobile ? 14 : 15, color: T.muted, marginTop: 6, lineHeight: 1.45 }}>{meta.subtitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end', flexWrap: 'wrap' }}>
            {!isCompact ? (
              <div style={{ position: 'relative', width: isMobile ? '100%' : 340, maxWidth: isMobile ? '100%' : '42vw', flex: isMobile ? '1 1 100%' : '0 0 auto', order: isMobile ? 3 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 15, border: `1px solid ${T.border}`, background: T.card }}>
                  <Search size={16} color={T.muted} />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca lead, preventivi, cantieri..." style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', color: T.text, fontSize: 14 }} />
                </div>
                {search.trim() ? <SearchDropdown theme={theme} results={results} onSelect={onSelectResult} /> : null}
              </div>
            ) : null}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {!isMobile ? <Btn theme={theme} variant="outline" icon={theme === 'light' ? Moon : SunMedium} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ padding: '11px 12px' }}>{theme === 'light' ? 'Scuro' : 'Chiaro'}</Btn> : null}
              <div style={{ position: 'relative' }}>
                <Btn theme={theme} variant="outline" icon={Bell} onClick={onOpenNotifications} style={{ padding: '11px 12px' }}>Notifiche</Btn>
                {notifications > 0 ? <div style={{ position: 'absolute', top: -6, right: -6, minWidth: 20, height: 20, padding: '0 4px', borderRadius: 999, display: 'grid', placeItems: 'center', background: COLORS.orange, color: '#fff', fontSize: 10, fontWeight: 800 }}>{notifications}</div> : null}
              </div>
              <Btn theme={theme} icon={Plus} onClick={onNew} style={{ padding: '11px 14px' }}>Nuovo</Btn>
            </div>
          </div>
        </div>
        {isCompact ? (
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 15, border: `1px solid ${T.border}`, background: T.card }}>
              <Search size={16} color={T.muted} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca lead, preventivi, cantieri..." style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', color: T.text, fontSize: 14 }} />
            </div>
            {search.trim() ? <SearchDropdown theme={theme} results={results} onSelect={onSelectResult} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function buildQuoteTotal(quote) {
  return quote.items.reduce((acc, item) => acc + Number(item.qty || 0) * Number(item.price || 0), 0);
}

function quoteHtml(quote, footer = '') {
  const total = buildQuoteTotal(quote);
  return `
    <div class="badge">Preventivo</div>
    <h1 style="margin-top:14px">${quote.title}</h1>
    <div class="meta">Cliente: ${quote.client || '—'} · Stato: ${quote.status} · Valido fino al: ${formatDate(quote.validUntil)}</div>
    <table>
      <thead>
        <tr><th>Descrizione</th><th>Qtà</th><th>Prezzo</th><th>Totale</th></tr>
      </thead>
      <tbody>
        ${quote.items.map((item) => `<tr><td>${item.description}</td><td>${item.qty}</td><td>${fmtMoney(item.price)}</td><td>${fmtMoney(Number(item.qty || 0) * Number(item.price || 0))}</td></tr>`).join('')}
      </tbody>
    </table>
    <div class="total">Totale preventivo: ${fmtMoney(total)}</div>
    <p style="margin-top:20px; font-size:14px; color:#475569">${quote.notes || ''}</p>
    ${footer ? `<p style="margin-top:10px; font-size:12px; color:#64748b">${footer}</p>` : ''}
  `;
}

function invoiceHtml(invoice) {
  return `
    <div class="badge">Fattura</div>
    <h1 style="margin-top:14px">${invoice.number || 'Bozza'}</h1>
    <div class="meta">Cliente: ${invoice.client || '—'} · Tipo: ${invoice.type} · Scadenza: ${formatDate(invoice.dueDate)}</div>
    <table>
      <thead><tr><th>Descrizione</th><th>Importo</th></tr></thead>
      <tbody><tr><td>${invoice.notes || invoice.type}</td><td>${fmtMoney(invoice.amount)}</td></tr></tbody>
    </table>
    <div class="total">Totale fattura: ${fmtMoney(invoice.amount)}</div>
  `;
}

function GenericEditorModal({ theme, type, record, open, onClose, onSave, onDelete, settings }) {
  const [form, setForm] = useState(record);
  useEffect(() => setForm(record), [record]);
  const schema = SCHEMAS[type] || [];
  const T = tk(theme);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const attachFiles = async (files) => {
    const built = await Promise.all([...files].map(async (file) => ({
      id: uid('att'),
      name: file.name,
      type: file.type,
      sizeLabel: `${Math.round(file.size / 1024)} KB`,
      dataUrl: await readFileAsDataUrl(file),
    })));
    setForm((prev) => ({ ...prev, attachments: [...(prev.attachments || []), ...built] }));
  };

  if (!open || !form) return null;

  const titleMap = {
    lead: 'Lead', visit: 'Sopralluogo', quote: 'Preventivo', showroom: 'Selezione showroom', project: 'Cantiere', task: 'Task', document: 'Documento', event: 'Evento', product: 'Prodotto', order: 'Ordine fornitore', invoice: 'Fattura', payment: 'Pagamento', compliance: 'Compliance',
  };

  const removeAttachment = (id) => setForm((prev) => ({ ...prev, attachments: (prev.attachments || []).filter((a) => a.id !== id) }));
  const openAttachment = (att) => { if (att.dataUrl) window.open(att.dataUrl, '_blank'); };

  return (
    <Modal open={open} onClose={onClose} theme={theme} title={`${form.id ? 'Scheda' : 'Nuovo'} ${titleMap[type] || 'record'}`} subtitle="Campi modificabili e salvati localmente" wide={type === 'quote'}>
      {type === 'quote' ? (
        <div className="stack" style={{ gap: 18 }}>
          <div className="grid-3">
            <Field theme={theme} label="Cliente" value={form.client} onChange={(v) => setField('client', v)} />
            <Field theme={theme} label="Titolo" value={form.title} onChange={(v) => setField('title', v)} />
            <Field theme={theme} label="Template" type="select" value={form.template} onChange={(v) => {
              const tpl = QUOTE_TEMPLATES[v];
              setForm((prev) => ({ ...prev, template: v, title: prev.title || tpl.title, items: tpl.items.map((x) => ({ ...x, id: uid('li') })) }));
            }} options={Object.keys(QUOTE_TEMPLATES)} />
          </div>
          <div className="grid-3">
            <Field theme={theme} label="Stato" type="select" value={form.status} onChange={(v) => setField('status', v)} options={['Bozza', 'Inviato', 'Accettato', 'Respinto']} />
            <Field theme={theme} label="Validità" type="date" value={form.validUntil} onChange={(v) => setField('validUntil', v)} />
            <ValueBox theme={theme} icon={Euro} label="Totale" value={fmtMoney(buildQuoteTotal(form))} hint="Aggiornato in automatico" />
          </div>
          <Field theme={theme} label="Note" type="textarea" value={form.notes} onChange={(v) => setField('notes', v)} rows={4} />
          <Section theme={theme} title="Righe preventivo" subtitle="Template modificabile" icon={ReceiptText} action={<Btn theme={theme} variant="soft" icon={Plus} onClick={() => setField('items', [...form.items, { id: uid('li'), description: '', qty: 1, price: 0 }])}>Aggiungi riga</Btn>}>
            <div className="stack" style={{ gap: 10 }}>
              {form.items.map((item, idx) => (
                <div key={item.id} className="grid-4" style={{ alignItems: 'end' }}>
                  <Field theme={theme} label={`Descrizione ${idx + 1}`} value={item.description} onChange={(v) => setField('items', form.items.map((it) => it.id === item.id ? { ...it, description: v } : it))} />
                  <Field theme={theme} label="Qtà" type="number" value={item.qty} onChange={(v) => setField('items', form.items.map((it) => it.id === item.id ? { ...it, qty: v } : it))} />
                  <Field theme={theme} label="Prezzo" type="number" value={item.price} onChange={(v) => setField('items', form.items.map((it) => it.id === item.id ? { ...it, price: v } : it))} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, padding: '12px 13px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.alt, fontSize: 14, fontWeight: 700 }}>{fmtMoney(Number(item.qty || 0) * Number(item.price || 0))}</div>
                    <Btn theme={theme} variant="ghost" icon={Trash2} onClick={() => setField('items', form.items.filter((it) => it.id !== item.id))} style={{ color: COLORS.red }}>Rimuovi</Btn>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn theme={theme} variant="outline" icon={Download} onClick={() => printHtml(form.title || 'Preventivo', quoteHtml(form, settings.defaultQuoteFooter))}>Genera PDF</Btn>
              {onDelete ? <Btn theme={theme} variant="ghost" icon={Trash2} onClick={() => onDelete(form.id)} style={{ color: COLORS.red }}>Elimina</Btn> : null}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn theme={theme} variant="outline" onClick={onClose}>Chiudi</Btn>
              <Btn theme={theme} icon={CheckCircle2} onClick={() => onSave(form)}>Salva preventivo</Btn>
            </div>
          </div>
        </div>
      ) : (
        <div className="stack" style={{ gap: 18 }}>
          <div className="grid-2-even">
            {schema.map((field) => (
              <Field key={field.key} theme={theme} label={field.label} type={field.type || 'text'} value={form[field.key]} onChange={(v) => setField(field.key, v)} options={field.options || []} rows={field.type === 'textarea' ? 5 : 4} />
            ))}
          </div>
          {(type === 'lead' || type === 'visit' || type === 'document') ? (
            <Section theme={theme} title="Allegati" subtitle="Upload locale per demo" icon={Upload} action={<label style={{ cursor: 'pointer' }}><input type="file" multiple style={{ display: 'none' }} onChange={(e) => attachFiles(e.target.files)} /><Btn theme={theme} variant="soft" icon={Upload}>Carica</Btn></label>}>
              <AttachmentList theme={theme} attachments={form.attachments || (form.fileName ? [{ id: 'file', name: form.fileName, dataUrl: form.dataUrl }] : [])} onOpen={openAttachment} onRemove={removeAttachment} />
            </Section>
          ) : null}
          {type === 'task' ? (
            <Section theme={theme} title="Commenti" subtitle="Workflow in stile board" icon={Layers3} action={<Btn theme={theme} variant="soft" icon={Plus} onClick={() => setField('comments', [...(form.comments || []), `Nuovo commento ${new Date().toLocaleTimeString('it-IT')}`])}>Aggiungi commento</Btn>}>
              <div className="stack" style={{ gap: 8 }}>
                {(form.comments || []).length === 0 ? <div style={{ fontSize: 12, color: T.muted }}>Nessun commento</div> : form.comments.map((comment, idx) => <div key={`${idx}-${comment}`} style={{ padding: 12, background: T.alt, border: `1px solid ${T.borderSoft}`, borderRadius: 12, fontSize: 13 }}>{comment}</div>)}
              </div>
            </Section>
          ) : null}
          {type === 'invoice' ? (
            <Btn theme={theme} variant="outline" icon={Download} onClick={() => printHtml(form.number || 'Fattura', invoiceHtml(form))}>Genera PDF fattura</Btn>
          ) : null}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>{onDelete ? <Btn theme={theme} variant="ghost" icon={Trash2} onClick={() => onDelete(form.id)} style={{ color: COLORS.red }}>Elimina</Btn> : null}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn theme={theme} variant="outline" onClick={onClose}>Chiudi</Btn>
              <Btn theme={theme} icon={CheckCircle2} onClick={() => onSave(form)}>Salva</Btn>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function DashboardPage({ theme, db, openRecord, setPage }) {
  const quoteOpen = db.quotes.length;
  const urgent = db.compliance.filter((c) => c.status === 'Urgente').length + db.invoices.filter((i) => i.status === 'In scadenza').length;
  const revenue = db.invoices.reduce((acc, i) => acc + Number(i.amount || 0), 0) + 145000;
  const cashOut = db.payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const chart = [{ m: 'Gen', v: 98000 }, { m: 'Feb', v: 112000 }, { m: 'Mar', v: 121000 }, { m: 'Apr', v: 134000 }, { m: 'Mag', v: 148000 }, { m: 'Giu', v: revenue }];
  const mix = [
    { name: 'Cantieri', value: 46 },
    { name: 'Infissi', value: 19 },
    { name: 'Bagni', value: 18 },
    { name: 'Pavimenti', value: 17 },
  ];
  const T = tk(theme);
  return (
    <motion.div variants={pageMotion} initial="initial" animate="animate" exit="exit" className="stack">
      <div className="kpi-grid">
        <StatCard theme={theme} label="Fatturato mese" value={fmtMoney(revenue)} delta="+12,4%" icon={Euro} />
        <StatCard theme={theme} label="Cantieri attivi" value={String(db.projects.length)} delta="+3 questo mese" icon={HardHat} />
        <StatCard theme={theme} label="Ordini aperti" value={String(quoteOpen + db.orders.length)} delta={fmtMoney(sumBy(db.orders, 'amount'))} icon={ReceiptText} />
        <StatCard theme={theme} label="Scadenze urgenti" value={String(urgent)} delta="entro 7 giorni" icon={AlertTriangle} />
      </div>
      <div className="grid-2">
        <Section theme={theme} title="Controllo direzionale" subtitle="Economico, operativo e commerciale" icon={FileBarChart2} action={<Btn theme={theme} variant="outline" icon={Download} onClick={() => printHtml('Reporting direzionale', '<h1>Reporting direzionale</h1><p>Esportazione rapida browser.</p>')}>PDF</Btn>}>
          <div className="stack">
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart}>
                  <CartesianGrid stroke={theme === 'dark' ? '#1d2636' : '#e2e8f0'} vertical={false} />
                  <XAxis dataKey="m" stroke={T.muted} tickLine={false} axisLine={false} />
                  <YAxis stroke={T.muted} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12 }} />
                  <Area type="monotone" dataKey="v" stroke={COLORS.orange} fill="rgba(249,115,22,.16)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid-3">
              <ValueBox theme={theme} icon={ReceiptText} label="Ordini firmati" value={fmtMoney(sumBy(db.quotes.filter((q) => q.status === 'Accettato'), 'total') || 226000)} hint="mese corrente" />
              <ValueBox theme={theme} icon={Flame} label="Margine medio" value="23,8%" hint="stimato" />
              <ValueBox theme={theme} icon={Wallet} label="Incassi 30g" value={fmtMoney(revenue - cashOut)} hint="proiezione" />
            </div>
          </div>
        </Section>
        <div className="stack">
          <Section theme={theme} title="Agenda priorità" subtitle="Azioni direzionali oggi" icon={BellRing}>
            <div className="stack" style={{ gap: 10 }}>
              {[
                { label: 'Sollecita FT-421', hint: 'Finance', tone: 'warning', onClick: () => openRecord('invoice', db.invoices[0]) },
                { label: 'Valida SAL Villa Moretti', hint: 'Cantieri', tone: 'warning', onClick: () => openRecord('task', db.tasks[0]) },
                { label: 'Rinnovo DURC Edil Nord', hint: 'Compliance', tone: 'danger', onClick: () => openRecord('compliance', db.compliance[0]) },
              ].map((item) => (
                <button key={item.label} onClick={item.onClick} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{item.hint}</div>
                  </div>
                  <Tag tone={item.tone}>{item.tone === 'danger' ? 'Urgente' : 'Alta'}</Tag>
                </button>
              ))}
            </div>
          </Section>
          <Section theme={theme} title="Scadenze finanziarie" subtitle="Prossimi 30 giorni" icon={Landmark}>
            <div className="stack" style={{ gap: 10 }}>
              {[...db.invoices.map((i) => ({ name: i.number, date: i.dueDate, value: i.amount, status: i.status, kind: 'invoice' })), ...db.payments.map((p) => ({ name: p.supplier, date: p.date, value: p.amount, status: p.status, kind: 'payment' }))].slice(0, 4).map((row, idx) => (
                <button key={`${row.name}-${idx}`} onClick={() => row.kind === 'invoice' ? openRecord('invoice', db.invoices[idx % db.invoices.length]) : openRecord('payment', db.payments[idx % db.payments.length])} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{row.name}</div>
                    <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{formatDate(row.date)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800 }}>{fmtMoney(row.value)}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{row.status}</div>
                  </div>
                </button>
              ))}
            </div>
          </Section>
          <Section theme={theme} title="Apri modulo" subtitle="Scorciatoie operative" icon={Sparkles}>
            <div className="grid-3">
              {[
                ['CRM', Users, 'crm'],
                ['Preventivi', FileText, 'preventivi'],
                ['Cantieri', HardHat, 'cantieri'],
                ['Task', CheckSquare, 'attivita'],
                ['Calendario', Calendar, 'calendario'],
                ['Prodotti', Package, 'magazzino'],
              ].map(([label, Icon, pageKey]) => (
                <button key={label} onClick={() => setPage(pageKey)} style={{ padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer', textAlign: 'left' }}>
                  <Icon size={16} color={COLORS.orange} />
                  <div style={{ marginTop: 10, fontWeight: 800 }}>{label}</div>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </motion.div>
  );
}

function ReportingPage({ theme, db }) {
  const T = tk(theme);
  const divData = [
    { name: 'Cantieri', ricavi: sumBy(db.projects, 'budget') / 1000, margine: 24 },
    { name: 'Infissi', ricavi: sumBy(db.products.filter((p) => p.category === 'Infissi'), 'price') / 10, margine: 31 },
    { name: 'Bagni', ricavi: sumBy(db.products.filter((p) => p.category === 'Bagni'), 'price') / 8, margine: 27 },
    { name: 'Pavimenti', ricavi: sumBy(db.products.filter((p) => p.category === 'Pavimenti'), 'price') / 6, margine: 22 },
  ];
  return (
    <div className="grid-2">
      <Section theme={theme} title="Analisi ricavi e marginalità" subtitle="Confronto tra divisioni e redditività" icon={FileBarChart2} action={<Btn theme={theme} variant="outline" icon={Download} onClick={() => printHtml('Reporting', '<h1>Reporting</h1><p>Esporta PDF via browser.</p>')}>Esporta</Btn>}>
        <div className="stack">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={divData}>
                <CartesianGrid stroke={theme === 'dark' ? '#1d2636' : '#e2e8f0'} vertical={false} />
                <XAxis dataKey="name" stroke={T.muted} tickLine={false} axisLine={false} />
                <YAxis stroke={T.muted} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12 }} />
                <Bar dataKey="ricavi" radius={[10, 10, 0, 0]} fill={COLORS.orange} />
                <Bar dataKey="margine" radius={[10, 10, 0, 0]} fill={COLORS.green} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ClickTable
            theme={theme}
            columns={['Divisione', 'Ricavi indice', 'Margine']}
            rows={divData.map((d) => ({ id: d.name, original: d, cells: [d.name, `${Math.round(d.ricavi)}`, `${d.margine}%`] }))}
          />
        </div>
      </Section>
      <div className="stack">
        <Section theme={theme} title="KPI mensili" subtitle="Indicatori letti dal dataset" icon={ArrowUpRight}>
          <div className="grid-2-even">
            <ValueBox theme={theme} icon={Flame} label="Margine lordo" value="23,8%" hint="stimato" />
            <ValueBox theme={theme} icon={ShoppingCart} label="Incidenza acquisti" value="41,2%" hint="su ricavi" />
            <ValueBox theme={theme} icon={ReceiptText} label="Preventivi attivi" value={String(db.quotes.length)} hint="lavorazione" />
            <ValueBox theme={theme} icon={Users} label="Lead aperti" value={String(db.leads.length)} hint="commerciale" />
          </div>
        </Section>
        <Section theme={theme} title="Executive notes" subtitle="Cosa leggere davvero" icon={AlertCircle}>
          <div className="stack" style={{ gap: 10 }}>
            {[
              'Aumentare conversione lead caldo → sopralluogo.',
              'Legare ogni preventivo accettato a una commessa.',
              'Associare ordini e pagamenti ai cantieri per margini reali.',
            ].map((item) => <div key={item} style={{ padding: 13, borderRadius: 14, background: T.alt, border: `1px solid ${T.borderSoft}`, color: T.text, fontSize: 14 }}>{item}</div>)}
          </div>
        </Section>
      </div>
    </div>
  );
}

function CashFlowPage({ theme, db }) {
  const T = tk(theme);
  const entries = db.invoices.map((i, idx) => ({ week: `W${idx + 1}`, entrate: Number(i.amount || 0), uscite: Number(db.payments[idx]?.amount || 0) }));
  const data = entries.map((row) => ({ ...row, saldo: row.entrate - row.uscite }));
  return (
    <div className="grid-2">
      <Section theme={theme} title="Previsione di cassa" subtitle="Entrate, uscite e saldo" icon={Wallet}>
        <div className="stack">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid stroke={theme === 'dark' ? '#1d2636' : '#e2e8f0'} vertical={false} />
                <XAxis dataKey="week" stroke={T.muted} tickLine={false} axisLine={false} />
                <YAxis stroke={T.muted} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12 }} />
                <Line dataKey="entrate" stroke={COLORS.green} strokeWidth={3} />
                <Line dataKey="uscite" stroke={COLORS.red} strokeWidth={3} />
                <Line dataKey="saldo" stroke={COLORS.orange} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid-3">
            <ValueBox theme={theme} icon={Wallet} label="Saldo disponibile" value={fmtMoney(sumBy(db.invoices, 'amount') - sumBy(db.payments, 'amount'))} />
            <ValueBox theme={theme} icon={Receipt} label="Entrate previste" value={fmtMoney(sumBy(db.invoices, 'amount'))} />
            <ValueBox theme={theme} icon={CreditCard} label="Uscite previste" value={fmtMoney(sumBy(db.payments, 'amount'))} />
          </div>
        </div>
      </Section>
      <Section theme={theme} title="Rischi di liquidità" subtitle="Indicatori da presidiare" icon={AlertTriangle}>
        <div className="stack">
          {[
            `${db.invoices.filter((i) => i.status === 'In scadenza').length} fatture in scadenza`,
            `${db.payments.filter((p) => p.priority === 'Alta').length} pagamenti ad alta priorità`,
            'Collegare cashflow a ordini e SAL quando avrai Supabase.',
          ].map((item) => <div key={item} style={{ padding: 13, borderRadius: 14, background: T.alt, border: `1px solid ${T.borderSoft}`, fontSize: 14 }}>{item}</div>)}
        </div>
      </Section>
    </div>
  );
}

function EntityPage({ theme, title, subtitle, icon, rows, columns, onRowClick, onNew, metrics = [], extraRight = null }) {
  return (
    <div className="grid-2">
      <Section theme={theme} title={title} subtitle={subtitle} icon={icon} action={<Btn theme={theme} icon={Plus} onClick={onNew}>Nuovo</Btn>}>
        <ClickTable theme={theme} columns={columns} rows={rows} onRowClick={onRowClick} />
      </Section>
      <div className="stack">
        {metrics.length ? <Section theme={theme} title="Metriche" subtitle="Indicatori utili" icon={Sparkles}><div className="grid-2-even">{metrics.map((m) => <ValueBox key={m.label} theme={theme} icon={m.icon} label={m.label} value={m.value} hint={m.hint} />)}</div></Section> : null}
        {extraRight}
      </div>
    </div>
  );
}

function CrmPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Lead attivi"
      subtitle="Ogni lead è apribile, modificabile e allegabile"
      icon={Users}
      onNew={() => onNew('lead')}
      onRowClick={(row) => openRecord('lead', row)}
      columns={['Lead', 'Origine', 'Stato', 'Valore', 'Owner']}
      rows={db.leads.map((lead) => ({ id: lead.id, original: lead, cells: [lead.name, lead.source, lead.status, fmtMoney(lead.value), lead.owner || '—'] }))}
      metrics={[
        { label: 'Lead aperti', value: String(db.leads.length), icon: Users },
        { label: 'Valore pipeline', value: fmtMoney(sumBy(db.leads, 'value')), icon: Euro },
        { label: 'Lead caldi', value: String(db.leads.filter((l) => l.status === 'Caldo').length), icon: Flame },
        { label: 'Da trasformare', value: String(db.leads.filter((l) => l.status === 'Preventivo').length), icon: FileText },
      ]}
      extraRight={<Section theme={theme} title="Flusso consigliato" subtitle="Lead → sopralluogo → preventivo → cantiere" icon={ArrowUpRight}><div className="stack" style={{ gap: 10 }}>{['Apri il lead', 'Allega documenti e note', 'Crea sopralluogo dal lead', 'Genera preventivo con template'].map((s, i) => <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, border: `1px solid ${tk(theme).border}`, background: tk(theme).alt }}><div style={{ width: 26, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(249,115,22,.12)', color: COLORS.orangeDark, fontWeight: 800, fontSize: 12 }}>{i + 1}</div><div style={{ fontSize: 14, fontWeight: 700 }}>{s}</div></div>)}</div></Section>}
    />
  );
}

function VisitsPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Sopralluoghi"
      subtitle="Schede apribili con note e allegati"
      icon={CalendarDays}
      onNew={() => onNew('visit')}
      onRowClick={(row) => openRecord('visit', row)}
      columns={['Titolo', 'Cliente', 'Data', 'Tecnico', 'Stato']}
      rows={db.visits.map((v) => ({ id: v.id, original: v, cells: [v.title, v.client, formatDate(v.date), v.owner, v.status] }))}
      metrics={[
        { label: 'Sopralluoghi', value: String(db.visits.length), icon: CalendarDays },
        { label: 'Confermati', value: String(db.visits.filter((v) => v.status === 'Confermato').length), icon: CheckCircle2 },
        { label: 'Da eseguire', value: String(db.visits.filter((v) => v.status === 'Da eseguire').length), icon: Clock3 },
        { label: 'Con allegati', value: String(db.visits.filter((v) => (v.attachments || []).length > 0).length), icon: Upload },
      ]}
    />
  );
}

function QuotesPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Preventivi"
      subtitle="Nuovi preventivi da template e PDF in un click"
      icon={FileText}
      onNew={() => onNew('quote')}
      onRowClick={(row) => openRecord('quote', row)}
      columns={['Titolo', 'Cliente', 'Template', 'Stato', 'Totale']}
      rows={db.quotes.map((q) => ({ id: q.id, original: q, cells: [q.title, q.client, QUOTE_TEMPLATES[q.template]?.label || q.template, q.status, fmtMoney(buildQuoteTotal(q))] }))}
      metrics={[
        { label: 'Preventivi attivi', value: String(db.quotes.length), icon: FileText },
        { label: 'Bozze', value: String(db.quotes.filter((q) => q.status === 'Bozza').length), icon: Wrench },
        { label: 'Accettati', value: String(db.quotes.filter((q) => q.status === 'Accettato').length), icon: CheckCircle2 },
        { label: 'Valore totale', value: fmtMoney(db.quotes.reduce((acc, q) => acc + buildQuoteTotal(q), 0)), icon: Euro },
      ]}
      extraRight={<Section theme={theme} title="Template disponibili" subtitle="Riduci il tempo di emissione" icon={ReceiptText}><div className="stack" style={{ gap: 10 }}>{Object.entries(QUOTE_TEMPLATES).map(([key, tpl]) => <div key={key} style={{ padding: 12, borderRadius: 14, border: `1px solid ${tk(theme).border}`, background: tk(theme).alt }}><div style={{ fontWeight: 800 }}>{tpl.label}</div><div style={{ fontSize: 12, color: tk(theme).muted, marginTop: 4 }}>{tpl.items.length} righe base</div></div>)}</div></Section>}
    />
  );
}

function ShowroomPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Showroom"
      subtitle="Schede selezione apribili e modificabili"
      icon={Sparkles}
      onNew={() => onNew('showroom')}
      onRowClick={(row) => openRecord('showroom', row)}
      columns={['Cliente', 'Ambiente', 'Selezione', 'Importo', 'Stato']}
      rows={db.showroom.map((s) => ({ id: s.id, original: s, cells: [s.client, s.environment, s.selection, fmtMoney(s.amount), s.status] }))}
      metrics={[
        { label: 'Selezioni', value: String(db.showroom.length), icon: Sparkles },
        { label: 'In revisione', value: String(db.showroom.filter((s) => s.status === 'In revisione').length), icon: Eye },
        { label: 'Confermate', value: String(db.showroom.filter((s) => s.status === 'Confermato').length), icon: CheckCircle2 },
        { label: 'Valore', value: fmtMoney(sumBy(db.showroom, 'amount')), icon: Euro },
      ]}
    />
  );
}

function ProjectsPage({ theme, db, openRecord, onNew }) {
  const T = tk(theme);
  return (
    <div className="grid-2">
      <Section theme={theme} title="Cantieri" subtitle="Ogni cantiere è apribile e modificabile" icon={HardHat} action={<Btn theme={theme} icon={Plus} onClick={() => onNew('project')}>Nuovo cantiere</Btn>}>
        <div className="stack">
          {db.projects.map((project) => (
            <button key={project.id} onClick={() => openRecord('project', project)} style={{ textAlign: 'left', width: '100%', padding: 16, borderRadius: 16, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 900 }}>{project.name}</div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 12, flexWrap: 'wrap', color: T.muted, fontSize: 13 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Users size={14} />{project.client}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><MapPin size={14} />{project.address}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Wrench size={14} />{project.responsabile}</span>
                  </div>
                </div>
                <Tag tone={project.status.includes('Quasi') ? 'success' : 'info'}>{project.status}</Tag>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: T.muted, marginBottom: 8 }}>
                  <span>Avanzamento</span><span>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>
              <div className="grid-3" style={{ marginTop: 14 }}>
                <ValueBox theme={theme} icon={Euro} label="Budget" value={fmtMoney(project.budget)} />
                <ValueBox theme={theme} icon={CalendarDays} label="Inizio" value={formatDate(project.startDate)} />
                <ValueBox theme={theme} icon={AlertCircle} label="Note" value={project.notes ? 'Presenti' : '—'} hint="apri per modificare" />
              </div>
            </button>
          ))}
        </div>
      </Section>
      <div className="stack">
        <Section theme={theme} title="KPI cantieri" subtitle="Tutto basato sui record" icon={Factory}>
          <div className="grid-2-even">
            <ValueBox theme={theme} icon={HardHat} label="Cantieri attivi" value={String(db.projects.length)} />
            <ValueBox theme={theme} icon={Euro} label="Budget totale" value={fmtMoney(sumBy(db.projects, 'budget'))} />
            <ValueBox theme={theme} icon={CheckSquare} label="Task collegate" value={String(db.tasks.length)} />
            <ValueBox theme={theme} icon={Receipt} label="Fatture collegate" value={String(db.invoices.length)} />
          </div>
        </Section>
        <Section theme={theme} title="Come usarlo meglio" subtitle="Logica gestionale" icon={ArrowUpRight}>
          <div className="stack" style={{ gap: 10 }}>
            {['Apri il cantiere e aggiorna budget, responsabile e date.', 'Collega task, documenti, ordini e sopralluoghi al nome cantiere.', 'Usa la scheda cantiere come record master finché non colleghi Supabase.'].map((txt) => <div key={txt} style={{ padding: 12, borderRadius: 14, background: T.alt, border: `1px solid ${T.borderSoft}`, fontSize: 14 }}>{txt}</div>)}
          </div>
        </Section>
      </div>
    </div>
  );
}

function TaskBoardPage({ theme, db, openRecord, onNew, moveTask }) {
  const T = tk(theme);
  const stages = [
    { key: 'todo', label: 'Da fare', tone: 'default' },
    { key: 'in_progress', label: 'In corso', tone: 'warning' },
    { key: 'review', label: 'Revisione', tone: 'info' },
    { key: 'done', label: 'Fatto', tone: 'success' },
  ];
  return (
    <div className="stack">
      <Section theme={theme} title="Workflow task" subtitle="Board ispirata ad Asana, collegata ai cantieri" icon={CheckSquare} action={<Btn theme={theme} icon={Plus} onClick={() => onNew('task')}>Nuova task</Btn>}>
        <div className="kanban-grid">
          {stages.map((stage) => (
            <div key={stage.key} style={{ minWidth: 260, background: T.alt, border: `1px solid ${T.borderSoft}`, borderRadius: 16, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontWeight: 900 }}>{stage.label}</div>
                <Tag tone={stage.tone}>{db.tasks.filter((t) => t.stage === stage.key).length}</Tag>
              </div>
              <div className="stack" style={{ gap: 10 }}>
                {db.tasks.filter((t) => t.stage === stage.key).map((task) => (
                  <div key={task.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: 12 }}>
                    <button onClick={() => openRecord('task', task)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 0, color: T.text, cursor: 'pointer', padding: 0 }}>
                      <div style={{ fontWeight: 800 }}>{task.title}</div>
                      <div style={{ fontSize: 12, color: T.muted, marginTop: 6 }}>{task.project || 'Non collegato'} · {task.assignee || '—'}</div>
                    </button>
                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <Tag tone={task.priority === 'Urgente' ? 'danger' : task.priority === 'Alta' ? 'warning' : 'default'}>{task.priority}</Tag>
                      <select value={task.stage} onChange={(e) => moveTask(task.id, e.target.value)} style={{ borderRadius: 10, border: `1px solid ${T.border}`, background: T.alt, color: T.text, padding: '7px 10px' }}>
                        {stages.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function DocumentsPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Documenti"
      subtitle="Archivio funzionante con upload locale"
      icon={Archive}
      onNew={() => onNew('document')}
      onRowClick={(row) => openRecord('document', row)}
      columns={['Documento', 'Categoria', 'Cantiere', 'Data', 'File']}
      rows={db.documents.map((d) => ({ id: d.id, original: d, cells: [d.name, d.category, d.project || '—', formatDate(d.uploadedAt), d.fileName || 'Nessun file'] }))}
      metrics={[
        { label: 'Documenti', value: String(db.documents.length), icon: Archive },
        { label: 'Con file', value: String(db.documents.filter((d) => d.fileName).length), icon: Upload },
        { label: 'Sicurezza', value: String(db.documents.filter((d) => d.category === 'Sicurezza').length), icon: Shield },
        { label: 'Commerciale', value: String(db.documents.filter((d) => d.category === 'Commerciale').length), icon: FileText },
      ]}
    />
  );
}

function CalendarPage({ theme, db, openRecord, onNew }) {
  const [month, setMonth] = useState(new Date('2026-03-01T12:00:00'));
  const T = tk(theme);
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDay = (start.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(month.getFullYear(), month.getMonth(), 1 - startDay + i);
    days.push(d);
  }
  return (
    <div className="grid-2">
      <Section theme={theme} title="Calendario operativo" subtitle="Clicca il giorno o l'evento per modificarlo" icon={Calendar} action={<div style={{ display: 'flex', gap: 8 }}><Btn theme={theme} variant="outline" icon={ChevronLeft} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} /><Btn theme={theme} variant="outline" icon={ChevronRight} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} /></div>}>
        <div style={{ marginBottom: 14, fontSize: 22, fontWeight: 900, letterSpacing: '-.03em' }}>{monthLabel(month)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: 8, marginBottom: 8 }}>
          {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map((d) => <div key={d} style={{ fontSize: 11, textTransform: 'uppercase', color: T.muted, fontWeight: 800, padding: '0 6px' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: 8 }}>
          {days.map((date) => {
            const iso = toISODate(date);
            const events = db.events.filter((ev) => ev.date === iso);
            const inMonth = date.getMonth() === month.getMonth();
            return (
              <button key={iso} onClick={() => onNew('event', { date: iso })} style={{ minHeight: 112, textAlign: 'left', padding: 10, borderRadius: 16, border: `1px solid ${inMonth ? T.border : T.borderSoft}`, background: inMonth ? T.card : T.alt, color: inMonth ? T.text : T.muted, cursor: 'pointer' }}>
                <div style={{ fontSize: 13, fontWeight: 800 }}>{date.getDate()}</div>
                <div className="stack" style={{ gap: 6, marginTop: 8 }}>
                  {events.slice(0, 3).map((ev) => (
                    <div key={ev.id} onClick={(e) => { e.stopPropagation(); openRecord('event', ev); }} style={{ padding: '6px 8px', borderRadius: 10, background: 'rgba(249,115,22,.1)', color: COLORS.orangeDark, fontSize: 11, fontWeight: 700, border: '1px solid rgba(249,115,22,.18)' }}>{ev.title}</div>
                  ))}
                  {events.length > 3 ? <div style={{ fontSize: 11, color: T.muted }}>+{events.length - 3} altri</div> : null}
                </div>
              </button>
            );
          })}
        </div>
      </Section>
      <div className="stack">
        <Section theme={theme} title="Eventi del mese" subtitle="Lista cliccabile" icon={CalendarDays} action={<Btn theme={theme} icon={Plus} onClick={() => onNew('event')}>Nuovo evento</Btn>}>
          <div className="stack" style={{ gap: 10 }}>
            {db.events.filter((ev) => new Date(ev.date).getMonth() === month.getMonth()).map((ev) => (
              <button key={ev.id} onClick={() => openRecord('event', ev)} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.alt, color: T.text, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{ev.title}</div>
                    <div style={{ marginTop: 5, color: T.muted, fontSize: 12 }}>{formatDate(ev.date)} · {ev.related || '—'}</div>
                  </div>
                  <Tag tone={ev.type === 'Finance' ? 'danger' : ev.type === 'Sopralluogo' ? 'warning' : 'info'}>{ev.type}</Tag>
                </div>
              </button>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function ProductsPage({ theme, db, openRecord, onNew, category }) {
  const rows = db.products.filter((p) => category === 'Tutti' || p.category === category);
  return (
    <EntityPage
      theme={theme}
      title={category === 'Tutti' ? 'Magazzino prodotti' : category}
      subtitle="Ogni prodotto include anche i campi necessari per Shopify"
      icon={category === 'Infissi' ? DoorOpen : category === 'Pavimenti' ? SquareStack : category === 'Bagni' ? Bath : Boxes}
      onNew={() => onNew('product', { category: category === 'Tutti' ? 'Infissi' : category })}
      onRowClick={(row) => openRecord('product', row)}
      columns={['SKU', 'Prodotto', 'Categoria', 'Prezzo', 'Stock']}
      rows={rows.map((p) => ({ id: p.id, original: p, cells: [p.sku || '—', p.name, p.category, fmtMoney(p.price), String(p.stock)] }))}
      metrics={[
        { label: 'Prodotti', value: String(rows.length), icon: Package },
        { label: 'Attivi', value: String(rows.filter((p) => p.status === 'Attivo').length), icon: CheckCircle2 },
        { label: 'Pronti Shopify', value: String(rows.filter((p) => p.shopifyHandle && p.shopifyTitle).length), icon: Store },
        { label: 'Valore stock', value: fmtMoney(rows.reduce((acc, p) => acc + Number(p.price || 0) * Number(p.stock || 0), 0)), icon: Euro },
      ]}
    />
  );
}

function ShopifyPage({ theme, db, settings, setSettings }) {
  const ready = db.products.filter((p) => p.shopifyHandle && p.shopifyTitle && p.sku).length;
  const rows = db.products.map((p) => ({
    Handle: p.shopifyHandle,
    Title: p.shopifyTitle || p.name,
    'Body (HTML)': p.description,
    Vendor: p.shopifyVendor || p.brand,
    'Product Category': p.category,
    Type: p.shopifyType || p.category,
    Tags: p.tags,
    Published: p.published || 'FALSE',
    'Option1 Name': 'Title',
    'Option1 Value': 'Default Title',
    'Variant SKU': p.sku,
    'Variant Price': p.price,
    'Variant Inventory Qty': p.stock,
    'Image Src': p.imageUrl,
    Barcode: p.barcode,
  }));
  return (
    <div className="grid-2">
      <Section theme={theme} title="Connettore Shopify" subtitle="Per ora export CSV pronto import, più settaggi API" icon={Store} action={<Btn theme={theme} icon={Download} onClick={() => exportCsv('shopify-products.csv', rows)}>Esporta CSV</Btn>}>
        <div className="grid-3">
          <ValueBox theme={theme} icon={PackageCheck} label="Prodotti pronti" value={String(ready)} />
          <ValueBox theme={theme} icon={Store} label="Store URL" value={settings.shopifyStoreUrl || 'non impostato'} />
          <ValueBox theme={theme} icon={Database} label="Catalogo" value={String(db.products.length)} hint="record esportabili" />
        </div>
        <div style={{ marginTop: 18 }}>
          <ClickTable theme={theme} columns={['Handle', 'Titolo', 'SKU', 'Prezzo', 'Pubblicato']} rows={db.products.map((p) => ({ id: p.id, original: p, cells: [p.shopifyHandle || '—', p.shopifyTitle || p.name, p.sku, fmtMoney(p.price), p.published || 'FALSE'] }))} />
        </div>
      </Section>
      <Section theme={theme} title="Impostazioni Shopify" subtitle="Compila i dati così sei pronto per Supabase Edge Functions o backend" icon={Settings}>
        <div className="stack">
          <Field theme={theme} label="Store URL" value={settings.shopifyStoreUrl} onChange={(v) => setSettings({ ...settings, shopifyStoreUrl: v })} placeholder="https://tuo-store.myshopify.com" />
          <Field theme={theme} label="Admin access token" value={settings.shopifyToken} onChange={(v) => setSettings({ ...settings, shopifyToken: v })} placeholder="shpat_xxx" />
          <div style={{ padding: 14, borderRadius: 16, background: tk(theme).alt, border: `1px solid ${tk(theme).borderSoft}`, color: tk(theme).text, lineHeight: 1.6, fontSize: 14 }}>
            Questo file prepara il catalogo in modo coerente per Shopify. Per la sincronizzazione reale ti serviranno un backend o Edge Function che leggano i prodotti dal database e chiamino le API Admin di Shopify in sicurezza.
          </div>
        </div>
      </Section>
    </div>
  );
}

function InvoicesPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Fatture"
      subtitle="Schede apribili con PDF"
      icon={Receipt}
      onNew={() => onNew('invoice')}
      onRowClick={(row) => openRecord('invoice', row)}
      columns={['Numero', 'Cliente', 'Tipo', 'Importo', 'Stato']}
      rows={db.invoices.map((i) => ({ id: i.id, original: i, cells: [i.number || 'Bozza', i.client, i.type, fmtMoney(i.amount), i.status] }))}
      metrics={[
        { label: 'Fatture', value: String(db.invoices.length), icon: Receipt },
        { label: 'In scadenza', value: String(db.invoices.filter((i) => i.status === 'In scadenza').length), icon: AlertTriangle },
        { label: 'Incassate', value: String(db.invoices.filter((i) => i.status === 'Incassata').length), icon: CheckCircle2 },
        { label: 'Totale', value: fmtMoney(sumBy(db.invoices, 'amount')), icon: Euro },
      ]}
    />
  );
}

function PaymentsPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Pagamenti"
      subtitle="Scadenze e priorità modificabili"
      icon={CreditCard}
      onNew={() => onNew('payment')}
      onRowClick={(row) => openRecord('payment', row)}
      columns={['Fornitore', 'Data', 'Importo', 'Priorità', 'Stato']}
      rows={db.payments.map((p) => ({ id: p.id, original: p, cells: [p.supplier, formatDate(p.date), fmtMoney(p.amount), p.priority, p.status] }))}
      metrics={[
        { label: 'Pagamenti', value: String(db.payments.length), icon: CreditCard },
        { label: 'Alta priorità', value: String(db.payments.filter((p) => p.priority === 'Alta').length), icon: AlertTriangle },
        { label: 'Autorizzati', value: String(db.payments.filter((p) => p.status === 'Autorizzato').length), icon: CheckCircle2 },
        { label: 'Totale', value: fmtMoney(sumBy(db.payments, 'amount')), icon: Euro },
      ]}
    />
  );
}

function CompliancePage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Compliance"
      subtitle="Scadenze DURC, assicurazioni e sicurezza"
      icon={ShieldCheck}
      onNew={() => onNew('compliance')}
      onRowClick={(row) => openRecord('compliance', row)}
      columns={['Voce', 'Responsabile', 'Scadenza', 'Stato']}
      rows={db.compliance.map((c) => ({ id: c.id, original: c, cells: [c.title, c.owner, formatDate(c.dueDate), c.status] }))}
      metrics={[
        { label: 'Adempimenti', value: String(db.compliance.length), icon: Shield },
        { label: 'Urgenti', value: String(db.compliance.filter((c) => c.status === 'Urgente').length), icon: AlertTriangle },
        { label: 'Completati', value: String(db.compliance.filter((c) => c.status === 'Completato').length), icon: CheckCircle2 },
        { label: 'In rinnovo', value: String(db.compliance.filter((c) => c.status === 'In rinnovo').length), icon: RefreshCcw },
      ]}
    />
  );
}

function OrdersPage({ theme, db, openRecord, onNew }) {
  return (
    <EntityPage
      theme={theme}
      title="Ordini fornitori"
      subtitle="Ordini apribili e collegabili al cantiere"
      icon={ShoppingCart}
      onNew={() => onNew('order')}
      onRowClick={(row) => openRecord('order', row)}
      columns={['Fornitore', 'Categoria', 'Importo', 'Commessa', 'Stato']}
      rows={db.orders.map((o) => ({ id: o.id, original: o, cells: [o.supplier, o.category, fmtMoney(o.amount), o.project || '—', o.status] }))}
      metrics={[
        { label: 'Ordini', value: String(db.orders.length), icon: ShoppingCart },
        { label: 'Da approvare', value: String(db.orders.filter((o) => o.status === 'Da approvare').length), icon: AlertCircle },
        { label: 'In consegna', value: String(db.orders.filter((o) => o.status === 'In consegna').length), icon: Truck },
        { label: 'Totale', value: fmtMoney(sumBy(db.orders, 'amount')), icon: Euro },
      ]}
    />
  );
}

function TeamsPage({ theme, db }) {
  const T = tk(theme);
  const teamRows = [
    { name: 'Luca Rinaldi', role: 'Direttore tecnico', status: 'Disponibile', hours: '41h', team: 'Cantieri' },
    { name: 'Sara Leone', role: 'PM ristrutturazioni', status: 'Sopralluogo', hours: '38h', team: 'Commerciale' },
    { name: 'Marco Sala', role: 'Capocantiere', status: 'In cantiere', hours: '44h', team: 'Operativo' },
  ];
  return (
    <div className="grid-2">
      <Section theme={theme} title="Squadre" subtitle="Vista operativa delle risorse" icon={Users}>
        <ClickTable theme={theme} columns={['Nome', 'Ruolo', 'Stato', 'Ore', 'Team']} rows={teamRows.map((r) => ({ id: r.name, original: r, cells: [r.name, r.role, r.status, r.hours, r.team] }))} />
      </Section>
      <Section theme={theme} title="Capacità" subtitle="Metriche rapide" icon={Wrench}>
        <div className="grid-2-even">
          <ValueBox theme={theme} icon={Users} label="Risorse visibili" value={String(teamRows.length)} />
          <ValueBox theme={theme} icon={Clock3} label="Ore registrate" value="123h" />
          <ValueBox theme={theme} icon={Truck} label="Mezzi prenotati" value="5" />
          <ValueBox theme={theme} icon={AlertTriangle} label="Assenze" value="2" />
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: T.muted }}>Questa pagina resta dimostrativa, ma ora è coerente con il resto del gestionale.</div>
      </Section>
    </div>
  );
}

function AdminPanel({ theme, clients, setClients, onBack }) {
  const T = tk(theme);
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, padding: 24 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }} className="stack">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-.05em' }}>Admin clienti</div>
            <div style={{ color: T.muted, marginTop: 6 }}>Attivazione moduli e controllo tenant demo.</div>
          </div>
          <Btn theme={theme} variant="outline" onClick={onBack}>Torna app</Btn>
        </div>
        {clients.map((client) => (
          <Section key={client.id} theme={theme} title={client.name} subtitle={`${client.plan} · ${client.city}`} icon={Crown}>
            <div className="grid-4">
              {Object.keys(client.modules).map((mod) => (
                <label key={mod} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: 12, borderRadius: 14, background: T.alt, border: `1px solid ${T.borderSoft}` }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{mod}</span>
                  <input type="checkbox" checked={client.modules[mod]} onChange={(e) => setClients((prev) => prev.map((c) => c.id === client.id ? { ...c, modules: { ...c.modules, [mod]: e.target.checked } } : c))} />
                </label>
              ))}
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}

function renderPage(page, ctx) {
  switch (page) {
    case 'dashboard': return <DashboardPage {...ctx} />;
    case 'reporting': return <ReportingPage {...ctx} />;
    case 'cashflow': return <CashFlowPage {...ctx} />;
    case 'crm': return <CrmPage {...ctx} />;
    case 'sopralluoghi': return <VisitsPage {...ctx} />;
    case 'preventivi': return <QuotesPage {...ctx} />;
    case 'showroom': return <ShowroomPage {...ctx} />;
    case 'cantieri': return <ProjectsPage {...ctx} />;
    case 'attivita': return <TaskBoardPage {...ctx} />;
    case 'squadre': return <TeamsPage {...ctx} />;
    case 'documenti': return <DocumentsPage {...ctx} />;
    case 'calendario': return <CalendarPage {...ctx} />;
    case 'infissi': return <ProductsPage {...ctx} category="Infissi" />;
    case 'pavimenti': return <ProductsPage {...ctx} category="Pavimenti" />;
    case 'bagni': return <ProductsPage {...ctx} category="Bagni" />;
    case 'magazzino': return <ProductsPage {...ctx} category="Tutti" />;
    case 'shopify': return <ShopifyPage {...ctx} settings={ctx.db.settings} setSettings={(settings) => ctx.setDb((prev) => ({ ...prev, settings }))} />;
    case 'ordini': return <OrdersPage {...ctx} />;
    case 'fatture': return <InvoicesPage {...ctx} />;
    case 'pagamenti': return <PaymentsPage {...ctx} />;
    case 'compliance': return <CompliancePage {...ctx} />;
    default: return <DashboardPage {...ctx} />;
  }
}

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('app');
  const [page, setPage] = useStoredState('cd_page', 'dashboard');
  const [theme, setTheme] = useStoredState('cd_theme', 'light');
  const [clients, setClients] = useStoredState('cd_clients', CLIENTS);
  const [db, setDb] = useStoredState('cd_db_realistic_v1', seedDb());
  const [search, setSearch] = useState('');
  const [sideOpen, setSideOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [editor, setEditor] = useState({ type: null, record: null });
  const { toast, push } = useToast();

  const isAdmin = user?.role === 'admin';
  const activeClient = isAdmin ? clients[0] : clients.find((c) => c.id === user?.client) || clients[0];
  const modules = activeClient?.modules || {};
  const safePage = modules[page] === false ? 'dashboard' : page;

  useEffect(() => {
    if (safePage !== page) setPage(safePage);
  }, [safePage, page, setPage]);

  const openRecord = useCallback((type, record) => setEditor({ type, record: JSON.parse(JSON.stringify(record)) }), []);
  const onNew = useCallback((type, preset = {}) => {
    const empty = EMPTY[type]?.(preset.category) || {};
    setEditor({ type, record: { ...empty, ...preset } });
  }, []);

  const saveRecord = useCallback((type, record) => {
    const collection = COLLECTION_BY_TYPE[type];
    if (!collection) return;
    const normalized = type === 'quote' ? { ...record, total: buildQuoteTotal(record) } : record;
    setDb((prev) => ({
      ...prev,
      [collection]: prev[collection].some((item) => item.id === normalized.id)
        ? prev[collection].map((item) => item.id === normalized.id ? normalized : item)
        : [normalized, ...prev[collection]],
    }));
    setEditor({ type: null, record: null });
    push('Salvataggio completato', 'success');
  }, [push, setDb]);

  const deleteRecord = useCallback((type, id) => {
    const collection = COLLECTION_BY_TYPE[type];
    if (!collection) return;
    setDb((prev) => ({ ...prev, [collection]: prev[collection].filter((item) => item.id !== id) }));
    setEditor({ type: null, record: null });
    push('Record eliminato', 'danger');
  }, [push, setDb]);

  const moveTask = useCallback((id, stage) => {
    setDb((prev) => ({ ...prev, tasks: prev.tasks.map((task) => task.id === id ? { ...task, stage } : task) }));
    push('Workflow aggiornato', 'success');
  }, [push, setDb]);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const sources = [
      ...db.leads.map((x) => ({ key: `lead-${x.id}`, page: 'crm', type: 'lead', record: x, title: x.name, subtitle: `Lead · ${x.status} · ${x.source}` })),
      ...db.visits.map((x) => ({ key: `visit-${x.id}`, page: 'sopralluoghi', type: 'visit', record: x, title: x.title, subtitle: `Sopralluogo · ${x.client}` })),
      ...db.quotes.map((x) => ({ key: `quote-${x.id}`, page: 'preventivi', type: 'quote', record: x, title: x.title, subtitle: `Preventivo · ${x.client}` })),
      ...db.projects.map((x) => ({ key: `project-${x.id}`, page: 'cantieri', type: 'project', record: x, title: x.name, subtitle: `Cantiere · ${x.client}` })),
      ...db.tasks.map((x) => ({ key: `task-${x.id}`, page: 'attivita', type: 'task', record: x, title: x.title, subtitle: `Task · ${x.project}` })),
      ...db.documents.map((x) => ({ key: `doc-${x.id}`, page: 'documenti', type: 'document', record: x, title: x.name, subtitle: `Documento · ${x.project || x.category}` })),
      ...db.products.map((x) => ({ key: `prd-${x.id}`, page: x.category === 'Infissi' ? 'infissi' : x.category === 'Pavimenti' ? 'pavimenti' : 'bagni', type: 'product', record: x, title: x.name, subtitle: `Prodotto · ${x.sku}` })),
      ...db.invoices.map((x) => ({ key: `inv-${x.id}`, page: 'fatture', type: 'invoice', record: x, title: x.number || 'Bozza fattura', subtitle: `Fattura · ${x.client}` })),
      ...db.compliance.map((x) => ({ key: `cmp-${x.id}`, page: 'compliance', type: 'compliance', record: x, title: x.title, subtitle: `Compliance · ${x.owner}` })),
    ];
    return sources.filter((item) => (`${item.title} ${item.subtitle}`).toLowerCase().includes(q)).slice(0, 12);
  }, [search, db]);

  const notificationItems = useMemo(() => ([
    ...db.compliance.map((c) => ({ id: `cmp-${c.id}`, title: c.title, subtitle: `Compliance · ${c.owner} · scade ${formatDate(c.dueDate)}`, page: 'compliance', type: 'compliance', record: c, tone: c.status === 'Urgente' ? 'danger' : 'warning', tag: c.status, icon: ShieldCheck })),
    ...db.invoices.filter((i) => i.status === 'In scadenza' || i.status === 'Bozza').map((i) => ({ id: `inv-${i.id}`, title: i.number || 'Bozza fattura', subtitle: `Fatture · ${i.client} · ${fmtMoney(i.amount)}`, page: 'fatture', type: 'invoice', record: i, tone: i.status === 'In scadenza' ? 'danger' : 'warning', tag: i.status, icon: Receipt })),
    ...db.tasks.filter((t) => t.stage !== 'done').slice(0, 4).map((t) => ({ id: `task-${t.id}`, title: t.title, subtitle: `Task · ${t.project} · scade ${formatDate(t.dueDate)}`, page: 'attivita', type: 'task', record: t, tone: t.priority === 'Alta' ? 'warning' : 'info', tag: t.priority, icon: CheckSquare })),
    ...db.visits.slice(0, 4).map((v) => ({ id: `visit-${v.id}`, title: v.title, subtitle: `Sopralluogo · ${v.client} · ${formatDate(v.date)}`, page: 'sopralluoghi', type: 'visit', record: v, tone: v.status === 'Da eseguire' ? 'warning' : 'info', tag: v.status, icon: CalendarDays })),
  ]).sort((a, b) => a.title.localeCompare(b.title)).slice(0, 12), [db]);

  const openSearchResult = useCallback((result) => {
    setSearch('');
    setPage(result.page);
    openRecord(result.type, result.record);
  }, [openRecord, setPage]);

  const openNotification = useCallback((item) => {
    setNotificationsOpen(false);
    setPage(item.page);
    openRecord(item.type, item.record);
  }, [openRecord, setPage]);

  if (!user) {
    return <><GlobalStyles /><Login onLogin={(u) => { setUser(u); setView(u.role === 'admin' ? 'admin' : 'app'); }} /></>;
  }

  if (view === 'admin' && isAdmin) {
    return <><GlobalStyles /><AdminPanel theme={theme} clients={clients} setClients={setClients} onBack={() => setView('app')} /></>;
  }

  const ctx = { theme, db, setDb, openRecord, onNew, setPage, moveTask };
  const T = tk(theme);

  return (
    <>
      <GlobalStyles />
      <div className="app-shell" style={{ background: T.shell, color: T.text, fontFamily: T.font }}>
        <Sidebar theme={theme} page={safePage} setPage={setPage} activeClient={activeClient} onLogout={() => { setUser(null); setView('app'); }} sideOpen={sideOpen} setSideOpen={setSideOpen} setView={setView} isAdmin={isAdmin} />
        <div className="main-panel">
          <Topbar theme={theme} page={safePage} setTheme={setTheme} search={search} setSearch={setSearch} results={searchResults} onSelectResult={openSearchResult} onNew={() => {
            const map = { crm: 'lead', sopralluoghi: 'visit', preventivi: 'quote', showroom: 'showroom', cantieri: 'project', attivita: 'task', documenti: 'document', calendario: 'event', infissi: 'product', pavimenti: 'product', bagni: 'product', magazzino: 'product', ordini: 'order', fatture: 'invoice', pagamenti: 'payment', compliance: 'compliance' };
            onNew(map[safePage] || 'lead', safePage === 'infissi' ? { category: 'Infissi' } : safePage === 'pavimenti' ? { category: 'Pavimenti' } : safePage === 'bagni' ? { category: 'Bagni' } : {});
          }} setSideOpen={setSideOpen} notifications={notificationItems.length} onOpenNotifications={() => setNotificationsOpen(true)} />
          <AnimatePresence mode="wait">
            <motion.div key={safePage} className="page-wrap" style={{ flex: 1, minHeight: 0 }} variants={pageMotion} initial="initial" animate="animate" exit="exit">
              {renderPage(safePage, ctx)}
            </motion.div>
          </AnimatePresence>
          <div style={{ padding: '10px 24px', borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 11, color: T.muted }}>
            <span>CantiereDigitale — {activeClient?.name}</span>
            <span>Versione demo operativa locale · pronta per Supabase</span>
          </div>
        </div>
      </div>
      <NotificationsSheet theme={theme} open={notificationsOpen} onClose={() => setNotificationsOpen(false)} items={notificationItems} onSelect={openNotification} />
      <GenericEditorModal
        theme={theme}
        type={editor.type}
        record={editor.record}
        open={!!editor.type}
        onClose={() => setEditor({ type: null, record: null })}
        onSave={(rec) => saveRecord(editor.type, rec)}
        onDelete={(id) => deleteRecord(editor.type, id)}
        settings={db.settings}
      />
      <Toast toast={toast} theme={theme} />
    </>
  );
}
