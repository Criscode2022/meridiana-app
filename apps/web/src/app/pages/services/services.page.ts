import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, ServiceItem } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p class="text-xs font-semibold tracking-widest text-primary">CARTERA DE SERVICIOS</p>
      <h1 class="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Servicios</h1>
      <p class="mt-3 max-w-2xl text-ink-muted">Oferta del centro para atención no urgente. Indica el servicio al solicitar cita para orientar a recepción.</p>

      <p *ngIf="error" class="mt-8 rounded-2xl bg-red-50 p-4 text-danger">Error de red. <button type="button" class="underline" (click)="load()">Reintentar</button></p>
      <div *ngIf="loading" class="mt-8 space-y-4"><div *ngFor="let i of [1,2,3]" class="h-28 animate-pulse rounded-2xl bg-border/40"></div></div>
      <div *ngIf="!loading && !error && services.length === 0" class="mt-10 rounded-2xl border border-dashed border-border p-12 text-center text-ink-muted">
        No hay servicios publicados. Llama al 900 000 000.
      </div>
      <ul *ngIf="!loading && services.length" class="mt-10 space-y-4">
        <li *ngFor="let s of services; let i = index" class="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
          <div class="flex gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-sm font-bold text-primary">{{ i + 1 }}</div>
            <div>
              <h2 class="text-xl font-semibold text-ink">{{ s.name }}</h2>
              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{{ s.description }}</p>
            </div>
          </div>
          <a routerLink="/cita" class="shrink-0 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-strong">Solicitar cita</a>
        </li>
      </ul>
    </div>
  `,
})
export class ServicesPage implements OnInit {
  private api = inject(ApiService);
  services: ServiceItem[] = [];
  loading = true;
  error = false;
  ngOnInit() { this.load(); }
  load() {
    this.loading = true; this.error = false;
    this.api.getServices().subscribe({
      next: (s) => { this.services = s; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
  }
}
