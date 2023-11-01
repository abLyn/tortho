import { Input } from '@/components/ui/input'
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

export default function SearchBar() {
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          dolores delectus accusantium ea neque quis libero quasi recusandae
          ipsa dignissimos modi itaque accusamus velit id, quia error nobis
          necessitatibus doloribus aperiam consectetur officiis facilis veniam.
          Molestias molestiae animi laudantium obcaecati fugiat corporis. Alias
          explicabo quibusdam ab modi sunt nemo voluptatum m mollitia incidunt
          nisi! Suscipit fugiat accusantium error, rem labore unde similique
          cumque messitatibus id quas ducimus molestiae repudiandae illo
          assumenda, dolorum dolor deleniti repellat debitis quam non excepturi
          expedita ab officiis. In perspiciatis nisi quidem temporibus nihil.
          Officia maiores doloribus perspiciatis deserunt a?
        </p>
      </DialogContent>
    </Dialog>
  )
}
