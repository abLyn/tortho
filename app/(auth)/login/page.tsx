import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './form'

import Link from 'next/link'

export default function SignInForm() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className=" m-auto ">
        <Card className="bg-slate-100 dark:bg-slate-900 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className=" text-4xl font-extrabold  lg:text-3xl mb-3 required">
              S&apos;identifier
            </CardTitle>
          </CardHeader>
          <LoginForm />
          <CardFooter className="flex flex-col gap-6">
            <Link href="/register">
              <Button variant="ghost">Creer nouveau compte</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
