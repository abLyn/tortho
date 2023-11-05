import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth/next'

const Greating = async () => {
  const session = await getServerSession(authOptions)
  const username = session?.user.name
  const role = session?.user?.role.toLowerCase()

  return (
    <>
      <p className="text-3xl  mb-2">
        hi{' '}
        <span className=" text-primary font-semibold ">
          {username === 'toota' ? 'a7la' : ''} {username}
        </span>{' '}
        !
      </p>
      <p>
        Have a nice day{' '}
        <span className="text-md text-green-400 font-semibold">{role}</span>{' '}
      </p>
    </>
  )
}

export default Greating
