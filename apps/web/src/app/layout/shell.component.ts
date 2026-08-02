import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a href="#contenido" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:z-50">Saltar al contenido</a>
    <header class="border-b border-border bg-surface/90 backdrop-blur sticky top-0 z-40">
      <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <a routerLink="/" class="font-display text-xl font-semibold text-primary tracking-tight">MERIDIANA</a>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-ink-muted">
          <a routerLink="/" routerLinkActive="text-primary" [routerLinkActiveOptions]="{exact:true}" class="hover:text-ink">Inicio</a>
          <a routerLink="/servicios" routerLinkActive="text-primary" class="hover:text-ink">Servicios</a>
          <a routerLink="/equipo" routerLinkActive="text-primary" class="hover:text-ink">Equipo</a>
          <a routerLink="/cita" class="rounded-full bg-primary text-white px-4 py-2 hover:bg-primary-strong">Solicitar cita</a>
        </nav>
        <a routerLink="/cita" class="md:hidden rounded-full bg-primary text-white text-sm px-3 py-2">Cita</a>
      </div>
    </header>
    <main id="contenido" class="min-h-[70vh]">
      <ng-content />
    </main>
    <footer class="border-t border-border mt-16 bg-surface">
      <div class="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm text-ink-muted">
        <div>
          <p class="font-display text-lg text-ink">MERIDIANA</p>
          <p class="mt-2">Centro de atención primaria de barrio. Lunes a viernes 8:00–20:00.</p>
        </div>
        <div>
          <p class="font-semibold text-ink">Contacto</p>
          <p class="mt-2">C/ del Sol 12, Barrio Norte<br/>Tel. 900 000 000</p>
        </div>
        <div>
          <p class="font-semibold text-ink">Importante</p>
          <p class="mt-2">La web envía <strong class="text-ink">solicitudes</strong>, no confirma la hora al instante. Urgencias: 112.</p>
          <a routerLink="/recepcion" class="mt-3 inline-block text-primary underline text-xs">Acceso recepción (demo)</a>
        </div>
      </div>
    </footer>
  `,
})
export class ShellComponent {}
