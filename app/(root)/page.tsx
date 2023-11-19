import Greating from '@/components/Greating'
import Image from 'next/image'

const Home = () => {
  return (
    <>
      <h1 className=" text-4xl lg:text-7xl custom-scrollbar font-extrabold tracking-tight  mb-5 bg-gradient-to-r from-foreground  to-primary inline-block text-transparent bg-clip-text">
        Bienvenue!
      </h1>
      <Greating />
    </>
  )
}

export default Home
