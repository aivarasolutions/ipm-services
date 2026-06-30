import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'ipm_lead_popup_v2';
const SHOW_DELAY_MS = 5000;
const SCROLL_TRIGGER_PCT = 0.25;

const PLANS = {
  promotion: {
    id: 'promotion',
    rate: '10%',
    name: 'Listing Promotion',
    blurb: 'We market & promote your listing across every major platform.',
    source: 'Lead Popup — Listing Promotion (10%)',
  },
  full: {
    id: 'full',
    rate: '20%',
    name: 'Full Management',
    blurb: 'Hands-off, end-to-end management of your property.',
    source: 'Lead Popup — Full Management (20%)',
  },
};

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [plan, setPlan] = useState('full');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const firedRef = useRef(false);
  const lastFocusRef = useRef(null);

  // Decide whether to show
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === 'done';
    } catch {
      seen = false;
    }
    if (seen) return;

    const trigger = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      setOpen(true);
    };

    // Trigger 1: time on page
    const timer = setTimeout(trigger, SHOW_DELAY_MS);

    // Trigger 2: scrolling down the page
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= SCROLL_TRIGGER_PCT) trigger();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Trigger 3: exit intent (mouse leaves top of viewport)
    const onMouseOut = (e) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  // Lock scroll, Esc to close, focus management + trap
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lastFocusRef.current = document.activeElement;

    // Move focus into the dialog
    const focusFirst = () => {
      const node = dialogRef.current;
      if (!node) return;
      const focusable = node.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusable || node).focus();
    };
    const raf = requestAnimationFrame(focusFirst);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'Tab') {
        const node = dialogRef.current;
        if (!node) return;
        const items = node.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
      if (lastFocusRef.current && lastFocusRef.current.focus) {
        lastFocusRef.current.focus();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, status]);

  function markDone() {
    try {
      localStorage.setItem(STORAGE_KEY, 'done');
    } catch {
      /* ignore */
    }
  }

  function handleClose() {
    setOpen(false);
    markDone();
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      next.phone = 'Please enter your phone number.';
    } else if (digits.length < 7) {
      next.phone = 'Please enter a valid phone number.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    if (!validate()) return;

    setStatus('sending');
    try {
      const selected = PLANS[plan];
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: `Interested in ${selected.name} (${selected.rate})`,
          message: `Lead from website popup. Plan of interest: ${selected.name} — ${selected.rate} commission.`,
          propertyType: `${selected.name} (${selected.rate})`,
          source: selected.source,
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      markDone();
      if (typeof gtag === 'function') gtag('event', 'book_click', {});
    } catch {
      setStatus('error');
    }
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  }

  if (!open) return null;

  return (
    <div
      className="ipm-lp-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <style>{css}</style>
      <div
        className="ipm-lp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ipm-lp-title"
        ref={dialogRef}
      >
        <button className="ipm-lp-close" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {status === 'success' ? (
          <div className="ipm-lp-success">
            <div className="ipm-lp-check">✓</div>
            <h3 id="ipm-lp-title">Thank you!</h3>
            <p>
              Your request is in. An IPM specialist will reach out within 24 hours
              to discuss your <strong>{PLANS[plan].name}</strong> options.
            </p>
            <button className="ipm-lp-btn" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="ipm-lp-head">
              <span className="ipm-lp-eyebrow">International Property Management</span>
              <h3 id="ipm-lp-title" className="ipm-lp-title">
                Maximize Your Rental Income
              </h3>
              <p className="ipm-lp-sub">
                Tell us how you'd like to work with us and we'll send a tailored
                earnings plan — no obligation.
              </p>
            </div>

            <form className="ipm-lp-form" onSubmit={handleSubmit} noValidate>
              <div className="ipm-lp-plans">
                {Object.values(PLANS).map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className={`ipm-lp-plan ${plan === p.id ? 'is-selected' : ''}`}
                    onClick={() => setPlan(p.id)}
                    aria-pressed={plan === p.id}
                  >
                    {plan === p.id && <span className="ipm-lp-plan-badge">✓ Selected</span>}
                    <span className="ipm-lp-plan-rate">{p.rate}</span>
                    <span className="ipm-lp-plan-name">{p.name}</span>
                    <span className="ipm-lp-plan-blurb">{p.blurb}</span>
                  </button>
                ))}
              </div>

              <div className="ipm-lp-field">
                <label htmlFor="ipm-lp-name">Full Name *</label>
                <input
                  id="ipm-lp-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  disabled={status === 'sending'}
                  className={errors.name ? 'has-error' : ''}
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'ipm-lp-name-err' : undefined}
                />
                {errors.name && <span id="ipm-lp-name-err" className="ipm-lp-err">{errors.name}</span>}
              </div>

              <div className="ipm-lp-field">
                <label htmlFor="ipm-lp-email">Email *</label>
                <input
                  id="ipm-lp-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  disabled={status === 'sending'}
                  className={errors.email ? 'has-error' : ''}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'ipm-lp-email-err' : undefined}
                />
                {errors.email && <span id="ipm-lp-email-err" className="ipm-lp-err">{errors.email}</span>}
              </div>

              <div className="ipm-lp-field">
                <label htmlFor="ipm-lp-phone">Phone *</label>
                <input
                  id="ipm-lp-phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  disabled={status === 'sending'}
                  className={errors.phone ? 'has-error' : ''}
                  placeholder="+1 (555) 123-4567"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'ipm-lp-phone-err' : undefined}
                />
                {errors.phone && <span id="ipm-lp-phone-err" className="ipm-lp-err">{errors.phone}</span>}
              </div>

              {status === 'error' && (
                <div className="ipm-lp-form-error">
                  Something went wrong. Please try again.
                </div>
              )}

              <button type="submit" className="ipm-lp-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Get My Free Plan'}
              </button>
              <p className="ipm-lp-fineprint">
                We respect your privacy. Your details are never shared.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const css = `
.ipm-lp-overlay {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  background: rgba(6, 18, 31, 0.78);
  backdrop-filter: blur(6px);
  animation: ipm-lp-fade 0.25s ease;
  font-family: 'Montserrat', sans-serif;
}
@keyframes ipm-lp-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes ipm-lp-pop { from { opacity: 0; transform: translateY(16px) scale(0.98) } to { opacity: 1; transform: none } }

.ipm-lp-modal {
  position: relative;
  width: 100%; max-width: 460px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: #F8F5EF;
  border: 1px solid rgba(212, 175, 55, 0.45);
  border-radius: 18px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
  padding: 34px 30px 26px;
  animation: ipm-lp-pop 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.ipm-lp-close {
  position: absolute; top: 12px; right: 14px;
  width: 34px; height: 34px;
  border: none; background: transparent;
  font-size: 26px; line-height: 1; color: #0A1A30;
  cursor: pointer; opacity: 0.55; transition: opacity 0.2s;
}
.ipm-lp-close:hover { opacity: 1; }

.ipm-lp-head { text-align: center; margin-bottom: 20px; }
.ipm-lp-eyebrow {
  display: inline-block;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  color: #B8912E; font-weight: 600; margin-bottom: 10px;
}
.ipm-lp-title {
  font-family: 'Playfair Display', serif;
  font-size: 27px; line-height: 1.15; color: #0A1A30;
  margin: 0 0 10px; font-weight: 700;
}
.ipm-lp-sub { font-size: 14px; line-height: 1.5; color: #4A5868; margin: 0; }

.ipm-lp-plans { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; }
.ipm-lp-plan {
  position: relative; text-align: left;
  display: flex; flex-direction: column; gap: 4px;
  padding: 14px 14px 13px;
  background: #fff;
  border: 1.5px solid rgba(10, 26, 48, 0.14);
  border-radius: 12px; cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.1s;
}
.ipm-lp-plan:hover { border-color: rgba(212, 175, 55, 0.7); }
.ipm-lp-plan.is-selected {
  border-color: #D4AF37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.22);
  background: #fffdf7;
}
.ipm-lp-plan-badge {
  position: absolute; top: 8px; right: 8px;
  font-size: 9px; font-weight: 700; letter-spacing: 0.05em;
  color: #8A6D14; background: rgba(212, 175, 55, 0.2);
  padding: 2px 6px; border-radius: 999px;
}
.ipm-lp-plan-rate {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 700; color: #0A1A30; line-height: 1;
}
.ipm-lp-plan-name { font-size: 13px; font-weight: 700; color: #0A1A30; }
.ipm-lp-plan-blurb { font-size: 11px; line-height: 1.35; color: #5A6878; }

.ipm-lp-field { margin-bottom: 13px; }
.ipm-lp-field label {
  display: block; font-size: 12px; font-weight: 600;
  color: #0A1A30; margin-bottom: 5px; letter-spacing: 0.02em;
}
.ipm-lp-field input {
  width: 100%; box-sizing: border-box;
  padding: 11px 13px; font-size: 14px;
  border: 1.5px solid rgba(10, 26, 48, 0.18);
  border-radius: 9px; background: #fff; color: #0A1A30;
  font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s;
}
.ipm-lp-field input::placeholder { color: #9AA5B1; }
.ipm-lp-field input:focus {
  outline: none; border-color: #D4AF37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
}
.ipm-lp-field input.has-error { border-color: #D9534F; }
.ipm-lp-err { display: block; font-size: 11px; color: #C9302C; margin-top: 4px; }

.ipm-lp-form-error {
  background: rgba(217, 83, 79, 0.1); color: #C9302C;
  font-size: 13px; padding: 10px 12px; border-radius: 8px; margin-bottom: 12px;
}

.ipm-lp-btn {
  width: 100%; padding: 14px 18px; margin-top: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
  color: #06121F; cursor: pointer;
  background: linear-gradient(135deg, #F2D98D 0%, #D4AF37 100%);
  border: none; border-radius: 10px;
  transition: filter 0.2s, transform 0.1s;
}
.ipm-lp-btn:hover { filter: brightness(1.06); }
.ipm-lp-btn:active { transform: translateY(1px); }
.ipm-lp-btn:disabled { opacity: 0.6; cursor: default; }

.ipm-lp-fineprint { text-align: center; font-size: 11px; color: #8A95A2; margin: 12px 0 0; }

.ipm-lp-success { text-align: center; padding: 14px 6px 6px; }
.ipm-lp-check {
  width: 60px; height: 60px; margin: 0 auto 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 30px; color: #06121F; font-weight: 700;
  background: linear-gradient(135deg, #F2D98D 0%, #D4AF37 100%);
  border-radius: 50%;
}
.ipm-lp-success h3 {
  font-family: 'Playfair Display', serif;
  font-size: 26px; color: #0A1A30; margin: 0 0 10px;
}
.ipm-lp-success p { font-size: 14px; line-height: 1.55; color: #4A5868; margin: 0 0 22px; }

@media (max-width: 420px) {
  .ipm-lp-modal { padding: 30px 20px 22px; }
  .ipm-lp-plans { grid-template-columns: 1fr; }
  .ipm-lp-title { font-size: 24px; }
}
`;
