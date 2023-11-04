import { getServerSession } from 'next-auth'

const Greating = async () => {
  const session = await getServerSession()
  const username = session?.user.name
  const role = session?.user?.role
  console.log(session)
  return (
    <p className="text-2xl ">
      hi{' '}
      <span className=" text-primary font-semibold ">
        {username === 'toota' ? 'a7la' : ''} {username}
      </span>{' '}
      !{role}
    </p>
  )
}

export default Greating
