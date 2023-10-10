import Link from 'next/link'
import Links from './Links'

export default function Sidebar() {
  return (
    <section className="  sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r-slate-900   pb-5 pt-28 bg-slate-200 dark:bg-slate-900 custom-scrollbar">
      <Links />
    </section>
  )
}
