import { useEffect, useRef, useState } from 'react';

const TIERS = {
  conservative: {
    label: 'Conservative Scenario',
    gross: 3200,
    commission: 480,
    net: 2720,
    mgmtFee: 544,
    platformFee: 200,
    payout: 1976,
  },
  strong: {
    label: 'Strong Performance Scenario',
    gross: 4900,
    commission: 735,
    net: 4165,
    mgmtFee: 833,
    platformFee: 200,
    payout: 3132,
  },
  premium: {
    label: 'Premium Optimized Scenario',
    gross: 7100,
    commission: 1065,
    net: 6035,
    mgmtFee: 1207,
    platformFee: 200,
    payout: 4628,
  },
};

const fmt = (n) => '$' + n.toLocaleString('en-US');

const StAugustineProposal = () => {
  const nightlyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const nightlyChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);
  const [selectedTier, setSelectedTier] = useState('strong');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const PHOTOS = [
    { src: '/staugustine-hero-bg.jpg', label: 'Exterior – Sunset View' },
  ];

  useEffect(() => {
    document.title = 'Owner Proposal – 3851 N Crossroad, St. Augustine | IPM';

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
              data: [120, 185, 245, 340, 480],
              backgroundColor: ['rgba(198,166,107,0.45)','rgba(198,166,107,0.6)','rgba(198,166,107,0.85)','rgba(198,166,107,0.9)','rgba(198,166,107,1.0)'],
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
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { callback: v => `$${v}`, font: { size: 11 } } },
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
              data: [38400, 58800, 85200],
              backgroundColor: ['rgba(139,163,192,0.7)','rgba(198,166,107,0.85)','rgba(45,106,79,0.75)'],
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
              y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { callback: v => `$${(v/1000).toFixed(0)}K`, font: { size: 11 } } },
              x: { grid: { display: false }, ticks: { font: { size: 12 } } }
            }
          }
        });
      }
    };

    initCharts();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('sa-visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.sa-fade-in').forEach(el => observer.observe(el));

    const nav = document.getElementById('sa-nav');
    const onScroll = () => { if (nav) nav.classList.toggle('sa-scrolled', window.scrollY > 60); };
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
    <div className="sa-wrap">
      <style>{`
        .sa-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .sa-wrap { font-family: 'Inter', sans-serif; background: #F8F7F4; color: #1A2230; line-height: 1.7; -webkit-font-smoothing: antialiased; }
        .sa-wrap h1,.sa-wrap h2,.sa-wrap h3,.sa-wrap h4 { font-family: 'Playfair Display', Georgia, serif; line-height: 1.25; color: #0E1A2B; }
        .sa-wrap h1 { font-size: clamp(2rem,5vw,3.5rem); font-weight:700; }
        .sa-wrap h2 { font-size: clamp(1.6rem,3.5vw,2.5rem); font-weight:600; }
        .sa-wrap h3 { font-size: clamp(1.15rem,2.5vw,1.5rem); font-weight:600; }
        .sa-wrap p  { color:#4A5568; font-size:1rem; line-height:1.8; }
        .sa-wrap a  { color:inherit; text-decoration:none; }

        /* NAV */
        .sa-nav { position:fixed; top:0; left:0; right:0; z-index:1000; padding:1.25rem 0; transition:all 0.3s; }
        .sa-nav.sa-scrolled { background:rgba(14,26,43,0.97); padding:0.75rem 0; box-shadow:0 4px 20px rgba(0,0,0,0.3); }
        .sa-nav-inner { max-width:1160px; margin:0 auto; padding:0 1.5rem; display:flex; align-items:center; justify-content:space-between; }
        .sa-nav-logo { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:700; color:#fff; letter-spacing:0.05em; }
        .sa-nav-logo a { color:#fff; }
        .sa-nav-logo span { color:#C6A66B; }
        .sa-nav-cta { background:#C6A66B; color:#0E1A2B; border:2px solid #C6A66B; border-radius:6px; padding:0.6rem 1.4rem; font-size:0.82rem; font-weight:600; letter-spacing:0.04em; cursor:pointer; transition:all 0.3s; white-space:nowrap; }
        .sa-nav-cta:hover { background:#D9BC8A; border-color:#D9BC8A; transform:translateY(-2px); }

        /* HERO */
        .sa-hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; background:#0E1A2B; }
        .sa-hero-bg { position:absolute; inset:0; background-image:url('/staugustine-hero-bg.jpg'); background-size:cover; background-position:center 30%; opacity:0.3; }
        .sa-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(14,26,43,0.9) 0%,rgba(14,26,43,0.7) 50%,rgba(35,42,51,0.82) 100%); }
        .sa-hero-content { position:relative; z-index:2; max-width:1160px; margin:0 auto; padding:8rem 1.5rem 5rem; width:100%; }
        .sa-hero-inner { max-width:800px; }
        .sa-hero-badge { display:inline-flex; align-items:center; gap:0.5rem; background:rgba(198,166,107,0.15); border:1px solid rgba(198,166,107,0.4); border-radius:50px; padding:0.4rem 1rem; font-size:0.78rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#C6A66B; margin-bottom:1.5rem; }
        .sa-hero h1 { color:#fff !important; margin-bottom:1.25rem; }
        .sa-hero h1 em { color:#C6A66B; font-style:normal; }
        .sa-hero-sub { font-size:1.15rem; color:rgba(255,255,255,0.75) !important; margin-bottom:0.75rem; font-family:'Playfair Display',serif; font-style:italic; }
        .sa-hero-desc { font-size:1rem; color:rgba(255,255,255,0.65) !important; max-width:580px; margin-bottom:2.5rem; line-height:1.8; }
        .sa-hero-stats { display:flex; gap:2.5rem; margin-top:3rem; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.12); flex-wrap:wrap; }
        .sa-hero-stat-value { font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700; color:#C6A66B; }
        .sa-hero-stat-label { font-size:0.78rem; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:0.08em; margin-top:0.2rem; }
        .sa-btn-group { display:flex; gap:1rem; flex-wrap:wrap; }
        .sa-btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.85rem 2rem; border-radius:6px; font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:600; letter-spacing:0.04em; cursor:pointer; transition:all 0.3s; border:2px solid transparent; white-space:nowrap; }
        .sa-btn-primary { background:#C6A66B; color:#0E1A2B; border-color:#C6A66B; }
        .sa-btn-primary:hover { background:#D9BC8A; border-color:#D9BC8A; transform:translateY(-2px); box-shadow:0 8px 24px rgba(198,166,107,0.35); }
        .sa-btn-outline { background:rgba(0,0,0,0.35); color:#fff !important; border-color:#fff; }
        .sa-btn-outline:hover { background:rgba(0,0,0,0.55); border-color:#fff; transform:translateY(-2px); }

        /* LAYOUT */
        .sa-container { max-width:1160px; margin:0 auto; padding:0 1.5rem; }
        .sa-section { padding:5rem 0; }
        .sa-section-dark { background:#0E1A2B; }
        .sa-section-ivory { background:#F8F7F4; }
        .sa-section-white { background:#fff; }
        .sa-section-header { text-align:center; max-width:700px; margin:0 auto 3.5rem; }
        .sa-section-label { font-family:'Inter',sans-serif; font-size:0.75rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#C6A66B; margin-bottom:0.75rem; }
        .sa-gold-divider { width:60px; height:3px; background:linear-gradient(90deg,#C6A66B,#D9BC8A); border-radius:2px; margin:1.25rem auto; }

        /* FADE */
        .sa-fade-in { opacity:0; transform:translateY(20px); transition:opacity 0.6s ease, transform 0.6s ease; }
        .sa-fade-in.sa-visible { opacity:1; transform:translateY(0); }

        /* PROPERTY OVERVIEW */
        .sa-property-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start; }
        .sa-address-card { background:#0E1A2B; border-radius:20px; padding:2.5rem; color:#fff; position:relative; overflow:hidden; }
        .sa-address-card::before { content:''; position:absolute; top:-40px; right:-40px; width:180px; height:180px; background:radial-gradient(circle,rgba(198,166,107,0.15) 0%,transparent 70%); border-radius:50%; }
        .sa-addr-label { font-size:0.72rem; letter-spacing:0.15em; text-transform:uppercase; color:#C6A66B; font-weight:600; margin-bottom:0.5rem; }
        .sa-address-card h3 { color:#fff !important; font-size:1.5rem; margin-bottom:0.25rem; }
        .sa-city { color:rgba(255,255,255,0.6); font-size:1rem; margin-bottom:1.5rem; }
        .sa-map-embed { border-radius:12px; overflow:hidden; margin-top:1.5rem; height:200px; }
        .sa-map-embed iframe { width:100%; height:100%; border:none; }
        .sa-prop-features { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:1.5rem; }
        .sa-feature-item { display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; color:#4A5568; }
        .sa-feature-icon { width:32px; height:32px; background:linear-gradient(135deg,rgba(198,166,107,0.15),rgba(198,166,107,0.05)); border:1px solid rgba(198,166,107,0.3); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.9rem; flex-shrink:0; }
        .sa-demand-list { list-style:none; }
        .sa-demand-list li { display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem 0; border-bottom:1px solid #E2E8F0; font-size:0.95rem; color:#4A5568; }
        .sa-demand-list li:last-child { border-bottom:none; }
        .sa-demand-list li::before { content:'✓'; color:#C6A66B; font-weight:700; font-size:0.9rem; flex-shrink:0; margin-top:0.15rem; }

        /* GALLERY */
        .sa-gallery-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.75rem; }
        .sa-gallery-grid .sa-gallery-featured { grid-column:span 2; grid-row:span 2; }
        .sa-gallery-item { overflow:hidden; border-radius:12px; position:relative; background:#E2E8F0; aspect-ratio:4/3; cursor:pointer; }
        .sa-gallery-item img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease; display:block; }
        .sa-gallery-item:hover img { transform:scale(1.05); }
        .sa-gallery-featured { aspect-ratio:unset; min-height:320px; }
        .sa-gallery-label { position:absolute; bottom:0; left:0; right:0; padding:0.6rem 0.85rem; background:linear-gradient(transparent,rgba(14,26,43,0.7)); font-size:0.72rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.9); opacity:0; transition:opacity 0.3s; }
        .sa-gallery-item:hover .sa-gallery-label { opacity:1; }
        .sa-lightbox { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999; align-items:center; justify-content:center; }
        .sa-lightbox.sa-lx-open { display:flex; }
        .sa-lightbox img { max-width:90vw; max-height:85vh; border-radius:8px; object-fit:contain; }
        .sa-lx-close { position:absolute; top:1.5rem; right:1.5rem; width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,0.15); border:none; color:#fff; font-size:1.4rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
        .sa-lx-close:hover { background:rgba(255,255,255,0.3); }
        .sa-lx-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.15); border:none; color:#fff; font-size:1.6rem; width:48px; height:48px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
        .sa-lx-nav:hover { background:rgba(255,255,255,0.3); }
        .sa-lx-prev { left:1.5rem; }
        .sa-lx-next { right:1.5rem; }
        .sa-gallery-note { text-align:center; margin-top:1.25rem; font-size:0.82rem; color:#718096; font-style:italic; }

        /* MARKET */
        .sa-market-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-bottom:3rem; }
        .sa-market-stat { background:rgba(255,255,255,0.06); border:1px solid rgba(198,166,107,0.2); border-radius:16px; padding:1.75rem; text-align:center; }
        .sa-market-stat-value { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700; color:#C6A66B; }
        .sa-market-stat-label { font-size:0.82rem; color:rgba(255,255,255,0.55); text-transform:uppercase; letter-spacing:0.08em; margin-top:0.4rem; }
        .sa-market-stat-desc { font-size:0.78rem; color:rgba(255,255,255,0.4); margin-top:0.3rem; }
        .sa-market-drivers { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; margin-top:2rem; }
        .sa-driver-card { background:rgba(255,255,255,0.05); border:1px solid rgba(198,166,107,0.15); border-radius:12px; padding:1.25rem; }
        .sa-driver-title { font-size:0.88rem; font-weight:600; color:#C6A66B; margin-bottom:0.4rem; }
        .sa-driver-desc { font-size:0.82rem; color:rgba(255,255,255,0.55); line-height:1.6; }
        .sa-chart-container { background:rgba(255,255,255,0.04); border:1px solid rgba(198,166,107,0.15); border-radius:20px; padding:2rem; max-width:700px; margin:0 auto; }
        .sa-chart-container.sa-white { background:#fff; border:1px solid #E2E8F0; }
        .sa-chart-title { font-family:'Playfair Display',serif; font-size:1.1rem; color:#fff; text-align:center; margin-bottom:1.5rem; }
        .sa-chart-title.sa-dark-text { color:#0E1A2B; }

        /* PROJECTIONS */
        .sa-proj-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-bottom:3rem; }
        .sa-proj-card { background:#fff; border-radius:20px; padding:2rem; box-shadow:0 2px 8px rgba(14,26,43,0.08); border-top:4px solid transparent; transition:transform 0.3s, box-shadow 0.3s; position:relative; cursor:pointer; }
        .sa-proj-card:hover { transform:translateY(-6px); box-shadow:0 8px 32px rgba(14,26,43,0.12); }
        .sa-proj-card.sa-selected { outline:3px solid #C6A66B; outline-offset:2px; transform:translateY(-6px); box-shadow:0 8px 32px rgba(198,166,107,0.25); }
        .sa-proj-card.sa-selected::after { content:'✓ Selected'; position:absolute; bottom:1rem; right:1rem; font-size:0.7rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#C6A66B; }
        .sa-proj-conservative { border-top-color:#8BA3C0; }
        .sa-proj-strong { border-top-color:#C6A66B; background:#0E1A2B; }
        .sa-proj-premium { border-top-color:#2D6A4F; }
        .sa-proj-badge { display:inline-block; font-size:0.7rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:0.3rem 0.8rem; border-radius:50px; margin-bottom:1rem; }
        .sa-proj-conservative .sa-proj-badge { background:rgba(139,163,192,0.15); color:#5A7FA5; }
        .sa-proj-strong .sa-proj-badge { background:rgba(198,166,107,0.2); color:#C6A66B; }
        .sa-proj-premium .sa-proj-badge { background:rgba(45,106,79,0.15); color:#2D6A4F; }
        .sa-proj-nightly { font-family:'Playfair Display',serif; font-size:2.5rem; font-weight:700; color:#0E1A2B; line-height:1; margin-bottom:0.25rem; }
        .sa-proj-strong .sa-proj-nightly { color:#C6A66B; }
        .sa-proj-label { font-size:0.75rem; color:#718096; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:1.25rem; }
        .sa-proj-strong .sa-proj-label { color:rgba(255,255,255,0.5); }
        .sa-proj-rows { border-top:1px solid #E2E8F0; padding-top:1rem; }
        .sa-proj-strong .sa-proj-rows { border-top-color:rgba(255,255,255,0.12); }
        .sa-proj-row { display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; font-size:0.85rem; }
        .sa-proj-row-label { color:#718096; }
        .sa-proj-strong .sa-proj-row-label { color:rgba(255,255,255,0.5); }
        .sa-proj-row-value { font-weight:600; color:#1A2230; }
        .sa-proj-strong .sa-proj-row-value { color:#fff; }
        .sa-proj-annual { margin-top:1.25rem; padding-top:1rem; border-top:1px solid #E2E8F0; }
        .sa-proj-strong .sa-proj-annual { border-top-color:rgba(255,255,255,0.12); }
        .sa-proj-annual-value { font-family:'Playfair Display',serif; font-size:1.6rem; font-weight:700; color:#C6A66B; }
        .sa-proj-annual-label { font-size:0.75rem; color:#718096; margin-top:0.2rem; }
        .sa-proj-strong .sa-proj-annual-label { color:rgba(255,255,255,0.45); }
        .sa-popular-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#C6A66B; color:#0E1A2B; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:0.3rem 0.9rem; border-radius:50px; white-space:nowrap; }
        .sa-disclaimer { background:rgba(198,166,107,0.08); border:1px solid rgba(198,166,107,0.2); border-radius:12px; padding:1.25rem 1.5rem; font-size:0.84rem; color:#4A5568; margin-top:2rem; }

        /* EARNINGS */
        .sa-earnings-layout { display:grid; grid-template-columns:1fr 1.3fr; gap:3rem; align-items:start; }
        .sa-fee-structure { background:#0E1A2B; border-radius:20px; padding:2.5rem; }
        .sa-fee-item { display:flex; justify-content:space-between; align-items:center; padding:1.1rem 0; border-bottom:1px solid rgba(255,255,255,0.08); }
        .sa-fee-item:last-child { border-bottom:none; }
        .sa-fee-item-label { font-size:0.9rem; font-weight:600; color:#fff; }
        .sa-fee-item-sublabel { font-size:0.78rem; color:rgba(255,255,255,0.45); margin-top:0.2rem; }
        .sa-fee-item-value { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:#C6A66B; }
        .sa-earnings-table-wrap { overflow-x:auto; border-radius:12px; box-shadow:0 2px 8px rgba(14,26,43,0.08); }
        .sa-earnings-table { width:100%; border-collapse:collapse; font-size:0.92rem; background:#fff; }
        .sa-earnings-table th { background:#0E1A2B; color:#fff; font-family:'Inter',sans-serif; font-weight:600; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; padding:1rem 1.25rem; text-align:left; }
        .sa-earnings-table td { padding:0.9rem 1.25rem; border-bottom:1px solid #E2E8F0; color:#4A5568; }
        .sa-earnings-table td:last-child { font-weight:600; color:#1A2230; text-align:right; }
        .sa-earnings-table tr.sa-highlight td { background:linear-gradient(90deg,rgba(198,166,107,0.08),rgba(198,166,107,0.04)); color:#0E1A2B; font-weight:700; font-size:1rem; }
        .sa-earnings-table tr.sa-highlight td:last-child { color:#C6A66B; font-size:1.1rem; }
        .sa-editable-note { display:flex; align-items:center; gap:0.5rem; font-size:0.8rem; color:#718096; margin-top:0.75rem; font-style:italic; }

        /* SERVICES */
        .sa-services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; }
        .sa-service-card { background:#fff; border-radius:14px; padding:1.75rem 1.5rem; box-shadow:0 2px 8px rgba(14,26,43,0.07); text-align:center; transition:transform 0.3s, box-shadow 0.3s; }
        .sa-service-card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(14,26,43,0.11); }
        .sa-service-icon { font-size:1.75rem; margin-bottom:0.75rem; }
        .sa-service-title { font-family:'Inter',sans-serif; font-size:0.88rem; font-weight:600; color:#0E1A2B; line-height:1.4; }

        /* WHY */
        .sa-why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        .sa-why-card { background:rgba(255,255,255,0.06); border:1px solid rgba(198,166,107,0.15); border-radius:16px; padding:2rem; transition:border-color 0.3s; }
        .sa-why-card:hover { border-color:rgba(198,166,107,0.4); }
        .sa-why-icon { font-size:1.75rem; margin-bottom:1rem; }
        .sa-why-title { font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.5rem; }
        .sa-why-desc { font-size:0.85rem; color:rgba(255,255,255,0.55); line-height:1.7; }

        /* DASHBOARD */
        .sa-dashboard-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem; }
        .sa-dashboard-card { background:#fff; border-radius:16px; padding:1.75rem; box-shadow:0 2px 8px rgba(14,26,43,0.07); display:flex; gap:1.25rem; align-items:flex-start; }
        .sa-dashboard-icon { font-size:1.5rem; background:linear-gradient(135deg,rgba(198,166,107,0.15),rgba(198,166,107,0.05)); border:1px solid rgba(198,166,107,0.3); border-radius:10px; width:48px; height:48px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .sa-dashboard-title { font-family:'Inter',sans-serif; font-size:0.95rem; font-weight:700; color:#0E1A2B; margin-bottom:0.35rem; }
        .sa-dashboard-desc { font-size:0.84rem; color:#718096; line-height:1.6; }

        /* CTA */
        .sa-cta { text-align:center; padding:6rem 1.5rem; background:linear-gradient(135deg,#0E1A2B 0%,#1a2d47 50%,#0E1A2B 100%); }
        .sa-cta h2 { color:#fff !important; margin-bottom:1rem; }
        .sa-cta p { color:rgba(255,255,255,0.65) !important; font-size:1.1rem; margin-bottom:2.5rem; max-width:560px; margin-left:auto; margin-right:auto; }

        /* FOOTER */
        .sa-footer { background:#060D18; color:rgba(255,255,255,0.6); padding:3rem 0 2rem; }
        .sa-footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:3rem; margin-bottom:2.5rem; }
        .sa-footer-brand { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:0.5rem; }
        .sa-footer-brand span { color:#C6A66B; }
        .sa-footer-sub { font-size:0.85rem; color:rgba(255,255,255,0.45); margin-bottom:1.25rem; }
        .sa-footer-heading { font-family:'Inter',sans-serif; font-size:0.72rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#C6A66B; margin-bottom:1rem; }
        .sa-footer-links { list-style:none; }
        .sa-footer-links li { margin-bottom:0.5rem; }
        .sa-footer-links a { font-size:0.85rem; color:rgba(255,255,255,0.45); transition:color 0.2s; }
        .sa-footer-links a:hover { color:#C6A66B; }
        .sa-footer-bottom { border-top:1px solid rgba(255,255,255,0.08); padding-top:1.5rem; text-align:center; font-size:0.8rem; color:rgba(255,255,255,0.3); }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .sa-proj-cards, .sa-services-grid { grid-template-columns: repeat(2,1fr); }
          .sa-why-grid { grid-template-columns: repeat(2,1fr); }
          .sa-footer-grid { grid-template-columns: 1fr 1fr; }
          .sa-gallery-grid { grid-template-columns: repeat(2,1fr); }
          .sa-gallery-grid .sa-gallery-featured { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .sa-property-grid, .sa-earnings-layout, .sa-market-stats { grid-template-columns: 1fr; gap:2rem; }
          .sa-market-drivers, .sa-dashboard-grid { grid-template-columns: 1fr; }
          .sa-footer-grid { grid-template-columns: 1fr; gap:2rem; }
        }
        @media (max-width: 600px) {
          .sa-proj-cards, .sa-services-grid, .sa-why-grid { grid-template-columns: 1fr; }
          .sa-section { padding: 3.5rem 0; }
          .sa-prop-features { grid-template-columns: 1fr; }
          .sa-gallery-grid { grid-template-columns: 1fr; }
          .sa-gallery-grid .sa-gallery-featured { grid-column: span 1; }
        }
      `}</style>

      {/* NAV */}
      <nav className="sa-nav" id="sa-nav">
        <div className="sa-nav-inner">
          <div className="sa-nav-logo"><a href="/"><span>IPM</span>.</a></div>
          <a href="https://calendly.com" className="sa-btn sa-nav-cta" target="_blank" rel="noopener noreferrer">Schedule Consultation</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="sa-hero">
        <div className="sa-hero-bg"></div>
        <div className="sa-hero-overlay"></div>
        <div className="sa-hero-content">
          <div className="sa-hero-inner">
            <div className="sa-hero-badge">✦ Private Owner Proposal</div>
            <h1 className="sa-hero-h1">Unlock the Revenue Potential of Your <em>St. Augustine</em> Beach Property</h1>
            <p className="sa-hero-sub">Custom Property Management Proposal for<br/>3851 N Crossroad – St. Augustine, FL</p>
            <p className="sa-hero-desc">IPM – International Property Management specializes in professional short-term rental management and revenue optimization. We help coastal property owners like you unlock the full potential of your investment while handling every operational detail.</p>
            <div className="sa-btn-group">
              <a href="#sa-projections" className="sa-btn sa-btn-primary">View Revenue Projection</a>
              <a href="https://calendly.com" className="sa-btn sa-btn-outline" target="_blank" rel="noopener noreferrer">Schedule Owner Consultation</a>
            </div>
            <div className="sa-hero-stats">
              <div><div className="sa-hero-stat-value">$85K+</div><div className="sa-hero-stat-label">Annual Revenue Potential</div></div>
              <div><div className="sa-hero-stat-value">68%</div><div className="sa-hero-stat-label">Avg. Occupancy Rate</div></div>
              <div><div className="sa-hero-stat-value">$245</div><div className="sa-hero-stat-label">Est. Nightly Rate</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY OVERVIEW */}
      <section className="sa-section sa-section-white" id="sa-overview">
        <div className="sa-container">
          <div className="sa-property-grid sa-fade-in">
            <div>
              <div className="sa-section-label">Property Overview</div>
              <h2 style={{marginBottom:'1rem'}}>3851 N Crossroad<br/>St. Augustine, FL</h2>
              <div style={{width:'60px',height:'3px',background:'linear-gradient(90deg,#C6A66B,#D9BC8A)',borderRadius:'2px',marginBottom:'1.5rem'}}></div>
              <p style={{marginBottom:'1.5rem'}}>Nestled in one of Florida's most beloved coastal destinations, this property sits in the heart of St. Augustine's thriving short-term rental market. With year-round tourism driven by beaches, historic attractions, and major events, the property is ideally positioned for exceptional occupancy and premium nightly rates.</p>
              <div className="sa-prop-features">
                {[
                  ['🏖','Beach Proximity'],['🏠','Single-Family Home'],['📍','St. Augustine, FL'],['🌴','Coastal Setting'],
                  ['🏛','Historic District Nearby'],['🎭','Event-Driven Demand'],['✈️','JAX Airport Access'],['💼','Year-Round Tourism'],
                ].map(([icon, label]) => (
                  <div className="sa-feature-item" key={label}>
                    <div className="sa-feature-icon">{icon}</div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'2rem'}}>
                <div className="sa-section-label" style={{marginBottom:'0.75rem'}}>Why This Property Performs</div>
                <ul className="sa-demand-list">
                  <li>St. Augustine is Florida's #1 historic tourism destination — drawing millions of visitors annually</li>
                  <li>Beach proximity commands a significant premium over inland properties in the same market</li>
                  <li>Year-round demand from snowbirds, families, couples, and event attendees</li>
                  <li>Short drive to Ponte Vedra Beach, Jacksonville, and major event venues</li>
                  <li>Premium coastal inventory is limited — reducing competition and supporting high occupancy rates</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="sa-address-card">
                <div className="sa-addr-label">Property Address</div>
                <h3>3851 N Crossroad</h3>
                <div className="sa-city">St. Augustine, FL</div>
                <div style={{display:'flex',gap:'1.5rem',paddingTop:'1rem',borderTop:'1px solid rgba(255,255,255,0.1)'}}>
                  {[['Beach','Proximity'],['FL','Coastal'],['$85K+','Revenue Potential']].map(([v,l]) => (
                    <div key={l}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',fontWeight:700,color:'#C6A66B'}}>{v}</div>
                      <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.08em'}}>{l}</div>
                    </div>
                  ))}
                </div>
                <div className="sa-map-embed">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2!2d-81.312!3d29.938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6d8f1b1b1b1b1%3A0x1!2s3851+N+Crossroad%2C+St.+Augustine%2C+FL!5e0!3m2!1sen!2sus!4v1"
                    allowFullScreen=""
                    loading="lazy"
                    title="3851 N Crossroad Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="sa-section sa-section-ivory" id="sa-gallery">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in" style={{marginBottom:'2.5rem'}}>
            <div className="sa-section-label">Property Photos</div>
            <h2>A Look at 3851 N Crossroad</h2>
            <div className="sa-gold-divider"></div>
            <p>This coastal St. Augustine property showcases the character and curb appeal that attract premium short-term rental guests.</p>
          </div>
          <div className="sa-gallery-grid sa-fade-in">
            <div className="sa-gallery-item sa-gallery-featured" onClick={() => setLightboxIdx(0)}>
              <img src="/staugustine-hero-bg.jpg" alt="Exterior – Sunset View" />
              <div className="sa-gallery-label">Exterior – Sunset View</div>
            </div>
          </div>
          <p className="sa-gallery-note">Additional interior photos will be added as they become available. Click the photo to view full screen.</p>
        </div>
      </section>

      {lightboxIdx !== null && (
        <div className="sa-lightbox sa-lx-open" onClick={() => setLightboxIdx(null)}>
          <button className="sa-lx-close" onClick={() => setLightboxIdx(null)}>✕</button>
          <img src={PHOTOS[lightboxIdx].src} alt={PHOTOS[lightboxIdx].label} onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* ST. AUGUSTINE MARKET */}
      <section className="sa-section sa-section-dark" id="sa-market">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in">
            <div className="sa-section-label">Market Intelligence</div>
            <h2 style={{color:'#fff'}}>St. Augustine Short-Term Rental Market</h2>
            <div className="sa-gold-divider"></div>
            <p style={{color:'rgba(255,255,255,0.6)'}}>St. Augustine is one of Florida's most resilient vacation rental markets — powered by historic tourism, beach access, and year-round demand that keeps properties occupied and nightly rates elevated.</p>
          </div>
          <div className="sa-market-stats sa-fade-in">
            {[
              ['$195–$310','Avg. Nightly Rate','St. Augustine coastal property range'],
              ['65–75%','Avg. Occupancy','Year-round market performance'],
              ['$50K–$85K','Avg. Annual Revenue','Coastal & beach-adjacent properties'],
            ].map(([val, label, desc]) => (
              <div className="sa-market-stat" key={label}>
                <div className="sa-market-stat-value">{val}</div>
                <div className="sa-market-stat-label">{label}</div>
                <div className="sa-market-stat-desc">{desc}</div>
              </div>
            ))}
          </div>
          <div className="sa-chart-container sa-fade-in" style={{marginBottom:'3rem'}}>
            <div className="sa-chart-title">St. Augustine Avg. Nightly Rate by Property Size</div>
            <canvas ref={nightlyChartRef} height="260"></canvas>
          </div>
          <div className="sa-market-drivers sa-fade-in">
            {[
              ['🏛 Historic District & Tourism','St. Augustine draws 7M+ annual visitors as America\'s oldest city — creating consistent baseline demand across all seasons.'],
              ['🌊 Coastal Beach Access','Beach-adjacent properties command 30–50% premium over inland rentals, with peak summer rates topping $400+/night.'],
              ['🎭 Events & Festivals','Nights of Lights, Rhythm & Brews, golf tournaments, and seasonal festivals spike occupancy throughout the year.'],
              ['❄️ Snowbird Season','October–April brings a wave of Northeastern and Midwestern snowbirds who book weeks or months at a time.'],
            ].map(([title, desc]) => (
              <div className="sa-driver-card" key={title}>
                <div className="sa-driver-title">{title}</div>
                <div className="sa-driver-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE PROJECTIONS */}
      <section className="sa-section sa-section-ivory" id="sa-projections">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in">
            <div className="sa-section-label">Revenue Projections</div>
            <h2>Revenue Projection for 3851 N Crossroad</h2>
            <div className="sa-gold-divider"></div>
            <p>Based on comparable short-term rental performance in the St. Augustine coastal market, we have modeled three realistic revenue scenarios. <strong>Click any scenario card to instantly see your estimated owner payout.</strong></p>
          </div>
          <div className="sa-proj-cards sa-fade-in">
            <div className={`sa-proj-card sa-proj-conservative${selectedTier==='conservative'?' sa-selected':''}`} onClick={() => setSelectedTier('conservative')}>
              <div className="sa-proj-badge">Conservative</div>
              <div className="sa-proj-nightly">$195</div>
              <div className="sa-proj-label">Estimated Nightly Rate</div>
              <div className="sa-proj-rows">
                {[['Occupancy Rate','~55%'],['Booked Nights / Month','16–17 nights'],['Monthly Gross Revenue','$3,000–$3,400']].map(([l,v]) => (
                  <div className="sa-proj-row" key={l}><span className="sa-proj-row-label">{l}</span><span className="sa-proj-row-value">{v}</span></div>
                ))}
              </div>
              <div className="sa-proj-annual"><div className="sa-proj-annual-value">$36K–$41K</div><div className="sa-proj-annual-label">Estimated Annual Gross Revenue</div></div>
            </div>
            <div className={`sa-proj-card sa-proj-strong${selectedTier==='strong'?' sa-selected':''}`} style={{position:'relative'}} onClick={() => setSelectedTier('strong')}>
              <div className="sa-popular-badge">Most Likely</div>
              <div className="sa-proj-badge">Strong Performance</div>
              <div className="sa-proj-nightly">$245</div>
              <div className="sa-proj-label">Estimated Nightly Rate</div>
              <div className="sa-proj-rows">
                {[['Occupancy Rate','~68%'],['Booked Nights / Month','20–21 nights'],['Monthly Gross Revenue','$4,600–$5,200']].map(([l,v]) => (
                  <div className="sa-proj-row" key={l}><span className="sa-proj-row-label">{l}</span><span className="sa-proj-row-value">{v}</span></div>
                ))}
              </div>
              <div className="sa-proj-annual"><div className="sa-proj-annual-value">$55K–$62K</div><div className="sa-proj-annual-label">Estimated Annual Gross Revenue</div></div>
            </div>
            <div className={`sa-proj-card sa-proj-premium${selectedTier==='premium'?' sa-selected':''}`} onClick={() => setSelectedTier('premium')}>
              <div className="sa-proj-badge">Premium Optimized</div>
              <div className="sa-proj-nightly">$310</div>
              <div className="sa-proj-label">Estimated Nightly Rate</div>
              <div className="sa-proj-rows">
                {[['Occupancy Rate','~78%'],['Booked Nights / Month','23–24 nights'],['Monthly Gross Revenue','$6,800–$7,400']].map(([l,v]) => (
                  <div className="sa-proj-row" key={l}><span className="sa-proj-row-label">{l}</span><span className="sa-proj-row-value">{v}</span></div>
                ))}
              </div>
              <div className="sa-proj-annual"><div className="sa-proj-annual-value">$82K–$89K</div><div className="sa-proj-annual-label">Estimated Annual Gross Revenue</div></div>
            </div>
          </div>
          <div className="sa-chart-container sa-white sa-fade-in">
            <div className="sa-chart-title sa-dark-text">Annual Revenue Comparison – Three Scenarios</div>
            <canvas ref={revenueChartRef} height="260"></canvas>
          </div>
          <div className="sa-disclaimer sa-fade-in">
            <strong>Disclaimer:</strong> Revenue projections are estimates based on market data and comparable St. Augustine coastal listings. Actual performance depends on property condition, amenities, beach access, pricing strategy, seasonality, and guest demand.
          </div>
        </div>
      </section>

      {/* OWNER EARNINGS */}
      <section className="sa-section sa-section-white" id="sa-earnings">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in">
            <div className="sa-section-label">Owner Economics</div>
            <h2>Your Estimated Owner Earnings</h2>
            <div className="sa-gold-divider"></div>
            <p>IPM's pricing model is built around transparency and alignment with owner success. Our management fee is calculated on net profit — never gross revenue — so we only earn more when you earn more.</p>
          </div>
          <div className="sa-earnings-layout sa-fade-in">
            <div>
              <div className="sa-fee-structure">
                <div className="sa-section-label" style={{color:'#C6A66B'}}>IPM Fee Structure</div>
                <h3 style={{color:'#fff',marginBottom:'1.5rem'}}>Simple. Transparent. Aligned.</h3>
                <div className="sa-fee-item">
                  <div><div className="sa-fee-item-label">Monthly Platform & Software Fee</div><div className="sa-fee-item-sublabel">Flat monthly fee regardless of bookings</div></div>
                  <div className="sa-fee-item-value">$200/mo</div>
                </div>
                <div className="sa-fee-item">
                  <div><div className="sa-fee-item-label">Management Fee</div><div className="sa-fee-item-sublabel">Applied to net profit after platform commissions</div></div>
                  <div className="sa-fee-item-value">20%</div>
                </div>
                <div style={{marginTop:'1.5rem',padding:'1rem',background:'rgba(198,166,107,0.1)',borderRadius:'8px',border:'1px solid rgba(198,166,107,0.2)'}}>
                  <p style={{fontSize:'0.82rem',color:'rgba(255,255,255,0.6)',lineHeight:'1.6'}}><strong style={{color:'#C6A66B'}}>Net Profit Definition:</strong> Revenue after platform commissions (Airbnb, VRBO, Booking.com). IPM's fee is never applied to gross revenue — only to what you actually earn.</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{marginBottom:'1rem'}}>
                <div className="sa-section-label">Sample Calculation</div>
                <h3 style={{marginBottom:'0.5rem'}}>{TIERS[selectedTier].label}</h3>
                <p style={{fontSize:'0.88rem'}}>Based on {fmt(TIERS[selectedTier].gross)} monthly gross booking revenue. Click a scenario above to compare.</p>
              </div>
              <div className="sa-earnings-table-wrap">
                <table className="sa-earnings-table">
                  <thead><tr><th>Item</th><th style={{textAlign:'right'}}>Amount</th></tr></thead>
                  <tbody>
                    <tr><td>Monthly Gross Booking Revenue</td><td>{fmt(TIERS[selectedTier].gross)}</td></tr>
                    <tr><td>Platform Commission (est. 15%)</td><td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].commission)}</td></tr>
                    <tr><td><strong>Net Booking Revenue</strong></td><td><strong>{fmt(TIERS[selectedTier].net)}</strong></td></tr>
                    <tr><td>IPM Management Fee (20% of Net)</td><td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].mgmtFee)}</td></tr>
                    <tr><td>Monthly Platform / Software Fee</td><td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].platformFee)}</td></tr>
                    <tr className="sa-highlight">
                      <td><strong>Estimated Owner Payout</strong><br/><span style={{fontSize:'0.75rem',fontWeight:'400',color:'#718096'}}>Before taxes &amp; maintenance reserve</span></td>
                      <td><strong>{fmt(TIERS[selectedTier].payout)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="sa-editable-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Click any projection card above to update this breakdown instantly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sa-section sa-section-ivory" id="sa-services">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in">
            <div className="sa-section-label">What IPM Handles</div>
            <h2>A Fully Hands-Off Management Experience</h2>
            <div className="sa-gold-divider"></div>
            <p>From coastal listing optimization to guest checkout, IPM manages every detail so you enjoy passive income from your St. Augustine property with zero operational burden.</p>
          </div>
          <div className="sa-services-grid sa-fade-in">
            {[['📸','Professional Photography'],['✍️','Listing Creation & SEO'],['💰','Dynamic Pricing Strategy'],['💬','24/7 Guest Messaging'],['🧹','Cleaning Coordination'],['🔧','Maintenance Management'],['⭐','Review Management'],['🌐','Multi-Platform Distribution']].map(([icon, title]) => (
              <div className="sa-service-card" key={title}>
                <div className="sa-service-icon">{icon}</div>
                <div className="sa-service-title">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IPM */}
      <section className="sa-section sa-section-dark" id="sa-why">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in">
            <div className="sa-section-label">Why IPM</div>
            <h2 style={{color:'#fff'}}>Why Owners Choose IPM</h2>
            <div className="sa-gold-divider"></div>
            <p style={{color:'rgba(255,255,255,0.6)'}}>We combine coastal hospitality expertise with data-driven pricing to consistently outperform the market for our owners.</p>
          </div>
          <div className="sa-why-grid sa-fade-in">
            {[
              ['📈','Revenue Optimization','Dynamic pricing calibrated to St. Augustine\'s seasonal demand curves, local events, and real-time competitor rates.'],
              ['🤝','Professional Guest Communication','Responsive, hospitality-trained messaging that earns 5-star reviews and drives repeat coastal bookings.'],
              ['🛡','Property Protection','Thorough guest screening, security protocols, and a local maintenance network protect your coastal investment.'],
              ['📊','Transparent Reporting','Monthly statements, booking calendars, and performance dashboards delivered directly to you every month.'],
              ['🌐','Multi-Platform Exposure','Listed and optimized on Airbnb, VRBO, Booking.com, and direct booking channels to maximize reach.'],
              ['🏖','Coastal Hospitality Focus','Boutique-quality guest experiences that command premium coastal rates and generate the reviews that drive bookings.'],
            ].map(([icon, title, desc]) => (
              <div className="sa-why-card" key={title}>
                <div className="sa-why-icon">{icon}</div>
                <div className="sa-why-title">{title}</div>
                <div className="sa-why-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="sa-section sa-section-white" id="sa-dashboard">
        <div className="sa-container">
          <div className="sa-section-header sa-fade-in">
            <div className="sa-section-label">Owner Dashboard</div>
            <h2>Full Visibility. Zero Guesswork.</h2>
            <div className="sa-gold-divider"></div>
            <p>Every IPM owner receives complete transparency into their property's performance — without any of the day-to-day management work.</p>
          </div>
          <div className="sa-dashboard-grid sa-fade-in">
            {[
              ['📅','Booking Calendar Access','See every reservation in real-time — who is staying, when, and for how long.'],
              ['💵','Monthly Financial Reports','Detailed income breakdowns delivered every month — gross revenue, fees, and net owner payout.'],
              ['📉','Revenue & Performance Tracking','Track occupancy rates, average nightly rates, and revenue trends compared to the St. Augustine market.'],
              ['⭐','Guest Feedback & Reviews','Monitor every review and benchmark your property\'s performance against comparable coastal listings.'],
            ].map(([icon, title, desc]) => (
              <div className="sa-dashboard-card" key={title}>
                <div className="sa-dashboard-icon">{icon}</div>
                <div><div className="sa-dashboard-title">{title}</div><div className="sa-dashboard-desc">{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sa-cta" id="sa-cta">
        <div className="sa-section-label" style={{color:'#C6A66B',textAlign:'center',marginBottom:'1rem'}}>Next Steps</div>
        <h2>Turn Your Coastal Property Into a High-Performing Asset</h2>
        <p>Schedule a no-obligation consultation with our St. Augustine property team. We'll walk you through the full opportunity and answer every question.</p>
        <div className="sa-btn-group" style={{justifyContent:'center'}}>
          <a href="https://calendly.com" className="sa-btn sa-btn-primary" target="_blank" rel="noopener noreferrer">Schedule Owner Consultation</a>
          <a href="mailto:info@ipm.services" className="sa-btn sa-btn-outline">Request Revenue Analysis</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sa-footer">
        <div className="sa-container">
          <div className="sa-footer-grid">
            <div>
              <div className="sa-footer-brand"><span>IPM</span>. International Property Management</div>
              <div className="sa-footer-sub">St. Augustine Property Management Division</div>
              <p style={{fontSize:'0.84rem',color:'rgba(255,255,255,0.4)',lineHeight:'1.7',maxWidth:'320px'}}>Professional short-term rental management across St. Augustine, Charlotte, Tampa, Playa del Carmen, Tulum, and Lake Norman.</p>
            </div>
            <div>
              <div className="sa-footer-heading">Quick Links</div>
              <ul className="sa-footer-links">
                <li><a href="/">Main Website</a></li>
                <li><a href="/services">Our Services</a></li>
                <li><a href="/properties">Properties</a></li>
                <li><a href="/insights">Insights</a></li>
              </ul>
            </div>
            <div>
              <div className="sa-footer-heading">Contact</div>
              <ul className="sa-footer-links">
                <li><a href="https://ipm.services" target="_blank" rel="noopener noreferrer">ipm.services</a></li>
                <li><a href="mailto:info@ipm.services">info@ipm.services</a></li>
                <li><a href="https://calendly.com" target="_blank" rel="noopener noreferrer">Schedule a Call</a></li>
              </ul>
            </div>
          </div>
          <div className="sa-footer-bottom">
            <p>© {new Date().getFullYear()} IPM – International Property Management. All rights reserved. | This proposal is private and confidential.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StAugustineProposal;
