import Greating from '@/components/Greating'
import LatestCases from './dashboard/LatestCases'

const Home = () => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Bienvenue!
      </h1>
      <Greating />
      <p>Have a nice day</p>
    </>
  )
}

export default Home
