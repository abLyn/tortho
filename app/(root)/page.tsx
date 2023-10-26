import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import Pagination from '../../components/Pagination'

const Home = () => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Bienvenu!
      </h1>

      <p>Have a nice day</p>

      <Pagination itemCount={100} pageSize={10} currentPage={5} />
    </>
  )
}

export default Home
