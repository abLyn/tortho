import NewCaseForm from '../../NewCaseForm'

const NewCasePage = ({ params }: { params: { patientId: string } }) => {
  return (
    <>
      <NewCaseForm patientId={params.patientId} />
    </>
  )
}

export default NewCasePage
