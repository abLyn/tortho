import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Patient } from '@prisma/client'
import ClinicalCases from '../../cases/ClinicalCases'
import NewCaseForm from '../../cases/new/NewCaseForm'
import AboutPatient from './AboutPatient'

import prisma from '@/prisma/PrismaClient'
import PaymentForm from '@/app/(root)/payments/PaymentForm'

const PatientTabs = async ({ patient }: { patient: Patient }) => {
  const patientCases = await prisma.clinicalCase.findMany({
    where: { patientId: patient.id },
  })

  return (
    <Tabs defaultValue="clinicalCases" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="clinicalCases">Cas Cliniques</TabsTrigger>

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
    </Tabs>
  )
}
export default PatientTabs
