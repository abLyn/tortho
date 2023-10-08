import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Link from 'next/link'
import RegisterForm from './form'

export default function SignUpForm() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-sm m-auto ">
        <Card className="bg-slate-100 dark:bg-slate-900 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className=" text-4xl font-extrabold  lg:text-3xl mb-3 required">
              S&apos;inscrire
            </CardTitle>
          </CardHeader>
          <RegisterForm />
          <CardFooter className="flex flex-col gap-6">
            <Link href="/login">
              <Button variant="ghost">Se connecter</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
