import NewCaseForm from '../../NewCaseForm'

const NewCasePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <NewCaseForm patientId={params.id} />
    </>
  )
}

export default NewCasePage
