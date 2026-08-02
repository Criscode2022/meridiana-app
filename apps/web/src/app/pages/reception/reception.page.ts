import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ApiService, Appointment } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  template: `
    <div class="mx-auto max-w-5xl px-4 py-12">
      <div class="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm p-4 mb-6">
        Demo L1: bandeja sin autenticación. En producción requiere auth staff (ver docs de privacidad).
      </div>
      <h1 class="font-display text-3xl font-semibold">Recepción — solicitudes</h1>
      <p *ngIf="error" class="mt-4 text-danger">Error al cargar. <button type="button" class="underline" (click)="load()">Reintentar</button></p>
      <p *ngIf="!loading && !error && items.length === 0" class="mt-8 text-ink-muted border border-dashed border-border rounded-2xl p-10 text-center">No hay solicitudes.</p>
      <ul *ngIf="items.length" class="mt-8 space-y-4">
        <li *ngFor="let a of items" class="rounded-2xl border border-border bg-surface p-5">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="font-semibold">{{ a.patientName }}</p>
              <p class="text-sm text-ink-muted">{{ a.phone }} <span *ngIf="a.email">· {{ a.email }}</span></p>
              <p class="text-xs text-ink-muted mt-1">{{ a.createdAt | date:'short' }} · {{ a.preferredSlot }}</p>
            </div>
            <span class="text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1"
              [class.bg-primary-soft]="a.status==='NEW'"
              [class.bg-amber-100]="a.status==='CONTACTED'"
              [class.bg-border]="a.status==='CLOSED'">{{ a.status }}</span>
          </div>
          <p class="mt-3 text-sm">{{ a.reason }}</p>
          <p *ngIf="a.preferredDoctor" class="mt-1 text-xs text-primary">Prefiere: {{ a.preferredDoctor.fullName }}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button type="button" class="text-sm rounded-full border border-border px-3 py-1.5 hover:border-primary" (click)="setStatus(a,'CONTACTED')">Marcar contactada</button>
            <button type="button" class="text-sm rounded-full border border-border px-3 py-1.5 hover:border-primary" (click)="setStatus(a,'CLOSED')">Cerrar</button>
            <button type="button" class="text-sm rounded-full border border-border px-3 py-1.5 hover:border-primary" (click)="setStatus(a,'NEW')">Reabrir NEW</button>
          </div>
        </li>
      </ul>
    </div>
  `,
})
export class ReceptionPage implements OnInit {
  private api = inject(ApiService);
  items: Appointment[] = [];
  loading = true;
  error = false;
  ngOnInit() { this.load(); }
  load() {
    this.loading = true; this.error = false;
    this.api.getAppointments().subscribe({
      next: (a) => { this.items = a; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }
  setStatus(a: Appointment, status: string) {
    this.api.updateAppointment(a.id, status).subscribe({
      next: () => this.load(),
      error: () => alert('No se pudo actualizar'),
    });
  }
}
