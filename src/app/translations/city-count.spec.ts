import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from './translations';
import { PLACES } from '../data/places';
import type { Lang } from '../models/language.model';

/**
 * El número de ciudades está escrito a mano en varios lugares del copy, en
 * tres idiomas. Estuvo publicado como 54 cuando los datos tenían 42, y al
 * corregirlo se nos pasó uno: hubo que volver sobre about.stats después.
 *
 * Esto compara cada mención contra PLACES, la única fuente de verdad.
 */
describe('cantidad de ciudades en el copy', () => {
  const LANGS: Lang[] = ['es', 'en', 'pt'];
  const real = String(new Set(PLACES.map((p) => p.city)).size);

  it('PLACES no tiene ciudades repetidas', () => {
    expect(new Set(PLACES.map((p) => p.city)).size).toBe(PLACES.length);
  });

  for (const lang of LANGS) {
    it(`«${lang}» dice ${real} en los tres lugares donde aparece`, () => {
      const t = TRANSLATIONS[lang];

      // Prueba social del hero: "+2.000 viajeros · 42 ciudades · ..."
      expect(t.hero.socialProof, 'hero.socialProof').toContain(real);

      // Stat de la sección Nosotros.
      const stat = t.about.stats.find((s) => /ciudad|cities|cidade/i.test(s.label));
      expect(stat, 'about.stats sin la stat de ciudades').toBeTruthy();
      expect(stat!.value, 'about.stats').toBe(real);

      // Tarjeta del ruteador.
      expect(t.caminos.viajar.body, 'caminos.viajar.body').toContain(real);
    });
  }
});
