import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <div class="mx-auto max-w-lg px-4 py-16 text-center">
      <div class="mx-auto w-16 h-16 rounded-full bg-primary-soft text-primary flex items-center justify-center text-2xl font-bold" aria-hidden="true">✓</div>
      <h1 class="mt-6 font-display text-3xl font-semibold">Solicitud recibida</h1>
      <p class="mt-4 text-ink-muted">
        Hemos registrado tu petición<span *ngIf="id"> (ref. {{ shortId }})</span>.
        El equipo de recepción te contactará para <strong class="text-ink">confirmar la hora</strong>.
        Esto aún no es una cita cerrada.
      </p>
      <p class="mt-4 text-sm text-ink-muted">Si es una urgencia vital, llama al 112.</p>
      <a routerLink="/" class="inline-block mt-8 rounded-full bg-primary text-white px-6 py-3 font-medium">Volver al inicio</a>
    </div>
  `,
})
export class ConfirmationPage {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.queryParamMap.get('id') ?? '';
  get shortId() {
    return this.id ? this.id.slice(-8).toUpperCase() : '';
  }
}
