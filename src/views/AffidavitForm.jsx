'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  Scale, User, Phone, Mail, MapPin, Check, AlertCircle, ChevronRight, ArrowLeft,
} from 'lucide-react'
import { getStates, getDistricts } from '../data/locationData'
import { getAffidavitBySlug } from '../data/affidavitTypes'

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

export default function AffidavitForm() {
  const params = useParams()
  const affidavit = getAffidavitBySlug(params?.type)

  const [name,     setName]     = useState('')
  const [mobile,   setMobile]   = useState('')
  const [email,    setEmail]    = useState('')
  const [address,  setAddress]  = useState('')
  const [stateVal, setStateVal] = useState('')
  const [district, setDistrict] = useState('')
  const [pin,      setPin]      = useState('')
  const [error,    setError]    = useState('')
  const [done,     setDone]     = useState(false)

  // Unknown affidavit slug
  if (!affidavit) {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#DC2626,#B91C1C)' }}>
              <AlertCircle size={26} strokeWidth={1.8} color="#fff" />
            </div>
          </div>
          <h2 className="pf5-title">Affidavit Not Found</h2>
          <p className="pf5-sub">We couldn&apos;t find that affidavit type. Please choose one from the list.</p>
          <div className="pf5-footer">
            <Link href="/affidavits" className="pf5-cta-btn" style={{ textDecoration: 'none' }}>
              Back to Affidavits <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const validate = () => {
    if (!name.trim()) return 'Please enter your full name.'
    if (!/^[6-9]\d{9}$/.test(mobile)) return 'Please enter a valid 10-digit Indian mobile number.'
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return 'Please enter a valid email address.'
    if (!address.trim()) return 'Please enter your address.'
    if (!stateVal) return 'Please select your state.'
    if (!district) return 'Please select your district.'
    if (!/^[1-9]\d{5}$/.test(pin)) return 'Please enter a valid 6-digit pin code.'
    return ''
  }

  const submit = () => {
    const e = validate()
    if (e) { setError(e); return }
    setError('')
    setDone(true)
  }

  // Success
  if (done) {
    return (
      <div className="pf5-page">
        <div className="pf5-card">
          <div className="pf5-icon-wrap">
            <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
              <Check size={28} strokeWidth={2.5} color="#fff" />
            </div>
          </div>
          <h2 className="pf5-title">Request Submitted!</h2>
          <p className="pf5-sub">
            Your request for <strong>{affidavit.value}</strong> has been received.
            Our team will contact you on <strong>{mobile}</strong> shortly.
          </p>
          <div className="pf5-footer">
            <Link href="/affidavits" className="pf5-cta-btn" style={{ textDecoration: 'none' }}>
              Back to Affidavits <ChevronRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pf5-page">
      <div className="pf5-breadcrumb">
        <Link href="/">Home</Link><span> / </span><Link href="/affidavits">Affidavits</Link><span> / </span><span>Form</span>
      </div>
      <div className="pf5-card">

        <div className="pf5-head-top">
          <Link href="/affidavits" className="pf5-close-btn" aria-label="Back to affidavits">
            <ArrowLeft size={16} strokeWidth={2} />
          </Link>
          <div style={{ width: 32 }} />
        </div>

        <div className="pf5-icon-wrap">
          <div className="pf5-icon" style={{ background: 'linear-gradient(135deg,#1A3D6E,#2E68B1)' }}>
            <Scale size={26} strokeWidth={1.8} color="#fff" />
          </div>
        </div>

        <h2 className="pf5-title">{affidavit.value}</h2>
        <p className="pf5-sub">Enter your details and our experts will prepare your affidavit.</p>

        <div className="pf5-content">
          <Field label="Full Name">
            <ValidInp valid={name.trim().length > 0}>
              <input className="pf5-inp" type="text" placeholder="Enter your full name"
                value={name} onChange={e => { setName(e.target.value); setError('') }} />
            </ValidInp>
          </Field>

          <Field label="Mobile Number">
            <ValidInp valid={/^[6-9]\d{9}$/.test(mobile)} count={mobile.length > 0 && mobile.length < 10 ? `${mobile.length}/10` : null}>
              <input className="pf5-inp" type="tel" placeholder="10-digit mobile number" maxLength={10}
                value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError('') }} />
            </ValidInp>
          </Field>

          <Field label="Email Address">
            <ValidInp valid={/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)}>
              <input className="pf5-inp" type="email" placeholder="you@example.com"
                value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
            </ValidInp>
          </Field>

          <Field label="Address">
            <ValidInp valid={address.trim().length > 0}>
              <input className="pf5-inp" type="text" placeholder="House no., street name, area"
                value={address} onChange={e => { setAddress(e.target.value); setError('') }} />
            </ValidInp>
          </Field>

          <Field label="State">
            <ValidInp valid={stateVal !== ''}>
              <select className="pf5-inp" value={stateVal}
                onChange={e => { setStateVal(e.target.value); setDistrict(''); setError('') }}>
                <option value="">Select state</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </ValidInp>
          </Field>

          <Field label="District">
            <ValidInp valid={district !== ''}>
              <select className="pf5-inp" value={district} disabled={!stateVal}
                onChange={e => { setDistrict(e.target.value); setError('') }}
                style={!stateVal ? { opacity: .5, cursor: 'not-allowed' } : {}}>
                <option value="">{stateVal ? 'Select district' : 'Select state first'}</option>
                {getDistricts(stateVal).map(d => <option key={d}>{d}</option>)}
              </select>
            </ValidInp>
          </Field>

          <Field label="Pin Code">
            <ValidInp valid={/^[1-9]\d{5}$/.test(pin)} count={pin.length > 0 && pin.length < 6 ? `${pin.length}/6` : null}>
              <input className="pf5-inp" type="text" placeholder="6-digit pin code" maxLength={6}
                value={pin} onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setError('') }} />
            </ValidInp>
          </Field>
        </div>

        {error && <div className="pf5-error"><AlertCircle size={14} strokeWidth={2} /> {error}</div>}

        <div className="pf5-footer">
          <button className="pf5-cta-btn" onClick={submit}>
            Submit Request <ChevronRight size={17} />
          </button>
        </div>

      </div>
    </div>
  )
}
