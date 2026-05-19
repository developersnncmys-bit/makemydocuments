'use client'

import ReviewSlider from './ReviewSlider'

const REVIEWS = [
  { av: 'R', name: 'Ravi Kumar',      svc: 'Passport Service',             text: '"They were incredibly quick in booking my passport slot and helped me at every step. My passport arrived within 2 weeks. Absolutely brilliant – would recommend to everyone."' },
  { av: 'P', name: 'Priya Nair',      svc: 'Passport Renewal',             text: '"Very grateful to the team who resolved my passport issue with clear, simple steps. Received it well within the promised timeframe. Professional and reliable from start to finish."' },
  { av: 'A', name: 'Anil Sharma',     svc: 'PAN Card',                     text: '"Efficient, professional, and genuinely helpful staff who guided me patiently through the entire process. Highly recommend for PAN card, passport – any document really."' },
  { av: 'S', name: 'Sunita Rao',      svc: 'Visa Assistance',              text: '"Got my tourist visa documentation sorted in record time. The team was extremely knowledgeable and made the process completely stress-free. 10/10 experience."' },
  { av: 'M', name: 'Mohan Das',       svc: 'Rental Agreement',             text: '"Rental agreement was ready and delivered to my doorstep in just 2 days. No notary visits, no hassle. Saved me so much time and effort."' },
  { av: 'D', name: 'Deepa Menon',     svc: 'Police Clearance Certificate', text: '"I needed a PCC urgently for my visa interview and MakeMyDocuments delivered it faster than I expected. The team was responsive on WhatsApp throughout. Truly outstanding service."' },
  { av: 'K', name: 'Karthik Reddy',   svc: 'MSME Registration',            text: '"Got my Udyam certificate sorted without any confusion. The team explained every step clearly and the certificate was in my inbox well before the deadline. Highly professional."' },
  { av: 'N', name: 'Nandini Gowda',   svc: 'Senior Citizen Card',          text: `"Applied for my mother's senior citizen card through them. No running around, no confusing paperwork – everything was handled end to end. Will definitely use them again."` },
  { av: 'V', name: 'Vikram Shetty',   svc: 'Police Verification',          text: '"Needed a police verification certificate for my new tenant urgently. The team was prompt, professional and got it done without any hassle. Saved me hours of government office visits."' },
  { av: 'L', name: 'Lakshmi Iyer',    svc: 'Lease Agreement',              text: '"Had my lease agreement drafted, stamped and delivered within 24 hours. Legally sound, professionally worded and the price was completely transparent. Excellent service!"' },
  { av: 'F', name: 'Farhan Sheikh',   svc: 'Visa Assistance',              text: '"Applied for my Schengen visa through MakeMyDocuments. The checklist they gave me was spot on and my visa was approved on first attempt. Stress-free from day one."' },
  { av: 'G', name: 'Gayathri Prasad', svc: 'Insurance Policies',           text: '"Compared multiple health insurance plans through them and got a policy that perfectly fit my budget. Fast, honest and no hidden charges. Would recommend to anyone."' },
]

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="mx">
        <div className="shead center rv">
          <div className="eyebrow">Client Reviews</div>
          <h2>Don't Take Our Word For It.</h2>
          <p className="sec-desc">
            Verified Google reviews from real customers – 1,000+ published publicly on our Business profile.
          </p>
        </div>
        <ReviewSlider reviews={REVIEWS} />
      </div>
    </section>
  )
}
