import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000/api';

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  iconKey: string;
}

export interface Doctor {
  id: string;
  slug: string;
  fullName: string;
  roleTitle: string;
  bio: string;
  photoUrl: string;
  acceptsAppointments: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string | null;
  preferredSlot: string;
  reason: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
  preferredDoctor?: Doctor | null;
  service?: ServiceItem | null;
}

export interface CreateAppointment {
  patientName: string;
  phone: string;
  email?: string;
  preferredSlot?: string;
  preferredDoctorId?: string;
  serviceId?: string;
  reason: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${API}/services`);
  }
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${API}/doctors`);
  }
  createAppointment(body: CreateAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${API}/appointments`, body);
  }
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${API}/appointments`);
  }
  updateAppointment(id: string, status: string): Observable<Appointment> {
    return this.http.patch<Appointment>(`${API}/appointments/${id}`, { status });
  }
}
