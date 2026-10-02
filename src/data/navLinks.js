/**
 * `href` starting with "#" is an in-page section anchor (only meaningful on
 * the homepage); `href` starting with "/" is a real route, always
 * navigable regardless of the current page. `Navbar`/`MobileMenu` branch on
 * this prefix rather than a separate `type` field.
 *
 * An item with `children` instead of `href` renders as a dropdown trigger
 * on desktop (hover/focus reveals the child links) and as a labeled group
 * in the mobile menu. Used for "Onboard" since two extra flat top-level
 * links didn't fit the nav on one line without wrapping/crowding — see
 * GUIDELINES.md's nav-width note.
 */
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how' },
  { label: 'The App', href: '#app' },
  { label: 'Leagues', href: '#leagues' },
  { label: 'Network', href: '#network' },
  // { label: 'Franchise', href: '#franchise' },
  { label: 'Sports', href: '#sports' },
  {
    label: 'Onboard',
    children: [
      { label: 'Onboard as Player', href: '/onboarding/player' },
      { label: 'Onboard Your School', href: '/onboarding/school' },
    ],
  },
]
