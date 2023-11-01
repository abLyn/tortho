import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'

const Section = ({ query }: { query: string }) => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Patients
      </h1>
      <div className="flex gap-8">
        <Button asChild className="px-8 mb-10">
          <Link href="patients/new" className="gap-2">
            <UserPlus /> Nouveau
          </Link>
        </Button>
        <SearchBar query={query} />
      </div>
    </>
  )
}

export default Section
