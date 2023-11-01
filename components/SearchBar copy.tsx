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
//--------------------------------------------------
import Link from 'next/link'
import { sort } from 'fast-sort'
import prisma from '@/prisma/PrismaClient'

interface Props {
  sortOrder: string
  query: string
}

const UserTable = async ({ sortOrder, query }: Props) => {
  const users = await prisma.user.findMany({
    where: {
      name: { startsWith: query },
    },
  })

  const sortedUsers = sort(users).asc(
    sortOrder === 'name' ? (user) => user.name : (user) => user.email
  )
  return (
    <table className="table table-bordred">
      <thead>
        <tr>
          <th className="text-xl">
            <Link href="/users?sortOrder=name">Name</Link>
          </th>
          <th className="text-xl">
            <Link href="/users?sortOrder=email">Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id} className="hover">
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserTable
