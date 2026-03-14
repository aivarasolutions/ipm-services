import { useEffect, useRef, useState } from 'react';

const TIERS = {
  conservative: {
    label: 'Conservative Scenario',
    gross: 2850,
    commission: 428,
    net: 2423,
    mgmtFee: 485,
    platformFee: 200,
    payout: 1738,
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
    gross: 5600,
    commission: 840,
    net: 4760,
    mgmtFee: 952,
    platformFee: 200,
    payout: 3608,
  },
};

const fmt = (n) => '$' + n.toLocaleString('en-US');

const TampaProposal = () => {
  const nightlyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const nightlyChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);
  const [selectedTier, setSelectedTier] = useState('strong');

  useEffect(() => {
    document.title = 'Owner Proposal – 8817 Audrey Ln, Tampa | IPM';

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
              data: [100, 150, 210, 290, 395],
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
              x: { ticks: { color: 'rgba(255,255,255,0.6)', font: { family: 'Inter', size: 12 } }, grid: { color: 'rgba(255,255,255,0.06)' } },
              y: { ticks: { color: 'rgba(255,255,255,0.6)', font: { family: 'Inter', size: 12 }, callback: v => '$' + v }, grid: { color: 'rgba(255,255,255,0.06)' } }
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
            datasets: [
              { label: 'Annual Revenue Low ($)', data: [32000, 48000, 63000], backgroundColor: 'rgba(139,163,192,0.55)', borderColor: 'rgba(139,163,192,0.9)', borderWidth: 1, borderRadius: 6 },
              { label: 'Annual Revenue High ($)', data: [36000, 52000, 70000], backgroundColor: 'rgba(198,166,107,0.75)', borderColor: 'rgba(198,166,107,1)', borderWidth: 1, borderRadius: 6 }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { labels: { color: '#4A5568', font: { family: 'Inter', size: 12 } } },
              tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y.toLocaleString()}` } }
            },
            scales: {
              x: { ticks: { color: '#4A5568', font: { family: 'Inter', size: 12 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
              y: { ticks: { color: '#4A5568', font: { family: 'Inter', size: 12 }, callback: v => '$' + (v/1000) + 'K' }, grid: { color: 'rgba(0,0,0,0.05)' } }
            }
          }
        });
      }
    };

    initCharts();

    const fadeEls = document.querySelectorAll('.tp-fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('tp-visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));

    const nav = document.getElementById('tpMainNav');
    const handleScroll = () => {
      if (nav) nav.classList.toggle('tp-nav-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (nightlyChartInstance.current) nightlyChartInstance.current.destroy();
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="tp-wrap">
      <style>{`
        .tp-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        .tp-wrap { font-family: 'Inter', sans-serif; background: #F8F7F4; color: #1A2230; line-height: 1.7; -webkit-font-smoothing: antialiased; }
        .tp-wrap img { max-width: 100%; height: auto; display: block; }
        .tp-wrap a { color: inherit; text-decoration: none; }
        .tp-wrap h1, .tp-wrap h2, .tp-wrap h3, .tp-wrap h4 { font-family: 'Playfair Display', Georgia, serif; line-height: 1.25; color: #0E1A2B; }
        .tp-wrap h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; }
        .tp-wrap h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 600; }
        .tp-wrap h3 { font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 600; }
        .tp-wrap h4 { font-size: 1.1rem; font-weight: 600; }
        .tp-wrap p { color: #4A5568; font-size: 1rem; line-height: 1.8; }

        .tp-container { max-width: 1160px; margin: 0 auto; padding: 0 1.5rem; }
        .tp-section { padding: 5rem 0; }
        .tp-section-dark { background: #0E1A2B; }
        .tp-section-slate { background: #232A33; }
        .tp-section-ivory { background: #F8F7F4; }
        .tp-section-white { background: #FFFFFF; }

        .tp-section-header { text-align: center; max-width: 700px; margin: 0 auto 3.5rem; }
        .tp-section-header h2 { margin-bottom: 1rem; }
        .tp-section-header p { font-size: 1.05rem; }
        .tp-section-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #C6A66B; margin-bottom: 0.75rem; }
        .tp-gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg, #C6A66B, #D9BC8A); border-radius: 2px; margin: 1.25rem auto; }
        .tp-gold-divider-left { margin-left: 0; }

        .tp-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border: 2px solid transparent; white-space: nowrap; }
        .tp-btn-primary { background: #C6A66B !important; color: #0E1A2B !important; border-color: #C6A66B; }
        .tp-btn-primary:hover { background: #D9BC8A !important; border-color: #D9BC8A; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,166,107,0.35); }
        .tp-btn-outline { background: transparent !important; color: #FFFFFF !important; border-color: rgba(255,255,255,0.6); }
        .tp-btn-outline:hover { background: rgba(255,255,255,0.1) !important; border-color: #FFFFFF; transform: translateY(-2px); }
        .tp-btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }

        .tp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1.25rem 0; transition: background 0.3s, padding 0.3s, box-shadow 0.3s; }
        .tp-nav-scrolled { background: rgba(14,26,43,0.97); padding: 0.75rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .tp-nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .tp-nav-logo { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #FFFFFF !important; letter-spacing: 0.05em; text-decoration: none; }
        .tp-nav-logo span { color: #C6A66B; }

        .tp-hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; background: #0E1A2B; }
        .tp-hero-bg { position: absolute; inset: 0; background-image: url('/tampa-hero-bg.jpg'); background-size: cover; background-position: center 30%; opacity: 0.28; }
        .tp-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(14,26,43,0.92) 0%, rgba(14,26,43,0.72) 50%, rgba(35,42,51,0.85) 100%); }
        .tp-hero-content { position: relative; z-index: 2; max-width: 800px; padding: 8rem 0 5rem; }
        .tp-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(198,166,107,0.15); border: 1px solid rgba(198,166,107,0.4); border-radius: 50px; padding: 0.4rem 1rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C6A66B; margin-bottom: 1.5rem; }
        .tp-hero h1 { color: #FFFFFF; margin-bottom: 1.25rem; }
        .tp-hero h1 em { color: #C6A66B; font-style: normal; }
        .tp-hero-sub { font-size: 1.15rem; color: #FFFFFF !important; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; font-style: italic; }
        .tp-hero-desc { font-size: 1rem; color: #FFFFFF !important; max-width: 580px; margin-bottom: 2.5rem; line-height: 1.8; }
        .tp-hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.12); flex-wrap: wrap; }
        .tp-hero-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #C6A66B; }
        .tp-hero-stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.2rem; }

        .tp-prop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .tp-address-card { background: #0E1A2B; border-radius: 20px; padding: 2.5rem; color: #FFFFFF; position: relative; overflow: hidden; }
        .tp-address-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(198,166,107,0.15) 0%, transparent 70%); border-radius: 50%; }
        .tp-address-card .tp-a-label { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: #C6A66B; font-weight: 600; margin-bottom: 0.5rem; }
        .tp-address-card h3 { color: #FFFFFF; font-size: 1.5rem; margin-bottom: 0.25rem; }
        .tp-address-city { color: rgba(255,255,255,0.6); font-size: 1rem; margin-bottom: 1.5rem; }
        .tp-map-wrap { background: #232A33; border-radius: 12px; height: 200px; margin-top: 1.5rem; overflow: hidden; }
        .tp-map-wrap iframe { width: 100%; height: 100%; border: none; }

        .tp-prop-features { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.75rem; }
        .tp-feature-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: #4A5568; }
        .tp-feature-icon { width: 32px; height: 32px; background: linear-gradient(135deg, rgba(198,166,107,0.15), rgba(198,166,107,0.05)); border: 1px solid rgba(198,166,107,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; }

        .tp-market-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .tp-market-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(198,166,107,0.2); border-radius: 12px; padding: 1.75rem; text-align: center; }
        .tp-market-card .tp-m-value { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #C6A66B; line-height: 1; margin-bottom: 0.5rem; }
        .tp-market-card .tp-m-desc { font-size: 0.85rem; color: rgba(255,255,255,0.6); line-height: 1.5; }
        .tp-chart-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(198,166,107,0.15); border-radius: 20px; padding: 2rem; max-width: 700px; margin: 0 auto; }
        .tp-chart-box-light { background: #FFFFFF; border: 1px solid #E2E8F0; max-width: 750px; margin: 0 auto; border-radius: 20px; padding: 2rem; }
        .tp-chart-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #FFFFFF; text-align: center; margin-bottom: 1.5rem; }
        .tp-chart-title-dark { color: #0E1A2B; }

        .tp-proj-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .tp-proj-card { background: #FFFFFF; border-radius: 20px; padding: 2rem; box-shadow: 0 2px 8px rgba(14,26,43,0.08); border-top: 4px solid transparent; transition: transform 0.3s, box-shadow 0.3s; position: relative; cursor: pointer; }
        .tp-proj-card:hover { transform: translateY(-6px); box-shadow: 0 8px 32px rgba(14,26,43,0.12); }
        .tp-proj-card.tp-selected { outline: 3px solid #C6A66B; outline-offset: 2px; transform: translateY(-6px); box-shadow: 0 8px 32px rgba(198,166,107,0.25); }
        .tp-proj-card.tp-selected::after { content: '✓ Selected'; position: absolute; bottom: 1rem; right: 1rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #C6A66B; }
        .tp-proj-card.tp-conservative { border-top-color: #8BA3C0; }
        .tp-proj-card.tp-strong { border-top-color: #C6A66B; background: #0E1A2B; }
        .tp-proj-card.tp-premium { border-top-color: #2D6A4F; }
        .tp-proj-badge { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: 50px; margin-bottom: 1rem; }
        .tp-conservative .tp-proj-badge { background: rgba(139,163,192,0.15); color: #5A7A9A; }
        .tp-strong .tp-proj-badge { background: rgba(198,166,107,0.2); color: #C6A66B; }
        .tp-premium .tp-proj-badge { background: rgba(45,106,79,0.12); color: #2D6A4F; }
        .tp-popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #C6A66B; color: #0E1A2B; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 1rem; border-radius: 50px; white-space: nowrap; }
        .tp-proj-nightly { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700; color: #0E1A2B; line-height: 1; margin-bottom: 0.25rem; }
        .tp-strong .tp-proj-nightly { color: #C6A66B; }
        .tp-proj-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; color: #718096; margin-bottom: 1.5rem; }
        .tp-strong .tp-proj-label, .tp-strong h3 { color: rgba(255,255,255,0.9); }
        .tp-proj-rows { border-top: 1px solid #E2E8F0; padding-top: 1.25rem; }
        .tp-strong .tp-proj-rows { border-top-color: rgba(255,255,255,0.1); }
        .tp-proj-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.88rem; }
        .tp-proj-row-label { color: #718096; }
        .tp-strong .tp-proj-row-label { color: rgba(255,255,255,0.6); }
        .tp-proj-row-value { font-weight: 600; color: #1A2230; }
        .tp-strong .tp-proj-row-value { color: #FFFFFF; }
        .tp-proj-annual { background: linear-gradient(135deg, rgba(198,166,107,0.12), rgba(198,166,107,0.05)); border: 1px solid rgba(198,166,107,0.3); border-radius: 8px; padding: 1rem; margin-top: 1.25rem; text-align: center; }
        .tp-proj-annual-value { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #C6A66B; }
        .tp-proj-annual-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #718096; margin-top: 0.2rem; }
        .tp-strong .tp-proj-annual-label { color: rgba(255,255,255,0.5); }
        .tp-disclaimer { background: rgba(198,166,107,0.06); border-left: 3px solid #C6A66B; border-radius: 0 8px 8px 0; padding: 1rem 1.5rem; font-size: 0.82rem; color: #718096; margin-top: 2rem; line-height: 1.6; }

        .tp-earnings-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start; }
        .tp-fee-structure { background: #0E1A2B; border-radius: 20px; padding: 2.5rem; color: #FFFFFF; }
        .tp-fee-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .tp-fee-item:last-child { border-bottom: none; }
        .tp-fee-item-label { font-size: 0.9rem; color: rgba(255,255,255,0.7); }
        .tp-fee-item-sub { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }
        .tp-fee-item-value { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #C6A66B; }
        .tp-earnings-table-wrap { overflow-x: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(14,26,43,0.08); }
        .tp-earnings-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; background: #FFFFFF; }
        .tp-earnings-table th { background: #0E1A2B; color: #FFFFFF; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 1.25rem; text-align: left; }
        .tp-earnings-table td { padding: 0.9rem 1.25rem; border-bottom: 1px solid #E2E8F0; color: #4A5568; }
        .tp-earnings-table td:last-child { font-weight: 600; color: #1A2230; text-align: right; }
        .tp-earnings-table tr.tp-highlight td { background: linear-gradient(90deg, rgba(198,166,107,0.08), rgba(198,166,107,0.04)); color: #0E1A2B; font-weight: 700; font-size: 1rem; }
        .tp-earnings-table tr.tp-highlight td:last-child { color: #C6A66B; font-size: 1.1rem; }
        .tp-earnings-table td[contenteditable="true"] { cursor: text; outline: none; transition: background 0.3s; }
        .tp-earnings-table td[contenteditable="true"]:focus { background: rgba(198,166,107,0.08); outline: 2px solid #C6A66B; outline-offset: -2px; }
        .tp-editable-note { font-size: 0.78rem; color: #718096; margin-top: 0.75rem; display: flex; align-items: center; gap: 0.4rem; }

        .tp-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .tp-service-card { background: #FFFFFF; border-radius: 12px; padding: 1.75rem 1.5rem; text-align: center; box-shadow: 0 2px 8px rgba(14,26,43,0.08); transition: transform 0.3s, box-shadow 0.3s; }
        .tp-service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(14,26,43,0.12); }
        .tp-service-icon { width: 56px; height: 56px; background: linear-gradient(135deg, rgba(198,166,107,0.15), rgba(198,166,107,0.05)); border: 1px solid rgba(198,166,107,0.3); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem; }
        .tp-service-card h4 { font-size: 0.9rem; font-family: 'Inter', sans-serif; font-weight: 600; color: #0E1A2B; line-height: 1.4; }

        .tp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .tp-why-card { background: #FFFFFF; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 8px rgba(14,26,43,0.08); border-left: 3px solid #C6A66B; transition: transform 0.3s, box-shadow 0.3s; }
        .tp-why-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(14,26,43,0.12); }
        .tp-why-icon { font-size: 1.6rem; margin-bottom: 1rem; }
        .tp-why-card h4 { font-size: 1rem; margin-bottom: 0.5rem; color: #0E1A2B; }
        .tp-why-card p { font-size: 0.88rem; line-height: 1.6; }

        .tp-dashboard-features { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 2.5rem; }
        .tp-dashboard-feature { text-align: center; padding: 1.5rem 1rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(198,166,107,0.15); border-radius: 12px; }
        .tp-dashboard-feature .tp-d-icon { font-size: 1.8rem; margin-bottom: 0.75rem; }
        .tp-dashboard-feature p { font-size: 0.82rem; color: rgba(255,255,255,0.65); line-height: 1.4; }

        .tp-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .tp-gallery-item { position: relative; overflow: hidden; border-radius: 12px; cursor: pointer; }
        .tp-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .tp-gallery-item:hover img { transform: scale(1.06); }
        .tp-gallery-item-label { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(14,26,43,0.88), transparent); color: #FFFFFF; font-size: 0.82rem; font-weight: 500; padding: 1.5rem 1rem 0.75rem; opacity: 0; transition: opacity 0.3s; }
        .tp-gallery-item:hover .tp-gallery-item-label { opacity: 1; }
        .tp-gallery-hero { grid-column: span 2; height: 380px; }
        .tp-gallery-tall { height: 380px; }
        .tp-gallery-regular { height: 240px; }

        .tp-cta-section { background: linear-gradient(135deg, #0E1A2B 0%, #1A2D47 50%, #232A33 100%); text-align: center; padding: 6rem 0; position: relative; overflow: hidden; }
        .tp-cta-section::before { content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(198,166,107,0.08) 0%, transparent 70%); border-radius: 50%; }
        .tp-cta-section h2 { color: #FFFFFF; margin-bottom: 1rem; }
        .tp-cta-section p { color: rgba(255,255,255,0.65); max-width: 560px; margin: 0 auto 2.5rem; font-size: 1.05rem; }
        .tp-cta-btn-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        .tp-footer { background: #080F1A; padding: 3rem 0 2rem; }
        .tp-footer-inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 1.5rem; }
        .tp-footer-logo { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.4rem; }
        .tp-footer-logo span { color: #C6A66B; }
        .tp-footer-tagline { font-size: 0.82rem; color: rgba(255,255,255,0.4); }
        .tp-footer-contact p { font-size: 0.85rem; color: rgba(255,255,255,0.45); margin-bottom: 0.4rem; }
        .tp-footer-contact a { color: #C6A66B !important; font-weight: 500; }
        .tp-footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .tp-footer-bottom p { font-size: 0.78rem; color: rgba(255,255,255,0.5); }
        .tp-footer-private { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; background: rgba(198,166,107,0.1); border: 1px solid rgba(198,166,107,0.2); color: #C6A66B; padding: 0.3rem 0.8rem; border-radius: 50px; }

        .tp-fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .tp-visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 900px) {
          .tp-proj-cards, .tp-services-grid, .tp-why-grid { grid-template-columns: repeat(2, 1fr); }
          .tp-dashboard-features { grid-template-columns: repeat(3, 1fr); }
          .tp-earnings-layout { grid-template-columns: 1fr; }
          .tp-market-grid { grid-template-columns: repeat(2, 1fr); }
          .tp-gallery-grid { grid-template-columns: 1fr 1fr; }
          .tp-gallery-hero { grid-column: span 2; }
        }
        @media (max-width: 768px) {
          .tp-prop-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .tp-proj-cards, .tp-services-grid, .tp-why-grid, .tp-earnings-layout { grid-template-columns: 1fr; }
          .tp-dashboard-features { grid-template-columns: repeat(2, 1fr); }
          .tp-market-grid { grid-template-columns: 1fr; }
          .tp-gallery-grid { grid-template-columns: 1fr; }
          .tp-gallery-hero, .tp-gallery-tall { grid-column: span 1; height: 240px; }
          .tp-btn-group, .tp-cta-btn-group { flex-direction: column; }
        }
      `}</style>

      {/* NAV */}
      <nav className="tp-nav" id="tpMainNav">
        <div className="tp-container">
          <div className="tp-nav-inner">
            <a href="/" className="tp-nav-logo">IPM<span>.</span></a>
            <a href="#tp-cta" className="tp-btn tp-btn-primary" style={{fontSize:'0.82rem', padding:'0.6rem 1.4rem'}}>Schedule Consultation</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="tp-hero" id="tp-hero">
        <div className="tp-hero-bg"></div>
        <div className="tp-hero-overlay"></div>
        <div className="tp-container">
          <div className="tp-hero-content">
            <div className="tp-hero-badge">✦ Private Owner Proposal</div>
            <h1>Unlock the Revenue Potential of Your <em>Tampa</em> Waterfront Property</h1>
            <p className="tp-hero-sub">Custom Property Management Proposal for<br/>8817 Audrey Ln – Tampa, Florida</p>
            <p className="tp-hero-desc">
              IPM – International Property Management specializes in professional short-term rental management and revenue optimization. We help property owners like you unlock the full potential of your waterfront investment while handling all operational details.
            </p>
            <div className="tp-btn-group">
              <a href="#tp-revenue" className="tp-btn tp-btn-primary">View Revenue Projection</a>
              <a href="#tp-cta" className="tp-btn tp-btn-outline">Schedule Owner Consultation</a>
            </div>
            <div className="tp-hero-stats">
              <div>
                <div className="tp-hero-stat-value">$70K+</div>
                <div className="tp-hero-stat-label">Est. Annual Revenue</div>
              </div>
              <div>
                <div className="tp-hero-stat-value">72%</div>
                <div className="tp-hero-stat-label">Peak Occupancy Rate</div>
              </div>
              <div>
                <div className="tp-hero-stat-value">$255</div>
                <div className="tp-hero-stat-label">Optimized Nightly Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY OVERVIEW */}
      <section className="tp-section tp-section-white" id="tp-property">
        <div className="tp-container">
          <div className="tp-prop-grid">
            <div className="tp-fade-in">
              <div className="tp-section-label">Your Property</div>
              <h2>8817 Audrey Ln,<br/>Tampa, Florida</h2>
              <div className="tp-gold-divider tp-gold-divider-left"></div>
              <p>
                Your waterfront property in Tampa's Town N Country area represents a premium short-term rental opportunity. Located with canal access and an outdoor deck, this 3-bedroom, 2-bathroom home offers the ideal layout for vacation guests seeking a waterfront experience in the Tampa Bay area.
              </p>
              <p style={{marginTop:'1rem'}}>
                The property benefits from strong demand drivers including proximity to Tampa International Airport, easy beach access, sports tourism, cruise port traffic, and a thriving convention market — all supporting consistent bookings and strong nightly rates year-round.
              </p>
              <div className="tp-prop-features">
                <div className="tp-feature-item"><div className="tp-feature-icon">🛏️</div><span>3 Bedrooms</span></div>
                <div className="tp-feature-item"><div className="tp-feature-icon">🚿</div><span>2 Bathrooms</span></div>
                <div className="tp-feature-item"><div className="tp-feature-icon">📐</div><span>~1,250 Sq Ft</span></div>
                <div className="tp-feature-item"><div className="tp-feature-icon">💧</div><span>Canal Waterfront</span></div>
                <div className="tp-feature-item"><div className="tp-feature-icon">🏡</div><span>Single Family Home</span></div>
                <div className="tp-feature-item"><div className="tp-feature-icon">🌳</div><span>Outdoor Deck</span></div>
              </div>
            </div>
            <div className="tp-fade-in">
              <div className="tp-address-card">
                <div className="tp-a-label">Property Address</div>
                <h3>8817 Audrey Ln</h3>
                <p className="tp-address-city">Tampa, FL 33615</p>
                <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
                  <div>
                    <div style={{fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Market</div>
                    <div style={{color:'#C6A66B', fontWeight:'600', fontSize:'0.95rem'}}>Tampa Bay Area</div>
                  </div>
                  <div>
                    <div style={{fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Type</div>
                    <div style={{color:'#6FCF97', fontWeight:'600', fontSize:'0.95rem'}}>Waterfront Home</div>
                  </div>
                </div>
                <div className="tp-map-wrap">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.0!2d-82.5795!3d28.0045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c2a18e8e8e01%3A0x0!2s8817+Audrey+Ln%2C+Tampa%2C+FL+33615!5e0!3m2!1sen!2sus!4v1700000000001!5m2!1sen!2sus"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="8817 Audrey Ln, Tampa FL map"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="tp-section tp-section-ivory" id="tp-gallery">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Property Gallery</div>
            <h2>8817 Audrey Ln — Waterfront Living</h2>
            <div className="tp-gold-divider"></div>
            <p>A canal-front home capturing the essence of Tampa waterfront living — ideal for guests seeking relaxation, boating access, and proximity to all that the Tampa Bay area has to offer.</p>
          </div>
          <div className="tp-gallery-grid tp-fade-in">
            <div className="tp-gallery-item tp-gallery-hero">
              <img src="/tampa-1-exterior.jpg" alt="Exterior — 8817 Audrey Ln" />
              <div className="tp-gallery-item-label">Exterior</div>
            </div>
            <div className="tp-gallery-item tp-gallery-tall">
              <img src="/tampa-4-living-dining.jpg" alt="Open-plan living, dining & kitchen" />
              <div className="tp-gallery-item-label">Living, Dining & Kitchen</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-2-kitchen1.jpg" alt="Chef's kitchen with marble counters" />
              <div className="tp-gallery-item-label">Chef's Kitchen</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-3-kitchen2.jpg" alt="Kitchen island & marble backsplash" />
              <div className="tp-gallery-item-label">Kitchen Island</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-5-openplan.jpg" alt="Open floor plan — living to kitchen" />
              <div className="tp-gallery-item-label">Open Floor Plan</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-6-kitchen-open.jpg" alt="Kitchen open to living area" />
              <div className="tp-gallery-item-label">Kitchen & Living</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-7-living-doors.jpg" alt="Living area with French doors to yard" />
              <div className="tp-gallery-item-label">Living Room & French Doors</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-8-primary-bed.jpg" alt="Primary bedroom" />
              <div className="tp-gallery-item-label">Primary Bedroom</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-9-bedroom2.jpg" alt="Second bedroom" />
              <div className="tp-gallery-item-label">Bedroom 2</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-10-bath1.jpg" alt="Bathroom with tub and marble tile" />
              <div className="tp-gallery-item-label">Bathroom 1</div>
            </div>
            <div className="tp-gallery-item tp-gallery-regular">
              <img src="/tampa-11-bath2.jpg" alt="Bathroom 2 with marble finishes" />
              <div className="tp-gallery-item-label">Bathroom 2</div>
            </div>
          </div>
          <div style={{marginTop:'0'}}></div>
        </div>
      </section>

      {/* MARKET OPPORTUNITY */}
      <section className="tp-section tp-section-dark" id="tp-market">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Market Intelligence</div>
            <h2 style={{color:'#FFFFFF'}}>The Tampa Short-Term Rental Opportunity</h2>
            <div className="tp-gold-divider"></div>
            <p style={{color:'rgba(255,255,255,0.6)'}}>
              Tampa's short-term rental market is experiencing strong growth, driven by tourism, business travel, sports events, and cruise port traffic. The market offers excellent revenue potential for well-managed waterfront properties like yours.
            </p>
          </div>
          <div className="tp-market-grid tp-fade-in">
            <div className="tp-market-card">
              <div className="tp-m-value">$150–$190</div>
              <div className="tp-m-desc">Average nightly rate for comparable Tampa properties</div>
            </div>
            <div className="tp-market-card">
              <div className="tp-m-value">60–68%</div>
              <div className="tp-m-desc">Average occupancy rate for well-managed STR properties</div>
            </div>
            <div className="tp-market-card">
              <div className="tp-m-value">$28K–$39K</div>
              <div className="tp-m-desc">Average annual revenue for comparable Tampa homes</div>
            </div>
            <div className="tp-market-card">
              <div className="tp-m-value">47M+</div>
              <div className="tp-m-desc">Annual passengers through Tampa International Airport</div>
            </div>
            <div className="tp-market-card">
              <div className="tp-m-value">4.5M+</div>
              <div className="tp-m-desc">Annual cruise passengers from Port of Tampa</div>
            </div>
            <div className="tp-market-card">
              <div className="tp-m-value">Top 20</div>
              <div className="tp-m-desc">Tampa ranked among top U.S. cities for STR growth</div>
            </div>
          </div>
          <div className="tp-chart-box tp-fade-in">
            <div className="tp-chart-title">Tampa Market: Nightly Rates by Property Size</div>
            <canvas ref={nightlyChartRef} height="280"></canvas>
          </div>
          <div style={{marginTop:'2.5rem', maxWidth:'700px', marginLeft:'auto', marginRight:'auto'}} className="tp-fade-in">
            <p style={{color:'rgba(255,255,255,0.55)', fontSize:'0.88rem', textAlign:'center'}}>
              Key demand drivers include Tampa International Airport proximity, cruise port tourism, beaches and boating, sports events (Raymond James Stadium), conventions and business travel, and the growing Ybor City entertainment district — creating year-round booking opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* REVENUE PROJECTIONS */}
      <section className="tp-section tp-section-ivory" id="tp-revenue">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Financial Projections</div>
            <h2>Revenue Projection for 8817 Audrey Ln</h2>
            <div className="tp-gold-divider"></div>
            <p>Based on comparable short-term rental performance in the Tampa waterfront market, we have modeled three realistic revenue scenarios for your property, reflecting current market conditions and IPM's dynamic pricing approach.</p>
          </div>
          <div className="tp-proj-cards tp-fade-in">
            <div className={`tp-proj-card tp-conservative${selectedTier === 'conservative' ? ' tp-selected' : ''}`} onClick={() => setSelectedTier('conservative')}>
              <div className="tp-proj-badge">Conservative</div>
              <div className="tp-proj-nightly">$165</div>
              <div className="tp-proj-label">Estimated Nightly Rate</div>
              <div className="tp-proj-rows">
                <div className="tp-proj-row"><span className="tp-proj-row-label">Occupancy Rate</span><span className="tp-proj-row-value">~55%</span></div>
                <div className="tp-proj-row"><span className="tp-proj-row-label">Booked Nights / Month</span><span className="tp-proj-row-value">16–17 nights</span></div>
                <div className="tp-proj-row"><span className="tp-proj-row-label">Monthly Gross Revenue</span><span className="tp-proj-row-value">$2,700–$3,000</span></div>
              </div>
              <div className="tp-proj-annual">
                <div className="tp-proj-annual-value">$32K–$36K</div>
                <div className="tp-proj-annual-label">Estimated Annual Gross Revenue</div>
              </div>
            </div>
            <div className={`tp-proj-card tp-strong${selectedTier === 'strong' ? ' tp-selected' : ''}`} onClick={() => setSelectedTier('strong')}>
              <div className="tp-popular-badge">Most Likely</div>
              <div className="tp-proj-badge">Strong Performance</div>
              <div className="tp-proj-nightly">$210</div>
              <div className="tp-proj-label">Estimated Nightly Rate</div>
              <div className="tp-proj-rows">
                <div className="tp-proj-row"><span className="tp-proj-row-label">Occupancy Rate</span><span className="tp-proj-row-value">~65%</span></div>
                <div className="tp-proj-row"><span className="tp-proj-row-label">Booked Nights / Month</span><span className="tp-proj-row-value">19–20 nights</span></div>
                <div className="tp-proj-row"><span className="tp-proj-row-label">Monthly Gross Revenue</span><span className="tp-proj-row-value">$4,000–$4,300</span></div>
              </div>
              <div className="tp-proj-annual">
                <div className="tp-proj-annual-value">$48K–$52K</div>
                <div className="tp-proj-annual-label">Estimated Annual Gross Revenue</div>
              </div>
            </div>
            <div className={`tp-proj-card tp-premium${selectedTier === 'premium' ? ' tp-selected' : ''}`} onClick={() => setSelectedTier('premium')}>
              <div className="tp-proj-badge">Premium Optimized</div>
              <div className="tp-proj-nightly">$255</div>
              <div className="tp-proj-label">Estimated Nightly Rate</div>
              <div className="tp-proj-rows">
                <div className="tp-proj-row"><span className="tp-proj-row-label">Occupancy Rate</span><span className="tp-proj-row-value">~72%</span></div>
                <div className="tp-proj-row"><span className="tp-proj-row-label">Booked Nights / Month</span><span className="tp-proj-row-value">21–22 nights</span></div>
                <div className="tp-proj-row"><span className="tp-proj-row-label">Monthly Gross Revenue</span><span className="tp-proj-row-value">$5,300–$5,900</span></div>
              </div>
              <div className="tp-proj-annual">
                <div className="tp-proj-annual-value">$63K–$70K</div>
                <div className="tp-proj-annual-label">Estimated Annual Gross Revenue</div>
              </div>
            </div>
          </div>
          <div className="tp-chart-box-light tp-fade-in">
            <div className="tp-chart-title tp-chart-title-dark">Annual Revenue Comparison — Three Scenarios</div>
            <canvas ref={revenueChartRef} height="260"></canvas>
          </div>
          <div className="tp-disclaimer tp-fade-in">
            <strong>Disclaimer:</strong> Revenue projections are estimates based on market data and comparable Tampa listings. Actual performance depends on property condition, amenities, pricing strategy, seasonality, and guest demand.
          </div>
        </div>
      </section>

      {/* OWNER EARNINGS */}
      <section className="tp-section tp-section-white" id="tp-earnings">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Owner Economics</div>
            <h2>Your Estimated Owner Earnings</h2>
            <div className="tp-gold-divider"></div>
            <p>IPM's pricing model is built around transparency and alignment with owner success. Our fee structure is straightforward — a low monthly platform fee plus a performance-based management fee calculated on net profit, not gross revenue.</p>
          </div>
          <div className="tp-earnings-layout tp-fade-in">
            <div>
              <div className="tp-fee-structure">
                <div className="tp-section-label" style={{color:'#C6A66B'}}>IPM Fee Structure</div>
                <h3 style={{color:'#FFFFFF', marginBottom:'1.5rem'}}>Simple. Transparent. Aligned.</h3>
                <div className="tp-fee-item">
                  <div>
                    <div className="tp-fee-item-label">Monthly Platform &amp; Software Fee</div>
                    <div className="tp-fee-item-sub">Flat monthly fee regardless of bookings</div>
                  </div>
                  <div className="tp-fee-item-value">$200/mo</div>
                </div>
                <div className="tp-fee-item">
                  <div>
                    <div className="tp-fee-item-label">Management Fee</div>
                    <div className="tp-fee-item-sub">Applied to net profit after platform commissions</div>
                  </div>
                  <div className="tp-fee-item-value">20%</div>
                </div>
                <div style={{marginTop:'1.5rem', padding:'1rem', background:'rgba(198,166,107,0.1)', borderRadius:'8px', border:'1px solid rgba(198,166,107,0.2)'}}>
                  <p style={{fontSize:'0.82rem', color:'rgba(255,255,255,0.6)', lineHeight:'1.6'}}>
                    <strong style={{color:'#C6A66B'}}>Net Profit Definition:</strong> Revenue after platform commissions (e.g., Airbnb, Booking.com). IPM's management fee is never applied to gross revenue — only to what you actually earn.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div style={{marginBottom:'1rem'}}>
                <div className="tp-section-label">Sample Calculation</div>
                <h3 style={{marginBottom:'0.5rem'}}>{TIERS[selectedTier].label}</h3>
                <p style={{fontSize:'0.88rem'}}>Based on {fmt(TIERS[selectedTier].gross)} monthly gross booking revenue. Click a scenario above to compare.</p>
              </div>
              <div className="tp-earnings-table-wrap">
                <table className="tp-earnings-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th style={{textAlign:'right'}}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monthly Gross Booking Revenue</td>
                      <td>{fmt(TIERS[selectedTier].gross)}</td>
                    </tr>
                    <tr>
                      <td>Platform Commission (est. 15%)</td>
                      <td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].commission)}</td>
                    </tr>
                    <tr>
                      <td><strong>Net Booking Revenue</strong></td>
                      <td><strong>{fmt(TIERS[selectedTier].net)}</strong></td>
                    </tr>
                    <tr>
                      <td>IPM Management Fee (20% of Net)</td>
                      <td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].mgmtFee)}</td>
                    </tr>
                    <tr>
                      <td>Monthly Platform / Software Fee</td>
                      <td style={{color:'#E53E3E'}}>– {fmt(TIERS[selectedTier].platformFee)}</td>
                    </tr>
                    <tr className="tp-highlight">
                      <td><strong>Estimated Owner Payout</strong><br/><span style={{fontSize:'0.75rem', fontWeight:'400', color:'#718096'}}>Before taxes &amp; maintenance reserve</span></td>
                      <td><strong>{fmt(TIERS[selectedTier].payout)}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tp-editable-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Click any projection card above to update this breakdown instantly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="tp-section tp-section-ivory" id="tp-services">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Full-Service Management</div>
            <h2>What IPM Handles for You</h2>
            <div className="tp-gold-divider"></div>
            <p>From the moment your listing goes live to the day your guest checks out, IPM manages every detail — so you never have to. Owners enjoy a completely hands-off management experience while IPM handles all operational aspects.</p>
          </div>
          <div className="tp-services-grid tp-fade-in">
            {[
              ['📸', 'Listing Creation & Optimization'],
              ['🎨', 'Professional Photography Coordination'],
              ['📊', 'Dynamic Pricing Strategy'],
              ['💬', 'Guest Messaging & Booking Management'],
              ['🧹', 'Housekeeping & Turnover Coordination'],
              ['🔑', 'Keyless Check-In System Setup'],
              ['🛠️', 'Maintenance Coordination'],
              ['⭐', 'Review Management & Guest Experience'],
              ['📈', 'Multi-Platform Distribution'],
              ['📋', 'Monthly Owner Reporting'],
              ['💰', 'Revenue & Payout Management'],
              ['🌐', 'Airbnb, VRBO & Booking.com Management'],
            ].map(([icon, label]) => (
              <div className="tp-service-card" key={label}>
                <div className="tp-service-icon">{icon}</div>
                <h4>{label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IPM */}
      <section className="tp-section tp-section-white" id="tp-why">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Why Choose IPM</div>
            <h2>The IPM Advantage</h2>
            <div className="tp-gold-divider"></div>
            <p>We combine international luxury hospitality standards with deep local market knowledge to deliver results that generic property managers simply can't match.</p>
          </div>
          <div className="tp-why-grid tp-fade-in">
            {[
              ['🌍', 'International Expertise', 'Operating across Playa del Carmen, Tulum, Lake Norman, Charlotte, and Tampa — we bring a global network and hospitality-first mindset to every property.'],
              ['📊', 'Data-Driven Pricing', 'Our dynamic pricing engine monitors market demand daily to ensure your property is always priced to maximize revenue without sacrificing occupancy.'],
              ['🔒', 'Owner Protection First', 'Your property is protected with thorough guest screening, security deposit management, and proactive maintenance monitoring.'],
              ['💎', 'Luxury Guest Standards', 'Every guest communication, check-in experience, and turnover meets 5-star hospitality standards that drive repeat bookings and 5-star reviews.'],
              ['📱', 'Real-Time Transparency', 'Log in anytime to view your booking calendar, revenue reports, payout history, and maintenance logs — full visibility, always.'],
              ['🤝', 'Aligned Incentives', 'We earn more when you earn more. Our performance-based fee structure ensures our interests are perfectly aligned with yours.'],
            ].map(([icon, title, desc]) => (
              <div className="tp-why-card" key={title}>
                <div className="tp-why-icon">{icon}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER DASHBOARD */}
      <section className="tp-section tp-section-dark" id="tp-dashboard">
        <div className="tp-container">
          <div className="tp-section-header tp-fade-in">
            <div className="tp-section-label">Owner Portal</div>
            <h2 style={{color:'#FFFFFF'}}>Your Property at a Glance</h2>
            <div className="tp-gold-divider"></div>
            <p style={{color:'rgba(255,255,255,0.6)'}}>As an IPM owner, you get access to a dedicated dashboard giving you complete visibility into your property's performance, bookings, and financials — from anywhere in the world.</p>
          </div>
          <div className="tp-dashboard-features tp-fade-in">
            {[
              ['📅', 'Live Booking Calendar'],
              ['💵', 'Revenue & Payout Tracking'],
              ['⭐', 'Guest Reviews Dashboard'],
              ['🛠️', 'Maintenance Log'],
              ['📊', 'Occupancy Analytics'],
            ].map(([icon, label]) => (
              <div className="tp-dashboard-feature" key={label}>
                <div className="tp-d-icon">{icon}</div>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tp-cta-section" id="tp-cta">
        <div className="tp-container" style={{position:'relative', zIndex:2}}>
          <div className="tp-section-label" style={{color:'#C6A66B', textAlign:'center'}}>Ready to Get Started?</div>
          <h2>Let's Maximize Your Tampa Property's Potential</h2>
          <p>Schedule a no-obligation owner consultation. We'll walk you through the onboarding process, answer your questions, and show you exactly how IPM turns your property into a high-performing short-term rental.</p>
          <div className="tp-cta-btn-group">
            <a href="https://calendly.com/ipmvacationrentals/30min" target="_blank" rel="noopener noreferrer" className="tp-btn tp-btn-primary">Schedule Your Free Consultation</a>
            <a href="/" className="tp-btn tp-btn-outline">Learn More About IPM</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tp-footer">
        <div className="tp-container">
          <div className="tp-footer-inner">
            <div>
              <div className="tp-footer-logo">IPM<span>.</span></div>
              <div className="tp-footer-tagline">International Property Management</div>
            </div>
            <div className="tp-footer-contact">
              <p>This is a private proposal prepared exclusively for the owner of 8817 Audrey Ln, Tampa, FL.</p>
              <p>Questions? Reach us at <a href="mailto:info@ipm.services">info@ipm.services</a></p>
            </div>
            <div>
              <span className="tp-footer-private">🔒 Confidential &amp; Private</span>
            </div>
          </div>
          <div className="tp-footer-bottom">
            <p>© {new Date().getFullYear()} IPM – International Property Management. All rights reserved.</p>
            <p>Prepared exclusively for: 8817 Audrey Ln, Tampa, FL 33615</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TampaProposal;
