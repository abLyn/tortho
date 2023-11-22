import { PropsWithChildren } from 'react'

const ErrorMessege = ({ children }: PropsWithChildren) => {
  if (!children) return null

  return <p className=" text-destructive ml-5 mt-1 text-sm">{children}</p>
}

export default ErrorMessege
