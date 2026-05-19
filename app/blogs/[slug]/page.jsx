import BlogDetail from '@/views/BlogDetail'

const SLUGS = [
  'how-to-apply-for-passport-online-india-2026',
  'vietnam-tourist-visa-indians-2026-guide',
  'pan-card-new-rules-april-2026',
  'senior-citizen-card-bangalore-online-documents-benefits',
  'dubai-tourist-visa-from-india-2026',
  'how-to-apply-pan-card-online-india',
  'complete-guide-vehicle-health-insurance-india',
  'rental-agreement-bangalore-legal-requirements-format-fees',
  'msme-registration-online-india-2026',
  'police-clearance-certificate-india-2026',
  'police-verification-certificate-passport-process',
  'lease-agreement-vs-rental-agreement-differences',
]

export function generateStaticParams() {
  return SLUGS.map(slug => ({ slug }))
}

export default function Page() {
  return <BlogDetail />
}
