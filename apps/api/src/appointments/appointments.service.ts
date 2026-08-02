import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAppointmentDto) {
    return this.prisma.appointmentRequest.create({
      data: {
        patientName: dto.patientName,
        phone: dto.phone,
        email: dto.email,
        preferredSlot: dto.preferredSlot ?? 'ANY',
        preferredDoctorId: dto.preferredDoctorId || null,
        serviceId: dto.serviceId || null,
        reason: dto.reason,
      },
    });
  }

  findAll() {
    return this.prisma.appointmentRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        preferredDoctor: true,
        service: true,
      },
    });
  }

  async update(id: string, dto: UpdateAppointmentDto) {
    try {
      return await this.prisma.appointmentRequest.update({
        where: { id },
        data: {
          status: dto.status,
          receptionNotes: dto.receptionNotes,
        },
      });
    } catch {
      throw new NotFoundException('Solicitud no encontrada');
    }
  }
}
