import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ApiService, Doctor } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h1 class="font-display text-3xl font-semibold">Equipo</h1>
      <p class="mt-2 text-ink-muted">Profesionales del centro MERIDIANA.</p>
      <div *ngIf="loading" class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div *ngFor="let i of [1,2,3,4]" class="aspect-[3/4] rounded-2xl bg-border/40 animate-pulse"></div>
      </div>
      <div *ngIf="!loading" class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article *ngFor="let d of doctors" class="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
          <img [src]="d.photoUrl" [alt]="d.fullName + ', ' + d.roleTitle" class="w-full aspect-square object-cover" />
          <div class="p-5">
            <h2 class="font-semibold text-lg">{{ d.fullName }}</h2>
            <p class="text-sm text-primary font-medium">{{ d.roleTitle }}</p>
            <p class="mt-2 text-sm text-ink-muted">{{ d.bio }}</p>
          </div>
        </article>
      </div>
      <a routerLink="/cita" class="inline-flex mt-10 rounded-full bg-primary text-white px-6 py-3 font-medium">Solicitar cita con el equipo</a>
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
