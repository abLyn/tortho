import LatestCases from './LatestCases'
import Search from './Search'

const dashboardPage = () => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Dashboard
      </h1>
      <LatestCases />
      <Search />
    </>
  )
}

export default dashboardPage
