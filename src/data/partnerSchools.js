/**
 * Partner school list (Delhi NCR). Used by the Network section's "Partner
 * Schools" tab and the Participate wizard's school step — update this one
 * file, not each consumer. The trailing "Other / Not Listed" entry
 * (`isOther: true`) is a UI fallback, not a real partner, and is filtered
 * out where it shouldn't appear (see `data/network.js`).
 *
 * NOT used by the Player Onboarding dropdown anymore — that now fetches
 * verified schools live from the backend (`GET /schools`, see
 * `pnp-backend/src/institutions`), which is seeded with this same list
 * (see `pnp-backend/scripts/seed-schools.ts`) plus any school that
 * self-registers and verifies via `SchoolOnboardForm`. If a new partner
 * school is added here, also add it to the backend (submit it through the
 * onboarding form, or add it to the seed script and re-run `npm run
 * seed:schools` in pnp-backend) so it appears in both places.
 */
export const partnerSchools = [
  { id: 'ps-1', name: 'Delhi Public School, Mathura Road' },
  { id: 'ps-2', name: 'Modern School, Barakhamba Road' },
  { id: 'ps-3', name: 'Vasant Valley School, South Delhi' },
  { id: 'ps-4', name: 'Delhi Public School, R.K. Puram' },
  { id: 'ps-5', name: "St. Xavier's School, Raj Niwas Marg" },
  { id: 'ps-6', name: 'Sanskriti School, New Delhi' },
  { id: 'ps-7', name: 'Indraprastha World School, Paschim Vihar' },
  { id: 'ps-8', name: 'Kulachi Hansraj, Ashok Vihar' },
  { id: 'ps-9', name: 'Modern School Vasant Vihar, Vasant Vihar' },
  { id: 'ps-10', name: 'Hansraj Model School, Punjabi Bagh' },
  { id: 'ps-11', name: 'St Marks, Paschim Vihar' },
  { id: 'ps-12', name: 'Sachdeva Global, Dwarka' },
  { id: 'ps-13', name: 'Lilawati Vidya, Shakti Nagar' },
  { id: 'ps-14', name: 'DPS, Vasant Kunj' },
  { id: 'ps-15', name: 'Sumermal Jain Public School, Janak Puri' },
  { id: 'ps-16', name: 'Gyan Bharti Public School, Saket' },
  { id: 'ps-17', name: 'Salwan Public School, Rajender Nagar' },
  { id: 'ps-other', name: 'Other / Not Listed', isOther: true },
]
