import SearchBar from '@/components/header/SearchBar'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Recherche
      </h1>
      <div className="flex gap-1">
        <SearchBar /> <Button> Go!</Button>
      </div>
    </>
  )
}

export default Home
