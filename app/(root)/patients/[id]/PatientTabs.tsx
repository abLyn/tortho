import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ClinicalCases from '../../cases/ClinicalCases'
import { Patient } from '@prisma/client'

const PatientTabs = ({ patient }: { patient: Patient }) => {
  return (
    <Tabs defaultValue="clinicalCases" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="clinicalCases">Cas Cliniques</TabsTrigger>
        <TabsTrigger value="tab2">tab2</TabsTrigger>
      </TabsList>
      <TabsContent value="clinicalCases">
        <Card>
          <CardContent className="space-y-2">
            <ClinicalCases patient={patient} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tab2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you l be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default PatientTabs
