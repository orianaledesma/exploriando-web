import { provideRouter } from '@angular/router';
import type { EnvironmentProviders } from '@angular/core';

/**
 * Router para tests, que acepta cualquier URL.
 *
 * Con `provideRouter([])` cualquier click sobre un `routerLink` lanza
 * NG04002 ("Cannot match any routes") de forma asíncrona. Karma lo ignoraba;
 * Vitest lo cuenta como error no manejado y devuelve exit code 1 aunque los
 * 242 tests pasen — que es exactamente cómo se rompió el CI al migrar.
 *
 * La ruta comodín resuelve la navegación sin montar ningún componente, así
 * los tests siguen siendo unitarios.
 */
export function provideTestRouter(): EnvironmentProviders {
  return provideRouter([{ path: '**', children: [] }]);
}
