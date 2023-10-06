interface Props {
  params: { id: number }
}

const PatientDetailPage = ({ params: { id } }: Props) => {
  return (
    <>
      <h1 className=" text-4xl custom-scrollbar font-extrabold tracking-tight lg:text-5xl mb-5">
        Le Patient - {id}
      </h1>
    </>
  )
}

export default PatientDetailPage
