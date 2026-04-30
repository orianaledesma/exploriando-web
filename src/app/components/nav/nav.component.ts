import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { Lang } from '../../models/language.model';
import { TRANSLATIONS } from '../../translations/translations';

const SCROLL_THRESHOLD = 20;

interface LangOption { code: Lang; label: string; name: string; }

const LANG_OPTIONS: LangOption[] = [
  { code: 'es', label: 'ES', name: 'Español'    },
  { code: 'en', label: 'EN', name: 'English'    },
  { code: 'pt', label: 'PT', name: 'Português'  },
];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class NavComponent {
  private readonly destroyRef  = inject(DestroyRef);
  private readonly lang        = inject(LanguageService);
  private readonly router      = inject(Router);
  private readonly langDropRef = viewChild<ElementRef<HTMLElement>>('langDrop');

  readonly langOptions  = LANG_OPTIONS;
  menuOpen    = signal(false);
  scrolled    = signal(false);
  langDropOpen = signal(false);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].nav);
  readonly currentLang = computed(() => this.lang.current().toUpperCase());

  /** URL actual reactivamente, para saber si estamos en la home o en una ruta interna. */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  /** True solamente cuando estamos en la home (`/`, `/?...`, `/#...`). */
  readonly isHome = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url.startsWith('/?') || url.startsWith('/#');
  });

  /**
   * El nav usa fondo opaco (oscuro) si el usuario scrolleó O si estamos en
   * una ruta interna (cualquiera que no sea la home). Esto evita el caso de
   * texto blanco-sobre-blanco en páginas como /mapa, /marcas, /guia.
   */
  readonly opaqueNav = computed(() => this.scrolled() || !this.isHome());

  constructor() {
    afterNextRender(() => {
      fromEvent(window, 'scroll', { passive: true })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.scrolled.set(window.scrollY > SCROLL_THRESHOLD);
        });

      fromEvent<MouseEvent>(document, 'click')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((e) => {
          const el = this.langDropRef()?.nativeElement;
          if (el && !el.contains(e.target as Node)) {
            this.langDropOpen.set(false);
          }
        });
    });
  }

  toggleMenu(): void   { this.menuOpen.update(open => !open); }
  closeMenu(): void    { this.menuOpen.set(false); }
  toggleLangDrop(): void { this.langDropOpen.update(o => !o); }

  setLang(code: Lang): void {
    this.lang.set(code);
    this.langDropOpen.set(false);
  }

  isActiveLang(code: Lang): boolean {
    return this.lang.current() === code;
  }

  isExternalLink(href: string): boolean {
    return href.startsWith('/') && !href.startsWith('#');
  }
}
