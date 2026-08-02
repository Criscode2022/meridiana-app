import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ApiService, Appointment } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  template: `
    <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div class="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Demo L1: bandeja sin autenticación. En producción requiere auth staff.
      </div>
      <h1 class="font-display text-3xl font-semibold text-ink">Recepción — solicitudes</h1>
      <p class="mt-2 text-sm text-ink-muted">Cola de peticiones del canal web. Cambia el estado tras contactar.</p>
      <p *ngIf="error" class="mt-4 text-danger">Error al cargar. <button type="button" class="underline" (click)="load()">Reintentar</button></p>
      <p *ngIf="!loading && !error && items.length === 0" class="mt-10 rounded-2xl border border-dashed border-border p-12 text-center text-ink-muted">No hay solicitudes.</p>
      <ul *ngIf="items.length" class="mt-8 space-y-4">
        <li *ngFor="let a of items" class="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p class="text-lg font-semibold text-ink">{{ a.patientName }}</p>
              <p class="mt-1 text-sm text-ink-muted">{{ a.phone }} <span *ngIf="a.email">· {{ a.email }}</span></p>
              <p class="mt-1 text-xs text-ink-muted">{{ a.createdAt | date:'short' }} · {{ slotLabel(a.preferredSlot) }}</p>
            </div>
            <span class="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
              [class.bg-primary-soft]="a.status==='NEW'" [class.text-primary]="a.status==='NEW'"
              [class.bg-amber-100]="a.status==='CONTACTED'" [class.text-amber-900]="a.status==='CONTACTED'"
              [class.bg-border]="a.status==='CLOSED'" [class.text-ink-muted]="a.status==='CLOSED'">{{ a.status }}</span>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-ink">{{ a.reason }}</p>
          <p *ngIf="a.preferredDoctor" class="mt-2 text-xs font-medium text-primary">Prefiere: {{ a.preferredDoctor.fullName }}</p>
          <p *ngIf="a.service" class="mt-1 text-xs text-ink-muted">Servicio: {{ a.service.name }}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <button type="button" class="rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary" (click)="setStatus(a,'CONTACTED')">Marcar contactada</button>
            <button type="button" class="rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary" (click)="setStatus(a,'CLOSED')">Cerrar</button>
            <button type="button" class="rounded-full border border-border px-4 py-2 text-xs font-semibold hover:border-primary" (click)="setStatus(a,'NEW')">Reabrir NEW</button>
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
    this.api.updateAppointment(a.id, status).subscribe({ next: () => this.load(), error: () => alert('No se pudo actualizar') });
  }
  slotLabel(s: string) {
    return ({ MORNING: 'Mañana', AFTERNOON: 'Tarde', ANY: 'Cualquier franja' } as Record<string,string>)[s] ?? s;
  }
}
