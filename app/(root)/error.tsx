'use client'

interface Props {
  error: Error
  reset: () => void
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log('error', error)
  return (
    <>
      <div>An anexpected error has occured.</div>
      <button className="btn btn-warning" onClick={() => reset()}>
        Retry
      </button>
    </>
  )
}

export default ErrorPage
