import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from './translations/translations';

/**
 * Todo `#fragmento` del sitio tiene que existir como `id` en alguna plantilla.
 *
 * Esto nació de dos roturas reales: al desmontar la banda de Latina Connection
 * quedó su entrada de menú apuntando a #latina-connection, y al sacar el
 * formulario del hero quedaron el CTA de la guía y el de las 42 páginas de
 * ciudad apuntando a #hero-email. Las dos fallan en silencio — navegan a la
 * home y no scrollean — así que ni el build ni los tests las veían.
 */
describe('anclas internas', () => {
  // Los ids que las plantillas realmente exponen. Se mantiene a mano a
  // propósito: si alguien borra una sección, este test es el que avisa.
  const IDS_EXISTENTES = [
    'main-content',
    'about',
    'recursos',
    'herramientas',
    'en-vivo',
    'mapa',
    'asesorias',
    'marcas-teaser',
    'por-donde-empezar',
    'comunidad-form',
    'footer-email',
  ];

  for (const lang of ['es', 'en', 'pt'] as const) {
    it(`«${lang}»: el menú no apunta a anclas inexistentes`, () => {
      const fragmentos = TRANSLATIONS[lang].nav.links
        .filter((l) => l.href.startsWith('#'))
        .map((l) => l.href.slice(1));

      for (const f of fragmentos) {
        expect(IDS_EXISTENTES, `#${f} no existe en ninguna plantilla`).toContain(f);
      }
    });
  }
});
