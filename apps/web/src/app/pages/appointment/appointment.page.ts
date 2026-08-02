import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Doctor, ServiceItem } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p class="text-sm text-ink-muted">Paso 1 de 1 · Solicitud</p>
          <h1 class="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Solicitar cita</h1>
          <p class="mt-4 text-sm leading-relaxed text-ink-muted">
            Esto es una <strong class="text-ink">solicitud</strong>, no una confirmación de hora.
            Recepción revisa la cola y te contacta para cerrar el hueco.
          </p>
          <div class="mt-6 rounded-2xl bg-primary-soft p-5">
            <p class="text-xs font-semibold tracking-wide text-primary">QUÉ ESPERAR</p>
            <p class="mt-2 text-sm text-ink">1. Envías el formulario · 2. Te contactamos · 3. Confirmáis día y hora</p>
          </div>
          <div class="mt-4 rounded-2xl border border-[#F0D5C8] bg-[#FFF8F5] p-5 text-sm text-[#8B4A32]">
            Si es una urgencia vital, no uses este formulario. Llama al 112.
          </div>
        </div>

        <form class="rounded-[20px] border border-border bg-surface p-6 shadow-sm sm:p-8 space-y-5" [formGroup]="form" (ngSubmit)="submit()">
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="patientName">Nombre completo</label>
            <input id="patientName" formControlName="patientName" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm outline-none ring-primary focus:ring-2" autocomplete="name" placeholder="Ej. María López García" />
            <p *ngIf="form.controls.patientName.touched && form.controls.patientName.invalid" class="mt-1 text-xs text-danger">Indica al menos 2 caracteres.</p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink" for="phone">Teléfono</label>
              <input id="phone" formControlName="phone" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" autocomplete="tel" inputmode="tel" />
              <p *ngIf="form.controls.phone.touched && form.controls.phone.invalid" class="mt-1 text-xs text-danger">Teléfono no válido.</p>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink" for="email">Email (opcional)</label>
              <input id="email" type="email" formControlName="email" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" autocomplete="email" />
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink" for="preferredSlot">Franja preferida</label>
              <select id="preferredSlot" formControlName="preferredSlot" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm">
                <option value="ANY">Cualquiera</option>
                <option value="MORNING">Mañana</option>
                <option value="AFTERNOON">Tarde</option>
              </select>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink" for="preferredDoctorId">Profesional</label>
              <select id="preferredDoctorId" formControlName="preferredDoctorId" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm">
                <option value="">Cualquiera del equipo</option>
                <option *ngFor="let d of doctors" [value]="d.id">{{ d.fullName }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="serviceId">Servicio (opcional)</label>
            <select id="serviceId" formControlName="serviceId" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm">
              <option value="">No especificar</option>
              <option *ngFor="let s of services" [value]="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="reason">Motivo de la consulta</label>
            <textarea id="reason" formControlName="reason" rows="4" class="w-full rounded-xl border border-border bg-bg px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Describe brevemente el motivo (10–500 caracteres)"></textarea>
            <p *ngIf="form.controls.reason.touched && form.controls.reason.invalid" class="mt-1 text-xs text-danger">Entre 10 y 500 caracteres.</p>
          </div>
          <p *ngIf="serverError" class="rounded-xl bg-red-50 p-3 text-sm text-danger">{{ serverError }}</p>
          <button type="submit" [disabled]="form.invalid || submitting" class="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:opacity-50">
            {{ submitting ? 'Enviando…' : 'Enviar solicitud' }}
          </button>
          <p class="text-center text-xs text-ink-muted">Al enviar aceptas que recepción use tus datos solo para gestionar esta cita.</p>
        </form>
      </div>
    </div>
  `,
})
export class AppointmentPage implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  doctors: Doctor[] = [];
  services: ServiceItem[] = [];
  submitting = false;
  serverError = '';
  form = this.fb.nonNullable.group({
    patientName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{9,20}$/)]],
    email: [''],
    preferredSlot: ['ANY'],
    preferredDoctorId: [''],
    serviceId: [''],
    reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });
  ngOnInit() {
    this.api.getDoctors().subscribe((d) => (this.doctors = d));
    this.api.getServices().subscribe((s) => (this.services = s));
  }
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true; this.serverError = '';
    const v = this.form.getRawValue();
    this.api.createAppointment({
      patientName: v.patientName, phone: v.phone, email: v.email || undefined,
      preferredSlot: v.preferredSlot, preferredDoctorId: v.preferredDoctorId || undefined,
      serviceId: v.serviceId || undefined, reason: v.reason,
    }).subscribe({
      next: (a) => { this.submitting = false; this.router.navigate(['/cita/enviada'], { queryParams: { id: a.id } }); },
      error: () => { this.submitting = false; this.serverError = 'No hemos podido enviar la solicitud. Comprueba la conexión e inténtalo de nuevo.'; },
    });
  }
}
