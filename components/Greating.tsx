import { getServerSession } from 'next-auth'

const Greating = async () => {
  const session = await getServerSession()
  const username = session?.user?.name
  return (
    <p className="text-2xl ">
      hi{' '}
      <span className=" text-primary font-semibold ">
        {username === 'toota' ? 'a7la' : ''} {username}
      </span>{' '}
      !
    </p>
  )
}

export default Greating
