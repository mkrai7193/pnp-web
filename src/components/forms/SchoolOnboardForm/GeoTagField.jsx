import { useState } from 'react'
import FormField from '@/components/ui/FormField'
import styles from './SchoolOnboardForm.module.css'

/**
 * Captures the school's location. "Use My Current Location" reads the
 * browser's Geolocation API, then reverse-geocodes those coordinates
 * (via OpenStreetMap's free Nominatim API — no API key needed) into a
 * full address, auto-filling Address/City/State/Zip below. Those fields
 * are always visible and editable — geolocation just pre-fills them, it
 * never blocks manual entry (denied permission, an unsupported browser,
 * or a failed lookup all fall back to the same fields, already on screen).
 */
export default function GeoTagField({
  coords,
  setCoords,
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
}) {
  const [status, setStatus] = useState('idle') // idle | locating | detecting | done | error
  const [errorHint, setErrorHint] = useState('')

  const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
      { headers: { Accept: 'application/json' } },
    )
    if (!res.ok) throw new Error('Reverse geocoding failed')
    const data = await res.json()
    const a = data.address || {}

    const streetLine = [a.house_number, a.road || a.suburb || a.neighbourhood].filter(Boolean).join(' ')
    setAddress(streetLine || data.display_name || '')
    setCity(a.city || a.town || a.village || a.county || '')
    setState(a.state || '')
    setZipCode(a.postcode || '')
  }

  const handleLocate = () => {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setErrorHint("This browser doesn't support location access — enter the school's address manually below.")
      return
    }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(6)
        const lng = position.coords.longitude.toFixed(6)
        setCoords({ lat, lng })
        setStatus('detecting')
        try {
          await reverseGeocode(lat, lng)
          setStatus('done')
        } catch {
          setStatus('error')
          setErrorHint("Got your location, but couldn't look up the address automatically — please fill it in below.")
        }
      },
      () => {
        setStatus('error')
        setErrorHint("Couldn't access your location — enter the school's address manually below.")
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <div className={styles.geoGroup}>
      <label>Geotagging</label>
      <button
        type="button"
        className={styles.geoButton}
        onClick={handleLocate}
        disabled={status === 'locating' || status === 'detecting'}
      >
        {status === 'locating' && 'Locating…'}
        {status === 'detecting' && 'Detecting address…'}
        {(status === 'idle' || status === 'done' || status === 'error') && '📍 Use My Current Location'}
      </button>

      {status === 'done' && coords && (
        <p className={styles.geoResult}>✓ Location detected — address filled in below (edit if needed).</p>
      )}

      {status === 'error' && <p className={styles.geoHint}>{errorHint}</p>}

      <div className={styles.addressFields}>
        <FormField
          id="school-address"
          label="Address"
          placeholder="Street, area"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className={styles.addressRow}>
          <FormField id="school-city" label="City" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <FormField id="school-state" label="State" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
          <FormField
            id="school-zip"
            label="Zip / Postal Code"
            placeholder="110001"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
