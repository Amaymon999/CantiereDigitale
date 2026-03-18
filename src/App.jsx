import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import {
  LayoutDashboard, HardHat, Users, FileText, Receipt, Wallet, Package,
  Truck, CalendarDays, CheckSquare, Bath, DoorOpen, SquareStack,
  AlertTriangle, BellRing, Search, Plus, Euro, FileBarChart2, ShieldCheck,
  MapPin, Hammer, ShoppingCart, Boxes, Sparkles, CreditCard,
  Archive, Landmark, UserCog, RefreshCcw, Store, Upload, Download, Database,
  PackageCheck, Layers3, SlidersHorizontal, Moon, SunMedium, Shield, Wrench,
  Flame, ReceiptText, BarChart3, CheckCircle2, Factory, X, ChevronRight,
  Crown, Bell, Eye, EyeOff, TrendingUp, Clock, Zap, Building,
  Calendar, ChevronLeft, AlertCircle, Settings,
} from 'lucide-react';

// ─── COLORI ───────────────────────────────────────────────────────────────────
const C = {
  orange: '#f97316', orangeDark: '#ea580c', orangeLight: '#fff7ed', orangeMid: '#fed7aa',
  slate50: '#f8fafc', slate100: '#f1f5f9', slate200: '#e2e8f0',
  slate400: '#94a3b8', slate500: '#64748b', slate900: '#0f172a',
  darkBg: '#09090f', darkCard: '#111118', darkBorder: '#1e2030', darkAlt: '#16161f',
  green: '#10b981', red: '#ef4444', sky: '#0ea5e9', amber: '#f59e0b',
};

// ─── TEMA ─────────────────────────────────────────────────────────────────────
function tk(theme) {
  const d = theme === 'dark';
  return {
    bg: d ? C.darkBg : C.slate50,
    card: d ? C.darkCard : '#ffffff',
    alt: d ? C.darkAlt : C.slate50,
    border: d ? C.darkBorder : C.slate200,
    borderSoft: d ? '#252535' : C.slate100,
    text: d ? '#f1f5f9' : C.slate900,
    muted: d ? C.slate400 : C.slate500,
    faint: d ? C.slate500 : '#94a3b8',
    sidebar: d ? '#07070d' : '#ffffff',
    topbar: d ? 'rgba(9,9,15,.93)' : 'rgba(255,255,255,.96)',
    hover: d ? '#1a1a28' : C.slate50,
    activeNav: d ? '#1e1e2e' : C.orangeLight,
    activeText: d ? '#ffffff' : C.orangeDark,
    activeBorder: d ? '#2d2d45' : C.orangeMid,
    accent: d ? '#fb923c' : C.orangeDark,
    grid: d ? '#1e293b' : '#f1f5f9',
    tooltip: d ? '#0f172a' : '#ffffff',
  };
}

const ttS = (theme) => ({
  contentStyle: { background: tk(theme).tooltip, border: `1px solid ${tk(theme).border}`, borderRadius: 10, fontSize: 12 },
  itemStyle: { color: tk(theme).text },
});

// ─── LOGO ─────────────────────────────────────────────────────────────────────
const CDLogo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="18" fill="#111"/>
    <rect x="34" y="26" width="13" height="54" fill="white"/>
    <rect x="37" y="30" width="7" height="7" fill="#111"/>
    <rect x="37" y="41" width="7" height="7" fill="#111"/>
    <rect x="37" y="52" width="7" height="7" fill="#111"/>
    <rect x="37" y="63" width="7" height="7" fill="#111"/>
    <rect x="47" y="26" width="24" height="9" fill="white"/>
    <rect x="50" y="28" width="6" height="5" fill="#111"/>
    <rect x="59" y="28" width="6" height="5" fill="#111"/>
    <polygon points="34,26 46,26 46,17" fill="white"/>
    <rect x="68" y="35" width="4" height="22" fill={C.orange}/>
    <circle cx="70" cy="59" r="5" fill="none" stroke={C.orange} strokeWidth="3.5"/>
    <rect x="26" y="78" width="28" height="6" fill="white"/>
    <rect x="30" y="72" width="10" height="8" fill="white"/>
  </svg>
);

// ─── COMPONENTI BASE ──────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = 'solid', size = 'sm', theme = 'light', style: extra = {} }) {
  const T = tk(theme);
  const base = { display:'inline-flex', alignItems:'center', justifyContent:'center', gap:5, borderRadius:10, fontWeight:700, cursor:'pointer', fontFamily:'inherit', border:'none', outline:'none', transition:'opacity .15s', padding: size === 'sm' ? '5px 12px' : '8px 16px', fontSize: size === 'sm' ? 12 : 13 };
  const vars = { solid: { background: C.orange, color: '#fff' }, outline: { background: theme === 'dark' ? '#020617' : '#fff', color: T.muted, border: `1px solid ${T.border}` } };
  return <button onClick={onClick} style={{ ...base, ...vars[variant] || vars.solid, ...extra }} onMouseEnter={e => e.currentTarget.style.opacity = '.75'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>{children}</button>;
}

function Tag({ children, tone = 'default' }) {
  const m = { default:{bg:'rgba(148,163,184,.12)',c:'#94a3b8',b:'rgba(148,163,184,.2)'}, success:{bg:'rgba(16,185,129,.12)',c:'#10b981',b:'rgba(16,185,129,.25)'}, warning:{bg:'rgba(249,115,22,.12)',c:'#f97316',b:'rgba(249,115,22,.25)'}, danger:{bg:'rgba(239,68,68,.12)',c:'#ef4444',b:'rgba(239,68,68,.25)'}, info:{bg:'rgba(14,165,233,.12)',c:'#0ea5e9',b:'rgba(14,165,233,.25)'} };
  const { bg, c, b } = m[tone] || m.default;
  return <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 9px', borderRadius:999, fontSize:11, fontWeight:600, background:bg, color:c, border:`1px solid ${b}` }}>{children}</span>;
}

function PBar({ value = 0 }) {
  return <div style={{ height:6, background:'rgba(148,163,184,.2)', borderRadius:999, overflow:'hidden' }}><div style={{ height:'100%', width:`${Math.min(100,Math.max(0,value))}%`, background:C.orange, borderRadius:999, transition:'width .5s' }}/></div>;
}

function ASwitch({ checked, onChange }) {
  return <div onClick={() => onChange(!checked)} style={{ width:40, height:22, borderRadius:11, cursor:'pointer', position:'relative', background: checked ? C.orange : 'rgba(148,163,184,.3)', transition:'background .2s', flexShrink:0 }}><div style={{ position:'absolute', top:3, left: checked ? 20 : 3, width:16, height:16, borderRadius:8, background:'#fff', transition:'left .2s', boxShadow:'0 1px 4px rgba(0,0,0,.25)' }}/></div>;
}

function Box({ theme, children, alt = false, style: extra = {} }) {
  const T = tk(theme);
  return <div style={{ background: alt ? T.alt : T.card, border:`1px solid ${alt ? T.borderSoft : T.border}`, borderRadius: alt ? 12 : 16, overflow:'hidden', ...extra }}>{children}</div>;
}

function Sec({ title, subtitle, action, children, theme, icon: Icon = Layers3 }) {
  const T = tk(theme);
  return (
    <Box theme={theme}>
      <div style={{ padding:'15px 20px 11px', borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(249,115,22,.1)', border:'1px solid rgba(249,115,22,.2)', borderRadius:9, padding:'4px 10px', marginBottom: subtitle ? 4 : 0 }}>
            <Icon size={13} color={T.accent}/>
            <span style={{ fontSize:13, fontWeight:700, color:T.accent }}>{title}</span>
          </div>
          {subtitle && <div style={{ fontSize:11, color:T.muted, marginTop:3 }}>{subtitle}</div>}
        </div>
        {action}
      </div>
      <div style={{ padding:20 }}>{children}</div>
    </Box>
  );
}

function Met({ label, value, icon: Icon, theme }) {
  const T = tk(theme);
  return <Box theme={theme} alt style={{ padding:14 }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><span style={{ fontSize:11, color:T.muted }}>{label}</span><Icon size={13} color={T.accent}/></div><div style={{ fontSize:17, fontWeight:700, color:T.text }}>{value}</div></Box>;
}

function Tbl({ columns, rows, theme }) {
  const T = tk(theme);
  return (
    <div style={{ border:`1px solid ${T.border}`, borderRadius:12, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns:`repeat(${columns.length},1fr)`, padding:'8px 16px', background:T.alt, borderBottom:`1px solid ${T.border}` }}>
        {columns.map(c => <div key={c} style={{ fontSize:10, fontWeight:700, color:T.faint, textTransform:'uppercase', letterSpacing:'.1em' }}>{c}</div>)}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:`repeat(${columns.length},1fr)`, padding:'10px 16px', borderTop: i > 0 ? `1px solid ${T.borderSoft}` : 'none', cursor:'pointer', transition:'background .15s' }}
          onMouseEnter={e => e.currentTarget.style.background = T.hover}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          {row.map((cell, j) => <div key={j} style={{ fontSize:12, color: j === 0 ? T.text : T.muted, fontWeight: j === 0 ? 600 : 400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cell}</div>)}
        </div>
      ))}
    </div>
  );
}

function HA({ primary, theme }) {
  const T = tk(theme);
  return <div style={{ display:'flex', gap:8 }}><Btn variant="outline" size="sm" theme={theme}><SlidersHorizontal size={11}/>Filtri</Btn><Btn size="sm" theme={theme}><Plus size={11}/>{primary}</Btn></div>;
}

// ─── DATI ─────────────────────────────────────────────────────────────────────
const CLIENTS = [
  { id:'edilcasa', name:'EdilCasa S.r.l.', contact:'Marco Rossi', email:'admin@edilcasa.it', city:'Milano', plan:'Enterprise', status:'Attivo', since:'Gen 2025',
    modules:{ dashboard:true,reporting:true,cashflow:true,crm:true,sopralluoghi:true,preventivi:true,showroom:true,cantieri:true,attivita:true,squadre:true,documenti:true,calendario:true,infissi:true,pavimenti:true,bagni:true,magazzino:true,shopify:true,ordini:true,fatture:true,pagamenti:true,compliance:true }},
  { id:'geoco', name:'Geo.co S.r.l.', contact:'Laura Ferretti', email:'info@geo.co', city:'Bergamo', plan:'Professional', status:'Attivo', since:'Mar 2026',
    modules:{ dashboard:true,reporting:true,cashflow:false,crm:true,sopralluoghi:true,preventivi:true,showroom:false,cantieri:true,attivita:true,squadre:false,documenti:true,calendario:true,infissi:false,pavimenti:true,bagni:false,magazzino:true,shopify:false,ordini:true,fatture:true,pagamenti:false,compliance:true }},
  { id:'costruzioni-beta', name:'Costruzioni Beta S.r.l.', contact:'Giovanni Amati', email:'g.amati@costruzionibeta.com', city:'Brescia', plan:'Starter', status:'Prova gratuita', since:'Mar 2026',
    modules:{ dashboard:true,reporting:false,cashflow:false,crm:true,sopralluoghi:true,preventivi:true,showroom:false,cantieri:true,attivita:true,squadre:false,documenti:false,calendario:true,infissi:false,pavimenti:false,bagni:false,magazzino:false,shopify:false,ordini:false,fatture:true,pagamenti:false,compliance:false }},
];
const USERS = [
  {email:'admin@prismaos.it',pw:'admin2026',role:'admin',client:null},
  {email:'admin@edilcasa.it',pw:'edilcasa',role:'client',client:'edilcasa'},
  {email:'info@geo.co',pw:'geoco',role:'client',client:'geoco'},
  {email:'g.amati@costruzionibeta.com',pw:'beta',role:'client',client:'costruzioni-beta'},
];
const KPIS = [{label:'Fatturato mese',value:'€ 184.500',delta:'+12,4%',icon:Euro},{label:'Cantieri attivi',value:'14',delta:'+3 questo mese',icon:HardHat},{label:'Ordini aperti',value:'27',delta:'€ 412.000',icon:ReceiptText},{label:'Scadenze urgenti',value:'9',delta:'entro 7 giorni',icon:AlertTriangle}];
const REV  = [{m:'Gen',v:98000},{m:'Feb',v:112000},{m:'Mar',v:121000},{m:'Apr',v:134000},{m:'Mag',v:148000},{m:'Giu',v:184500}];
const CF   = [{w:'W1',e:32000,u:18000,s:14000},{w:'W2',e:28000,u:22000,s:6000},{w:'W3',e:41000,u:26000,s:15000},{w:'W4',e:36000,u:30000,s:6000},{w:'W5',e:47000,u:25000,s:22000}];
const RDIV = [{n:'Cantieri',r:88,m:24},{n:'Infissi',r:42,m:31},{n:'Bagni',r:36,m:29},{n:'Pavimenti',r:27,m:22}];
const CRMP = [{stage:'Lead',v:46},{stage:'Sopralluoghi',v:23},{stage:'Preventivi',v:19},{stage:'Trattative',v:11},{stage:'Firme',v:7}];
const SCAD = [{v:'F24 IVA',d:'16 Mar 2026',s:'Oggi',i:'€ 12.430'},{v:'Stipendi maestranze',d:'27 Mar 2026',s:'In arrivo',i:'€ 28.700'},{v:'Pagamento Ceramiche',d:'29 Mar 2026',s:'In arrivo',i:'€ 9.850'},{v:'Assicurazione mezzi',d:'02 Apr 2026',s:'Programmata',i:'€ 3.420'}];
const CANT = [{id:'CAN-024',nome:'Villa Moretti',cliente:'Fam. Moretti',citta:'Monza',tip:'Ristrutturazione completa',resp:'Luca Rinaldi',av:72,budget:'€ 148.000',stato:'In esecuzione',pross:'Getto massetto piano terra',crit:'In attesa conferma sanitari'},{id:'CAN-031',nome:'Condominio Aurora',cliente:'Aurora Gestioni',citta:'Milano',tip:'Riqualificazione facciata',resp:'Marco Sala',av:41,budget:'€ 286.000',stato:'In esecuzione',pross:'Montaggio ponteggio lato nord',crit:'Autorizzazione suolo in rinnovo'},{id:'CAN-037',nome:'App. Città Studi',cliente:'Giulia Conti',citta:'Milano',tip:'Bagno + pavimentazione',resp:'Sara Leone',av:88,budget:'€ 39.500',stato:'Quasi completato',pross:'Collaudo finale e consegna',crit:'Nessuna'}];
const SALT = [{id:'SAL-144',comm:'Villa Moretti',fase:'Impianti idrici',owner:'Luca Rinaldi',pct:78,scad:'18 Mar',stato:'Da validare'},{id:'SAL-149',comm:'Condominio Aurora',fase:'Ponteggi lato nord',owner:'Marco Sala',pct:35,scad:'19 Mar',stato:'In corso'},{id:'SAL-151',comm:'Città Studi',fase:'Posa rivestimenti',owner:'Sara Leone',pct:92,scad:'17 Mar',stato:'Quasi chiuso'}];
const PREV = [{id:'PRE-118',cli:'Giulia Conti',cat:'Bagno completo',val:'€ 18.900',stato:'In trattativa',prob:78},{id:'PRE-121',cli:'Studio Bianchi',cat:'Infissi PVC',val:'€ 42.300',stato:'Inviato',prob:54},{id:'PRE-126',cli:'Fam. De Luca',cat:'Ristrutturazione',val:'€ 96.000',stato:'Sopralluogo eseguito',prob:67}];
const FATT = [{n:'FT-418',cli:'Fam. Moretti',tipo:'SAL 3',imp:'€ 24.000',stato:'Da inviare'},{n:'FT-421',cli:'Giulia Conti',tipo:'Saldo finale',imp:'€ 7.800',stato:'In scadenza'},{n:'FT-425',cli:'Aurora Gestioni',tipo:'Acconto',imp:'€ 31.500',stato:'Incassata'}];
const PAGF = [{f:'Ceramiche Uno',d:'29 Mar',i:'€ 9.850',p:'Alta'},{f:'InfissiTech',d:'02 Apr',i:'€ 14.200',p:'Media'}];
const MAG  = [{art:'Porta finestra 240x260',sku:'INF-PVC-240',disp:'2',stato:'Sotto scorta',rep:'Infissi'},{art:'Sanitario sospeso Urban',sku:'BAG-SAN-URB',disp:'14',stato:'Disponibile',rep:'Bagni'},{art:'Gres beige 60x120',sku:'PAV-GRS-612',disp:'96 mq',stato:'Disponibile',rep:'Pavimenti'},{art:'Colla professionale C2TE',sku:'CAN-COL-020',disp:'6',stato:'Riordino',rep:'Cantieri'}];
const SOPR = [{cli:'Fam. De Luca',zona:'Bergamo',tec:'Andrea Villa',data:'17 Mar · 09:30',esito:'Da eseguire'},{cli:'Studio Bianchi',zona:'Como',tec:'Sara Leone',data:'17 Mar · 15:00',esito:'Da eseguire'},{cli:'Condominio Iris',zona:'Monza',tec:'Luca Rinaldi',data:'18 Mar · 11:00',esito:'Preventivo in preparazione'}];
const DIP  = [{nome:'Luca Rinaldi',ruolo:'Direttore tecnico',stato:'Disponibile',ore:'41h',team:'Cantieri'},{nome:'Sara Leone',ruolo:'PM ristrutturazioni',stato:'In sopralluogo',ore:'38h',team:'Commerciale'},{nome:'Marco Sala',ruolo:'Capocantiere',stato:'In cantiere',ore:'44h',team:'Operativo'},{nome:'Elena Fontana',ruolo:'Amministrazione',stato:'In ufficio',ore:'36h',team:'Finance'}];
const ORD  = [{id:'ORD-7741',f:'Ceramiche Uno',cat:'Pavimenti',i:'€ 8.420',stato:'In consegna'},{id:'ORD-7748',f:'InfissiTech',cat:'Infissi',i:'€ 21.600',stato:'Confermato'},{id:'ORD-7750',f:'Bagno Design',cat:'Sanitari',i:'€ 5.980',stato:'Da approvare'}];
const COMP = [{v:'DURC Edil Nord',s:'21 Mar 2026',r:'HR',stato:'Urgente'},{v:'Assicurazione autocarro',s:'02 Apr 2026',r:'Amm.',stato:'In rinnovo'},{v:'Formazione sicurezza B',s:'06 Apr 2026',r:'RSPP',stato:'Pianificata'}];
const CALE = [{id:1,date:18,tipo:'scad',title:'F24 IVA — € 12.430',time:'23:59',person:'Elena Fontana',color:'#ef4444'},{id:2,date:18,tipo:'sopr',title:'Sopralluogo Fam. De Luca',time:'09:30',person:'Andrea Villa',color:'#0ea5e9'},{id:3,date:19,tipo:'cant',title:'Validazione SAL Villa Moretti',time:'10:00',person:'Luca Rinaldi',color:'#f97316'},{id:4,date:21,tipo:'scad',title:'DURC Edil Nord — Urgente',time:'23:59',person:'HR',color:'#ef4444'},{id:5,date:25,tipo:'fatt',title:'Incasso Aurora Gestioni',time:'—',person:'Amm.',color:'#10b981'},{id:6,date:27,tipo:'scad',title:'Stipendi maestranze',time:'23:59',person:'Elena Fontana',color:'#ef4444'}];
const NOTS = [{id:1,tipo:'danger',title:'DURC Edil Nord in scadenza',body:'Scadenza 21 Mar – agire entro oggi',time:'5 min fa',read:false},{id:2,tipo:'warning',title:'SAL Villa Moretti da validare',body:'Luca Rinaldi ha caricato il SAL 3',time:'32 min fa',read:false},{id:3,tipo:'info',title:'Ordine ORD-7741 in consegna',body:'Ceramiche Uno – previsto oggi',time:'1h fa',read:true},{id:4,tipo:'success',title:'Fattura FT-425 incassata',body:'€ 31.500 da Aurora Gestioni',time:'2h fa',read:true}];

const META = {
  dashboard:{title:'Dashboard direzionale',sub:'Controllo sintetico aziendale',ey:'Executive'},
  reporting:{title:'Reporting',sub:'Analisi ricavi, margini e performance',ey:'Executive'},
  cashflow:{title:'Cash Flow',sub:'Liquidità e previsione finanziaria',ey:'Executive'},
  crm:{title:'CRM & Lead',sub:'Lead, contatti e pipeline commerciale',ey:'Commerciale'},
  sopralluoghi:{title:'Sopralluoghi',sub:'Agenda tecnici, rilievi ed esiti',ey:'Commerciale'},
  preventivi:{title:'Preventivi',sub:'Offerte economiche e trattative aperte',ey:'Commerciale'},
  showroom:{title:'Showroom',sub:'Selezioni prodotto e vendite assistite',ey:'Commerciale'},
  cantieri:{title:'Cantieri',sub:'Commesse, avanzamento e criticità',ey:'Operativo'},
  attivita:{title:'Task & SAL',sub:'Attività operative e validazioni SAL',ey:'Operativo'},
  squadre:{title:'Squadre & Ore',sub:'Presenze, disponibilità e allocazioni',ey:'Operativo'},
  documenti:{title:'Documenti',sub:'Archivio tecnico e amministrativo',ey:'Operativo'},
  calendario:{title:'Calendario',sub:'Pianificazione cantieri e scadenze',ey:'Operativo'},
  infissi:{title:'Infissi',sub:'Catalogo tecnico, ordini e posa',ey:'Prodotti'},
  pavimenti:{title:'Pavimentazioni',sub:'Collezioni, metrature e disponibilità',ey:'Prodotti'},
  bagni:{title:'Bagni',sub:'Configurazioni bagno e articoli showroom',ey:'Prodotti'},
  magazzino:{title:'Magazzino',sub:'Scorte, lotti e allocazioni commessa',ey:'Prodotti'},
  shopify:{title:'Shopify Connector',sub:'Sincronizzazione prodotti via API',ey:'Prodotti'},
  ordini:{title:'Ordini Fornitori',sub:'Richieste acquisto e consegne',ey:'Finance'},
  fatture:{title:'Fatture',sub:'Emissione, invio e stato incassi',ey:'Finance'},
  pagamenti:{title:'Pagamenti',sub:'Uscite pianificate e priorità fornitori',ey:'Finance'},
  compliance:{title:'Compliance',sub:'DURC, assicurazioni e sicurezza',ey:'Finance'},
};

const NAV = [
  {label:'Executive',items:[{id:'dashboard',label:'Dashboard',icon:LayoutDashboard},{id:'reporting',label:'Reporting',icon:FileBarChart2},{id:'cashflow',label:'Cash Flow',icon:Wallet}]},
  {label:'Commerciale',items:[{id:'crm',label:'CRM & Lead',icon:Users},{id:'sopralluoghi',label:'Sopralluoghi',icon:CalendarDays},{id:'preventivi',label:'Preventivi',icon:FileText},{id:'showroom',label:'Showroom',icon:Sparkles}]},
  {label:'Operativo',items:[{id:'cantieri',label:'Cantieri',icon:HardHat},{id:'attivita',label:'Task & SAL',icon:CheckSquare},{id:'squadre',label:'Squadre',icon:UserCog},{id:'documenti',label:'Documenti',icon:Archive},{id:'calendario',label:'Calendario',icon:Calendar}]},
  {label:'Prodotti',items:[{id:'infissi',label:'Infissi',icon:DoorOpen},{id:'pavimenti',label:'Pavimentazioni',icon:SquareStack},{id:'bagni',label:'Bagni',icon:Bath},{id:'magazzino',label:'Magazzino',icon:Package},{id:'shopify',label:'Shopify',icon:Store}]},
  {label:'Finance',items:[{id:'ordini',label:'Ordini Fornitori',icon:ShoppingCart},{id:'fatture',label:'Fatture',icon:Receipt},{id:'pagamenti',label:'Pagamenti',icon:CreditCard},{id:'compliance',label:'Compliance',icon:ShieldCheck}]},
];

const MG = [{label:'Executive',keys:['dashboard','reporting','cashflow']},{label:'Commerciale',keys:['crm','sopralluoghi','preventivi','showroom']},{label:'Operativo',keys:['cantieri','attivita','squadre','documenti','calendario']},{label:'Prodotti',keys:['infissi','pavimenti','bagni','magazzino','shopify']},{label:'Finance',keys:['ordini','fatture','pagamenti','compliance']}];
const ML = {dashboard:'Dashboard',reporting:'Reporting',cashflow:'Cash Flow',crm:'CRM & Lead',sopralluoghi:'Sopralluoghi',preventivi:'Preventivi',showroom:'Showroom',cantieri:'Cantieri',attivita:'Task & SAL',squadre:'Squadre',documenti:'Documenti',calendario:'Calendario',infissi:'Infissi',pavimenti:'Pavimentazioni',bagni:'Bagni',magazzino:'Magazzino',shopify:'Shopify',ordini:'Ordini',fatture:'Fatture',pagamenti:'Pagamenti',compliance:'Compliance'};

// ─── PAGINE ───────────────────────────────────────────────────────────────────
function Dashboard({ theme }) {
  const T = tk(theme);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:12 }}>
        {KPIS.map(k => { const I = k.icon; return (
          <Box key={k.label} theme={theme} style={{ padding:18 }}>
            <div style={{ padding:18, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ fontSize:11, color:T.muted, marginBottom:8 }}>{k.label}</div>
                <div style={{ fontSize:24, fontWeight:800, color:T.text }}>{k.value}</div>
                <div style={{ fontSize:11, color:C.green, marginTop:4, fontWeight:600 }}>{k.delta}</div>
              </div>
              <div style={{ background:'rgba(249,115,22,.1)', border:'1px solid rgba(249,115,22,.2)', borderRadius:10, padding:8 }}><I size={16} color={T.accent}/></div>
            </div>
          </Box>
        );})}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16 }}>
        <Sec title="Controllo direzionale" subtitle="Economico, operativo e commerciale" theme={theme} icon={BarChart3} action={<Btn variant="outline" size="sm" theme={theme}><Download size={11}/>PDF</Btn>}>
          <div style={{ height:210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REV}><defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.orange} stopOpacity={0.25}/><stop offset="95%" stopColor={C.orange} stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid stroke={T.grid} vertical={false}/><XAxis dataKey="m" stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><YAxis stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><Tooltip {...ttS(theme)}/><Area type="monotone" dataKey="v" stroke={C.orange} fill="url(#rv)" strokeWidth={2.5}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:12 }}>
            <Met label="Ordini firmati" value="€ 226K" icon={ReceiptText} theme={theme}/>
            <Met label="Margine medio"  value="23,8%"  icon={Flame}       theme={theme}/>
            <Met label="Incassi 30g"    value="€ 119K" icon={Wallet}      theme={theme}/>
          </div>
        </Sec>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Sec title="Agenda priorità" subtitle="Azioni direzionali oggi" theme={theme} icon={CheckCircle2}>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[{t:'Sollecita FT-421',a:'Finance',p:'Alta',i:Receipt},{t:'Valida SAL Villa Moretti',a:'Cantieri',p:'Alta',i:HardHat},{t:'Rinnovo DURC Edil Nord',a:'Compliance',p:'Urgente',i:Shield}].map(item => {
                const I = item.i;
                return <Box key={item.t} theme={theme} alt style={{ padding:12, display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ background:'rgba(249,115,22,.1)', border:'1px solid rgba(249,115,22,.2)', borderRadius:8, padding:6, flexShrink:0 }}><I size={13} color={T.accent}/></div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:T.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.t}</div>
                    <div style={{ fontSize:10, color:T.muted }}>{item.a}</div>
                  </div>
                  <Tag tone={item.p === 'Urgente' ? 'danger' : 'warning'}>{item.p}</Tag>
                </Box>;
              })}
            </div>
          </Sec>
          <Sec title="Scadenze finanziarie" subtitle="Prossimi 30 giorni" theme={theme} icon={Landmark}>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {SCAD.map(s => <Box key={s.v} theme={theme} alt style={{ padding:'9px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div><div style={{ fontSize:12, fontWeight:600, color:T.text }}>{s.v}</div><div style={{ fontSize:10, color:T.muted }}>{s.d}</div></div>
                <div style={{ textAlign:'right' }}><div style={{ fontSize:12, fontWeight:700, color:T.text }}>{s.i}</div><div style={{ fontSize:10, color: s.s === 'Oggi' ? C.red : T.muted }}>{s.s}</div></div>
              </Box>)}
            </div>
          </Sec>
        </div>
      </div>
    </div>
  );
}

function Reporting({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16 }}>
    <Sec title="Analisi ricavi e marginalità" subtitle="Confronto divisioni e redditività" theme={theme} icon={BarChart3} action={<HA primary="Nuovo report" theme={theme}/>}>
      <div style={{ height:230 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={RDIV}><CartesianGrid stroke={T.grid} vertical={false}/><XAxis dataKey="n" stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><YAxis stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><Tooltip {...ttS(theme)}/><Bar dataKey="r" radius={[6,6,0,0]} fill={C.orange} name="Ricavi"/><Bar dataKey="m" radius={[6,6,0,0]} fill={C.green} name="Margine"/></BarChart></ResponsiveContainer></div>
      <div style={{ marginTop:12 }}><Tbl theme={theme} columns={['Divisione','Ricavi','Margine']} rows={RDIV.map(r=>[r.n,`${r.r}`,`${r.m}%`])}/></div>
    </Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title="Cruscotto performance" theme={theme} icon={Flame}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="Margine lordo" value="23,8%" icon={Flame} theme={theme}/><Met label="Inc. acquisti" value="41,2%" icon={ShoppingCart} theme={theme}/><Met label="Chiusure mese" value="7" icon={CheckCircle2} theme={theme}/><Met label="Ticket medio" value="€ 26.4K" icon={ReceiptText} theme={theme}/></div></Sec>
      <Sec title="Esportazioni" theme={theme} icon={Download}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['Report mensile PDF','Analisi divisioni XLSX','Marginalità CSV'].map(item => <Box key={item} theme={theme} alt style={{ padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}><span style={{ fontSize:12, fontWeight:500, color:T.text }}>{item}</span><Btn variant="outline" size="sm" theme={theme}><Download size={11}/>Scarica</Btn></Box>)}</div></Sec>
    </div>
  </div>;
}

function CashFlow({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.35fr .9fr', gap:16 }}>
    <Sec title="Previsione di cassa" subtitle="Entrate, uscite e saldo netto settimanale" theme={theme} icon={Wallet} action={<HA primary="Aggiorna forecast" theme={theme}/>}>
      <div style={{ height:250 }}><ResponsiveContainer width="100%" height="100%"><LineChart data={CF}><CartesianGrid stroke={T.grid} vertical={false}/><XAxis dataKey="w" stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><YAxis stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><Tooltip {...ttS(theme)}/><Line type="monotone" dataKey="e" stroke={C.green} strokeWidth={2.5} dot={false} name="Entrate"/><Line type="monotone" dataKey="u" stroke={C.red} strokeWidth={2.5} dot={false} name="Uscite"/><Line type="monotone" dataKey="s" stroke={C.orange} strokeWidth={2.5} dot={false} name="Saldo"/></LineChart></ResponsiveContainer></div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginTop:12 }}><Met label="Saldo disponibile" value="€ 128.4K" icon={Wallet} theme={theme}/><Met label="Entrate prev. 30g" value="€ 184.7K" icon={CheckCircle2} theme={theme}/><Met label="Uscite prev. 30g" value="€ 96.8K" icon={AlertTriangle} theme={theme}/></div>
    </Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title="Scadenzario entrate" theme={theme} icon={Receipt}><Tbl theme={theme} columns={['Cliente','Data','Importo']} rows={[['Fam. Moretti','19 Mar','€ 24.000'],['Giulia Conti','21 Mar','€ 7.800'],['Aurora Gestioni','25 Mar','€ 31.500']]}/></Sec>
      <Sec title="Rischi liquidità" theme={theme} icon={AlertTriangle}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['2 incassi oltre 10 giorni','1 ordine fornitore extra-budget','Saldo W2 sotto soglia'].map(item => <Box key={item} theme={theme} alt style={{ padding:'10px 14px', fontSize:12, color:T.text }}>{item}</Box>)}</div></Sec>
    </div>
  </div>;
}

function Crm({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:16 }}>
    <Sec title="Pipeline commerciale" subtitle="Lead, contatti e trattative in corso" theme={theme} icon={Users} action={<HA primary="Nuovo lead" theme={theme}/>}>
      <div style={{ height:190, marginBottom:12 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={CRMP}><CartesianGrid stroke={T.grid} vertical={false}/><XAxis dataKey="stage" stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><YAxis stroke={T.faint} tickLine={false} axisLine={false} tick={{fontSize:11}}/><Tooltip {...ttS(theme)}/><Bar dataKey="v" radius={[6,6,0,0]} fill={C.orange}/></BarChart></ResponsiveContainer></div>
      <Tbl theme={theme} columns={['Cliente','Stadio','Valore','Resp.']} rows={[['Fam. De Luca','Sopralluogo','€ 96.000','Sara Leone'],['Studio Bianchi','Preventivo','€ 42.300','Comm.'],['Condominio Iris','Lead caldo','€ 210.000','Direzione']]}/>
    </Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title="Metriche commerciali" theme={theme} icon={Sparkles}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="Lead aperti" value="46" icon={Users} theme={theme}/><Met label="Sopralluoghi" value="18" icon={CalendarDays} theme={theme}/><Met label="Conversione" value="34%" icon={CheckCircle2} theme={theme}/><Met label="Tempo offerta" value="1,8 gg" icon={ReceiptText} theme={theme}/></div></Sec>
      <Sec title="Follow-up" theme={theme} icon={BellRing}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['Richiama Fam. De Luca','Invia reminder sopralluogo Bianchi','Chiudi revisione PRE-129'].map(t => <Box key={t} theme={theme} alt style={{ padding:'10px 14px', fontSize:12, color:T.text }}>{t}</Box>)}</div></Sec>
    </div>
  </div>;
}

function Sopralluoghi({ theme }) {
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Agenda sopralluoghi" subtitle="Tecnici, date, zone ed esito" theme={theme} icon={CalendarDays} action={<HA primary="Nuovo sopralluogo" theme={theme}/>}><Tbl theme={theme} columns={['Cliente','Zona','Tecnico','Data','Esito']} rows={SOPR.map(s=>[s.cli,s.zona,s.tec,s.data,s.esito])}/></Sec>
    <Sec title="KPI sopralluoghi" theme={theme} icon={MapPin}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="Questa settimana" value="18" icon={CalendarDays} theme={theme}/><Met label="Confermati oggi" value="7" icon={CheckCircle2} theme={theme}/><Met label="Tempo medio offerta" value="1,8 gg" icon={ReceiptText} theme={theme}/><Met label="Conversione" value="34%" icon={Sparkles} theme={theme}/></div></Sec>
  </div>;
}

function Preventivi({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Preventivi in lavorazione" subtitle="Offerte, probabilità e stato trattativa" theme={theme} icon={FileText} action={<HA primary="Nuovo preventivo" theme={theme}/>}><Tbl theme={theme} columns={['ID','Cliente','Categoria','Valore','Prob.','Stato']} rows={PREV.map(p=>[p.id,p.cli,p.cat,p.val,`${p.prob}%`,p.stato])}/></Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title="Configuratore offerta" theme={theme} icon={Wrench}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{[{n:'Ristrutturazione bagno',d:'Demolizioni, impianti, posa, sanitari'},{n:'Pacchetto infissi premium',d:'Rilievo, fornitura, posa, smaltimento'},{n:'Pavimentazione completa',d:'Rimozione, rasatura, posa, battiscopa'}].map(item => <Box key={item.n} theme={theme} alt style={{ padding:'10px 14px' }}><div style={{ fontSize:12, fontWeight:600, color:T.text }}>{item.n}</div><div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{item.d}</div></Box>)}</div></Sec>
      <Sec title="Azioni rapide" theme={theme} icon={Download}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['Genera PDF preventivo','Duplica da modello','Invia via email','Converti in commessa'].map(item => <Box key={item} theme={theme} alt style={{ padding:'10px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}><span style={{ fontSize:12, fontWeight:500, color:T.text }}>{item}</span><Btn variant="outline" size="sm" theme={theme}>Apri</Btn></Box>)}</div></Sec>
    </div>
  </div>;
}

function Showroom({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Selezioni showroom" subtitle="Prodotti selezionati per cliente e progetto" theme={theme} icon={Sparkles} action={<HA primary="Nuova selezione" theme={theme}/>}><Tbl theme={theme} columns={['Cliente','Progetto','Articolo','Totale','Stato']} rows={[['Fam. De Luca','Bagno master','Mobile lavabo noce 120','€ 1.980','Confermabile'],['Studio Bianchi','Infissi ufficio','Serramento PVC anthracite','€ 12.460','Da listino'],['Giulia Conti','Rivestimenti','Gres Urban Pearl','€ 2.640','Opzione A']]}/></Sec>
    <Sec title="Conversione showroom" theme={theme} icon={CheckCircle2}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['Selezione materiali','Conferma varianti','Blocco listino','Ordine cliente','Passaggio a magazzino'].map((step, i) => <Box key={step} theme={theme} alt style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}><div style={{ width:22, height:22, borderRadius:11, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, background: i<3?'rgba(249,115,22,.15)':'rgba(148,163,184,.1)', color: i<3?C.orange:T.muted }}>{i+1}</div><span style={{ fontSize:12, color:T.text }}>{step}</span></Box>)}</div></Sec>
  </div>;
}

function Cantieri({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.4fr .8fr', gap:16 }}>
    <Sec title="Registro cantieri" subtitle="Commesse attive con avanzamento e criticità" theme={theme} icon={HardHat} action={<HA primary="Nuovo cantiere" theme={theme}/>}>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {CANT.map(c => <Box key={c.id} theme={theme} alt style={{ padding:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, flexWrap:'wrap', marginBottom:12 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:5 }}>
                <span style={{ fontSize:14, fontWeight:700, color:T.text }}>{c.nome}</span>
                <Tag tone={c.stato==='Quasi completato'?'success':'info'}>{c.stato}</Tag>
                <span style={{ fontSize:10, fontFamily:'monospace', color:T.faint, border:`1px solid ${T.border}`, borderRadius:5, padding:'1px 6px' }}>{c.id}</span>
              </div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', fontSize:11, color:T.muted }}><span>{c.cliente}</span><span>{c.citta}</span><span>{c.tip}</span></div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, minWidth:180 }}>
              <Met label="Budget" value={c.budget} icon={Euro} theme={theme}/>
              <Met label="Resp." value={c.resp.split(' ')[0]} icon={Wrench} theme={theme}/>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <Box theme={theme} style={{ padding:12, borderRadius:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}><span style={{ fontSize:11, color:T.text }}>Avanzamento</span><span style={{ fontSize:11, fontWeight:700, color:T.text }}>{c.av}%</span></div>
              <PBar value={c.av}/>
              <div style={{ fontSize:11, color:T.muted, marginTop:8 }}>Prossima: <b style={{ color:T.text }}>{c.pross}</b></div>
            </Box>
            <Box theme={theme} style={{ padding:12, borderRadius:10 }}>
              <div style={{ fontSize:11, fontWeight:600, color:T.text, marginBottom:4 }}>Criticità</div>
              <div style={{ fontSize:11, color:T.muted, lineHeight:1.5 }}>{c.crit}</div>
            </Box>
          </div>
        </Box>)}
      </div>
    </Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title="KPI operativi" theme={theme} icon={Factory}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="SAL emessi" value="11" icon={ReceiptText} theme={theme}/><Met label="Ritardi aperti" value="2" icon={AlertTriangle} theme={theme}/><Met label="Margine medio" value="21,6%" icon={Flame} theme={theme}/><Met label="Squadre impegnate" value="6" icon={Users} theme={theme}/></div></Sec>
      <Sec title="Checklist commessa" theme={theme} icon={CheckCircle2}><div style={{ display:'flex', flexDirection:'column', gap:6 }}>{['Permessi verificati','Piano sicurezza caricato','Subappaltatori approvati','SAL cliente aggiornato','Materiali critici ordinati'].map((item, i) => <Box key={item} theme={theme} alt style={{ padding:'9px 12px', display:'flex', alignItems:'center', gap:10 }}><div style={{ width:18, height:18, borderRadius:5, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background: i<4?'rgba(16,185,129,.15)':'transparent', border:`1.5px solid ${i<4?C.green:T.border}` }}>{i<4&&<CheckCircle2 size={11} color={C.green}/>}</div><span style={{ fontSize:12, color:T.text }}>{item}</span></Box>)}</div></Sec>
    </div>
  </div>;
}

function TaskSal({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Pianificazione Task & SAL" subtitle="Fasi operative, validazioni e avanzamento" theme={theme} icon={CheckSquare} action={<HA primary="Nuovo SAL" theme={theme}/>}><Tbl theme={theme} columns={['ID','Commessa','Fase','Owner','%','Scad.','Stato']} rows={SALT.map(r=>[r.id,r.comm,r.fase,r.owner,`${r.pct}%`,r.scad,r.stato])}/></Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title="Validazioni aperte" theme={theme} icon={ShieldCheck}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{SALT.map(item => <Box key={item.id} theme={theme} alt style={{ padding:12 }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><div><div style={{ fontSize:12, fontWeight:600, color:T.text }}>{item.comm}</div><div style={{ fontSize:10, color:T.muted }}>{item.fase}</div></div><Tag tone={item.stato==='Da validare'?'warning':item.stato==='In corso'?'info':'success'}>{item.stato}</Tag></div><PBar value={item.pct}/></Box>)}</div></Sec>
      <Sec title="Workflow SAL" theme={theme} icon={Layers3}><div style={{ display:'flex', flexDirection:'column', gap:6 }}>{['Apertura fase','Caricamento quantità','Verifica direttore tecnico','Validazione economica','Emissione fattura'].map((step,i)=><Box key={step} theme={theme} alt style={{ padding:'9px 12px', display:'flex', alignItems:'center', gap:10 }}><div style={{ width:22, height:22, borderRadius:11, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, background: i<3?'rgba(16,185,129,.15)':'rgba(148,163,184,.1)', color: i<3?C.green:T.muted }}>{i+1}</div><span style={{ fontSize:12, color:T.text }}>{step}</span></Box>)}</div></Sec>
    </div>
  </div>;
}

function Squadre({ theme }) {
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Squadre, ore e presenze" subtitle="Disponibilità risorse, ore lavorate e team" theme={theme} icon={Users} action={<HA primary="Nuova assegnazione" theme={theme}/>}><Tbl theme={theme} columns={['Nome','Ruolo','Stato','Ore','Team']} rows={DIP.map(d=>[d.nome,d.ruolo,d.stato,d.ore,d.team])}/></Sec>
    <Sec title="Carico operativo" theme={theme} icon={Wrench}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="Ore registrate" value="159h" icon={ReceiptText} theme={theme}/><Met label="Assenze aperte" value="2" icon={AlertTriangle} theme={theme}/><Met label="Mezzi prenotati" value="5" icon={Truck} theme={theme}/><Met label="Team attivi" value="6" icon={Users} theme={theme}/></div></Sec>
  </div>;
}

function Documenti({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Archivio documenti" subtitle="Documenti tecnici, amministrativi e allegati" theme={theme} icon={Archive} action={<HA primary="Carica file" theme={theme}/>}><Tbl theme={theme} columns={['Documento','Commessa','Categoria','Versione','Stato']} rows={[['PSC Villa Moretti','CAN-024','Sicurezza','v3','Attivo'],['Contratto Aurora','CAN-031','Commerciale','v1','Firmato'],['Verbale Città Studi','CAN-037','Cantiere','v2','Bozza']]}/></Sec>
    <Sec title="Categorie" theme={theme} icon={Layers3}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['Contratti','Capitolati','Sicurezza','Fatture','Foto cantiere'].map(c => <Box key={c} theme={theme} alt style={{ padding:'10px 14px', fontSize:12, fontWeight:600, color:T.text }}>{c}</Box>)}</div></Sec>
  </div>;
}

function Calendario({ theme }) {
  const [sel, setSel] = useState(18);
  const T = tk(theme);
  const evs = CALE.filter(e => e.date === sel);
  const ticoI = { sopr:CalendarDays, cant:HardHat, scad:AlertCircle, fatt:Receipt };
  return <div style={{ display:'grid', gridTemplateColumns:'1.5fr .8fr', gap:16 }}>
    <Sec title="Marzo 2026" subtitle="Pianificazione cantieri, sopralluoghi e scadenze" theme={theme} icon={Calendar} action={<div style={{ display:'flex', gap:6 }}><Btn variant="outline" size="sm" theme={theme} style={{ padding:'3px 8px' }}><ChevronLeft size={13}/></Btn><Btn variant="outline" size="sm" theme={theme} style={{ padding:'3px 8px' }}><ChevronRight size={13}/></Btn></div>}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2, marginBottom:6 }}>{['L','M','M','G','V','S','D'].map((d,i)=><div key={i} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:T.faint, padding:'3px 0' }}>{d}</div>)}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
        {Array.from({length:6}).map((_,i)=><div key={`e${i}`}/>)}
        {Array.from({length:31}).map((_,i)=>{
          const d=i+1, de=CALE.filter(e=>e.date===d), act=d===sel, tot=d===18;
          return <div key={d} onClick={()=>setSel(d)} style={{ borderRadius:8, padding:'5px 2px', cursor:'pointer', minHeight:42, display:'flex', flexDirection:'column', alignItems:'center', gap:3, border:`1px solid ${act?C.orange:T.borderSoft}`, background:act?C.orange:T.alt, transition:'all .15s' }}>
            <span style={{ fontSize:11, fontWeight:700, color:act?'#fff':tot?C.orange:T.text }}>{d}</span>
            <div style={{ display:'flex', gap:2, flexWrap:'wrap', justifyContent:'center' }}>{de.slice(0,3).map(ev=><div key={ev.id} style={{ width:5, height:5, borderRadius:3, background:act?'rgba(255,255,255,.7)':ev.color }}/>)}</div>
          </div>;
        })}
      </div>
      <div style={{ display:'flex', gap:14, marginTop:14, flexWrap:'wrap' }}>{[['#f97316','Cantiere'],['#0ea5e9','Sopralluogo'],['#ef4444','Scadenza'],['#10b981','Incasso']].map(([col,lab])=><div key={lab} style={{ display:'flex', alignItems:'center', gap:5 }}><div style={{ width:7, height:7, borderRadius:4, background:col }}/><span style={{ fontSize:10, color:T.muted }}>{lab}</span></div>)}</div>
    </Sec>
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <Sec title={`${sel} Marzo`} subtitle="Eventi del giorno" theme={theme} icon={Clock}>
        {evs.length===0?<div style={{ textAlign:'center', padding:'20px 0', fontSize:12, color:T.muted }}>Nessun evento</div>:
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{evs.map(ev=>{const I=ticoI[ev.tipo]||CalendarDays; return <Box key={ev.id} theme={theme} alt style={{ padding:12, display:'flex', gap:10 }}><div style={{ width:28, height:28, borderRadius:7, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background:`${ev.color}22` }}><I size={13} color={ev.color}/></div><div><div style={{ fontSize:12, fontWeight:600, color:T.text, lineHeight:1.3 }}>{ev.title}</div><div style={{ fontSize:10, color:T.muted, marginTop:3 }}>{ev.time} · {ev.person}</div></div></Box>;})}</div>}
      </Sec>
      <Sec title="Prossimi 7 giorni" theme={theme} icon={ChevronRight}>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>{CALE.filter(e=>e.date>sel&&e.date<=sel+7).map(ev=><div key={ev.id} style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ width:6, height:6, borderRadius:3, background:ev.color, flexShrink:0 }}/><span style={{ fontSize:11, flex:1, color:T.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ev.title}</span><span style={{ fontSize:10, color:T.muted, flexShrink:0 }}>{ev.date} Mar</span></div>)}</div>
      </Sec>
    </div>
  </div>;
}

function Prodotto({ title, subtitle, icon: Icon, reparto, theme }) {
  const rows = MAG.filter(m => reparto==='Tutti'||m.rep===reparto);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title={title} subtitle={subtitle} theme={theme} icon={Icon} action={<HA primary="Nuovo articolo" theme={theme}/>}><Tbl theme={theme} columns={['Articolo','SKU','Disp.','Stato','Reparto']} rows={rows.map(m=>[m.art,m.sku,m.disp,m.stato,m.rep])}/></Sec>
    <Sec title="Contesto reparto" theme={theme} icon={Factory}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="Articoli attivi" value="124" icon={Package} theme={theme}/><Met label="Sotto scorta" value="8" icon={AlertTriangle} theme={theme}/><Met label="Prenotati" value="21" icon={CheckCircle2} theme={theme}/><Met label="Riordini aperti" value="3" icon={RefreshCcw} theme={theme}/></div></Sec>
  </div>;
}

function Shopify({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Connettore Shopify" subtitle="Pubblicazione prodotti via API o file Excel/CSV" theme={theme} icon={Store} action={<HA primary="Connetti shop" theme={theme}/>}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:14 }}><Met label="Prodotti pronti sync" value="38" icon={PackageCheck} theme={theme}/><Met label="Ultimo sync" value="Oggi 09:42" icon={RefreshCcw} theme={theme}/><Met label="Canale" value="Shopify" icon={Store} theme={theme}/></div>
      <Tbl theme={theme} columns={['SKU','Nome','Categoria','Listino','Sync']} rows={[['INF-101','Infisso PVC Premium 2 ante','Infissi','€ 1.240','Pronto'],['BAG-204','Mobile bagno Urban 120','Bagni','€ 990','Bozza'],['PAV-330','Gres Pearl 60x120','Pavimenti','€ 46/mq','Pronto']]}/>
    </Sec>
    <Sec title="Flussi disponibili" theme={theme} icon={Database}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{[{t:'Invia via API a Shopify',i:Store,s:'Pubblica prodotti, immagini, varianti'},{t:'Esporta Excel / CSV',i:Download,s:'File pronto per import in un click'},{t:'Importa catalogo interno',i:Upload,s:'Carica da anagrafica o listino'}].map(item=>{const I=item.i; return <Box key={item.t} theme={theme} alt style={{ padding:12, display:'flex', gap:10 }}><I size={14} color={T.accent} style={{ flexShrink:0, marginTop:2 }}/><div><div style={{ fontSize:12, fontWeight:600, color:T.text }}>{item.t}</div><div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{item.s}</div></div></Box>;})}</div></Sec>
  </div>;
}

function Ordini({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Ordini fornitori" subtitle="Richieste acquisto, stato ordine e consegne" theme={theme} icon={ShoppingCart} action={<HA primary="Nuovo ordine" theme={theme}/>}><Tbl theme={theme} columns={['Ordine','Fornitore','Categoria','Importo','Stato']} rows={ORD.map(o=>[o.id,o.f,o.cat,o.i,o.stato])}/></Sec>
    <Sec title="Approvazioni" theme={theme} icon={CheckCircle2}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{ORD.map(o=><Box key={o.id} theme={theme} alt style={{ padding:'10px 14px' }}><div style={{ fontSize:12, fontWeight:600, color:T.text }}>{o.id}</div><div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{o.f} · {o.i}</div></Box>)}</div></Sec>
  </div>;
}

function Fatture({ theme }) {
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Fatture clienti" subtitle="Emissione, stato invio e controllo incassi" theme={theme} icon={Receipt} action={<HA primary="Nuova fattura" theme={theme}/>}><Tbl theme={theme} columns={['Numero','Cliente','Tipo','Importo','Stato']} rows={FATT.map(f=>[f.n,f.cli,f.tipo,f.imp,f.stato])}/></Sec>
    <Sec title="Stato fatturazione" theme={theme} icon={Euro}><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}><Met label="Da emettere" value="€ 64.2K" icon={Receipt} theme={theme}/><Met label="In scadenza" value="€ 18.9K" icon={AlertTriangle} theme={theme}/><Met label="Incassate" value="€ 91.4K" icon={CheckCircle2} theme={theme}/><Met label="Solleciti" value="3" icon={BellRing} theme={theme}/></div></Sec>
  </div>;
}

function Pagamenti({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Pagamenti fornitori" subtitle="Pianificazione uscite, priorità e scadenze" theme={theme} icon={CreditCard} action={<HA primary="Nuovo pagamento" theme={theme}/>}><Tbl theme={theme} columns={['Fornitore','Data','Importo','Priorità']} rows={PAGF.map(p=>[p.f,p.d,p.i,p.p])}/></Sec>
    <Sec title="Riepilogo uscite" theme={theme} icon={AlertTriangle}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['Uscite 7 giorni: € 21.400','Uscite 30 giorni: € 96.800','1 pagamento alta priorità'].map(item=><Box key={item} theme={theme} alt style={{ padding:'10px 14px', fontSize:12, color:T.text }}>{item}</Box>)}</div></Sec>
  </div>;
}

function Compliance({ theme }) {
  const T = tk(theme);
  return <div style={{ display:'grid', gridTemplateColumns:'1.3fr .9fr', gap:16 }}>
    <Sec title="Scadenze compliance" subtitle="DURC, assicurazioni, formazione e sicurezza" theme={theme} icon={ShieldCheck} action={<HA primary="Nuova scadenza" theme={theme}/>}><Tbl theme={theme} columns={['Voce','Scadenza','Responsabile','Stato']} rows={COMP.map(r=>[r.v,r.s,r.r,r.stato])}/></Sec>
    <Sec title="Presidio documentale" theme={theme} icon={Shield}><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{['1 documento urgente','2 rinnovi in corso','0 non conformità bloccanti'].map(item=><Box key={item} theme={theme} alt style={{ padding:'10px 14px', fontSize:12, color:T.text }}>{item}</Box>)}</div></Sec>
  </div>;
}

// ─── NOTIFICHE ────────────────────────────────────────────────────────────────
function NotifPanel({ open, onClose, theme }) {
  const T = tk(theme);
  const tc = { danger:C.red, warning:C.orange, info:C.sky, success:C.green };
  if (!open) return null;
  return <div style={{ position:'absolute', top:64, right:16, width:300, zIndex:100, background:T.card, border:`1px solid ${T.border}`, borderRadius:16, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,.25)' }}>
    <div style={{ padding:'12px 16px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ fontSize:13, fontWeight:700, color:T.text }}>Notifiche</span>
      <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:T.muted }}><X size={14}/></button>
    </div>
    {NOTS.map(n => <div key={n.id} style={{ padding:'11px 16px', borderBottom:`1px solid ${T.borderSoft}`, opacity:n.read?.7:1, display:'flex', gap:9, cursor:'pointer' }} onMouseEnter={e=>e.currentTarget.style.background=T.hover} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
      <Bell size={12} color={tc[n.tipo]} style={{ flexShrink:0, marginTop:2 }}/>
      <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:12, fontWeight:600, color:T.text }}>{n.title}</div><div style={{ fontSize:11, color:T.muted, marginTop:1 }}>{n.body}</div><div style={{ fontSize:10, color:T.faint, marginTop:2 }}>{n.time}</div></div>
      {!n.read && <div style={{ width:7, height:7, borderRadius:4, background:C.orange, flexShrink:0, marginTop:3 }}/>}
    </div>)}
  </div>;
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, theme, setTheme, activeClient, isAdmin, setView, onLogout }) {
  const T = tk(theme);
  const modules = activeClient?.modules || {};
  const visible = NAV.map(g => ({ ...g, items: g.items.filter(item => modules[item.id] !== false) })).filter(g => g.items.length > 0);

  return <aside style={{ width:252, flexShrink:0, background:T.sidebar, borderRight:`1px solid ${T.border}`, display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, overflowY:'auto' }}>
    {/* Logo */}
    <div style={{ padding:'15px 15px 11px', borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:10 }}>
      <CDLogo size={33}/><div><div style={{ fontSize:14, fontWeight:800, letterSpacing:'-.3px', color:T.text }}>CantiereDigitale</div><div style={{ fontSize:10, color:T.muted }}>{activeClient?.name||'PRISMAos'}</div></div>
    </div>
    {/* Client info */}
    {activeClient && <div style={{ margin:'10px 10px 0', background:T.alt, border:`1px solid ${T.borderSoft}`, borderRadius:12, padding:'10px 12px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:3 }}>
        <span style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:T.faint }}>Account</span>
        <span style={{ fontSize:10, fontWeight:700, color:C.orange, background:'rgba(249,115,22,.1)', border:'1px solid rgba(249,115,22,.2)', borderRadius:999, padding:'1px 8px' }}>{activeClient.plan}</span>
      </div>
      <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{activeClient.contact}</div>
      <div style={{ fontSize:10, color:T.muted }}>{activeClient.city}</div>
    </div>}
    {/* Nav */}
    <div style={{ flex:1, overflowY:'auto', padding:'12px 8px', display:'flex', flexDirection:'column', gap:14 }}>
      {visible.map(group => <div key={group.label}>
        <div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.14em', color:T.faint, padding:'0 5px', marginBottom:4 }}>{group.label}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
          {group.items.map(item => { const Icon = item.icon; const act = page === item.id; return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{ display:'flex', alignItems:'center', gap:9, padding:'8px 10px', borderRadius:9, border:`1px solid ${act?T.activeBorder:'transparent'}`, background:act?T.activeNav:'transparent', color:act?T.activeText:T.muted, fontSize:12, fontWeight:600, cursor:'pointer', transition:'all .15s', textAlign:'left', width:'100%', fontFamily:'inherit' }}
              onMouseEnter={e=>{ if(!act){e.currentTarget.style.background=T.hover;e.currentTarget.style.color=T.text;}}}
              onMouseLeave={e=>{ if(!act){e.currentTarget.style.background='transparent';e.currentTarget.style.color=T.muted;}}}>
              <Icon size={13} color={act?T.accent:'currentColor'}/><span style={{ flex:1 }}>{item.label}</span>
              {item.id==='cantieri'&&<span style={{ fontSize:10, fontWeight:700, padding:'1px 6px', borderRadius:999, background:'rgba(249,115,22,.12)', color:C.orange, border:'1px solid rgba(249,115,22,.2)' }}>14</span>}
              {item.id==='fatture'&&<span style={{ fontSize:10, fontWeight:700, padding:'1px 6px', borderRadius:999, background:'rgba(239,68,68,.12)', color:C.red, border:'1px solid rgba(239,68,68,.2)' }}>3</span>}
            </button>
          );})}
        </div>
      </div>)}
    </div>
    {/* Footer */}
    <div style={{ padding:'8px 8px 12px', borderTop:`1px solid ${T.border}`, display:'flex', flexDirection:'column', gap:2 }}>
      {isAdmin && <button onClick={()=>setView('admin')} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:9, border:'none', background:'transparent', color:C.orange, fontSize:12, fontWeight:700, cursor:'pointer', width:'100%', fontFamily:'inherit' }}><Crown size={12}/>Admin Panel</button>}
      <button onClick={()=>setTheme(theme==='dark'?'light':'dark')} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:9, border:'none', background:'transparent', color:T.muted, fontSize:12, fontWeight:600, cursor:'pointer', width:'100%', fontFamily:'inherit' }}>{theme==='dark'?<SunMedium size={12}/>:<Moon size={12}/>}{theme==='dark'?'Tema chiaro':'Tema scuro'}</button>
      <button onClick={onLogout} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', borderRadius:9, border:'none', background:'transparent', color:T.muted, fontSize:12, fontWeight:600, cursor:'pointer', width:'100%', fontFamily:'inherit' }}><X size={12}/>Esci</button>
      <div style={{ textAlign:'center', fontSize:9, color:T.faint, paddingTop:4 }}>PRISMAos © 2026</div>
    </div>
  </aside>;
}

// ─── TOPBAR ───────────────────────────────────────────────────────────────────
function Topbar({ page, theme, notifOpen, setNotifOpen }) {
  const T = tk(theme);
  const meta = META[page] || META.dashboard;
  const unread = NOTS.filter(n => !n.read).length;
  return <div style={{ position:'sticky', top:0, zIndex:20, background:T.topbar, borderBottom:`1px solid ${T.border}`, backdropFilter:'blur(12px)', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
    <div>
      <div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.14em', color:T.faint }}>{meta.ey}</div>
      <div style={{ fontSize:18, fontWeight:800, letterSpacing:'-.4px', lineHeight:1.2, marginTop:2, color:T.text }}>{meta.title}</div>
      <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{meta.sub}</div>
    </div>
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div style={{ position:'relative' }}><Search size={12} style={{ position:'absolute', left:9, top:'50%', transform:'translateY(-50%)', color:T.faint }}/><input placeholder="Cerca cantieri, clienti…" style={{ background:T.alt, border:`1px solid ${T.border}`, borderRadius:10, padding:'7px 12px 7px 28px', fontSize:12, color:T.text, outline:'none', width:210, fontFamily:'inherit' }}/></div>
      <Btn size="sm" theme={theme}><Plus size={12}/>Nuovo</Btn>
      <div style={{ position:'relative' }}>
        <button onClick={()=>setNotifOpen(o=>!o)} style={{ background:T.alt, border:`1px solid ${T.border}`, borderRadius:10, padding:'7px 10px', cursor:'pointer', color:T.text, display:'flex', alignItems:'center' }}><Bell size={14}/>{unread>0&&<span style={{ position:'absolute', top:-3, right:-3, width:16, height:16, background:C.orange, color:'#fff', borderRadius:8, fontSize:9, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}>{unread}</span>}</button>
      </div>
    </div>
  </div>;
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ theme, clients, setClients, onBack }) {
  const T = tk(theme);
  const [editing, setEditing] = useState(null);
  const toggleMod = (cid, mod) => setClients(p => p.map(c => c.id===cid ? {...c, modules:{...c.modules,[mod]:!c.modules[mod]}} : c));
  const planC = { Enterprise:C.orange, Professional:C.sky, Starter:C.green };

  return <div style={{ minHeight:'100vh', background:T.bg, color:T.text, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
    <div style={{ position:'sticky', top:0, zIndex:20, background:T.topbar, borderBottom:`1px solid ${T.border}`, backdropFilter:'blur(12px)', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}><CDLogo size={28}/><div><div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.15em', color:C.orange }}>Admin Panel</div><div style={{ fontSize:13, fontWeight:700, color:T.text }}>PRISMAos — Gestione clienti</div></div></div>
      <Btn variant="outline" size="sm" theme={theme} onClick={onBack}><ChevronLeft size={12}/>Torna all'app</Btn>
    </div>
    <div style={{ maxWidth:1080, margin:'0 auto', padding:24, display:'flex', flexDirection:'column', gap:20 }}>
      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {[{l:'Clienti totali',v:clients.length,i:Building,c:C.orange},{l:'Attivi',v:clients.filter(c=>c.status==='Attivo').length,i:CheckCircle2,c:C.green},{l:'In prova',v:clients.filter(c=>c.status==='Prova gratuita').length,i:Clock,c:C.amber},{l:'MRR stimato',v:'€ 790',i:TrendingUp,c:C.sky}].map(stat=>{const I=stat.i; return <Box key={stat.l} theme={theme} style={{ padding:16 }}><div style={{ padding:0, display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}><span style={{ fontSize:11, color:T.muted }}>{stat.l}</span><I size={14} color={stat.c}/></div><div style={{ fontSize:22, fontWeight:800, color:T.text }}>{stat.v}</div></Box>;})}
      </div>
      {/* Clients */}
      <Box theme={theme} style={{ overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div><div style={{ fontSize:14, fontWeight:700, color:T.text }}>Clienti registrati</div><div style={{ fontSize:11, color:T.muted, marginTop:2 }}>Gestisci accessi, piani e moduli attivi</div></div>
          <Btn size="sm" theme={theme}><Plus size={12}/>Aggiungi cliente</Btn>
        </div>
        {clients.map((client, ci) => <div key={client.id} style={{ borderBottom: ci<clients.length-1?`1px solid ${T.borderSoft}`:'none' }}>
          <div style={{ padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:'rgba(249,115,22,.1)', border:'1px solid rgba(249,115,22,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:C.orange }}>{client.name.substring(0,2).toUpperCase()}</div>
              <div><div style={{ fontSize:13, fontWeight:700, color:T.text }}>{client.name}</div><div style={{ fontSize:11, color:T.muted }}>{client.contact} · {client.city} · {client.email}</div></div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:12, fontWeight:700, color:planC[client.plan]||T.muted }}>{client.plan}</span>
              <span style={{ fontSize:11, fontWeight:600, color:client.status==='Attivo'?C.green:C.amber }}>● {client.status}</span>
              <span style={{ fontSize:11, color:T.faint }}>dal {client.since}</span>
              <Btn variant="outline" size="sm" theme={theme} onClick={()=>setEditing(editing===client.id?null:client.id)}><Settings size={11}/>Moduli</Btn>
            </div>
          </div>
          {editing===client.id && <div style={{ margin:'0 20px 16px', background:T.alt, border:`1px solid ${T.borderSoft}`, borderRadius:12, padding:16 }}>
            <div style={{ fontSize:10, fontWeight:800, textTransform:'uppercase', letterSpacing:'.12em', color:T.faint, marginBottom:12 }}>Moduli attivi per {client.name}</div>
            {MG.map(group => <div key={group.label} style={{ marginBottom:12 }}>
              <div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.12em', color:T.faint, marginBottom:8 }}>{group.label}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))', gap:8 }}>
                {group.keys.map(key => <div key={key} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:'9px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                  <span style={{ fontSize:11, fontWeight:600, color:T.text }}>{ML[key]}</span>
                  <ASwitch checked={!!client.modules[key]} onChange={()=>toggleMod(client.id,key)}/>
                </div>)}
              </div>
            </div>)}
          </div>}
        </div>)}
      </Box>
      {/* Deploy guide */}
      <Box theme={theme} style={{ padding:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}><Zap size={13} color={C.orange}/><span style={{ fontSize:13, fontWeight:700, color:T.text }}>Deploy — Stack per 5–50 clienti al costo minimo</span></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {[{n:'1 — Frontend → Vercel',d:'Push su GitHub, deploy automatico. Gratis per i primi clienti.',c:'€ 0/mese',col:C.green},{n:'2 — Backend → Supabase',d:'PostgreSQL + Auth + RLS. Ogni cliente ha i propri dati isolati.',c:'€ 0–25/mese',col:C.sky},{n:'3 — Dominio',d:'cantieredigitale.app su Namecheap. SSL automatico su Vercel.',c:'€ 12/anno',col:C.orange}].map(s => <div key={s.n} style={{ background:T.alt, border:`1px solid ${T.borderSoft}`, borderRadius:12, padding:14 }}><div style={{ fontSize:11, fontWeight:800, color:s.col, marginBottom:4 }}>{s.n}</div><div style={{ fontSize:11, color:T.muted, lineHeight:1.5, marginBottom:8 }}>{s.d}</div><div style={{ fontSize:12, fontWeight:800, color:s.col }}>{s.c}</div></div>)}
        </div>
        <div style={{ marginTop:14, background:'rgba(249,115,22,.06)', border:'1px solid rgba(249,115,22,.15)', borderRadius:10, padding:'10px 14px', fontSize:11, color:T.muted, lineHeight:1.6 }}>💡 <b style={{ color:T.text }}>Costo totale per i primi 5 clienti: €0–12/mese</b> (solo dominio). A 50 clienti: ~€50/mese totali.</div>
      </Box>
    </div>
  </div>;
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin, theme }) {
  const [email,setEmail]=useState('');const [pw,setPw]=useState('');const [sp,setSp]=useState(false);const [err,setErr]=useState('');
  const T = tk(theme);
  const doLogin = () => { const u=USERS.find(u=>u.email===email.trim()&&u.pw===pw); u?(setErr(''),onLogin(u)):setErr('Credenziali non valide. Riprova.'); };
  return <div style={{ minHeight:'100vh', background:T.bg, color:T.text, display:'flex', alignItems:'center', justifyContent:'center', padding:16, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
    <div style={{ width:'100%', maxWidth:360 }}>
      <div style={{ textAlign:'center', marginBottom:28 }}>
        <div style={{ display:'flex', justifyContent:'center', marginBottom:12 }}><CDLogo size={52}/></div>
        <div style={{ fontSize:22, fontWeight:800, letterSpacing:'-.5px', color:T.text }}>CantiereDigitale</div>
        <div style={{ fontSize:12, color:T.muted, marginTop:4 }}>Gestionale professionale per l'edilizia</div>
      </div>
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:24 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div><label style={{ fontSize:11, fontWeight:700, color:T.muted, display:'block', marginBottom:6 }}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="la-tua@email.it" onKeyDown={e=>e.key==='Enter'&&doLogin()} style={{ width:'100%', boxSizing:'border-box', background:T.alt, border:`1px solid ${T.border}`, borderRadius:10, padding:'9px 12px', fontSize:13, color:T.text, outline:'none', fontFamily:'inherit' }}/></div>
          <div><label style={{ fontSize:11, fontWeight:700, color:T.muted, display:'block', marginBottom:6 }}>Password</label><div style={{ position:'relative' }}><input type={sp?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&doLogin()} style={{ width:'100%', boxSizing:'border-box', background:T.alt, border:`1px solid ${T.border}`, borderRadius:10, padding:'9px 36px 9px 12px', fontSize:13, color:T.text, outline:'none', fontFamily:'inherit' }}/><button onClick={()=>setSp(s=>!s)} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:T.muted }}>{sp?<EyeOff size={14}/>:<Eye size={14}/>}</button></div></div>
          {err&&<div style={{ fontSize:12, color:C.red, textAlign:'center' }}>{err}</div>}
          <button onClick={doLogin} style={{ width:'100%', background:C.orange, color:'#fff', border:'none', borderRadius:10, padding:'11px 0', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }} onMouseEnter={e=>e.currentTarget.style.opacity='.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>Accedi</button>
        </div>
        <div style={{ marginTop:18, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
          <div style={{ fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'.12em', color:T.faint, marginBottom:8 }}>Account demo — clicca per compilare</div>
          <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
            {[{l:'🔑 Admin PRISMAos',e:'admin@prismaos.it',p:'admin2026'},{l:'🏗 EdilCasa S.r.l.',e:'admin@edilcasa.it',p:'edilcasa'},{l:'📐 Geo.co S.r.l.',e:'info@geo.co',p:'geoco'},{l:'🧱 Costruzioni Beta',e:'g.amati@costruzionibeta.com',p:'beta'}].map(u=><button key={u.e} onClick={()=>{setEmail(u.e);setPw(u.p);}} style={{ textAlign:'left', background:T.alt, border:`1px solid ${T.borderSoft}`, borderRadius:8, padding:'7px 10px', fontSize:11, color:T.muted, cursor:'pointer', width:'100%', fontFamily:'inherit' }}><b style={{ color:T.text }}>{u.l}</b> — {u.e}</button>)}
          </div>
        </div>
      </div>
      <div style={{ textAlign:'center', fontSize:10, color:T.faint, marginTop:14 }}>PRISMAos © 2026 — CantiereDigitale</div>
    </div>
  </div>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function renderPage(page, theme) {
  switch (page) {
      case 'dashboard':  return <Dashboard theme={theme}/>;
      case 'reporting':  return <Reporting theme={theme}/>;
      case 'cashflow':   return <CashFlow theme={theme}/>;
      case 'crm':        return <Crm theme={theme}/>;
      case 'sopralluoghi':return <Sopralluoghi theme={theme}/>;
      case 'preventivi': return <Preventivi theme={theme}/>;
      case 'showroom':   return <Showroom theme={theme}/>;
      case 'cantieri':   return <Cantieri theme={theme}/>;
      case 'attivita':   return <TaskSal theme={theme}/>;
      case 'squadre':    return <Squadre theme={theme}/>;
      case 'documenti':  return <Documenti theme={theme}/>;
      case 'calendario': return <Calendario theme={theme}/>;
      case 'infissi':    return <Prodotto title="Infissi"       subtitle="Catalogo tecnico, ordini e posa"          icon={DoorOpen}  reparto="Infissi"   theme={theme}/>;
      case 'pavimenti':  return <Prodotto title="Pavimentazioni" subtitle="Collezioni, metrature e disponibilità"    icon={SquareStack} reparto="Pavimenti" theme={theme}/>;
      case 'bagni':      return <Prodotto title="Bagni"          subtitle="Configurazioni bagno e articoli showroom" icon={Bath}      reparto="Bagni"     theme={theme}/>;
      case 'magazzino':  return <Prodotto title="Magazzino"      subtitle="Scorte, lotti e allocazioni commessa"     icon={Boxes}     reparto="Tutti"     theme={theme}/>;
      case 'shopify':    return <Shopify theme={theme}/>;
      case 'ordini':     return <Ordini theme={theme}/>;
      case 'fatture':    return <Fatture theme={theme}/>;
      case 'pagamenti':  return <Pagamenti theme={theme}/>;
      case 'compliance': return <Compliance theme={theme}/>;
      default:           return <Dashboard theme={theme}/>;
  }
}

export default function App() {
  const [user,    setUser]    = useState(null);
  const [view,    setView]    = useState('app');
  const [page,    setPage]    = useState('dashboard');
  const [theme,   setTheme]   = useState('light');
  const [no,      setNo]      = useState(false);
  const [clients, setClients] = useState(CLIENTS);

  const isAdmin      = user?.role === 'admin';
  const activeClient = isAdmin ? clients[0] : clients.find(c => c.id === user?.client);

  const login = useCallback(u => {
    setUser(u);
    setPage('dashboard');
    setView(u.role === 'admin' ? 'admin' : 'app');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPage('dashboard');
    setView('app');
  }, []);

  if (!user) return <Login onLogin={login} theme={theme}/>;
  if (view==="admin" && isAdmin) return <AdminPanel theme={theme} clients={clients} setClients={setClients} onBack={()=>setView("app")}/>;

  // Assicura che la pagina corrente sia abilitata per il cliente loggato
  const modules = activeClient?.modules || {};
  const safePage = (modules[page] === false) ? 'dashboard' : page;
  if (safePage !== page) setPage(safePage);

  const T = tk(theme);
  const content = renderPage(safePage, theme);

  return <div style={{ display:'flex', minHeight:'100vh', background:T.bg, color:T.text, fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
    <Sidebar page={safePage} setPage={setPage} theme={theme} setTheme={setTheme} activeClient={activeClient} isAdmin={isAdmin} setView={setView} onLogout={logout}/>
    <main style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column' }}>
      <div style={{ position:'relative' }}>
        <Topbar page={safePage} theme={theme} notifOpen={no} setNotifOpen={setNo}/>
        <NotifPanel open={no} onClose={()=>setNo(false)} theme={theme}/>
      </div>
      <div style={{ flex:1, padding:24, display:'flex', flexDirection:'column', gap:18, overflowY:'auto' }}>{content}</div>
      <div style={{ padding:'9px 24px', borderTop:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', fontSize:10, color:T.faint }}>
        <span>CantiereDigitale — {activeClient?.name||'PRISMAos'}</span><span>PRISMAos © 2026</span>
      </div>
    </main>
  </div>;
}
