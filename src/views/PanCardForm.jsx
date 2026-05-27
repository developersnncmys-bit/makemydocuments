'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  CreditCard, User, Users, MapPin, Phone, Check,
  FileText, AlertCircle, Edit3, AlertTriangle, Wallet, IndianRupee, Building2,
  RefreshCw, ChevronRight, ChevronLeft, X, ArrowLeft
} from 'lucide-react'
import { getDistricts, getCities } from '../data/locationData'

const TOTAL = 5
const STEPS = ['Service','Personal','Parents','Address','Contact']

const STEP_META = [
  { title: 'Select Service',   sub: 'What are you applying for?',                      Icon: FileText,   gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Personal Details', sub: 'Enter details exactly as per your Aadhaar card',  Icon: User,       gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Parents Details',  sub: 'Required for PAN card printing and verification', Icon: Users,      gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Address Details',  sub: 'Your physical PAN card will arrive here',         Icon: MapPin,     gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Contact Details',  sub: "We'll send your e-PAN and updates here",         Icon: Phone,      gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
]

const SERVICE_OPTIONS = [
  { value: 'New Pan Card',           label: 'New PAN Card',          desc: 'First-time application for a PAN card',       Icon: CreditCard,    color: '#2E68B1', bg: '#EBF2FB', badge: 'Most Popular' },
  { value: 'Correction in Pan Card', label: 'Correction / Update',   desc: 'Fix name, date of birth, photo or signature', Icon: Edit3,         color: '#D97706', bg: '#FFFBEB', badge: null           },
  { value: 'Lost/Damage Pan Card',   label: 'Lost / Damaged Card',   desc: 'Reprint or replacement of existing PAN card', Icon: AlertTriangle, color: '#DC2626', bg: '#FEF2F2', badge: null           },
]

const BANKS  = ['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Kotak Mahindra Bank','Punjab National Bank','Bank of Baroda','Canara Bank','IndusInd Bank','Yes Bank']

// Valid pincode first-2-digit prefixes per state
const PINCODE_PREFIXES = {} // state-pincode matching disabled — only the 6-digit format is required

const isPincodeValidForState = (pin, state) => {
  if (!pin || pin.length !== 6 || !state || !PINCODE_PREFIXES[state]) return true
  const prefix = parseInt(pin.slice(0, 2))
  return PINCODE_PREFIXES[state].includes(prefix)
}
const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry']

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


export default function PanCardForm() {
  const [step,    setStep]    = useState(1)
  const [phase,   setPhase]   = useState('form') // 'form' | 'otp' | 'summary' | 'payment'
  const [error,   setError]   = useState('')

  const goPhase = (p) => { setPhase(p) }

  useEffect(() => {
    const base = window.location.pathname.replace(/\/(proceed-to-pay|otp-verification)$/, '')
    if (phase === 'otp') {
      window.history.replaceState(null, '', base + '/otp-verification')
    } else if (phase === 'summary') {
      window.history.replaceState(null, '', base + '/proceed-to-pay')
    } else {
      window.history.replaceState(null, '', base)
    }
  }, [phase])

  // Generate unique Order ID once
  const orderId = useMemo(() => {
    const ts  = Date.now().toString()
    const rnd = Math.floor(Math.random() * 9000 + 1000)
    return 'MMD' + ts + rnd
  }, [])

  // Form fields
  const [service,    setService]    = useState('')
  const [existingPan, setExistingPan] = useState('')
  const [name,      setName]      = useState('')
  const [gender,    setGender]    = useState('')
  const [dob,       setDob]       = useState('')
  const [father,    setFather]    = useState('')
  const [mother,    setMother]    = useState('')
  const [printName, setPrintName] = useState('')
  const [aadhaar,   setAadhaar]   = useState('')
  const [house,     setHouse]     = useState('')
  const [stateVal,  setStateVal]  = useState('')
  const [district,  setDistrict]  = useState('')
  const [cityVal,   setCityVal]   = useState('')
  const [pin,       setPin]       = useState('')
  const [mobile,    setMobile]    = useState('')
  const [email,     setEmail]     = useState('')


  // Payment
  const [payMethod, setPayMethod] = useState('upi')
  const [upiId,     setUpiId]     = useState('')
  const [cardNum,   setCardNum]   = useState('')
  const [cardName,  setCardName]  = useState('')
  const [cardExp,   setCardExp]   = useState('')
  const [cardCvv,   setCardCvv]   = useState('')
  const [bank,      setBank]      = useState('')
  const [payDone,   setPayDone]   = useState(false)

  const fmtCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExp  = v => { const d = v.replace(/\D/g,'').slice(0,4); return d.length >= 3 ? d.slice(0,2)+'/'+d.slice(2) : d }

  /* -- OTP state -- */
  const [otpDigits,   setOtpDigits]   = useState(['','','',''])
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpError,    setOtpError]    = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const otpRefs = useRef([])
  const otp = otpDigits.join('')

  /* -- OTP handlers -- */
  const startResendTimer = () => {
    setResendTimer(30)
    const t = setInterval(() => setResendTimer(p => { if (p <= 1) { clearInterval(t); return 0 } return p - 1 }), 1000)
  }
  const verifyOtp = () => {
    if (otp.length !== 4) { setOtpError('Please enter all 4 digits.'); return }
    setOtpVerified(true); setOtpError(''); setError('')
    setTimeout(() => goPhase('summary'), 700)
  }
  const handleOtpDigit = (i, val) => {
    const digit = val.replace(/\D/g,'').slice(-1)
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
    const pasted = e.clipboardData.getData('text').replace(/\D/g,'').slice(0, 4)
    if (pasted) {
      const next = pasted.split('').concat(['','','','']).slice(0, 4)
      setOtpDigits(next); setOtpError('')
      setTimeout(() => otpRefs.current[Math.min(pasted.length, 3)]?.focus(), 10)
      e.preventDefault()
    }
  }

  useEffect(() => { if (phase === 'otp') { setOtpDigits(['','','','']); setOtpVerified(false); setOtpError(''); startResendTimer() } }, [phase])

  const validateForStep = (s) => {
    if (s === 1 && !service) return { msg: 'Please select a service to continue.', step: 1 }
    if (s === 2) {
      if (service !== 'New Pan Card' && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(existingPan))
        return { msg: 'Please enter a valid 10-character PAN number (e.g. ABCDE1234F).', step: 2 }
      if (!name)   return { msg: 'Please enter your full name.',   step: 2 }
      if (!gender) return { msg: 'Please select your gender.',     step: 2 }
      if (!dob)    return { msg: 'Please enter your date of birth.', step: 2 }
      const dd = new Date(dob), td = new Date(); td.setHours(0,0,0,0)
      if (dd >= td) return { msg: 'Date of birth cannot be today or a future date.', step: 2 }
      const minAge = new Date(td); minAge.setFullYear(td.getFullYear() - 18)
      if (dd > minAge) return { msg: 'Applicant must be at least 18 years old.', step: 2 }
      if (!aadhaar || aadhaar.length !== 12) return { msg: 'Please enter a valid 12-digit Aadhaar number.', step: 2 }
    }
    if (s === 3) {
      if (!father)    return { msg: "Please enter father's name.",              step: 3 }
      if (!mother)    return { msg: "Please enter mother's name.",              step: 3 }
      if (!printName) return { msg: 'Please select name to print on PAN card.', step: 3 }
    }
    if (s === 4) {
      if (!house)    return { msg: 'Please enter your address.',    step: 4 }
      if (!stateVal) return { msg: 'Please select your state.',    step: 4 }
      if (!district) return { msg: 'Please select your district.', step: 4 }
      if (!pin || pin.length !== 6) return { msg: 'Please enter a valid 6-digit pin code.', step: 4 }
      if (!isPincodeValidForState(pin, stateVal)) return { msg: `Pincode ${pin} is not valid for ${stateVal}. Please enter a correct pincode.`, step: 4 }
    }
    if (s === 5) {
      if (!/^[6-9]\d{9}$/.test(mobile)) return { msg: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.', step: 5 }
      if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return { msg: 'Please enter a valid email address.', step: 5 }
    }
    return null
  }

  const validateUpToCurrent = () => {
    for (let s = 1; s <= step; s++) {
      const result = validateForStep(s)
      if (result) return result
    }
    return null
  }

  const validatePayment = () => {
    if (payMethod === 'upi' && !upiId) return 'Please enter your UPI ID.'
    if (payMethod === 'card') {
      if (cardNum.replace(/\s/g,'').length < 16) return 'Please enter a valid card number.'
      if (!cardName) return 'Please enter name on card.'
      if (cardExp.length < 5) return 'Please enter valid expiry (MM/YY).'
      if (cardCvv.length < 3) return 'Please enter valid CVV.'
    }
    if (payMethod === 'netbanking' && !bank) return 'Please select your bank.'
    return ''
  }

  const next = () => {
    const result = validateUpToCurrent()
    if (result) { setError(result.msg); setStep(result.step); return }
    setError('')
    if (step === TOTAL) { goPhase('otp'); return }
    setStep(s => s + 1)
  }
  const back = () => { setError(''); setStep(s => Math.max(s - 1, 1)) }

  const submitPayment = () => {
    const e = validatePayment(); if (e) { setError(e); return }
    setPayDone(true)
  }

  // -- Payment success --
  if (payDone) {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-head-top"><span /><div style={{width:32}}/></div>
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
              <Check size={28} strokeWidth={2.5} color="#fff" />
            </div>
          </div>
          <h2 className="pf5-title">Payment Successful!</h2>
          <p className="pf5-sub">Your PAN card application is submitted. Updates will be sent to <strong>{mobile}</strong>.</p>
          <div className="pf5-done-pills">
            <span>₹350 Paid</span><span>Submitted</span><span>Doorstep Delivery</span>
          </div>
          <div className="pf5-footer">
            <Link href="/pan-card" className="pf5-cta-btn" style={{ textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              ? Back to PAN Card
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // -- Payment page --
  if (phase === 'payment') {
    return (
      <div className="pf5-page">
        <div className="pf5-card">

          {/* Header */}
          <div className="pf5-head-top">
            <button className="pf5-close-btn" onClick={() => { goPhase('summary'); setError('') }}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <span className="pf5-phase-lbl">Secure Payment</span>
            <div style={{ width: 32 }} />
          </div>

          {/* Icon */}
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
              <Wallet size={26} strokeWidth={1.8} color="#fff" />
            </div>
          </div>

          <h2 className="pf5-title">Complete Payment</h2>
          <p className="pf5-sub">Secure checkout · ₹350 all-inclusive</p>

          {/* Content */}
          <div className="pf5-content">

            {/* Amount banner */}
            <div className="pf5-pay-banner">
              <span className="pf5-pay-label">Total Payable</span>
              <span className="pf5-pay-amount">₹350</span>
              <span className="pf5-pay-note">All charges included · No hidden fees</span>
            </div>

            {/* Method tabs */}
            <div className="pf5-pay-tabs">
              {[
                { id:'upi',        lbl:'UPI',               Icon: IndianRupee },
                { id:'card',       lbl:'Debit / Credit Card', Icon: CreditCard  },
                { id:'netbanking', lbl:'Net Banking',        Icon: Building2   },
              ].map(({ id, lbl, Icon }) => (
                <button key={id} className={`pf5-pay-tab${payMethod === id ? ' sel' : ''}`}
                  onClick={() => setPayMethod(id)}>
                  <Icon size={14} strokeWidth={1.8} /> {lbl}
                </button>
              ))}
            </div>

            {/* UPI */}
            {payMethod === 'upi' && (
              <Field label="UPI ID">
                <ValidInp valid={upiId.includes('@') && upiId.length > 4}>
                  <input className="pf5-inp" type="text" placeholder="yourname@upi"
                    value={upiId} onChange={e => setUpiId(e.target.value)} />
                </ValidInp>
                <span className="pf5-pay-hint">e.g. name@okicici, 9999999999@paytm</span>
              </Field>
            )}

            {/* Card */}
            {payMethod === 'card' && (
              <>
                <Field label="Card Number">
                  <ValidInp valid={cardNum.replace(/\s/g,'').length === 16}>
                    <input className="pf5-inp" type="text" placeholder="1234 5678 9012 3456"
                      maxLength={19} value={cardNum} onChange={e => setCardNum(fmtCard(e.target.value))} />
                  </ValidInp>
                </Field>
                <Field label="Name on Card">
                  <ValidInp valid={cardName.trim().length > 0}>
                    <input className="pf5-inp" type="text" placeholder="As printed on card"
                      value={cardName} onChange={e => setCardName(e.target.value)} />
                  </ValidInp>
                </Field>
                <div className="pf5-row2">
                  <Field label="Expiry">
                    <ValidInp valid={cardExp.length === 5}>
                      <input className="pf5-inp" type="text" placeholder="MM/YY" maxLength={5}
                        value={cardExp} onChange={e => setCardExp(fmtExp(e.target.value))} />
                    </ValidInp>
                  </Field>
                  <Field label="CVV">
                    <ValidInp valid={cardCvv.length === 3}>
                      <input className="pf5-inp" type="password" placeholder="•••" maxLength={3}
                        value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,''))} />
                    </ValidInp>
                  </Field>
                </div>
              </>
            )}

            {/* Net Banking */}
            {payMethod === 'netbanking' && (
              <Field label="Select Bank">
                <ValidInp valid={bank !== ''}>
                  <select className="pf5-inp" value={bank} onChange={e => setBank(e.target.value)}>
                    <option value="">Choose your bank</option>
                    {BANKS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </ValidInp>
              </Field>
            )}

            <p className="pf5-secure">?? 256-bit SSL encrypted · 100% secure payment</p>
          </div>

          {error && <div className="pf5-error"><AlertCircle size={14} strokeWidth={2} /> {error}</div>}

          {/* Footer */}
          <div className="pf5-footer">
            <p className="pf5-legal">
              By clicking Pay, you accept our <Link href="/terms-conditions">Terms</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>
            <button className="pf5-cta-btn pf5-pay" onClick={submitPayment}>
              <Check size={15} /> Pay ₹350 &amp; Submit
            </button>
          </div>

        </div>
      </div>
    )
  }

  // -- OTP page --
  if (phase === 'otp') {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-head-top">
            <button className="pf5-close-btn" onClick={() => { goPhase('form'); setStep(TOTAL); setError('') }}>
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
              {error && <div className="pf5-error" style={{ marginTop: 8 }}><AlertCircle size={14} strokeWidth={2} /> {error}</div>}
            </div>
          )}
        </div>
      </div>
    )
  }

  // -- Summary page --
  if (phase === 'summary') {
    return (
      <div className="pf5-page">
        <div className="pf5-summary-card">
          <h2 className="pf5-summary-title">Thank You for Your Submission!</h2>
          <p className="pf5-summary-sub">Please review your details before proceeding to payment.</p>

          <div className="pf5-summary-rows">
            {[
              { label: 'Name',           value: name      },
              { label: 'Mobile Number',  value: mobile    },
              { label: 'Email',          value: email     },
              { label: 'Order ID',       value: orderId   },
              { label: 'Service',        value: service   },
              { label: 'Payment Amount', value: '₹350'    },
            ].map(({ label, value }) => (
              <div key={label} className="pf5-summary-row">
                <span className="pf5-summary-lbl">{label}:</span>
                <div className="pf5-summary-val">{value}</div>
              </div>
            ))}
          </div>

          <button className="pf5-proceed-btn" onClick={() => { goPhase('payment'); setError('') }}>
            Proceed to Pay <ChevronRight size={18} />
          </button>
          <button className="pf5-back-link" style={{ marginTop: 8 }} onClick={() => goPhase('otp')}>
            <ArrowLeft size={13} /> Back
          </button>
        </div>
      </div>
    )
  }

  // -- Main form (steps 1–5) --
  const { title, sub, Icon: StepIcon, gradient } = STEP_META[step - 1]

  return (
    <div className="pf5-page">
      <div className="pf5-breadcrumb">
        <Link href="/">Home</Link><span> / </span><Link href="/pan-card">PAN Card</Link><span> / </span><span>Form</span>
      </div>
      <div className="pf5-card">

        {/* Top: dots */}
        <div className="pf5-head-top">
          <div style={{ width: 32 }} />
          <div className="pf5-step-dots">
            {STEPS.map((lbl, i) => (
              <div key={lbl}
                className={`pf5-dot${i + 1 === step ? ' cur' : i + 1 < step ? ' done' : ''}`}
                onClick={() => { setError(''); setStep(i + 1) }}
                title={lbl}
              />
            ))}
          </div>
          <div style={{ width: 32 }} />
        </div>

        {/* Gradient icon */}
        <div className="pf5-icon-wrap">
          <div className="pf5-icon" style={{ background: gradient }}>
            <StepIcon size={26} strokeWidth={1.8} color="#fff" />
          </div>
        </div>

        <h2 className="pf5-title">{title}</h2>
        <p className="pf5-sub">{sub}</p>

        <div className="pf5-content">

          {/* Step 1 – Service */}
          {step === 1 && (
            <div className="pf5-plan-list">
              {SERVICE_OPTIONS.map(({ value, label, desc, color, bg, badge }) => (
                <label key={value} className={`pf5-plan${service === value ? ' sel' : ''}`}
                  style={service === value ? { borderColor: color, background: bg } : {}}>
                  <input type="radio" name="svc" checked={service === value}
                    onChange={() => setService(value)} style={{ display:'none' }} />
                  <div className={`pf5-plan-radio${service === value ? ' sel' : ''}`}
                    style={service === value ? { background: color, borderColor: color } : {}}>
                    {service === value && <Check size={10} strokeWidth={3} color="#fff" />}
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

          {/* Step 2 – Personal */}
          {step === 2 && (
            <>
              {service !== 'New Pan Card' && (
                <Field label="Existing PAN Card Number">
                  <ValidInp valid={/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(existingPan)} count={existingPan.length > 0 && existingPan.length < 10 ? `${existingPan.length}/10` : null}>
                    <input className="pf5-inp" type="text" placeholder="ABCDE1234F" maxLength={10}
                      value={existingPan}
                      onChange={e => { setExistingPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'')); setError('') }} />
                  </ValidInp>
                </Field>
              )}
              <Field label="Full Name (As Per Aadhaar)">
                <ValidInp valid={name.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Gender">
                <div className="pf5-radio-row">
                  {['Female','Male','Transgender'].map(g => (
                    <label key={g} className={`pf5-radio-opt${gender === g ? ' sel' : ''}`}>
                      <input type="radio" name="gender" checked={gender === g} onChange={() => setGender(g)} style={{ display:'none' }} />
                      {gender === g && <Check size={9} strokeWidth={3} />} {g}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Date of Birth">
                {(() => {
                  const dd = dob ? new Date(dob) : null
                  const td = new Date(); td.setHours(0,0,0,0)
                  const minAge = new Date(td); minAge.setFullYear(td.getFullYear() - 18)
                  const valid = dd && dd < td && dd <= minAge
                  return (
                    <ValidInp valid={valid}>
                      <input className="pf5-inp" type="date" value={dob}
                        max={td.toISOString().split('T')[0]}
                        onChange={e => { setDob(e.target.value); setError('') }} />
                    </ValidInp>
                  )
                })()}
              </Field>
              <Field label="Aadhaar Number">
                <ValidInp valid={aadhaar.length === 12} count={aadhaar.length > 0 ? `${aadhaar.length}/12` : null}>
                  <input className="pf5-inp" type="text" placeholder="12-digit Aadhaar number" maxLength={12}
                    value={aadhaar} onChange={e => setAadhaar(e.target.value.replace(/\D/g,''))} />
                </ValidInp>
              </Field>
            </>
          )}

          {/* Step 3 – Parents */}
          {step === 3 && (
            <>
              <Field label="Father's Name">
                <ValidInp valid={father.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Father's full name" value={father} onChange={e => setFather(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Mother's Name">
                <ValidInp valid={mother.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Mother's full name" value={mother} onChange={e => setMother(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Name to Print on PAN Card">
                <div className="pf5-radio-row">
                  {['Father','Mother'].map(p => (
                    <label key={p} className={`pf5-radio-opt${printName === p ? ' sel' : ''}`}>
                      <input type="radio" name="print" checked={printName === p} onChange={() => setPrintName(p)} style={{ display:'none' }} />
                      {printName === p && <Check size={9} strokeWidth={3} />} {p}
                    </label>
                  ))}
                </div>
              </Field>
            </>
          )}

          {/* Step 4 – Address */}
          {step === 4 && (
            <>
              <Field label="Address">
                <ValidInp valid={house.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="House no., street name, area" value={house} onChange={e => setHouse(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="State">
                <ValidInp valid={stateVal !== ''}>
                  <select className="pf5-inp" value={stateVal} onChange={e => { setStateVal(e.target.value); setDistrict(''); setCityVal('') }}>
                    <option value="">Select state</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="District">
                <ValidInp valid={district !== ''}>
                  <select className="pf5-inp" value={district} disabled={!stateVal}
                    onChange={e => { setDistrict(e.target.value); setCityVal('') }}
                    style={!stateVal ? { opacity:.5, cursor:'not-allowed' } : {}}>
                    <option value="">{stateVal ? 'Select district' : 'Select state first'}</option>
                    {getDistricts(stateVal).map(d => <option key={d}>{d}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Pin Code">
                {(() => {
                  const pinValid = pin.length === 6 && isPincodeValidForState(pin, stateVal)
                  const pinMismatch = pin.length === 6 && stateVal && !isPincodeValidForState(pin, stateVal)
                  return (
                    <>
                      <ValidInp valid={pinValid} count={pin.length > 0 && pin.length < 6 ? `${pin.length}/6` : null}>
                        <input
                          className={`pf5-inp${pinMismatch ? ' pf5-inp-warn' : ''}`}
                          type="text" placeholder="6-digit pin code" maxLength={6}
                          value={pin} onChange={e => { setPin(e.target.value.replace(/\D/g,'')); setError('') }} />
                      </ValidInp>
                      {pinMismatch && (
                        <div className="pf5-age-warn">
                          ? This pincode does not match <strong>{stateVal}</strong>. Please enter a valid pincode for the selected state.
                        </div>
                      )}
                    </>
                  )
                })()}
              </Field>
            </>
          )}

          {/* Step 5 – Contact */}
          {step === 5 && (
            <>
              <Field label="Mobile Number">
                {(() => {
                  const validMobile  = /^[6-9]\d{9}$/.test(mobile)
                  const invalidStart = mobile.length === 10 && !/^[6-9]/.test(mobile)
                  return (
                    <>
                      <ValidInp
                        valid={validMobile}
                        count={mobile.length > 0 && mobile.length < 10 ? `${mobile.length}/10` : null}
                      >
                        <input
                          className={`pf5-inp${invalidStart ? ' pf5-inp-warn' : ''}`}
                          type="tel" placeholder="10-digit mobile number" maxLength={10}
                          value={mobile}
                          onChange={e => { setMobile(e.target.value.replace(/\D/g,'')); setError('') }}
                        />
                      </ValidInp>
                      {invalidStart && (
                        <div className="pf5-age-warn">
                          ? Invalid number.
                        </div>
                      )}
                    </>
                  )
                })()}
              </Field>
              <Field label="Email Address">
                {(() => {
                  const validEmail   = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)
                  const invalidEmail = email.length > 0 && !validEmail
                  return (
                    <>
                      <ValidInp valid={validEmail}>
                        <input
                          className={`pf5-inp${invalidEmail ? ' pf5-inp-warn' : ''}`}
                          type="email" placeholder="your@email.com"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setError('') }}
                        />
                      </ValidInp>
                      {invalidEmail && (
                        <div className="pf5-age-warn">
                          ? Please enter a valid email address (e.g. name@example.com).
                        </div>
                      )}
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
            Continue <ChevronRight size={17} />
          </button>
          {step > 1 && <button className="pf5-back-link" onClick={back}><ChevronLeft size={13} /> Back</button>}
        </div>

      </div>
    </div>
  )
}
