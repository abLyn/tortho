import { getServerSession } from 'next-auth'

const Greating = async () => {
  const session = await getServerSession()
  const username = session?.user?.name
  return (
    <p className=" ">
      hello! <span className=" font-medium ">{username}</span>
    </p>
  )
}

export default Greating
