import { useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'ipm_teg_checklist_v1';

const STATUS_OPTIONS = [
  { value: 'approved',    label: 'Approved',         color: '#22863a', bg: '#dcfce7', border: '#86efac' },
  { value: 'pending',     label: 'Pending Purchase',  color: '#b45309', bg: '#fef3c7', border: '#fcd34d' },
  { value: 'optional',    label: 'Optional Later',    color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db' },
  { value: 'recommended', label: 'Recommended Add-On',color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
];

const PRIORITY = { high: { label: 'High', color: '#dc2626', bg: '#fee2e2' }, medium: { label: 'Medium', color: '#d97706', bg: '#fef3c7' }, low: { label: 'Low', color: '#059669', bg: '#d1fae5' } };

const INITIAL_ITEMS = [
  // BEDROOM SETUP
  { id: 1,  section: 'Bedroom Setup',        name: 'King bed',                  qty: '1',      area: 'Master Bedroom',                status: 'approved',    priority: 'high',   notes: '' },
  { id: 2,  section: 'Bedroom Setup',        name: 'Full bed',                  qty: '1',      area: 'Upstairs Bedroom 2',            status: 'approved',    priority: 'high',   notes: '' },
  { id: 3,  section: 'Bedroom Setup',        name: 'Full bed',                  qty: '1',      area: 'Upstairs Bedroom 3',            status: 'approved',    priority: 'high',   notes: '' },
  { id: 4,  section: 'Bedroom Setup',        name: 'Full-size bunk beds',       qty: '2',      area: 'Downstairs Bedroom',            status: 'pending',     priority: 'high',   notes: '' },
  { id: 5,  section: 'Bedroom Setup',        name: 'Mattress protectors',       qty: '7',      area: 'All beds',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 6,  section: 'Bedroom Setup',        name: 'Sheet sets',                qty: '14',     area: 'All beds',                     status: 'pending',     priority: 'high',   notes: '2 sets per bed for turnover' },
  { id: 7,  section: 'Bedroom Setup',        name: 'Comforters or duvets',      qty: '7',      area: 'All beds',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 8,  section: 'Bedroom Setup',        name: 'Extra blankets',            qty: '4–6',    area: 'Shared closets',               status: 'pending',     priority: 'low',    notes: '' },
  { id: 9,  section: 'Bedroom Setup',        name: 'Pillows',                   qty: '20–24',  area: 'All rooms',                    status: 'pending',     priority: 'high',   notes: '' },
  { id: 10, section: 'Bedroom Setup',        name: 'Pillow protectors',         qty: '20–24',  area: 'All rooms',                    status: 'pending',     priority: 'medium', notes: '' },
  { id: 11, section: 'Bedroom Setup',        name: 'Nightstand lamps',          qty: '8',      area: '2 per bedroom',                status: 'pending',     priority: 'medium', notes: '' },
  { id: 12, section: 'Bedroom Setup',        name: 'Hangers',                   qty: '40–50',  area: 'Bedrooms / Closets',           status: 'pending',     priority: 'medium', notes: '' },
  { id: 13, section: 'Bedroom Setup',        name: 'Curtains',                  qty: 'Per windows', area: 'Bedrooms / Living areas', status: 'pending',     priority: 'medium', notes: '' },
  { id: 14, section: 'Bedroom Setup',        name: 'Fake plants',               qty: '6–10',   area: 'Bedrooms / Common areas',      status: 'pending',     priority: 'low',    notes: '' },
  { id: 15, section: 'Bedroom Setup',        name: 'TV',                        qty: '1',      area: 'Master Bedroom',               status: 'pending',     priority: 'medium', notes: '' },
  { id: 16, section: 'Bedroom Setup',        name: 'TV mount',                  qty: '1',      area: 'Master Bedroom',               status: 'pending',     priority: 'medium', notes: '' },
  { id: 17, section: 'Bedroom Setup',        name: 'TV',                        qty: '1',      area: 'Downstairs Bunk Room',         status: 'pending',     priority: 'medium', notes: '' },
  { id: 18, section: 'Bedroom Setup',        name: 'TV mount',                  qty: '1',      area: 'Downstairs Bunk Room',         status: 'pending',     priority: 'medium', notes: '' },
  { id: 19, section: 'Bedroom Setup',        name: 'Optional TVs',              qty: '2',      area: 'Upstairs Bedrooms 2 & 3',     status: 'optional',    priority: 'low',    notes: '' },
  { id: 20, section: 'Bedroom Setup',        name: 'Optional TV mounts',        qty: '2',      area: 'Upstairs Bedrooms 2 & 3',     status: 'optional',    priority: 'low',    notes: '' },
  // BATHROOM
  { id: 21, section: 'Bathroom Supplies',    name: 'Bath towels',               qty: '20',     area: 'Bathrooms / Linen closet',    status: 'pending',     priority: 'high',   notes: '' },
  { id: 22, section: 'Bathroom Supplies',    name: 'Washcloths',                qty: '20',     area: 'Bathrooms / Linen closet',    status: 'pending',     priority: 'medium', notes: '' },
  { id: 23, section: 'Bathroom Supplies',    name: 'Hand towels',               qty: '10',     area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 24, section: 'Bathroom Supplies',    name: 'Bathroom mats',             qty: '2–4',    area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 25, section: 'Bathroom Supplies',    name: 'Soap dispensers',           qty: '2–3',    area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 26, section: 'Bathroom Supplies',    name: 'Shampoo dispensers',        qty: '2–3',    area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 27, section: 'Bathroom Supplies',    name: 'Conditioner dispensers',    qty: '2–3',    area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 28, section: 'Bathroom Supplies',    name: 'Body wash & hand soap refill (bulk)', qty: 'Bulk', area: 'Bathrooms',           status: 'pending',     priority: 'medium', notes: '' },
  { id: 29, section: 'Bathroom Supplies',    name: 'Hair dryers',               qty: '2',      area: 'Upstairs bathrooms',          status: 'pending',     priority: 'medium', notes: '' },
  { id: 30, section: 'Bathroom Supplies',    name: 'Toothbrush / toiletry holders', qty: '2–3', area: 'Bathrooms',                 status: 'pending',     priority: 'low',    notes: '' },
  { id: 31, section: 'Bathroom Supplies',    name: 'Shower curtain',            qty: '1',      area: 'Upstairs non-master bathroom',status: 'pending',     priority: 'medium', notes: '' },
  { id: 32, section: 'Bathroom Supplies',    name: 'Shower rod',                qty: '1',      area: 'Upstairs non-master bathroom',status: 'pending',     priority: 'medium', notes: '' },
  { id: 33, section: 'Bathroom Supplies',    name: 'Toilet brushes',            qty: '2–3',    area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 34, section: 'Bathroom Supplies',    name: 'Toilet plungers',           qty: '2',      area: 'Bathrooms',                   status: 'pending',     priority: 'medium', notes: '' },
  { id: 35, section: 'Bathroom Supplies',    name: 'Bathroom trash cans',       qty: '2–3',    area: 'Bathrooms',                   status: 'pending',     priority: 'low',    notes: '' },
  { id: 36, section: 'Bathroom Supplies',    name: 'Toilet paper starter supply', qty: 'Bulk', area: 'Bathrooms',                   status: 'pending',     priority: 'high',   notes: '' },
  // KITCHEN
  { id: 37, section: 'Kitchen Setup',        name: 'Plates',                    qty: '12–16',  area: 'Kitchen',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 38, section: 'Kitchen Setup',        name: 'Bowls',                     qty: '12–16',  area: 'Kitchen',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 39, section: 'Kitchen Setup',        name: 'Cups / glasses',            qty: '12–16',  area: 'Kitchen',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 40, section: 'Kitchen Setup',        name: 'Coffee mugs',               qty: '10–12',  area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 41, section: 'Kitchen Setup',        name: 'Silverware sets',           qty: '12–16',  area: 'Kitchen',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 42, section: 'Kitchen Setup',        name: 'Pots and pans set',         qty: '1 full set', area: 'Kitchen',               status: 'pending',     priority: 'high',   notes: '' },
  { id: 43, section: 'Kitchen Setup',        name: 'Cooking utensils set',      qty: '1 set',  area: 'Kitchen',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 44, section: 'Kitchen Setup',        name: 'Knife set',                 qty: '1',      area: 'Kitchen',                     status: 'pending',     priority: 'high',   notes: '' },
  { id: 45, section: 'Kitchen Setup',        name: 'Cutting boards',            qty: '2',      area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 46, section: 'Kitchen Setup',        name: 'Dish drying rack',          qty: '1',      area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 47, section: 'Kitchen Setup',        name: 'Dish towels',               qty: '8–10',   area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 48, section: 'Kitchen Setup',        name: 'Oven mitts',                qty: '2–4',    area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 49, section: 'Kitchen Setup',        name: 'Sponges (bulk)',            qty: 'Bulk',   area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 50, section: 'Kitchen Setup',        name: 'Dish soap (bulk)',          qty: 'Bulk',   area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 51, section: 'Kitchen Setup',        name: 'Paper towels (bulk)',       qty: 'Bulk',   area: 'Kitchen',                     status: 'approved',    priority: 'medium', notes: 'Verify stock' },
  { id: 52, section: 'Kitchen Setup',        name: 'Trash bags (bulk)',         qty: 'Bulk',   area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 53, section: 'Kitchen Setup',        name: 'Hot water kettle',          qty: '1',      area: 'Kitchen',                     status: 'pending',     priority: 'medium', notes: '' },
  { id: 54, section: 'Kitchen Setup',        name: 'Coffee maker',              qty: '1',      area: 'Kitchen',                     status: 'recommended', priority: 'medium', notes: '' },
  { id: 55, section: 'Kitchen Setup',        name: 'Blender',                   qty: '1',      area: 'Kitchen',                     status: 'optional',    priority: 'low',    notes: '' },
  { id: 56, section: 'Kitchen Setup',        name: 'Can opener',                qty: '1',      area: 'Kitchen',                     status: 'recommended', priority: 'low',    notes: '' },
  { id: 57, section: 'Kitchen Setup',        name: 'Bottle opener',             qty: '1',      area: 'Kitchen',                     status: 'recommended', priority: 'low',    notes: '' },
  { id: 58, section: 'Kitchen Setup',        name: 'Food storage containers set', qty: '1 set', area: 'Kitchen',                  status: 'recommended', priority: 'low',    notes: '' },
  // LIVING & DINING
  { id: 59, section: 'Living & Dining Room', name: 'Coffee table',              qty: '1',      area: 'Living room',                 status: 'pending',     priority: 'medium', notes: '' },
  { id: 60, section: 'Living & Dining Room', name: 'Coasters',                  qty: '8–12',   area: 'Living room / Dining room',   status: 'pending',     priority: 'low',    notes: '' },
  { id: 61, section: 'Living & Dining Room', name: 'Dining table coasters / placemats', qty: '10–12', area: 'Dining room',        status: 'pending',     priority: 'low',    notes: '' },
  { id: 62, section: 'Living & Dining Room', name: 'Tablecloth',                qty: '1–2',    area: 'Dining room',                 status: 'pending',     priority: 'low',    notes: '' },
  { id: 63, section: 'Living & Dining Room', name: 'Vase',                      qty: '1',      area: 'Dining room',                 status: 'pending',     priority: 'low',    notes: '' },
  { id: 64, section: 'Living & Dining Room', name: 'Fake flowers / centerpiece', qty: '1',     area: 'Dining room',                 status: 'pending',     priority: 'low',    notes: '' },
  { id: 65, section: 'Living & Dining Room', name: 'Books (decorative)',        qty: '3–5',    area: 'Living room',                 status: 'recommended', priority: 'low',    notes: '' },
  { id: 66, section: 'Living & Dining Room', name: 'Board games',               qty: '3–5',    area: 'Living room',                 status: 'recommended', priority: 'low',    notes: '' },
  { id: 67, section: 'Living & Dining Room', name: 'Welcome book / house manual', qty: '1',    area: 'Living room',                 status: 'recommended', priority: 'high',   notes: '' },
  // SAFETY & ENTRY
  { id: 68, section: 'Safety, Entry & Guest Access', name: 'Key lockbox',       qty: '1',      area: 'Front door',                  status: 'pending',     priority: 'high',   notes: '' },
  { id: 69, section: 'Safety, Entry & Guest Access', name: 'Keypad smart lock', qty: '1',      area: 'Front door',                  status: 'recommended', priority: 'high',   notes: '' },
  { id: 70, section: 'Safety, Entry & Guest Access', name: 'Extra keys',        qty: '2–3 sets', area: 'Storage / Admin',          status: 'pending',     priority: 'medium', notes: '' },
  { id: 71, section: 'Safety, Entry & Guest Access', name: 'Smoke detectors',   qty: 'Verify all areas', area: 'Whole house',       status: 'recommended', priority: 'high',   notes: '' },
  { id: 72, section: 'Safety, Entry & Guest Access', name: 'Carbon monoxide detector', qty: '1–2', area: 'Whole house',            status: 'recommended', priority: 'high',   notes: '' },
  { id: 73, section: 'Safety, Entry & Guest Access', name: 'Fire extinguisher', qty: '1–2',    area: 'Kitchen / Common area',       status: 'recommended', priority: 'high',   notes: '' },
  { id: 74, section: 'Safety, Entry & Guest Access', name: 'First aid kit',     qty: '1',      area: 'Kitchen / Common area',       status: 'recommended', priority: 'high',   notes: '' },
  { id: 75, section: 'Safety, Entry & Guest Access', name: 'High-speed Wi-Fi setup', qty: '1', area: 'Whole house',                status: 'pending',     priority: 'high',   notes: 'Should support international remote workers' },
  { id: 76, section: 'Safety, Entry & Guest Access', name: 'Wi-Fi info display card', qty: '1–2', area: 'Living room / Bedrooms', status: 'recommended', priority: 'medium', notes: '' },
  // CLEANING & MAINTENANCE
  { id: 77, section: 'Cleaning & Maintenance', name: 'All-purpose cleaner (bulk)', qty: 'Bulk', area: 'Cleaning storage',           status: 'pending',     priority: 'high',   notes: '' },
  { id: 78, section: 'Cleaning & Maintenance', name: 'Bathroom cleaner (bulk)', qty: 'Bulk',   area: 'Cleaning storage',            status: 'pending',     priority: 'high',   notes: '' },
  { id: 79, section: 'Cleaning & Maintenance', name: 'Glass cleaner (bulk)',    qty: 'Bulk',   area: 'Cleaning storage',            status: 'pending',     priority: 'medium', notes: '' },
  { id: 80, section: 'Cleaning & Maintenance', name: 'Floor cleaner (bulk)',    qty: 'Bulk',   area: 'Cleaning storage',            status: 'pending',     priority: 'high',   notes: '' },
  { id: 81, section: 'Cleaning & Maintenance', name: 'Disinfectant wipes / spray (bulk)', qty: 'Bulk', area: 'Cleaning storage',   status: 'pending',     priority: 'high',   notes: '' },
  { id: 82, section: 'Cleaning & Maintenance', name: 'Broom',                   qty: '1',      area: 'Cleaning storage',            status: 'pending',     priority: 'high',   notes: '' },
  { id: 83, section: 'Cleaning & Maintenance', name: 'Mop and bucket',          qty: '1',      area: 'Cleaning storage',            status: 'pending',     priority: 'high',   notes: '' },
  { id: 84, section: 'Cleaning & Maintenance', name: 'Vacuum',                  qty: '1',      area: 'Cleaning storage',            status: 'recommended', priority: 'medium', notes: '' },
  { id: 85, section: 'Cleaning & Maintenance', name: 'Duster for fans & cobwebs', qty: '1–2',  area: 'Cleaning storage',           status: 'pending',     priority: 'medium', notes: '' },
  { id: 86, section: 'Cleaning & Maintenance', name: 'Laundry detergent (bulk)', qty: 'Bulk',  area: 'Laundry area',               status: 'pending',     priority: 'high',   notes: '' },
  { id: 87, section: 'Cleaning & Maintenance', name: 'Clothes drying rack',     qty: '1–2',    area: 'Laundry area',               status: 'pending',     priority: 'medium', notes: '' },
  { id: 88, section: 'Cleaning & Maintenance', name: 'Glade plug-ins / air fresheners', qty: '4–6', area: 'Whole house',           status: 'pending',     priority: 'medium', notes: '' },
  { id: 89, section: 'Cleaning & Maintenance', name: 'Extra batteries (assorted)', qty: 'Assorted', area: 'Storage',              status: 'recommended', priority: 'low',    notes: '' },
  { id: 90, section: 'Cleaning & Maintenance', name: 'Light bulbs (assorted)',  qty: 'Assorted', area: 'Storage',                 status: 'recommended', priority: 'low',    notes: '' },
  // STORAGE / HQ
  { id: 91, section: 'Storage / Headquarters Room', name: 'Use outside room (by laundry) as storage/HQ', qty: '—', area: 'Storage room', status: 'approved',  priority: 'high', notes: 'Not guest-facing yet' },
  { id: 92, section: 'Storage / Headquarters Room', name: 'Storage shelving',   qty: '1–2',    area: 'Storage room',               status: 'recommended', priority: 'medium', notes: '' },
  { id: 93, section: 'Storage / Headquarters Room', name: 'Storage bins',       qty: '6–10',   area: 'Storage room',               status: 'recommended', priority: 'medium', notes: '' },
  { id: 94, section: 'Storage / Headquarters Room', name: 'Cleaning supply labels', qty: '1 set', area: 'Storage room',           status: 'recommended', priority: 'low',    notes: '' },
  { id: 95, section: 'Storage / Headquarters Room', name: 'Keep storage room locked from guests', qty: '—', area: 'Storage room', status: 'approved',    priority: 'high',   notes: 'Admin access only' },
];

const SECTIONS = [...new Set(INITIAL_ITEMS.map(i => i.section))];

const TegucigalpaChecklist = () => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedData = JSON.parse(saved);
        return INITIAL_ITEMS.map(item => ({ ...item, ...(savedData[item.id] || {}) }));
      }
    } catch {}
    return INITIAL_ITEMS;
  });

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedNotes, setExpandedNotes] = useState({});

  useEffect(() => {
    const toSave = {};
    items.forEach(item => { toSave[item.id] = { status: item.status, notes: item.notes }; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [items]);

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const stats = useMemo(() => {
    const total = items.length;
    const approved = items.filter(i => i.status === 'approved').length;
    const pending = items.filter(i => i.status === 'pending').length;
    const optional = items.filter(i => i.status === 'optional').length;
    const pct = Math.round((approved / total) * 100);
    return { total, approved, pending, optional, pct };
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchFilter =
        filter === 'all' ? true :
        filter === 'high' ? item.priority === 'high' :
        item.status === filter;
      const matchSearch = search === '' || item.name.toLowerCase().includes(search.toLowerCase()) || item.area.toLowerCase().includes(search.toLowerCase()) || item.section.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [items, filter, search]);

  const getStatusStyle = (val) => STATUS_OPTIONS.find(s => s.value === val) || STATUS_OPTIONS[0];

  return (
    <div className="tg-wrap">
      <style>{`
        .tg-wrap { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f0f4f8; min-height: 100vh; color: #1e293b; -webkit-font-smoothing: antialiased; }
        .tg-wrap *, .tg-wrap *::before, .tg-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .tg-wrap h1, .tg-wrap h2, .tg-wrap h3 { font-weight: 700; line-height: 1.25; }
        .tg-wrap a { color: inherit; text-decoration: none; }
        .tg-wrap input, .tg-wrap select, .tg-wrap textarea { font-family: inherit; }

        /* HEADER */
        .tg-header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e3a5f 100%); padding: 2.5rem 0 3.5rem; position: relative; overflow: hidden; }
        .tg-header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.08) 0%, transparent 60%); }
        .tg-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
        .tg-header-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .tg-logo { font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.7); letter-spacing: 0.08em; text-transform: uppercase; }
        .tg-logo span { color: #4ade80; }
        .tg-back-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 8px; padding: 0.5rem 1.1rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; }
        .tg-back-btn:hover { background: rgba(255,255,255,0.18); }
        .tg-header h1 { font-size: clamp(1.5rem, 4vw, 2.4rem); color: #fff; margin-bottom: 0.5rem; }
        .tg-header h1 span { color: #4ade80; }
        .tg-header-sub { font-size: 1rem; color: rgba(255,255,255,0.6); margin-bottom: 0; }
        .tg-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(74,222,128,0.15); border: 1px solid rgba(74,222,128,0.3); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 1rem; }

        /* STATS CARDS */
        .tg-stats { max-width: 1200px; margin: -2rem auto 0; padding: 0 1.5rem; position: relative; z-index: 10; }
        .tg-stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .tg-stat-card { background: #fff; border-radius: 14px; padding: 1.25rem; box-shadow: 0 4px 16px rgba(0,0,0,0.08); text-align: center; }
        .tg-stat-value { font-size: 2rem; font-weight: 800; line-height: 1; margin-bottom: 0.3rem; }
        .tg-stat-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
        .tg-stat-card.tg-s-total .tg-stat-value { color: #1e293b; }
        .tg-stat-card.tg-s-approved .tg-stat-value { color: #22863a; }
        .tg-stat-card.tg-s-pending .tg-stat-value { color: #b45309; }
        .tg-stat-card.tg-s-optional .tg-stat-value { color: #6b7280; }
        .tg-stat-card.tg-s-pct .tg-stat-value { color: #1d4ed8; }
        .tg-progress-bar-wrap { background: #e2e8f0; border-radius: 99px; height: 6px; margin-top: 0.5rem; overflow: hidden; }
        .tg-progress-bar { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #22863a, #4ade80); transition: width 0.6s ease; }

        /* CONTROLS */
        .tg-controls { max-width: 1200px; margin: 2rem auto 0; padding: 0 1.5rem; }
        .tg-controls-row { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; justify-content: space-between; background: #fff; border-radius: 14px; padding: 1rem 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .tg-search { flex: 1; min-width: 200px; position: relative; }
        .tg-search input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 0.6rem 0.85rem 0.6rem 2.4rem; font-size: 0.88rem; color: #1e293b; outline: none; transition: border-color 0.2s; background: #f8fafc; }
        .tg-search input:focus { border-color: #4ade80; background: #fff; }
        .tg-search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 0.9rem; }
        .tg-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .tg-filter-btn { border: 1.5px solid #e2e8f0; background: #fff; border-radius: 8px; padding: 0.45rem 0.85rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.2s; color: #64748b; white-space: nowrap; }
        .tg-filter-btn:hover { border-color: #94a3b8; color: #1e293b; }
        .tg-filter-btn.tg-active { background: #0f172a; color: #fff; border-color: #0f172a; }
        .tg-filter-btn.tg-f-approved.tg-active { background: #22863a; border-color: #22863a; }
        .tg-filter-btn.tg-f-pending.tg-active { background: #b45309; border-color: #b45309; }
        .tg-filter-btn.tg-f-optional.tg-active { background: #6b7280; border-color: #6b7280; }
        .tg-filter-btn.tg-f-recommended.tg-active { background: #1d4ed8; border-color: #1d4ed8; }
        .tg-filter-btn.tg-f-high.tg-active { background: #dc2626; border-color: #dc2626; }
        .tg-action-btns { display: flex; gap: 0.5rem; }
        .tg-action-btn { border: 1.5px solid #e2e8f0; background: #fff; border-radius: 8px; padding: 0.45rem 1rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; color: #64748b; transition: all 0.2s; white-space: nowrap; }
        .tg-action-btn:hover { border-color: #4ade80; color: #1e293b; }

        /* CHECKLIST */
        .tg-content { max-width: 1200px; margin: 1.5rem auto 3rem; padding: 0 1.5rem; }
        .tg-section { margin-bottom: 1.5rem; background: #fff; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden; }
        .tg-section-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; }
        .tg-section-title { font-size: 0.88rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #1e293b; display: flex; align-items: center; gap: 0.6rem; }
        .tg-section-count { font-size: 0.72rem; background: #e2e8f0; border-radius: 50px; padding: 0.2rem 0.6rem; color: #64748b; font-weight: 600; }
        .tg-table { width: 100%; border-collapse: collapse; }
        .tg-table th { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; padding: 0.6rem 1rem; border-bottom: 1px solid #f1f5f9; text-align: left; white-space: nowrap; }
        .tg-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 0.88rem; }
        .tg-table tr:last-child td { border-bottom: none; }
        .tg-table tr:hover td { background: #fafbfc; }
        .tg-item-name { font-weight: 600; color: #1e293b; }
        .tg-item-area { font-size: 0.78rem; color: #94a3b8; margin-top: 0.15rem; }
        .tg-qty { font-size: 0.82rem; color: #64748b; white-space: nowrap; }
        .tg-priority-badge { display: inline-flex; align-items: center; padding: 0.2rem 0.55rem; border-radius: 50px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
        .tg-status-select { border: 1.5px solid; border-radius: 8px; padding: 0.35rem 0.6rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; outline: none; transition: all 0.2s; background: transparent; appearance: none; -webkit-appearance: none; padding-right: 1.4rem; }
        .tg-status-wrap { position: relative; display: inline-block; }
        .tg-status-arrow { position: absolute; right: 0.35rem; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 0.6rem; }
        .tg-notes-input { border: 1.5px solid #e2e8f0; border-radius: 6px; padding: 0.3rem 0.6rem; font-size: 0.78rem; color: #1e293b; outline: none; background: #f8fafc; transition: border-color 0.2s; width: 100%; min-width: 140px; }
        .tg-notes-input:focus { border-color: #4ade80; background: #fff; }
        .tg-empty { text-align: center; padding: 3rem 1rem; color: #94a3b8; font-size: 0.9rem; }

        /* FOOTER */
        .tg-footer { background: #0f172a; text-align: center; padding: 2rem 1.5rem; color: rgba(255,255,255,0.4); font-size: 0.82rem; }
        .tg-footer span { color: #4ade80; }

        @media (max-width: 900px) {
          .tg-stats-grid { grid-template-columns: repeat(3, 1fr); }
          .tg-table th:nth-child(4), .tg-table td:nth-child(4) { display: none; }
        }
        @media (max-width: 640px) {
          .tg-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .tg-controls-row { flex-direction: column; align-items: stretch; }
          .tg-table th:nth-child(3), .tg-table td:nth-child(3),
          .tg-table th:nth-child(5), .tg-table td:nth-child(5) { display: none; }
        }
      `}</style>

      {/* HEADER */}
      <header className="tg-header">
        <div className="tg-header-inner">
          <div className="tg-header-top">
            <div className="tg-logo">International Property <span>Management</span></div>
            <a href="/" className="tg-back-btn">← Back to IPM Services</a>
          </div>
          <div className="tg-badge">🏠 Airbnb Launch Tracker</div>
          <h1>New Property Launch Checklist<br/><span>Tegucigalpa, Honduras</span></h1>
          <p className="tg-header-sub" style={{marginTop:'0.5rem'}}>4 Bedroom · 10 Guest Capacity · Short-Term Rental Setup Tracker</p>
        </div>
      </header>

      {/* PROGRESS CARDS */}
      <div className="tg-stats">
        <div className="tg-stats-grid">
          <div className="tg-stat-card tg-s-total">
            <div className="tg-stat-value">{stats.total}</div>
            <div className="tg-stat-label">Total Items</div>
          </div>
          <div className="tg-stat-card tg-s-approved">
            <div className="tg-stat-value">{stats.approved}</div>
            <div className="tg-stat-label">Approved</div>
          </div>
          <div className="tg-stat-card tg-s-pending">
            <div className="tg-stat-value">{stats.pending}</div>
            <div className="tg-stat-label">Pending Purchase</div>
          </div>
          <div className="tg-stat-card tg-s-optional">
            <div className="tg-stat-value">{stats.optional}</div>
            <div className="tg-stat-label">Optional Later</div>
          </div>
          <div className="tg-stat-card tg-s-pct">
            <div className="tg-stat-value">{stats.pct}%</div>
            <div className="tg-stat-label">Complete</div>
            <div className="tg-progress-bar-wrap">
              <div className="tg-progress-bar" style={{width:`${stats.pct}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="tg-controls">
        <div className="tg-controls-row">
          <div className="tg-search">
            <span className="tg-search-icon">🔍</span>
            <input type="text" placeholder="Search items, rooms, or categories…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="tg-filters">
            {[
              { key: 'all',         label: 'All',             cls: '' },
              { key: 'approved',    label: 'Approved',        cls: 'tg-f-approved' },
              { key: 'pending',     label: 'Pending Purchase',cls: 'tg-f-pending' },
              { key: 'optional',    label: 'Optional Later',  cls: 'tg-f-optional' },
              { key: 'recommended', label: 'Recommended',     cls: 'tg-f-recommended' },
              { key: 'high',        label: '🔴 High Priority',cls: 'tg-f-high' },
            ].map(f => (
              <button key={f.key} className={`tg-filter-btn ${f.cls} ${filter === f.key ? 'tg-active' : ''}`} onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
          <div className="tg-action-btns">
            <button className="tg-action-btn" onClick={() => alert('Export feature coming soon!')}>📤 Export Checklist</button>
            <button className="tg-action-btn" onClick={() => alert('Add item feature coming soon!')}>+ Add New Item</button>
          </div>
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="tg-content">
        {filteredItems.length === 0 && (
          <div className="tg-empty">No items match your current filter or search.</div>
        )}
        {SECTIONS.map(section => {
          const sectionItems = filteredItems.filter(i => i.section === section);
          if (sectionItems.length === 0) return null;
          const icons = { 'Bedroom Setup': '🛏', 'Bathroom Supplies': '🚿', 'Kitchen Setup': '🍳', 'Living & Dining Room': '🛋', 'Safety, Entry & Guest Access': '🔐', 'Cleaning & Maintenance': '🧹', 'Storage / Headquarters Room': '📦' };
          return (
            <div className="tg-section" key={section}>
              <div className="tg-section-header">
                <div className="tg-section-title">{icons[section] || '📋'} {section} <span className="tg-section-count">{sectionItems.length}</span></div>
              </div>
              <div style={{overflowX:'auto'}}>
                <table className="tg-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Area</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectionItems.map(item => {
                      const s = getStatusStyle(item.status);
                      const p = PRIORITY[item.priority] || PRIORITY.low;
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="tg-item-name">{item.name}</div>
                          </td>
                          <td><span className="tg-qty">{item.qty}</span></td>
                          <td><span style={{fontSize:'0.78rem',color:'#64748b'}}>{item.area}</span></td>
                          <td>
                            <span className="tg-priority-badge" style={{color:p.color,background:p.bg}}>{p.label}</span>
                          </td>
                          <td>
                            <div className="tg-status-wrap">
                              <select
                                className="tg-status-select"
                                value={item.status}
                                style={{color:s.color,borderColor:s.border,background:s.bg}}
                                onChange={e => updateItem(item.id, 'status', e.target.value)}
                              >
                                {STATUS_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                              <span className="tg-status-arrow" style={{color:s.color}}>▼</span>
                            </div>
                          </td>
                          <td>
                            <input
                              className="tg-notes-input"
                              type="text"
                              placeholder="Add note…"
                              value={item.notes}
                              onChange={e => updateItem(item.id, 'notes', e.target.value)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="tg-footer">
        <p>© {new Date().getFullYear()} <span>IPM</span> – International Property Management · Tegucigalpa Airbnb Launch Tracker · Private & Confidential</p>
      </footer>
    </div>
  );
};

export default TegucigalpaChecklist;
