import {
  BookOpen, Plane, CreditCard, Users, Globe,
  ShieldCheck, Home, Building2, ClipboardCheck, BadgeCheck, FileText,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────
// To add a new blog post, append an object to this array.
// To connect a real API, replace fetchBlogPosts with a fetch call:
//   const res = await fetch('https://api.makemydocuments.com/blogs')
//   return res.json()
// Each post needs: id, slug, cat, featured, title, excerpt,
//   date, readTime, gradient, Icon, content (HTML string)
// ─────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'how-to-apply-for-passport-online-india-2026',
    cat: 'Passport', featured: true,
    title:   'How to Apply for Passport Online in India — 2026 Step-by-Step Guide',
    excerpt: 'Easy step-by-step process, documents & fees explained, avoid rejection & delays.',
    date: 'Apr 10, 2026', readTime: '8 min',
    gradient: 'linear-gradient(145deg, #0f2d5c 0%, #2E68B1 60%, #3d8bd4 100%)',
    Icon: BookOpen,
    content: `
      <h2>Introduction</h2>
      <p>In today's digital-first world, applying for a <strong>passport</strong> has become significantly easier. The Government of India has streamlined the process through the <strong>online Passport Seva system</strong>, allowing applicants to initiate their passport application from the comfort of their home.</p>
      <p>However, despite the convenience, thousands of applicants face <strong>delays, rejections, or repeated visits</strong> due to:</p>
      <ul>
        <li>Incorrect documentation</li>
        <li>Errors in application forms</li>
        <li>Lack of clarity on the process</li>
        <li>Police verification issues</li>
      </ul>
      <p>This comprehensive guide will walk you through <strong>how to apply for passport online in India in 2026</strong>, ensuring a smooth and error-free experience.</p>

      <h2>What is a Passport and Why is it Important?</h2>
      <p>A passport is an official government document issued by the <strong>Ministry of External Affairs</strong> that certifies your identity and nationality for international travel.</p>
      <p>Why you need a passport:</p>
      <ul>
        <li>International travel (tourism/business)</li>
        <li>Studying abroad</li>
        <li>Employment overseas</li>
        <li>Identity proof</li>
        <li>Address proof</li>
      </ul>

      <h2>Types of Passports in India</h2>
      <p>Understanding the type of passport is important before applying.</p>
      <ul>
        <li><strong>1. Fresh Passport</strong> — Issued to individuals applying for the first time.</li>
        <li><strong>2. Reissue Passport</strong> — Required when passport expires, pages are exhausted, or personal details need updates.</li>
        <li><strong>3. Tatkal Passport</strong> — Fast-track service for urgent needs.</li>
        <li><strong>4. Minor Passport</strong> — Issued to individuals below 18 years.</li>
      </ul>

      <h2>Step-by-Step Process to Apply for Passport Online in India</h2>
      <p>Applying for a passport online involves multiple stages. Follow each step carefully:</p>
      <ol>
        <li><strong>Step 1: Register on Passport Seva Portal</strong> — Visit the official portal and create an account. Required details: Name, Date of birth, Email ID, Mobile number. Once registered, login credentials will be provided.</li>
        <li><strong>Step 2: Fill the Passport Application Form</strong> — After logging in, click on Apply for Fresh Passport/Reissue and fill in accurate personal details (Full name as per Aadhaar/PAN, Address details, Family details, Employment details).</li>
        <li><strong>Step 3: Upload Required Documents</strong> — Ensure all documents are valid and updated.</li>
        <li><strong>Step 4: Pay the Application Fee</strong> — Online payment is mandatory for booking an appointment. Accepted payment methods: UPI, Debit/Credit cards, Net banking.</li>
        <li><strong>Step 5: Book Appointment</strong> — Choose your nearest Passport Seva Kendra. For applicants in Karnataka, you can visit centers in Bangalore.</li>
        <li><strong>Step 6: Visit Passport Seva Kendra (PSK)</strong> — Carry original documents. At the PSK: Document verification, Biometric data collection, Photograph.</li>
        <li><strong>Step 7: Police Verification Process</strong> — Police verification is conducted at your residence. Tips: Be available at your address, Keep documents ready.</li>
        <li><strong>Step 8: Passport Dispatch</strong> — After successful verification: Passport is printed and sent via Speed Post.</li>
      </ol>

      <blockquote>⚠ Even a minor mistake can delay your application. Double-check every detail before submission.</blockquote>

      <h2>Documents Required for Passport Application (2026 Updated)</h2>
      <p>Submitting accurate documents is the most critical step.</p>
      <ul>
        <li><strong>Identity Proof:</strong> Aadhaar Card, PAN Card, Voter ID</li>
        <li><strong>Address Proof:</strong> Aadhaar Card, Utility bills, Bank statement</li>
        <li><strong>Date of Birth Proof:</strong> Birth certificate, 10th marks card</li>
        <li><strong>Additional Documents (if applicable):</strong> Marriage certificate, Annexure forms, Government ID</li>
      </ul>
      <blockquote>Expert Tip: Document mismatch is the #1 reason for rejection. Always cross-check before submission.</blockquote>

      <h2>Passport Fees in India (2026 Updated)</h2>
      <ul>
        <li><strong>Fresh Passport (36 pages):</strong> Normal – ₹1,500 | Tatkal – ₹3,500</li>
        <li><strong>Fresh Passport (60 pages):</strong> Normal – ₹2,000 | Tatkal – ₹4,000</li>
        <li><strong>Minor Passport:</strong> ₹1,000</li>
      </ul>

      <h2>Passport Processing Time</h2>
      <ul>
        <li><strong>Normal Application:</strong> 15–30 working days</li>
        <li><strong>Tatkal Application:</strong> 3–7 working days</li>
      </ul>
      <p>Factors affecting processing time: Police verification delays, Incorrect documents, High application volume.</p>

      <h2>Tatkal Passport: Fast Track Option</h2>
      <p>Tatkal is best for urgent travel needs. How to Apply: Select Tatkal option, Pay higher fees, Submit additional documents.</p>
      <ul>
        <li><strong>Benefits:</strong> Faster approval, Priority processing</li>
        <li><strong>When to choose Tatkal:</strong> Emergency travel, Job opportunity abroad, Medical reasons</li>
      </ul>

      <h2>Common Mistakes to Avoid While Applying Passport Online</h2>
      <p>Avoid these errors to ensure smooth approval:</p>
      <ul>
        <li><strong>1. Name Mismatch</strong> — Ensure your name matches across all documents.</li>
        <li><strong>2. Incorrect Address</strong> — Address mismatch can delay police verification.</li>
        <li><strong>3. Wrong Document Upload</strong> — Uploading incorrect documents leads to rejection.</li>
        <li><strong>4. Multiple Applications</strong> — Submitting duplicate applications causes confusion.</li>
        <li><strong>5. Skipping Police Verification</strong> — Not being available can delay approval.</li>
      </ul>

      <h2>How to Track Passport Application Status</h2>
      <p>You can track your passport using Application reference number or Passport Seva Portal.</p>
      <ul>
        <li>Application submitted → Under review → Police verification → Printed → Dispatched</li>
      </ul>

      <h2>Benefits of Applying Passport Online</h2>
      <ul>
        <li>Convenient process</li>
        <li>Saves time</li>
        <li>Easy tracking</li>
        <li>Transparent system</li>
      </ul>

      <h2>Passport Application for Special Cases</h2>
      <ul>
        <li><strong>For Students:</strong> Use college ID as supporting document</li>
        <li><strong>For Government Employees:</strong> Provide NOC or Annexure</li>
        <li><strong>For Married Applicants:</strong> Marriage certificate may be required</li>
      </ul>

      <h2>Why Passport Applications Get Rejected</h2>
      <p>Top reasons include: Incorrect information, Fake or invalid documents, Police verification failure, Signature mismatch.</p>
      <blockquote>Professional help can eliminate these risks completely.</blockquote>

      <h2>Why Choose Professional Passport Assistance?</h2>
      <p>While the process is online, errors are common. With expert assistance, you get:</p>
      <ul>
        <li>Error-free application</li>
        <li>Proper document verification</li>
        <li>Faster processing</li>
        <li>End-to-end support</li>
      </ul>

      <h2>How Make My Documents Helps You</h2>
      <p>At MakeMyDocuments, we simplify your passport process:</p>
      <ul>
        <li>Complete online application support</li>
        <li>Document verification</li>
        <li>Appointment booking</li>
        <li>Fast-track assistance</li>
        <li>Personalized guidance</li>
      </ul>
      <blockquote>Apply Passport Online Without Stress — Contact us today for quick and reliable service.</blockquote>

      <h2>Pro Tips to Get Passport Faster</h2>
      <ul>
        <li>Apply early</li>
        <li>Double-check documents</li>
        <li>Choose Tatkal if urgent</li>
        <li>Be available for verification</li>
        <li>Avoid peak seasons</li>
      </ul>

      <h2>FAQs – Apply Passport Online in India</h2>
      <div class="bd-faq">
        <div class="bd-faq-item">
          <div class="bd-faq-q">Can I apply for passport fully online?</div>
          <div class="bd-faq-a">You can apply online, but visiting the Passport Seva Kendra (PSK) in person is mandatory for biometric and document verification.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">How long does a passport take?</div>
          <div class="bd-faq-a">Normal applications take 15–30 working days. Tatkal applications are processed in 3–7 working days.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">Is Aadhaar compulsory for a passport?</div>
          <div class="bd-faq-a">Aadhaar is not mandatory but is highly recommended as it simplifies address and identity verification significantly.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">Can I apply for a passport without an agent?</div>
          <div class="bd-faq-a">Yes, you can apply directly. However, expert assistance reduces the risk of errors, rejection, and unnecessary delays.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">What is a Tatkal passport?</div>
          <div class="bd-faq-a">Tatkal is a fast-track passport service for urgent travel needs. It costs more but is processed in 3–7 working days.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">Can I reschedule my PSK appointment?</div>
          <div class="bd-faq-a">Yes. You can reschedule your appointment through the Passport Seva portal before the appointment date.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">What if I miss my appointment?</div>
          <div class="bd-faq-a">If you miss your appointment, you will need to reschedule a new one through the portal. Missed appointments are not refunded.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">Is police verification mandatory?</div>
          <div class="bd-faq-a">Yes, police verification is mandatory in most cases. It is conducted at your registered residential address.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">How do I correct details on my passport?</div>
          <div class="bd-faq-a">To correct any details, you need to apply for a passport reissue through the Passport Seva portal with supporting documents.</div>
        </div>
        <div class="bd-faq-item">
          <div class="bd-faq-q">Can minors apply for a passport?</div>
          <div class="bd-faq-a">Yes. Minors (below 18) can apply with a Minor Passport. Both parents' consent and identity documents are required.</div>
        </div>
      </div>

      <h2>Conclusion</h2>
      <p>Applying for a <strong>passport online</strong> in India is simple—but only when done correctly. Even small errors can lead to delays or rejection.</p>
      <p>To ensure a <strong>fast, smooth, and hassle-free passport application</strong>, professional assistance is highly recommended.</p>
      <blockquote>Ready to apply for your passport? Let experts handle everything for you.</blockquote>
    `,
  },
  {
    id: 2,
    slug: 'vietnam-tourist-visa-indians-2026-guide',
    cat: 'Tourist Visa', featured: false,
    title:   'Vietnam Tourist Visa for Indians — 2026 Guide: Apply Online, Fees & Processing Time',
    excerpt: 'Apply online easily, visa fees & processing time, fast approval tips for Indians.',
    date: 'Apr 5, 2026', readTime: '6 min',
    gradient: 'linear-gradient(145deg, #7c1d05 0%, #c2410c 55%, #f97316 100%)',
    Icon: Plane,
    content: `
      <h2>Vietnam Tourist Visa for Indians</h2>
      <p>Vietnam is one of Southeast Asia's most popular tourist destinations, known for its stunning landscapes, rich history, and vibrant street food culture. Indian citizens require a visa to visit Vietnam.</p>

      <h2>Types of Vietnam Visa</h2>
      <ul>
        <li><strong>E-Visa (Online):</strong> Valid for 90 days, single or multiple entry. Easiest option for Indians.</li>
        <li><strong>Visa on Arrival:</strong> Requires prior approval letter. Available at major international airports.</li>
        <li><strong>Embassy Visa:</strong> Apply at the Vietnamese Embassy in New Delhi or Mumbai.</li>
      </ul>

      <h2>Documents Required</h2>
      <ul>
        <li>Valid Indian Passport (minimum 6 months validity)</li>
        <li>Recent passport-sized photograph</li>
        <li>Completed visa application form</li>
        <li>Proof of travel (flight tickets)</li>
        <li>Proof of accommodation (hotel booking)</li>
        <li>Visa fee payment receipt</li>
      </ul>

      <h2>Vietnam E-Visa Fee (2026)</h2>
      <ul>
        <li>Single Entry (90 days): USD 25</li>
        <li>Multiple Entry (90 days): USD 50</li>
      </ul>

      <h2>Processing Time</h2>
      <p>Vietnam E-Visa is typically processed within <strong>3 business days</strong>. Apply at least 7 days before your travel date to avoid last-minute issues.</p>

      <blockquote>Indians get 90 days on a Vietnam E-Visa — plenty of time to explore Ha Long Bay, Hoi An, Ho Chi Minh City, and Da Nang!</blockquote>

      <h2>How MakeMyDocuments Helps</h2>
      <p>Our visa experts handle the complete application process — from document preparation to submission. We ensure your Vietnam visa is approved without errors or delays.</p>
    `,
  },
  {
    id: 3,
    slug: 'pan-card-new-rules-april-2026',
    cat: 'PAN Card', featured: false,
    title:   'PAN Card New Rules from April 2026 — Complete Guide for Applicants',
    excerpt: 'What changed from April 1, 2026 and what every PAN card holder needs to know.',
    date: 'Mar 28, 2026', readTime: '5 min',
    gradient: 'linear-gradient(145deg, #3b0764 0%, #7c3aed 55%, #a78bfa 100%)',
    Icon: CreditCard,
    content: `
      <h2>PAN Card Rule Changes from April 2026</h2>
      <p>The Income Tax Department of India has introduced significant changes to the PAN Card system effective April 1, 2026. Here's everything you need to know.</p>

      <h2>Key Changes</h2>
      <ul>
        <li><strong>PAN 2.0:</strong> Introduction of upgraded PAN cards with QR codes for faster verification.</li>
        <li><strong>Mandatory Aadhaar Linking:</strong> PAN must be linked with Aadhaar to remain active.</li>
        <li><strong>New Application Process:</strong> Streamlined online process for fresh PAN applications.</li>
        <li><strong>Higher Penalty:</strong> Using an inoperative PAN attracts a penalty of ₹10,000.</li>
      </ul>

      <h2>Who Needs a PAN Card?</h2>
      <ul>
        <li>All taxpayers filing income tax returns</li>
        <li>Individuals making transactions above ₹50,000</li>
        <li>Business owners and companies</li>
        <li>Anyone applying for a bank account or loan</li>
      </ul>

      <blockquote>If your PAN is not linked to Aadhaar, it may become inoperative. Link it immediately at the Income Tax e-filing portal.</blockquote>

      <h2>How to Apply for PAN Card in 2026</h2>
      <ol>
        <li>Visit MakeMyDocuments or NSDL/UTIITSL portal</li>
        <li>Fill Form 49A (for Indian citizens) or Form 49AA (for foreign citizens)</li>
        <li>Submit documents and pay fee</li>
        <li>Receive PAN card within 7–10 working days</li>
      </ol>
    `,
  },
  {
    id: 4,
    slug: 'senior-citizen-card-bangalore-online-documents-benefits',
    cat: 'Senior Citizen Card', featured: false,
    title:   'How to Apply for Senior Citizen Card in Bangalore — Online, Documents, Benefits & Fees',
    excerpt: 'Apply online · Documents required · Benefits & concessions · Fee breakdown.',
    date: 'Mar 20, 2026', readTime: '5 min',
    gradient: 'linear-gradient(145deg, #064e3b 0%, #059669 55%, #34d399 100%)',
    Icon: Users,
    content: `
      <h2>What is a Senior Citizen Card?</h2>
      <p>A Senior Citizen Card is an official identity card issued to Indian citizens aged 60 years and above. It provides access to various government benefits, discounts, and concessions.</p>

      <h2>Benefits of Senior Citizen Card</h2>
      <ul>
        <li>50% discount on train tickets (IRCTC)</li>
        <li>Priority queues at government offices and hospitals</li>
        <li>Higher interest rates on bank deposits</li>
        <li>Medical concessions at government hospitals</li>
        <li>Tax benefits under Section 80D</li>
        <li>Discounts on domestic air travel</li>
      </ul>

      <h2>Documents Required</h2>
      <ul>
        <li>Proof of Age (Birth Certificate, Aadhaar, Passport)</li>
        <li>Proof of Address (Aadhaar, Voter ID)</li>
        <li>Proof of Identity (Aadhaar, Voter ID, PAN)</li>
        <li>Recent passport-sized photographs</li>
      </ul>

      <blockquote>Senior Citizen Cards issued in Karnataka are valid for lifetime and are accepted across all government departments in the state.</blockquote>
    `,
  },
  {
    id: 5,
    slug: 'dubai-tourist-visa-from-india-2026',
    cat: 'Tourist Visa', featured: false,
    title:   'How to Apply for Dubai Tourist Visa from India — 2026 Guide',
    excerpt: 'Documents, fees & 24-72 hour processing. Fast visa assistance for Indian travellers.',
    date: 'Mar 15, 2026', readTime: '7 min',
    gradient: 'linear-gradient(145deg, #78350f 0%, #d97706 55%, #F7A418 100%)',
    Icon: Globe,
    content: `
      <h2>Dubai Tourist Visa for Indians</h2>
      <p>Dubai is one of the most visited destinations for Indian tourists. With world-class shopping, iconic landmarks like the Burj Khalifa, and luxurious experiences, Dubai welcomes millions of Indian visitors every year.</p>

      <h2>Types of Dubai Tourist Visa</h2>
      <ul>
        <li><strong>30-Day Single Entry Tourist Visa:</strong> Most popular for short holidays.</li>
        <li><strong>60-Day Single Entry Visa:</strong> For longer stays.</li>
        <li><strong>90-Day Multiple Entry Visa:</strong> For frequent travellers.</li>
        <li><strong>96-Hour Transit Visa:</strong> For transit passengers.</li>
      </ul>

      <h2>Documents Required</h2>
      <ul>
        <li>Valid Passport (minimum 6 months validity, 2 blank pages)</li>
        <li>Recent photograph (white background, 2x2 inches)</li>
        <li>Confirmed return flight tickets</li>
        <li>Hotel booking confirmation</li>
        <li>Bank statement (last 3 months, minimum ₹1 lakh balance)</li>
        <li>Travel insurance (recommended)</li>
      </ul>

      <blockquote>Dubai visa for Indians is typically processed within 24–72 hours. Apply at least 5 days before travel for peace of mind.</blockquote>

      <h2>Dubai Visa Fees (2026)</h2>
      <ul>
        <li>30-Day Tourist Visa: AED 250 (~₹5,600)</li>
        <li>60-Day Tourist Visa: AED 500 (~₹11,200)</li>
        <li>90-Day Multiple Entry: AED 650 (~₹14,500)</li>
      </ul>
    `,
  },
  {
    id: 6,
    slug: 'how-to-apply-pan-card-online-india',
    cat: 'PAN Card', featured: false,
    title:   'How to Apply for a PAN Card Online in India — Step by Step Guide',
    excerpt: 'A PAN Card (Permanent Account Number) is one of the most essential documents for every Indian taxpayer.',
    date: 'Mar 8, 2026', readTime: '6 min',
    gradient: 'linear-gradient(145deg, #1e3a8a 0%, #1d4ed8 55%, #60a5fa 100%)',
    Icon: CreditCard,
    content: `
      <h2>What is a PAN Card?</h2>
      <p>A PAN (Permanent Account Number) card is a 10-digit alphanumeric identifier issued by the Income Tax Department of India. It is mandatory for all financial transactions and tax-related activities in India.</p>

      <h2>Who Should Apply for PAN Card?</h2>
      <ul>
        <li>All individuals paying income tax</li>
        <li>Business owners and professionals</li>
        <li>Anyone opening a bank account or making investments</li>
        <li>Students applying for scholarships or loans</li>
        <li>Foreign nationals with income sources in India</li>
      </ul>

      <h2>Step-by-Step Application Process</h2>
      <ol>
        <li>Visit MakeMyDocuments or NSDL/UTIITSL portal</li>
        <li>Select "New PAN Application" or "Correction"</li>
        <li>Fill Form 49A with your personal details</li>
        <li>Upload scanned documents</li>
        <li>Pay the application fee (₹107 for Indian address, ₹1,017 for foreign address)</li>
        <li>Receive PAN via post within 7–10 working days</li>
      </ol>

      <blockquote>MakeMyDocuments handles the entire PAN application process for just ₹350, including form filling, document verification, and submission.</blockquote>
    `,
  },
  {
    id: 7,
    slug: 'complete-guide-vehicle-health-insurance-india',
    cat: 'Insurance', featured: false,
    title:   'Complete Guide to Vehicle & Health Insurance in India — Bike, Car, Life & Health',
    excerpt: 'Compare plans, understand premiums, and choose the right insurance policy for you and your family.',
    date: 'Feb 28, 2026', readTime: '7 min',
    gradient: 'linear-gradient(145deg, #0c4a6e 0%, #0369a1 55%, #0ea5e9 100%)',
    Icon: ShieldCheck,
    content: `
      <h2>Why Insurance is Essential in India</h2>
      <p>Insurance is your financial safety net against unexpected events. Whether it's a medical emergency, a road accident, or damage to your property, the right insurance policy ensures you and your family are protected.</p>

      <h2>Types of Insurance We Offer</h2>
      <ul>
        <li><strong>Health Insurance:</strong> Covers hospitalisation, surgery, and medical expenses.</li>
        <li><strong>Life Insurance:</strong> Provides financial security to your family in case of your demise.</li>
        <li><strong>Car Insurance:</strong> Mandatory third-party cover plus comprehensive protection for your vehicle.</li>
        <li><strong>Bike Insurance:</strong> Two-wheeler insurance for bikes and scooters.</li>
        <li><strong>Travel Insurance:</strong> Covers trip cancellations, medical emergencies abroad, and lost baggage.</li>
      </ul>

      <h2>How to Choose the Right Plan</h2>
      <ul>
        <li>Compare premiums across insurers</li>
        <li>Check claim settlement ratio (higher is better)</li>
        <li>Review coverage limits and exclusions</li>
        <li>Check network hospitals for health insurance</li>
        <li>Read the fine print on deductibles and co-payments</li>
      </ul>

      <blockquote>A good claim settlement ratio (above 95%) is the most important factor when choosing an insurance company.</blockquote>
    `,
  },
  {
    id: 8,
    slug: 'rental-agreement-bangalore-legal-requirements-format-fees',
    cat: 'Rental Agreement', featured: false,
    title:   'How to Create a Rental Agreement in Bangalore — Legal Requirements, Format & Fees',
    excerpt: 'Everything landlords and tenants need to know about drafting a legally valid rental agreement in Karnataka.',
    date: 'Feb 20, 2026', readTime: '6 min',
    gradient: 'linear-gradient(145deg, #431407 0%, #9a3412 55%, #ea580c 100%)',
    Icon: Home,
    content: `
      <h2>What is a Rental Agreement?</h2>
      <p>A rental agreement is a legally binding contract between a landlord and tenant that defines the terms and conditions of the tenancy. In Bangalore and across Karnataka, rental agreements are typically made for 11 months to avoid mandatory registration.</p>

      <h2>Why 11 Months?</h2>
      <p>Under the Registration Act, 1908, rental agreements for 12 months or more must be registered with the Sub-Registrar's Office, which involves stamp duty and registration fees. Most landlords and tenants prefer 11-month agreements to avoid this additional cost and process.</p>

      <h2>Key Components of a Rental Agreement</h2>
      <ul>
        <li>Names and addresses of landlord and tenant</li>
        <li>Property address and description</li>
        <li>Monthly rent amount and due date</li>
        <li>Security deposit amount and conditions for refund</li>
        <li>Duration of the agreement</li>
        <li>Maintenance responsibilities</li>
        <li>Notice period for termination</li>
      </ul>

      <blockquote>Always get your rental agreement notarised for added legal validity. While not mandatory, notarisation strengthens the document's legal standing.</blockquote>

      <h2>Fees for Rental Agreement in Bangalore</h2>
      <ul>
        <li>Stamp Paper: ₹20 to ₹200 (depending on rent and deposit)</li>
        <li>Notary Charges: ₹200 to ₹500</li>
        <li>MakeMyDocuments Service: ₹300 (drafting) + ₹50 (booking)</li>
      </ul>
    `,
  },
  {
    id: 9,
    slug: 'msme-registration-online-india-2026',
    cat: 'MSME Certificate', featured: false,
    title:   'MSME Registration Online in India — Step-by-Step Guide for Small Businesses 2026',
    excerpt: 'Register on Udyam portal, get Udyog Aadhaar, and unlock government benefits for MSMEs.',
    date: 'Feb 12, 2026', readTime: '8 min',
    gradient: 'linear-gradient(145deg, #1a1a4e 0%, #3730a3 55%, #6366f1 100%)',
    Icon: Building2,
    content: `
      <h2>What is MSME Registration?</h2>
      <p>MSME (Micro, Small and Medium Enterprises) registration, also known as Udyam Registration, is a government certification that classifies businesses based on their investment and turnover. It unlocks numerous government schemes and benefits.</p>

      <h2>Who Can Register?</h2>
      <ul>
        <li>Micro Enterprises: Investment up to ₹1 crore, Turnover up to ₹5 crore</li>
        <li>Small Enterprises: Investment up to ₹10 crore, Turnover up to ₹50 crore</li>
        <li>Medium Enterprises: Investment up to ₹50 crore, Turnover up to ₹250 crore</li>
      </ul>

      <h2>Benefits of MSME Registration</h2>
      <ul>
        <li>Collateral-free loans under CGTMSE scheme</li>
        <li>Priority sector lending from banks</li>
        <li>Subsidies on patent registration and ISO certification</li>
        <li>Protection against delayed payments</li>
        <li>Eligibility for government tenders</li>
        <li>Tax benefits and exemptions</li>
      </ul>

      <blockquote>MSME registration is free of cost on the Udyam Registration Portal. Beware of fraudulent websites charging fees for registration.</blockquote>
    `,
  },
  {
    id: 10,
    slug: 'police-clearance-certificate-india-2026',
    cat: 'Police Clearance Certificate', featured: false,
    title:   'How to Get a Police Clearance Certificate (PCC) in India — Complete 2026 Guide',
    excerpt: 'Step-by-step process for applying PCC for passport, jobs abroad, visa applications and immigration.',
    date: 'Feb 5, 2026', readTime: '5 min',
    gradient: 'linear-gradient(145deg, #0f172a 0%, #1e3a5f 55%, #2563eb 100%)',
    Icon: ClipboardCheck,
    content: `
      <h2>What is a Police Clearance Certificate (PCC)?</h2>
      <p>A Police Clearance Certificate (PCC) is an official document issued by the police that certifies whether or not the applicant has any criminal record. It is required for immigration, international jobs, and long-term visa applications.</p>

      <h2>When is PCC Required?</h2>
      <ul>
        <li>Immigration to foreign countries (Australia, Canada, USA, UK)</li>
        <li>Employment abroad</li>
        <li>Long-term visa applications (more than 6 months)</li>
        <li>Student visas for certain countries</li>
        <li>Permanent residency applications</li>
      </ul>

      <h2>Documents Required</h2>
      <ul>
        <li>Valid Passport (copy)</li>
        <li>Aadhaar Card</li>
        <li>Proof of Address</li>
        <li>Application form (filled online via Passport Seva portal)</li>
        <li>Recent passport-sized photographs</li>
      </ul>

      <blockquote>PCC for passport holders is processed through the Passport Seva portal. Non-passport holders can apply through the local police station.</blockquote>

      <h2>Processing Time</h2>
      <p>PCC is typically issued within <strong>5–10 working days</strong> after police verification is complete. MakeMyDocuments helps expedite the process with proper documentation.</p>
    `,
  },
  {
    id: 11,
    slug: 'police-verification-certificate-passport-process',
    cat: 'Police Verification', featured: false,
    title:   'Police Verification Certificate for Passport — Process, Documents & Timeline',
    excerpt: 'Understand when police verification is required, how it works, and how to complete it without delays.',
    date: 'Jan 28, 2026', readTime: '5 min',
    gradient: 'linear-gradient(145deg, #052e16 0%, #166534 55%, #22c55e 100%)',
    Icon: BadgeCheck,
    content: `
      <h2>What is Police Verification for Passport?</h2>
      <p>Police verification is a mandatory background check conducted by local police to confirm the identity, address, and character of a passport applicant. It is part of the standard passport issuance process in India.</p>

      <h2>Types of Police Verification</h2>
      <ul>
        <li><strong>Pre-Police Verification:</strong> Required for fresh passport applications from applicants without any previous passport.</li>
        <li><strong>Post-Police Verification:</strong> Conducted after passport issuance for re-issue or renewal cases.</li>
        <li><strong>No Verification Required:</strong> For Tatkal applications with specific documents.</li>
      </ul>

      <h2>How to Clear Police Verification Quickly</h2>
      <ul>
        <li>Ensure your address on Aadhaar matches your application</li>
        <li>Be available at home during verification visit</li>
        <li>Keep all original documents ready</li>
        <li>Inform neighbours about the expected police visit</li>
      </ul>

      <blockquote>Most passport delays are due to police verification issues. Ensure your address documents are updated and consistent before applying.</blockquote>
    `,
  },
  {
    id: 12,
    slug: 'lease-agreement-vs-rental-agreement-differences',
    cat: 'Lease Agreement', featured: false,
    title:   'Lease Agreement vs Rental Agreement — Key Differences, Format & Legal Requirements',
    excerpt: 'Understand the legal difference between a lease and a rental agreement and which one you need.',
    date: 'Jan 18, 2026', readTime: '6 min',
    gradient: 'linear-gradient(145deg, #4a044e 0%, #86198f 55%, #e879f9 100%)',
    Icon: FileText,
    content: `
      <h2>Lease Agreement vs Rental Agreement</h2>
      <p>Many people use "lease agreement" and "rental agreement" interchangeably, but they have important legal differences. Understanding the distinction helps you choose the right document for your property transaction.</p>

      <h2>Key Differences</h2>
      <ul>
        <li><strong>Duration:</strong> Rental agreements are typically for 11 months; Lease agreements are for 12 months or more.</li>
        <li><strong>Registration:</strong> Lease agreements (12+ months) must be registered; Rental agreements usually don't require registration.</li>
        <li><strong>Flexibility:</strong> Rental agreements can be renewed easily; Lease agreements are more rigid.</li>
        <li><strong>Stamp Duty:</strong> Higher stamp duty applies to long-term lease agreements.</li>
        <li><strong>Legal Protection:</strong> Both offer legal protection, but registered leases carry stronger legal weight.</li>
      </ul>

      <h2>When to Use a Lease Agreement</h2>
      <ul>
        <li>Long-term commercial property rentals</li>
        <li>Industrial property leases</li>
        <li>When both parties want a fixed, long-term arrangement</li>
        <li>When the tenant needs stronger security of tenure</li>
      </ul>

      <blockquote>When in doubt about which document you need, consult MakeMyDocuments. Our legal experts will help you choose the right agreement for your situation.</blockquote>

      <h2>How MakeMyDocuments Helps</h2>
      <p>We draft both rental and lease agreements tailored to Karnataka law. Our team ensures all clauses are legally valid and protects the interests of both landlord and tenant.</p>
    `,
  },
]

// ─────────────────────────────────────────────────────────────
// fetchBlogPosts — swap this body to hit your real API
// ─────────────────────────────────────────────────────────────
export async function fetchBlogPosts() {
  await new Promise(r => setTimeout(r, 600))
  return BLOG_POSTS
}

export function getBlogBySlug(slug) {
  return BLOG_POSTS.find(p => p.slug === slug) || null
}

export function getRelatedPosts(currentId, cat, count = 3) {
  return BLOG_POSTS
    .filter(p => p.id !== currentId && p.cat === cat)
    .slice(0, count)
    .concat(
      BLOG_POSTS.filter(p => p.id !== currentId && p.cat !== cat)
    )
    .slice(0, count)
}
