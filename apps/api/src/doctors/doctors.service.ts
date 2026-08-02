import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.doctor.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
