import { partnerSchools } from './partnerSchools'

/**
 * Placeholder people/partner directory, grouped by category — pre-launch, so
 * every entry here is a sample pending real onboarding. Each category is
 * shown as its own tab in the Network section. `placeholder: true` marks
 * every entry so a future real-content pass can grep for it.
 */
export const networkCategories = [
  {
    key: 'schools',
    label: 'Partner Schools',
    entries: partnerSchools
      .filter((school) => !school.isOther)
      .map((school) => ({ name: school.name, role: 'Partner School' })),
  },
  {
    key: 'ambassadors',
    label: 'Brand Ambassadors',
    entries: [
      { name: 'To Be Announced', role: 'Brand Ambassador', placeholder: true },
      { name: 'To Be Announced', role: 'Brand Ambassador', placeholder: true },
    ],
  },
  {
    key: 'team',
    label: 'Internal Team',
    entries: [
      { name: 'Sample Name', role: 'Operations Lead', placeholder: true },
      { name: 'Sample Name', role: 'Technology Lead', placeholder: true },
      { name: 'Sample Name', role: 'Partnerships Lead', placeholder: true },
    ],
  },
  {
    key: 'commissioners',
    label: 'League Commissioners',
    entries: [
      { name: 'To Be Announced', role: 'League Commissioner', placeholder: true },
    ],
  },
  {
    key: 'promoters',
    label: 'Promoters',
    entries: [
      { name: 'Sample Name', role: 'Promoter', placeholder: true },
    ],
  },
  {
    key: 'investors',
    label: 'Investors',
    entries: [
      { name: 'To Be Announced', role: 'Investor', placeholder: true },
    ],
  },
]
