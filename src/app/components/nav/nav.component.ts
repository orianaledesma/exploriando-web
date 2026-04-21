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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { fromEvent } from 'rxjs';
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
  private readonly langDropRef = viewChild<ElementRef<HTMLElement>>('langDrop');

  readonly langOptions  = LANG_OPTIONS;
  menuOpen    = signal(false);
  scrolled    = signal(false);
  langDropOpen = signal(false);

  readonly t = computed(() => TRANSLATIONS[this.lang.current()].nav);
  readonly currentLang = computed(() => this.lang.current().toUpperCase());

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
