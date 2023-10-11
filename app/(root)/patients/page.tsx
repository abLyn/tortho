import Link from 'next/link'
import PatientsTable from './PatientsTable'

const Patients = () => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Patients
      </h1>
      <Link href="/patients/new" className="btn">
        New User
      </Link>

      <PatientsTable />
    </>
  )
}

export default Patients
