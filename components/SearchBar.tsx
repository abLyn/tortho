import { Search } from 'lucide-react'
import { Button } from './ui/button'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from './ui/separator'
import SearchField from './SearchField'
import prisma from '@/prisma/PrismaClient'
import Link from 'next/link'
import { ScrollArea } from './ui/scroll-area'

interface Props {
  query: string
}

const SearchBar = async ({ query }: Props) => {
  const patients = await prisma.patient.findMany({
    where: {
      OR: [
        { firstname: { startsWith: query } },
        { lastname: { startsWith: query } },
      ],
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-72 rounded-lg text-gray-400  space-x-2 hover:text-gray-400 cursor-text hover:bg-transparent"
        >
          <Search className="flex-none  w-5 h-5  -ml-1 " />
          <span className="text-sm flex-1 text-left">Recherche...</span>
          <span className="text-xs border rounded-md font-semibold px-1 ml-10">
            Ctrl+k
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent >
        <div className="relative w-50 mr-5">
          <Search
            name="search"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
          />
          <SearchField />
        </div>
        {patients.length > 0 && (
          <>
            <Separator />
            <ScrollArea className="h-[300px] w-full  ">
              <ul className=" flex flex-col gap-3 p-2 items-center">
                {patients.map((patient) => (
                  <li
                    key={patient.id}
                    className="  transition-all ease-in-out duration-300  hover:font-bold    hover:text-primary  hover:scale-150"
                  >
                    <Link href={'/patients/' + patient.id}>
                      {patient.lastname + ' ' + patient.firstname}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
