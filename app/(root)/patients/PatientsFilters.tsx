'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const filters = [
  { label: 'Tous les patients', value: 'All' },
  { label: 'Males', value: 'Male' },
  { label: 'Females', value: 'Female' },
]

const PatientsFilters = () => {
  return (
    <Select defaultValue="All">
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filters.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PatientsFilters
