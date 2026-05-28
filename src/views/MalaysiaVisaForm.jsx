'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import useStepBackButton from '../hooks/useStepBackButton'
import Link from 'next/link'
import {
  Globe, Phone, Check, AlertCircle,
  Wallet, IndianRupee, CreditCard, Building2,
  ChevronRight, ChevronLeft, ArrowLeft,
} from 'lucide-react'
import { getDistricts } from '../data/locationData'

/* --- Constants --------------------------------------- */

const TOTAL = 2
const STEPS = ['Application', 'Contact']

const STEP_META = [
  { title: 'Application',    sub: 'Enter your travel dates, name and gender',    Icon: Globe,  gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Contact Details', sub: 'Enter your contact and address information', Icon: Phone,  gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
]

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand',
  'West Bengal','Andaman and Nicobar Islands','Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir',
  'Ladakh','Lakshadweep','Puducherry',
]

const PINCODE_PREFIXES = {} // state-pincode matching disabled — only the 6-digit format is required

const validPin = (pin, state) => {
  if (!pin || pin.length !== 6 || !state || !PINCODE_PREFIXES[state]) return true
  return PINCODE_PREFIXES[state].includes(parseInt(pin.slice(0, 2)))
}

const BANKS = ['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Kotak Mahindra Bank','Punjab National Bank','Bank of Baroda','Canara Bank','IndusInd Bank','Yes Bank']


/* --- Sub-components ---------------------------------- */

function Field({ label, children }) {
  return (
    <div className="pf5-field">
      <label className="pf5-lbl">{label}<span className="pf5-ast"> *</span></label>
      {children}
    </div>
  )
}

function ValidInp({ valid, count, children }) {
  return (
    <div className="pf5-inp-wrap">
      {children}
      {valid  && <span className="pf5-tick"><Check size={11} strokeWidth={3} /></span>}
      {count && !valid && <span className="pf5-count">{count}</span>}
    </div>
  )
}

/* --- Main component ---------------------------------- */

export default function MalaysiaVisaForm() {
  const [step,  setStep]   = useState(1)
  useStepBackButton(step, setStep)
  const [phase, setPhase]  = useState('form')
  const [error, setError]  = useState('')

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

  const orderId = useMemo(() => {
    const ts  = Date.now().toString()
    const rnd = Math.floor(Math.random() * 9000 + 1000)
    return 'MMD' + ts + rnd
  }, [])

  /* -- Form state -- */
  const [travelDate, setTravelDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [name,       setName]       = useState('')
  const [gender,     setGender]     = useState('')
  const [mobile,     setMobile]     = useState('')
  const [email,      setEmail]      = useState('')
  const [address,    setAddress]    = useState('')
  const [addrState,  setAddrState]  = useState('')
  const [district,   setDistrict]   = useState('')
  const [pinCode,    setPinCode]    = useState('')

  /* -- Payment state -- */
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

  useEffect(() => {
    if (phase === 'otp') {
      setOtpDigits(['','','','']); setOtpVerified(false); setOtpError(''); startResendTimer()
    }
  }, [phase])

  /* -- Validation -- */
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const todayStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` })()

  const validateStep = (s) => {
    if (s === 1) {
      if (!travelDate) return { msg: 'Please select your travelling date.', step: 1 }
      if (new Date(travelDate) < today) return { msg: '', step: 1 }
      if (!returnDate) return { msg: 'Please select your returning date.', step: 1 }
      if (new Date(returnDate) < today) return { msg: '', step: 1 }
      if (new Date(returnDate) <= new Date(travelDate)) return { msg: '', step: 1 }
      if (!name.trim()) return { msg: 'Please enter your full name.', step: 1 }
      if (!gender) return { msg: 'Please select your gender.', step: 1 }
    }
    if (s === 2) {
      if (!/^[6-9]\d{9}$/.test(mobile)) return { msg: 'Please enter a valid 10-digit mobile number starting with 6–9.', step: 2 }
      if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return { msg: 'Please enter a valid email address.', step: 2 }
      if (!address.trim()) return { msg: 'Please enter your address.', step: 2 }
      if (!addrState) return { msg: 'Please select your state.', step: 2 }
      if (!district) return { msg: 'Please select your district.', step: 2 }
      if (!pinCode || pinCode.length !== 6) return { msg: 'Please enter a valid 6-digit pin code.', step: 2 }
      if (!validPin(pinCode, addrState)) return { msg: `Pin code ${pinCode} is not valid for ${addrState}.`, step: 2 }
    }
    return null
  }

  const validateAll = () => {
    for (let s = 1; s <= TOTAL; s++) {
      const r = validateStep(s); if (r) return r
    }
    return null
  }

  const validatePayment = () => {
    if (payMethod === 'upi' && !upiId) return 'Please enter your UPI ID.'
    if (payMethod === 'card') {
      if (cardNum.replace(/\s/g,'').length < 16) return 'Please enter a valid 16-digit card number.'
      if (!cardName) return 'Please enter the name on card.'
      if (cardExp.length < 5) return 'Please enter a valid expiry (MM/YY).'
      if (cardCvv.length < 3) return 'Please enter a valid CVV.'
    }
    if (payMethod === 'netbanking' && !bank) return 'Please select your bank.'
    return ''
  }

  const next = () => {
    const r = step === TOTAL ? validateAll() : validateStep(step)
    if (r) { setError(r.msg); setStep(r.step); return }
    setError('')
    if (step === TOTAL) { goPhase('otp'); return }
    setStep(s => s + 1)
  }
  const back = () => { setError(''); setStep(s => Math.max(s - 1, 1)) }

  const submitPayment = () => {
    const e = validatePayment(); if (e) { setError(e); return }
    setPayDone(true)
  }

  /* -- Payment success -- */
  if (payDone) {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-head-top"><span /><div style={{ width: 32 }} /></div>
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
              <Check size={28} strokeWidth={2.5} color="#fff" />
            </div>
          </div>
          <h2 className="pf5-title">Payment Successful!</h2>
          <p className="pf5-sub">Your Malaysia Tourist Visa application is submitted. Updates will be sent to <strong>{mobile}</strong>.</p>
          <div className="pf5-done-pills">
            <span>₹99 Paid</span><span>Submitted</span><span>Processing</span>
          </div>
          <div className="pf5-footer">
            <Link href="/malaysia-visa" className="pf5-cta-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              ? Back to Malaysia Visa
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* -- Payment page -- */
  if (phase === 'payment') {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-head-top">
            <button className="pf5-close-btn" onClick={() => { goPhase('summary'); setError('') }}>
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
            <span className="pf5-phase-lbl">Secure Payment</span>
            <div style={{ width: 32 }} />
          </div>
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
              <Wallet size={26} strokeWidth={1.8} color="#fff" />
            </div>
          </div>
          <h2 className="pf5-title">Complete Payment</h2>
          <p className="pf5-sub">Secure checkout · ₹99 booking fee</p>
          <div className="pf5-content">
            <div className="pf5-pay-banner">
              <span className="pf5-pay-label">Booking Fee</span>
              <span className="pf5-pay-amount">₹99</span>
              <span className="pf5-pay-note">Balance payable after document verification</span>
            </div>
            <div className="pf5-pay-tabs">
              {[
                { id: 'upi',        lbl: 'UPI',                Icon: IndianRupee },
                { id: 'card',       lbl: 'Debit / Credit Card', Icon: CreditCard  },
                { id: 'netbanking', lbl: 'Net Banking',          Icon: Building2   },
              ].map(({ id, lbl, Icon }) => (
                <button key={id} className={`pf5-pay-tab${payMethod === id ? ' sel' : ''}`}
                  onClick={() => setPayMethod(id)}>
                  <Icon size={14} strokeWidth={1.8} /> {lbl}
                </button>
              ))}
            </div>
            {payMethod === 'upi' && (
              <Field label="UPI ID">
                <ValidInp valid={upiId.includes('@') && upiId.length > 4}>
                  <input className="pf5-inp" type="text" placeholder="yourname@upi"
                    value={upiId} onChange={e => setUpiId(e.target.value)} />
                </ValidInp>
                <span className="pf5-pay-hint">e.g. name@okicici, 9999999999@paytm</span>
              </Field>
            )}
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
          <div className="pf5-footer">
            <p className="pf5-legal">By clicking Pay, you accept our <Link href="/terms-conditions">Terms</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.</p>
            <button className="pf5-cta-btn pf5-pay" onClick={submitPayment}>
              <Check size={15} /> Pay ₹99 &amp; Submit
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* -- OTP page -- */
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

  /* -- Summary page -- */
  if (phase === 'summary') {
    return (
      <div className="pf5-page">
        <div className="pf5-summary-card">
          <h2 className="pf5-summary-title">Thank You for Your Submission!</h2>
          <p className="pf5-summary-sub">Please review your details before proceeding to payment.</p>
          <div className="pf5-summary-rows">
            {[
              { label: 'Name',                 value: name    },
              { label: 'Mobile Number',        value: mobile  },
              { label: 'Order ID',             value: orderId },
              { label: 'Services',             value: 'Malaysia Tourist Visa' },
              { label: 'Amount (Booking Fee)', value: '₹99'  },
            ].map(({ label, value }) => (
              <div key={label} className="pf5-summary-row">
                <span className="pf5-summary-lbl">{label}:</span>
                <div className="pf5-summary-val">{value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink3)', textAlign: 'center', marginBottom: 16 }}>
            You can pay the balance amount post documents verification by our consultant.
          </p>
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

  /* -- Main form (steps 1–2) -- */
  const { title, sub, Icon: StepIcon, gradient } = STEP_META[step - 1]

  return (
    <div className="pf5-page">
      <div className="pf5-breadcrumb">
        <Link href="/">Home</Link><span> / </span><Link href="/malaysia-visa">Malaysia Visa</Link><span> / </span><span>Form</span>
      </div>
      <div className="pf5-card">

        {/* Step dots */}
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

        {/* Icon */}
        <div className="pf5-icon-wrap">
          <div className="pf5-icon" style={{ background: gradient }}>
            <StepIcon size={26} strokeWidth={1.8} color="#fff" />
          </div>
        </div>

        <h2 className="pf5-title">{title}</h2>
        <p className="pf5-sub">{sub}</p>

        <div className="pf5-content">

          {/* -- Step 1: Application -- */}
          {step === 1 && (
            <>
              <Field label="Travelling Date">
                {(() => {
                  const isPast  = travelDate !== '' && new Date(travelDate) < today
                  const isValid = travelDate !== '' && new Date(travelDate) >= today
                  return (
                    <>
                      <ValidInp valid={isValid}>
                        <input
                          className={`pf5-inp${isPast ? ' pf5-inp-warn' : ''}`}
                          type="date"
                          min={todayStr}
                          value={travelDate}
                          onChange={e => { setTravelDate(e.target.value); setReturnDate(''); setError('') }}
                        />
                      </ValidInp>
                      {isPast && <div className="pf5-age-warn">? Travelling date must be today or a future date.</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Returning Date">
                {(() => {
                  const minReturn = travelDate
                    ? new Date(new Date(travelDate).getTime() + 86400000).toISOString().split('T')[0]
                    : todayStr
                  const isNotAfter = returnDate !== '' && travelDate !== '' && new Date(returnDate) <= new Date(travelDate)
                  const isValid    = returnDate !== '' && travelDate !== '' && new Date(returnDate) > new Date(travelDate)
                  return (
                    <>
                      <ValidInp valid={isValid}>
                        <input
                          className={`pf5-inp${isNotAfter ? ' pf5-inp-warn' : ''}`}
                          type="date"
                          min={minReturn}
                          value={returnDate}
                          onChange={e => { setReturnDate(e.target.value); setError('') }}
                        />
                      </ValidInp>
                      {isNotAfter && <div className="pf5-age-warn">? Returning date must be after the travelling date.</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Name">
                <ValidInp valid={name.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter your full name"
                    value={name} onChange={e => setName(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Gender">
                <div className="pf5-radio-row">
                  {['Male', 'Female', 'Transgender'].map(g => (
                    <label key={g} className={`pf5-radio-opt${gender === g ? ' sel' : ''}`}>
                      <input type="radio" name="gender" checked={gender === g}
                        onChange={() => setGender(g)} style={{ display: 'none' }} />
                      {gender === g && <Check size={9} strokeWidth={3} />} {g}
                    </label>
                  ))}
                </div>
              </Field>
            </>
          )}

          {/* -- Step 2: Contact Details -- */}
          {step === 2 && (
            <>
              <Field label="Mobile Number">
                {(() => {
                  const valid        = /^[6-9]\d{9}$/.test(mobile)
                  const invalidStart = mobile.length === 10 && !/^[6-9]/.test(mobile)
                  return (
                    <>
                      <ValidInp valid={valid} count={mobile.length > 0 && mobile.length < 10 ? `${mobile.length}/10` : null}>
                        <input className={`pf5-inp${invalidStart ? ' pf5-inp-warn' : ''}`}
                          type="tel" placeholder="Enter your mobile number" maxLength={10}
                          value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g,'')); setError('') }} />
                      </ValidInp>
                      {invalidStart && <div className="pf5-age-warn">? Invalid number.</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Email ID">
                {(() => {
                  const valid   = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)
                  const invalid = email.length > 0 && !valid
                  return (
                    <>
                      <ValidInp valid={valid}>
                        <input className={`pf5-inp${invalid ? ' pf5-inp-warn' : ''}`}
                          type="email" placeholder="Enter your email address"
                          value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
                      </ValidInp>
                      {invalid && <div className="pf5-age-warn">? Please enter a valid email address.</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Address">
                <ValidInp valid={address.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter your address"
                    value={address} onChange={e => setAddress(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="State">
                <ValidInp valid={addrState !== ''}>
                  <select className="pf5-inp" value={addrState}
                    onChange={e => { setAddrState(e.target.value); setDistrict(''); setPinCode('') }}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="District">
                <ValidInp valid={district !== ''}>
                  <select className="pf5-inp" value={district}
                    disabled={!addrState}
                    onChange={e => setDistrict(e.target.value)}
                    style={!addrState ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
                    <option value="">{addrState ? 'Select District' : 'Select state first'}</option>
                    {getDistricts(addrState).map(d => <option key={d}>{d}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Pin Code">
                {(() => {
                  const ok       = pinCode.length === 6 && validPin(pinCode, addrState)
                  const mismatch = pinCode.length === 6 && addrState && !validPin(pinCode, addrState)
                  return (
                    <>
                      <ValidInp valid={ok} count={pinCode.length > 0 && pinCode.length < 6 ? `${pinCode.length}/6` : null}>
                        <input className={`pf5-inp${mismatch ? ' pf5-inp-warn' : ''}`}
                          type="text" placeholder="Enter Pin Code" maxLength={6}
                          value={pinCode} onChange={e => { setPinCode(e.target.value.replace(/\D/g,'')); setError('') }} />
                      </ValidInp>
                      {mismatch && <div className="pf5-age-warn">? Pincode doesn't match <strong>{addrState}</strong>.</div>}
                    </>
                  )
                })()}
              </Field>
              <p className="pf5-toc">
                By clicking submit, you agree to our{' '}
                <Link href="/terms-conditions">Terms &amp; Conditions</Link> and{' '}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </>
          )}

        </div>

        {error && <div className="pf5-error"><AlertCircle size={14} strokeWidth={2} /> {error}</div>}

        <div className="pf5-footer">
          <button className="pf5-cta-btn" onClick={next}>
            {step === TOTAL ? 'Submit' : 'Next'} <ChevronRight size={17} />
          </button>
          {step > 1 && <button className="pf5-back-link" onClick={back}><ChevronLeft size={13} /> Back</button>}
        </div>

      </div>
    </div>
  )
}
