import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <div class="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-2xl font-bold text-primary" aria-hidden="true">✓</div>
      <h1 class="mt-6 font-display text-3xl font-semibold text-ink">Solicitud recibida</h1>
      <p class="mt-4 leading-relaxed text-ink-muted">
        Hemos registrado tu petición<span *ngIf="id"> (ref. <span class="font-semibold text-ink">{{ shortId }}</span>)</span>.
        El equipo de recepción te contactará para <strong class="text-ink">confirmar la hora</strong>.
        Esto aún no es una cita cerrada.
      </p>
      <div class="mt-6 w-full rounded-2xl bg-primary-soft p-4 text-left text-sm text-ink">
        <p class="font-semibold text-primary">Siguiente paso</p>
        <p class="mt-1 text-ink-muted">Mantén el teléfono disponible. Si no contestas, intentaremos de nuevo o cerraremos la solicitud.</p>
      </div>
      <p class="mt-4 text-sm text-ink-muted">Urgencia vital: 112.</p>
      <a routerLink="/" class="mt-8 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-strong">Volver al inicio</a>
    </div>
  `,
})
export class ConfirmationPage {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.queryParamMap.get('id') ?? '';
  get shortId() { return this.id ? this.id.slice(-8).toUpperCase() : ''; }
}
