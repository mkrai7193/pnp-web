import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/** Shared shell for every route: sticky nav, the routed page, then the footer. */
export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
