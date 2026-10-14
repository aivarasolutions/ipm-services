import React, { useRef, useState } from 'react'
import furnishingConfig from '../../data/furnishingService.json'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
    reader.readAsDataURL(file)
  })
}

export default function FurnishingAssessmentForm({ language, t, selectedPackage }) {
  const formRef = useRef(null)
  const submissionIdRef = useRef('')
  const attemptedValuesRef = useRef(null)
  const attemptedFilesRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [files, setFiles] = useState([])
  const [values, setValues] = useState({
    firstName: '', lastName: '', email: '', phone: '', city: '', country: '', address: '',
    propertyType: '', bedrooms: '', bathrooms: '', size: '', condition: '', retainFurniture: '',
    budget: '', currency: 'USD', packageId: selectedPackage || '', completionDate: '', style: '', requests: '',
  })

  React.useEffect(() => {
    if (selectedPackage) setValues(current => ({ ...current, packageId: selectedPackage }))
  }, [selectedPackage])

  const update = event => {
    const { name, value } = event.target
    setValues(current => ({ ...current, [name]: value }))
    setFieldErrors(current => ({ ...current, [name]: '' }))
  }

  function validate() {
    const next = {}
    const required = ['firstName', 'lastName', 'email', 'phone', 'city', 'country', 'propertyType', 'bedrooms', 'bathrooms', 'condition', 'packageId']
    required.forEach(key => { if (!String(values[key] || '').trim()) next[key] = true })
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = true
    if (values.phone && !/^\+\d[\d\s().-]{5,}$/.test(values.phone.trim())) next.phone = true
    if (values.bedrooms && (!Number.isInteger(Number(values.bedrooms)) || Number(values.bedrooms) < 0 || Number(values.bedrooms) > 100)) next.bedrooms = true
    if (values.bathrooms && (!Number.isFinite(Number(values.bathrooms)) || Number(values.bathrooms) < 0 || Number(values.bathrooms) > 100 || !Number.isInteger(Number(values.bathrooms) * 2))) next.bathrooms = true
    if (values.budget && (!Number.isFinite(Number(values.budget)) || Number(values.budget) < 0)) next.budget = true
    if (!furnishingConfig.propertyTypes.includes(values.propertyType)) next.propertyType = true
    if (!furnishingConfig.conditions.includes(values.condition)) next.condition = true
    if (!furnishingConfig.currencies.includes(values.currency)) next.currency = true
    if (values.style && !furnishingConfig.styles.includes(values.style)) next.style = true
    if (!furnishingConfig.packages.includes(values.packageId)) next.packageId = true
    if (files.length > furnishingConfig.maxFiles || files.some(file => !allowedTypes.has(file.type)) || files.reduce((sum, file) => sum + file.size, 0) > furnishingConfig.maxUploadBytes) next.files = true
    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(event) {
    event.preventDefault()
    setError('')
    setSuccess(false)
    if (!validate()) {
      setError(t.validationError)
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setBusy(true)
    try {
      const unchangedAttempt = attemptedValuesRef.current &&
        JSON.stringify(attemptedValuesRef.current) === JSON.stringify(values) &&
        attemptedFilesRef.current?.length === files.length &&
        attemptedFilesRef.current.every((file, index) => file === files[index])
      if (!submissionIdRef.current || (attemptedValuesRef.current && !unchangedAttempt)) {
        submissionIdRef.current = crypto.randomUUID()
      }
      const encodedFiles = await Promise.all(files.map(async file => ({
        name: file.name,
        type: file.type,
        data: await fileToBase64(file),
      })))
      const payload = {
        submissionId: submissionIdRef.current,
        ...values,
        bedrooms: Number(values.bedrooms),
        bathrooms: Number(values.bathrooms),
        budget: values.budget,
        language,
        files: encodedFiles,
      }
      attemptedValuesRef.current = { ...values }
      attemptedFilesRef.current = [...files]
      const response = await fetch('/api/furnishing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.ok !== true) throw new Error(result.error || t.submitError)
      setSuccess(true)
      setError('')
      formRef.current?.reset()
      setFiles([])
      setValues({
        firstName: '', lastName: '', email: '', phone: '', city: '', country: '', address: '',
        propertyType: '', bedrooms: '', bathrooms: '', size: '', condition: '', retainFurniture: '',
        budget: '', currency: 'USD', packageId: selectedPackage || '', completionDate: '', style: '', requests: '',
      })
      submissionIdRef.current = ''
      attemptedValuesRef.current = null
      attemptedFilesRef.current = null
    } catch (submitError) {
      setError(submitError.message || t.submitError)
    } finally {
      setBusy(false)
    }
  }

  const label = (key, required = false) => {
    const field = { fullName: 'firstName', retain: 'retainFurniture', completion: 'completionDate' }[key] || key
    return <label htmlFor={`furnishing-${field}`} className="furnish-label">{t[key]}{required && <span aria-hidden="true"> *</span>}</label>
  }
  const invalid = key => fieldErrors[key] ? 'true' : undefined

  return (
    <section className="furnish-section furnish-form-section" id="furnishing-inquiry" aria-labelledby="furnishing-inquiry-title">
      <div className="furnish-shell furnish-form-layout">
        <div className="furnish-form-aside">
          <p className="furnish-kicker">IPM / PROPERTY SERVICES</p>
          <h2 id="furnishing-inquiry-title">{t.inquiryTitle}</h2>
          <p>{t.inquiryIntro}</p>
          <p className="furnish-required-note">{t.requiredNote}</p>
          <div className="furnish-privacy-note"><span className="furnish-lock-mark" aria-hidden="true">IPM</span>{t.privacy}</div>
        </div>
        <form ref={formRef} className={`furnish-form${busy ? ' is-busy' : ''}`} onSubmit={submit} noValidate>
          {success && <div className="furnish-success" role="status"><strong>{t.successTitle}</strong><span>{t.successMessage}</span></div>}
          {!!error && <div className="furnish-error" role="alert">{error}</div>}
          <div className="furnish-form-grid">
            <div className="furnish-field">{label('fullName', true)}<input id="furnishing-firstName" name="firstName" autoComplete="given-name" value={values.firstName} onChange={update} required aria-invalid={invalid('firstName')} /></div>
            <div className="furnish-field">{label('lastName', true)}<input id="furnishing-lastName" name="lastName" autoComplete="family-name" value={values.lastName} onChange={update} required aria-invalid={invalid('lastName')} /></div>
            <div className="furnish-field">{label('email', true)}<input id="furnishing-email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} required aria-invalid={invalid('email')} /></div>
            <div className="furnish-field">{label('phone', true)}<input id="furnishing-phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 310 400 0032" value={values.phone} onChange={update} required aria-invalid={invalid('phone')} /></div>
            <div className="furnish-field">{label('city', true)}<input id="furnishing-city" name="city" value={values.city} onChange={update} required aria-invalid={invalid('city')} /></div>
            <div className="furnish-field">{label('country', true)}<input id="furnishing-country" name="country" autoComplete="country-name" value={values.country} onChange={update} required aria-invalid={invalid('country')} /></div>
            <div className="furnish-field furnish-field-wide">{label('address')}<input id="furnishing-address" name="address" autoComplete="street-address" value={values.address} onChange={update} /></div>
            <div className="furnish-field">{label('propertyType', true)}<select id="furnishing-propertyType" name="propertyType" value={values.propertyType} onChange={update} required aria-invalid={invalid('propertyType')}><option value="">{t.choose}</option>{furnishingConfig.propertyTypes.map(option => <option key={option} value={option}>{t.types[option] || t.other}</option>)}</select></div>
            <div className="furnish-field furnish-number-pair">
              <div>{label('bedrooms', true)}<input id="furnishing-bedrooms" name="bedrooms" type="number" min="0" max="100" step="1" value={values.bedrooms} onChange={update} required aria-invalid={invalid('bedrooms')} /></div>
              <div>{label('bathrooms', true)}<input id="furnishing-bathrooms" name="bathrooms" type="number" min="0" max="100" step="0.5" value={values.bathrooms} onChange={update} required aria-invalid={invalid('bathrooms')} /></div>
            </div>
            <div className="furnish-field">{label('size')}<input id="furnishing-size" name="size" value={values.size} onChange={update} placeholder={language === 'es' ? 'Ej. 85 m²' : 'e.g. 900 sq ft or 85 m²'} /></div>
            <div className="furnish-field">{label('condition', true)}<select id="furnishing-condition" name="condition" value={values.condition} onChange={update} required aria-invalid={invalid('condition')}><option value="">{t.choose}</option>{furnishingConfig.conditions.map(option => <option key={option} value={option}>{t.conditions[option]}</option>)}</select></div>
            <div className="furnish-field furnish-field-wide">{label('retain')}<textarea id="furnishing-retainFurniture" name="retainFurniture" rows="2" value={values.retainFurniture} onChange={update} /></div>
            <div className="furnish-field furnish-budget-field">{label('budget')}<input id="furnishing-budget" name="budget" type="number" min="0" step="any" value={values.budget} onChange={update} aria-invalid={invalid('budget')} /></div>
            <div className="furnish-field">{label('currency', true)}<select id="furnishing-currency" name="currency" value={values.currency} onChange={update} required aria-invalid={invalid('currency')}>{furnishingConfig.currencies.map(option => <option key={option} value={option}>{t.currencies[option] || t.other}</option>)}</select></div>
            <div className="furnish-field">{label('packageId', true)}<select id="furnishing-packageId" name="packageId" value={values.packageId} onChange={update} required aria-invalid={invalid('packageId')}><option value="">{t.choose}</option>{furnishingConfig.packages.map((option, index) => <option key={option} value={option}>{t.packageNames[index]}</option>)}</select></div>
            <div className="furnish-field">{label('completion')}<input id="furnishing-completionDate" name="completionDate" type="date" value={values.completionDate} onChange={update} /></div>
            <div className="furnish-field furnish-field-wide">{label('style')}<select id="furnishing-style" name="style" value={values.style} onChange={update}><option value="">{t.choose}</option>{furnishingConfig.styles.map(option => <option key={option} value={option}>{t.styles[option]}</option>)}</select></div>
            <div className="furnish-field furnish-field-wide">{label('requests')}<textarea id="furnishing-requests" name="requests" rows="4" value={values.requests} onChange={update} /></div>
            <div className="furnish-field furnish-field-wide">
              {label('files')}<input id="furnishing-files" name="files" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" multiple aria-invalid={invalid('files')} onChange={event => { setFiles(Array.from(event.target.files || [])); setFieldErrors(current => ({ ...current, files: '' })) }} />
              <small>{t.fileHelp}</small>
              {files.length > 0 && <ul className="furnish-file-list" aria-label={t.files}>{files.map((file, index) => <li key={`${file.name}-${index}`}>{file.name} <span>({(file.size / 1024).toFixed(0)} KB)</span></li>)}</ul>}
              {fieldErrors.files && <small className="furnish-file-error">{t.fileError}</small>}
            </div>
          </div>
          <div className="furnish-form-end">
            <p>{t.privacy}</p>
            <button type="submit" className="furnish-button furnish-button-dark" disabled={busy}>{busy ? t.sending : t.submit}<span aria-hidden="true">↗</span></button>
          </div>
          {busy && <span className="furnish-sr-only" role="status">{t.sending}</span>}
        </form>
      </div>
    </section>
  )
}
