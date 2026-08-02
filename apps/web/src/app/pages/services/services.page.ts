import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, ServiceItem } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h1 class="font-display text-3xl font-semibold">Servicios</h1>
      <p class="mt-2 text-ink-muted max-w-2xl">Oferta del centro. Las citas se confirman por teléfono tras tu solicitud web.</p>
      <p *ngIf="error" class="mt-6 rounded-xl bg-red-50 text-danger p-4">Error de red. <button type="button" class="underline" (click)="load()">Reintentar</button></p>
      <div *ngIf="loading" class="mt-8 space-y-4">
        <div *ngFor="let i of [1,2,3]" class="h-28 rounded-2xl bg-border/40 animate-pulse"></div>
      </div>
      <div *ngIf="!loading && !error && services.length === 0" class="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-ink-muted">
        No hay servicios publicados. Llama al 900 000 000.
      </div>
      <ul *ngIf="!loading && services.length" class="mt-8 grid gap-4">
        <li *ngFor="let s of services" class="rounded-2xl border border-border bg-surface p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-xl font-semibold">{{ s.name }}</h2>
            <p class="mt-2 text-ink-muted">{{ s.description }}</p>
          </div>
          <a routerLink="/cita" class="shrink-0 rounded-full bg-primary text-white px-5 py-2.5 text-sm font-medium text-center">Solicitar cita</a>
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
