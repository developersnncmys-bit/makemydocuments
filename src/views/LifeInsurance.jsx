'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HeartPulse, UserPlus, FileText, GitCompare, CreditCard,
  Download, Zap, MessageCircle,
} from 'lucide-react'

const DOCS = [
  'Valid ID & Address Proof',
]

const STEPS = [
  'Register Online',
  'Get Quotation Via E-mail / WhatsApp',
  'Talk To Experts',
  'Compare Policies',
  'Make Payment',
  'Download Your Policy Instantly',
]

const STEPS_DETAIL = [
  { Icon: UserPlus,      title: 'Register Online',               desc: 'Share your basic details on our website.' },
  { Icon: FileText,      title: 'Get Quotation via Email/WhatsApp', desc: 'Instantly receive policy options tailored to you.' },
  { Icon: MessageCircle, title: 'Talk to Experts',               desc: 'Our advisors explain features, benefits, and help you choose the right plan.' },
  { Icon: GitCompare,    title: 'Compare Policies',              desc: 'Check premiums, coverage, and benefits side by side.' },
  { Icon: CreditCard,    title: 'Make Payment',                  desc: 'Pay securely online through our trusted platform.' },
  { Icon: Download,      title: 'Download Your Policy Instantly', desc: 'Get your e-policy within minutes, ready for future use.' },
]

const FAQS = [
  {
    q: 'What is life insurance?',
    a: 'It is a contract between you and the insurer, ensuring your nominee gets financial benefits in case of your untimely death.',
  },
  {
    q: 'What are the types of life insurance?',
    a: 'Term plans, whole life, ULIPs, endowment, money-back, child, and pension plans.',
  },
  {
    q: 'Why should I buy life insurance?',
    a: "It secures your family's financial stability, covers debts, and offers tax benefits.",
  },
  {
    q: 'What are the tax benefits?',
    a: 'Premiums qualify for Section 80C deductions, and payouts are tax-free under Section 10(10D).',
  },
  {
    q: 'How can nominees claim after death?',
    a: 'By submitting a claim form, death certificate, and required documents to the insurer.',
  },
  {
    q: 'Can a claim be denied?',
    a: 'Yes, due to non-disclosure of facts, fraud, or exclusions mentioned in the policy.',
  },
  {
    q: 'What are the types of claims in life insurance policies?',
    a: 'Life insurance policies have the following types of claims — Maturity claim which is paid when the term of the plan comes to an end; Death claim which is paid if the insured dies during the term of the plan; Money back claims which are payable during the term of the plan if the insured is alive in a money back policy; Surrender value claim which is payable if the policy is surrendered by the policyholder before the term completes.',
  },
  {
    q: 'What is not covered under life insurance plans?',
    a: 'Life insurance plans do not cover death due to the following reasons — When under the influence of alcohol or drugs; Acts of criminal nature; Participation in hazardous activities; Suicide within 12 months of buying the policy or reviving it. Any one or multiple riders can be chosen along with the basic policy.',
  },
  {
    q: 'Do life insurance policies provide loans?',
    a: "Yes, some policies allow loans against the policy's surrender value.",
  },
  {
    q: 'What is the process of making a death claim?',
    a: 'Notify the insurer, submit documents, and the insurer processes the claim after verification.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ins-faq-v2${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ins-faq-v2-q">
        <span>{q}</span>
        <span className="ins-faq-v2-icon">{open ? '▲' : '▼'}</span>
      </div>
      {open && <div className="ins-faq-v2-a">{a}</div>}
    </div>
  )
}

export default function LifeInsurance() {
  return (
    <div className="svc-page">

      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <div className="mx">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/insurance">Insurance</Link>
          <span> / </span>
          <span>Life Insurance</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="twi-hero">
        <div className="twi-hero-content mx">
          <div className="twi-hero-left">
            <div className="hero-pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.22)', color: 'rgba(255,255,255,.92)' }}>
              <span className="live-dot" />
              Life Insurance &nbsp;·&nbsp; Instant Policy
            </div>
            <h1 style={{ color: '#fff', letterSpacing: '-1.5px', marginBottom: 14 }}>
              Protect Your Life<br />Insurance with Ease
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,.85)', lineHeight: 1.65, maxWidth: 460, marginBottom: 32 }}>
              Insurance applications made simple and stress-free.
            </p>
          </div>

          <div className="twi-hero-right">
            <div className="twi-info-card">
              {/* Documents */}
              <div className="twi-card-section">
                <div className="twi-card-icon-wrap">
                  <FileText size={22} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <div className="twi-card-line" />
                <div className="twi-card-body">
                  <div className="twi-card-title">Documents Required For Life Insurance</div>
                  <ul className="twi-card-list">
                    {DOCS.map(d => <li key={d}>{d}</li>)}
                  </ul>
                </div>
              </div>

              {/* How it works */}
              <div className="twi-card-section">
                <div className="twi-card-icon-wrap">
                  <Zap size={22} strokeWidth={1.8} color="var(--teal)" />
                </div>
                <div className="twi-card-line last" />
                <div className="twi-card-body">
                  <div className="twi-card-title">How It Works</div>
                  <ul className="twi-card-list">
                    {STEPS.map(s => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              </div>

              <div style={{ paddingLeft: 52, paddingBottom: 4 }}>
                <Link href="/life-insurance-form" className="twi-get-quotes-btn">
                  Get Quotes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article Content ── */}
      <section className="ins-section-white">
        <div className="mx twi-article">

          <h2 className="twi-art-h2">
            Protect Your Life Insurance with Ease – Secure Your Family&apos;s Future
          </h2>
          <p className="twi-art-p">
            Life is unpredictable, and while we cannot control the uncertainties, we can certainly prepare for them. Life
            insurance is more than just a financial product—it is a promise to safeguard your loved ones when you&apos;re
            no longer around. It ensures that your family&apos;s financial needs, from daily living expenses to long-term
            goals, are met even in your absence.
          </p>
          <p className="twi-art-p">
            At Make My Documents, we make applying for life insurance quick, simple, and stress-free. Whether you&apos;re
            looking for term plans, savings-linked policies, or investment-oriented life insurance, we guide you through
            the process so you can choose the best option for your needs.
          </p>

          {/* Why Life Insurance Matters */}
          <h3 className="twi-art-h3">Why Life Insurance Matters</h3>
          <p className="twi-art-p">Life insurance is one of the most important financial decisions you will ever make. Here&apos;s why:</p>
          <ul className="twi-art-ul">
            <li><span><strong>Financial Security for Loved Ones:</strong> Provides a lump sum or regular income to your family after your death.</span></li>
            <li><span><strong>Debt Protection:</strong> Ensures that loans such as home loans or personal loans don&apos;t become a burden on your family.</span></li>
            <li><span><strong>Wealth Creation:</strong> Some plans offer maturity benefits, helping you build a financial cushion for future goals.</span></li>
            <li><span><strong>Peace of Mind:</strong> Live life with the assurance that your family will be protected financially.</span></li>
            <li><span><strong>Tax Benefits:</strong> Premiums qualify for deductions under Section 80C and Section 10(10D) of the Income Tax Act.</span></li>
          </ul>

          {/* Documents */}
          <h3 className="twi-art-h3">Documents Required for Life Insurance</h3>
          <p className="twi-art-p">When applying for a life insurance policy, you will typically need:</p>
          <ul className="twi-art-ul">
            <li>Valid ID Proof (Aadhaar, Passport, Voter ID, or PAN card)</li>
            <li>Address Proof (Utility bill, Aadhaar, Passport, etc.)</li>
            <li>Income Proof (Salary slip, ITR, or bank statement for certain policies)</li>
            <li>Medical Reports (if required by the insurer for higher coverage)</li>
          </ul>
          <p className="twi-art-p">
            Our experts at Make My Document ensure you have everything in place for a seamless application.
          </p>

          {/* How it works detail */}
          <h3 className="twi-art-h3">How It Works with Make My Documents</h3>
          <p className="twi-art-p">We simplify the life insurance process into easy steps:</p>
          <div className="sol-steps" style={{ marginBottom: 32 }}>
            {STEPS_DETAIL.map(({ Icon, title, desc }, i) => (
              <div key={i} className="sol-step">
                <div className="sol-connector" />
                <div className="sol-n ins-step-n">
                  <Icon size={15} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <h4><strong>{title}</strong> – {desc}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Types */}
          <h3 className="twi-art-h3">Types of Life Insurance</h3>
          <p className="twi-art-p">Life insurance is not one-size-fits-all. Depending on your needs, you can choose from:</p>
          <ul className="twi-art-ul">
            <li><span><strong>Term Life Insurance –</strong> Pure protection plan that offers high coverage at affordable premiums.</span></li>
            <li><span><strong>Whole Life Insurance –</strong> Provides lifelong coverage, often with savings benefits.</span></li>
            <li><span><strong>Endowment Plans –</strong> Combines insurance with savings, offering maturity benefits.</span></li>
            <li><span><strong>ULIPs (Unit Linked Insurance Plans) –</strong> Offers insurance along with investment opportunities in equity and debt funds.</span></li>
            <li><span><strong>Money-Back Plans –</strong> Periodic payouts during the policy term plus life cover.</span></li>
            <li><span><strong>Child Plans –</strong> Helps secure your child&apos;s education and future goals.</span></li>
            <li><span><strong>Retirement/Pension Plans –</strong> Ensures a regular income post-retirement while providing life cover.</span></li>
          </ul>

          {/* Tax Benefits */}
          <h3 className="twi-art-h3">Tax Benefits of Life Insurance</h3>
          <p className="twi-art-p">Life insurance not only secures your family&apos;s future but also provides attractive tax benefits:</p>
          <ul className="twi-art-ul">
            <li>Premiums paid are eligible for deduction under Section 80C (up to ₹1.5 lakh annually).</li>
            <li>Payouts received on maturity or death are tax-free under Section 10(10D), subject to certain conditions.</li>
            <li>Retirement and pension plans also offer tax deductions under Section 80CCC.</li>
          </ul>
          <p className="twi-art-p">Thus, life insurance doubles up as both a protection and tax-saving tool.</p>

          {/* Claim Process */}
          <h3 className="twi-art-h3">Claim Process in Life Insurance</h3>
          <p className="twi-art-p">
            In the unfortunate event of the policyholder&apos;s death, the nominee can file a claim. The process is simple:
          </p>
          <ul className="twi-art-ul">
            <li>Notify the insurer about the death of the policyholder.</li>
            <li>Submit a claim form along with a death certificate and policy documents.</li>
            <li>Provide ID/address proof of nominee and bank account details.</li>
            <li>The insurance company verifies documents and processes the claim.</li>
            <li>The claim amount is credited to the nominee&apos;s account.</li>
          </ul>
          <p className="twi-art-p">
            At Make My Documents, we help your family navigate this process with ease so they receive benefits without hassle.
          </p>

          {/* Not Covered */}
          <h3 className="twi-art-h3">What is Not Covered Under Life Insurance?</h3>
          <p className="twi-art-p">While life insurance provides broad coverage, certain exclusions apply:</p>
          <ul className="twi-art-ul">
            <li>Death due to suicide within the first year of policy</li>
            <li>Death caused by participation in illegal or hazardous activities</li>
            <li>Non-disclosure of medical conditions at the time of application</li>
            <li>Death due to war or acts of terrorism (in some policies)</li>
          </ul>
          <p className="twi-art-p">Understanding exclusions ensures that your claim process is smooth and transparent.</p>

          {/* CTA blurb */}
          <div className="twi-cta-box">
            <HeartPulse size={28} strokeWidth={1.6} color="var(--amber)" />
            <div>
              <div className="twi-cta-title">Secure Your Family&apos;s Future Today</div>
              <p className="twi-cta-desc">
                Life insurance is not just about protecting wealth—it&apos;s about protecting dreams. With Make My Documents,
                the process of buying or renewing life insurance is transparent, quick, and stress-free. From registration to
                claim support, we&apos;re here at every step to make sure you and your family remain protected.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="ins-section-surf">
        <div className="mx">
          <div className="shead center">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Got Questions?</div>
            <h2>FAQs</h2>
            <p className="sec-desc">Need help? Contact us for any queries related to us</p>
          </div>
          <div className="ins-faq-v2-grid">
            {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

    </div>
  )
}
