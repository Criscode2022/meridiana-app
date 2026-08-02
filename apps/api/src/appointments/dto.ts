import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { AppointmentStatus, PreferredSlot } from '@prisma/client';

export class CreateAppointmentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  patientName!: string;

  @IsString()
  @Matches(/^[0-9+\s()-]{9,20}$/, { message: 'Teléfono no válido' })
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(PreferredSlot)
  preferredSlot?: PreferredSlot;

  @IsOptional()
  @IsString()
  preferredDoctorId?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  reason!: string;
}

export class UpdateAppointmentDto {
  @IsEnum(AppointmentStatus)
  status!: AppointmentStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  receptionNotes?: string;
}
