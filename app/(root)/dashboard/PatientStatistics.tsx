import prisma from '@/prisma/PrismaClient'

const PatientStatistics = async () => {
  const patientsCount = await prisma.patient.count()
  return (
    <div className="border w-fit">
      <p>Total des patients enregistrés: {patientsCount}</p>
      <p>Patients vus au cours des 6 derniers mois:</p>
      <p>Patients ayant des dettes impayées:</p>
      <p>Nouveaux patients traités dans le mois:</p>
    </div>
  )
}

export default PatientStatistics
