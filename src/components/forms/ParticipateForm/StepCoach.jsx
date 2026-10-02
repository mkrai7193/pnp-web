import FormField from '@/components/ui/FormField'

/** Step 4: the team's coach details. */
export default function StepCoach({ data, update, errors }) {
  return (
    <div>
      <FormField
        id="participate-coach-name"
        label="Coach Name"
        required
        placeholder="Coach's full name"
        value={data.coachName}
        onChange={(e) => update({ coachName: e.target.value })}
        error={errors.coachName}
      />
      <FormField
        id="participate-coach-mobile"
        label="Mobile Number of the Coach"
        type="tel"
        required
        placeholder="+91 XXXXX XXXXX"
        value={data.coachMobile}
        onChange={(e) => update({ coachMobile: e.target.value })}
        error={errors.coachMobile}
      />
    </div>
  )
}
