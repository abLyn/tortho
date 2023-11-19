import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Patient } from '@prisma/client'
import ClinicalCases from '../../cases/ClinicalCases'
import NewCaseForm from '../../cases/NewCaseForm'
import AboutPatient from './AboutPatient'
import PaymentForm from './PaymentFormServerAction'
import prisma from '@/prisma/PrismaClient'

const PatientTabs = async ({ patient }: { patient: Patient }) => {
  const patientCases = await prisma.clinicalCase.findMany({
    where: { patientId: patient.id },
  })

  return (
    <Tabs defaultValue="clinicalCases" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="clinicalCases">Cas Cliniques</TabsTrigger>
        <TabsTrigger value="newCase">Nouveau cas</TabsTrigger>
        <TabsTrigger value="payment"> + Versement</TabsTrigger>
        <TabsTrigger value="about">A Propos </TabsTrigger>
      </TabsList>

      <TabsContent value="clinicalCases">
        <Card>
          <CardContent className="space-y-2">
            <ClinicalCases patient={patient} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payment">
        <Card>
          <CardContent className="space-y-2">
            <PaymentForm patientCases={patientCases} />
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
