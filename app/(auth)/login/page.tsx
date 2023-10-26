import Link from 'next/link'

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LoginForm from './form'

export default function SignInForm() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className=" m-auto ">
        <Card className="bg-muted/50 p-5 shadow-xl  ">
          <CardHeader className="space-y-1">
            <CardTitle className=" text-4xl font-extrabold  lg:text-3xl mb-3 required">
              S&apos;identifier
            </CardTitle>
          </CardHeader>
          <LoginForm />
          <CardFooter className="flex flex-col gap-6">
            <Button variant="ghost">
              <Link href="/register" className="cursor-not-allowed">
                Creer nouveau compte
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
