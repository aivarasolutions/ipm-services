import { useEffect, useRef } from 'react';

const CharlotteProposal = () => {
  const nightlyChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  const nightlyChartInstance = useRef(null);
  const revenueChartInstance = useRef(null);

  useEffect(() => {
    document.title = 'Owner Proposal – 5048 Downhaul Dr, Charlotte | IPM';

    // Inject Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Chart.js dynamically
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
              data: [110, 155, 210, 285, 380],
              backgroundColor: [
                'rgba(198,166,107,0.5)',
                'rgba(198,166,107,0.6)',
                'rgba(198,166,107,0.8)',
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
              { label: 'Annual Revenue Low ($)', data: [32000, 48000, 67000], backgroundColor: 'rgba(139,163,192,0.55)', borderColor: 'rgba(139,163,192,0.9)', borderWidth: 1, borderRadius: 6 },
              { label: 'Annual Revenue High ($)', data: [35000, 52000, 72000], backgroundColor: 'rgba(198,166,107,0.75)', borderColor: 'rgba(198,166,107,1)', borderWidth: 1, borderRadius: 6 }
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

    // Intersection Observer scroll animations
    const fadeEls = document.querySelectorAll('.cp-fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('cp-visible');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));

    // Nav scroll effect
    const nav = document.getElementById('cpMainNav');
    const handleScroll = () => {
      if (nav) nav.classList.toggle('cp-nav-scrolled', window.scrollY > 60);
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
    <>
      <style>{`
        .cp-wrap { font-family: 'Inter', sans-serif; background-color: #F8F7F4; color: #1A2230; line-height: 1.7; -webkit-font-smoothing: antialiased; }
        .cp-wrap *, .cp-wrap *::before, .cp-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .cp-wrap a { color: inherit; text-decoration: none; }
        .cp-wrap img { max-width: 100%; height: auto; display: block; }
        .cp-wrap h1, .cp-wrap h2, .cp-wrap h3, .cp-wrap h4 { font-family: 'Playfair Display', Georgia, serif; line-height: 1.25; color: #0E1A2B; }
        .cp-wrap h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; }
        .cp-wrap h2 { font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 600; }
        .cp-wrap h3 { font-size: clamp(1.2rem, 2.5vw, 1.6rem); font-weight: 600; }
        .cp-wrap h4 { font-size: 1.1rem; font-weight: 600; }
        .cp-wrap p { color: #4A5568; font-size: 1rem; line-height: 1.8; }
        .cp-container { max-width: 1160px; margin: 0 auto; padding: 0 1.5rem; }
        .cp-section { padding: 5rem 0; }
        .cp-section-dark { background-color: #0E1A2B; }
        .cp-section-slate { background-color: #232A33; }
        .cp-section-ivory { background-color: #F8F7F4; }
        .cp-section-white { background-color: #FFFFFF; }
        .cp-section-header { text-align: center; max-width: 700px; margin: 0 auto 3.5rem; }
        .cp-section-header h2 { margin-bottom: 1rem; }
        .cp-section-header p { font-size: 1.05rem; }
        .cp-section-label { font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #C6A66B; margin-bottom: 0.75rem; }
        .cp-gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg, #C6A66B, #D9BC8A); border-radius: 2px; margin: 1.25rem auto; }
        .cp-gold-divider-left { margin-left: 0; }
        .cp-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.85rem 2rem; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.04em; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border: 2px solid transparent; white-space: nowrap; text-decoration: none; }
        .cp-btn-primary { background-color: #C6A66B; color: #0E1A2B !important; border-color: #C6A66B; }
        .cp-btn-primary:hover { background-color: #D9BC8A; border-color: #D9BC8A; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(198,166,107,0.35); }
        .cp-btn-outline { background-color: transparent; color: #FFFFFF !important; border-color: rgba(255,255,255,0.6); }
        .cp-btn-outline:hover { background-color: rgba(255,255,255,0.1); border-color: #FFFFFF; transform: translateY(-2px); }
        .cp-btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }
        .cp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1.25rem 0; transition: background 0.3s, padding 0.3s, box-shadow 0.3s; }
        .cp-nav-scrolled { background: rgba(14,26,43,0.97); padding: 0.75rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
        .cp-nav-inner { display: flex; align-items: center; justify-content: space-between; }
        .cp-nav-logo { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #FFFFFF; letter-spacing: 0.05em; }
        .cp-nav-logo span { color: #C6A66B; }
        .cp-hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; background-color: #0E1A2B; }
        .cp-hero-bg { position: absolute; inset: 0; background-image: url('/charlotte-hero-bg.jpg'); background-size: cover; background-position: center; opacity: 0.25; }
        .cp-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(14,26,43,0.92) 0%, rgba(14,26,43,0.75) 50%, rgba(35,42,51,0.85) 100%); }
        .cp-hero-content { position: relative; z-index: 2; max-width: 800px; padding: 8rem 0 5rem; }
        .cp-hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(198,166,107,0.15); border: 1px solid rgba(198,166,107,0.4); border-radius: 50px; padding: 0.4rem 1rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #C6A66B; margin-bottom: 1.5rem; }
        .cp-hero h1 { color: #FFFFFF; margin-bottom: 1.25rem; }
        .cp-hero-sub { font-size: 1.15rem; color: rgba(255,255,255,0.85) !important; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; font-style: italic; }
        .cp-hero-desc { font-size: 1rem; color: rgba(255,255,255,0.8) !important; max-width: 580px; margin-bottom: 2.5rem; line-height: 1.8; }
        .cp-hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.12); flex-wrap: wrap; }
        .cp-hero-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #C6A66B; }
        .cp-hero-stat-label { font-size: 0.78rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.2rem; }
        .cp-prop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .cp-address-card { background: #0E1A2B; border-radius: 20px; padding: 2.5rem; color: #FFFFFF; position: relative; overflow: hidden; }
        .cp-address-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(198,166,107,0.15) 0%, transparent 70%); border-radius: 50%; }
        .cp-address-label { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: #C6A66B; font-weight: 600; margin-bottom: 0.5rem; }
        .cp-address-card h3 { color: #FFFFFF; font-size: 1.5rem; margin-bottom: 0.25rem; }
        .cp-address-city { color: rgba(255,255,255,0.6); font-size: 1rem; margin-bottom: 1.5rem; }
        .cp-map-placeholder { background: #232A33; border-radius: 12px; height: 200px; margin-top: 1.5rem; overflow: hidden; }
        .cp-map-placeholder iframe { width: 100%; height: 100%; border: none; }
        .cp-demand-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1.5rem; }
        .cp-demand-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: #4A5568; }
        .cp-demand-icon { width: 32px; height: 32px; background: linear-gradient(135deg, rgba(198,166,107,0.15), rgba(198,166,107,0.05)); border: 1px solid rgba(198,166,107,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; flex-shrink: 0; }
        .cp-market-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .cp-market-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(198,166,107,0.2); border-radius: 12px; padding: 1.75rem; text-align: center; }
        .cp-market-value { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #C6A66B; line-height: 1; margin-bottom: 0.5rem; }
        .cp-market-desc { font-size: 0.85rem; color: rgba(255,255,255,0.6); line-height: 1.5; }
        .cp-chart-container { background: rgba(255,255,255,0.04); border: 1px solid rgba(198,166,107,0.15); border-radius: 20px; padding: 2rem; max-width: 700px; margin: 0 auto; }
        .cp-chart-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #FFFFFF; text-align: center; margin-bottom: 1.5rem; }
        .cp-proj-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .cp-proj-card { background: #FFFFFF; border-radius: 20px; padding: 2rem; box-shadow: 0 2px 8px rgba(14,26,43,0.08); border-top: 4px solid transparent; transition: transform 0.3s, box-shadow 0.3s; position: relative; }
        .cp-proj-card:hover { transform: translateY(-6px); box-shadow: 0 8px 32px rgba(14,26,43,0.12); }
        .cp-proj-conservative { border-top-color: #8BA3C0; }
        .cp-proj-strong { border-top-color: #C6A66B; background: #0E1A2B; }
        .cp-proj-premium { border-top-color: #2D6A4F; }
        .cp-proj-badge { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: 50px; margin-bottom: 1rem; }
        .cp-proj-conservative .cp-proj-badge { background: rgba(139,163,192,0.15); color: #5A7A9A; }
        .cp-proj-strong .cp-proj-badge { background: rgba(198,166,107,0.2); color: #C6A66B; }
        .cp-proj-premium .cp-proj-badge { background: rgba(45,106,79,0.12); color: #2D6A4F; }
        .cp-proj-nightly { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 700; color: #0E1A2B; line-height: 1; margin-bottom: 0.25rem; }
        .cp-proj-strong .cp-proj-nightly { color: #C6A66B; }
        .cp-proj-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.1em; color: #718096; margin-bottom: 1.5rem; }
        .cp-proj-strong .cp-proj-label, .cp-proj-strong h3 { color: #FFFFFF; }
        .cp-proj-rows { border-top: 1px solid #E2E8F0; padding-top: 1.25rem; }
        .cp-proj-strong .cp-proj-rows { border-top-color: rgba(255,255,255,0.1); }
        .cp-proj-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.88rem; }
        .cp-proj-row-label { color: #718096; }
        .cp-proj-strong .cp-proj-row-label { color: rgba(255,255,255,0.65); }
        .cp-proj-row-value { font-weight: 600; color: #1A2230; }
        .cp-proj-strong .cp-proj-row-value { color: #FFFFFF; }
        .cp-proj-annual { background: linear-gradient(135deg, rgba(198,166,107,0.12), rgba(198,166,107,0.05)); border: 1px solid rgba(198,166,107,0.3); border-radius: 8px; padding: 1rem; margin-top: 1.25rem; text-align: center; }
        .cp-proj-annual-value { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #C6A66B; }
        .cp-proj-annual-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #718096; margin-top: 0.2rem; }
        .cp-popular-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #C6A66B; color: #0E1A2B; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 1rem; border-radius: 50px; white-space: nowrap; }
        .cp-disclaimer { background: rgba(198,166,107,0.06); border-left: 3px solid #C6A66B; border-radius: 0 8px 8px 0; padding: 1rem 1.5rem; font-size: 0.82rem; color: #718096; margin-top: 2rem; line-height: 1.6; }
        .cp-earnings-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 3rem; align-items: start; }
        .cp-fee-structure { background: #0E1A2B; border-radius: 20px; padding: 2.5rem; color: #FFFFFF; }
        .cp-fee-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cp-fee-item:last-child { border-bottom: none; }
        .cp-fee-item-label { font-size: 0.9rem; color: rgba(255,255,255,0.7); }
        .cp-fee-item-sublabel { font-size: 0.78rem; color: rgba(255,255,255,0.4); margin-top: 0.2rem; }
        .cp-fee-item-value { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #C6A66B; }
        .cp-earnings-table-wrap { overflow-x: auto; border-radius: 12px; box-shadow: 0 2px 8px rgba(14,26,43,0.08); }
        .cp-earnings-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; background: #FFFFFF; }
        .cp-earnings-table th { background: #0E1A2B; color: #FFFFFF; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 1.25rem; text-align: left; }
        .cp-earnings-table td { padding: 0.9rem 1.25rem; border-bottom: 1px solid #E2E8F0; color: #4A5568; }
        .cp-earnings-table td:last-child { font-weight: 600; color: #1A2230; text-align: right; }
        .cp-earnings-table tr.cp-highlight td { background: linear-gradient(90deg, rgba(198,166,107,0.08), rgba(198,166,107,0.04)); color: #0E1A2B; font-weight: 700; font-size: 1rem; }
        .cp-earnings-table tr.cp-highlight td:last-child { color: #C6A66B; font-size: 1.1rem; }
        .cp-editable-note { font-size: 0.78rem; color: #718096; margin-top: 0.75rem; display: flex; align-items: center; gap: 0.4rem; }
        .cp-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .cp-service-card { background: #FFFFFF; border-radius: 12px; padding: 1.75rem 1.5rem; text-align: center; box-shadow: 0 2px 8px rgba(14,26,43,0.08); transition: transform 0.3s, box-shadow 0.3s; }
        .cp-service-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(14,26,43,0.12); }
        .cp-service-icon { width: 56px; height: 56px; background: linear-gradient(135deg, rgba(198,166,107,0.15), rgba(198,166,107,0.05)); border: 1px solid rgba(198,166,107,0.3); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem; }
        .cp-service-card h4 { font-size: 0.9rem; font-family: 'Inter', sans-serif; font-weight: 600; color: #0E1A2B; line-height: 1.4; }
        .cp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .cp-why-card { background: #FFFFFF; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 8px rgba(14,26,43,0.08); border-left: 3px solid #C6A66B; transition: transform 0.3s, box-shadow 0.3s; }
        .cp-why-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(14,26,43,0.12); }
        .cp-why-card-icon { font-size: 1.6rem; margin-bottom: 1rem; }
        .cp-why-card h4 { font-size: 1rem; margin-bottom: 0.5rem; color: #0E1A2B; font-family: 'Playfair Display', serif; }
        .cp-why-card p { font-size: 0.88rem; line-height: 1.6; }
        .cp-dashboard-features { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 2.5rem; }
        .cp-dashboard-feature { text-align: center; padding: 1.5rem 1rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(198,166,107,0.15); border-radius: 12px; }
        .cp-dashboard-feature .cp-icon { font-size: 1.8rem; margin-bottom: 0.75rem; }
        .cp-dashboard-feature p { font-size: 0.82rem; color: rgba(255,255,255,0.65); line-height: 1.4; }
        .cp-gallery-section { background: #FFFFFF; }
        .cp-gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .cp-gallery-item { border-radius: 10px; overflow: hidden; position: relative; cursor: pointer; }
        .cp-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
        .cp-gallery-item:hover img { transform: scale(1.04); }
        .cp-gallery-item-label { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(14,26,43,0.75)); color: #FFFFFF; font-size: 0.78rem; font-weight: 500; padding: 1.5rem 0.85rem 0.65rem; opacity: 0; transition: opacity 0.3s ease; }
        .cp-gallery-item:hover .cp-gallery-item-label { opacity: 1; }
        .cp-gallery-hero { grid-column: span 2; height: 340px; }
        .cp-gallery-tall { height: 340px; }
        .cp-gallery-regular { height: 220px; }
        .cp-cta-section { background: linear-gradient(135deg, #0E1A2B 0%, #1A2D47 50%, #232A33 100%); text-align: center; padding: 6rem 0; position: relative; overflow: hidden; }
        .cp-cta-section::before { content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(198,166,107,0.08) 0%, transparent 70%); border-radius: 50%; }
        .cp-cta-section h2 { color: #FFFFFF; margin-bottom: 1rem; }
        .cp-cta-section > .cp-container > .cp-fade-in > p { color: rgba(255,255,255,0.65); max-width: 560px; margin: 0 auto 2.5rem; font-size: 1.05rem; }
        .cp-cta-btn-group { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .cp-footer { background: #080F1A; padding: 3rem 0 2rem; color: rgba(255,255,255,0.5); }
        .cp-footer-inner { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 1.5rem; }
        .cp-footer-logo { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.4rem; }
        .cp-footer-logo span { color: #C6A66B; }
        .cp-footer-tagline { font-size: 0.82rem; color: rgba(255,255,255,0.4); }
        .cp-footer-contact p { font-size: 0.85rem; color: rgba(255,255,255,0.45); margin-bottom: 0.4rem; }
        .cp-footer-contact a { color: #C6A66B; font-weight: 500; }
        .cp-footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .cp-footer-bottom p { font-size: 0.78rem; }
        .cp-footer-private { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.72rem; background: rgba(198,166,107,0.1); border: 1px solid rgba(198,166,107,0.2); color: #C6A66B; padding: 0.3rem 0.8rem; border-radius: 50px; }
        .cp-fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .cp-visible { opacity: 1; transform: translateY(0); }
        .cp-delay-1 { transition-delay: 0.1s; }
        .cp-delay-2 { transition-delay: 0.2s; }
        .cp-delay-3 { transition-delay: 0.3s; }
        @media (max-width: 900px) {
          .cp-proj-cards, .cp-services-grid, .cp-why-grid { grid-template-columns: repeat(2, 1fr); }
          .cp-dashboard-features { grid-template-columns: repeat(3, 1fr); }
          .cp-earnings-layout { grid-template-columns: 1fr; }
          .cp-gallery-grid { grid-template-columns: 1fr 1fr; }
          .cp-gallery-hero { grid-column: span 2; }
          .cp-market-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .cp-prop-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .cp-hero-content { padding: 7rem 0 4rem; }
          .cp-hero-stats { gap: 1.5rem; }
          .cp-section { padding: 3.5rem 0; }
        }
        @media (max-width: 600px) {
          .cp-proj-cards, .cp-services-grid, .cp-why-grid, .cp-earnings-layout { grid-template-columns: 1fr; }
          .cp-dashboard-features { grid-template-columns: repeat(2, 1fr); }
          .cp-gallery-grid { grid-template-columns: 1fr; }
          .cp-gallery-hero, .cp-gallery-tall { grid-column: span 1; height: 240px; }
          .cp-market-grid { grid-template-columns: 1fr; }
          .cp-btn-group, .cp-cta-btn-group { flex-direction: column; }
        }
      `}</style>

      <div className="cp-wrap">
        {/* NAV */}
        <nav className="cp-nav" id="cpMainNav">
          <div className="cp-container">
            <div className="cp-nav-inner">
              <div className="cp-nav-logo">IPM<span>.</span></div>
              <a href="#cp-cta" className="cp-btn cp-btn-primary" style={{fontSize:'0.82rem', padding:'0.6rem 1.4rem'}}>Schedule Consultation</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="cp-hero" id="cp-hero">
          <div className="cp-hero-bg"></div>
          <div className="cp-hero-overlay"></div>
          <div className="cp-container">
            <div className="cp-hero-content">
              <div className="cp-hero-badge">✦ Private Owner Proposal</div>
              <h1>Maximize the Revenue Potential of Your <span style={{color:'#C6A66B'}}>Charlotte</span> Property</h1>
              <p className="cp-hero-sub">Custom Property Management Proposal for<br/>5048 Downhaul Dr – Charlotte, NC</p>
              <p className="cp-hero-desc">
                IPM – International Property Management specializes in professional short-term rental management, helping property owners like you maximize revenue while protecting your most valuable asset. This proposal was prepared exclusively for your property.
              </p>
              <div className="cp-btn-group">
                <a href="#cp-revenue" className="cp-btn cp-btn-primary">View Revenue Projection</a>
                <a href="#cp-cta" className="cp-btn cp-btn-outline">Schedule Owner Consultation</a>
              </div>
              <div className="cp-hero-stats">
                <div>
                  <div className="cp-hero-stat-value">$67K+</div>
                  <div className="cp-hero-stat-label">Est. Annual Revenue</div>
                </div>
                <div>
                  <div className="cp-hero-stat-value">72%</div>
                  <div className="cp-hero-stat-label">Peak Occupancy Rate</div>
                </div>
                <div>
                  <div className="cp-hero-stat-value">$265</div>
                  <div className="cp-hero-stat-label">Optimized Nightly Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY OVERVIEW */}
        <section className="cp-section cp-section-white" id="cp-property">
          <div className="cp-container">
            <div className="cp-prop-grid">
              <div className="cp-fade-in">
                <div className="cp-section-label">Your Property</div>
                <h2>5048 Downhaul Dr,<br/>Charlotte, NC</h2>
                <div className="cp-gold-divider cp-gold-divider-left"></div>
                <p>Your property sits within one of Charlotte's most strategically positioned residential corridors, benefiting from the city's robust and growing demand for short-term accommodations. Charlotte consistently ranks among the top-performing secondary markets for short-term rental investment, driven by a diverse mix of demand sources that sustain high occupancy throughout the year.</p>
                <p style={{marginTop:'1rem'}}>From corporate travelers and convention attendees to sports fans and weekend visitors, the demand profile for this location supports strong nightly rates and consistent bookings across all seasons.</p>
                <div className="cp-demand-grid" style={{marginTop:'1.75rem'}}>
                  {[['✈️','Airport Proximity'],['💼','Business Travel'],['🏈','Sports Events'],['🎪','Conventions'],['🏙️','Weekend Tourism'],['🏢','Corporate Relocations']].map(([icon, label]) => (
                    <div className="cp-demand-item" key={label}>
                      <div className="cp-demand-icon">{icon}</div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cp-fade-in cp-delay-2">
                <div className="cp-address-card">
                  <div className="cp-address-label">Property Address</div>
                  <h3>5048 Downhaul Dr</h3>
                  <p className="cp-address-city">Charlotte, NC 28214</p>
                  <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
                    <div>
                      <div style={{fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.1em'}}>Market</div>
                      <div style={{color:'#C6A66B', fontWeight:'600', fontSize:'0.95rem'}}>Charlotte Metro</div>
                    </div>
                    <div>
                      <div style={{fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.1em'}}>STR Status</div>
                      <div style={{color:'#6FCF97', fontWeight:'600', fontSize:'0.95rem'}}>Active Market</div>
                    </div>
                  </div>
                  <div className="cp-map-placeholder">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.2!2d-80.9799!3d35.2271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bf43d164!2s5048%20Downhaul%20Dr%2C%20Charlotte%2C%20NC%2028214!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Property location map"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section className="cp-section cp-section-ivory cp-gallery-section" id="cp-gallery">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">Property Gallery</div>
              <h2>5048 Downhaul Dr — Inside & Out</h2>
              <div className="cp-gold-divider"></div>
              <p>A spacious two-story home featuring an open-concept main floor, modern kitchen with granite countertops, multiple bedrooms, and generous living spaces — ready to welcome guests from day one.</p>
            </div>
            <div className="cp-gallery-grid cp-fade-in">
              <div className="cp-gallery-item cp-gallery-hero">
                <img src="/charlotte-1-exterior.jpg" alt="Exterior — 5048 Downhaul Dr" />
                <div className="cp-gallery-item-label">Exterior</div>
              </div>
              <div className="cp-gallery-item cp-gallery-tall">
                <img src="/charlotte-5-kitchen.jpg" alt="Kitchen" />
                <div className="cp-gallery-item-label">Kitchen</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-3-living.jpg" alt="Living Room" />
                <div className="cp-gallery-item-label">Living Room</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-9-openplan.jpg" alt="Open Floor Plan" />
                <div className="cp-gallery-item-label">Open Floor Plan</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-11-kitchen2.jpg" alt="Kitchen & Living Area" />
                <div className="cp-gallery-item-label">Kitchen & Living</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-4-dining.jpg" alt="Dining Area" />
                <div className="cp-gallery-item-label">Dining Area</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-2-primary-bed.jpg" alt="Primary Bedroom" />
                <div className="cp-gallery-item-label">Primary Bedroom</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-6-bedroom2.jpg" alt="Bedroom 2" />
                <div className="cp-gallery-item-label">Bedroom 2</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-10-loft.jpg" alt="Upstairs Lounge" />
                <div className="cp-gallery-item-label">Upstairs Lounge</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-12-room1.jpg" alt="Bonus Room" />
                <div className="cp-gallery-item-label">Bonus Room</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-13-room2.jpg" alt="Bonus Room — View 2" />
                <div className="cp-gallery-item-label">Bonus Room</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-8-bath2.jpg" alt="Primary Bathroom" />
                <div className="cp-gallery-item-label">Primary Bathroom</div>
              </div>
              <div className="cp-gallery-item cp-gallery-regular">
                <img src="/charlotte-7-bath1.jpg" alt="Bathroom 2" />
                <div className="cp-gallery-item-label">Bathroom 2</div>
              </div>
            </div>
            <div className="cp-fade-in" style={{textAlign:'center', marginTop:'0rem'}}>
              <p style={{fontSize:'0rem'}}></p>
            </div>
          </div>
        </section>

        {/* MARKET OPPORTUNITY */}
        <section className="cp-section cp-section-dark" id="cp-market">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">Market Intelligence</div>
              <h2 style={{color:'#FFFFFF'}}>The Charlotte Short-Term Rental Opportunity</h2>
              <div className="cp-gold-divider"></div>
              <p style={{color:'rgba(255,255,255,0.6)'}}>Charlotte's short-term rental market has experienced sustained growth, fueled by the city's expanding corporate base, major sports franchises, and a thriving convention calendar. Understanding this market is the foundation of a successful revenue strategy.</p>
            </div>
            <div className="cp-market-grid cp-fade-in">
              {[
                ['57M+','Annual passengers through Charlotte Douglas International Airport'],
                ['$4.2B','Annual visitor spending in the Charlotte metro area'],
                ['300+','Major conventions and events hosted in Charlotte each year'],
                ['28%','STR demand growth in Charlotte over the past three years'],
                ['Top 15','Charlotte ranked among top U.S. cities for short-term rental ROI'],
                ['65%+','Average annual occupancy rate for well-managed STR properties']
              ].map(([value, desc]) => (
                <div className="cp-market-card" key={value}>
                  <div className="cp-market-value">{value}</div>
                  <div className="cp-market-desc">{desc}</div>
                </div>
              ))}
            </div>
            <div className="cp-chart-container cp-fade-in">
              <div className="cp-chart-title">Estimated Nightly Rates by Property Type – Charlotte Area</div>
              <canvas ref={nightlyChartRef} height="280"></canvas>
            </div>
            <div style={{marginTop:'2.5rem', maxWidth:'700px', marginLeft:'auto', marginRight:'auto'}} className="cp-fade-in">
              <p style={{color:'rgba(255,255,255,0.55)', fontSize:'0.88rem', textAlign:'center'}}>Charlotte's demand drivers — including Bank of America Stadium events, the Charlotte Convention Center, and the growing Uptown district — create consistent year-round booking opportunities. Corporate relocations and the city's Fortune 500 presence further sustain demand during traditionally slower leisure travel periods.</p>
            </div>
          </div>
        </section>

        {/* REVENUE PROJECTIONS */}
        <section className="cp-section cp-section-ivory" id="cp-revenue">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">Financial Projections</div>
              <h2>Revenue Projection for 5048 Downhaul Dr</h2>
              <div className="cp-gold-divider"></div>
              <p>Based on comparable short-term rental performance in the Charlotte market, we have modeled three realistic revenue scenarios for your property. These projections reflect current market conditions and IPM's dynamic pricing approach.</p>
            </div>
            <div className="cp-proj-cards cp-fade-in">
              <div className="cp-proj-card cp-proj-conservative">
                <div className="cp-proj-badge">Conservative</div>
                <div className="cp-proj-nightly">$165</div>
                <div className="cp-proj-label">Estimated Nightly Rate</div>
                <div className="cp-proj-rows">
                  {[['Occupancy Rate','~55%'],['Booked Nights / Month','16–17 nights'],['Monthly Gross Revenue','$2,700–$2,900']].map(([l,v]) => (
                    <div className="cp-proj-row" key={l}><span className="cp-proj-row-label">{l}</span><span className="cp-proj-row-value">{v}</span></div>
                  ))}
                </div>
                <div className="cp-proj-annual"><div className="cp-proj-annual-value">$32K–$35K</div><div className="cp-proj-annual-label">Estimated Annual Gross Revenue</div></div>
              </div>
              <div className="cp-proj-card cp-proj-strong" style={{position:'relative'}}>
                <div className="cp-popular-badge">Most Likely</div>
                <div className="cp-proj-badge">Strong Performance</div>
                <div className="cp-proj-nightly">$210</div>
                <div className="cp-proj-label">Estimated Nightly Rate</div>
                <div className="cp-proj-rows">
                  {[['Occupancy Rate','~65%'],['Booked Nights / Month','19–20 nights'],['Monthly Gross Revenue','$4,000–$4,300']].map(([l,v]) => (
                    <div className="cp-proj-row" key={l}><span className="cp-proj-row-label">{l}</span><span className="cp-proj-row-value">{v}</span></div>
                  ))}
                </div>
                <div className="cp-proj-annual"><div className="cp-proj-annual-value">$48K–$52K</div><div className="cp-proj-annual-label">Estimated Annual Gross Revenue</div></div>
              </div>
              <div className="cp-proj-card cp-proj-premium">
                <div className="cp-proj-badge">Premium Optimized</div>
                <div className="cp-proj-nightly">$265</div>
                <div className="cp-proj-label">Estimated Nightly Rate</div>
                <div className="cp-proj-rows">
                  {[['Occupancy Rate','~72%'],['Booked Nights / Month','21–22 nights'],['Monthly Gross Revenue','$5,600–$6,000']].map(([l,v]) => (
                    <div className="cp-proj-row" key={l}><span className="cp-proj-row-label">{l}</span><span className="cp-proj-row-value">{v}</span></div>
                  ))}
                </div>
                <div className="cp-proj-annual"><div className="cp-proj-annual-value">$67K–$72K</div><div className="cp-proj-annual-label">Estimated Annual Gross Revenue</div></div>
              </div>
            </div>
            <div className="cp-chart-container cp-fade-in" style={{background:'#FFFFFF', border:'1px solid #E2E8F0', maxWidth:'750px'}}>
              <div className="cp-chart-title" style={{color:'#0E1A2B'}}>Annual Revenue Comparison – Three Scenarios</div>
              <canvas ref={revenueChartRef} height="260"></canvas>
            </div>
            <div className="cp-disclaimer cp-fade-in"><strong>Disclaimer:</strong> Revenue projections are estimates based on market data and comparable listings in Charlotte. Actual performance depends on property condition, amenities, pricing strategy, guest demand, and seasonality.</div>
          </div>
        </section>

        {/* OWNER EARNINGS */}
        <section className="cp-section cp-section-white" id="cp-earnings">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">Owner Economics</div>
              <h2>Your Estimated Owner Earnings</h2>
              <div className="cp-gold-divider"></div>
              <p>IPM's pricing model is built around transparency and alignment with owner success. Our fee structure is straightforward — a low monthly platform fee plus a performance-based management fee calculated on net profit, not gross revenue.</p>
            </div>
            <div className="cp-earnings-layout cp-fade-in">
              <div>
                <div className="cp-fee-structure">
                  <div className="cp-section-label" style={{color:'#C6A66B'}}>IPM Fee Structure</div>
                  <h3 style={{color:'#FFFFFF', marginBottom:'1.5rem'}}>Simple. Transparent. Aligned.</h3>
                  <div className="cp-fee-item">
                    <div>
                      <div className="cp-fee-item-label">Monthly Platform & Software Fee</div>
                      <div className="cp-fee-item-sublabel">Flat monthly fee regardless of bookings</div>
                    </div>
                    <div className="cp-fee-item-value">$200/mo</div>
                  </div>
                  <div className="cp-fee-item">
                    <div>
                      <div className="cp-fee-item-label">Management Fee</div>
                      <div className="cp-fee-item-sublabel">Applied to net profit after platform commissions</div>
                    </div>
                    <div className="cp-fee-item-value">20%</div>
                  </div>
                  <div style={{marginTop:'1.5rem', padding:'1rem', background:'rgba(198,166,107,0.1)', borderRadius:'8px', border:'1px solid rgba(198,166,107,0.2)'}}>
                    <p style={{fontSize:'0.82rem', color:'rgba(255,255,255,0.6)', lineHeight:'1.6'}}><strong style={{color:'#C6A66B'}}>Net Profit Definition:</strong> Revenue after platform commissions (e.g., Airbnb, Booking.com). IPM's management fee is never applied to gross revenue — only to what you actually earn.</p>
                  </div>
                </div>
              </div>
              <div>
                <div style={{marginBottom:'1rem'}}>
                  <div className="cp-section-label">Sample Calculation</div>
                  <h3 style={{marginBottom:'0.5rem'}}>Strong Performance Scenario</h3>
                  <p style={{fontSize:'0.88rem'}}>Based on $4,200 monthly gross booking revenue. Click any value to edit.</p>
                </div>
                <div className="cp-earnings-table-wrap">
                  <table className="cp-earnings-table">
                    <thead>
                      <tr><th>Item</th><th style={{textAlign:'right'}}>Amount</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Monthly Gross Booking Revenue</td><td contentEditable="true">$4,200</td></tr>
                      <tr><td>Platform Commission (est. 15%)</td><td contentEditable="true" style={{color:'#E53E3E'}}>– $630</td></tr>
                      <tr><td><strong>Net Booking Revenue</strong></td><td contentEditable="true"><strong>$3,570</strong></td></tr>
                      <tr><td>IPM Management Fee (20% of Net)</td><td contentEditable="true" style={{color:'#E53E3E'}}>– $714</td></tr>
                      <tr><td>Monthly Platform / Software Fee</td><td contentEditable="true" style={{color:'#E53E3E'}}>– $200</td></tr>
                      <tr className="cp-highlight">
                        <td><strong>Estimated Owner Payout</strong><br/><span style={{fontSize:'0.75rem', fontWeight:'400', color:'#718096'}}>Before taxes &amp; maintenance reserve</span></td>
                        <td><strong>$2,656</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="cp-editable-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Values are editable — click any cell to update figures for your scenario.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IPM HANDLES */}
        <section className="cp-section cp-section-ivory" id="cp-services">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">Full-Service Management</div>
              <h2>What IPM Handles for You</h2>
              <div className="cp-gold-divider"></div>
              <p>From the moment your listing goes live to the day your guest checks out, IPM manages every detail of the short-term rental operation — so you never have to. Owners enjoy a completely hands-off experience while IPM handles all aspects of day-to-day management.</p>
            </div>
            <div className="cp-services-grid cp-fade-in">
              {[
                ['📸','Listing Creation & Optimization'],
                ['🎨','Professional Photography Coordination'],
                ['📊','Dynamic Pricing Strategy'],
                ['💬','Guest Messaging & Booking Management'],
                ['🧹','Cleaning Coordination'],
                ['🔧','Maintenance Coordination'],
                ['⭐','Review Management'],
                ['🌐','Multi-Platform Listing Distribution']
              ].map(([icon, title]) => (
                <div className="cp-service-card" key={title}>
                  <div className="cp-service-icon">{icon}</div>
                  <h4>{title}</h4>
                </div>
              ))}
            </div>
            <div style={{textAlign:'center', marginTop:'3rem'}} className="cp-fade-in">
              <div style={{maxWidth:'580px', margin:'0 auto', background:'#FFFFFF', borderRadius:'20px', padding:'2rem', boxShadow:'0 2px 8px rgba(14,26,43,0.08)', borderTop:'3px solid #C6A66B'}}>
                <p style={{fontSize:'1rem', color:'#1A2230', fontWeight:'500', lineHeight:'1.7'}}>"Owners receive a <strong>completely hands-off experience</strong> while IPM handles every aspect of operations — from the first booking inquiry to the final guest review."</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY IPM */}
        <section className="cp-section cp-section-white" id="cp-why-ipm">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">The IPM Advantage</div>
              <h2>Why Owners Choose IPM</h2>
              <div className="cp-gold-divider"></div>
              <p>IPM was built specifically for property owners who want to unlock the revenue potential of short-term rentals without sacrificing their time, peace of mind, or property condition.</p>
            </div>
            <div className="cp-why-grid cp-fade-in">
              {[
                ['📈','Revenue Optimization Strategy','IPM uses data-driven dynamic pricing tools to ensure your property captures peak demand pricing during high-traffic periods while maintaining strong occupancy during slower seasons.'],
                ['🤝','Professional Guest Communication','From inquiry to checkout, every guest interaction is handled promptly and professionally by our team — protecting your reviews and ensuring a 5-star guest experience every time.'],
                ['🛡️','Property Protection & Oversight','IPM implements rigorous guest screening, security deposit management, and property inspection protocols to safeguard your investment between every stay.'],
                ['📋','Transparent Monthly Reporting','Receive detailed monthly financial statements showing every booking, every fee, and your net earnings — with no hidden charges or surprises on your statement.'],
                ['🏖️','Hands-Off Management for Owners','You own the asset and receive the income. IPM handles everything else — giving you the lifestyle benefits of rental income without the operational burden.'],
                ['🌍','Multi-Platform Marketing','Your property is listed and optimized across Airbnb, Vrbo, Booking.com, and other platforms simultaneously — maximizing your visibility and booking potential.']
              ].map(([icon, title, desc]) => (
                <div className="cp-why-card" key={title}>
                  <div className="cp-why-card-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DASHBOARD */}
        <section className="cp-section cp-section-dark" id="cp-dashboard">
          <div className="cp-container">
            <div className="cp-section-header cp-fade-in">
              <div className="cp-section-label">Owner Portal</div>
              <h2 style={{color:'#FFFFFF'}}>Complete Visibility. Zero Guesswork.</h2>
              <div className="cp-gold-divider"></div>
              <p style={{color:'rgba(255,255,255,0.6)'}}>Every IPM owner receives access to a dedicated reporting dashboard that provides real-time visibility into their property's performance. You stay informed without being involved in day-to-day operations.</p>
            </div>
            <div className="cp-dashboard-features cp-fade-in">
              {[
                ['📅','Booking Visibility & Calendar Transparency'],
                ['💰','Monthly Financial Reports'],
                ['📊','Revenue Tracking & Analytics'],
                ['⭐','Guest Review Insights'],
                ['🔔','Real-Time Booking Notifications']
              ].map(([icon, label]) => (
                <div className="cp-dashboard-feature" key={label}>
                  <div className="cp-icon">{icon}</div>
                  <p>{label}</p>
                </div>
              ))}
            </div>
            <div style={{marginTop:'3rem', maxWidth:'700px', marginLeft:'auto', marginRight:'auto'}} className="cp-fade-in">
              <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(198,166,107,0.2)', borderRadius:'20px', padding:'2rem', textAlign:'center'}}>
                <p style={{color:'rgba(255,255,255,0.7)', fontSize:'0.95rem', lineHeight:'1.8'}}>Your owner dashboard is updated in real time with every booking confirmation, cancellation, and payout. Monthly reports are delivered directly to your inbox — giving you a complete financial picture of your property's performance without lifting a finger.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cp-cta-section" id="cp-cta">
          <div className="cp-container" style={{position:'relative', zIndex:2}}>
            <div className="cp-fade-in">
              <div className="cp-section-label" style={{textAlign:'center'}}>Ready to Move Forward?</div>
              <h2>Turn Your Property Into a<br/><span style={{color:'#C6A66B'}}>High-Performing Asset</span></h2>
              <div className="cp-gold-divider"></div>
              <p style={{color:'rgba(255,255,255,0.65)', maxWidth:'560px', margin:'0 auto 2.5rem', fontSize:'1.05rem'}}>Join the growing number of Charlotte property owners who trust IPM to manage their short-term rental investment. Let's discuss how we can maximize the revenue potential of your property.</p>
              <div className="cp-cta-btn-group">
                <a href="mailto:info@richaf.global" className="cp-btn cp-btn-primary">📅 Schedule Owner Consultation</a>
                <a href="/contact" className="cp-btn cp-btn-outline">📊 Request Detailed Revenue Analysis</a>
              </div>
              <p style={{marginTop:'2rem', fontSize:'0.82rem', color:'rgba(255,255,255,0.35)'}}>No commitment required. This consultation is complimentary for property owners.</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cp-footer">
          <div className="cp-container">
            <div className="cp-footer-inner">
              <div>
                <div className="cp-footer-logo">IPM<span>.</span></div>
                <div className="cp-footer-tagline">International Property Management</div>
                <div className="cp-footer-tagline" style={{marginTop:'0.25rem'}}>Charlotte Property Management Division</div>
              </div>
              <div className="cp-footer-contact">
                <p>Website</p>
                <p><a href="https://ipm.services" target="_blank" rel="noopener noreferrer">ipm.services</a></p>
                <p style={{marginTop:'0.75rem'}}>Contact</p>
                <p><a href="mailto:info@richaf.global">info@richaf.global</a></p>
              </div>
              <div>
                <div className="cp-footer-private">🔒 Private Owner Proposal</div>
                <p style={{fontSize:'0.78rem', marginTop:'0.75rem', maxWidth:'220px', lineHeight:'1.5', color:'rgba(255,255,255,0.4)'}}>This proposal was prepared exclusively for the owner of 5048 Downhaul Dr, Charlotte, NC.</p>
              </div>
            </div>
            <div className="cp-footer-bottom">
              <p>© 2025 IPM – International Property Management. All rights reserved.</p>
              <p><a href="https://ipm.services" style={{color:'#C6A66B'}}>ipm.services</a></p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CharlotteProposal;
