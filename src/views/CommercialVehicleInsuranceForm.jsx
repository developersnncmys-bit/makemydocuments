'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Truck, FileText, Phone, Check, AlertCircle,
  ChevronRight, ChevronLeft, ArrowLeft,
} from 'lucide-react'
import { getStates, getDistricts, validatePincode } from '../data/locationData'

const TOTAL = 3
const STEPS = ['Intent', 'Vehicle', 'Contact']

const STEP_META = [
  { title: 'I Want To',              sub: 'Buy / Renew commercial vehicle insurance without inspection or paperwork', Icon: Truck,     gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Enter Vehicle Details',  sub: 'Buy Insurance, the smart way',                                           Icon: FileText, gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Contact Details',        sub: 'Buy Insurance, the smart way',                                           Icon: Phone,    gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
]

const INTENT_OPTIONS = [
  { value: 'Buy New Policy',       label: 'Buy New Policy',       desc: 'Purchase a fresh insurance policy for your commercial vehicle',    color: '#2E68B1', bg: '#EBF2FB', badge: 'Recommended' },
  { value: 'Renew Existing Policy', label: 'Renew Existing Policy', desc: 'Renew your current policy without inspection or paperwork',        color: '#059669', bg: '#ECFDF5', badge: null },
]

const VEHICLE_TYPES = [
  'Truck / Lorry',
  'Van / Delivery Vehicle',
  'Taxi / Cab',
  'Bus',
  'Tractor',
  'Crane / Construction Vehicle',
  'Other',
]

const STATES = getStates()

function Field({ label, children }) {
  return (
    <div className="pf5-field">
      <label className="pf5-lbl">{label} <span className="pf5-ast">*</span></label>
      {children}
    </div>
  )
}

function ValidInp({ valid, count, children }) {
  return (
    <div className="pf5-inp-wrap">
      {children}
      {valid && <span className="pf5-tick"><Check size={11} strokeWidth={3} /></span>}
      {count && !valid && <span className="pf5-count">{count}</span>}
    </div>
  )
}

export default function CommercialVehicleInsuranceForm() {
  const [step,  setStep]  = useState(1)
  const [phase, setPhase] = useState('form') // 'form' | 'otp' | 'success'
  const [error, setError] = useState('')

  /* -- form fields -- */
  const [intent,      setIntent]      = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [regNumber,   setRegNumber]   = useState('')
  const [regDate,     setRegDate]     = useState('')
  const [name,        setName]        = useState('')
  const [mobile,      setMobile]      = useState('')
  const [email,       setEmail]       = useState('')
  const [address,     setAddress]     = useState('')
  const [stateVal,    setStateVal]    = useState('')
  const [district,    setDistrict]    = useState('')
  const [pincode,     setPincode]     = useState('')

  /* -- OTP state -- */
  const [otpDigits,   setOtpDigits]   = useState(['', '', '', ''])
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpError,    setOtpError]    = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const otpRefs = useRef([])

  const startResendTimer = () => {
    setResendTimer(30)
    const t = setInterval(() => setResendTimer(p => { if (p <= 1) { clearInterval(t); return 0 } return p - 1 }), 1000)
  }

  useEffect(() => {
    if (phase === 'otp') { setOtpDigits(['', '', '', '']); setOtpVerified(false); setOtpError(''); startResendTimer() }
  }, [phase])

  const handleOtpDigit = (i, val) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...otpDigits]; next[i] = digit
    setOtpDigits(next); setOtpError('')
    if (digit && i < 3) setTimeout(() => otpRefs.current[i + 1]?.focus(), 10)
  }
  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[i] && i > 0) otpRefs.current[i - 1]?.focus()
      else { const next = [...otpDigits]; next[i] = ''; setOtpDigits(next) }
    }
    if (e.key === 'ArrowLeft'  && i > 0) otpRefs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < 3) otpRefs.current[i + 1]?.focus()
  }
  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (pasted) {
      const next = pasted.split('').concat(['', '', '', '']).slice(0, 4)
      setOtpDigits(next); setOtpError('')
      setTimeout(() => otpRefs.current[Math.min(pasted.length, 3)]?.focus(), 10)
      e.preventDefault()
    }
  }
  const verifyOtp = () => {
    if (otpDigits.join('').length !== 4) { setOtpError('Please enter all 4 digits.'); return }
    setOtpVerified(true); setOtpError('')
    setTimeout(() => setPhase('success'), 700)
  }

  /* -- validation -- */
  const validate = (s) => {
    if (s === 1 && !intent) return 'Please select an option to continue.'
    if (s === 2) {
      if (!vehicleType)          return 'Please select the vehicle type.'
      if (!regNumber.trim())     return 'Please enter the registration number.'
      if (!regDate)              return 'Please select the registration date.'
      const today = new Date(); today.setHours(0, 0, 0, 0)
      const sel = new Date(regDate)
      if (sel > today)               return 'Registration date cannot be a future date.'
      if (sel < new Date('1980-01-01')) return 'Please enter a valid registration date after 1980.'
    }
    if (s === 3) {
      if (!name.trim())    return 'Please enter your full name.'
      if (!/^[6-9]\d{9}$/.test(mobile)) return 'Please enter a valid 10-digit mobile number.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.'
      if (!address.trim()) return 'Please enter your address.'
      if (!stateVal)       return 'Please select your state.'
      if (!district)       return 'Please select your district.'
      if (pincode.length !== 6) return 'Please enter a valid 6-digit pin code.'
      const pinErr = validatePincode(pincode, stateVal, district)
      if (pinErr) return pinErr
    }
    return null
  }

  const next = () => {
    const err = validate(step)
    if (err) { setError(err); return }
    setError('')
    if (step === TOTAL) { setPhase('otp'); return }
    setStep(s => s + 1)
  }
  const back = () => { setError(''); setStep(s => Math.max(s - 1, 1)) }

  const districts = stateVal ? getDistricts(stateVal) : []

  /* ── Success ── */
  if (phase === 'success') {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-head-top"><span /><div style={{ width: 32 }} /></div>
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
              <Check size={28} strokeWidth={2.5} color="#fff" />
            </div>
          </div>
          <h2 className="pf5-title">Thank You!</h2>
          <p className="pf5-sub">Your request has been Submitted.</p>
          <p className="pf5-sub">We appreciate your interest and will get back to you as soon as possible.</p>
          <div className="pf5-footer">
            <Link href="/" className="pf5-cta-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ── OTP ── */
  if (phase === 'otp') {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-head-top">
            <button className="pf5-close-btn" onClick={() => { setPhase('form'); setStep(TOTAL); setError('') }}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <span className="pf5-phase-lbl">OTP Verification</span>
            <div style={{ width: 32 }} />
          </div>
          {otpVerified ? (
            <div className="pf5-otp-ok"><Check size={15} strokeWidth={2.5} /> Mobile verified! Redirecting...</div>
          ) : (
            <div className="pf5-otp-body">
              <div className="pf5-otp-target">
                OTP sent to <span className="pf5-otp-num">+91 ******{mobile.slice(-4)}</span>
              </div>
              <label className="pf5-otp-lbl">Enter OTP <span className="pf5-ast">*</span></label>
              <div className="pf5-otp-boxes" onPaste={handleOtpPaste}>
                {otpDigits.map((d, i) => (
                  <input key={i} ref={el => otpRefs.current[i] = el}
                    className={`pf5-otp-box${d ? ' filled' : ''}`}
                    type="text" inputMode="numeric" maxLength={1} value={d}
                    onChange={e => handleOtpDigit(i, e.target.value)}
                    onKeyDown={e => handleOtpKey(i, e)}
                    onFocus={e => e.target.select()} />
                ))}
              </div>
              {otpError && <p className="pf5-otp-err">{otpError}</p>}
              <p className="pf5-otp-resend-txt">
                Not Received?{' '}
                {resendTimer > 0
                  ? <span>Resend in {resendTimer}s</span>
                  : <button className="pf5-otp-resend-link" onClick={startResendTimer}>Resend OTP</button>
                }
              </p>
              <button className="pf5-otp-verify-btn" onClick={verifyOtp}>Verify</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ── Main form ── */
  const { title, sub, Icon: StepIcon, gradient } = STEP_META[step - 1]

  return (
    <div className="pf5-page">
      <div className="pf5-breadcrumb">
        <Link href="/">Home</Link>
        <span> / </span>
        <Link href="/insurance">Insurance</Link>
        <span> / </span>
        <Link href="/commercial-vehicle-insurance">Commercial Vehicle Insurance</Link>
        <span> / </span>
        <span>Form</span>
      </div>
      <div className="pf5-card">

        {/* Step dots */}
        <div className="pf5-head-top">
          <div style={{ width: 32 }} />
          <div className="pf5-step-dots">
            {STEPS.map((lbl, i) => (
              <div key={lbl}
                className={`pf5-dot${i + 1 === step ? ' cur' : i + 1 < step ? ' done' : ''}`}
                title={lbl}
              />
            ))}
          </div>
          <div style={{ width: 32 }} />
        </div>

        {/* Icon */}
        <div className="pf5-icon-wrap">
          <div className="pf5-icon" style={{ background: gradient }}>
            <StepIcon size={26} strokeWidth={1.8} color="#fff" />
          </div>
        </div>

        <h2 className="pf5-title">{title}</h2>
        <p className="pf5-sub">{sub}</p>

        <div className="pf5-content">

          {/* Step 1 – Intent */}
          {step === 1 && (
            <div className="pf5-plan-list">
              {INTENT_OPTIONS.map(({ value, label, desc, color, bg, badge }) => (
                <label key={value} className={`pf5-plan${intent === value ? ' sel' : ''}`}
                  style={intent === value ? { borderColor: color, background: bg } : {}}>
                  <input type="radio" name="intent" checked={intent === value}
                    onChange={() => setIntent(value)} style={{ display: 'none' }} />
                  <div className={`pf5-plan-radio${intent === value ? ' sel' : ''}`}
                    style={intent === value ? { background: color, borderColor: color } : {}}>
                    {intent === value && <Check size={10} strokeWidth={3} color="#fff" />}
                  </div>
                  <div className="pf5-plan-body">
                    <div className="pf5-plan-name">
                      {label}
                      {badge && <span className="pf5-plan-badge" style={{ background: color }}>{badge}</span>}
                    </div>
                    <div className="pf5-plan-desc">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Step 2 – Vehicle Details */}
          {step === 2 && (
            <>
              <Field label="Vehicle Type">
                <ValidInp valid={vehicleType !== ''}>
                  <select className="pf5-inp" value={vehicleType}
                    onChange={e => { setVehicleType(e.target.value); setError('') }}>
                    <option value="">Select Vehicle Type</option>
                    {VEHICLE_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Registration Number">
                <ValidInp valid={regNumber.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter Registration Number"
                    value={regNumber} onChange={e => setRegNumber(e.target.value.toUpperCase())} />
                </ValidInp>
              </Field>
              <Field label="Registration Date">
                {(() => {
                  const today = new Date(); today.setHours(0,0,0,0)
                  const minDate = new Date('1980-01-01')
                  const selected = regDate ? new Date(regDate) : null
                  const isFuture = selected && selected > today
                  const isTooOld = selected && selected < minDate
                  const isValid  = selected && !isFuture && !isTooOld
                  return (
                    <>
                      <ValidInp valid={isValid}>
                        <input
                          className={`pf5-inp${(isFuture || isTooOld) ? ' pf5-inp-warn' : ''}`}
                          type="date"
                          max={today.toISOString().split('T')[0]}
                          min="1980-01-01"
                          value={regDate}
                          onChange={e => { setRegDate(e.target.value); setError('') }}
                        />
                      </ValidInp>
                      {isFuture && <div className="pf5-age-warn">⚠ Registration date cannot be a future date.</div>}
                      {isTooOld && <div className="pf5-age-warn">⚠ Please enter a valid registration date after 1980.</div>}
                    </>
                  )
                })()}
              </Field>
            </>
          )}

          {/* Step 3 – Contact */}
          {step === 3 && (
            <>
              <Field label="Name">
                <ValidInp valid={name.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter Your Name"
                    value={name} onChange={e => setName(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Mobile Number">
                {(() => {
                  const validMobile  = /^[6-9]\d{9}$/.test(mobile)
                  const invalidStart = mobile.length === 10 && !/^[6-9]/.test(mobile)
                  return (
                    <>
                      <ValidInp valid={validMobile} count={mobile.length > 0 && mobile.length < 10 ? `${mobile.length}/10` : null}>
                        <input
                          className={`pf5-inp${invalidStart ? ' pf5-inp-warn' : ''}`}
                          type="tel" placeholder="Enter Your Mobile Number"
                          maxLength={10} value={mobile}
                          onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError('') }}
                        />
                      </ValidInp>
                      {invalidStart && <div className="pf5-age-warn">⚠ Mobile number must start with 6, 7, 8, or 9.</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Email ID">
                {(() => {
                  const validEmail   = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)
                  const invalidEmail = email.length > 0 && !validEmail
                  return (
                    <>
                      <ValidInp valid={validEmail}>
                        <input
                          className={`pf5-inp${invalidEmail ? ' pf5-inp-warn' : ''}`}
                          type="email" placeholder="Enter Your Email ID"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setError('') }}
                        />
                      </ValidInp>
                      {invalidEmail && <div className="pf5-age-warn">⚠ Please enter a valid email address (e.g. name@example.com).</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Address">
                <ValidInp valid={address.trim().length > 0}>
                  <textarea className="pf5-inp" placeholder="Enter Your Address"
                    rows={3} style={{ resize: 'vertical', minHeight: 72 }}
                    value={address} onChange={e => setAddress(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="State">
                <ValidInp valid={stateVal !== ''}>
                  <select className="pf5-inp" value={stateVal}
                    onChange={e => { setStateVal(e.target.value); setDistrict('') }}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="District">
                <ValidInp valid={district !== ''}>
                  <select className="pf5-inp" value={district} disabled={!stateVal}
                    style={!stateVal ? { opacity: .5, cursor: 'not-allowed' } : {}}
                    onChange={e => setDistrict(e.target.value)}>
                    <option value="">{stateVal ? 'Select District' : 'Select state first'}</option>
                    {districts.map(d => <option key={d}>{d}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Pin Code">
                {(() => {
                  const pinErr   = pincode.length === 6 ? validatePincode(pincode, stateVal, district) : null
                  const pinValid = pincode.length === 6 && !pinErr
                  const pinWarn  = pincode.length === 6 && !!pinErr
                  return (
                    <>
                      <ValidInp valid={pinValid} count={pincode.length > 0 && pincode.length < 6 ? `${pincode.length}/6` : null}>
                        <input
                          className={`pf5-inp${pinWarn ? ' pf5-inp-warn' : ''}`}
                          type="text" placeholder="Enter Pin Code"
                          maxLength={6} value={pincode}
                          onChange={e => { setPincode(e.target.value.replace(/\D/g, '')); setError('') }}
                        />
                      </ValidInp>
                      {pinWarn && <div className="pf5-age-warn">⚠ {pinErr}</div>}
                    </>
                  )
                })()}
              </Field>
              <p className="pf5-toc">By continuing you agree to our <Link href="/terms-conditions">Terms</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.</p>
            </>
          )}
        </div>

        {error && <div className="pf5-error"><AlertCircle size={14} strokeWidth={2} /> {error}</div>}

        <div className="pf5-footer">
          <button className="pf5-cta-btn" onClick={next}>
            {step === TOTAL ? 'Submit' : 'Continue'} <ChevronRight size={17} />
          </button>
          {step > 1 && <button className="pf5-back-link" onClick={back}><ChevronLeft size={13} /> Back</button>}
        </div>

      </div>
    </div>
  )
}
