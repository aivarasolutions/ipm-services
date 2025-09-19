import { useState } from 'react';

const LeadCaptureForm = ({ variant = 'simple' }) => {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    
    setStatus('sending');
    try {
      // For now, just simulate success - you can add actual API call later
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Real Estate Lead:', {
        ...data,
        timestamp: new Date().toISOString()
      });
      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="lead-capture-form">
        <div className="success-message" style={{ 
          background: '#10b981', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          textAlign: 'center' 
        }}>
          <h3>Thank you for your interest!</h3>
          <p>We'll contact you within 24 hours with property details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-capture-form">
      <h3>{variant === 'detailed' ? 'Get Your Free Investment Analysis' : 'Get Property Information'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full Name *
            <input name="name" required disabled={status === 'sending'} />
          </label>
          <label>
            Email *
            <input type="email" name="email" required disabled={status === 'sending'} />
          </label>
        </div>
        
        <div className="form-row">
          <label>
            Phone
            <input type="tel" name="phone" disabled={status === 'sending'} />
          </label>
          <label>
            Investment Budget
            <select name="budget" disabled={status === 'sending'}>
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
              <select name="location" disabled={status === 'sending'}>
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
                placeholder="Tell us about your investment goals..."
                disabled={status === 'sending'}
              />
            </label>
          </>
        )}

        {status === 'error' && (
          <div className="error-message" style={{ color: '#ef4444', marginBottom: '16px' }}>
            Something went wrong. Please try again.
          </div>
        )}

        <button 
          type="submit" 
          className="btn primary" 
          disabled={status === 'sending'}
          style={{ width: '100%' }}
        >
          {status === 'sending' ? 'Sending...' : 'Get Information'}
        </button>
      </form>
    </div>
  );
};

export default LeadCaptureForm;