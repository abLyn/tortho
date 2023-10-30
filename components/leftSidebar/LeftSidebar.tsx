import Links from './Links'
import Today from './Today'

export default function LeftSidebar() {
  return (
    <section className="  sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto   pb-5 pt-28 bg-slate-200  dark:bg-slate-900 custom-scrollbar">
      <Links />
      <Today />
    </section>
  )
}
