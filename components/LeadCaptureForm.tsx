'use client';
import { useState } from "react";

type LeadCaptureFormProps = {
  variant?: 'simple' | 'detailed';
};

export default function LeadCaptureForm({ variant = 'simple' }: LeadCaptureFormProps) {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    
    setStatus('sending');
    try {
      const res = await fetch('/api/real-estate-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <div className="lead-capture-form">
      <h3>{variant === 'detailed' ? 'Get Your Free Investment Analysis' : 'Get Property Information'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full Name *
            <input name="name" required />
          </label>
          <label>
            Email *
            <input type="email" name="email" required />
          </label>
        </div>
        
        <div className="form-row">
          <label>
            Phone
            <input type="tel" name="phone" />
          </label>
          <label>
            Investment Budget
            <select name="budget">
              <option value="">Select Range</option>
              <option value="200k-400k">$200K - $400K</option>
              <option value="400k-600k">$400K - $600K</option>
              <option value="600k-1m">$600K - $1M</option>
              <option value="1m+">$1M+</option>
            </select>
          </label>
        </div>

        {variant === 'detailed' && (
          <>
            <label>
              Preferred Location
              <select name="location">
                <option value="">Any Location</option>
                <option value="tulum">Tulum, Mexico</option>
                <option value="playa">Playa del Carmen, Mexico</option>
                <option value="cancun">Cancun, Mexico</option>
                <option value="usa">USA Properties</option>
              </select>
            </label>
            
            <label>
              Investment Goals
              <textarea 
                name="goals" 
                rows={3} 
                placeholder="Tell us about your investment objectives..."
              />
            </label>
          </>
        )}

        <button 
          className="btn primary" 
          disabled={status === 'sending'}
          style={{width: '100%'}}
        >
          {status === 'sending' ? 'Sending...' : 'Get Free Analysis'}
        </button>

        {status === 'success' && (
          <p className="success">Thank you! We'll contact you within 24 hours with your personalized analysis.</p>
        )}
        {status === 'error' && (
          <p className="error">Something went wrong. Please try again or call us directly.</p>
        )}
      </form>
    </div>
  );
}

