import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Doctor, ServiceItem } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
    <div class="mx-auto max-w-xl px-4 py-12">
      <h1 class="font-display text-3xl font-semibold">Solicitar cita</h1>
      <p class="mt-2 text-ink-muted text-sm">
        Esto es una <strong class="text-ink">solicitud</strong>, no una confirmación de hora. Recepción te contactará.
      </p>

      <form class="mt-8 space-y-5" [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label class="block text-sm font-medium mb-1" for="patientName">Nombre completo</label>
          <input id="patientName" formControlName="patientName" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary" autocomplete="name" />
          <p *ngIf="form.controls.patientName.touched && form.controls.patientName.invalid" class="text-danger text-xs mt-1" id="err-name">Indica al menos 2 caracteres.</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="phone">Teléfono</label>
          <input id="phone" formControlName="phone" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary" autocomplete="tel" inputmode="tel" />
          <p *ngIf="form.controls.phone.touched && form.controls.phone.invalid" class="text-danger text-xs mt-1">Teléfono no válido.</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="email">Email (opcional)</label>
          <input id="email" type="email" formControlName="email" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary" autocomplete="email" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="preferredSlot">Franja preferida</label>
          <select id="preferredSlot" formControlName="preferredSlot" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface">
            <option value="ANY">Cualquiera</option>
            <option value="MORNING">Mañana</option>
            <option value="AFTERNOON">Tarde</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="preferredDoctorId">Profesional (opcional)</label>
          <select id="preferredDoctorId" formControlName="preferredDoctorId" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface">
            <option value="">Cualquiera del equipo</option>
            <option *ngFor="let d of doctors" [value]="d.id">{{ d.fullName }} — {{ d.roleTitle }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="serviceId">Servicio (opcional)</label>
          <select id="serviceId" formControlName="serviceId" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface">
            <option value="">No especificar</option>
            <option *ngFor="let s of services" [value]="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1" for="reason">Motivo de la consulta</label>
          <textarea id="reason" formControlName="reason" rows="4" class="w-full rounded-xl border border-border px-3 py-2.5 bg-surface focus:outline-none focus:ring-2 focus:ring-primary" [attr.aria-describedby]="form.controls.reason.invalid && form.controls.reason.touched ? 'err-reason' : null"></textarea>
          <p *ngIf="form.controls.reason.touched && form.controls.reason.invalid" id="err-reason" class="text-danger text-xs mt-1">Entre 10 y 500 caracteres.</p>
        </div>

        <p *ngIf="serverError" class="rounded-xl bg-red-50 text-danger p-3 text-sm">{{ serverError }}</p>

        <button type="submit" [disabled]="form.invalid || submitting"
          class="w-full rounded-full bg-primary text-white py-3 font-medium disabled:opacity-50 hover:bg-primary-strong">
          {{ submitting ? 'Enviando…' : 'Enviar solicitud' }}
        </button>
      </form>
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.serverError = '';
    const v = this.form.getRawValue();
    this.api
      .createAppointment({
        patientName: v.patientName,
        phone: v.phone,
        email: v.email || undefined,
        preferredSlot: v.preferredSlot,
        preferredDoctorId: v.preferredDoctorId || undefined,
        serviceId: v.serviceId || undefined,
        reason: v.reason,
      })
      .subscribe({
        next: (a) => {
          this.submitting = false;
          this.router.navigate(['/cita/enviada'], { queryParams: { id: a.id } });
        },
        error: () => {
          this.submitting = false;
          this.serverError = 'No hemos podido enviar la solicitud. Comprueba la conexión e inténtalo de nuevo.';
        },
      });
  }
}
