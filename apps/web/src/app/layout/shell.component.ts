import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a href="#contenido" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow">Saltar al contenido</a>
    <header class="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-md">
      <div class="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a routerLink="/" class="flex items-center gap-3">
          <span class="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-white">M</span>
          <span class="font-display text-xl font-semibold tracking-tight text-primary">MERIDIANA</span>
        </a>
        <nav class="hidden items-center gap-8 text-sm font-medium text-ink-muted md:flex">
          <a routerLink="/" routerLinkActive="text-ink" [routerLinkActiveOptions]="{exact:true}" class="hover:text-ink">Inicio</a>
          <a routerLink="/servicios" routerLinkActive="text-ink" class="hover:text-ink">Servicios</a>
          <a routerLink="/equipo" routerLinkActive="text-ink" class="hover:text-ink">Equipo</a>
          <a routerLink="/cita" class="rounded-full bg-primary px-5 py-2.5 text-white shadow-sm hover:bg-primary-strong">Solicitar cita</a>
        </nav>
        <a routerLink="/cita" class="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white md:hidden">Cita</a>
      </div>
    </header>
    <main id="contenido" class="min-h-[70vh]"><ng-content /></main>
    <footer class="mt-0 border-t border-white/10 bg-ink text-white">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p class="font-display text-lg">MERIDIANA</p>
          <p class="mt-3 text-sm leading-relaxed text-white/60">Centro de atención primaria de barrio. Cuidado cercano, información clara.</p>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-white/80">Contacto</p>
          <p class="mt-3 text-sm text-white/60">C/ del Sol 12, Barrio Norte<br/>Tel. 900 000 000<br/>L–V 8:00–20:00</p>
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-white/80">Importante</p>
          <p class="mt-3 text-sm leading-relaxed text-white/60">La web envía <span class="text-white">solicitudes</span>, no confirma la hora al instante. Urgencias: 112.</p>
          <a routerLink="/recepcion" class="mt-4 inline-block text-xs text-primary-soft underline">Acceso recepción (demo)</a>
        </div>
      </div>
    </footer>
  `,
})
export class ShellComponent {}
