import { useEffect, useRef, useState } from 'react';

const TIERS = {
  conservative: {
    label: 'Conservative Scenario',
    gross: 2950,
    commission: 443,
    net: 2507,
    mgmtFee: 501,
    platformFee: 200,
    payout: 1806,
  },
  strong: {
    label: 'Strong Performance Scenario',
    gross: 4200,
    commission: 630,
    net: 3570,
    mgmtFee: 714,
    platformFee: 200,
    payout: 2656,
  },
  premium: {
    label: 'Premium Optimized Scenario',
    gross: 5800,
    commission: 870,
    net: 4930,
    mgmtFee: 986,
    platformFee: 200,
    payout: 3744,
  },
};

const fmt = (n) => '$' + n.toLocaleString('en-US');

const TimberbrookProposal = () => {
  const nightlyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const nightlyChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);
  const [selectedTier, setSelectedTier] = useState('strong');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const PHOTOS = [
    { src: '/timberbrook-1-exterior.jpg',  label: 'Exterior – Front View' },
    { src: '/timberbrook-2-kitchen.jpg',   label: 'Kitchen' },
    { src: '/timberbrook-3-kitchen2.jpg',  label: 'Kitchen Detail' },
    { src: '/timberbrook-4-kitchen3.jpg',  label: 'Kitchen & Dining' },
    { src: '/timberbrook-5-living.jpg',    label: 'Living Room' },
    { src: '/timberbrook-6-master.jpg',    label: 'Master Bedroom' },
    { src: '/timberbrook-7-bedroom2.jpg',  label: 'Bedroom 2 – Bunk & Full' },
    { src: '/timberbrook-8-bedroom3.jpg',  label: 'Bedroom 3 – Bunk & Twin' },
    { src: '/timberbrook-9-bedroom4.jpg',  label: 'Bedroom 4 – Queen' },
    { src: '/timberbrook-10-bathroom.jpg', label: 'Double Vanity Bathroom' },
    { src: '/timberbrook-11-shower.jpg',   label: 'Shower' },
  ];

  useEffect(() => {
    document.title = 'Owner Proposal – 2804 Timberbrook Dr, Charlotte | IPM';

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const initCharts = async () => {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      if (nightlyChartRef.current) {
        if (nightlyChartInstance.current) nightlyChartInstance.current.destroy();
        nightlyChartInstance.current = new Chart(nightlyChartRef.current.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['Studio / 1BR', '2 Bedroom', '3 Bedroom', '4 Bedroom', 'Luxury / 5BR+'],
            datasets: [{
              label: 'Avg. Nightly Rate ($)',
              data: [105, 155, 215, 295, 400],
              backgroundColor: [
                'rgba(198,166,107,0.45)',
                'rgba(198,166,107,0.6)',
                'rgba(198,166,107,0.85)',
                'rgba(198,166,107,0.9)',
                'rgba(198,166,107,1.0)'
              ],
              borderColor: 'rgba(198,166,107,1)',
              borderWidth: 1,
              borderRadius: 6,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y} / night` } }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.06)' },
                ticks: { callback: v => `$${v}`, font: { size: 11 } }
              },
              x: { grid: { display: false }, ticks: { font: { size: 11 } } }
            }
          }
        });
      }

      if (revenueChartRef.current) {
        if (revenueChartInstance.current) revenueChartInstance.current.destroy();
        revenueChartInstance.current = new Chart(revenueChartRef.current.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['Conservative', 'Strong Performance', 'Premium Optimized'],
            datasets: [{
              label: 'Annual Gross Revenue ($)',
              data: [35000, 50400, 69600],
              backgroundColor: [
                'rgba(139,163,192,0.7)',
                'rgba(198,166,107,0.85)',
                'rgba(45,106,79,0.75)'
              ],
              borderColor: ['#8BA3C0','#C6A66B','#2D6A4F'],
              borderWidth: 2,
              borderRadius: 8,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y.toLocaleString()} / year` } }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.06)' },
                ticks: { callback: v => `$${(v/1000).toFixed(0)}K`, font: { size: 11 } }
              },
              x: { grid: { display: false }, ticks: { font: { size: 12 } } }
            }
          }
        });
      }
    };

    initCharts();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('tt-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.tt-fade-in').forEach(el => observer.observe(el));

    const nav = document.getElementById('tt-nav');
    const onScroll = () => {
      if (nav) nav.classList.toggle('tt-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      if (nightlyChartInstance.current) nightlyChartInstance.current.destroy();
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="tt-wrap">
      <style>{`
        .tt-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .tt-wrap { font-family: 'Inter', sans-serif; background: #F8F7F4; color: #1A2230; line-height: 1.7; -webkit-font-smoothing: antialiased; }
        .tt-wrap h1,.tt-wrap h2,.tt-wrap h3,.tt-wrap h4 { font-family: 'Playfair Display', Georgia, serif; line-height: 1.25; color: #0E1A2B; }
        .tt-wrap h1 { font-size: clamp(2rem,5vw,3.5rem); font-weight:700; }
        .tt-wrap h2 { font-size: clamp(1.6rem,3.5vw,2.5rem); font-weight:600; }
        .tt-wrap h3 { font-size: clamp(1.15rem,2.5vw,1.5rem); font-weight:600; }
        .tt-wrap p  { color:#4A5568; font-size:1rem; line-height:1.8; }
        .tt-wrap a  { color:inherit; text-decoration:none; }

        /* NAV */
        .tt-nav { position:fixed; top:0; left:0; right:0; z-index:1000; padding:1.25rem 0; transition:all 0.3s; }
        .tt-nav.tt-scrolled { background:rgba(14,26,43,0.97); padding:0.75rem 0; box-shadow:0 4px 20px rgba(0,0,0,0.3); }
        .tt-nav-inner { max-width:1160px; margin:0 auto; padding:0 1.5rem; display:flex; align-items:center; justify-content:space-between; }
        .tt-nav-logo { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:700; color:#fff; letter-spacing:0.05em; }
        .tt-nav-logo a { color:#fff; }
        .tt-nav-logo span { color:#C6A66B; }
        .tt-nav-cta { background:#C6A66B; color:#0E1A2B; border:2px solid #C6A66B; border-radius:6px; padding:0.6rem 1.4rem; font-size:0.82rem; font-weight:600; letter-spacing:0.04em; cursor:pointer; transition:all 0.3s; white-space:nowrap; }
        .tt-nav-cta:hover { background:#D9BC8A; border-color:#D9BC8A; transform:translateY(-2px); }

        /* HERO */
        .tt-hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; background:#0E1A2B; }
        .tt-hero-bg { position:absolute; inset:0; background-image:url('/timberbrook-hero-bg.jpg'); background-size:cover; background-position:center; opacity:0.25; }
        .tt-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(14,26,43,0.92) 0%,rgba(14,26,43,0.75) 50%,rgba(35,42,51,0.85) 100%); }
        .tt-hero-content { position:relative; z-index:2; max-width:1160px; margin:0 auto; padding:8rem 1.5rem 5rem; width:100%; }
        .tt-hero-inner { max-width:800px; }
        .tt-hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(198,166,107,0.15); border:1px solid rgba(198,166,107,0.4); border-radius:50px; padding:0.4rem 1rem; font-size:0.78rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#C6A66B; margin-bottom:1.5rem; }
        .tt-hero h1 { color:#fff !important; margin-bottom:1.25rem; }
        .tt-hero h1 em { color:#C6A66B; font-style:normal; }
        .tt-hero-sub { font-size:1.15rem; color:rgba(255,255,255,0.75) !important; margin-bottom:0.75rem; font-family:'Playfair Display',serif; font-style:italic; }
        .tt-hero-desc { font-size:1rem; color:rgba(255,255,255,0.65) !important; max-width:580px; margin-bottom:2.5rem; line-height:1.8; }
        .tt-hero-stats { display:flex; gap:2.5rem; margin-top:3rem; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.12); flex-wrap:wrap; }
        .tt-hero-stat-value { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700; color:#C6A66B; }
        .tt-hero-stat-label { font-size:0.78rem; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:0.08em; margin-top:0.2rem; }
        .tt-btn-group { display:flex; gap:1rem; flex-wrap:wrap; }
        .tt-btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.85rem 2rem; border-radius:6px; font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:600; letter-spacing:0.04em; cursor:pointer; transition:all 0.3s; border:2px solid transparent; white-space:nowrap; }
        .tt-btn-primary { background:#C6A66B; color:#0E1A2B; border-color:#C6A66B; }
        .tt-btn-primary:hover { background:#D9BC8A; border-color:#D9BC8A; transform:translateY(-2px); box-shadow:0 8px 24px rgba(198,166,107,0.35); }
        .tt-btn-outline { background:rgba(0,0,0,0.35); color:#fff !important; border-color:#fff; }
        .tt-btn-outline:hover { background:rgba(0,0,0,0.55); border-color:#fff; transform:translateY(-2px); }
        .tt-btn-dark { background:transparent; color:#0E1A2B; border-color:#0E1A2B; }
        .tt-btn-dark:hover { background:#0E1A2B; color:#fff; transform:translateY(-2px); }

        /* SECTIONS */
        .tt-container { max-width:1160px; margin:0 auto; padding:0 1.5rem; }
        .tt-section { padding:5rem 0; }
        .tt-section-dark { background:#0E1A2B; }
        .tt-section-slate { background:#232A33; }
        .tt-section-ivory { background:#F8F7F4; }
        .tt-section-white { background:#fff; }
        .tt-section-header { text-align:center; max-width:700px; margin:0 auto 3.5rem; }
        .tt-section-header h2 { margin-bottom:1rem; }
        .tt-section-label { font-family:'Inter',sans-serif; font-size:0.75rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#C6A66B; margin-bottom:0.75rem; }
        .tt-gold-divider { width:60px; height:3px; background:linear-gradient(90deg,#C6A66B,#D9BC8A); border-radius:2px; margin:1.25rem auto; }

        /* FADE IN */
        .tt-fade-in { opacity:0; transform:translateY(20px); transition:opacity 0.6s ease, transform 0.6s ease; }
        .tt-fade-in.tt-visible { opacity:1; transform:translateY(0); }

        /* PROPERTY OVERVIEW */
        .tt-property-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start; }
        .tt-address-card { background:#0E1A2B; border-radius:20px; padding:2.5rem; color:#fff; position:relative; overflow:hidden; }
        .tt-address-card::before { content:''; position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle,rgba(198,166,107,0.15) 0%,transparent 70%); border-radius:50%; }
        .tt-address-card .tt-addr-label { font-size:0.72rem; letter-spacing:0.15em; text-transform:uppercase; color:#C6A66B; font-weight:600; margin-bottom:0.5rem; }
        .tt-address-card h3 { color:#fff !important; font-size:1.5rem; margin-bottom:0.25rem; }
        .tt-address-card .tt-city { color:rgba(255,255,255,0.6); font-size:1rem; margin-bottom:1.5rem; }
        .tt-map-embed { border-radius:12px; overflow:hidden; margin-top:1.5rem; height:200px; }
        .tt-map-embed iframe { width:100%; height:100%; border:none; }
        .tt-prop-features { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:1.5rem; }
        .tt-feature-item { display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; color:#4A5568; }
        .tt-feature-icon { width:32px; height:32px; background:linear-gradient(135deg,rgba(198,166,107,0.15),rgba(198,166,107,0.05)); border:1px solid rgba(198,166,107,0.3); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.9rem; flex-shrink:0; }
        .tt-demand-list { list-style:none; }
        .tt-demand-list li { display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem 0; border-bottom:1px solid #E2E8F0; font-size:0.95rem; color:#4A5568; }
        .tt-demand-list li:last-child { border-bottom:none; }
        .tt-demand-list li::before { content:'✓'; color:#C6A66B; font-weight:700; font-size:0.9rem; flex-shrink:0; margin-top:0.15rem; }

        /* GALLERY */
        .tt-gallery-section { background:#F8F7F4; padding:5rem 0; }
        .tt-gallery-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.75rem; }
        .tt-gallery-grid .tt-gallery-featured { grid-column:span 2; grid-row:span 2; }
        .tt-gallery-item { overflow:hidden; border-radius:12px; position:relative; background:#E2E8F0; aspect-ratio:4/3; cursor:pointer; }
        .tt-gallery-item img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease; display:block; }
        .tt-gallery-item:hover img { transform:scale(1.05); }
        .tt-gallery-featured { aspect-ratio:unset; }
        .tt-gallery-label { position:absolute; bottom:0; left:0; right:0; padding:0.6rem 0.85rem; background:linear-gradient(transparent,rgba(14,26,43,0.7)); font-size:0.72rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.85); opacity:0; transition:opacity 0.3s; }
        .tt-gallery-item:hover .tt-gallery-label { opacity:1; }
        .tt-lightbox { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999; align-items:center; justify-content:center; }
        .tt-lightbox.tt-lx-open { display:flex; }
        .tt-lightbox img { max-width:90vw; max-height:85vh; border-radius:8px; object-fit:contain; }
        .tt-lx-close { position:absolute; top:1.5rem; right:1.5rem; width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,0.15); border:none; color:#fff; font-size:1.4rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
        .tt-lx-close:hover { background:rgba(255,255,255,0.3); }
        .tt-lx-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.15); border:none; color:#fff; font-size:1.6rem; width:48px; height:48px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
        .tt-lx-nav:hover { background:rgba(255,255,255,0.3); }
        .tt-lx-prev { left:1.5rem; }
        .tt-lx-next { right:1.5rem; }
        @media (max-width:900px) { .tt-gallery-grid { grid-template-columns:repeat(2,1fr); } .tt-gallery-grid .tt-gallery-featured { grid-column:span 2; } }
        @media (max-width:500px) { .tt-gallery-grid { grid-template-columns:1fr; } .tt-gallery-grid .tt-gallery-featured { grid-column:span 1; } }

        /* MARKET */
        .tt-market-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-bottom:3rem; }
        .tt-market-stat { background:rgba(255,255,255,0.06); border:1px solid rgba(198,166,107,0.2); border-radius:16px; padding:1.75rem; text-align:center; }
        .tt-market-stat-value { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700; color:#C6A66B; }
        .tt-market-stat-label { font-size:0.82rem; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:0.08em; margin-top:0.4rem; }
        .tt-market-stat-desc { font-size:0.78rem; color:rgba(255,255,255,0.4); margin-top:0.3rem; }
        .tt-market-drivers { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; margin-top:2rem; }
        .tt-driver-card { background:rgba(255,255,255,0.05); border:1px solid rgba(198,166,107,0.15); border-radius:12px; padding:1.25rem; }
        .tt-driver-title { font-size:0.88rem; font-weight:600; color:#C6A66B; margin-bottom:0.4rem; }
        .tt-driver-desc { font-size:0.82rem; color:rgba(255,255,255,0.55); line-height:1.6; }
        .tt-chart-container { background:rgba(255,255,255,0.04); border:1px solid rgba(198,166,107,0.15); border-radius:20px; padding:2rem; max-width:700px; margin:0 auto; }
        .tt-chart-container.tt-white { background:#fff; border:1px solid #E2E8F0; }
        .tt-chart-title { font-family:'Playfair Display',serif; font-size:1.1rem; color:#fff; text-align:center; margin-bottom:1.5rem; }
        .tt-chart-title.tt-dark-text { color:#0E1A2B; }

        /* PROJECTIONS */
        .tt-proj-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-bottom:3rem; }
        .tt-proj-card { background:#fff; border-radius:20px; padding:2rem; box-shadow:0 2px 8px rgba(14,26,43,0.08); border-top:4px solid transparent; transition:transform 0.3s, box-shadow 0.3s; position:relative; cursor:pointer; }
        .tt-proj-card:hover { transform:translateY(-6px); box-shadow:0 8px 32px rgba(14,26,43,0.12); }
        .tt-proj-card.tt-selected { outline:3px solid #C6A66B; outline-offset:2px; transform:translateY(-6px); box-shadow:0 8px 32px rgba(198,166,107,0.25); }
        .tt-proj-card.tt-selected::after { content:'✓ Selected'; position:absolute; bottom:1rem; right:1rem; font-size:0.7rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#C6A66B; }
        .tt-proj-conservative { border-top-color:#8BA3C0; }
        .tt-proj-strong { border-top-color:#C6A66B; background:#0E1A2B; }
        .tt-proj-premium { border-top-color:#2D6A4F; }
        .tt-proj-badge { display:inline-block; font-size:0.7rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:0.3rem 0.8rem; border-radius:50px; margin-bottom:1rem; }
        .tt-proj-conservative .tt-proj-badge { background:rgba(139,163,192,0.15); color:#5A7FA5; }
        .tt-proj-strong .tt-proj-badge { background:rgba(198,166,107,0.2); color:#C6A66B; }
        .tt-proj-premium .tt-proj-badge { background:rgba(45,106,79,0.15); color:#2D6A4F; }
        .tt-proj-nightly { font-family:'Playfair Display',serif; font-size:2.5rem; font-weight:700; color:#0E1A2B; line-height:1; margin-bottom:0.25rem; }
        .tt-proj-strong .tt-proj-nightly { color:#C6A66B; }
        .tt-proj-label { font-size:0.75rem; color:#718096; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:1.25rem; }
        .tt-proj-strong .tt-proj-label { color:rgba(255,255,255,0.5); }
        .tt-proj-rows { border-top:1px solid #E2E8F0; padding-top:1rem; }
        .tt-proj-strong .tt-proj-rows { border-top-color:rgba(255,255,255,0.12); }
        .tt-proj-row { display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; font-size:0.85rem; }
        .tt-proj-row-label { color:#718096; }
        .tt-proj-strong .tt-proj-row-label { color:rgba(255,255,255,0.5); }
        .tt-proj-row-value { font-weight:600; color:#1A2230; }
        .tt-proj-strong .tt-proj-row-value { color:#fff; }
        .tt-proj-annual { margin-top:1.25rem; padding-top:1rem; border-top:1px solid #E2E8F0; }
        .tt-proj-strong .tt-proj-annual { border-top-color:rgba(255,255,255,0.12); }
        .tt-proj-annual-value { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:700; color:#C6A66B; }
        .tt-proj-annual-label { font-size:0.75rem; color:#718096; margin-top:0.2rem; }
        .tt-proj-strong .tt-proj-annual-label { color:rgba(255,255,255,0.45); }
        .tt-popular-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#C6A66B; color:#0E1A2B; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:0.3rem 0.9rem; border-radius:50px; white-space:nowrap; }
        .tt-disclaimer { background:rgba(198,166,107,0.08); border:1px solid rgba(198,166,107,0.2); border-radius:12px; padding:1.25rem 1.5rem; font-size:0.84rem; color:#4A5568; margin-top:2rem; }

        /* EARNINGS */
        .tt-earnings-layout { display:grid; grid-template-columns:1fr 1.3fr; gap:3rem; align-items:start; }
        .tt-fee-structure { background:#0E1A2B; border-radius:20px; padding:2.5rem; }
        .tt-fee-item { display:flex; justify-content:space-between; align-items:center; padding:1.1rem 0; border-bottom:1px solid rgba(255,255,255,0.08); }
        .tt-fee-item:last-child { border-bottom:none; }
        .tt-fee-item-label { font-size:0.9rem; font-weight:600; color:#fff; }
        .tt-fee-item-sublabel { font-size:0.78rem; color:rgba(255,255,255,0.45); margin-top:0.2rem; }
        .tt-fee-item-value { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:#C6A66B; }
        .tt-earnings-table-wrap { overflow-x:auto; border-radius:12px; box-shadow:0 2px 8px rgba(14,26,43,0.08); }
        .tt-earnings-table { width:100%; border-collapse:collapse; font-size:0.92rem; background:#fff; }
        .tt-earnings-table th { background:#0E1A2B; color:#fff; font-family:'Inter',sans-serif; font-weight:600; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; padding:1rem 1.25rem; text-align:left; }
        .tt-earnings-table td { padding:0.9rem 1.25rem; border-bottom:1px solid #E2E8F0; color:#4A5568; }
        .tt-earnings-table td:last-child { font-weight:600; color:#1A2230; text-align:right; }
        .tt-earnings-table tr.tt-highlight td { background:linear-gradient(90deg,rgba(198,166,107,0.08),rgba(198,166,107,0.04)); color:#0E1A2B; font-weight:700; font-size:1rem; }
        .tt-earnings-table tr.tt-highlight td:last-child { color:#C6A66B; font-size:1.1rem; }
        .tt-editable-note { display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; color:#718096; margin-top:0.75rem; font-style:italic; }

        /* SERVICES */
        .tt-services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; }
        .tt-service-card { background:#fff; border-radius:14px; padding:1.75rem 1.5rem; box-shadow:0 2px 8px rgba(14,26,43,0.07); text-align:center; transition:transform 0.3s, box-shadow 0.3s; }
        .tt-service-card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(14,26,43,0.11); }
        .tt-service-icon { font-size:1.75rem; margin-bottom:0.75rem; }
        .tt-service-title { font-family:'Inter',sans-serif; font-size:0.88rem; font-weight:600; color:#0E1A2B; line-height:1.4; }

        /* WHY IPM */
        .tt-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        .tt-why-card { background:rgba(255,255,255,0.06); border:1px solid rgba(198,166,107,0.15); border-radius:16px; padding:2rem; transition:border-color 0.3s; }
        .tt-why-card:hover { border-color:rgba(198,166,107,0.4); }
        .tt-why-icon { font-size:1.75rem; margin-bottom:1rem; }
        .tt-why-title { font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.5rem; }
        .tt-why-desc { font-size:0.85rem; color:rgba(255,255,255,0.55); line-height:1.7; }

        /* DASHBOARD */
        .tt-dashboard-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem; }
        .tt-dashboard-card { background:#fff; border-radius:16px; padding:1.75rem; box-shadow:0 2px 8px rgba(14,26,43,0.07); display:flex; gap:1.25rem; align-items:flex-start; }
        .tt-dashboard-icon { font-size:1.5rem; background:linear-gradient(135deg,rgba(198,166,107,0.15),rgba(198,166,107,0.05)); border:1px solid rgba(198,166,107,0.3); border-radius:10px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .tt-dashboard-title { font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:700; color:#0E1A2B; margin-bottom:0.35rem; }
        .tt-dashboard-desc { font-size:0.84rem; color:#718096; line-height:1.6; }

        /* CTA */
        .tt-cta { text-align:center; padding:6rem 1.5rem; background:linear-gradient(135deg,#0E1A2B 0%,#1a2d47 50%,#0E1A2B 100%); }
        .tt-cta h2 { color:#fff !important; margin-bottom:1rem; }
        .tt-cta p { color:rgba(255,255,255,0.65) !important; font-size:1.1rem; margin-bottom:2.5rem; max-width:560px; margin-left:auto; margin-right:auto; }

        /* FOOTER */
        .tt-footer { background:#060D18; color:rgba(255,255,255,0.6); padding:3rem 0 2rem; }
        .tt-footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:3rem; margin-bottom:2.5rem; }
        .tt-footer-brand { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:0.5rem; }
        .tt-footer-brand span { color:#C6A66B; }
        .tt-footer-sub { font-size:0.85rem; color:rgba(255,255,255,0.45); margin-bottom:1.25rem; }
        .tt-footer-heading { font-family:'Inter',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#C6A66B; margin-bottom:1rem; }
        .tt-footer-links { list-style:none; }
        .tt-footer-links li { margin-bottom:0.5rem; }
        .tt-footer-links a { font-size:0.85rem; color:rgba(255,255,255,0.45); transition:color 0.2s; }
        .tt-footer-links a:hover { color:#C6A66B; }
        .tt-footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:1.5rem; text-align:center; font-size:0.8rem; color:rgba(255,255,255,0.3); }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .tt-proj-cards, .tt-services-grid { grid-template-columns: repeat(2,1fr); }
          .tt-why-grid { grid-template-columns: repeat(2,1fr); }
          .tt-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .tt-property-grid, .tt-earnings-layout, .tt-market-stats { grid-template-columns: 1fr; gap:2rem; }
          .tt-market-drivers, .tt-dashboard-grid { grid-template-columns: 1fr; }
          .tt-footer-grid { grid-template-columns: 1fr; gap:2rem; }
        }
        @media (max-width: 600px) {
          .tt-proj-cards, .tt-services-grid, .tt-why-grid { grid-template-columns: 1fr; }
          .tt-section { padding: 3.5rem 0; }
          .tt-prop-features { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="tt-nav" id="tt-nav">
        <div className="tt-nav-inner">
          <div className="tt-nav-logo">
            <a href="/"><span>IPM</span>.</a>
          </div>
          <a href="https://calendly.com" className="tt-btn tt-nav-cta" target="_blank" rel="noopener noreferrer">
            Schedule Consultation
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="tt-hero">
        <div className="tt-hero-bg"></div>
        <div className="tt-hero-overlay"></div>
        <div className="tt-hero-content">
          <div className="tt-hero-inner">
            <div className="tt-hero-badge">✦ Private Owner Proposal</div>
            <h1>Maximize the Revenue Potential of Your <em>Charlotte</em> Property</h1>
            <p className="tt-hero-sub">Custom Property Management Proposal for<br/>2804 Timberbrook Dr – Charlotte, NC</p>
            <p className="tt-hero-desc">IPM – International Property Management specializes in professional short-term rental management and revenue optimization. We help property owners like you unlock the full potential of your residential investment while handling all operational details.</p>
            <div className="tt-btn-group">
              <a href="#tt-projections" className="tt-btn tt-btn-primary">View Revenue Projection</a>
              <a href="https://calendly.com" className="tt-btn tt-btn-outline" target="_blank" rel="noopener noreferrer">Schedule Owner Consultation</a>
            </div>
            <div className="tt-hero-stats">
              <div>
                <div className="tt-hero-stat-value">$65K+</div>
                <div className="tt-hero-stat-label">Annual Revenue Potential</div>
              </div>
              <div>
                <div className="tt-hero-stat-value">65%</div>
                <div className="tt-hero-stat-label">Avg. Occupancy Rate</div>
              </div>
              <div>
                <div className="tt-hero-stat-value">$215</div>
                <div className="tt-hero-stat-label">Est. Nightly Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY OVERVIEW */}
      <section className="tt-section tt-section-white" id="tt-overview">
        <div className="tt-container">
          <div className="tt-property-grid tt-fade-in">
            <div>
              <div className="tt-section-label">Property Overview</div>
              <h2 style={{marginBottom:'1rem'}}>2804 Timberbrook Dr<br/>Charlotte, NC 28208</h2>
              <div style={{width:'60px',height:'3px',background:'linear-gradient(90deg,#C6A66B,#D9BC8A)',borderRadius:'2px',marginBottom:'1.5rem'}}></div>
              <p style={{marginBottom:'1.5rem'}}>This 3-bedroom, 2-bathroom single-family home in Charlotte is ideally positioned to perform as a high-demand short-term rental. Its quiet residential setting combined with proximity to Charlotte's top demand generators creates an excellent opportunity for consistent bookings year-round.</p>
              <div className="tt-prop-features">
                {[
                  ['🛏','3 Bedrooms'],['🛁','2 Bathrooms'],['📐','~1,200–1,400 sq ft'],['🏠','Single-Family Home'],
                  ['✈️','Near CLT Airport'],['🏟','Near BofA Stadium'],['🏙','Uptown Access'],['💼','Business Travel Hub'],
                ].map(([icon, label]) => (
                  <div className="tt-feature-item" key={label}>
                    <div className="tt-feature-icon">{icon}</div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'2rem'}}>
                <div className="tt-section-label" style={{marginBottom:'0.75rem'}}>Why This Property Performs</div>
                <ul className="tt-demand-list">
                  <li>Minutes from Charlotte Douglas International Airport — high business & transit demand</li>
                  <li>Easy access to Uptown Charlotte — conventions, dining, and nightlife draw</li>
                  <li>Proximity to Bank of America Stadium — event weekends command premium rates</li>
                  <li>Ideal layout for families, business travelers, and corporate relocations</li>
                  <li>Quiet neighborhood setting — appeals to guests seeking comfort and privacy</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="tt-address-card">
                <div className="tt-addr-label">Property Address</div>
                <h3>2804 Timberbrook Dr</h3>
                <div className="tt-city">Charlotte, NC 28208</div>
                <div style={{display:'flex',gap:'1.5rem',paddingTop:'1rem',borderTop:'1px solid rgba(255,255,255,0.1)'}}>
                  {[['3','Bedrooms'],['2','Bathrooms'],['~1,300','Sq Ft']].map(([v,l]) => (
                    <div key={l}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',fontWeight:700,color:'#C6A66B'}}>{v}</div>
                      <div style={{fontSize:'0.75rem',color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{l}</div>
                    </div>
                  ))}
                </div>
                <div className="tt-map-embed">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.9!2d-80.919!3d35.214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541f4f6b3f0001%3A0x1!2s2804+Timberbrook+Dr%2C+Charlotte%2C+NC+28208!5e0!3m2!1sen!2sus!4v1"
                    allowFullScreen=""
                    loading="lazy"
                    title="2804 Timberbrook Dr Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="tt-gallery-section" id="tt-gallery">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in" style={{marginBottom:'2.5rem'}}>
            <div className="tt-section-label">Property Photos</div>
            <h2>Inside 2804 Timberbrook Dr</h2>
            <div className="tt-gold-divider"></div>
            <p>A well-maintained 3-bedroom home with spacious rooms, updated kitchen, and comfortable living spaces ready for short-term rental guests.</p>
          </div>
          <div className="tt-gallery-grid tt-fade-in">
            {PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className={`tt-gallery-item${idx === 0 ? ' tt-gallery-featured' : ''}`}
                onClick={() => setLightboxIdx(idx)}
              >
                <img src={photo.src} alt={photo.label} loading={idx < 3 ? 'eager' : 'lazy'} />
                <div className="tt-gallery-label">{photo.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIdx !== null && (
        <div className="tt-lightbox tt-lx-open" onClick={() => setLightboxIdx(null)}>
          <button className="tt-lx-close" onClick={() => setLightboxIdx(null)}>✕</button>
          <button className="tt-lx-nav tt-lx-prev" onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + PHOTOS.length) % PHOTOS.length); }}>‹</button>
          <img
            src={PHOTOS[lightboxIdx].src}
            alt={PHOTOS[lightboxIdx].label}
            onClick={(e) => e.stopPropagation()}
          />
          <button className="tt-lx-nav tt-lx-next" onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % PHOTOS.length); }}>›</button>
        </div>
      )}

      {/* CHARLOTTE MARKET */}
      <section className="tt-section tt-section-dark" id="tt-market">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in">
            <div className="tt-section-label">Market Intelligence</div>
            <h2 style={{color:'#fff'}}>Charlotte Short-Term Rental Market</h2>
            <div className="tt-gold-divider"></div>
            <p style={{color:'rgba(255,255,255,0.6)'}}>Charlotte's vacation rental market is driven by a powerful mix of corporate travel, major events, and a growing tourism scene — creating consistent demand for well-managed short-term rentals year-round.</p>
          </div>
          <div className="tt-market-stats tt-fade-in">
            {[
              ['$170–$220','Avg. Nightly Rate','Charlotte 3BR market range'],
              ['60–68%','Avg. Occupancy','Year-round market average'],
              ['$35K–$55K','Avg. Annual Revenue','Depending on quality & management'],
            ].map(([val, label, desc]) => (
              <div className="tt-market-stat" key={label}>
                <div className="tt-market-stat-value">{val}</div>
                <div className="tt-market-stat-label">{label}</div>
                <div className="tt-market-stat-desc">{desc}</div>
              </div>
            ))}
          </div>
          <div className="tt-chart-container tt-fade-in" style={{marginBottom:'3rem'}}>
            <div className="tt-chart-title">Charlotte Avg. Nightly Rate by Property Size</div>
            <canvas ref={nightlyChartRef} height="260"></canvas>
          </div>
          <div className="tt-market-drivers tt-fade-in">
            {[
              ['✈️ Charlotte Douglas Airport','One of the busiest airports in the Southeast, generating constant business and connecting traveler demand.'],
              ['🏟 Bank of America Stadium','NFL games, concerts, and major events spike occupancy and nightly rates throughout the year.'],
              ['💼 Corporate & Business Travel','Major banks, finance firms, and healthcare companies make Charlotte a top business destination.'],
              ['🎭 Conventions & Tourism','A growing convention center and expanding restaurant and arts scene attract leisure travelers year-round.'],
            ].map(([title, desc]) => (
              <div className="tt-driver-card" key={title}>
                <div className="tt-driver-title">{title}</div>
                <div className="tt-driver-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE PROJECTIONS */}
      <section className="tt-section tt-section-ivory" id="tt-projections">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in">
            <div className="tt-section-label">Revenue Projections</div>
            <h2>Revenue Projection for 2804 Timberbrook Dr</h2>
            <div className="tt-gold-divider"></div>
            <p>Based on comparable short-term rental performance in Charlotte, we have modeled three realistic revenue scenarios. These projections reflect current market conditions and IPM's dynamic pricing approach. <strong>Click any scenario to see your estimated owner payout.</strong></p>
          </div>
          <div className="tt-proj-cards tt-fade-in">
            <div
              className={`tt-proj-card tt-proj-conservative${selectedTier === 'conservative' ? ' tt-selected' : ''}`}
              onClick={() => setSelectedTier('conservative')}
            >
              <div className="tt-proj-badge">Conservative</div>
              <div className="tt-proj-nightly">$170</div>
              <div className="tt-proj-label">Estimated Nightly Rate</div>
              <div className="tt-proj-rows">
                {[['Occupancy Rate','~55%'],['Booked Nights / Month','16–17 nights'],['Monthly Gross Revenue','$2,800–$3,100']].map(([l,v]) => (
                  <div className="tt-proj-row" key={l}><span className="tt-proj-row-label">{l}</span><span className="tt-proj-row-value">{v}</span></div>
                ))}
              </div>
              <div className="tt-proj-annual">
                <div className="tt-proj-annual-value">$33K–$37K</div>
                <div className="tt-proj-annual-label">Estimated Annual Gross Revenue</div>
              </div>
            </div>
            <div
              className={`tt-proj-card tt-proj-strong${selectedTier === 'strong' ? ' tt-selected' : ''}`}
              style={{position:'relative'}}
              onClick={() => setSelectedTier('strong')}
            >
              <div className="tt-popular-badge">Most Likely</div>
              <div className="tt-proj-badge">Strong Performance</div>
              <div className="tt-proj-nightly">$215</div>
              <div className="tt-proj-label">Estimated Nightly Rate</div>
              <div className="tt-proj-rows">
                {[['Occupancy Rate','~65%'],['Booked Nights / Month','19–20 nights'],['Monthly Gross Revenue','$4,000–$4,400']].map(([l,v]) => (
                  <div className="tt-proj-row" key={l}><span className="tt-proj-row-label">{l}</span><span className="tt-proj-row-value">{v}</span></div>
                ))}
              </div>
              <div className="tt-proj-annual">
                <div className="tt-proj-annual-value">$48K–$53K</div>
                <div className="tt-proj-annual-label">Estimated Annual Gross Revenue</div>
              </div>
            </div>
            <div
              className={`tt-proj-card tt-proj-premium${selectedTier === 'premium' ? ' tt-selected' : ''}`}
              onClick={() => setSelectedTier('premium')}
            >
              <div className="tt-proj-badge">Premium Optimized</div>
              <div className="tt-proj-nightly">$265</div>
              <div className="tt-proj-label">Estimated Nightly Rate</div>
              <div className="tt-proj-rows">
                {[['Occupancy Rate','~72%'],['Booked Nights / Month','21–22 nights'],['Monthly Gross Revenue','$5,500–$6,100']].map(([l,v]) => (
                  <div className="tt-proj-row" key={l}><span className="tt-proj-row-label">{l}</span><span className="tt-proj-row-value">{v}</span></div>
                ))}
              </div>
              <div className="tt-proj-annual">
                <div className="tt-proj-annual-value">$65K–$73K</div>
                <div className="tt-proj-annual-label">Estimated Annual Gross Revenue</div>
              </div>
            </div>
          </div>
          <div className="tt-chart-container tt-white tt-fade-in">
            <div className="tt-chart-title tt-dark-text">Annual Revenue Comparison – Three Scenarios</div>
            <canvas ref={revenueChartRef} height="260"></canvas>
          </div>
          <div className="tt-disclaimer tt-fade-in">
            <strong>Disclaimer:</strong> Revenue projections are estimates based on market data and comparable Charlotte listings. Actual performance depends on property condition, amenities, pricing strategy, seasonality, and guest demand.
          </div>
        </div>
      </section>

      {/* OWNER EARNINGS */}
      <section className="tt-section tt-section-white" id="tt-earnings">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in">
            <div className="tt-section-label">Owner Economics</div>
            <h2>Your Estimated Owner Earnings</h2>
            <div className="tt-gold-divider"></div>
            <p>IPM's pricing model is built around transparency and alignment with owner success. Our fee structure is straightforward — a low monthly platform fee plus a performance-based management fee calculated on net profit, not gross revenue.</p>
          </div>
          <div className="tt-earnings-layout tt-fade-in">
            <div>
              <div className="tt-fee-structure">
                <div className="tt-section-label" style={{color:'#C6A66B'}}>IPM Fee Structure</div>
                <h3 style={{color:'#fff',marginBottom:'1.5rem'}}>Simple. Transparent. Aligned.</h3>
                <div className="tt-fee-item">
                  <div>
                    <div className="tt-fee-item-label">Monthly Platform & Software Fee</div>
                    <div className="tt-fee-item-sublabel">Flat monthly fee regardless of bookings</div>
                  </div>
                  <div className="tt-fee-item-value">$200/mo</div>
                </div>
                <div className="tt-fee-item">
                  <div>
                    <div className="tt-fee-item-label">Management Fee</div>
                    <div className="tt-fee-item-sublabel">Applied to net profit after platform commissions</div>
                  </div>
                  <div className="tt-fee-item-value">20%</div>
                </div>
                <div style={{marginTop:'1.5rem',padding:'1rem',background:'rgba(198,166,107,0.1)',borderRadius:'8px',border:'1px solid rgba(198,166,107,0.2)'}}>
                  <p style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.6)',lineHeight:'1.6'}}><strong style={{color:'#C6A66B'}}>Net Profit Definition:</strong> Revenue after platform commissions (e.g., Airbnb, Booking.com). IPM's management fee is never applied to gross revenue — only to what you actually earn.</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{marginBottom:'1rem'}}>
                <div className="tt-section-label">Sample Calculation</div>
                <h3 style={{marginBottom:'0.5rem'}}>{TIERS[selectedTier].label}</h3>
                <p style={{fontSize:'0.88rem'}}>Based on {fmt(TIERS[selectedTier].gross)} monthly gross booking revenue. Click a scenario above to compare.</p>
              </div>
              <div className="tt-earnings-table-wrap">
                <table className="tt-earnings-table">
                  <thead>
                    <tr><th>Item</th><th style={{textAlign:'right'}}>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Monthly Gross Booking Revenue</td><td>{fmt(TIERS[selectedTier].gross)}</td></tr>
                    <tr><td>Platform Commission (est. 15%)</td><td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].commission)}</td></tr>
                    <tr><td><strong>Net Booking Revenue</strong></td><td><strong>{fmt(TIERS[selectedTier].net)}</strong></td></tr>
                    <tr><td>IPM Management Fee (20% of Net)</td><td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].mgmtFee)}</td></tr>
                    <tr><td>Monthly Platform / Software Fee</td><td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].platformFee)}</td></tr>
                    <tr className="tt-highlight">
                      <td><strong>Estimated Owner Payout</strong><br/><span style={{fontSize:'0.75rem',fontWeight:'400',color:'#718096'}}>Before taxes &amp; maintenance reserve</span></td>
                      <td><strong>{fmt(TIERS[selectedTier].payout)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tt-editable-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Click any projection card above to update this breakdown instantly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="tt-section tt-section-ivory" id="tt-services">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in">
            <div className="tt-section-label">What IPM Handles</div>
            <h2>A Fully Hands-Off Management Experience</h2>
            <div className="tt-gold-divider"></div>
            <p>From listing creation to guest checkout, IPM manages every aspect of your rental so you can enjoy passive income without the operational burden.</p>
          </div>
          <div className="tt-services-grid tt-fade-in">
            {[
              ['📸','Professional Photography'],['✍️','Listing Creation & SEO'],['💰','Dynamic Pricing Strategy'],
              ['💬','24/7 Guest Messaging'],['🧹','Cleaning Coordination'],['🔧','Maintenance Management'],
              ['⭐','Review Management'],['🌐','Multi-Platform Distribution'],
            ].map(([icon, title]) => (
              <div className="tt-service-card" key={title}>
                <div className="tt-service-icon">{icon}</div>
                <div className="tt-service-title">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IPM */}
      <section className="tt-section tt-section-dark" id="tt-why">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in">
            <div className="tt-section-label">Why IPM</div>
            <h2 style={{color:'#fff'}}>Why Owners Choose IPM</h2>
            <div className="tt-gold-divider"></div>
            <p style={{color:'rgba(255,255,255,0.6)'}}>We combine hospitality expertise with data-driven pricing to deliver consistent results for property owners across Charlotte and beyond.</p>
          </div>
          <div className="tt-why-grid tt-fade-in">
            {[
              ['📈','Revenue Optimization','Data-driven dynamic pricing ensures your property earns the maximum possible revenue in every market condition.'],
              ['🤝','Professional Guest Communication','Responsive, hospitality-trained messaging that earns 5-star reviews and drives repeat bookings.'],
              ['🛡','Property Protection','Thorough guest screening, security deposits, and maintenance protocols protect your investment.'],
              ['📊','Transparent Reporting','Monthly financial statements, booking calendars, and performance insights delivered directly to you.'],
              ['🌐','Multi-Platform Exposure','Your property listed and optimized across Airbnb, VRBO, Booking.com, and direct booking channels.'],
              ['🏆','Hospitality-Focused Operations','Boutique-quality guest experiences that command premium rates and generate top-tier reviews.'],
            ].map(([icon, title, desc]) => (
              <div className="tt-why-card" key={title}>
                <div className="tt-why-icon">{icon}</div>
                <div className="tt-why-title">{title}</div>
                <div className="tt-why-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER DASHBOARD */}
      <section className="tt-section tt-section-white" id="tt-dashboard">
        <div className="tt-container">
          <div className="tt-section-header tt-fade-in">
            <div className="tt-section-label">Owner Dashboard</div>
            <h2>Full Visibility. Zero Guesswork.</h2>
            <div className="tt-gold-divider"></div>
            <p>Every IPM owner receives access to a comprehensive reporting dashboard — giving you complete transparency into your property's performance without any of the day-to-day management.</p>
          </div>
          <div className="tt-dashboard-grid tt-fade-in">
            {[
              ['📅','Booking Calendar Access','See every reservation in real-time — who is staying, when, and for how long.'],
              ['💵','Monthly Financial Reports','Detailed income breakdowns delivered every month — gross revenue, fees, and net owner payout.'],
              ['📉','Revenue & Performance Tracking','Track occupancy rates, average nightly rates, and revenue trends over time.'],
              ['⭐','Guest Feedback & Reviews','Monitor every guest review and see how your property is performing against the market.'],
            ].map(([icon, title, desc]) => (
              <div className="tt-dashboard-card" key={title}>
                <div className="tt-dashboard-icon">{icon}</div>
                <div>
                  <div className="tt-dashboard-title">{title}</div>
                  <div className="tt-dashboard-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tt-cta" id="tt-cta">
        <div className="tt-section-label" style={{color:'#C6A66B',textAlign:'center',marginBottom:'1rem'}}>Next Steps</div>
        <h2>Turn Your Property Into a High-Performing Asset</h2>
        <p>Schedule a no-obligation consultation with our Charlotte property team. We'll walk you through the full opportunity and answer every question you have.</p>
        <div className="tt-btn-group" style={{justifyContent:'center'}}>
          <a href="https://calendly.com" className="tt-btn tt-btn-primary" target="_blank" rel="noopener noreferrer">Schedule Owner Consultation</a>
          <a href="mailto:info@ipm.services" className="tt-btn tt-btn-outline">Request Revenue Analysis</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tt-footer">
        <div className="tt-container">
          <div className="tt-footer-grid">
            <div>
              <div className="tt-footer-brand"><span>IPM</span>. International Property Management</div>
              <div className="tt-footer-sub">Charlotte Property Management Division</div>
              <p style={{fontSize:'0.84rem',color:'rgba(255,255,255,0.4)',lineHeight:'1.7',maxWidth:'320px'}}>
                Professional short-term rental management across Charlotte, Tampa, Playa del Carmen, Tulum, and Lake Norman. Maximizing owner revenue through expert hospitality operations.
              </p>
            </div>
            <div>
              <div className="tt-footer-heading">Quick Links</div>
              <ul className="tt-footer-links">
                <li><a href="/">Main Website</a></li>
                <li><a href="/services">Our Services</a></li>
                <li><a href="/properties">Properties</a></li>
                <li><a href="/insights">Insights</a></li>
              </ul>
            </div>
            <div>
              <div className="tt-footer-heading">Contact</div>
              <ul className="tt-footer-links">
                <li><a href="https://ipm.services" target="_blank" rel="noopener noreferrer">ipm.services</a></li>
                <li><a href="mailto:info@ipm.services">info@ipm.services</a></li>
                <li><a href="https://calendly.com" target="_blank" rel="noopener noreferrer">Schedule a Call</a></li>
              </ul>
            </div>
          </div>
          <div className="tt-footer-bottom">
            <p>© {new Date().getFullYear()} IPM – International Property Management. All rights reserved. | This proposal is private and confidential.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TimberbrookProposal;
