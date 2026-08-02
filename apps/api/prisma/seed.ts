import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.appointmentRequest.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.service.deleteMany();

  const services = await Promise.all([
    prisma.service.create({
      data: {
        slug: 'medicina-familia',
        name: 'Medicina de familia',
        summary: 'Seguimiento integral del adulto y crónicos.',
        description:
          'Consultas de medicina de familia para prevención, crónicos y problemas no urgentes. El equipo coordina derivaciones cuando hace falta.',
        iconKey: 'heart',
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        slug: 'pediatria',
        name: 'Pediatría',
        summary: 'Niños y adolescentes del barrio.',
        description:
          'Controles del niño sano, vacunas y consultas pediátricas no urgentes con cita previa.',
        iconKey: 'child',
        sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        slug: 'enfermeria',
        name: 'Enfermería',
        summary: 'Curas, controles y educación sanitaria.',
        description:
          'Tomas de tensión, curas, inyectables y educación para el autocuidado. Solicita cita indicando el motivo.',
        iconKey: 'nurse',
        sortOrder: 3,
      },
    }),
    prisma.service.create({
      data: {
        slug: 'salud-mujer',
        name: 'Salud de la mujer',
        summary: 'Orientación y seguimiento básico.',
        description:
          'Consultas de orientación y seguimiento básico. No sustituye urgencias hospitalarias.',
        iconKey: 'flower',
        sortOrder: 4,
      },
    }),
  ]);

  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        slug: 'elena-ruiz',
        fullName: 'Dra. Elena Ruiz',
        roleTitle: 'Médica de familia',
        bio: '15 años en atención primaria. Especial interés en crónicos y cuidadoras.',
        photoUrl: '/assets/doctors/elena-ruiz.jpg',
        sortOrder: 1,
      },
    }),
    prisma.doctor.create({
      data: {
        slug: 'martin-vega',
        fullName: 'Dr. Martín Vega',
        roleTitle: 'Médico de familia',
        bio: 'Medicina de familia y comunitaria. Enfoque en prevención y salud laboral.',
        photoUrl: '/assets/doctors/martin-vega.jpg',
        sortOrder: 2,
      },
    }),
    prisma.doctor.create({
      data: {
        slug: 'aisha-mensah',
        fullName: 'Dra. Aisha Mensah',
        roleTitle: 'Pediatra',
        bio: 'Pediatría de barrio. Controles del niño sano y adolescencia.',
        photoUrl: '/assets/doctors/aisha-mensah.jpg',
        sortOrder: 3,
      },
    }),
    prisma.doctor.create({
      data: {
        slug: 'yuki-tanaka',
        fullName: 'Yuki Tanaka',
        roleTitle: 'Enfermera',
        bio: 'Enfermería de familia, curas y educación sanitaria.',
        photoUrl: '/assets/doctors/yuki-tanaka.jpg',
        sortOrder: 4,
      },
    }),
  ]);

  await prisma.appointmentRequest.create({
    data: {
      patientName: 'María López (demo)',
      phone: '612345678',
      email: 'maria.demo@example.com',
      preferredSlot: 'MORNING',
      preferredDoctorId: doctors[0].id,
      serviceId: services[0].id,
      reason: 'Revisión de tensión y medicación de la madre.',
      status: 'NEW',
    },
  });

  console.log('Seed MERIDIANA OK', { services: services.length, doctors: doctors.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
