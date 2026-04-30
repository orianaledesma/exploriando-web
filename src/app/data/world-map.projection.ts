// Proyección Equirectangular usada por el SVG del world map.
// Los bounds vienen del bounding box que usó mapshaper al generar
// `world-map.paths.ts` — cualquier coord (lat,lng) proyectada con
// `projectLngLat` cae sobre el continente correcto del mismo SVG.

interface ProjectionConfig {
  readonly xMin: number;
  readonly xMax: number;
  readonly yMin: number;
  readonly yMax: number;
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly earthRadius: number;
}

export const WORLD_MAP_PROJECTION: ProjectionConfig = {
  xMin: -18564132.654544916,
  xMax:  20037508.342789244,
  yMin:  -5821947.474851327,
  yMax:   9198102.432486977,
  viewBoxWidth:  800,
  viewBoxHeight: 313,
  earthRadius:   6378137,
} as const;

/**
 * Proyecta coordenadas geográficas (lng, lat en grados) a coordenadas
 * SVG (x, y en unidades del viewBox 800×313) usando la misma proyección
 * Equirectangular con la que se generaron los paths de continentes.
 */
export function projectLngLat(lng: number, lat: number): { x: number; y: number } {
  const p = WORLD_MAP_PROJECTION;
  const mx = (lng * Math.PI) / 180 * p.earthRadius;
  const my = (lat * Math.PI) / 180 * p.earthRadius;
  return {
    x: +((mx - p.xMin) * p.viewBoxWidth  / (p.xMax - p.xMin)).toFixed(2),
    y: +((p.yMax - my) * p.viewBoxHeight / (p.yMax - p.yMin)).toFixed(2),
  };
}
