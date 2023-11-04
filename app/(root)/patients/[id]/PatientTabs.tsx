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
import ProfilePatient from './PatientHeader'
import AboutPatient from './AboutPatient'
import NewCaseForm from '../../cases/NewCaseForm'

const PatientTabs = ({ patient }: { patient: Patient }) => {
  return (
    <Tabs defaultValue="clinicalCases" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="clinicalCases">Cas Cliniques</TabsTrigger>
        <TabsTrigger value="newCase">Nouveau cas</TabsTrigger>
        <TabsTrigger value="about">A Propos </TabsTrigger>
      </TabsList>

      <TabsContent value="clinicalCases">
        <Card>
          <CardContent className="space-y-2">
            <ClinicalCases patient={patient} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="about">
        <AboutPatient patient={patient} />
      </TabsContent>

      <TabsContent value="newCase">
        <Card>
          <NewCaseForm patientId={patient.id} />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default PatientTabs
