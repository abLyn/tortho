import CCalendar from '@/components/CCalendar'
import SearchBar from '@/components/header/SearchBar'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl">
        hello Chaffa
      </h1>
      <Button> Click Me</Button>

      <p>Have a nice day</p>
      <CCalendar />
      <SearchBar />
    </>
  )
}

export default Home
