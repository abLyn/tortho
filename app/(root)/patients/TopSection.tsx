import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import Filters from './PatientsFilters'

const TopSection = ({ query }: { query: string }) => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Patients
      </h1>
      <div className="flex justify-between">
        <SearchBar query={query} />
        <Filters />
        <Button asChild className="px-8 mb-10">
          <Link href="patients/new" className="gap-2">
            <UserPlus /> Nouveau
          </Link>
        </Button>
      </div>
    </>
  )
}

export default TopSection
