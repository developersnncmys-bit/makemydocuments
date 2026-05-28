import { AFFIDAVIT_TYPES } from '@/data/affidavitTypes'
import AffidavitForm from '@/views/AffidavitForm'

export function generateStaticParams() {
  return AFFIDAVIT_TYPES.map(a => ({ type: a.slug }))
}

export default function Page() {
  return <AffidavitForm />
}
