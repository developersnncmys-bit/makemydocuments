export const AFFIDAVIT_TYPES = [
  { slug: 'name-change-annexure-e', value: 'Name Change Affidavit (Annexure E)', desc: 'Legally declare a change in your name.' },
  { slug: 'name-change-minor',      value: 'Name Change Affidavit for Minor',    desc: 'Name change declaration for a child under 18.' },
  { slug: 'one-and-same-person',    value: 'One and the Same Person Affidavit',  desc: 'Declare that two names refer to the same person.' },
  { slug: 'change-of-signature',    value: 'Change of Signature Affidavit',      desc: 'Declare and record a change in your signature.' },
  { slug: 'other',                  value: 'Other',                              desc: 'Any other affidavit — tell us your requirement.' },
]

export const getAffidavitBySlug = (slug) => AFFIDAVIT_TYPES.find(a => a.slug === slug)
