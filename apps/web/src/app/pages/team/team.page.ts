import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Doctor } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p class="text-xs font-semibold tracking-widest text-primary">QUIÉNES SOMOS</p>
      <h1 class="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">Equipo del centro</h1>
      <p class="mt-3 max-w-2xl text-ink-muted">Profesionales de referencia en el barrio. Puedes indicar preferencia al solicitar cita; la confirmación la hace recepción.</p>
      <div *ngIf="loading" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div *ngFor="let i of [1,2,3,4]" class="aspect-[3/4] animate-pulse rounded-2xl bg-border/40"></div>
      </div>
      <div *ngIf="!loading" class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article *ngFor="let d of doctors" class="flex flex-col overflow-hidden rounded-[18px] border border-border bg-surface shadow-sm">
          <img [src]="d.photoUrl" [alt]="d.fullName + ', ' + d.roleTitle" class="aspect-[1/1] w-full object-cover" />
          <div class="flex flex-1 flex-col p-5">
            <h2 class="text-lg font-semibold text-ink">{{ d.fullName }}</h2>
            <p class="mt-1 text-sm font-semibold text-primary">{{ d.roleTitle }}</p>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{{ d.bio }}</p>
            <a routerLink="/cita" class="mt-5 inline-flex self-start rounded-full border border-border px-4 py-2 text-xs font-semibold text-ink hover:border-primary">Solicitar cita</a>
          </div>
        </article>
      </div>
    </div>
  `,
})
export class TeamPage implements OnInit {
  private api = inject(ApiService);
  doctors: Doctor[] = [];
  loading = true;
  ngOnInit() {
    this.api.getDoctors().subscribe({
      next: (d) => { this.doctors = d; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
