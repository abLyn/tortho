import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative w-50 mr-5">
      <Search
        name="search"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
      />
      <Input type="text" placeholder="Search" className="pl-12 pr-4" />
    </div>
  )
}
