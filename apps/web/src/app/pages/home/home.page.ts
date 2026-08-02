import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Doctor, ServiceItem } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5">
            <span class="h-2 w-2 rounded-full bg-primary"></span>
            <span class="text-[11px] font-semibold tracking-wide text-primary">CENTRO DE ATENCIÓN PRIMARIA · BARRIO NORTE</span>
          </div>
          <h1 class="mt-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-ink md:text-5xl">
            Tu salud de barrio, con hora y con calma.
          </h1>
          <p class="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
            Conoce al equipo, los servicios y deja tu solicitud de cita cuando te vaya bien.
            Recepción te llama para confirmar el hueco — sin colas telefónicas al mediodía.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/cita" class="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-strong">Solicitar cita</a>
            <a routerLink="/equipo" class="rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-ink hover:border-primary/40">Conocer al equipo</a>
          </div>
          <dl class="mt-10 grid grid-cols-3 gap-3 text-sm">
            <div class="rounded-2xl border border-border bg-surface p-4"><dt class="text-[11px] font-semibold tracking-wide text-ink-muted">HORARIO</dt><dd class="mt-1 font-semibold text-ink">L–V 8:00–20:00</dd></div>
            <div class="rounded-2xl border border-border bg-surface p-4"><dt class="text-[11px] font-semibold tracking-wide text-ink-muted">TELÉFONO</dt><dd class="mt-1 font-semibold text-ink">900 000 000</dd></div>
            <div class="rounded-2xl border border-border bg-surface p-4"><dt class="text-[11px] font-semibold tracking-wide text-ink-muted">URGENCIAS</dt><dd class="mt-1 font-semibold text-ink">112</dd></div>
          </dl>
        </div>
        <div class="relative overflow-hidden rounded-[20px] border border-border shadow-lg">
          <img src="assets/clinic/hero.jpg" alt="Sala de espera luminosa del centro MERIDIANA" class="aspect-[4/3] w-full object-cover" />
          <div class="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-sm">
            <p class="text-xs font-semibold text-primary">C/ del Sol 12</p>
            <p class="text-sm text-ink-muted">Acceso sin barreras · Planta baja</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 class="font-display text-2xl font-semibold text-ink md:text-3xl">Servicios del centro</h2>
          <p class="mt-1 text-sm text-ink-muted">Atención no urgente con cita previa</p>
        </div>
        <a routerLink="/servicios" class="text-sm font-semibold text-primary hover:underline">Ver todos →</a>
      </div>
      <p *ngIf="error" class="rounded-2xl bg-red-50 p-4 text-danger">No pudimos cargar los servicios. <button type="button" class="font-semibold underline" (click)="load()">Reintentar</button></p>
      <div *ngIf="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div *ngFor="let i of [1,2,3,4]" class="h-40 animate-pulse rounded-2xl bg-border/50"></div>
      </div>
      <div *ngIf="!loading && !error" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article *ngFor="let s of services; let i = index" class="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-primary/30">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-sm font-bold text-primary">0{{ i + 1 }}</div>
          <h3 class="font-semibold text-ink">{{ s.name }}</h3>
          <p class="text-sm leading-relaxed text-ink-muted">{{ s.summary }}</p>
        </article>
      </div>
    </section>

    <section class="border-y border-border bg-primary-soft/70">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div class="mb-8 flex items-end justify-between gap-4">
          <h2 class="font-display text-2xl font-semibold text-ink md:text-3xl">Tu equipo de referencia</h2>
          <a routerLink="/equipo" class="text-sm font-semibold text-primary hover:underline">Ver equipo completo →</a>
        </div>
        <div *ngIf="!loading" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article *ngFor="let d of doctors" class="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <img [src]="d.photoUrl" [alt]="d.fullName + ', ' + d.roleTitle" class="aspect-square w-full object-cover" />
            <div class="p-5">
              <h3 class="font-semibold text-ink">{{ d.fullName }}</h3>
              <p class="mt-0.5 text-sm font-medium text-primary">{{ d.roleTitle }}</p>
              <p class="mt-2 line-clamp-2 text-xs text-ink-muted">{{ d.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-primary">
      <div class="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-semibold text-white md:text-3xl">¿Necesitas cita?</h2>
          <p class="mt-3 text-sm leading-relaxed text-white/75">Envía una solicitud en menos de 3 minutos. Te contactamos para confirmar día y hora. No es una reserva automática.</p>
        </div>
        <a routerLink="/cita" class="shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-sm hover:bg-primary-soft">Solicitar cita ahora</a>
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
    this.loading = true; this.error = false;
    this.api.getServices().subscribe({
      next: (s) => { this.services = s; this.loading = false; },
      error: () => { this.error = true; this.loading = false; },
    });
    this.api.getDoctors().subscribe({ next: (d) => (this.doctors = d), error: () => {} });
  }
}
