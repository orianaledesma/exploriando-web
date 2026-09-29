import { afterEach, vi } from 'vitest';

/**
 * Restaura los spies después de cada test.
 *
 * Jasmine lo hacía solo; Vitest no. Sin esto, un `vi.spyOn` de un test queda
 * activo en los siguientes — que fue exactamente lo que rompió recursos.spec
 * al migrar: un spy sobre `document.getElementById` sobrevivía al test y hacía
 * que Angular recibiera un objeto falso al crear el componente siguiente.
 */
afterEach(() => {
  vi.restoreAllMocks();
});
