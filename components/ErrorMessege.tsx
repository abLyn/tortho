import { PropsWithChildren } from 'react'

const ErrorMessege = ({ children }: PropsWithChildren) => {
  if (!children) return null

  return <p className="text-destructive pl-4  text-sm">{children}</p>
}

export default ErrorMessege
