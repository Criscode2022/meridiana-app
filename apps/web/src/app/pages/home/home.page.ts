import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Doctor, ServiceItem } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <section class="relative overflow-hidden">
      <div class="mx-auto max-w-6xl px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p class="text-sm font-semibold tracking-wide text-primary uppercase">Centro de atención primaria</p>
          <h1 class="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-ink">
            Tu salud de barrio, con hora y con calma.
          </h1>
          <p class="mt-4 text-lg text-ink-muted max-w-prose">
            Conoce al equipo, los servicios y solicita cita sin colas telefónicas. Recepción te llamará para confirmar el hueco.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/cita" class="rounded-full bg-primary text-white px-6 py-3 font-medium hover:bg-primary-strong">Solicitar cita</a>
            <a routerLink="/equipo" class="rounded-full border border-border bg-surface px-6 py-3 font-medium hover:border-primary">Ver equipo</a>
          </div>
          <dl class="mt-10 grid grid-cols-3 gap-4 text-sm">
            <div class="rounded-xl bg-primary-soft p-3"><dt class="text-ink-muted">Horario</dt><dd class="font-semibold">8:00–20:00</dd></div>
            <div class="rounded-xl bg-primary-soft p-3"><dt class="text-ink-muted">Barrio</dt><dd class="font-semibold">Norte</dd></div>
            <div class="rounded-xl bg-primary-soft p-3"><dt class="text-ink-muted">Idioma</dt><dd class="font-semibold">Español</dd></div>
          </dl>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg border border-border aspect-[4/3] bg-primary-soft">
          <img src="assets/clinic/hero.jpg" alt="Sala de espera luminosa del centro MERIDIANA" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12">
      <div class="flex items-end justify-between gap-4 mb-6">
        <h2 class="font-display text-2xl font-semibold">Servicios</h2>
        <a routerLink="/servicios" class="text-sm text-primary font-medium">Ver todos</a>
      </div>
      <p *ngIf="error" class="rounded-xl bg-red-50 text-danger p-4">No pudimos cargar los servicios. <button type="button" class="underline" (click)="load()">Reintentar</button></p>
      <div *ngIf="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div *ngFor="let i of [1,2,3,4]" class="h-36 rounded-2xl bg-border/50 animate-pulse"></div>
      </div>
      <div *ngIf="!loading && !error" class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <article *ngFor="let s of services" class="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <h3 class="font-semibold text-ink">{{ s.name }}</h3>
          <p class="mt-2 text-sm text-ink-muted">{{ s.summary }}</p>
        </article>
      </div>
    </section>

    <section class="bg-primary-soft/60 border-y border-border">
      <div class="mx-auto max-w-6xl px-4 py-12">
        <h2 class="font-display text-2xl font-semibold mb-6">Parte del equipo</h2>
        <div *ngIf="!loading" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <article *ngFor="let d of doctors" class="rounded-2xl bg-surface border border-border overflow-hidden">
            <img [src]="d.photoUrl" [alt]="d.fullName + ', ' + d.roleTitle" class="w-full aspect-square object-cover" />
            <div class="p-4">
              <h3 class="font-semibold">{{ d.fullName }}</h3>
              <p class="text-sm text-primary">{{ d.roleTitle }}</p>
            </div>
          </article>
        </div>
        <a routerLink="/equipo" class="inline-block mt-6 text-primary font-medium">Conocer al equipo completo →</a>
      </div>
    </section>
  `,
})
export class HomePage implements OnInit {
  private api = inject(ApiService);
  services: ServiceItem[] = [];
  doctors: Doctor[] = [];
  loading = true;
  error = false;

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.error = false;
    this.api.getServices().subscribe({
      next: (s) => { this.services = s; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
    this.api.getDoctors().subscribe({
      next: (d) => (this.doctors = d),
      error: () => {},
    });
  }
}
