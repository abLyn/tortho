import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

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
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Input id="name" type="text" placeholder="Nom d'utilisateur" />
            </div>
            <div className="grid gap-2">
              <Input id="email" type="email" placeholder="Email" />
            </div>
            <div className="grid gap-2">
              <Input id="password" type="password" placeholder="Mot de passe" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <Button className="w-full">S&apos;inscrire</Button>
            <Link href="/login">
              <Button variant="ghost">Se connecter</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
