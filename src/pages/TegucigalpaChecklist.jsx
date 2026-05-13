import { useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'ipm_teg_checklist_v2';

const STATUS_OPTIONS = [
  { value: 'purchased',   labels: { en: 'Purchased',          es: 'Comprado' },             color: '#22863a', bg: '#dcfce7', border: '#86efac' },
  { value: 'pending',     labels: { en: 'Pending Purchase',   es: 'Pendiente de Compra' },  color: '#b45309', bg: '#fef3c7', border: '#fcd34d' },
  { value: 'optional',    labels: { en: 'Optional Later',     es: 'Opcional Más Adelante' },color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db' },
  { value: 'recommended', labels: { en: 'Recommended Add-On', es: 'Recomendado' },          color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
];

const PRIORITY = {
  high:   { labels: { en: 'High',   es: 'Alta' },   color: '#dc2626', bg: '#fee2e2' },
  medium: { labels: { en: 'Medium', es: 'Media' },  color: '#d97706', bg: '#fef3c7' },
  low:    { labels: { en: 'Low',    es: 'Baja' },   color: '#059669', bg: '#d1fae5' },
};

const SECTION_LABELS = {
  'Master Bedroom':                   { en: 'Master Bedroom',                            es: 'Recámara Principal' },
  '2nd Bedroom (Upstairs · Balcony)': { en: '2nd Bedroom (Upstairs · Balcony)',          es: '2.ª Recámara (Arriba · Balcón)' },
  '3rd Bedroom (Upstairs)':           { en: '3rd Bedroom (Upstairs)',                    es: '3.ª Recámara (Arriba)' },
  '4th Bedroom (Downstairs)':         { en: '4th Bedroom (Downstairs)',                  es: '4.ª Recámara (Abajo)' },
  'Bathroom Supplies':                { en: 'Bathroom Supplies',                         es: 'Artículos de Baño' },
  'Kitchen Setup':                    { en: 'Kitchen Setup',                             es: 'Cocina' },
  'Living & Dining Room':             { en: 'Living & Dining Room',                      es: 'Sala y Comedor' },
  'Safety, Entry & Guest Access':     { en: 'Safety, Entry & Guest Access',              es: 'Seguridad, Entrada y Acceso' },
  'Cleaning & Maintenance':           { en: 'Cleaning & Maintenance',                    es: 'Limpieza y Mantenimiento' },
  'Storage / Headquarters Room':      { en: 'Storage / Headquarters Room',               es: 'Almacén / Cuartel' },
};

const SECTION_ICONS = {
  'Master Bedroom': '🛏',
  '2nd Bedroom (Upstairs · Balcony)': '🛏',
  '3rd Bedroom (Upstairs)': '🛏',
  '4th Bedroom (Downstairs)': '🛏',
  'Bathroom Supplies': '🚿',
  'Kitchen Setup': '🍳',
  'Living & Dining Room': '🛋',
  'Safety, Entry & Guest Access': '🔐',
  'Cleaning & Maintenance': '🧹',
  'Storage / Headquarters Room': '📦',
};

// Helper to make an item with bilingual name/area
const it = (id, section, name_en, name_es, qty, area_en, area_es, status, priority, notes_en = '', notes_es = '') => ({
  id, section,
  name: { en: name_en, es: name_es },
  qty,
  area: { en: area_en, es: area_es },
  status, priority,
  notes: { en: notes_en, es: notes_es },
});

const INITIAL_ITEMS = [
  // ===== MASTER BEDROOM =====
  it(1,  'Master Bedroom', 'King bed',                   'Cama king',                       '1',           'Master Bedroom', 'Recámara Principal', 'purchased', 'high'),
  it(2,  'Master Bedroom', 'Mattress protector',         'Protector de colchón',            '1',           'Master Bedroom', 'Recámara Principal', 'pending',   'high'),
  it(3,  'Master Bedroom', 'Sheet sets',                 'Juegos de sábanas',               '2',           'Master Bedroom', 'Recámara Principal', 'pending',   'high', '2 sets for turnover', '2 juegos para rotación'),
  it(4,  'Master Bedroom', 'Comforter or duvet',         'Edredón o duvet',                 '1',           'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(5,  'Master Bedroom', 'Pillows',                    'Almohadas',                       '6',           'Master Bedroom', 'Recámara Principal', 'pending',   'high'),
  it(6,  'Master Bedroom', 'Pillow protectors',          'Protectores de almohada',         '6',           'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(7,  'Master Bedroom', 'Nightstand lamps',           'Lámparas de mesa de noche',       '2',           'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(8,  'Master Bedroom', 'Hangers',                    'Ganchos / colgadores',            '12–15',       'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(9,  'Master Bedroom', 'Curtains',                   'Cortinas',                        'Per windows', 'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(10, 'Master Bedroom', 'TV',                         'Televisor',                       '1',           'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(11, 'Master Bedroom', 'TV mount',                   'Soporte para TV',                 '1',           'Master Bedroom', 'Recámara Principal', 'pending',   'medium'),
  it(12, 'Master Bedroom', 'Fake plant',                 'Planta artificial',               '1–2',         'Master Bedroom', 'Recámara Principal', 'pending',   'low'),

  // ===== 2ND BEDROOM (Upstairs · Balcony) =====
  it(13, '2nd Bedroom (Upstairs · Balcony)', 'Full bed',                'Cama matrimonial',                '1',           '2nd Bedroom', '2.ª Recámara', 'purchased', 'high'),
  it(14, '2nd Bedroom (Upstairs · Balcony)', 'Mattress protector',      'Protector de colchón',            '1',           '2nd Bedroom', '2.ª Recámara', 'pending',   'high'),
  it(15, '2nd Bedroom (Upstairs · Balcony)', 'Sheet sets',              'Juegos de sábanas',               '2',           '2nd Bedroom', '2.ª Recámara', 'pending',   'high', '2 sets for turnover', '2 juegos para rotación'),
  it(16, '2nd Bedroom (Upstairs · Balcony)', 'Comforter or duvet',      'Edredón o duvet',                 '1',           '2nd Bedroom', '2.ª Recámara', 'pending',   'medium'),
  it(17, '2nd Bedroom (Upstairs · Balcony)', 'Pillows',                 'Almohadas',                       '4',           '2nd Bedroom', '2.ª Recámara', 'pending',   'high'),
  it(18, '2nd Bedroom (Upstairs · Balcony)', 'Pillow protectors',       'Protectores de almohada',         '4',           '2nd Bedroom', '2.ª Recámara', 'pending',   'medium'),
  it(19, '2nd Bedroom (Upstairs · Balcony)', 'Nightstand lamps',        'Lámparas de mesa de noche',       '2',           '2nd Bedroom', '2.ª Recámara', 'pending',   'medium'),
  it(20, '2nd Bedroom (Upstairs · Balcony)', 'Hangers',                 'Ganchos / colgadores',            '10–12',       '2nd Bedroom', '2.ª Recámara', 'pending',   'medium'),
  it(21, '2nd Bedroom (Upstairs · Balcony)', 'Curtains',                'Cortinas',                        'Per windows', '2nd Bedroom', '2.ª Recámara', 'pending',   'medium'),
  it(22, '2nd Bedroom (Upstairs · Balcony)', 'Optional TV',             'Televisor (opcional)',            '1',           '2nd Bedroom', '2.ª Recámara', 'optional',  'low'),
  it(23, '2nd Bedroom (Upstairs · Balcony)', 'Optional TV mount',       'Soporte para TV (opcional)',      '1',           '2nd Bedroom', '2.ª Recámara', 'optional',  'low'),
  it(24, '2nd Bedroom (Upstairs · Balcony)', 'Fake plant',              'Planta artificial',               '1',           '2nd Bedroom', '2.ª Recámara', 'pending',   'low'),

  // ===== 3RD BEDROOM (Upstairs) =====
  it(25, '3rd Bedroom (Upstairs)', 'Full bed',                'Cama matrimonial',                '1',           '3rd Bedroom', '3.ª Recámara', 'purchased', 'high'),
  it(26, '3rd Bedroom (Upstairs)', 'Mattress protector',      'Protector de colchón',            '1',           '3rd Bedroom', '3.ª Recámara', 'pending',   'high'),
  it(27, '3rd Bedroom (Upstairs)', 'Sheet sets',              'Juegos de sábanas',               '2',           '3rd Bedroom', '3.ª Recámara', 'pending',   'high', '2 sets for turnover', '2 juegos para rotación'),
  it(28, '3rd Bedroom (Upstairs)', 'Comforter or duvet',      'Edredón o duvet',                 '1',           '3rd Bedroom', '3.ª Recámara', 'pending',   'medium'),
  it(29, '3rd Bedroom (Upstairs)', 'Pillows',                 'Almohadas',                       '4',           '3rd Bedroom', '3.ª Recámara', 'pending',   'high'),
  it(30, '3rd Bedroom (Upstairs)', 'Pillow protectors',       'Protectores de almohada',         '4',           '3rd Bedroom', '3.ª Recámara', 'pending',   'medium'),
  it(31, '3rd Bedroom (Upstairs)', 'Nightstand lamps',        'Lámparas de mesa de noche',       '2',           '3rd Bedroom', '3.ª Recámara', 'pending',   'medium'),
  it(32, '3rd Bedroom (Upstairs)', 'Hangers',                 'Ganchos / colgadores',            '10–12',       '3rd Bedroom', '3.ª Recámara', 'pending',   'medium'),
  it(33, '3rd Bedroom (Upstairs)', 'Curtains',                'Cortinas',                        'Per windows', '3rd Bedroom', '3.ª Recámara', 'pending',   'medium'),
  it(34, '3rd Bedroom (Upstairs)', 'Optional TV',             'Televisor (opcional)',            '1',           '3rd Bedroom', '3.ª Recámara', 'optional',  'low'),
  it(35, '3rd Bedroom (Upstairs)', 'Optional TV mount',       'Soporte para TV (opcional)',      '1',           '3rd Bedroom', '3.ª Recámara', 'optional',  'low'),
  it(36, '3rd Bedroom (Upstairs)', 'Fake plant',              'Planta artificial',               '1',           '3rd Bedroom', '3.ª Recámara', 'pending',   'low'),

  // ===== 4TH BEDROOM (Downstairs) =====
  it(37, '4th Bedroom (Downstairs)', 'Full-size bunk beds',     'Camas litera matrimoniales',      '2',           '4th Bedroom', '4.ª Recámara', 'pending', 'high'),
  it(38, '4th Bedroom (Downstairs)', 'Mattress protectors',     'Protectores de colchón',          '4',           '4th Bedroom', '4.ª Recámara', 'pending', 'high'),
  it(39, '4th Bedroom (Downstairs)', 'Sheet sets',              'Juegos de sábanas',               '8',           '4th Bedroom', '4.ª Recámara', 'pending', 'high', '2 sets per bunk for turnover', '2 juegos por litera para rotación'),
  it(40, '4th Bedroom (Downstairs)', 'Comforters or duvets',    'Edredones o duvets',              '4',           '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(41, '4th Bedroom (Downstairs)', 'Pillows',                 'Almohadas',                       '8',           '4th Bedroom', '4.ª Recámara', 'pending', 'high'),
  it(42, '4th Bedroom (Downstairs)', 'Pillow protectors',       'Protectores de almohada',         '8',           '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(43, '4th Bedroom (Downstairs)', 'Nightstand lamps',        'Lámparas de mesa de noche',       '1–2',         '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(44, '4th Bedroom (Downstairs)', 'Hangers',                 'Ganchos / colgadores',            '10–12',       '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(45, '4th Bedroom (Downstairs)', 'Curtains',                'Cortinas',                        'Per windows', '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(46, '4th Bedroom (Downstairs)', 'TV',                      'Televisor',                       '1',           '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(47, '4th Bedroom (Downstairs)', 'TV mount',                'Soporte para TV',                 '1',           '4th Bedroom', '4.ª Recámara', 'pending', 'medium'),
  it(48, '4th Bedroom (Downstairs)', 'Fake plant',              'Planta artificial',               '1',           '4th Bedroom', '4.ª Recámara', 'pending', 'low'),

  // ===== BATHROOM =====
  it(49, 'Bathroom Supplies', 'Bath towels',                       'Toallas de baño',                       '20',     'Bathrooms / Linen closet',  'Baños / Armario de blancos', 'pending', 'high'),
  it(50, 'Bathroom Supplies', 'Washcloths',                        'Toallas pequeñas',                      '20',     'Bathrooms / Linen closet',  'Baños / Armario de blancos', 'pending', 'medium'),
  it(51, 'Bathroom Supplies', 'Hand towels',                       'Toallas de manos',                      '10',     'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(52, 'Bathroom Supplies', 'Bathroom mats',                     'Tapetes de baño',                       '2–4',    'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(53, 'Bathroom Supplies', 'Soap dispensers',                   'Dispensadores de jabón',                '2–3',    'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(54, 'Bathroom Supplies', 'Shampoo dispensers',                'Dispensadores de shampoo',              '2–3',    'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(55, 'Bathroom Supplies', 'Conditioner dispensers',            'Dispensadores de acondicionador',       '2–3',    'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(56, 'Bathroom Supplies', 'Body wash & hand soap refill (bulk)', 'Jabón corporal y de manos (a granel)', 'Bulk',  'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(57, 'Bathroom Supplies', 'Hair dryers',                       'Secadoras de cabello',                  '2',      'Upstairs bathrooms',        'Baños de arriba',            'pending', 'medium'),
  it(58, 'Bathroom Supplies', 'Toothbrush / toiletry holders',     'Porta cepillos / artículos de aseo',    '2–3',    'Bathrooms',                 'Baños',                      'pending', 'low'),
  it(59, 'Bathroom Supplies', 'Shower curtain',                    'Cortina de baño',                       '1',      'Upstairs non-master bathroom','Baño superior (no principal)','pending','medium'),
  it(60, 'Bathroom Supplies', 'Shower rod',                        'Barra para cortina',                    '1',      'Upstairs non-master bathroom','Baño superior (no principal)','pending','medium'),
  it(61, 'Bathroom Supplies', 'Toilet brushes',                    'Cepillos de inodoro',                   '2–3',    'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(62, 'Bathroom Supplies', 'Toilet plungers',                   'Destapadores de inodoro',               '2',      'Bathrooms',                 'Baños',                      'pending', 'medium'),
  it(63, 'Bathroom Supplies', 'Bathroom trash cans',               'Botes de basura de baño',               '2–3',    'Bathrooms',                 'Baños',                      'pending', 'low'),
  it(64, 'Bathroom Supplies', 'Toilet paper starter supply',       'Papel higiénico (suministro inicial)',  'Bulk',   'Bathrooms',                 'Baños',                      'pending', 'high'),

  // ===== KITCHEN =====
  it(65, 'Kitchen Setup', 'Plates',                       'Platos',                        '12–16',     'Kitchen', 'Cocina', 'pending',   'high'),
  it(66, 'Kitchen Setup', 'Bowls',                        'Tazones',                       '12–16',     'Kitchen', 'Cocina', 'pending',   'high'),
  it(67, 'Kitchen Setup', 'Cups / glasses',               'Vasos',                         '12–16',     'Kitchen', 'Cocina', 'pending',   'high'),
  it(68, 'Kitchen Setup', 'Coffee mugs',                  'Tazas de café',                 '10–12',     'Kitchen', 'Cocina', 'pending',   'medium'),
  it(69, 'Kitchen Setup', 'Silverware sets',              'Juegos de cubiertos',           '12–16',     'Kitchen', 'Cocina', 'pending',   'high'),
  it(70, 'Kitchen Setup', 'Pots and pans set',            'Juego de ollas y sartenes',     '1 full set','Kitchen', 'Cocina', 'pending',   'high'),
  it(71, 'Kitchen Setup', 'Cooking utensils set',         'Juego de utensilios de cocina', '1 set',     'Kitchen', 'Cocina', 'pending',   'high'),
  it(72, 'Kitchen Setup', 'Knife set',                    'Juego de cuchillos',            '1',         'Kitchen', 'Cocina', 'pending',   'high'),
  it(73, 'Kitchen Setup', 'Cutting boards',               'Tablas para cortar',            '2',         'Kitchen', 'Cocina', 'pending',   'medium'),
  it(74, 'Kitchen Setup', 'Dish drying rack',             'Escurridor de platos',          '1',         'Kitchen', 'Cocina', 'pending',   'medium'),
  it(75, 'Kitchen Setup', 'Dish towels',                  'Trapos de cocina',              '8–10',      'Kitchen', 'Cocina', 'pending',   'medium'),
  it(76, 'Kitchen Setup', 'Oven mitts',                   'Guantes para horno',            '2–4',       'Kitchen', 'Cocina', 'pending',   'medium'),
  it(77, 'Kitchen Setup', 'Sponges (bulk)',               'Esponjas (a granel)',           'Bulk',      'Kitchen', 'Cocina', 'pending',   'medium'),
  it(78, 'Kitchen Setup', 'Dish soap (bulk)',             'Jabón para platos (a granel)',  'Bulk',      'Kitchen', 'Cocina', 'pending',   'medium'),
  it(79, 'Kitchen Setup', 'Paper towels (bulk)',          'Toallas de papel (a granel)',   'Bulk',      'Kitchen', 'Cocina', 'purchased', 'medium', 'Verify stock', 'Verificar existencias'),
  it(80, 'Kitchen Setup', 'Trash bags (bulk)',            'Bolsas de basura (a granel)',   'Bulk',      'Kitchen', 'Cocina', 'pending',   'medium'),
  it(81, 'Kitchen Setup', 'Hot water kettle',             'Hervidor de agua',              '1',         'Kitchen', 'Cocina', 'pending',   'medium'),
  it(82, 'Kitchen Setup', 'Coffee maker',                 'Cafetera',                      '1',         'Kitchen', 'Cocina', 'recommended','medium'),
  it(83, 'Kitchen Setup', 'Blender',                      'Licuadora',                     '1',         'Kitchen', 'Cocina', 'optional',  'low'),
  it(84, 'Kitchen Setup', 'Can opener',                   'Abrelatas',                     '1',         'Kitchen', 'Cocina', 'recommended','low'),
  it(85, 'Kitchen Setup', 'Bottle opener',                'Destapador',                    '1',         'Kitchen', 'Cocina', 'recommended','low'),
  it(86, 'Kitchen Setup', 'Food storage containers set',  'Recipientes para alimentos',    '1 set',     'Kitchen', 'Cocina', 'recommended','low'),

  // ===== LIVING & DINING =====
  it(87, 'Living & Dining Room', 'Coffee table',                       'Mesa de centro',                       '1',     'Living room',                    'Sala',                       'pending',     'medium'),
  it(88, 'Living & Dining Room', 'Coasters',                           'Posavasos',                            '8–12',  'Living room / Dining room',      'Sala / Comedor',             'pending',     'low'),
  it(89, 'Living & Dining Room', 'Dining table coasters / placemats',  'Posavasos / individuales para comedor','10–12', 'Dining room',                    'Comedor',                    'pending',     'low'),
  it(90, 'Living & Dining Room', 'Tablecloth',                         'Mantel',                               '1–2',   'Dining room',                    'Comedor',                    'pending',     'low'),
  it(91, 'Living & Dining Room', 'Vase',                               'Florero',                              '1',     'Dining room',                    'Comedor',                    'pending',     'low'),
  it(92, 'Living & Dining Room', 'Fake flowers / centerpiece',         'Flores artificiales / centro de mesa', '1',     'Dining room',                    'Comedor',                    'pending',     'low'),
  it(93, 'Living & Dining Room', 'Books (decorative)',                 'Libros (decorativos)',                 '3–5',   'Living room',                    'Sala',                       'recommended', 'low'),
  it(94, 'Living & Dining Room', 'Board games',                        'Juegos de mesa',                       '3–5',   'Living room',                    'Sala',                       'recommended', 'low'),
  it(95, 'Living & Dining Room', 'Welcome book / house manual',        'Libro de bienvenida / manual',         '1',     'Living room',                    'Sala',                       'recommended', 'high'),
  it(96, 'Living & Dining Room', 'Fake plants (common areas)',         'Plantas artificiales (áreas comunes)', '4–6',   'Living room / Dining room',      'Sala / Comedor',             'pending',     'low'),

  // ===== SAFETY & ENTRY =====
  it(97,  'Safety, Entry & Guest Access', 'Key lockbox',                'Caja de seguridad para llaves',  '1',           'Front door',              'Puerta principal',     'pending',     'high'),
  it(98,  'Safety, Entry & Guest Access', 'Keypad smart lock',          'Cerradura inteligente con teclado','1',         'Front door',              'Puerta principal',     'recommended', 'high'),
  it(99,  'Safety, Entry & Guest Access', 'Extra keys',                 'Llaves adicionales',             '2–3 sets',    'Storage / Admin',         'Almacén / Admin.',     'pending',     'medium'),
  it(100, 'Safety, Entry & Guest Access', 'Smoke detectors',            'Detectores de humo',             'Verify all areas','Whole house',          'Toda la casa',         'recommended', 'high'),
  it(101, 'Safety, Entry & Guest Access', 'Carbon monoxide detector',   'Detector de monóxido de carbono','1–2',         'Whole house',             'Toda la casa',         'recommended', 'high'),
  it(102, 'Safety, Entry & Guest Access', 'Fire extinguisher',          'Extintor de incendios',          '1–2',         'Kitchen / Common area',   'Cocina / Área común',  'recommended', 'high'),
  it(103, 'Safety, Entry & Guest Access', 'First aid kit',              'Botiquín de primeros auxilios',  '1',           'Kitchen / Common area',   'Cocina / Área común',  'recommended', 'high'),
  it(104, 'Safety, Entry & Guest Access', 'High-speed Wi-Fi setup',     'Wi-Fi de alta velocidad',        '1',           'Whole house',             'Toda la casa',         'pending',     'high', 'Should support international remote workers', 'Debe soportar trabajadores remotos internacionales'),
  it(105, 'Safety, Entry & Guest Access', 'Wi-Fi info display card',    'Tarjeta con info de Wi-Fi',      '1–2',         'Living room / Bedrooms',  'Sala / Recámaras',     'recommended', 'medium'),

  // ===== CLEANING & MAINTENANCE =====
  it(106, 'Cleaning & Maintenance', 'All-purpose cleaner (bulk)',       'Limpiador multiusos (a granel)',     'Bulk',      'Cleaning storage', 'Almacén de limpieza', 'pending',     'high'),
  it(107, 'Cleaning & Maintenance', 'Bathroom cleaner (bulk)',          'Limpiador de baños (a granel)',      'Bulk',      'Cleaning storage', 'Almacén de limpieza', 'pending',     'high'),
  it(108, 'Cleaning & Maintenance', 'Glass cleaner (bulk)',             'Limpiavidrios (a granel)',           'Bulk',      'Cleaning storage', 'Almacén de limpieza', 'pending',     'medium'),
  it(109, 'Cleaning & Maintenance', 'Floor cleaner (bulk)',             'Limpiador de pisos (a granel)',      'Bulk',      'Cleaning storage', 'Almacén de limpieza', 'pending',     'high'),
  it(110, 'Cleaning & Maintenance', 'Disinfectant wipes / spray (bulk)','Toallitas / spray desinfectante',    'Bulk',      'Cleaning storage', 'Almacén de limpieza', 'pending',     'high'),
  it(111, 'Cleaning & Maintenance', 'Broom',                            'Escoba',                             '1',         'Cleaning storage', 'Almacén de limpieza', 'pending',     'high'),
  it(112, 'Cleaning & Maintenance', 'Mop and bucket',                   'Trapeador y cubeta',                 '1',         'Cleaning storage', 'Almacén de limpieza', 'pending',     'high'),
  it(113, 'Cleaning & Maintenance', 'Vacuum',                           'Aspiradora',                         '1',         'Cleaning storage', 'Almacén de limpieza', 'recommended', 'medium'),
  it(114, 'Cleaning & Maintenance', 'Duster for fans & cobwebs',        'Plumero para ventiladores y telarañas','1–2',     'Cleaning storage', 'Almacén de limpieza', 'pending',     'medium'),
  it(115, 'Cleaning & Maintenance', 'Laundry detergent (bulk)',         'Detergente de ropa (a granel)',      'Bulk',      'Laundry area',     'Área de lavandería',   'pending',     'high'),
  it(116, 'Cleaning & Maintenance', 'Clothes drying rack',              'Tendedero de ropa',                  '1–2',       'Laundry area',     'Área de lavandería',   'pending',     'medium'),
  it(117, 'Cleaning & Maintenance', 'Glade plug-ins / air fresheners',  'Aromatizantes / ambientadores',      '4–6',       'Whole house',      'Toda la casa',         'pending',     'medium'),
  it(118, 'Cleaning & Maintenance', 'Extra batteries (assorted)',       'Pilas adicionales (surtidas)',       'Assorted',  'Storage',          'Almacén',              'recommended', 'low'),
  it(119, 'Cleaning & Maintenance', 'Light bulbs (assorted)',           'Focos / bombillas (surtidos)',       'Assorted',  'Storage',          'Almacén',              'recommended', 'low'),

  // ===== STORAGE / HQ =====
  it(120, 'Storage / Headquarters Room', 'Use outside room (by laundry) as storage/HQ', 'Usar cuarto exterior (junto a lavandería) como almacén/HQ', '—', 'Storage room', 'Cuarto de almacén', 'purchased',   'high', 'Not guest-facing yet', 'No accesible para huéspedes'),
  it(121, 'Storage / Headquarters Room', 'Storage shelving',                            'Estantería de almacén',                                      '1–2', 'Storage room', 'Cuarto de almacén', 'recommended', 'medium'),
  it(122, 'Storage / Headquarters Room', 'Storage bins',                                'Cajas de almacenamiento',                                    '6–10','Storage room', 'Cuarto de almacén', 'recommended', 'medium'),
  it(123, 'Storage / Headquarters Room', 'Cleaning supply labels',                      'Etiquetas para artículos de limpieza',                       '1 set','Storage room','Cuarto de almacén', 'recommended', 'low'),
  it(124, 'Storage / Headquarters Room', 'Keep storage room locked from guests',        'Mantener almacén con llave (no acceso a huéspedes)',         '—',  'Storage room',  'Cuarto de almacén', 'purchased',   'high', 'Admin access only', 'Solo acceso administrativo'),
  it(125, 'Storage / Headquarters Room', 'Extra blankets',                              'Cobijas adicionales',                                        '4–6','Storage room',  'Cuarto de almacén', 'pending',     'low'),
];

const SECTIONS = [...new Set(INITIAL_ITEMS.map(i => i.section))];

const UI = {
  en: {
    backBtn: '← Back to IPM Services',
    badge: '🏠 Airbnb Launch Tracker',
    title1: 'New Property Launch Checklist',
    titleLoc: 'Tegucigalpa, Honduras',
    sub: '4 Bedroom · 10 Guest Capacity · Short-Term Rental Setup Tracker',
    statTotal: 'Total Items',
    statPurchased: 'Purchased',
    statPending: 'Pending Purchase',
    statOptional: 'Optional Later',
    statComplete: 'Complete',
    searchPh: 'Search items, rooms, or categories…',
    fAll: 'All',
    fPurchased: 'Purchased',
    fPending: 'Pending Purchase',
    fOptional: 'Optional Later',
    fRecommended: 'Recommended',
    fHigh: '🔴 High Priority',
    btnExport: '📤 Export Checklist',
    btnAdd: '+ Add New Item',
    thItem: 'Item', thQty: 'Qty', thArea: 'Area', thPriority: 'Priority', thStatus: 'Status', thNotes: 'Notes',
    notePh: 'Add note…',
    empty: 'No items match your current filter or search.',
    soonExport: 'Export feature coming soon!',
    soonAdd: 'Add item feature coming soon!',
    footer: '– International Property Management · Tegucigalpa Airbnb Launch Tracker · Private & Confidential',
  },
  es: {
    backBtn: '← Volver a IPM Services',
    badge: '🏠 Seguimiento de Lanzamiento Airbnb',
    title1: 'Lista de Lanzamiento de Nueva Propiedad',
    titleLoc: 'Tegucigalpa, Honduras',
    sub: '4 Recámaras · Capacidad para 10 Huéspedes · Seguimiento de Alquiler a Corto Plazo',
    statTotal: 'Artículos Totales',
    statPurchased: 'Comprado',
    statPending: 'Pendiente de Compra',
    statOptional: 'Opcional Más Adelante',
    statComplete: 'Completado',
    searchPh: 'Buscar artículos, habitaciones o categorías…',
    fAll: 'Todos',
    fPurchased: 'Comprado',
    fPending: 'Pendiente',
    fOptional: 'Opcional',
    fRecommended: 'Recomendado',
    fHigh: '🔴 Alta Prioridad',
    btnExport: '📤 Exportar Lista',
    btnAdd: '+ Agregar Artículo',
    thItem: 'Artículo', thQty: 'Cant.', thArea: 'Área', thPriority: 'Prioridad', thStatus: 'Estado', thNotes: 'Notas',
    notePh: 'Agregar nota…',
    empty: 'Ningún artículo coincide con el filtro o búsqueda actual.',
    soonExport: '¡Función de exportación próximamente!',
    soonAdd: '¡Función de agregar artículo próximamente!',
    footer: '– International Property Management · Seguimiento de Lanzamiento Airbnb Tegucigalpa · Privado y Confidencial',
  },
};

const TegucigalpaChecklist = () => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedData = JSON.parse(saved);
        return INITIAL_ITEMS.map(item => ({
          ...item,
          ...(savedData[item.id] ? { status: savedData[item.id].status || item.status, userNotes: savedData[item.id].userNotes || '' } : {}),
        }));
      }
    } catch {}
    return INITIAL_ITEMS;
  });

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('en');
  const t = UI[language];

  useEffect(() => {
    const toSave = {};
    items.forEach(item => { toSave[item.id] = { status: item.status, userNotes: item.userNotes || '' }; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [items]);

  const updateItem = (id, field, value) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const stats = useMemo(() => {
    const total = items.length;
    const purchased = items.filter(i => i.status === 'purchased').length;
    const pending = items.filter(i => i.status === 'pending').length;
    const optional = items.filter(i => i.status === 'optional').length;
    const pct = Math.round((purchased / total) * 100);
    return { total, purchased, pending, optional, pct };
  }, [items]);

  const searchLower = search.toLowerCase();
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchFilter =
        filter === 'all' ? true :
        filter === 'high' ? item.priority === 'high' :
        item.status === filter;
      const matchSearch = search === '' ||
        item.name.en.toLowerCase().includes(searchLower) ||
        item.name.es.toLowerCase().includes(searchLower) ||
        item.area.en.toLowerCase().includes(searchLower) ||
        item.area.es.toLowerCase().includes(searchLower) ||
        item.section.toLowerCase().includes(searchLower) ||
        (SECTION_LABELS[item.section]?.es || '').toLowerCase().includes(searchLower);
      return matchFilter && matchSearch;
    });
  }, [items, filter, search, searchLower]);

  const getStatusStyle = (val) => STATUS_OPTIONS.find(s => s.value === val) || STATUS_OPTIONS[0];

  return (
    <div className="tg-wrap">
      <style>{`
        .tg-wrap { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f0f4f8; min-height: 100vh; color: #1e293b; -webkit-font-smoothing: antialiased; }
        .tg-wrap *, .tg-wrap *::before, .tg-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .tg-wrap h1, .tg-wrap h2, .tg-wrap h3 { font-weight: 700; line-height: 1.25; }
        .tg-wrap a { color: inherit; text-decoration: none; }
        .tg-wrap input, .tg-wrap select, .tg-wrap textarea { font-family: inherit; }

        .tg-header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1e3a5f 100%); padding: 2.5rem 0 3.5rem; position: relative; overflow: hidden; }
        .tg-header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.08) 0%, transparent 60%); }
        .tg-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; position: relative; z-index: 1; }
        .tg-header-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .tg-logo { font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.7); letter-spacing: 0.08em; text-transform: uppercase; }
        .tg-logo span { color: #4ade80; }
        .tg-header-actions { display: flex; gap: 0.6rem; align-items: center; }
        .tg-back-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 8px; padding: 0.5rem 1.1rem; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; }
        .tg-back-btn:hover { background: rgba(255,255,255,0.18); }
        .tg-lang-toggle { display: flex; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; overflow: hidden; }
        .tg-lang-btn { background: transparent; border: none; color: rgba(255,255,255,0.7); padding: 0.5rem 0.85rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; letter-spacing: 0.05em; transition: all 0.2s; }
        .tg-lang-btn:hover { color: #fff; }
        .tg-lang-btn.tg-lang-active { background: #4ade80; color: #0f172a; }
        .tg-header h1 { font-size: clamp(1.5rem, 4vw, 2.4rem); color: #fff; margin-bottom: 0.5rem; }
        .tg-header h1 span { color: #4ade80; }
        .tg-header-sub { font-size: 1rem; color: rgba(255,255,255,0.6); margin-bottom: 0; }
        .tg-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(74,222,128,0.15); border: 1px solid rgba(74,222,128,0.3); border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #4ade80; margin-bottom: 1rem; }

        .tg-stats { max-width: 1200px; margin: -2rem auto 0; padding: 0 1.5rem; position: relative; z-index: 10; }
        .tg-stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
        .tg-stat-card { background: #fff; border-radius: 14px; padding: 1.25rem; box-shadow: 0 4px 16px rgba(0,0,0,0.08); text-align: center; }
        .tg-stat-value { font-size: 2rem; font-weight: 800; line-height: 1; margin-bottom: 0.3rem; }
        .tg-stat-label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; }
        .tg-stat-card.tg-s-total .tg-stat-value { color: #1e293b; }
        .tg-stat-card.tg-s-purchased .tg-stat-value { color: #22863a; }
        .tg-stat-card.tg-s-pending .tg-stat-value { color: #b45309; }
        .tg-stat-card.tg-s-optional .tg-stat-value { color: #6b7280; }
        .tg-stat-card.tg-s-pct .tg-stat-value { color: #1d4ed8; }
        .tg-progress-bar-wrap { background: #e2e8f0; border-radius: 99px; height: 6px; margin-top: 0.5rem; overflow: hidden; }
        .tg-progress-bar { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #22863a, #4ade80); transition: width 0.6s ease; }

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
        .tg-filter-btn.tg-f-purchased.tg-active { background: #22863a; border-color: #22863a; }
        .tg-filter-btn.tg-f-pending.tg-active { background: #b45309; border-color: #b45309; }
        .tg-filter-btn.tg-f-optional.tg-active { background: #6b7280; border-color: #6b7280; }
        .tg-filter-btn.tg-f-recommended.tg-active { background: #1d4ed8; border-color: #1d4ed8; }
        .tg-filter-btn.tg-f-high.tg-active { background: #dc2626; border-color: #dc2626; }
        .tg-action-btns { display: flex; gap: 0.5rem; }
        .tg-action-btn { border: 1.5px solid #e2e8f0; background: #fff; border-radius: 8px; padding: 0.45rem 1rem; font-size: 0.78rem; font-weight: 600; cursor: pointer; color: #64748b; transition: all 0.2s; white-space: nowrap; }
        .tg-action-btn:hover { border-color: #4ade80; color: #1e293b; }

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

      <header className="tg-header">
        <div className="tg-header-inner">
          <div className="tg-header-top">
            <div className="tg-logo">International Property <span>Management</span></div>
            <div className="tg-header-actions">
              <div className="tg-lang-toggle" role="group" aria-label="Language">
                <button className={`tg-lang-btn ${language === 'en' ? 'tg-lang-active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
                <button className={`tg-lang-btn ${language === 'es' ? 'tg-lang-active' : ''}`} onClick={() => setLanguage('es')}>ES</button>
              </div>
              <a href="/" className="tg-back-btn">{t.backBtn}</a>
            </div>
          </div>
          <div className="tg-badge">{t.badge}</div>
          <h1>{t.title1}<br/><span>{t.titleLoc}</span></h1>
          <p className="tg-header-sub" style={{marginTop:'0.5rem'}}>{t.sub}</p>
        </div>
      </header>

      <div className="tg-stats">
        <div className="tg-stats-grid">
          <div className="tg-stat-card tg-s-total">
            <div className="tg-stat-value">{stats.total}</div>
            <div className="tg-stat-label">{t.statTotal}</div>
          </div>
          <div className="tg-stat-card tg-s-purchased">
            <div className="tg-stat-value">{stats.purchased}</div>
            <div className="tg-stat-label">{t.statPurchased}</div>
          </div>
          <div className="tg-stat-card tg-s-pending">
            <div className="tg-stat-value">{stats.pending}</div>
            <div className="tg-stat-label">{t.statPending}</div>
          </div>
          <div className="tg-stat-card tg-s-optional">
            <div className="tg-stat-value">{stats.optional}</div>
            <div className="tg-stat-label">{t.statOptional}</div>
          </div>
          <div className="tg-stat-card tg-s-pct">
            <div className="tg-stat-value">{stats.pct}%</div>
            <div className="tg-stat-label">{t.statComplete}</div>
            <div className="tg-progress-bar-wrap">
              <div className="tg-progress-bar" style={{width:`${stats.pct}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-controls">
        <div className="tg-controls-row">
          <div className="tg-search">
            <span className="tg-search-icon">🔍</span>
            <input type="text" placeholder={t.searchPh} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="tg-filters">
            {[
              { key: 'all',         label: t.fAll,         cls: '' },
              { key: 'purchased',   label: t.fPurchased,   cls: 'tg-f-purchased' },
              { key: 'pending',     label: t.fPending,     cls: 'tg-f-pending' },
              { key: 'optional',    label: t.fOptional,    cls: 'tg-f-optional' },
              { key: 'recommended', label: t.fRecommended, cls: 'tg-f-recommended' },
              { key: 'high',        label: t.fHigh,        cls: 'tg-f-high' },
            ].map(f => (
              <button key={f.key} className={`tg-filter-btn ${f.cls} ${filter === f.key ? 'tg-active' : ''}`} onClick={() => setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
          <div className="tg-action-btns">
            <button className="tg-action-btn" onClick={() => alert(t.soonExport)}>{t.btnExport}</button>
            <button className="tg-action-btn" onClick={() => alert(t.soonAdd)}>{t.btnAdd}</button>
          </div>
        </div>
      </div>

      <div className="tg-content">
        {filteredItems.length === 0 && (
          <div className="tg-empty">{t.empty}</div>
        )}
        {SECTIONS.map(section => {
          const sectionItems = filteredItems.filter(i => i.section === section);
          if (sectionItems.length === 0) return null;
          const sectionLabel = SECTION_LABELS[section]?.[language] || section;
          return (
            <div className="tg-section" key={section}>
              <div className="tg-section-header">
                <div className="tg-section-title">{SECTION_ICONS[section] || '📋'} {sectionLabel} <span className="tg-section-count">{sectionItems.length}</span></div>
              </div>
              <div style={{overflowX:'auto'}}>
                <table className="tg-table">
                  <thead>
                    <tr>
                      <th>{t.thItem}</th>
                      <th>{t.thQty}</th>
                      <th>{t.thArea}</th>
                      <th>{t.thPriority}</th>
                      <th>{t.thStatus}</th>
                      <th>{t.thNotes}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectionItems.map(item => {
                      const s = getStatusStyle(item.status);
                      const p = PRIORITY[item.priority] || PRIORITY.low;
                      const defaultNote = item.notes?.[language] || '';
                      const userNote = item.userNotes ?? '';
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="tg-item-name">{item.name[language]}</div>
                            {defaultNote && <div className="tg-item-area" style={{fontStyle:'italic'}}>{defaultNote}</div>}
                          </td>
                          <td><span className="tg-qty">{item.qty}</span></td>
                          <td><span style={{fontSize:'0.78rem',color:'#64748b'}}>{item.area[language]}</span></td>
                          <td>
                            <span className="tg-priority-badge" style={{color:p.color,background:p.bg}}>{p.labels[language]}</span>
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
                                  <option key={opt.value} value={opt.value}>{opt.labels[language]}</option>
                                ))}
                              </select>
                              <span className="tg-status-arrow" style={{color:s.color}}>▼</span>
                            </div>
                          </td>
                          <td>
                            <input
                              className="tg-notes-input"
                              type="text"
                              placeholder={t.notePh}
                              value={userNote}
                              onChange={e => updateItem(item.id, 'userNotes', e.target.value)}
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

      <footer className="tg-footer">
        <p>© {new Date().getFullYear()} <span>IPM</span> {t.footer}</p>
      </footer>
    </div>
  );
};

export default TegucigalpaChecklist;
