import FormField from '@/components/ui/FormField'
import { ageCategories } from '@/data/ageCategories'
import { genderCategories } from '@/data/genderCategories'

/** Step 2: age category and gender category for this team entry. */
export default function StepCategory({ data, update, errors }) {
  return (
    <div>
      <FormField
        as="select"
        id="participate-age"
        label="Age Category"
        required
        value={data.ageCategory}
        onChange={(e) => update({ ageCategory: e.target.value })}
        error={errors.ageCategory}
        options={[{ value: '', label: 'Select age category' }, ...ageCategories]}
      />
      <FormField
        as="select"
        id="participate-gender"
        label="Gender"
        required
        value={data.gender}
        onChange={(e) => update({ gender: e.target.value })}
        error={errors.gender}
        options={[{ value: '', label: 'Select gender category' }, ...genderCategories]}
      />
    </div>
  )
}
