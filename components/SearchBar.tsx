import { Search } from 'lucide-react'
import { Button } from './ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from './ui/separator'
import SearchField from './SearchField'
import prisma from '@/prisma/PrismaClient'

const SearchBar = async ({ query }: { query: string }) => {
  const patients = await prisma.patient.findMany({
    where: {
      firstname: { startsWith: query },
    },
  })
  console.log(query)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-72 rounded-lg text-gray-400  space-x-2"
        >
          <Search className="flex-none  w-5 h-5  -ml-1 " />
          <span className="text-sm flex-1 text-left">Recherche...</span>
          <span className="text-xs border rounded-md font-semibold px-1 ml-10">
            Ctrl+k
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="relative w-50 mr-5">
          <Search
            name="search"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
          />
          <SearchField />
        </div>
        <Separator />
        <p>{query}</p>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
