'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  FileText, Home, Users, MapPin, Phone, Check,
  AlertCircle, Wallet, IndianRupee,
  CreditCard, Building2, ChevronRight, ChevronLeft, ArrowLeft,
  Calendar, ClipboardList,
} from 'lucide-react'

/* --- Constants --------------------------------------- */

const TOTAL = 7
const STEPS = ['Type', 'Role', 'Owner', 'Tenant', 'Info', 'Details', 'Contact']

const STEP_META = [
  { title: 'Agreement Type',     sub: 'Select the type of lease agreement',           Icon: FileText,      gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Role & Stamp Paper', sub: 'Choose your role and stamp paper value',        Icon: ClipboardList, gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: "Owner's Details",    sub: "Enter the owner's details carefully",           Icon: Home,          gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: "Tenant's Details",   sub: "Enter the tenant's details carefully",          Icon: Users,         gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Other Info',         sub: 'Details about the property and lease terms',    Icon: MapPin,        gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Additional Details', sub: 'Advance, charges, and accommodation details',   Icon: Calendar,      gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
  { title: 'Contact Details',    sub: 'Where should we deliver your agreement?',       Icon: Phone,         gradient: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' },
]

const LEASE_TYPES = [
  { value: 'Flat/House Lease Agreement',           label: 'Flat/House Lease Agreement',           desc: 'For residential properties like flats, houses and apartments', color: '#2E68B1', bg: '#EBF2FB', badge: 'Most Popular' },
  { value: 'Commercial Office/Shop Lease Agreement', label: 'Commercial Office/Shop Lease Agreement', desc: 'For offices, shops, and commercial spaces',                    color: '#059669', bg: '#ECFDF5', badge: null           },
]

const STAMP_PAPERS  = ['Rs. 100', 'Rs. 200', 'Rs. 300', 'Rs. 500']
const PAINTING_OPTS = ['Applicable', 'Not Applicable']
const BANKS         = ['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Kotak Mahindra Bank','Punjab National Bank','Bank of Baroda','Canara Bank','IndusInd Bank','Yes Bank']

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand',
  'West Bengal','Andaman and Nicobar Islands','Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir',
  'Ladakh','Lakshadweep','Puducherry',
]

const PINCODE_PREFIXES = {
  'Andhra Pradesh':[50,51,52,53],'Arunachal Pradesh':[79],'Assam':[78],
  'Bihar':[80,81,82,83,84,85],'Chhattisgarh':[49],'Goa':[40],
  'Gujarat':[36,37,38,39],'Haryana':[12,13],'Himachal Pradesh':[17],
  'Jharkhand':[81,82,83,84,85],'Karnataka':[56,57,58,59],'Kerala':[67,68,69],
  'Madhya Pradesh':[45,46,47,48],'Maharashtra':[40,41,42,43,44],
  'Manipur':[79],'Meghalaya':[79],'Mizoram':[79],'Nagaland':[79],
  'Odisha':[75,76,77],'Punjab':[14,15,16],'Rajasthan':[30,31,32,33,34],
  'Sikkim':[73],'Tamil Nadu':[60,61,62,63,64],'Telangana':[50],'Tripura':[79],
  'Uttar Pradesh':[20,21,22,23,24,25,26,27,28],'Uttarakhand':[24,26],
  'West Bengal':[70,71,72,73,74],'Andaman and Nicobar Islands':[74],
  'Chandigarh':[16],'Dadra and Nagar Haveli and Daman and Diu':[39],
  'Delhi':[11],'Jammu and Kashmir':[18,19],'Ladakh':[19],'Lakshadweep':[68],'Puducherry':[60],
}

const validPin = (pin, state) => {
  if (!pin || pin.length !== 6 || !state || !PINCODE_PREFIXES[state]) return true
  return PINCODE_PREFIXES[state].includes(parseInt(pin.slice(0, 2)))
}


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

export default function LeaseAgreementForm() {
  const [step,  setStep]   = useState(1)
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
  const [leaseType,        setLeaseType]        = useState('')
  const [role,             setRole]             = useState('')
  const [stampPaper,       setStampPaper]       = useState('')
  const [ownerName,        setOwnerName]        = useState('')
  const [ownerFather,      setOwnerFather]      = useState('')
  const [ownerAddress,     setOwnerAddress]     = useState('')
  const [ownerState,       setOwnerState]       = useState('')
  const [ownerPin,         setOwnerPin]         = useState('')
  const [tenantName,       setTenantName]       = useState('')
  const [tenantFather,     setTenantFather]     = useState('')
  const [tenantAddress,    setTenantAddress]    = useState('')
  const [tenantState,      setTenantState]      = useState('')
  const [tenantPin,        setTenantPin]        = useState('')
  const [shiftedDate,      setShiftedDate]      = useState('')
  const [shiftingAddress,  setShiftingAddress]  = useState('')
  const [securityDeposit,  setSecurityDeposit]  = useState('')
  const [monthlyRent,      setMonthlyRent]      = useState('')
  const [safetyDeposit,    setSafetyDeposit]    = useState('')
  const [advancePaid,      setAdvancePaid]      = useState('')
  const [waterCharges,     setWaterCharges]     = useState('')
  const [paintingCharges,  setPaintingCharges]  = useState('')
  const [accommodation,    setAccommodation]    = useState('')
  const [appliances,       setAppliances]       = useState('')
  const [shippingAddress,  setShippingAddress]  = useState('')
  const [shippingState,    setShippingState]    = useState('')
  const [shippingPin,      setShippingPin]      = useState('')
  const [mobile,           setMobile]           = useState('')
  const [email,            setEmail]            = useState('')


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

  useEffect(() => { if (phase === 'otp') { setOtpDigits(['','','','']); setOtpVerified(false); setOtpError(''); startResendTimer() } }, [phase])

  /* -- Validation -- */
  const validateStep = (s) => {
    if (s === 1 && !leaseType) return { msg: 'Please select a lease agreement type.', step: 1 }
    if (s === 2) {
      if (!role)       return { msg: 'Please select your role (Owner or Tenant).', step: 2 }
      if (!stampPaper) return { msg: 'Please select the required stamp paper value.', step: 2 }
    }
    if (s === 3) {
      if (!ownerName)    return { msg: "Please enter the owner's name and age.",    step: 3 }
      if (!ownerFather)  return { msg: "Please enter the owner's father's name.",   step: 3 }
      if (!ownerAddress) return { msg: "Please enter the owner's address.",         step: 3 }
      if (!ownerState)   return { msg: "Please select the owner's state.",          step: 3 }
      if (!ownerPin || ownerPin.length !== 6) return { msg: 'Please enter a valid 6-digit pin code for owner.', step: 3 }
      if (!validPin(ownerPin, ownerState)) return { msg: `Pin code ${ownerPin} is not valid for ${ownerState}.`, step: 3 }
    }
    if (s === 4) {
      if (!tenantName)    return { msg: "Please enter the tenant's name and age.",    step: 4 }
      if (!tenantFather)  return { msg: "Please enter the tenant's father's name.",   step: 4 }
      if (!tenantAddress) return { msg: "Please enter the tenant's address.",         step: 4 }
      if (!tenantState)   return { msg: "Please select the tenant's state.",          step: 4 }
      if (!tenantPin || tenantPin.length !== 6) return { msg: 'Please enter a valid 6-digit pin code for tenant.', step: 4 }
      if (!validPin(tenantPin, tenantState)) return { msg: `Pin code ${tenantPin} is not valid for ${tenantState}.`, step: 4 }
    }
    if (s === 5) {
      if (!shiftedDate)    return { msg: 'Please select the shifted date.', step: 5 }
      if (!shiftingAddress) return { msg: 'Please enter the shifting address.', step: 5 }
      if (!securityDeposit || isNaN(securityDeposit) || Number(securityDeposit) <= 0)
        return { msg: 'Security Deposit must be a valid positive number.', step: 5 }
      if (!monthlyRent || isNaN(monthlyRent) || Number(monthlyRent) <= 0)
        return { msg: 'Monthly Rent must be a valid positive number.', step: 5 }
      if (!safetyDeposit || isNaN(safetyDeposit) || Number(safetyDeposit) <= 0)
        return { msg: 'Safety Deposit must be a valid positive number.', step: 5 }
    }
    if (s === 6) {
      if (!advancePaid)     return { msg: 'Please select how the advance was paid.', step: 6 }
      if (!waterCharges)    return { msg: 'Please select the water charges option.', step: 6 }
      if (!paintingCharges) return { msg: 'Please select the painting charges option.', step: 6 }
      if (!accommodation)   return { msg: 'Please enter accommodation details.', step: 6 }
      if (!appliances)      return { msg: 'Please enter appliances/fittings details.', step: 6 }
    }
    if (s === 7) {
      if (!shippingAddress) return { msg: 'Please enter the shipping address.', step: 7 }
      if (!shippingState)   return { msg: 'Please select the shipping state.', step: 7 }
      if (!shippingPin || shippingPin.length !== 6) return { msg: 'Please enter a valid 6-digit shipping pin code.', step: 7 }
      if (!validPin(shippingPin, shippingState)) return { msg: `Pin code ${shippingPin} is not valid for ${shippingState}.`, step: 7 }
      if (!/^[6-9]\d{9}$/.test(mobile)) return { msg: 'Please enter a valid 10-digit mobile number starting with 6–9.', step: 7 }
      if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return { msg: 'Please enter a valid email address.', step: 7 }
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
          <p className="pf5-sub">Your lease agreement application is submitted. Updates will be sent to <strong>{mobile}</strong>.</p>
          <div className="pf5-done-pills">
            <span>₹50 Paid</span><span>Submitted</span><span>Doorstep Delivery</span>
          </div>
          <div className="pf5-footer">
            <Link href="/lease-agreement" className="pf5-cta-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              ? Back to Lease Agreement
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
          <p className="pf5-sub">Secure checkout · ₹50 booking fee</p>
          <div className="pf5-content">
            <div className="pf5-pay-banner">
              <span className="pf5-pay-label">Booking Fee</span>
              <span className="pf5-pay-amount">₹50</span>
              <span className="pf5-pay-note">Balance payable after document verification</span>
            </div>
            <div className="pf5-pay-tabs">
              {[
                { id:'upi',        lbl:'UPI',                Icon: IndianRupee },
                { id:'card',       lbl:'Debit / Credit Card', Icon: CreditCard  },
                { id:'netbanking', lbl:'Net Banking',         Icon: Building2   },
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
              <Check size={15} /> Pay ₹50 &amp; Submit
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
              { label: 'Owner Name',           value: ownerName    },
              { label: 'Mobile Number',        value: mobile       },
              { label: 'Order ID',             value: orderId      },
              { label: 'Services',             value: 'Lease Agreement' },
              { label: 'Amount (Booking Fee)', value: '₹50'        },
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

  /* -- Main form (steps 1–7) -- */
  const { title, sub, Icon: StepIcon, gradient } = STEP_META[step - 1]

  return (
    <div className="pf5-page">
      <div className="pf5-breadcrumb">
        <Link href="/">Home</Link><span> / </span><Link href="/lease-agreement">Lease Agreement</Link><span> / </span><span>Apply</span>
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

          {/* -- Step 1: Agreement Type -- */}
          {step === 1 && (
            <div className="pf5-plan-list">
              {LEASE_TYPES.map(({ value, label, desc, color, bg, badge }) => (
                <label key={value} className={`pf5-plan${leaseType === value ? ' sel' : ''}`}
                  style={leaseType === value ? { borderColor: color, background: bg } : {}}>
                  <input type="radio" name="leaseType" checked={leaseType === value}
                    onChange={() => setLeaseType(value)} style={{ display: 'none' }} />
                  <div className={`pf5-plan-radio${leaseType === value ? ' sel' : ''}`}
                    style={leaseType === value ? { background: color, borderColor: color } : {}}>
                    {leaseType === value && <Check size={10} strokeWidth={3} color="#fff" />}
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

          {/* -- Step 2: Role & Stamp Paper -- */}
          {step === 2 && (
            <>
              <Field label="Your Role">
                <div className="pf5-radio-row">
                  {['Owner', 'Tenant'].map(r => (
                    <label key={r} className={`pf5-radio-opt${role === r ? ' sel' : ''}`}>
                      <input type="radio" name="role" checked={role === r}
                        onChange={() => setRole(r)} style={{ display: 'none' }} />
                      {role === r && <Check size={9} strokeWidth={3} />} {r}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Required Stamp Paper">
                <ValidInp valid={stampPaper !== ''}>
                  <select className="pf5-inp" value={stampPaper} onChange={e => setStampPaper(e.target.value)}>
                    <option value="">Choose</option>
                    {STAMP_PAPERS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
            </>
          )}

          {/* -- Step 3: Owner's Details -- */}
          {step === 3 && (
            <>
              <Field label="Owner's Name & Age">
                <ValidInp valid={ownerName.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter Owner's Name & Age"
                    value={ownerName} onChange={e => setOwnerName(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Owner's Father's Name">
                <ValidInp valid={ownerFather.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter Owner's Father's Name"
                    value={ownerFather} onChange={e => setOwnerFather(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Owner's Address">
                <ValidInp valid={ownerAddress.trim().length > 0}>
                  <textarea className="pf5-inp" rows={3} placeholder="Enter Owner's Address"
                    value={ownerAddress} onChange={e => setOwnerAddress(e.target.value)}
                    style={{ resize: 'vertical', minHeight: 80 }} />
                </ValidInp>
              </Field>
              <Field label="State">
                <ValidInp valid={ownerState !== ''}>
                  <select className="pf5-inp" value={ownerState}
                    onChange={e => { setOwnerState(e.target.value); setOwnerPin('') }}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Pin Code">
                {(() => {
                  const ok       = ownerPin.length === 6 && validPin(ownerPin, ownerState)
                  const mismatch = ownerPin.length === 6 && ownerState && !validPin(ownerPin, ownerState)
                  return (
                    <>
                      <ValidInp valid={ok} count={ownerPin.length > 0 && ownerPin.length < 6 ? `${ownerPin.length}/6` : null}>
                        <input className={`pf5-inp${mismatch ? ' pf5-inp-warn' : ''}`}
                          type="text" placeholder="6-digit pin code" maxLength={6}
                          value={ownerPin} onChange={e => { setOwnerPin(e.target.value.replace(/\D/g,'')); setError('') }} />
                      </ValidInp>
                      {mismatch && <div className="pf5-age-warn">? Pincode doesn't match <strong>{ownerState}</strong>.</div>}
                    </>
                  )
                })()}
              </Field>
            </>
          )}

          {/* -- Step 4: Tenant's Details -- */}
          {step === 4 && (
            <>
              <Field label="Tenant Name & Age">
                <ValidInp valid={tenantName.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter Tenant Name & Age"
                    value={tenantName} onChange={e => setTenantName(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Tenant Father's Name">
                <ValidInp valid={tenantFather.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter Tenant's Father's Name"
                    value={tenantFather} onChange={e => setTenantFather(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Tenant Address">
                <ValidInp valid={tenantAddress.trim().length > 0}>
                  <textarea className="pf5-inp" rows={3} placeholder="Enter Tenant Address"
                    value={tenantAddress} onChange={e => setTenantAddress(e.target.value)}
                    style={{ resize: 'vertical', minHeight: 80 }} />
                </ValidInp>
              </Field>
              <Field label="State">
                <ValidInp valid={tenantState !== ''}>
                  <select className="pf5-inp" value={tenantState}
                    onChange={e => { setTenantState(e.target.value); setTenantPin('') }}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Pin Code">
                {(() => {
                  const ok       = tenantPin.length === 6 && validPin(tenantPin, tenantState)
                  const mismatch = tenantPin.length === 6 && tenantState && !validPin(tenantPin, tenantState)
                  return (
                    <>
                      <ValidInp valid={ok} count={tenantPin.length > 0 && tenantPin.length < 6 ? `${tenantPin.length}/6` : null}>
                        <input className={`pf5-inp${mismatch ? ' pf5-inp-warn' : ''}`}
                          type="text" placeholder="6-digit pin code" maxLength={6}
                          value={tenantPin} onChange={e => { setTenantPin(e.target.value.replace(/\D/g,'')); setError('') }} />
                      </ValidInp>
                      {mismatch && <div className="pf5-age-warn">? Pincode doesn't match <strong>{tenantState}</strong>.</div>}
                    </>
                  )
                })()}
              </Field>
            </>
          )}

          {/* -- Step 5: Other Info -- */}
          {step === 5 && (
            <>
              <Field label="Shifted Date">
                <ValidInp valid={shiftedDate !== ''}>
                  <input className="pf5-inp" type="date" value={shiftedDate}
                    onChange={e => { setShiftedDate(e.target.value); setError('') }} />
                </ValidInp>
              </Field>
              <Field label="Shifting Address">
                <ValidInp valid={shiftingAddress.trim().length > 0}>
                  <textarea className="pf5-inp" rows={3} placeholder="Enter shifting/property address"
                    value={shiftingAddress} onChange={e => setShiftingAddress(e.target.value)}
                    style={{ resize: 'vertical', minHeight: 80 }} />
                </ValidInp>
              </Field>
              <Field label="Security Deposit">
                <ValidInp valid={securityDeposit !== '' && !isNaN(securityDeposit) && Number(securityDeposit) > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter security deposit amount"
                    value={securityDeposit}
                    onChange={e => { setSecurityDeposit(e.target.value.replace(/[^0-9.]/g,'')); setError('') }} />
                </ValidInp>
              </Field>
              <Field label="Monthly Rent">
                <ValidInp valid={monthlyRent !== '' && !isNaN(monthlyRent) && Number(monthlyRent) > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter monthly rent amount"
                    value={monthlyRent}
                    onChange={e => { setMonthlyRent(e.target.value.replace(/[^0-9.]/g,'')); setError('') }} />
                </ValidInp>
              </Field>
              <Field label="Safety Deposit">
                <ValidInp valid={safetyDeposit !== '' && !isNaN(safetyDeposit) && Number(safetyDeposit) > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter safety deposit amount"
                    value={safetyDeposit}
                    onChange={e => { setSafetyDeposit(e.target.value.replace(/[^0-9.]/g,'')); setError('') }} />
                </ValidInp>
              </Field>
            </>
          )}

          {/* -- Step 6: Additional Details -- */}
          {step === 6 && (
            <>
              <Field label="Advance Paid Through">
                <div className="pf5-radio-row" style={{ flexWrap: 'wrap' }}>
                  {['Cash', 'Cheque', 'Net Banking'].map(opt => (
                    <label key={opt} className={`pf5-radio-opt${advancePaid === opt ? ' sel' : ''}`}>
                      <input type="radio" name="advancePaid" checked={advancePaid === opt}
                        onChange={() => setAdvancePaid(opt)} style={{ display: 'none' }} />
                      {advancePaid === opt && <Check size={9} strokeWidth={3} />} {opt}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Water Charges">
                <div className="pf5-radio-row">
                  {['Included in Rent', 'Excluded'].map(opt => (
                    <label key={opt} className={`pf5-radio-opt${waterCharges === opt ? ' sel' : ''}`}>
                      <input type="radio" name="waterCharges" checked={waterCharges === opt}
                        onChange={() => setWaterCharges(opt)} style={{ display: 'none' }} />
                      {waterCharges === opt && <Check size={9} strokeWidth={3} />} {opt}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Painting Charges">
                <ValidInp valid={paintingCharges !== ''}>
                  <select className="pf5-inp" value={paintingCharges}
                    onChange={e => setPaintingCharges(e.target.value)}>
                    <option value="">Choose</option>
                    {PAINTING_OPTS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Accommodation">
                <ValidInp valid={accommodation.trim().length > 0}>
                  <input className="pf5-inp" type="text" placeholder="Enter accommodation details"
                    value={accommodation} onChange={e => setAccommodation(e.target.value)} />
                </ValidInp>
              </Field>
              <Field label="Appliances / Fittings Details">
                <ValidInp valid={appliances.trim().length > 0}>
                  <textarea className="pf5-inp" rows={3} placeholder="Enter appliances and fitting details"
                    value={appliances} onChange={e => setAppliances(e.target.value)}
                    style={{ resize: 'vertical', minHeight: 80 }} />
                </ValidInp>
              </Field>
            </>
          )}

          {/* -- Step 7: Contact Details -- */}
          {step === 7 && (
            <>
              <Field label="Shipping Address">
                <ValidInp valid={shippingAddress.trim().length > 0}>
                  <textarea className="pf5-inp" rows={3} placeholder="Enter shipping address"
                    value={shippingAddress} onChange={e => setShippingAddress(e.target.value)}
                    style={{ resize: 'vertical', minHeight: 80 }} />
                </ValidInp>
              </Field>
              <Field label="State">
                <ValidInp valid={shippingState !== ''}>
                  <select className="pf5-inp" value={shippingState}
                    onChange={e => { setShippingState(e.target.value); setShippingPin('') }}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </ValidInp>
              </Field>
              <Field label="Pin Code">
                {(() => {
                  const ok       = shippingPin.length === 6 && validPin(shippingPin, shippingState)
                  const mismatch = shippingPin.length === 6 && shippingState && !validPin(shippingPin, shippingState)
                  return (
                    <>
                      <ValidInp valid={ok} count={shippingPin.length > 0 && shippingPin.length < 6 ? `${shippingPin.length}/6` : null}>
                        <input className={`pf5-inp${mismatch ? ' pf5-inp-warn' : ''}`}
                          type="text" placeholder="6-digit pin code" maxLength={6}
                          value={shippingPin} onChange={e => { setShippingPin(e.target.value.replace(/\D/g,'')); setError('') }} />
                      </ValidInp>
                      {mismatch && <div className="pf5-age-warn">? Pincode doesn't match <strong>{shippingState}</strong>.</div>}
                    </>
                  )
                })()}
              </Field>
              <Field label="Mobile Number">
                {(() => {
                  const valid        = /^[6-9]\d{9}$/.test(mobile)
                  const invalidStart = mobile.length === 10 && !/^[6-9]/.test(mobile)
                  return (
                    <>
                      <ValidInp valid={valid} count={mobile.length > 0 && mobile.length < 10 ? `${mobile.length}/10` : null}>
                        <input className={`pf5-inp${invalidStart ? ' pf5-inp-warn' : ''}`}
                          type="tel" placeholder="10-digit mobile number" maxLength={10}
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
                          type="email" placeholder="your@email.com"
                          value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
                      </ValidInp>
                      {invalid && <div className="pf5-age-warn">? Please enter a valid email (e.g. name@example.com).</div>}
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
            {step === TOTAL ? 'Submit' : 'Continue'} <ChevronRight size={17} />
          </button>
          {step > 1 && <button className="pf5-back-link" onClick={back}><ChevronLeft size={13} /> Back</button>}
        </div>

      </div>
    </div>
  )
}
